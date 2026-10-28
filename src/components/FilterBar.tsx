import { useState } from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FilterState } from '../types/property';
import { NCR_SUBMARKETS, PROPERTY_TYPES } from '../data/properties';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
}

const COMMON_AMENITIES = [
  'Golf Course Facing',
  'Private Plunge Pool',
  'Private Swimming Pool',
  'In-Villa Hydraulic Elevator',
  'High-Speed Private Elevator',
  '100% Power Backup',
  'EV Fast Charging Stations',
  'Gated Community Enclave'
];

export default function FilterBar({
  filters,
  setFilters,
  totalMatches
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      submarket: 'All Submarkets',
      city: 'All Cities',
      propertyType: 'All Types',
      minPrice: 0,
      maxPrice: 150000000,
      bedrooms: null,
      possession: 'All',
      minArea: 0,
      amenities: [],
      sortBy: 'featured'
    });
  };

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const activeFilterCount =
    (filters.searchQuery ? 1 : 0) +
    (filters.submarket !== 'All Submarkets' ? 1 : 0) +
    (filters.propertyType !== 'All Types' ? 1 : 0) +
    (filters.bedrooms !== null ? 1 : 0) +
    (filters.possession !== 'All' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 150000000 ? 1 : 0) +
    (filters.minArea > 0 ? 1 : 0) +
    filters.amenities.length;

  return (
    <div className="bg-white border-y border-stone-200 sticky top-18 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Main Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Quick Filter Buttons & Segmented Controls */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {/* All */}
            <button
              onClick={() => setFilters((p) => ({ ...p, submarket: 'All Submarkets', propertyType: 'All Types' }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filters.submarket === 'All Submarkets' && filters.propertyType === 'All Types'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Listings ({totalMatches})
            </button>

            {/* Ready to Move */}
            <button
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  possession: p.possession === 'Ready to Move' ? 'All' : 'Ready to Move'
                }))
              }
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filters.possession === 'Ready to Move'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Ready to Move
            </button>

            {/* Penthouses */}
            <button
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  propertyType: p.propertyType === 'Penthouse' ? 'All Types' : 'Penthouse'
                }))
              }
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filters.propertyType === 'Penthouse'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Penthouses
            </button>

            {/* Villas */}
            <button
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  propertyType: p.propertyType === 'Villa' ? 'All Types' : 'Villa'
                }))
              }
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filters.propertyType === 'Villa'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Luxury Villas
            </button>

            {/* Golf Facing */}
            <button
              onClick={() => toggleAmenity('Golf Course Facing')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filters.amenities.includes('Golf Course Facing')
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Golf Facing
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    sortBy: e.target.value as FilterState['sortBy']
                  }))
                }
                className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="area_desc">Largest Area</option>
                <option value="newest">Latest Added</option>
              </select>
            </div>

            {/* Advanced Filters Toggle Button */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                showAdvanced || activeFilterCount > 0
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
              <span>Filter Matrix</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
              {showAdvanced ? (
                <ChevronUp className="w-3.5 h-3.5 text-stone-500" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              )}
            </button>

            {/* Reset button if filters active */}
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable Advanced Filter Drawer */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            
            {/* Submarket Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                NCR Submarket Corridor
              </label>
              <select
                value={filters.submarket}
                onChange={(e) => setFilters((p) => ({ ...p, submarket: e.target.value }))}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {NCR_SUBMARKETS.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms (BHK) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Bedrooms / Configuration
              </label>
              <div className="flex items-center gap-1">
                {[null, 3, 4, 5].map((bhk) => (
                  <button
                    key={bhk ?? 'any'}
                    onClick={() => setFilters((p) => ({ ...p, bedrooms: bhk }))}
                    className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                      filters.bedrooms === bhk
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {bhk === null ? 'Any' : `${bhk} BHK`}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget / Price Range */}
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>Budget Max</span>
                <span className="text-amber-700 font-mono">
                  {filters.maxPrice >= 150000000
                    ? '₹15+ Cr'
                    : `₹${(filters.maxPrice / 10000000).toFixed(1)} Cr`}
                </span>
              </div>
              <input
                type="range"
                min={15000000}
                max={150000000}
                step={5000000}
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, maxPrice: parseInt(e.target.value, 10) }))
                }
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>₹1.5 Cr</span>
                <span>₹7.5 Cr</span>
                <span>₹15+ Cr</span>
              </div>
            </div>

            {/* Possession Status */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Possession Status
              </label>
              <select
                value={filters.possession}
                onChange={(e) => setFilters((p) => ({ ...p, possession: e.target.value }))}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="All">All Statuses</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>

            {/* Luxury Amenities Checkboxes */}
            <div className="sm:col-span-2 lg:col-span-4 pt-2">
              <label className="block text-xs font-bold text-stone-700 mb-2">
                Premier Residential Features & Lifestyle Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_AMENITIES.map((amenity) => {
                  const isChecked = filters.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-amber-700" />}
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
