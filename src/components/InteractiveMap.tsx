import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Property } from '../types/property';
import { MapPin, Navigation, Eye, Calendar, Sparkles, Filter } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
  onFilterArea?: (submarket: string) => void;
  heightClass?: string;
}

export default function InteractiveMap({
  properties,
  selectedProperty,
  onSelectProperty,
  onBookVisit,
  onFilterArea,
  heightClass = 'h-[540px]'
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [activeSubmarket, setActiveSubmarket] = useState<string>('all');

  // Submarket viewport centers
  const submarketCoordinates: Record<string, { lat: number; lng: number; zoom: number }> = {
    all: { lat: 28.495, lng: 77.285, zoom: 11 },
    'Noida Expressway': { lat: 28.505, lng: 77.395, zoom: 12 },
    'Greater Noida': { lat: 28.474, lng: 77.504, zoom: 12 },
    'Golf Course Extension': { lat: 28.407, lng: 77.067, zoom: 13 },
    'Dwarka Expressway': { lat: 28.528, lng: 77.012, zoom: 13 },
    'Central Noida': { lat: 28.572, lng: 77.371, zoom: 13 }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map is already initialized
    if (!mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [28.495, 77.285],
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      // Add CartoDB Voyager tiles for clean luxury architectural aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Add zoom controls top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add property markers
    properties.forEach((property) => {
      const isSelected = selectedProperty?.id === property.id;
      
      const pinHtml = `
        <div class="custom-map-pin flex items-center justify-center cursor-pointer transition-all ${
          isSelected ? 'scale-110 z-50' : ''
        }">
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg ${
            isSelected
              ? 'bg-amber-600 text-white ring-4 ring-amber-200 font-bold'
              : 'bg-stone-900 text-stone-100 hover:bg-stone-800 border border-stone-700'
          }">
            <span class="text-xs font-semibold whitespace-nowrap">${property.priceFormatted}</span>
            <span class="text-[10px] text-amber-300 font-medium">${property.bedrooms}BHK</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-div-icon',
        iconSize: [85, 34],
        iconAnchor: [42, 17]
      });

      const marker = L.marker([property.latitude, property.longitude], {
        icon: customIcon
      }).addTo(map);

      // Popup content with high-res image and clean details linking to full listing
      const popupHtml = `
        <div class="w-68 overflow-hidden rounded-xl font-sans bg-white shadow-xl">
          <div class="relative h-32 w-full overflow-hidden bg-stone-900">
            <img src="${property.images[0]?.url}" alt="${property.title}" class="w-full h-full object-cover" />
            <div class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-stone-900/80 text-amber-300 backdrop-blur-sm">
              ${property.propertyType}
            </div>
            <div class="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-bold bg-amber-600 text-white shadow-sm">
              ${property.priceFormatted}
            </div>
          </div>
          <div class="p-3.5">
            <h4 class="text-xs font-bold text-stone-900 line-clamp-1">${property.title}</h4>
            <p class="text-[11px] text-stone-500 line-clamp-1 mb-1.5">${property.locality}</p>
            <div class="text-[11px] text-stone-600 flex items-center gap-2 mb-2">
              <span>${property.bedrooms} Beds</span>
              <span>·</span>
              <span>${property.superBuiltUpArea.toLocaleString()} sq ft</span>
              <span>·</span>
              <span class="text-stone-900 font-medium">${property.possessionTimeline.includes('Ready') ? 'Ready' : 'Under Const.'}</span>
            </div>
            <div class="flex items-center gap-2 pt-2 border-t border-stone-100">
              <button id="view-details-${property.id}" class="flex-1 py-1.5 px-2 text-center text-[11px] font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1">
                <span>View Full Listing →</span>
              </button>
              <button id="book-visit-${property.id}" class="flex-1 py-1.5 px-2 text-center text-[11px] font-bold text-white bg-stone-900 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer">
                Book Visit
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: true,
        autoPan: true
      });

      marker.on('popupopen', () => {
        const viewBtn = document.getElementById(`view-details-${property.id}`);
        const bookBtn = document.getElementById(`book-visit-${property.id}`);
        if (viewBtn) {
          viewBtn.onclick = () => onSelectProperty(property);
        }
        if (bookBtn) {
          bookBtn.onclick = () => onBookVisit(property);
        }
      });

      marker.on('click', () => {
        onSelectProperty(property);
      });

      markersRef.current[property.id] = marker;
    });

    // Invalidate map size to prevent rendering glitch on tab/resize
    setTimeout(() => {
      map.invalidateSize();
    }, 150);
  }, [properties, selectedProperty]);

  // Handle selected property changes (pan & open popup)
  useEffect(() => {
    if (selectedProperty && mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      map.flyTo([selectedProperty.latitude, selectedProperty.longitude], 14, {
        duration: 1.2
      });
      const marker = markersRef.current[selectedProperty.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 600);
      }
    }
  }, [selectedProperty]);

  // Submarket jump handler
  const handleJumpToSubmarket = (submarket: string) => {
    setActiveSubmarket(submarket);
    if (onFilterArea) {
      onFilterArea(submarket === 'all' ? 'All Submarkets' : submarket);
    }
    if (mapInstanceRef.current && submarketCoordinates[submarket]) {
      const target = submarketCoordinates[submarket];
      mapInstanceRef.current.flyTo([target.lat, target.lng], target.zoom, {
        duration: 1.2
      });
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm">
      {/* Submarket Jump Navigation Bar */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-stone-200 max-w-[95%] md:max-w-none">
        <div className="flex items-center gap-1 px-2 text-xs font-bold text-stone-800 whitespace-nowrap">
          <Navigation className="w-3.5 h-3.5 text-amber-600" />
          <span>Browse Area:</span>
        </div>
        <button
          onClick={() => handleJumpToSubmarket('all')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubmarket === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          All NCR ({properties.length})
        </button>
        <button
          onClick={() => handleJumpToSubmarket('Noida Expressway')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubmarket === 'Noida Expressway'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Noida Expressway
        </button>
        <button
          onClick={() => handleJumpToSubmarket('Greater Noida')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubmarket === 'Greater Noida'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Greater Noida & Jaypee
        </button>
        <button
          onClick={() => handleJumpToSubmarket('Golf Course Extension')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubmarket === 'Golf Course Extension'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Golf Course Extn (Gurugram)
        </button>
        <button
          onClick={() => handleJumpToSubmarket('Dwarka Expressway')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubmarket === 'Dwarka Expressway'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Dwarka Expressway
        </button>
      </div>

      {/* Map Legend & Hub Proximities */}
      <div className="absolute bottom-3 left-3 z-[1000] hidden sm:flex items-center gap-3 px-3.5 py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-stone-200 text-xs text-stone-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-amber-200"></span>
          <span className="font-semibold">{properties.length} Active Pinned Properties</span>
        </div>
        <span className="text-stone-300">|</span>
        <div className="flex items-center gap-1.5 text-stone-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Click any pin to inspect summary and open full property listing</span>
        </div>
      </div>

      {/* Map Element */}
      <div ref={mapContainerRef} className={`w-full ${heightClass} z-0`} />
    </div>
  );
}
