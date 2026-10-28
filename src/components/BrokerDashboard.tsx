import { useState } from 'react';
import { Property, PropertyType, PossessionStatus, FurnishingStatus, ClientInquiry } from '../types/property';
import { NCR_SUBMARKETS, PROPERTY_TYPES } from '../data/properties';
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  MapPin,
  IndianRupee,
  Building,
  CheckCircle2,
  X,
  Search,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldAlert,
  Send,
  Eye
} from 'lucide-react';

interface BrokerDashboardProps {
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onUpdateProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
  inquiries: ClientInquiry[];
  onUpdateInquiryStatus: (inquiryId: string, status: ClientInquiry['status'], consultant?: string) => void;
  onSendBrokerMessage: (inquiryId: string, messageText: string) => void;
  onSelectProperty: (property: Property) => void;
}

const PRESET_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Noida Expressway': { lat: 28.512, lng: 77.382 },
  'Greater Noida': { lat: 28.474, lng: 77.504 },
  'Golf Course Extension': { lat: 28.407, lng: 77.067 },
  'Dwarka Expressway': { lat: 28.528, lng: 77.012 },
  'Central Noida': { lat: 28.572, lng: 77.371 },
  'New Gurgaon': { lat: 28.318, lng: 77.065 }
};

const SAMPLE_LUXURY_IMAGES = [
  { url: '/src/assets/images/hero_luxury_residential_1793178138943.jpg', caption: 'High-rise architectural exterior' },
  { url: '/src/assets/images/penthouse_living_room_1793178139843.jpg', caption: 'Double-height luxury living salon' },
  { url: '/src/assets/images/modern_villa_exterior_1793178140215.jpg', caption: 'Modern villa with private swimming pool' },
  { url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg', caption: 'Master bedroom suite with balcony' },
  { url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg', caption: 'Clubhouse with infinity edge pool' }
];

export default function BrokerDashboard({
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  inquiries,
  onUpdateInquiryStatus,
  onSendBrokerMessage,
  onSelectProperty
}: BrokerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries'>('listings');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form modal state (for Add or Edit)
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Broker inquiry reply state
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [project, setProject] = useState('');
  const [developer, setDeveloper] = useState('');
  const [locality, setLocality] = useState('');
  const [submarket, setSubmarket] = useState<Property['submarket']>('Noida Expressway');
  const [city, setCity] = useState<Property['city']>('Noida');
  const [price, setPrice] = useState<number>(35000000);
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [balconies, setBalconies] = useState<number>(3);
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState<number>(2400);
  const [carpetArea, setCarpetArea] = useState<number>(1850);
  const [possession, setPossession] = useState<PossessionStatus>('Ready to Move');
  const [possessionTimeline, setPossessionTimeline] = useState('Ready to Move');
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('Semi-Furnished');
  const [floor, setFloor] = useState('12th of 25 Floors');
  const [facing, setFacing] = useState('North-East, Park Facing');
  const [carParking, setCarParking] = useState('2 Dedicated Covered');
  const [latitude, setLatitude] = useState<number>(28.512);
  const [longitude, setLongitude] = useState<number>(77.382);
  const [images, setImages] = useState<{ url: string; caption: string }[]>(SAMPLE_LUXURY_IMAGES.slice(0, 3));
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [floorPlanUrl, setFloorPlanUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [amenitiesString, setAmenitiesString] = useState('Golf Course Facing, 100% Power Backup, Swimming Pool, Gated Community Enclave');
  const [keyHighlightsString, setKeyHighlightsString] = useState('Triple-height entrance lobby, VRV air conditioning, Prime corridor road frontage');
  const [maintenanceCost, setMaintenanceCost] = useState<number>(3.5);
  const [featured, setFeatured] = useState<boolean>(true);
  const [exclusive, setExclusive] = useState<boolean>(false);
  const [status, setStatus] = useState<'Active' | 'Under Offer' | 'Sold'>('Active');

  // Open editor for creating new listing
  const handleOpenCreate = () => {
    setEditingPropertyId(null);
    setTitle('');
    setTagline('');
    setProject('');
    setDeveloper('');
    setLocality('');
    setSubmarket('Noida Expressway');
    setCity('Noida');
    setPrice(35000000);
    setPropertyType('Apartment');
    setBedrooms(3);
    setBathrooms(3);
    setBalconies(3);
    setSuperBuiltUpArea(2400);
    setCarpetArea(1850);
    setPossession('Ready to Move');
    setPossessionTimeline('Ready to Move');
    setFurnishing('Semi-Furnished');
    setFloor('12th of 25 Floors');
    setFacing('North-East, Park Facing');
    setCarParking('2 Dedicated Covered');
    setLatitude(28.512);
    setLongitude(77.382);
    setImages(SAMPLE_LUXURY_IMAGES.slice(0, 3));
    setAmenitiesString('Golf Course Facing, 100% Power Backup, Swimming Pool, Gated Community Enclave');
    setKeyHighlightsString('Triple-height entrance lobby, VRV air conditioning, Prime corridor road frontage');
    setMaintenanceCost(3.5);
    setFeatured(true);
    setExclusive(false);
    setStatus('Active');
    setIsEditorOpen(true);
  };

  // Open editor to edit an existing property
  const handleOpenEdit = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setTitle(prop.title);
    setTagline(prop.tagline);
    setProject(prop.project);
    setDeveloper(prop.developer);
    setLocality(prop.locality);
    setSubmarket(prop.submarket);
    setCity(prop.city);
    setPrice(prop.price);
    setPropertyType(prop.propertyType);
    setBedrooms(prop.bedrooms);
    setBathrooms(prop.bathrooms);
    setBalconies(prop.balconies);
    setSuperBuiltUpArea(prop.superBuiltUpArea);
    setCarpetArea(prop.carpetArea);
    setPossession(prop.possession);
    setPossessionTimeline(prop.possessionTimeline);
    setFurnishing(prop.furnishing);
    setFloor(prop.floor);
    setFacing(prop.facing);
    setCarParking(prop.carParking);
    setLatitude(prop.latitude);
    setLongitude(prop.longitude);
    setImages(prop.images || []);
    setFloorPlanUrl(prop.floorPlanUrl || '');
    setAmenitiesString(prop.amenities ? prop.amenities.join(', ') : '');
    setKeyHighlightsString(prop.keyHighlights ? prop.keyHighlights.join(', ') : '');
    setMaintenanceCost(prop.maintenanceCostPerSqFt || 3.5);
    setFeatured(!!prop.featured);
    setExclusive(!!prop.exclusive);
    setStatus(prop.status || 'Active');
    setIsEditorOpen(true);
  };

  const handleSubmarketChange = (sub: Property['submarket']) => {
    setSubmarket(sub);
    const coords = PRESET_COORDINATES[sub];
    if (coords) {
      setLatitude(coords.lat);
      setLongitude(coords.lng);
    }
    if (sub === 'Golf Course Extension' || sub === 'Dwarka Expressway' || sub === 'New Gurgaon') {
      setCity('Gurugram');
    } else if (sub === 'Greater Noida') {
      setCity('Greater Noida');
    } else {
      setCity('Noida');
    }
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [
      ...prev,
      {
        url: newImageUrl.trim(),
        caption: newImageCaption.trim() || `${title || 'Property'} Photo`
      }
    ]);
    setNewImageUrl('');
    setNewImageCaption('');
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const pricePerSqFt = Math.round(price / (superBuiltUpArea || 1));
    const priceFormatted =
      price >= 10000000
        ? `₹${(price / 10000000).toFixed(2)} Cr`
        : `₹${(price / 100000).toFixed(2)} Lakh`;

    const amenities = amenitiesString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const keyHighlights = keyHighlightsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const propertyPayload: Property = {
      id: editingPropertyId || `tcncr-${Date.now()}`,
      title,
      tagline,
      project: project || title,
      developer: developer || 'Twin City Premier Partner',
      locality,
      submarket,
      city,
      price,
      priceFormatted,
      pricePerSqFt,
      propertyType,
      bedrooms,
      bathrooms,
      balconies,
      superBuiltUpArea,
      carpetArea,
      possession,
      possessionTimeline,
      furnishing,
      floor,
      facing,
      carParking,
      latitude,
      longitude,
      images: images.length > 0 ? images : SAMPLE_LUXURY_IMAGES.slice(0, 2),
      floorPlanUrl: floorPlanUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      amenities,
      keyHighlights,
      connectivity: [
        { landmark: `${submarket} Main Arterial`, distanceTime: 'Direct 2 Mins' },
        { landmark: 'Nearest Metro Station', distanceTime: '5 Mins' },
        { landmark: 'Airport Expressway Link', distanceTime: '25 Mins' }
      ],
      maintenanceCostPerSqFt: maintenanceCost,
      featured,
      exclusive,
      status,
      updatedAt: new Date().toLocaleDateString('en-IN')
    };

    if (editingPropertyId) {
      onUpdateProperty(propertyPayload);
    } else {
      onAddProperty(propertyPayload);
    }

    setIsEditorOpen(false);
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      searchTerm === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.propertyType === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const activeInquiry = inquiries.find((i) => i.id === selectedInquiryId) || inquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeInquiry) return;
    onSendBrokerMessage(activeInquiry.id, replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-amber-400 text-xs font-semibold mb-2">
            <Building className="w-3.5 h-3.5" />
            <span>Broker Command Center · twincityncrrealty.com</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Property Listing Management & Client Desk
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Publish, categorize, and update residential inventory and manage registered client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'listings'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Listings Directory ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Client Inquiries ({inquiries.length})</span>
            </button>
          </div>

          {activeTab === 'listings' && (
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Listing</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: LISTINGS MANAGEMENT */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, project, locality, developer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Villa">Villa</option>
                <option value="Builder Floor">Builder Floor</option>
              </select>
            </div>
          </div>

          {/* Table / Grid of Managed Properties */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-stone-200">
                <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-6 py-3.5">Listing / Residence</th>
                    <th className="px-4 py-3.5">Submarket & Locality</th>
                    <th className="px-4 py-3.5">Category & Specs</th>
                    <th className="px-4 py-3.5">Price & /sq ft</th>
                    <th className="px-4 py-3.5">Map Coordinates</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                            <img
                              src={prop.images[0]?.url}
                              alt={prop.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                              {prop.title}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              {prop.project} · Dev: {prop.developer}
                            </div>
                            <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                              {prop.images.length} High-Res Photos Loaded
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-semibold text-stone-800">{prop.submarket}</div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span>{prop.locality}</span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-semibold text-stone-900">{prop.propertyType}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {prop.bedrooms} BHK · {prop.superBuiltUpArea.toLocaleString()} sq ft
                        </div>
                        <div className="text-[10px] text-emerald-700 font-medium">
                          {prop.possession}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-bold text-stone-950 font-sans tabular-nums text-sm">
                          {prop.priceFormatted}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono tabular-nums">
                          ₹{prop.pricePerSqFt.toLocaleString()}/sq ft
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-mono text-[11px] text-stone-600 tabular-nums">
                          {prop.latitude.toFixed(4)}, {prop.longitude.toFixed(4)}
                        </div>
                        <div className="text-[10px] text-stone-400">Pinnable on Map</div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {prop.status || 'Active'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectProperty(prop)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(prop)}
                            className="p-1.5 rounded-lg text-amber-700 hover:text-amber-900 hover:bg-amber-50 transition-colors"
                            title="Edit Listing"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${prop.title}?`)) {
                                onDeleteProperty(prop.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-900 hover:bg-rose-50 transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT INQUIRIES & TWO-WAY MESSAGING */}
      {activeTab === 'inquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Inquiries list */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-3 max-h-[700px] overflow-y-auto">
            <div className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
              Registered Inquiries & Private Tours ({inquiries.length})
            </div>

            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500">
                No inquiries submitted yet.
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiryId(inq.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    (selectedInquiryId === inq.id || (!selectedInquiryId && inquiries[0]?.id === inq.id))
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
                    {inq.name} · <span className="text-stone-500 font-normal">{inq.phone}</span>
                  </div>

                  {inq.propertyName && (
                    <div className="text-[11px] text-amber-800 font-semibold line-clamp-1 mt-0.5">
                      {inq.propertyName}
                    </div>
                  )}

                  <div className="text-[10px] text-stone-500 mt-1 flex items-center justify-between">
                    <span>{inq.createdAt}</span>
                    <span>{inq.type.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Selected Inquiry Detail & Broker Message Composer */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between min-h-[500px]">
            {activeInquiry ? (
              <div className="space-y-6">
                
                {/* Inquiry Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
                  <div>
                    <div className="text-xs font-mono text-stone-500">Docket {activeInquiry.id}</div>
                    <h3 className="text-lg font-bold text-stone-900">{activeInquiry.name}</h3>
                    <div className="text-xs text-stone-500">
                      {activeInquiry.phone} · {activeInquiry.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={activeInquiry.status}
                      onChange={(e) =>
                        onUpdateInquiryStatus(
                          activeInquiry.id,
                          e.target.value as ClientInquiry['status']
                        )
                      }
                      className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none"
                    >
                      <option value="In Review">In Review</option>
                      <option value="Consultant Assigned">Consultant Assigned</option>
                      <option value="Visit Scheduled">Visit Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Inquiry Details */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Property of Interest:</span>
                    <span className="font-bold text-stone-900">{activeInquiry.propertyName || 'General Inquiry'}</span>
                  </div>
                  {activeInquiry.preferredDate && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Requested Visit Date:</span>
                      <span className="font-semibold text-stone-900">
                        {activeInquiry.preferredDate} ({activeInquiry.preferredTimeSlot})
                      </span>
                    </div>
                  )}
                  {activeInquiry.needChauffeurPickup && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Chauffeur Transport:</span>
                      <span className="font-semibold text-amber-700">
                        Requested ({activeInquiry.pickupLocation || 'NCR Address'})
                      </span>
                    </div>
                  )}
                  {activeInquiry.message && (
                    <div className="pt-2 border-t border-stone-200/80">
                      <span className="text-stone-500 block mb-1">Client Message:</span>
                      <p className="text-stone-800 italic">"{activeInquiry.message}"</p>
                    </div>
                  )}
                </div>

                {/* Message Conversation Thread */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                    Encrypted Broker-Client Message Thread
                  </h4>
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {activeInquiry.messages && activeInquiry.messages.length > 0 ? (
                      activeInquiry.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                            msg.sender === 'broker'
                              ? 'ml-auto bg-stone-900 text-white'
                              : 'mr-auto bg-stone-100 text-stone-900'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 mb-1">
                            <span className="font-bold">{msg.senderName}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <p className="leading-relaxed">{msg.text}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl bg-stone-50 text-center text-xs text-stone-400">
                        No messages exchanged yet. Send a direct message or confirmation below.
                      </div>
                    )}
                  </div>
                </div>

                {/* Composer Form */}
                <form onSubmit={handleSendReply} className="pt-2 border-t border-stone-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write message / gate pass info to client..."
                      className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to Client</span>
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              <div className="text-center py-20 text-xs text-stone-500">
                Select an inquiry from the docket on the left to review details and respond.
              </div>
            )}
          </div>

        </div>
      )}

      {/* MODAL: PROPERTY EDITOR (CREATE / UPDATE) */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div
            className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {editingPropertyId ? 'Update Residential Listing' : 'Upload New Residential Property'}
                </h3>
                <p className="text-xs text-stone-500">
                  Configure specifications, map coordinates, pricing, and high-resolution photo galleries.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProperty} className="overflow-y-auto p-6 space-y-6">
              
              {/* Core Information */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                  01. Basic Title & Categorization
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Listing Headline Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The Imperial Sky Penthouse at Sector 150"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Architectural Tagline / Summary *</label>
                    <input
                      type="text"
                      required
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Panoramic 4 BHK Duplex with Private Pool and Unobstructed Golf Views"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Property Category *</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Villa">Villa</option>
                      <option value="Builder Floor">Builder Floor</option>
                      <option value="Plotted Development">Plotted Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Project Name & Developer *</label>
                    <input
                      type="text"
                      required
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder="e.g. Kalpataru Vista / Godrej Palm Retreat"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Map Pin Coordinates */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                  02. Location & Interactive Map Pinning
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">NCR Submarket Corridor *</label>
                    <select
                      value={submarket}
                      onChange={(e) => handleSubmarketChange(e.target.value as Property['submarket'])}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="Noida Expressway">Noida Expressway</option>
                      <option value="Greater Noida">Greater Noida</option>
                      <option value="Golf Course Extension">Golf Course Extension</option>
                      <option value="Dwarka Expressway">Dwarka Expressway</option>
                      <option value="Central Noida">Central Noida</option>
                      <option value="New Gurgaon">New Gurgaon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Specific Locality / Sector *</label>
                    <input
                      type="text"
                      required
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="e.g. Sector 128, Noida Expressway"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">City</label>
                    <input
                      type="text"
                      disabled
                      value={city}
                      className="w-full bg-stone-100 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Map Latitude (NCR) *</label>
                    <input
                      type="number"
                      step="0.0001"
                      required
                      value={latitude}
                      onChange={(e) => setLatitude(parseFloat(e.target.value))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Map Longitude (NCR) *</label>
                    <input
                      type="number"
                      step="0.0001"
                      required
                      value={longitude}
                      onChange={(e) => setLongitude(parseFloat(e.target.value))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        const coords = PRESET_COORDINATES[submarket];
                        if (coords) {
                          setLatitude(coords.lat);
                          setLongitude(coords.lng);
                        }
                      }}
                      className="w-full py-2 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                    >
                      Apply Corridor Center Pin
                    </button>
                  </div>
                </div>
              </div>

              {/* Pricing & Dimensions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                  03. Pricing & Technical Dimensions
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Total Price (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Super Area (Sq Ft) *</label>
                    <input
                      type="number"
                      required
                      value={superBuiltUpArea}
                      onChange={(e) => setSuperBuiltUpArea(parseInt(e.target.value, 10))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Carpet Area (Sq Ft) *</label>
                    <input
                      type="number"
                      required
                      value={carpetArea}
                      onChange={(e) => setCarpetArea(parseInt(e.target.value, 10))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Bedrooms (BHK) *</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(parseInt(e.target.value, 10))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value={2}>2 BHK</option>
                      <option value={3}>3 BHK</option>
                      <option value={4}>4 BHK</option>
                      <option value={5}>5+ BHK / Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(parseInt(e.target.value, 10))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Possession Status</label>
                    <select
                      value={possession}
                      onChange={(e) => setPossession(e.target.value as PossessionStatus)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                    >
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction">Under Construction</option>
                      <option value="Immediate Possession">Immediate Possession</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Floor Level</label>
                    <input
                      type="text"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      placeholder="e.g. 14th of 26 Floors"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Car Parking</label>
                    <input
                      type="text"
                      value={carParking}
                      onChange={(e) => setCarParking(e.target.value)}
                      placeholder="e.g. 2 Covered Bays"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* High-Resolution Photo Gallery Manager */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                  04. High-Resolution Photo Gallery Management ({images.length} Loaded)
                </h4>
                
                {/* Image Thumbnails List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-stone-200 bg-stone-900 aspect-[4/3]">
                      <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[10px]">
                        <span className="line-clamp-2">{img.caption}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="self-end px-2 py-1 rounded bg-rose-600 text-white font-bold"
                        >
                          Remove
                        </button>
                      </div>
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Photo Bar */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="text-xs font-bold text-stone-700">Add Image URL & Caption:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Paste image URL (e.g. /src/assets/images/...)"
                      className="sm:col-span-2 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                    />
                    <input
                      type="text"
                      value={newImageCaption}
                      onChange={(e) => setNewImageCaption(e.target.value)}
                      placeholder="Photo caption (e.g. Master suite balcony)"
                      className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-500">Quick presets:</span>
                      <button
                        type="button"
                        onClick={() => setImages(SAMPLE_LUXURY_IMAGES)}
                        className="text-[11px] text-amber-700 font-bold hover:underline"
                      >
                        Load 5-Photo Luxury Architectural Set
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="px-3.5 py-1.5 text-xs font-bold text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors"
                    >
                      + Add Image to Gallery
                    </button>
                  </div>
                </div>
              </div>

              {/* Amenities & Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                  05. Amenities & Architectural Highlights
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Amenities (comma-separated tags)
                    </label>
                    <input
                      type="text"
                      value={amenitiesString}
                      onChange={(e) => setAmenitiesString(e.target.value)}
                      placeholder="Golf Course Facing, 100% Power Backup, Swimming Pool, Gated Community Enclave"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Key Highlights (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={keyHighlightsString}
                      onChange={(e) => setKeyHighlightsString(e.target.value)}
                      placeholder="Double-height ceiling, Direct expressway access, Private elevator"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editingPropertyId ? 'Save & Update Listing' : 'Publish Property to Website & Map'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
