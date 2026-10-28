import { useState, useEffect, useMemo } from 'react';
import Header, { AppView } from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import FilterBar from './components/FilterBar';
import PropertyCard from './components/PropertyCard';
import InteractiveMap from './components/InteractiveMap';
import PropertyDetailModal from './components/PropertyDetailModal';
import PhotoGalleryModal from './components/PhotoGalleryModal';
import CompareModal from './components/CompareModal';
import SavedFavoritesDrawer from './components/SavedFavoritesDrawer';
import SecureClientPortal from './components/SecureClientPortal';
import MortgageCalculator from './components/MortgageCalculator';
import NeighborhoodGuides from './components/NeighborhoodGuides';
import SiteVisitBookingModal from './components/SiteVisitBookingModal';
import BrokerDashboard from './components/BrokerDashboard';
import Footer from './components/Footer';

import { Property, FilterState, ClientInquiry, UserAccount } from './types/property';
import { PROPERTIES } from './data/properties';
import { LayoutGrid, Map, ShieldCheck, Sparkles, Building2, PhoneCall } from 'lucide-react';

export default function App() {
  // Navigation View State: starts gracefully on 'home'
  const [activeView, setActiveView] = useState<AppView>('home');

  // Properties State (persisted to localStorage so broker changes reflect immediately!)
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('tcncr_properties_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return PROPERTIES;
  });

  // Current Logged-in User (defaulted to verified registered client for seamless testing)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem('tcncr_current_user');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return {
      id: 'usr-client-01',
      name: 'Dr. A. Singhania',
      email: 'singhania.invest@gmail.com',
      phone: '+91 98110 44210',
      role: 'client',
      company: 'Singhania Healthcare Investments',
      joinedDate: 'Jan 2026'
    };
  });

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
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

  // Display mode for listings: 'grid' vs 'split_map'
  const [listingLayout, setListingLayout] = useState<'grid' | 'split'>('grid');

  // Modals & Selection states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Lightbox state
  const [lightboxProperty, setLightboxProperty] = useState<Property | null>(null);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Compare & Saved items
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tcncr_saved_properties');
      return stored ? JSON.parse(stored) : ['tcncr-01', 'tcncr-03'];
    } catch {
      return ['tcncr-01', 'tcncr-03'];
    }
  });

  const [comparedPropertyIds, setComparedPropertyIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Client inquiries with full two-way messaging threads stored in localStorage
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('tcncr_client_inquiries_v2');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        id: 'TCNR-2026-8812',
        clientId: 'usr-client-01',
        createdAt: '28 Oct 2026, 11:30 AM',
        type: 'site_visit',
        propertyName: 'The Sky Presidential Penthouse at Sector 128',
        propertyId: 'tcncr-01',
        name: 'Dr. A. Singhania',
        phone: '+91 98110 44210',
        email: 'singhania.invest@gmail.com',
        preferredDate: '2026-11-02',
        preferredTimeSlot: '11:00 AM - Morning Tour',
        needChauffeurPickup: true,
        pickupLocation: 'Vasant Vihar, New Delhi',
        message: 'Requesting golf-view duplex penthouse inspection and private elevator verification.',
        status: 'Visit Scheduled',
        assignedConsultant: 'Vikram Sethi (Senior Vice President, Luxury Brokerage)',
        messages: [
          {
            id: 'm-1',
            sender: 'client',
            senderName: 'Dr. A. Singhania',
            text: 'Good morning. We would like to confirm our site visit appointment for this weekend.',
            timestamp: '28 Oct, 11:32 AM'
          },
          {
            id: 'm-2',
            sender: 'broker',
            senderName: 'Vikram Sethi (Senior Broker)',
            text: 'Good morning Dr. Singhania. Your private site inspection is confirmed for Nov 2 at 11:00 AM. Our chauffeur will arrive at Vasant Vihar by 10:00 AM. Gate pass and developer welcome docket have been issued.',
            timestamp: '28 Oct, 11:45 AM'
          }
        ]
      }
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tcncr_properties_db', JSON.stringify(properties));
    } catch {}
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('tcncr_current_user', JSON.stringify(currentUser));
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('tcncr_saved_properties', JSON.stringify(savedPropertyIds));
    } catch {}
  }, [savedPropertyIds]);

  useEffect(() => {
    try {
      localStorage.setItem('tcncr_client_inquiries_v2', JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  // Broker Property Management handlers
  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  const handleUpdateProperty = (updatedProp: Property) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProp.id ? updatedProp : p))
    );
  };

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setSavedPropertyIds((prev) => prev.filter((i) => i !== id));
    setComparedPropertyIds((prev) => prev.filter((i) => i !== id));
  };

  // Inquiry and messaging handlers
  const handleAddInquiry = (
    newInquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status' | 'messages'>
  ) => {
    const docketId = `TCNR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Date().toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const initialMessage = newInquiry.message
      ? [
          {
            id: `msg-${Date.now()}`,
            sender: 'client' as const,
            senderName: newInquiry.name,
            text: newInquiry.message,
            timestamp: formattedDate
          }
        ]
      : [];

    const createdRecord: ClientInquiry = {
      ...newInquiry,
      id: docketId,
      createdAt: formattedDate,
      status: 'Consultant Assigned',
      assignedConsultant: 'Aman Mehra (Senior Residential Advisor)',
      messages: initialMessage
    };

    setInquiries((prev) => [createdRecord, ...prev]);
  };

  const handleUpdateInquiryStatus = (
    inquiryId: string,
    status: ClientInquiry['status'],
    consultant?: string
  ) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? {
              ...inq,
              status,
              assignedConsultant: consultant || inq.assignedConsultant
            }
          : inq
      )
    );
  };

  const handleSendBrokerMessage = (inquiryId: string, text: string) => {
    const formattedTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          const newMsg = {
            id: `msg-b-${Date.now()}`,
            sender: 'broker' as const,
            senderName: inq.assignedConsultant || 'Senior Broker Advisor',
            text,
            timestamp: formattedTime
          };
          return {
            ...inq,
            messages: [...(inq.messages || []), newMsg]
          };
        }
        return inq;
      })
    );
  };

  const handleSendClientMessage = (inquiryId: string, text: string) => {
    const formattedTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          const newMsg = {
            id: `msg-c-${Date.now()}`,
            sender: 'client' as const,
            senderName: currentUser ? currentUser.name : inq.name,
            text,
            timestamp: formattedTime
          };
          return {
            ...inq,
            messages: [...(inq.messages || []), newMsg]
          };
        }
        return inq;
      })
    );
  };

  // Toggle Save / Bookmark
  const handleToggleSave = (id: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle Compare
  const handleToggleCompare = (id: string) => {
    setComparedPropertyIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 properties simultaneously.');
        return prev;
      }
      return [...prev, id];
    });
  };

  // Open Book Visit
  const handleOpenBookVisit = (property: Property) => {
    setBookingProperty(property);
    setIsBookingModalOpen(true);
  };

  // Open Lightbox
  const handleOpenLightbox = (property: Property, initialIndex: number) => {
    setLightboxProperty(property);
    setLightboxInitialIndex(initialIndex);
    setIsLightboxOpen(true);
  };

  // Filtered properties memoization
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // Search query (keyword)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.locality.toLowerCase().includes(q) ||
          item.project.toLowerCase().includes(q) ||
          item.developer.toLowerCase().includes(q) ||
          item.submarket.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Submarket
      if (filters.submarket !== 'All Submarkets' && item.submarket !== filters.submarket) {
        return false;
      }

      // Property Type
      if (filters.propertyType !== 'All Types' && item.propertyType !== filters.propertyType) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== null && item.bedrooms < filters.bedrooms) {
        return false;
      }

      // Price Range
      if (item.price < filters.minPrice || item.price > filters.maxPrice) {
        return false;
      }

      // Possession
      if (filters.possession !== 'All' && item.possession !== filters.possession) {
        return false;
      }

      // Amenities filter (must have all selected)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((a) => item.amenities.includes(a));
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'area_desc') return b.superBuiltUpArea - a.superBuiltUpArea;
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      // 'featured' default
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [properties, filters]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Top Bar adheres strictly to 3-zone contract */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        savedPropertyIds={savedPropertyIds}
        comparedPropertyIds={comparedPropertyIds}
        currentUser={currentUser}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenSiteVisitModal={() => {
          setBookingProperty(properties[0] || null);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Main Content Viewports */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activeView === 'home' && (
          <HomePage
            properties={properties}
            filters={filters}
            setFilters={setFilters}
            savedPropertyIds={savedPropertyIds}
            comparedPropertyIds={comparedPropertyIds}
            onToggleSave={handleToggleSave}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onBookVisit={handleOpenBookVisit}
            onNavigateToView={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 2: ABOUT US PAGE */}
        {activeView === 'about' && (
          <AboutPage
            onExploreProperties={() => {
              setActiveView('listings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenConsultation={() => {
              setActiveView('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 3: FULL RESIDENTIAL PROPERTIES DIRECTORY */}
        {activeView === 'listings' && (
          <div className="pb-16">
            {/* Advanced Filter Bar */}
            <div id="listings-results">
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                totalMatches={filteredProperties.length}
              />
            </div>

            {/* Layout Mode & Counter Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                    Verified Residential Listings in Delhi NCR
                  </h1>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Showing {filteredProperties.length} premier residential properties matching your criteria
                  </p>
                </div>

                {/* View toggles: Grid vs Split Map */}
                <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setListingLayout('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      listingLayout === 'grid'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid View</span>
                  </button>
                  <button
                    onClick={() => setListingLayout('split')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      listingLayout === 'split'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>Split Map</span>
                  </button>
                </div>
              </div>

              {/* Grid Layout Mode */}
              {listingLayout === 'grid' ? (
                <div className="mt-6">
                  {filteredProperties.length === 0 ? (
                    <div className="py-20 text-center rounded-3xl bg-white border border-stone-200 p-8 space-y-3">
                      <Building2 className="w-10 h-10 text-stone-400 mx-auto" />
                      <h3 className="text-base font-bold text-stone-800">
                        No residential units match this specific filter criteria
                      </h3>
                      <p className="text-xs text-stone-500 max-w-md mx-auto">
                        Try expanding your price range, relaxing configuration requirements, or selecting "All Submarkets" to explore broader NCR inventory.
                      </p>
                      <button
                        onClick={() =>
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
                          })
                        }
                        className="px-4 py-2 text-xs font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {filteredProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          isSaved={savedPropertyIds.includes(property.id)}
                          isCompared={comparedPropertyIds.includes(property.id)}
                          onToggleSave={handleToggleSave}
                          onToggleCompare={handleToggleCompare}
                          onSelectProperty={(prop) => setSelectedProperty(prop)}
                          onBookVisit={handleOpenBookVisit}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Split View: Map on Right, Scrollable Cards on Left */
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-6 space-y-4 max-h-[700px] overflow-y-auto pr-2">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isSaved={savedPropertyIds.includes(property.id)}
                        isCompared={comparedPropertyIds.includes(property.id)}
                        onToggleSave={handleToggleSave}
                        onToggleCompare={handleToggleCompare}
                        onSelectProperty={(prop) => setSelectedProperty(prop)}
                        onBookVisit={handleOpenBookVisit}
                      />
                    ))}
                  </div>

                  <div className="lg:col-span-6 sticky top-28">
                    <InteractiveMap
                      properties={filteredProperties}
                      selectedProperty={selectedProperty}
                      onSelectProperty={(prop) => setSelectedProperty(prop)}
                      onBookVisit={handleOpenBookVisit}
                      onFilterArea={(sub) => setFilters((p) => ({ ...p, submarket: sub }))}
                      heightClass="h-[700px]"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* NCR Corridor & Micro-Market Overviews */}
            <NeighborhoodGuides
              onSelectSubmarket={(submarket) => {
                setFilters((prev) => ({ ...prev, submarket }));
                const el = document.getElementById('listings-results');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 4: Dedicated Interactive Map View */}
        {activeView === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  Interactive Delhi NCR Residential Map
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Navigate expressway corridors, golf estate developments, and airport connectivity zones
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('listings')}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 cursor-pointer"
                >
                  Return to Grid View
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Map Console */}
              <div className="lg:col-span-8">
                <InteractiveMap
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={(prop) => setSelectedProperty(prop)}
                  onBookVisit={handleOpenBookVisit}
                  onFilterArea={(sub) => setFilters((p) => ({ ...p, submarket: sub }))}
                  heightClass="h-[620px]"
                />
              </div>

              {/* Sidebar Properties List on Map */}
              <div className="lg:col-span-4 space-y-4 max-h-[620px] overflow-y-auto pr-1">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1 flex items-center justify-between">
                  <span>Corridor Properties ({filteredProperties.length})</span>
                  {filters.submarket !== 'All Submarkets' && (
                    <button
                      onClick={() => setFilters((p) => ({ ...p, submarket: 'All Submarkets' }))}
                      className="text-amber-700 hover:underline normal-case text-[11px]"
                    >
                      Show All NCR
                    </button>
                  )}
                </div>
                {filteredProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedProperty(prop)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                      selectedProperty?.id === prop.id
                        ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                      <img src={prop.images[0]?.url} alt={prop.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{prop.title}</h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1">{prop.locality}</p>
                        <div className="text-[11px] text-stone-600 mt-1 font-medium">
                          {prop.bedrooms} BHK · {prop.superBuiltUpArea.toLocaleString()} sq ft
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-stone-950 font-sans tabular-nums">
                          {prop.priceFormatted}
                        </span>
                        <span className="text-[10px] text-amber-700 font-semibold hover:underline">
                          Focus Pin →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: Dedicated Home Loan Calculator */}
        {activeView === 'calculator' && (
          <MortgageCalculator
            onScheduleAdvisory={() => {
              setActiveView('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 6: Secure Client Contact Portal */}
        {activeView === 'portal' && (
          <SecureClientPortal
            properties={properties}
            prefilledProperty={selectedProperty}
            inquiries={inquiries}
            currentUser={currentUser}
            onLogin={(user) => setCurrentUser(user)}
            onLogout={() => setCurrentUser(null)}
            onAddInquiry={handleAddInquiry}
            onSendClientMessage={handleSendClientMessage}
            onSelectPropertyById={(id) => {
              const p = properties.find((item) => item.id === id);
              if (p) setSelectedProperty(p);
            }}
          />
        )}

        {/* VIEW 7: Broker Property Listing Management System */}
        {activeView === 'broker' && (
          <BrokerDashboard
            properties={properties}
            onAddProperty={handleAddProperty}
            onUpdateProperty={handleUpdateProperty}
            onDeleteProperty={handleDeleteProperty}
            inquiries={inquiries}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onSendBrokerMessage={handleSendBrokerMessage}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
          />
        )}

      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isSaved={savedPropertyIds.includes(selectedProperty.id)}
          isCompared={comparedPropertyIds.includes(selectedProperty.id)}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onBookVisit={handleOpenBookVisit}
          onOpenLightbox={handleOpenLightbox}
        />
      )}

      {/* High-Resolution Photo Gallery Lightbox */}
      <PhotoGalleryModal
        property={lightboxProperty}
        initialIndex={lightboxInitialIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />

      {/* Side-by-Side Property Comparison Modal */}
      {isCompareModalOpen && (
        <CompareModal
          properties={properties}
          comparedIds={comparedPropertyIds}
          onRemoveFromCompare={(id) => handleToggleCompare(id)}
          onClearCompare={() => setComparedPropertyIds([])}
          onClose={() => setIsCompareModalOpen(false)}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onBookVisit={handleOpenBookVisit}
        />
      )}

      {/* Saved Bookmarks Drawer */}
      <SavedFavoritesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        properties={properties}
        savedIds={savedPropertyIds}
        onRemoveSaved={handleToggleSave}
        onClearAll={() => setSavedPropertyIds([])}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onBookVisit={handleOpenBookVisit}
      />

      {/* Quick Site Visit Booking Modal */}
      <SiteVisitBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        property={bookingProperty}
        properties={properties}
        onAddInquiry={handleAddInquiry}
      />

      {/* Editorial Footer */}
      <Footer
        onNavClick={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSiteVisitModal={() => {
          setBookingProperty(properties[0] || null);
          setIsBookingModalOpen(true);
        }}
      />

    </div>
  );
}
