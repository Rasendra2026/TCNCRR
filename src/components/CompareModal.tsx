import { Property } from '../types/property';
import { X, Check, Minus, Calendar, Eye, Trash2 } from 'lucide-react';

interface CompareModalProps {
  properties: Property[];
  comparedIds: string[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
}

const COMPARISON_AMENITIES = [
  'Golf Course Facing',
  'Private Plunge Pool',
  'Private Swimming Pool',
  'In-Villa Hydraulic Elevator',
  'High-Speed Private Elevator',
  '100% Power Backup',
  'EV Fast Charging Stations',
  'Gated Community Enclave'
];

export default function CompareModal({
  properties,
  comparedIds,
  onRemoveFromCompare,
  onClearCompare,
  onClose,
  onSelectProperty,
  onBookVisit
}: CompareModalProps) {
  const comparedList = properties.filter((p) => comparedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Side-by-Side Residential Property Comparison
            </h2>
            <p className="text-xs text-stone-500">
              Comparing {comparedList.length} of max 3 residential units
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedList.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              aria-label="Close Comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-x-auto p-6">
          {comparedList.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm text-stone-600">
                No properties selected for comparison yet.
              </p>
              <p className="text-xs text-stone-400">
                Click the comparison icon on any property card to compare pricing, layouts, and amenities side-by-side.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px] space-y-6">
              
              {/* Cards Grid */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider self-end pb-4">
                  Feature / Specification
                </div>
                {comparedList.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-stone-50 rounded-2xl p-4 border border-stone-200 relative flex flex-col justify-between"
                  >
                    <button
                      onClick={() => onRemoveFromCompare(prop.id)}
                      className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-900 rounded-md"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-stone-900">
                      <img
                        src={prop.images[0]?.url}
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1 mb-1">
                      {prop.title}
                    </h4>
                    <div className="text-base font-extrabold text-stone-950 font-sans tabular-nums mb-2">
                      {prop.priceFormatted}
                    </div>

                    <div className="flex items-center gap-1.5 pt-2 border-t border-stone-200">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                        className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
                      >
                        View Specs
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onBookVisit(prop);
                        }}
                        className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                      >
                        Book Visit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              <div className="space-y-2 text-xs divide-y divide-stone-100">
                {/* Price / sqft */}
                <div className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                  <span className="font-semibold text-stone-500">Rate / Sq Ft</span>
                  {comparedList.map((p) => (
                    <span key={p.id} className="font-mono font-bold text-stone-900 tabular-nums">
                      ₹{p.pricePerSqFt.toLocaleString()}/sq ft
                    </span>
                  ))}
                </div>

                {/* Submarket */}
                <div className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                  <span className="font-semibold text-stone-500">Submarket Corridor</span>
                  {comparedList.map((p) => (
                    <span key={p.id} className="text-stone-800 font-medium">
                      {p.submarket}
                    </span>
                  ))}
                </div>

                {/* Bedrooms & Area */}
                <div className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                  <span className="font-semibold text-stone-500">Configuration</span>
                  {comparedList.map((p) => (
                    <span key={p.id} className="text-stone-800">
                      {p.bedrooms} BHK ({p.superBuiltUpArea} sq ft Super)
                    </span>
                  ))}
                </div>

                {/* Carpet Area */}
                <div className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                  <span className="font-semibold text-stone-500">Carpet Area</span>
                  {comparedList.map((p) => (
                    <span key={p.id} className="text-stone-800 font-mono tabular-nums">
                      {p.carpetArea} sq ft
                    </span>
                  ))}
                </div>

                {/* Possession */}
                <div className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                  <span className="font-semibold text-stone-500">Possession Timeline</span>
                  {comparedList.map((p) => (
                    <span key={p.id} className="font-semibold text-emerald-700">
                      {p.possessionTimeline}
                    </span>
                  ))}
                </div>

                {/* Facing */}
                <div className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                  <span className="font-semibold text-stone-500">Facing Orientation</span>
                  {comparedList.map((p) => (
                    <span key={p.id} className="text-stone-800">
                      {p.facing}
                    </span>
                  ))}
                </div>

                {/* Parking */}
                <div className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                  <span className="font-semibold text-stone-500">Car Parking Slots</span>
                  {comparedList.map((p) => (
                    <span key={p.id} className="text-stone-800">
                      {p.carParking}
                    </span>
                  ))}
                </div>

                {/* Amenity Matrix */}
                {COMPARISON_AMENITIES.map((amenity) => (
                  <div key={amenity} className="grid grid-cols-4 gap-4 pt-2.5 items-center">
                    <span className="font-medium text-stone-600">{amenity}</span>
                    {comparedList.map((p) => {
                      const hasAmenity = p.amenities.includes(amenity);
                      return (
                        <div key={p.id}>
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                              <Check className="w-4 h-4 text-emerald-600" />
                              <span>Included</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-stone-400">
                              <Minus className="w-4 h-4" />
                              <span>—</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
