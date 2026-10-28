import { useState } from 'react';
import { Property, ClientInquiry } from '../types/property';
import { X, Calendar, Phone, Mail, User, CheckCircle2, Car, Clock } from 'lucide-react';

interface SiteVisitBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  properties: Property[];
  onAddInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status' | 'messages'>) => void;
}

export default function SiteVisitBookingModal({
  isOpen,
  onClose,
  property,
  properties,
  onAddInquiry
}: SiteVisitBookingModalProps) {
  const [selectedPropId, setSelectedPropId] = useState<string>(property?.id || properties[0]?.id || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM (Morning)');
  const [chauffeur, setChauffeur] = useState(false);
  const [pickupAddr, setPickupAddr] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentProperty = properties.find((p) => p.id === selectedPropId) || property || properties[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInquiry({
      type: 'site_visit',
      name,
      phone,
      email,
      propertyName: currentProperty?.title,
      propertyId: currentProperty?.id,
      preferredDate: date,
      preferredTimeSlot: timeSlot,
      needChauffeurPickup: chauffeur,
      pickupLocation: chauffeur ? pickupAddr : undefined,
      message: `Direct site inspection request for ${currentProperty?.title}`
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Schedule Private Site Inspection
            </h3>
            <p className="text-xs text-stone-500">
              Guided tour with senior residential advisor
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">
              Tour Request Confirmed!
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
              We have scheduled your private inspection for{' '}
              <strong>{currentProperty?.title}</strong>. Our senior broker will call you shortly to confirm gate passes and route directions.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Property Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Selected Residence
              </label>
              <select
                value={selectedPropId}
                onChange={(e) => setSelectedPropId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.priceFormatted})
                  </option>
                ))}
              </select>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 Mobile No"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>10:00 AM - 12:00 PM</option>
                  <option>02:00 PM - 04:00 PM</option>
                  <option>04:30 PM - 06:30 PM</option>
                </select>
              </div>
            </div>

            {/* Chauffeur transport option */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <label className="flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chauffeur}
                  onChange={(e) => setChauffeur(e.target.checked)}
                  className="rounded accent-amber-600"
                />
                <span>Request Chauffeur Pickup from my residence/hotel in NCR</span>
              </label>

              {chauffeur && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={pickupAddr}
                    onChange={(e) => setPickupAddr(e.target.value)}
                    placeholder="Enter pickup address in NCR"
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Confirm Site Inspection Appointment
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
