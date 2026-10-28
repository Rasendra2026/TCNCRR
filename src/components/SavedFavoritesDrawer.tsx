import { Property } from '../types/property';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

interface SavedFavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  savedIds: string[];
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
}

export default function SavedFavoritesDrawer({
  isOpen,
  onClose,
  properties,
  savedIds,
  onRemoveSaved,
  onClearAll,
  onSelectProperty,
  onBookVisit
}: SavedFavoritesDrawerProps) {
  if (!isOpen) return null;

  const savedList = properties.filter((p) => savedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <div>
              <h3 className="text-base font-bold text-stone-900">Saved Residences</h3>
              <p className="text-xs text-stone-500">{savedList.length} Bookmarked Properties</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedList.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-stone-500 hover:text-stone-900 p-1.5 transition-colors"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Saved Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedList.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <Heart className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-700">No saved properties yet</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any residential listing to bookmark it for quick access and review.
              </p>
            </div>
          ) : (
            savedList.map((prop) => (
              <div
                key={prop.id}
                className="group relative flex gap-3 p-3 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors cursor-pointer"
                onClick={() => {
                  onClose();
                  onSelectProperty(prop);
                }}
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                  <img
                    src={prop.images[0]?.url}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{prop.locality}</p>
                    <div className="text-[11px] text-stone-600 mt-1">
                      {prop.bedrooms} BHK · {prop.superBuiltUpArea.toLocaleString()} sq ft
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-extrabold text-stone-950 font-sans tabular-nums">
                      {prop.priceFormatted}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSaved(prop.id);
                      }}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedList.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2">
            <button
              onClick={() => {
                onClose();
                onBookVisit(savedList[0]);
              }}
              className="w-full py-2.5 px-4 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Tour for Saved Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
