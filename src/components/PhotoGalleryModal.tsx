import { useEffect, useState } from 'react';
import { Property } from '../types/property';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

interface PhotoGalleryModalProps {
  property: Property | null;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoGalleryModal({
  property,
  initialIndex,
  isOpen,
  onClose
}: PhotoGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && property) {
        setCurrentIndex((prev) => (prev + 1) % property.images.length);
      }
      if (e.key === 'ArrowLeft' && property) {
        setCurrentIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, property, onClose]);

  if (!isOpen || !property) return null;

  const currentImage = property.images[currentIndex] || property.images[0];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-20">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-stone-400">
            Photo {currentIndex + 1} of {property.images.length} · {property.locality}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Large Image Canvas */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <img
          src={currentImage.url}
          alt={currentImage.caption}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-[92vw] object-contain rounded-xl shadow-2xl transition-all duration-300"
        />

        {/* Previous Button */}
        {property.images.length > 1 && (
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
            }
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white border border-stone-700 shadow-xl transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {property.images.length > 1 && (
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % property.images.length)}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white border border-stone-700 shadow-xl transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Caption */}
      <div className="space-y-3 z-20">
        <p className="text-center text-xs sm:text-sm text-stone-200 font-medium">
          {currentImage.caption}
        </p>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 sm:w-20 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
