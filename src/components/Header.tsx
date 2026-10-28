import { useState } from 'react';
import { Menu, X, PhoneCall, Heart, Scale, Building2 } from 'lucide-react';
import { UserAccount } from '../types/property';

export type AppView = 'home' | 'listings' | 'about' | 'map' | 'calculator' | 'portal' | 'broker';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  savedPropertyIds: string[];
  comparedPropertyIds: string[];
  currentUser: UserAccount | null;
  onOpenSavedDrawer: () => void;
  onOpenCompareModal: () => void;
  onOpenSiteVisitModal: () => void;
}

export default function Header({
  activeView,
  setActiveView,
  savedPropertyIds,
  comparedPropertyIds,
  currentUser,
  onOpenSavedDrawer,
  onOpenCompareModal,
  onOpenSiteVisitModal
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-18">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-amber-400 transition-colors">
            Twin City NCR Realty
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-stone-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'home' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('listings')}
            className={`cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'listings' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'about' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('map')}
            className={`cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'map' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Interactive Map
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className={`cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'calculator' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Loan Calculator
          </button>
          <button
            onClick={() => handleNavClick('portal')}
            className={`cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'portal' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Client Portal
          </button>
          <button
            onClick={() => handleNavClick('broker')}
            className={`cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeView === 'broker' ? 'text-amber-400 font-semibold' : 'text-stone-400'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Listing Manager</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action + Quick Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Compare shortcut */}
          <button
            onClick={onOpenCompareModal}
            className="relative p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title="Compare Properties"
            aria-label="Compare Properties"
          >
            <Scale className="w-5 h-5" />
            {comparedPropertyIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {comparedPropertyIds.length}
              </span>
            )}
          </button>

          {/* Saved shortcut */}
          <button
            onClick={onOpenSavedDrawer}
            className="relative p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title="Saved Favorites"
            aria-label="Saved Favorites"
          >
            <Heart className="w-5 h-5" />
            {savedPropertyIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {savedPropertyIds.length}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenSiteVisitModal}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Schedule Tour</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeView === 'home' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('listings')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeView === 'listings' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            Residential Properties
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeView === 'about' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('map')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeView === 'map' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            Interactive NCR Map
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeView === 'calculator' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            Mortgage & Loan Calculator
          </button>
          <button
            onClick={() => handleNavClick('portal')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeView === 'portal' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            Secure Client Contact Portal
          </button>
          <button
            onClick={() => handleNavClick('broker')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeView === 'broker' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            Listing Management (Broker Desk)
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSiteVisitModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Schedule Tour</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
