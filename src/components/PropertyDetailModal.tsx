import { useState, useEffect } from 'react';
import { Property } from '../types/property';
import {
  X,
  MapPin,
  Heart,
  Scale,
  Calendar,
  PhoneCall,
  Compass,
  Building,
  Layers,
  Car,
  Maximize2,
  CheckCircle2,
  ShieldCheck,
  Download,
  IndianRupee,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onBookVisit: (property: Property) => void;
  onOpenLightbox: (property: Property, initialIndex: number) => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onBookVisit,
  onOpenLightbox
}: PropertyDetailModalProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'floorplan' | 'virtual360' | 'loan'>('overview');
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Virtual 360 panorama drag simulation state
  const [panoramaX, setPanoramaX] = useState(50);
  const [isDragging360, setIsDragging360] = useState(false);

  useEffect(() => {
    setSelectedPhotoIndex(0);
    setActiveTab('overview');
    setBrochureDownloaded(false);
  }, [property]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const currentPhoto = property.images[selectedPhotoIndex] || property.images[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleDownloadBrochure = () => {
    setBrochureDownloaded(true);
    setTimeout(() => {
      // Simulate brochure package delivery
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', `${property.project}-TwinCityNCRRealty-Brochure.pdf`);
    }, 1000);
  };

  // Quick mortgage estimate based on property price
  const estimatedLoan = property.price * 0.8; // 80% loan
  const monthlyRate = 0.085 / 12; // 8.5% interest
  const months = 240; // 20 years
  const estimatedEmi = Math.round(
    (estimatedLoan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header inside modal */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-800">
              {property.propertyType}
            </span>
            <div className="hidden sm:block text-xs text-stone-500 font-medium">
              ID: {property.id.toUpperCase()} · {property.locality}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(property.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
              title="Save Favorite"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Copy Listing Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Main Visual Showcase / Gallery Frame */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-900 group">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              
              {/* Photo Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent text-white flex items-end justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium drop-shadow-sm">
                    {currentPhoto.caption}
                  </p>
                  <span className="text-[11px] text-stone-300">
                    Photo {selectedPhotoIndex + 1} of {property.images.length}
                  </span>
                </div>

                <button
                  onClick={() => onOpenLightbox(property, selectedPhotoIndex)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View High-Res Lightbox</span>
                </button>
              </div>

              {/* Prev / Next photo buttons */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedPhotoIndex(
                        (prev) => (prev - 1 + property.images.length) % property.images.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedPhotoIndex((prev) => (prev + 1) % property.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedPhotoIndex === idx
                      ? 'border-amber-600 ring-2 ring-amber-200'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Key Meta Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-1">
                <span>{property.bedrooms} Bedrooms</span>
                <span>·</span>
                <span>{property.bathrooms} Bathrooms</span>
                <span>·</span>
                <span>{property.superBuiltUpArea.toLocaleString()} Sq Ft</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{property.locality}</span>
                <span className="text-stone-300">|</span>
                <span className="font-semibold text-stone-800">Developer: {property.developer}</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <div className="text-2xl sm:text-3xl font-bold text-stone-950 font-sans tabular-nums">
                {property.priceFormatted}
              </div>
              <div className="text-xs text-stone-500 font-mono tabular-nums">
                ₹{property.pricePerSqFt.toLocaleString()} / sq ft · Estimated EMI ₹{estimatedEmi.toLocaleString()}/mo
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={() => onBookVisit(property)}
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Book Private Site Visit
                </button>
                <button
                  onClick={handleDownloadBrochure}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{brochureDownloaded ? 'Brochure Sent' : 'E-Brochure'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="border-b border-stone-200">
            <div className="flex items-center gap-6 text-sm font-semibold text-stone-600">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-stone-900 text-stone-950'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                Specifications & Highlights
              </button>
              <button
                onClick={() => setActiveTab('floorplan')}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'floorplan'
                    ? 'border-stone-900 text-stone-950'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                Architectural Floor Plan
              </button>
              <button
                onClick={() => setActiveTab('virtual360')}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'virtual360'
                    ? 'border-stone-900 text-stone-950'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                Interactive 360° Walkthrough
              </button>
              <button
                onClick={() => setActiveTab('loan')}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'loan'
                    ? 'border-stone-900 text-stone-950'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                Financing & EMI
              </button>
            </div>
          </div>

          {/* Tab 1: Overview & Specs */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Tagline & Description */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Residence Overview
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {property.tagline}. Presented exclusively through Twin City NCR Realty. Designed with expansive layouts, generous floor-to-ceiling double-glazed apertures, and private lift foyers for discerning homeowners seeking architectural prominence.
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Technical Property Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Super Built-up Area</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block tabular-nums">
                      {property.superBuiltUpArea.toLocaleString()} Sq Ft
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Carpet Area</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block tabular-nums">
                      {property.carpetArea.toLocaleString()} Sq Ft
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Floor Elevation</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block">
                      {property.floor}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Facing Orientation</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block">
                      {property.facing}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Car Parking Bays</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block">
                      {property.carParking}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Furnishing Status</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block">
                      {property.furnishing}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Possession Status</span>
                    <span className="font-bold text-emerald-700 text-sm mt-0.5 block">
                      {property.possessionTimeline}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Est. Maintenance</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block">
                      ₹{property.maintenanceCostPerSqFt} / sq ft/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Curated Highlights */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Architectural & Investment Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.keyHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Amenities */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Clubhouse & Community Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-stone-100 text-stone-800 font-medium border border-stone-200"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connectivity & Proximity Matrix */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Corridor Connectivity & Commute
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {property.connectivity.map((conn, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950"
                    >
                      <div className="font-bold text-amber-900">{conn.distanceTime}</div>
                      <div className="text-stone-600 mt-0.5">{conn.landmark}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Architectural Floor Plan */}
          {activeTab === 'floorplan' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">Official Unit Layout Plan:</span>{' '}
                  {property.bedrooms} BHK Master Configuration · {property.carpetArea} sq ft Carpet
                </div>
                <button
                  onClick={handleDownloadBrochure}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
                >
                  Download CAD Layout PDF
                </button>
              </div>

              {/* Architectural Layout Diagram Representation */}
              <div className="relative aspect-[16/10] w-full rounded-2xl border-2 border-dashed border-stone-300 bg-stone-100 p-6 flex flex-col items-center justify-center text-center">
                <svg
                  className="w-full max-w-lg h-auto text-stone-400 stroke-current mb-4"
                  viewBox="0 0 500 320"
                  fill="none"
                  strokeWidth="2"
                >
                  {/* Outer Wall Boundary */}
                  <rect x="20" y="20" width="460" height="280" stroke="#44403c" strokeWidth="3" />
                  {/* Master Bedroom */}
                  <rect x="20" y="20" width="180" height="150" />
                  <text x="50" y="90" fill="#292524" stroke="none" fontSize="12" fontWeight="600">
                    Master Suite (16x14)
                  </text>
                  <text x="50" y="110" fill="#78716c" stroke="none" fontSize="10">
                    Private Balcony Attached
                  </text>
                  {/* Bedroom 2 */}
                  <rect x="20" y="170" width="180" height="130" />
                  <text x="50" y="240" fill="#292524" stroke="none" fontSize="12" fontWeight="600">
                    Bedroom 2 (14x12)
                  </text>
                  {/* Grand Living / Dining */}
                  <rect x="200" y="20" width="280" height="190" />
                  <text x="270" y="100" fill="#292524" stroke="none" fontSize="14" fontWeight="bold">
                    Grand Salon & Dining (26x18)
                  </text>
                  <text x="290" y="125" fill="#d97706" stroke="none" fontSize="11" fontWeight="600">
                    Double-Height Ceiling
                  </text>
                  {/* Kitchen & Utility */}
                  <rect x="200" y="210" width="150" height="90" />
                  <text x="225" y="260" fill="#292524" stroke="none" fontSize="11" fontWeight="600">
                    Modular Kitchen (12x10)
                  </text>
                  {/* Foyer / Lift Lobby */}
                  <rect x="350" y="210" width="130" height="90" />
                  <text x="365" y="260" fill="#292524" stroke="none" fontSize="11" fontWeight="600">
                    Private Lift Foyer
                  </text>
                </svg>
                <p className="text-xs text-stone-500">
                  Architectural dimensions subject to physical site verification. Contact our broker advisory team for high-resolution engineered drawings and structural plans.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive 360 Walkthrough */}
          {activeTab === 'virtual360' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-900 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Interactive Virtual Pan View
                  </h4>
                  <p className="text-xs text-stone-300">
                    Drag horizontally to pan across the 360° panoramic salon view.
                  </p>
                </div>
                <div className="text-xs font-mono text-amber-300">
                  Pan: {panoramaX}°
                </div>
              </div>

              <div
                className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-950 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={() => setIsDragging360(true)}
                onMouseUp={() => setIsDragging360(false)}
                onMouseLeave={() => setIsDragging360(false)}
                onMouseMove={(e) => {
                  if (isDragging360) {
                    setPanoramaX((prev) => (prev + e.movementX * 0.2 + 360) % 360);
                  }
                }}
              >
                <img
                  src={property.images[0]?.url}
                  alt="360 Panorama"
                  className="w-full h-full object-cover scale-125 transition-transform duration-75"
                  style={{
                    transform: `scale(1.2) translateX(${(panoramaX - 180) * 0.4}px)`
                  }}
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />
                <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
                  <div className="px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md text-xs font-medium text-white shadow-lg flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400 animate-spin" />
                    <span>Click & drag horizontally to look around</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Mortgage & Loan Breakdown */}
          {activeTab === 'loan' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <h4 className="text-sm font-bold text-stone-900 mb-2">
                  Sample Home Loan Financing Structure
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Property Price</span>
                    <span className="text-base font-bold text-stone-900 mt-1 block">
                      {property.priceFormatted}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">Down Payment (20%)</span>
                    <span className="text-base font-bold text-stone-900 mt-1 block">
                      ₹{((property.price * 0.2) / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-amber-800 block font-semibold">Monthly EMI (20 Yrs @ 8.5%)</span>
                    <span className="text-base font-bold text-amber-950 mt-1 block">
                      ₹{estimatedEmi.toLocaleString()} / mo
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-500 mt-3">
                  Twin City NCR Realty works with top premier private & PSU banks (HDFC, ICICI, SBI Wealth, Axis) for express home loan approvals and preferential interest rates.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="sticky bottom-0 z-20 bg-stone-900 border-t border-stone-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2 text-xs text-stone-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct Broker Advisory · Complete Title Clearance Guaranteed</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBookVisit(property);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Schedule Private Site Tour
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
