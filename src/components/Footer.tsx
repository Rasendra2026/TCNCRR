import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { AppView } from './Header';

interface FooterProps {
  onNavClick: (view: AppView) => void;
  onOpenSiteVisitModal: () => void;
}

export default function Footer({ onNavClick, onOpenSiteVisitModal }: FooterProps) {
  return (
    <footer className="bg-stone-950 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white block">
              Twin City NCR Realty
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Premier residential real estate advisory firm specializing in high-value apartments, penthouses, and gated golf villas across Noida Expressway, Greater Noida, and Gurugram corridors.
            </p>
            <div className="text-xs text-amber-400 font-mono">
              twincityncrrealty.com
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-400">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Title Verification & Transparent Transaction Advisory</span>
            </div>
          </div>

          {/* Key Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Prime NCR Locations
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('listings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Noida Expressway (Sec 128 / 150)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('listings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Greater Noida & Jaypee Greens
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('listings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Golf Course Extension Road
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('listings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dwarka Expressway (Gurugram)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('listings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Central Noida (Sec 50 / 78)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Platform Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Client Advisory
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Our Firm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('listings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Residential Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('map')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interactive Map Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('calculator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Loan & EMI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('portal')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Secure Client Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('broker')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Listing Management (Broker Desk)
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Brokerage Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Brokerage Office
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Sector 132, Noida Expressway, Delhi-NCR, UP 201304</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+919810123456" className="text-white hover:text-amber-400">
                  +91 98101 23456
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:twincityncrrealty@gmail.com" className="text-white hover:text-amber-400">
                  twincityncrrealty@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-10 mt-10 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Twin City NCR Realty (twincityncrrealty.com). All residential property specifications verified directly with authorized builders and owners.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Confidential Advisory</span>
            <span>·</span>
            <span>Terms of Brokerage</span>
            <span>·</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
