import { useState } from 'react';
import { Property } from '../types/property';
import { Heart, Scale, MapPin, Eye, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
}

export default function PropertyCard({
  property,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onSelectProperty,
  onBookVisit
}: PropertyCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const currentImage = property.images[activeImageIndex]?.url || property.images[0]?.url;

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* High-Resolution Photo Slot with Hover Gallery Controls */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
        {!imageError && currentImage ? (
          <img
            src={currentImage}
            alt={property.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 p-6 text-center">
            <Sparkles className="w-8 h-8 text-amber-400 mb-2" />
            <span className="text-xs font-semibold text-stone-200">{property.title}</span>
            <span className="text-[11px] text-stone-400 mt-1">{property.locality}</span>
          </div>
        )}

        {/* Measured dark scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges (Category & Actions) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-stone-950/80 text-amber-300 backdrop-blur-md border border-stone-800">
            {property.propertyType}
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Compare Checkbox Button */}
            <button
              onClick={() => onToggleCompare(property.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isCompared
                  ? 'bg-amber-500 text-stone-950 ring-2 ring-white shadow-md'
                  : 'bg-stone-950/60 text-white hover:bg-stone-900/90'
              }`}
              title="Add to Comparison"
              aria-label="Add to Comparison"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isSaved
                  ? 'bg-rose-500 text-white ring-2 ring-white shadow-md'
                  : 'bg-stone-950/60 text-white hover:bg-stone-900/90'
              }`}
              title="Save to favorites"
              aria-label="Save to favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image Carousel Arrows (visible on hover) */}
        {property.images.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-stone-950/70 text-white hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-stone-950/70 text-white hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Image Overlay: Price & Per Sq Ft */}
        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between z-10 text-white pointer-events-none">
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm font-sans tabular-nums">
              {property.priceFormatted}
            </div>
            <div className="text-[11px] text-stone-300 drop-shadow-xs font-mono tabular-nums">
              ₹{property.pricePerSqFt.toLocaleString()}/sq ft
            </div>
          </div>
          {property.possessionTimeline.includes('Ready') && (
            <span className="text-[11px] font-semibold text-emerald-300 bg-stone-950/60 px-2 py-0.5 rounded backdrop-blur-xs">
              Ready to Move
            </span>
          )}
        </div>
      </div>

      {/* Clean Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Discipline */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1.5">
            <span>{property.bedrooms} BHK</span>
            <span aria-hidden="true">·</span>
            <span>{property.superBuiltUpArea.toLocaleString()} sq ft</span>
            <span aria-hidden="true">·</span>
            <span>{property.furnishing}</span>
          </div>

          <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1 mb-3 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{property.locality}</span>
          </div>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {property.tagline}
          </p>

          {/* Key Feature Specs */}
          <div className="py-2.5 px-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700 space-y-1 mb-4">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-stone-500">Floor Level</span>
              <span className="font-semibold text-stone-800">{property.floor}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-stone-500">Facing</span>
              <span className="font-semibold text-stone-800 truncate max-w-[170px]" title={property.facing}>
                {property.facing}
              </span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Gallery</span>
          </button>
          <button
            onClick={() => onBookVisit(property)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>
        </div>

      </div>
    </div>
  );
}
