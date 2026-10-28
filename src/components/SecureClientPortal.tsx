import { useState } from 'react';
import { Property, ClientInquiry, UserAccount } from '../types/property';
import {
  ShieldCheck,
  Lock,
  Calendar,
  PhoneCall,
  Send,
  Building,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  MapPin,
  Sparkles,
  MessageSquare,
  KeyRound,
  LogOut,
  Download,
  AlertCircle
} from 'lucide-react';

interface SecureClientPortalProps {
  properties: Property[];
  prefilledProperty?: Property | null;
  inquiries: ClientInquiry[];
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
  onAddInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status' | 'messages'>) => void;
  onSendClientMessage: (inquiryId: string, text: string) => void;
  onSelectPropertyById: (id: string) => void;
}

export default function SecureClientPortal({
  properties,
  prefilledProperty,
  inquiries,
  currentUser,
  onLogin,
  onLogout,
  onAddInquiry,
  onSendClientMessage,
  onSelectPropertyById
}: SecureClientPortalProps) {
  // Navigation tabs within client portal
  const [activePortalTab, setActivePortalTab] = useState<'new_inquiry' | 'my_history' | 'privacy'>('new_inquiry');
  
  // Auth form state if not logged in
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');

  // Selected inquiry for message chat thread
  const [activeThreadInquiryId, setActiveThreadInquiryId] = useState<string | null>(null);
  const [clientReplyText, setClientReplyText] = useState('');

  // Inquiry form fields
  const [inquiryType, setInquiryType] = useState<ClientInquiry['type']>('site_visit');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    prefilledProperty?.id || (properties[0]?.id || '')
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('11:00 AM - 01:00 PM (Morning)');
  const [needChauffeur, setNeedChauffeur] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submittedDocket, setSubmittedDocket] = useState<string | null>(null);

  // Quick Demo Accounts
  const handleQuickClientLogin = () => {
    onLogin({
      id: 'usr-client-01',
      name: 'Dr. A. Singhania',
      email: 'singhania.invest@gmail.com',
      phone: '+91 98110 44210',
      role: 'client',
      company: 'Singhania Healthcare Investments',
      joinedDate: 'Jan 2026'
    });
  };

  const handleManualAuth = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: `usr-${Date.now()}`,
      name: authName || (authMode === 'login' ? 'Registered Investor' : 'New Client'),
      email: authEmail || 'client@twincityncrrealty.com',
      phone: authPhone || '+91 98100 00000',
      role: 'client',
      joinedDate: 'October 2026'
    });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedProp = properties.find((p) => p.id === selectedPropertyId);

    onAddInquiry({
      clientId: currentUser?.id,
      type: inquiryType,
      name: currentUser ? currentUser.name : 'Registered Client',
      phone: currentUser ? currentUser.phone : '+91 98100 00000',
      email: currentUser ? currentUser.email : 'client@twincityncrrealty.com',
      propertyName: selectedProp ? selectedProp.title : undefined,
      propertyId: selectedProp ? selectedProp.id : undefined,
      preferredDate: inquiryType === 'site_visit' ? preferredDate : undefined,
      preferredTimeSlot: inquiryType === 'site_visit' ? preferredTimeSlot : undefined,
      needChauffeurPickup: inquiryType === 'site_visit' ? needChauffeur : undefined,
      pickupLocation: inquiryType === 'site_visit' && needChauffeur ? pickupLocation : undefined,
      message
    });

    const docketCode = `TCNR-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedDocket(docketCode);
    setMessage('');
  };

  // Filter client's inquiries
  const clientInquiries = currentUser
    ? inquiries.filter((inq) => !inq.clientId || inq.clientId === currentUser.id || inq.email === currentUser.email)
    : inquiries;

  const currentThreadInquiry =
    clientInquiries.find((i) => i.id === activeThreadInquiryId) || clientInquiries[0];

  const handleSendClientReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientReplyText.trim() || !currentThreadInquiry) return;
    onSendClientMessage(currentThreadInquiry.id, clientReplyText);
    setClientReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-amber-400 text-xs font-semibold mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure Encrypted Client Portal · twincityncrrealty.com</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
          Private Client Portal & Communication Vault
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Log in to manage your residential property inquiries, coordinate private site inspections, and exchange confidential messages with senior broker advisors.
        </p>
      </div>

      {/* User Session Bar or Login Prompt */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-sm">{currentUser.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Verified Client
                </span>
              </div>
              <div className="text-xs text-stone-500 font-mono">
                {currentUser.email} · {currentUser.phone}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-stone-700">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Currently browsing in guest mode. Log in to track past requests and receive direct broker messages.</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {currentUser ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleQuickClientLogin}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>1-Click Client Login (Dr. Singhania)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 mb-8 overflow-x-auto">
        <button
          onClick={() => setActivePortalTab('new_inquiry')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activePortalTab === 'new_inquiry'
              ? 'border-stone-900 text-stone-950'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          Send Property Inquiry & Book Tour
        </button>
        <button
          onClick={() => setActivePortalTab('my_history')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activePortalTab === 'my_history'
              ? 'border-stone-900 text-stone-950'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <span>Inquiry History & Broker Messages</span>
          <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">
            {clientInquiries.length}
          </span>
        </button>
        <button
          onClick={() => setActivePortalTab('privacy')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activePortalTab === 'privacy'
              ? 'border-stone-900 text-stone-950'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          Data Privacy & Confidentiality Guarantee
        </button>
      </div>

      {/* TAB 1: NEW INQUIRY & TOUR BOOKING */}
      {activePortalTab === 'new_inquiry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            
            {submittedDocket ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  Confidential Inquiry Registered!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                  Your request has been logged under Docket{' '}
                  <strong className="text-stone-900 font-mono bg-emerald-200/60 px-2 py-0.5 rounded">
                    {submittedDocket}
                  </strong>
                  . You can now view messages and receive gate passes in the "Inquiry History & Broker Messages" tab.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedDocket(null);
                      setActivePortalTab('my_history');
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer"
                  >
                    View in Message Thread
                  </button>
                  <button
                    onClick={() => setSubmittedDocket(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                
                {/* Inquiry Type Buttons */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Inquiry Objective
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setInquiryType('site_visit')}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                        inquiryType === 'site_visit'
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      Private Site Tour
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('inquiry')}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                        inquiryType === 'inquiry'
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      Price Negotiation
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('brochure')}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                        inquiryType === 'brochure'
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      E-Brochure Package
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('callback')}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                        inquiryType === 'callback'
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      Express Callback
                    </button>
                  </div>
                </div>

                {/* Specific Property Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Select Residence of Interest *
                  </label>
                  <select
                    value={selectedPropertyId}
                    onChange={(e) => setSelectedPropertyId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} · {p.priceFormatted} ({p.locality})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Site Visit Scheduling fields */}
                {inquiryType === 'site_visit' && (
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Preferred Tour Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Time Slot Window
                        </label>
                        <select
                          value={preferredTimeSlot}
                          onChange={(e) => setPreferredTimeSlot(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                        >
                          <option>10:00 AM - 12:00 PM (Morning Slot)</option>
                          <option>02:00 PM - 04:00 PM (Afternoon Slot)</option>
                          <option>04:30 PM - 06:30 PM (Sunset / Twilight Tour)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={needChauffeur}
                          onChange={(e) => setNeedChauffeur(e.target.checked)}
                          className="rounded accent-amber-600"
                        />
                        <span>Request Chauffeur-Driven Executive Transport for Site Inspection</span>
                      </label>

                      {needChauffeur && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            placeholder="Enter pickup address / hotel in Delhi-NCR"
                            className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message / Specifications */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about desired floor level, facing, payment plan expectations, or immediate possession requirements..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Confidential Inquiry</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Direct Broker Communication · Strict Client NDA & Privacy Preserved</span>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Brokerage Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 border border-stone-800 shadow-sm space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                Direct Brokerage Hotline
              </span>
              <h3 className="text-lg font-bold text-white">Twin City NCR Realty</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Connect directly with licensed portfolio managers at our Express Trade Towers corporate desk.
              </p>
              
              <div className="pt-2 border-t border-stone-800 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Head Office:</span>
                  <span className="text-stone-200">Sector 132, Noida Expressway</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Direct Telephone:</span>
                  <a href="tel:+919810123456" className="text-amber-400 font-bold hover:underline">
                    +91 98101 23456
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Brokerage Email:</span>
                  <a href="mailto:twincityncrrealty@gmail.com" className="text-white hover:underline">
                    twincityncrrealty@gmail.com
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Portal Security:</span>
                  <span className="text-emerald-400 font-medium">SSL 256-Bit Encrypted</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: INQUIRY HISTORY & TWO-WAY MESSAGING */}
      {activePortalTab === 'my_history' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Docket List */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-3 max-h-[640px] overflow-y-auto">
            <div className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
              Your Inquiries & Tour Dockets ({clientInquiries.length})
            </div>

            {clientInquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500 space-y-2">
                <p>No active inquiries logged in your client profile yet.</p>
                <button
                  onClick={() => setActivePortalTab('new_inquiry')}
                  className="text-amber-700 font-bold hover:underline"
                >
                  Send your first property inquiry →
                </button>
              </div>
            ) : (
              clientInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setActiveThreadInquiryId(inq.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    (activeThreadInquiryId === inq.id || (!activeThreadInquiryId && clientInquiries[0]?.id === inq.id))
                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-stone-50/70 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-stone-900 text-xs">{inq.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-900 text-amber-300">
                      {inq.status}
                    </span>
                  </div>

                  <div className="font-bold text-stone-900 text-xs line-clamp-1">
                    {inq.propertyName || 'Residential Advisory'}
                  </div>

                  <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
                    <span>{inq.createdAt}</span>
                    <span className="font-medium text-stone-700">
                      {inq.messages ? `${inq.messages.length} Messages` : '0 Messages'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Message Thread */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between min-h-[520px]">
            {currentThreadInquiry ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <div className="text-xs font-mono text-stone-500">Docket: {currentThreadInquiry.id}</div>
                    <h3 className="text-base font-bold text-stone-900">
                      {currentThreadInquiry.propertyName || 'Residential Consultation'}
                    </h3>
                    {currentThreadInquiry.assignedConsultant && (
                      <div className="text-xs text-amber-800 font-semibold mt-0.5">
                        Assigned Broker: {currentThreadInquiry.assignedConsultant}
                      </div>
                    )}
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    {currentThreadInquiry.status}
                  </span>
                </div>

                {/* Initial Tour / Inquiry Data */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                  {currentThreadInquiry.preferredDate && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Scheduled Inspection Date:</span>
                      <span className="font-bold text-stone-900">
                        {currentThreadInquiry.preferredDate} ({currentThreadInquiry.preferredTimeSlot})
                      </span>
                    </div>
                  )}
                  {currentThreadInquiry.message && (
                    <div>
                      <span className="text-stone-500">Your Initial Request:</span>
                      <p className="text-stone-700 italic mt-0.5">"{currentThreadInquiry.message}"</p>
                    </div>
                  )}
                </div>

                {/* Messages Feed */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                    Broker Communication & Updates
                  </h4>
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {currentThreadInquiry.messages && currentThreadInquiry.messages.length > 0 ? (
                      currentThreadInquiry.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                            m.sender === 'client'
                              ? 'ml-auto bg-amber-400 text-stone-950 font-medium'
                              : 'mr-auto bg-stone-900 text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 mb-1">
                            <span className="font-bold">{m.senderName}</span>
                            <span>{m.timestamp}</span>
                          </div>
                          <p className="leading-relaxed">{m.text}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl bg-stone-50 text-center text-xs text-stone-500">
                        Our senior advisor will post your inspection gate pass and confirmation message here shortly.
                      </div>
                    )}
                  </div>
                </div>

                {/* Reply Box */}
                <form onSubmit={handleSendClientReply} className="pt-2 border-t border-stone-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={clientReplyText}
                      onChange={(e) => setClientReplyText(e.target.value)}
                      placeholder="Send message / request time adjustment..."
                      className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              <div className="text-center py-20 text-xs text-stone-500">
                Select an inquiry from the left docket to view communication thread.
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: DATA PRIVACY & SECURITY PROTOCOLS */}
      {activePortalTab === 'privacy' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Client Data Security & Non-Disclosure Charter
            </div>
            <h3 className="text-2xl font-bold text-stone-900">
              Your Privacy is Absolute & Protected
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
              Unlike generic property aggregators that distribute phone numbers to hundreds of third-party call centers, Twin City NCR Realty operates as an exclusive fiduciary broker firm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div className="font-bold text-stone-900">Zero Telemarketing</div>
              <p className="text-stone-600 leading-relaxed">
                Your contact details are strictly restricted to your designated Twin City NCR Realty senior advisor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <Lock className="w-5 h-5 text-amber-600" />
              <div className="font-bold text-stone-900">Encrypted Communication</div>
              <p className="text-stone-600 leading-relaxed">
                Site inspection requests and financial inquiries are encrypted in transit and stored in protected client vaults.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <FileText className="w-5 h-5 text-stone-700" />
              <div className="font-bold text-stone-900">Right to Purge</div>
              <p className="text-stone-600 leading-relaxed">
                You can request complete deletion of your inquiry logs and phone records from our database at any time.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
            <span>Corporate Compliance Office · Sector 132, Noida Expressway</span>
            <a href="mailto:twincityncrrealty@gmail.com" className="text-amber-700 font-bold hover:underline">
              Request Data Summary / Purge
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
