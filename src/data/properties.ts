import { Property } from '../types/property';

export const PROPERTIES: Property[] = [
  {
    id: 'tcncr-01',
    title: 'The Sky Presidential Penthouse at Sector 128',
    tagline: 'Duplex Penthouse with Private Plunge Pool & Unobstructed 18-Hole Golf Course Vistas',
    project: 'Kalpataru Vista Residences',
    developer: 'Kalpataru Group',
    locality: 'Sector 128, Noida Expressway',
    submarket: 'Noida Expressway',
    city: 'Noida',
    price: 88500000, // ₹8.85 Cr
    priceFormatted: '₹8.85 Cr',
    pricePerSqFt: 18437,
    propertyType: 'Penthouse',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    superBuiltUpArea: 4800,
    carpetArea: 3750,
    possession: 'Ready to Move',
    possessionTimeline: 'Immediate Possession Available',
    furnishing: 'Semi-Furnished',
    floor: '32nd & 33rd Duplex',
    facing: 'North-East, 18-Hole Golf Course Facing',
    carParking: '4 Dedicated Basement Bays',
    latitude: 28.5324,
    longitude: 77.3672,
    images: [
      {
        url: '/src/assets/images/penthouse_living_room_1793178139843.jpg',
        caption: 'Double-height ceiling grand salon with panoramic floor-to-ceiling skyline windows'
      },
      {
        url: '/src/assets/images/hero_luxury_residential_1793178138943.jpg',
        caption: 'Architectural sunset view over the championship golf greens and manicured gardens'
      },
      {
        url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg',
        caption: 'Master presidential suite with private terrace and expansive nature views'
      },
      {
        url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg',
        caption: 'Private resident clubhouse with resort-style infinity pool and luxury cabanas'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Private Plunge Pool',
      'Golf Course Facing',
      'High-Speed Private Elevator',
      'Grand 50,000 sq ft Clubhouse',
      'Olympic-Length Infinity Pool',
      '24/7 Multi-Tier Concierge',
      '100% Power Backup',
      'EV Fast Charging Stations',
      'Temperature Controlled Spa',
      'Smart Home Automation'
    ],
    keyHighlights: [
      'Direct frontage overlooking the 18-hole championship golf course',
      'Double-height 24 ft living pavilion with Italian Botticino marble',
      'VRV centralized climate control and acoustic double-glazed glass',
      'Private keycard high-speed elevator opening directly into residence'
    ],
    connectivity: [
      { landmark: 'Noida-Greater Noida Expressway', distanceTime: 'Direct 2 Mins' },
      { landmark: 'Sector 137 Metro Station (Aqua Line)', distanceTime: '6 Mins' },
      { landmark: 'Upcoming Jewar International Airport', distanceTime: '42 Mins' },
      { landmark: 'DND Flyway & South Delhi', distanceTime: '15 Mins' }
    ],
    maintenanceCostPerSqFt: 4.5,
    featured: true,
    exclusive: true
  },
  {
    id: 'tcncr-02',
    title: 'The Sovereign Meadow Luxury Villa',
    tagline: 'Private Independent Gated Courtyard Villa with Personal Heated Pool & Private Lawn',
    project: 'Jaypee Greens Estate Villas',
    developer: 'Jaypee Greens Luxury',
    locality: 'Jaypee Greens, Surajpur',
    submarket: 'Greater Noida',
    city: 'Greater Noida',
    price: 115000000, // ₹11.50 Cr
    priceFormatted: '₹11.50 Cr',
    pricePerSqFt: 17692,
    propertyType: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 5,
    superBuiltUpArea: 6500,
    carpetArea: 5120,
    possession: 'Ready to Move',
    possessionTimeline: 'Ready for Immediate Move-in',
    furnishing: 'Fully Furnished',
    floor: 'Ground + 2 Floors Independent',
    facing: 'North-East, Private Lake & Green Courtyard',
    carParking: '3 Covered + 2 Open Driveway Bays',
    latitude: 28.4744,
    longitude: 77.504,
    images: [
      {
        url: '/src/assets/images/modern_villa_exterior_1793178140215.jpg',
        caption: 'Modern contemporary villa exterior with private deck, heated lap pool, and landscaped lawn'
      },
      {
        url: '/src/assets/images/penthouse_living_room_1793178139843.jpg',
        caption: 'Formal sunken lounge with custom woodwork and custom architectural mood lighting'
      },
      {
        url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg',
        caption: 'Upper suite opening out to wooden sun-deck and serene green surroundings'
      },
      {
        url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg',
        caption: 'Access to Atlantis Country Club with equestrian trails and tennis courts'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Private Swimming Pool',
      'Private Landscaped Lawn',
      'In-Villa Hydraulic Elevator',
      'Gated 24/7 Security Patrol',
      'Atlantis Country Club Membership',
      'Bespoke Italian Modular Kitchen',
      'Servant Quarters with Bath',
      'Solar Rooftop Grid Included',
      'Automated Irrigation System'
    ],
    keyHighlights: [
      'Nestled inside 450+ acres of integrated eco-friendly green enclave',
      'Independent freehold title with individual private gate',
      'Equipped with German Schuco windows and Miele kitchen appliances',
      'Dedicated golf cart parking and direct buggy track access'
    ],
    connectivity: [
      { landmark: 'Pari Chowk Landmark Junction', distanceTime: '4 Mins' },
      { landmark: 'Yamuna Expressway Entrance', distanceTime: '5 Mins' },
      { landmark: 'Alpha 1 Metro Station', distanceTime: '7 Mins' },
      { landmark: 'Jewar Noida International Airport', distanceTime: '28 Mins' }
    ],
    maintenanceCostPerSqFt: 3.8,
    featured: true,
    exclusive: true
  },
  {
    id: 'tcncr-03',
    title: 'The Forest Pavilion Residences',
    tagline: 'Expansive 4 BHK Ultra-Luxury Park-Facing Residence on Sector 150 Expressway',
    project: 'Godrej Palm Retreat',
    developer: 'Godrej Properties',
    locality: 'Sector 150, Noida Expressway',
    submarket: 'Noida Expressway',
    city: 'Noida',
    price: 36500000, // ₹3.65 Cr
    priceFormatted: '₹3.65 Cr',
    pricePerSqFt: 11406,
    propertyType: 'Apartment',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 4,
    superBuiltUpArea: 3200,
    carpetArea: 2480,
    possession: 'Ready to Move',
    possessionTimeline: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    floor: '14th of 26 Floors',
    facing: 'East Facing, 42-Acre Shaheed Bhagat Singh City Park',
    carParking: '2 Covered Basement Spots',
    latitude: 28.4529,
    longitude: 77.4812,
    images: [
      {
        url: '/src/assets/images/hero_luxury_residential_1793178138943.jpg',
        caption: 'Panoramic high-rise towers nestled along the green Sector 150 sports corridor'
      },
      {
        url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg',
        caption: 'Master bedroom with broad running balcony facing 42-acre lush municipal park'
      },
      {
        url: '/src/assets/images/penthouse_living_room_1793178139843.jpg',
        caption: 'Seamless open-plan dining and entertaining living room'
      },
      {
        url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg',
        caption: 'Resort-themed sky clubhouse with indoor badminton courts and swimming'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      '42-Acre City Park View',
      'Resort Style Clubhouse',
      'Half Olympic Swimming Pool',
      'Cricket Practice Pitch',
      'Tennis & Squash Courts',
      'Children Adventure Play Park',
      '24/7 Security & CCTV',
      'Gated Community Enclave',
      'Piped Natural Gas (PNG)'
    ],
    keyHighlights: [
      'Sector 150 is the lowest-density greenest residential hub of NCR (80% green)',
      'Underground cabling, zero overhead wires, and signal-free connectivity',
      'Corner unit with 3-side open ventilation and natural sunlight',
      'Walking distance to upcoming commercial high-street and metro station'
    ],
    connectivity: [
      { landmark: 'Sector 148 Aqua Line Metro', distanceTime: '3 Mins' },
      { landmark: 'Noida-Greater Noida Expressway', distanceTime: '2 Mins' },
      { landmark: 'FNG Corridor Interchange', distanceTime: '9 Mins' },
      { landmark: 'Kalindi Kunj & Delhi Border', distanceTime: '22 Mins' }
    ],
    maintenanceCostPerSqFt: 3.5,
    featured: true,
    exclusive: false
  },
  {
    id: 'tcncr-04',
    title: 'The Camellias Inspired Sky Suite',
    tagline: 'Ultra-Luxury 4 BHK Residence with 11 ft Ceilings & Golf Course Extension Frontage',
    project: 'M3M Golfestate Residences',
    developer: 'M3M India',
    locality: 'Sector 65, Golf Course Extension Road',
    submarket: 'Golf Course Extension',
    city: 'Gurugram',
    price: 64000000, // ₹6.40 Cr
    priceFormatted: '₹6.40 Cr',
    pricePerSqFt: 16842,
    propertyType: 'Apartment',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    superBuiltUpArea: 3800,
    carpetArea: 2950,
    possession: 'Ready to Move',
    possessionTimeline: 'Ready for Immediate Registration',
    furnishing: 'Semi-Furnished',
    floor: '22nd of 34 Floors',
    facing: 'South-East, 9-Hole Executive Golf Course View',
    carParking: '3 Dedicated Covered Basement Slots',
    latitude: 28.4069,
    longitude: 77.0673,
    images: [
      {
        url: '/src/assets/images/hero_luxury_residential_1793178138943.jpg',
        caption: 'Signature architectural towers surrounding the 9-hole executive greens'
      },
      {
        url: '/src/assets/images/penthouse_living_room_1793178139843.jpg',
        caption: 'Grand living room with custom European lighting and panoramic balcony'
      },
      {
        url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg',
        caption: 'Club Elegance with multi-cuisine dining, cigar lounge, and spa'
      },
      {
        url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg',
        caption: 'Luxurious master bedroom with walk-in closet and en-suite jacuzzi bath'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Executive 9-Hole Golf Greens',
      'Exclusive 7-Star Clubhouse',
      'Rooftop Helipad Provision',
      'Temperature Controlled All-Weather Pool',
      'Full-Service Cafe & Lounge',
      'Advanced Multi-Tier Access Control',
      'Dedicated Concierge Desk',
      'EV Charging Bays'
    ],
    keyHighlights: [
      'Direct frontage on 84-meter wide Golf Course Extension arterial road',
      'Private lift foyer for every individual residence',
      'Energy efficient VRV air conditioning and double-glazed soundproof glass',
      'Zero vehicle movement at ground pedestrian level'
    ],
    connectivity: [
      { landmark: 'Sector 55-56 Rapid Metro Station', distanceTime: '5 Mins' },
      { landmark: 'Cyber City Gurugram & DLF Phase 2', distanceTime: '16 Mins' },
      { landmark: 'IGI International Airport Terminal 3', distanceTime: '26 Mins' },
      { landmark: 'Southern Peripheral Road (SPR)', distanceTime: '4 Mins' }
    ],
    maintenanceCostPerSqFt: 4.8,
    featured: true,
    exclusive: true
  },
  {
    id: 'tcncr-05',
    title: 'The Grand Boulevard Sky High Residence',
    tagline: 'Modern 3.5 BHK Luxury High-Rise on Prime Dwarka Expressway Corridor',
    project: 'Sobha City Gurugram',
    developer: 'Sobha Developers',
    locality: 'Sector 108, Dwarka Expressway',
    submarket: 'Dwarka Expressway',
    city: 'Gurugram',
    price: 31000000, // ₹3.10 Cr
    priceFormatted: '₹3.10 Cr',
    pricePerSqFt: 13247,
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    superBuiltUpArea: 2340,
    carpetArea: 1810,
    possession: 'Ready to Move',
    possessionTimeline: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    floor: '18th of 30 Floors',
    facing: 'North-East, 39-Acre Master Community Vistas',
    carParking: '2 Covered Basement Slots',
    latitude: 28.5285,
    longitude: 77.0125,
    images: [
      {
        url: '/src/assets/images/hero_luxury_residential_1793178138943.jpg',
        caption: 'Impeccable architectural elevation with signature Sobha precast engineering'
      },
      {
        url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg',
        caption: 'Bedroom with full-height glass sliders and expansive cross breeze'
      },
      {
        url: '/src/assets/images/penthouse_living_room_1793178139843.jpg',
        caption: 'Airy living and formal dining zone with premium flooring'
      },
      {
        url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg',
        caption: 'Twin oval clubhouses with synthetic Olympic running track'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Twin Grand Clubhouses (40k sq ft)',
      'Full-size Cricket Ground',
      'Olympic-Length Swimming Pool',
      'Synthetic Running Track',
      '3-Tier Perimeter Security',
      'Dedicated Utility & Powder Room',
      'Water Harvesting & Filtration',
      'EV Car Charging Dock'
    ],
    keyHighlights: [
      'Seamless 15-minute signal-free access to IGI Airport via Dwarka Expressway tunnel',
      'Sobha precision quality with in-house craftsmanship and no sub-contracting',
      'Over 8.5 acres of uninterrupted central landscaped amenities',
      'Zero common wall shared with adjacent apartments for total privacy'
    ],
    connectivity: [
      { landmark: 'Dwarka Expressway 8-Lane Arterial', distanceTime: 'Direct 1 Min' },
      { landmark: 'IGI Airport Terminal 3', distanceTime: '15 Mins' },
      { landmark: 'Yashobhoomi IICC Convention Centre', distanceTime: '10 Mins' },
      { landmark: 'Delhi Border', distanceTime: '3 Mins' }
    ],
    maintenanceCostPerSqFt: 3.9,
    featured: false,
    exclusive: false
  },
  {
    id: 'tcncr-06',
    title: 'Central Noida Signature Luxury Floor',
    tagline: 'Exclusive Low-Density 4 BHK Independent Luxury Builder Floor in Established Sector',
    project: 'Pragya Elite Floors',
    developer: 'Twin City Capital Homes',
    locality: 'Sector 50, Central Noida',
    submarket: 'Central Noida',
    city: 'Noida',
    price: 42500000, // ₹4.25 Cr
    priceFormatted: '₹4.25 Cr',
    pricePerSqFt: 14166,
    propertyType: 'Builder Floor',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    superBuiltUpArea: 3000,
    carpetArea: 2360,
    possession: 'Ready to Move',
    possessionTimeline: 'Immediate Possession',
    furnishing: 'Fully Furnished',
    floor: '2nd Floor of 4 Floors (1 Unit per Floor)',
    facing: 'North Facing, Park Facing Frontage',
    carParking: '2 Stilt Covered Parking Bays',
    latitude: 28.5721,
    longitude: 77.3712,
    images: [
      {
        url: '/src/assets/images/penthouse_living_room_1793178139843.jpg',
        caption: 'Bespoke living area with custom brass accents, Italian marble, and false ceiling'
      },
      {
        url: '/src/assets/images/modern_villa_exterior_1793178140215.jpg',
        caption: 'Contemporary facade with natural stone and wooden louvers'
      },
      {
        url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg',
        caption: 'Designer master suite with hardwood floors and imported sanitaryware'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'One Apartment Per Floor',
      'Private Schindler Elevator',
      'Park Facing Balcony',
      'Dedicated Stilt Parking & Driver Room',
      'Silent Generator Backup',
      'High-Grade CCTV Surveillance',
      'Central RO & Solar Water Heater',
      'Automated Video Door Phone'
    ],
    keyHighlights: [
      'Nestled in the prime, tree-lined, fully established residential Sector 50 Noida',
      'Walking distance to Sector 50 Blue Line Metro Station & Central Market',
      'Private access lobby with individual key-coded elevator landing',
      'Freehold registry with individual terrace rights'
    ],
    connectivity: [
      { landmark: 'Sector 50 Metro Station', distanceTime: '3 Mins' },
      { landmark: 'Noida City Centre / Wave City Centre', distanceTime: '5 Mins' },
      { landmark: 'Mall of India & Sector 18 Market', distanceTime: '12 Mins' },
      { landmark: 'Fortis Hospital Noida', distanceTime: '8 Mins' }
    ],
    maintenanceCostPerSqFt: 2.2,
    featured: false,
    exclusive: true
  },
  {
    id: 'tcncr-07',
    title: 'The Eco-Park Vista 3 BHK',
    tagline: 'High-Growth 3 BHK Family Apartment with Clubhouse & Excellent TechZone Connectivity',
    project: 'ATS Nobility Residences',
    developer: 'ATS Infrastructure',
    locality: 'Sector 4, Greater Noida West',
    submarket: 'Greater Noida',
    city: 'Greater Noida',
    price: 18500000, // ₹1.85 Cr
    priceFormatted: '₹1.85 Cr',
    pricePerSqFt: 11044,
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    superBuiltUpArea: 1675,
    carpetArea: 1290,
    possession: 'Ready to Move',
    possessionTimeline: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    floor: '9th of 22 Floors',
    facing: 'North-East, Central Green Courtyard',
    carParking: '1 Dedicated Basement Bay',
    latitude: 28.601,
    longitude: 77.4479,
    images: [
      {
        url: '/src/assets/images/hero_luxury_residential_1793178138943.jpg',
        caption: 'Classic Spanish mission style architecture with extensive green open spaces'
      },
      {
        url: '/src/assets/images/luxury_bedroom_suite_1793178141406.jpg',
        caption: 'Bedroom with wooden flooring and garden landscape views'
      },
      {
        url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg',
        caption: 'Community clubhouse featuring swimming pool and recreation zones'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Spanish Architecture Clubhouse',
      'Swimming Pool & Kids Splash Pool',
      'Tennis & Basketball Courts',
      '24/7 Power Backup',
      'Gated Community Enclave',
      'Convenience Retail on Site',
      'Intercom & Multi-Tier Guarding'
    ],
    keyHighlights: [
      'Only 2 apartments per floor for maximum light and cross ventilation',
      'Direct link to FNG Expressway and Gaur Chowk high-street junction',
      'High rental yield corridor surrounded by major IT & corporate campuses',
      'Fully operational clubhouse with active sports academy'
    ],
    connectivity: [
      { landmark: 'Gaur City Mall & Junction', distanceTime: '4 Mins' },
      { landmark: 'Sector 52 / 71 Metro Station', distanceTime: '12 Mins' },
      { landmark: 'NH-24 / Delhi-Meerut Expressway', distanceTime: '10 Mins' },
      { landmark: 'Fortis Hospital Sector 62', distanceTime: '14 Mins' }
    ],
    maintenanceCostPerSqFt: 3.2,
    featured: false,
    exclusive: false
  },
  {
    id: 'tcncr-08',
    title: 'The Solitaire Manor Estate Villa',
    tagline: 'Ultra-Luxury 5 BHK Independent Villa in Secure Golf Community with Private Elevator',
    project: 'Sohna Greens Luxury Villas',
    developer: 'Central Park Resorts',
    locality: 'Sector 33, Sohna Road corridor',
    submarket: 'New Gurgaon',
    city: 'Gurugram',
    price: 79000000, // ₹7.90 Cr
    priceFormatted: '₹7.90 Cr',
    pricePerSqFt: 15800,
    propertyType: 'Villa',
    bedrooms: 5,
    bathrooms: 5,
    balconies: 4,
    superBuiltUpArea: 5000,
    carpetArea: 3950,
    possession: 'Under Construction',
    possessionTimeline: 'Possession: March 2027',
    furnishing: 'Semi-Furnished',
    floor: 'G+2 Standalone Villa with Terrace Garden',
    facing: 'North-East, Aravalli Hills Facing',
    carParking: '3 Covered + 2 Driveway Bays',
    latitude: 28.3182,
    longitude: 77.0653,
    images: [
      {
        url: '/src/assets/images/modern_villa_exterior_1793178140215.jpg',
        caption: 'Architectural villa with rooftop pavilion and lush Aravalli foothill backdrop'
      },
      {
        url: '/src/assets/images/penthouse_living_room_1793178139843.jpg',
        caption: 'Double height dining and reception area with expansive glass wall'
      },
      {
        url: '/src/assets/images/clubhouse_infinity_pool_1793178141185.jpg',
        caption: 'Resort pool with tranquil cabanas and private wellness sanctuary'
      }
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Aravalli Hill Views',
      'Private Rooftop Terrace Lounge',
      'Private Hydraulic In-Villa Lift',
      'Clubhouse with Horse Riding Arena',
      'Organic Orchard & Butterfly Garden',
      '24/7 Hospitality & Housekeeping Support',
      'Dedicated EV Charging System'
    ],
    keyHighlights: [
      'Unmatched panoramic backdrop of the protected Aravalli green ridge',
      'Clean air AQI advantage situated away from industrial congestion',
      'Direct signal-free 6-lane elevated corridor link to Rajiv Chowk Gurugram',
      'Bespoke customization options available for interior finishes'
    ],
    connectivity: [
      { landmark: 'Sohna Elevated Highway Entry', distanceTime: 'Direct 3 Mins' },
      { landmark: 'Rajiv Chowk Gurugram', distanceTime: '15 Mins' },
      { landmark: 'Golf Course Road Extension', distanceTime: '12 Mins' },
      { landmark: 'Delhi-Mumbai Expressway Interchange', distanceTime: '8 Mins' }
    ],
    maintenanceCostPerSqFt: 4.2,
    featured: true,
    exclusive: true
  }
];

export const NCR_SUBMARKETS = [
  'All Submarkets',
  'Noida Expressway',
  'Greater Noida',
  'Golf Course Extension',
  'Dwarka Expressway',
  'Central Noida',
  'New Gurgaon'
];

export const PROPERTY_TYPES = [
  'All Types',
  'Apartment',
  'Penthouse',
  'Villa',
  'Builder Floor'
];

export const NCR_NEIGHBORHOOD_GUIDES = [
  {
    id: 'noida-expressway',
    name: 'Noida Expressway & Sector 150',
    title: 'The Green Living & Sports Corridor of NCR',
    description: 'A 24.5 km high-speed arterial corridor connecting Noida to Greater Noida. Known for wide 45m+ sector roads, low-density zoning, and premier residential communities with sports facilities and golf clubs.',
    avgRate: '₹9,500 – ₹19,000 / sq ft',
    bestFor: 'Luxury families, tech executives, sports enthusiasts',
    highlights: ['Sector 150 80% green density', 'Direct connectivity to Jewar Airport', 'Top international schools & hospitals']
  },
  {
    id: 'golf-course-extn',
    name: 'Golf Course Extension Road, Gurugram',
    title: 'The Billionaires & CXO Enclave of Millennium City',
    description: 'Gurugram premier luxury residential strip connecting Golf Course Road to Southern Peripheral Road. Hosts top high-rises, fine-dining restaurants, multinational corporate headquarters, and championship golf greens.',
    avgRate: '₹14,000 – ₹26,000 / sq ft',
    bestFor: 'High net-worth individuals, expats, senior executives',
    highlights: ['Proximity to Cyber City & Rapid Metro', 'Ultra-luxury high rises with private lifts', 'Lush manicured golf courses']
  },
  {
    id: 'dwarka-expressway',
    name: 'Dwarka Expressway (Northern Peripheral Road)',
    title: 'The 16-Lane Gateway to IGI Airport & Delhi',
    description: 'An advanced 8-lane elevated grade expressway connecting Shiv Murti Delhi to Kherki Daula. The closest luxury residential hub to Terminal 3 IGI Airport with futuristic multi-tier interchanges and large township developments.',
    avgRate: '₹11,500 – ₹18,500 / sq ft',
    bestFor: 'Frequent flyers, diplomatic staff, long-term capital appreciation',
    highlights: ['15-minute signal-free airport access', 'Adjacent to Yashobhoomi Convention Center', 'Large gated communities with complete amenities']
  },
  {
    id: 'greater-noida',
    name: 'Greater Noida & Jaypee Greens',
    title: 'Sprawling Master-Planned Estates & Greenfield Infrastructure',
    description: 'Renowned for its expansive open spaces, 18-hole Greg Norman championship golf estate, clean wide boulevards, top educational universities, and direct access to the Yamuna Expressway corridor.',
    avgRate: '₹7,500 – ₹18,000 / sq ft',
    bestFor: 'Quiet villa living, golf connoisseurs, green lifestyle',
    highlights: ['Jaypee Greens 450-acre integrated enclave', 'Pari Chowk metro and expressway hub', 'Proximity to Buddha International Circuit & Jewar']
  }
];
