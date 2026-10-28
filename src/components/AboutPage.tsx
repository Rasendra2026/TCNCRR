import { ShieldCheck, Award, Users, Building2, CheckCircle2, MapPin, Phone, Mail, ArrowRight, Sparkles, Scale } from 'lucide-react';

interface AboutPageProps {
  onExploreProperties: () => void;
  onOpenConsultation: () => void;
}

export default function AboutPage({ onExploreProperties, onOpenConsultation }: AboutPageProps) {
  return (
    <div className="bg-stone-50 font-sans text-stone-900">
      
      {/* Hero Header */}
      <section className="relative bg-stone-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_luxury_residential_1793178138943.jpg"
            alt="Twin City NCR Realty"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-amber-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>twincityncrrealty.com · Established 2012</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white text-balance">
            Bespoke Residential Brokerage for Delhi NCR’s Prime Corridors
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-balance">
            Founded with a singular mission: to provide institutional transparency, direct developer access, and fiduciary advisory for luxury apartments, penthouses, and gated villas across the twin hubs of Noida-Greater Noida and Gurugram.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreProperties}
              className="px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Explore Residential Portfolio
            </button>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-700 transition-colors cursor-pointer"
            >
              Book Private Broker Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Credential Numbers Strip */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-sans tabular-nums">
                ₹450+ Cr
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Residential Transaction Volume
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-sans tabular-nums">
                14+ Years
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Delhi NCR Market Leadership
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-sans tabular-nums">
                1,200+
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Discerning Families Settled
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-700 font-sans tabular-nums">
                100%
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Direct Title & Ownership Due Diligence
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Story & Twin City Nexus */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              The Genesis
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight text-balance">
              Connecting NCR’s Most Dynamic Residential Corridors
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              The National Capital Region is driven by two economic powerhouses: the planned green metropolis of <strong>Noida & Greater Noida</strong> along the Expressway, and the high-density corporate hub of <strong>Gurugram</strong> along Golf Course Road and Dwarka Expressway.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              <strong>Twin City NCR Realty</strong> was founded to bridge these markets. Unlike traditional commission brokers who push whatever inventory is available, we operate on a bespoke consultancy model: every project in our portfolio undergoes rigorous architectural evaluation, location connectivity audits, and direct developer title verification before being recommended to clients.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Telemarketing Spam:</strong> We never sell phone numbers or share investor inquiries with external marketing agencies.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Chauffeur Guided Tours:</strong> Complimentary executive travel for private site inspections across Noida and Gurugram.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Exclusive Off-Market Inventory:</strong> Access to builder duplexes, high-elevation penthouses, and private golf villas not publicly listed.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-900 aspect-[4/3]">
              <img
                src="/src/assets/images/penthouse_living_room_1793178139843.jpg"
                alt="Twin City NCR Realty Curated Residential Portfolio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Flagship Representation
                </span>
                <p className="text-sm font-bold mt-1">
                  Kalpataru Vista Duplex Penthouse · Sector 128 Noida Expressway
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Leadership & Advisory Team */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Senior Leadership
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Experienced Advisors Dedicated to Your Asset Protection
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Our partners bring over three decades of combined expertise across real estate finance, legal vetting, and luxury residential representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Advisor 1 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-xl mb-4">
                  RS
                </div>
                <h3 className="text-base font-bold text-stone-900">Rajeshwar Sharma</h3>
                <div className="text-xs text-amber-700 font-semibold mb-3">
                  Founder & Principal Broker
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  14+ years pioneering residential transactions along the Noida Expressway and Yamuna corridor. Specializes in luxury penthouses and high-value developer mandates.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-mono mt-4">
                Corporate Advisory Desk · Noida HQ
              </div>
            </div>

            {/* Advisor 2 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-xl mb-4">
                  VS
                </div>
                <h3 className="text-base font-bold text-stone-900">Vikram Sethi</h3>
                <div className="text-xs text-amber-700 font-semibold mb-3">
                  Senior Vice President, Luxury Acquisitions
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Focuses on Golf Course Extension Road, DLF Phase 5, and Dwarka Expressway luxury apartments and villas. Advises CXOs, venture capitalists, and family offices.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-mono mt-4">
                Gurugram Corridor Advisory Desk
              </div>
            </div>

            {/* Advisor 3 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-xl mb-4">
                  SK
                </div>
                <h3 className="text-base font-bold text-stone-900">Sunita Kapoor</h3>
                <div className="text-xs text-amber-700 font-semibold mb-3">
                  Head of NRI & Private Wealth Services
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Oversees diaspora home investments across North America, Europe, and the GCC. Facilitates repatriation documentation, power of attorney filings, and doorstep registry.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-mono mt-4">
                Global Wealth & Diaspora Desk
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Office Presence & Advisory Hours */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Corporate Headquarters
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Twin City NCR Realty Corporate Office
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Located strategically at Express Trade Towers on the Noida-Greater Noida Expressway, providing seamless access to all prime residential sectors, Jaypee Greens, and the upcoming Jewar Airport corridor.
            </p>
            
            <div className="pt-2 space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Unit 804, Tower B, Express Trade Towers, Sector 132, Noida Expressway, UP 201304</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+919810123456" className="text-amber-400 font-bold hover:underline">
                  +91 98101 23456
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:twincityncrrealty@gmail.com" className="text-white hover:underline">
                  twincityncrrealty@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700/80 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm">
              Schedule an In-Person Consultation
            </h3>
            <p className="text-stone-300 leading-relaxed">
              Whether you are acquiring a penthouse, liquidating a luxury villa asset, or evaluating capital returns along the Dwarka Expressway, our senior brokers are available for confidential discussions.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full py-3 px-4 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Private Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
