import { Property, FilterState } from '../types/property';
import HeroSection from './HeroSection';
import PropertyCard from './PropertyCard';
import NeighborhoodGuides from './NeighborhoodGuides';
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Compass,
  Sparkles,
  PhoneCall,
  Car,
  Lock,
  Calculator,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  properties: Property[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  savedPropertyIds: string[];
  comparedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
  onNavigateToView: (view: 'home' | 'listings' | 'about' | 'map' | 'calculator' | 'portal' | 'broker') => void;
}

export default function HomePage({
  properties,
  filters,
  setFilters,
  savedPropertyIds,
  comparedPropertyIds,
  onToggleSave,
  onToggleCompare,
  onSelectProperty,
  onBookVisit,
  onNavigateToView
}: HomePageProps) {
  // Featured marquee properties (top 3-4)
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

  const handleCorridorJump = (corridor: string) => {
    setFilters((prev) => ({ ...prev, submarket: corridor }));
    onNavigateToView('listings');
  };

  return (
    <div className="bg-stone-50 text-stone-900 font-sans">
      
      {/* 1. Main Architectural Hero with Integrated Search Console */}
      <HeroSection
        filters={filters}
        setFilters={setFilters}
        onSearchSubmit={() => onNavigateToView('listings')}
        onExploreMap={() => onNavigateToView('map')}
      />

      {/* 2. Marquee Featured Residences Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Curated Architectural Portfolio
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Featured Signature Residences
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Handpicked luxury penthouses, gated golf villas, and high-rise apartments available for private inspection.
            </p>
          </div>

          <button
            onClick={() => onNavigateToView('listings')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All ({properties.length}) Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={savedPropertyIds.includes(property.id)}
              isCompared={comparedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSave}
              onToggleCompare={onToggleCompare}
              onSelectProperty={onSelectProperty}
              onBookVisit={onBookVisit}
            />
          ))}
        </div>
      </section>

      {/* 3. The 4 Fiduciary Brokerage Pillars */}
      <section className="bg-white border-y border-stone-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              The Twin City Fiduciary Standard
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Why Discerning Families & Investors Partner with Us
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              We operate exclusively as a high-touch residential consultancy rather than an automated mass portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">100% Direct Title Due Diligence</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every property in our directory undergoes comprehensive ownership checks, clear registry verification, and structural builder audits.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Zero Telemarketing Spam</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Your phone number and inquiry details are never sold or shared with external call centers. Encrypted direct communication with licensed brokers only.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Chauffeur Guided Site Visits</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Complimentary executive transport for family site inspections, with pre-arranged developer gate passes and personalized area briefings.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Exclusive Off-Market Mandates</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Confidential access to developer penthouses, golf estate villas, and private builder floors not advertised on commercial web portals.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Interactive NCR Map Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Interactive Geospatial Exploration
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Explore Delhi NCR Residential Clusters by Map
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Navigate Noida Expressway, Greater Noida Jaypee Greens, Golf Course Extension Road, and Dwarka Expressway. Click property pins for real-time pricing, configuration specs, and instant site visit bookings.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateToView('map')}
                className="px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Launch Interactive Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateToView('about')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-700 transition-colors cursor-pointer"
              >
                About Our Firm
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-stone-800/90 rounded-2xl p-5 border border-stone-700 space-y-3 text-xs">
              <div className="font-bold text-stone-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Quick Corridor Jump:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCorridorJump('Noida Expressway')}
                  className="p-2.5 bg-stone-900/80 hover:bg-stone-900 rounded-xl text-left border border-stone-700/60 transition-colors"
                >
                  <div className="font-bold text-white text-[11px]">Noida Expressway</div>
                  <div className="text-[10px] text-amber-400">Sector 128 / 150</div>
                </button>
                <button
                  onClick={() => handleCorridorJump('Greater Noida')}
                  className="p-2.5 bg-stone-900/80 hover:bg-stone-900 rounded-xl text-left border border-stone-700/60 transition-colors"
                >
                  <div className="font-bold text-white text-[11px]">Greater Noida</div>
                  <div className="text-[10px] text-amber-400">Jaypee Greens Estates</div>
                </button>
                <button
                  onClick={() => handleCorridorJump('Golf Course Extension')}
                  className="p-2.5 bg-stone-900/80 hover:bg-stone-900 rounded-xl text-left border border-stone-700/60 transition-colors"
                >
                  <div className="font-bold text-white text-[11px]">Golf Course Extn</div>
                  <div className="text-[10px] text-amber-400">Gurugram Prime</div>
                </button>
                <button
                  onClick={() => handleCorridorJump('Dwarka Expressway')}
                  className="p-2.5 bg-stone-900/80 hover:bg-stone-900 rounded-xl text-left border border-stone-700/60 transition-colors"
                >
                  <div className="font-bold text-white text-[11px]">Dwarka Expressway</div>
                  <div className="text-[10px] text-amber-400">Airport Gateway</div>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Regional Micro-Market Overviews */}
      <NeighborhoodGuides
        onSelectSubmarket={(submarket) => {
          setFilters((prev) => ({ ...prev, submarket }));
          onNavigateToView('listings');
        }}
      />

      {/* 6. Testimonials from Verified NCR Homeowners */}
      <section className="bg-white border-t border-stone-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Client Endorsements
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Trusted by CXOs, Investors & NRI Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 flex flex-col justify-between">
              <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                "Twin City NCR Realty handled our duplex penthouse acquisition at Sector 128 with unmatched professionalism. The chauffeur tour, title clarity check, and direct developer negotiation saved us considerable time."
              </p>
              <div className="pt-3 border-t border-stone-200/80">
                <div className="font-bold text-xs text-stone-900">Dr. Arvind Singhania</div>
                <div className="text-[11px] text-stone-500">Healthcare Director · Vasant Vihar, New Delhi</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 flex flex-col justify-between">
              <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                "Living overseas in Dubai, finding an authentic fiduciary broker in NCR was difficult until we met the team. They handled our Jaypee Greens villa documentation smoothly with complete digital transparency."
              </p>
              <div className="pt-3 border-t border-stone-200/80">
                <div className="font-bold text-xs text-stone-900">Sameer & Ritu Oberoi</div>
                <div className="text-[11px] text-stone-500">NRI Investors · Dubai, UAE</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 flex flex-col justify-between">
              <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                "The Golf Course Extension high-rise they recommended exceeded our expectations. Zero sales pressure, authentic price-per-square-foot analysis, and excellent post-purchase support."
              </p>
              <div className="pt-3 border-t border-stone-200/80">
                <div className="font-bold text-xs text-stone-900">Kavita Narang</div>
                <div className="text-[11px] text-stone-500">Chief Technology Officer · Cyber City Gurugram</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Bottom Lead Action Banner */}
      <section className="bg-stone-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Confidential Consultation Desk
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to Discover Your Next Residence in Delhi NCR?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Schedule an executive site visit or speak with our senior portfolio advisors about off-market luxury listings.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigateToView('portal')}
              className="px-6 py-3 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Access Secure Client Portal
            </button>
            <a
              href="tel:+919810123456"
              className="px-6 py-3 text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Senior Broker: +91 98101 23456</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
