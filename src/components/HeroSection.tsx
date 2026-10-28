import { useState } from 'react';
import { Search, MapPin, Building2, IndianRupee, ArrowRight, ShieldCheck, Award, Users } from 'lucide-react';
import { FilterState } from '../types/property';
import { NCR_SUBMARKETS, PROPERTY_TYPES } from '../data/properties';

interface HeroSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearchSubmit: () => void;
  onExploreMap: () => void;
}

export default function HeroSection({
  filters,
  setFilters,
  onSearchSubmit,
  onExploreMap
}: HeroSectionProps) {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);
  const [localSubmarket, setLocalSubmarket] = useState(filters.submarket);
  const [localType, setLocalType] = useState(filters.propertyType);
  const [localBedrooms, setLocalBedrooms] = useState<number | null>(filters.bedrooms);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery: localSearch,
      submarket: localSubmarket,
      propertyType: localType,
      bedrooms: localBedrooms
    }));
    onSearchSubmit();
  };

  return (
    <section className="relative bg-stone-950 text-white overflow-hidden pt-8 pb-14 border-b border-stone-800">
      {/* Background Architectural Hero Asset with subtle scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_residential_1793178138943.jpg"
          alt="Twin City NCR Realty Luxury Residential Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-stone-950/50 to-stone-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading and Value Prop */}
        <div className="max-w-3xl pt-6 sm:pt-10 mb-8">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            Twin City NCR Realty · twincityncrrealty.com
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 text-balance">
            Prime Residential Brokerage for Delhi NCR’s Finest Corridors
          </h1>
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed text-balance">
            Curated portfolio of signature penthouses, gated golf estate villas, and luxury high-rise apartments across Noida Expressway, Greater Noida, and Gurugram.
          </p>
        </div>

        {/* Integrated Real Estate Search Console */}
        <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl mb-12">
          <form onSubmit={handleHeroSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Locality / Submarket */}
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>NCR Submarket</span>
                </label>
                <select
                  value={localSubmarket}
                  onChange={(e) => setLocalSubmarket(e.target.value)}
                  className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {NCR_SUBMARKETS.map((sub) => (
                    <option key={sub} value={sub} className="bg-stone-900 text-white">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Property Type</span>
                </label>
                <select
                  value={localType}
                  onChange={(e) => setLocalType(e.target.value)}
                  className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-stone-900 text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms / BHK */}
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bedrooms</span>
                </label>
                <select
                  value={localBedrooms === null ? 'any' : localBedrooms.toString()}
                  onChange={(e) =>
                    setLocalBedrooms(e.target.value === 'any' ? null : parseInt(e.target.value, 10))
                  }
                  className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="any" className="bg-stone-900 text-white">Any Configuration</option>
                  <option value="3" className="bg-stone-900 text-white">3 BHK</option>
                  <option value="4" className="bg-stone-900 text-white">4 BHK</option>
                  <option value="5" className="bg-stone-900 text-white">5+ BHK / Penthouse</option>
                </select>
              </div>

              {/* Keyword / Project */}
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span>Keyword / Project</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Golf, Penthouse, Sector 150"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-800/80">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Popular:</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalSubmarket('Noida Expressway');
                    setFilters((prev) => ({ ...prev, submarket: 'Noida Expressway' }));
                    onSearchSubmit();
                  }}
                  className="text-stone-300 hover:text-amber-400 underline underline-offset-4 cursor-pointer"
                >
                  Noida Expressway
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalType('Penthouse');
                    setFilters((prev) => ({ ...prev, propertyType: 'Penthouse' }));
                    onSearchSubmit();
                  }}
                  className="text-stone-300 hover:text-amber-400 underline underline-offset-4 cursor-pointer"
                >
                  Penthouses
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalSubmarket('Golf Course Extension');
                    setFilters((prev) => ({ ...prev, submarket: 'Golf Course Extension' }));
                    onSearchSubmit();
                  }}
                  className="text-stone-300 hover:text-amber-400 underline underline-offset-4 cursor-pointer"
                >
                  Golf Course Extn
                </button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onExploreMap}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  Explore NCR Map
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Claim-to-Proof Metric Rigor (Adjacency Rule) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2 border-t border-stone-800">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
              ₹450+ Cr
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              Residential Inventory Advised
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
              14+ Years
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              Delhi-NCR Brokerage Expertise
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
              1,200+
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              Families Successfully Settled
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight tabular-nums">
              100% Direct
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              Verified Title & Property Clearances
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
