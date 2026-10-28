export type PropertyType = 'Apartment' | 'Penthouse' | 'Villa' | 'Builder Floor' | 'Plotted Development';
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'Immediate Possession' | 'New Launch';
export type FurnishingStatus = 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  project: string;
  developer: string;
  locality: string;
  submarket: 'Noida Expressway' | 'Greater Noida' | 'Dwarka Expressway' | 'Golf Course Extension' | 'Central Noida' | 'New Gurgaon';
  city: 'Noida' | 'Greater Noida' | 'Gurugram' | 'New Delhi';
  price: number; // in INR
  priceFormatted: string; // e.g. "₹2.45 Cr"
  pricePerSqFt: number; // e.g. 11500
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  superBuiltUpArea: number; // in sq ft
  carpetArea: number; // in sq ft
  possession: PossessionStatus;
  possessionTimeline: string; // e.g. "Ready to Move" or "Dec 2026"
  furnishing: FurnishingStatus;
  floor: string; // e.g. "16th of 28 Floors"
  facing: string; // e.g. "Golf Course Facing, North-East"
  carParking: string; // e.g. "2 Dedicated Covered"
  latitude: number;
  longitude: number;
  images: {
    url: string;
    caption: string;
  }[];
  floorPlanUrl: string;
  amenities: string[];
  keyHighlights: string[];
  connectivity: {
    landmark: string;
    distanceTime: string;
  }[];
  maintenanceCostPerSqFt: number; // in INR/month
  featured?: boolean;
  exclusive?: boolean;
  status?: 'Active' | 'Under Offer' | 'Sold';
  updatedAt?: string;
}

export interface FilterState {
  searchQuery: string;
  submarket: string;
  city: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | null; // null for any
  possession: string;
  minArea: number;
  amenities: string[];
  sortBy: 'price_asc' | 'price_desc' | 'area_desc' | 'featured' | 'newest';
}

export interface InquiryMessage {
  id: string;
  sender: 'client' | 'broker';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ClientInquiry {
  id: string;
  clientId?: string;
  createdAt: string;
  type: 'site_visit' | 'inquiry' | 'callback' | 'brochure' | 'list_property';
  propertyName?: string;
  propertyId?: string;
  name: string;
  phone: string;
  email: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  needChauffeurPickup?: boolean;
  pickupLocation?: string;
  message?: string;
  propertyDetailsToList?: {
    location: string;
    propertyType: string;
    sizeSqFt: string;
    expectedPrice: string;
  };
  status: 'In Review' | 'Consultant Assigned' | 'Visit Scheduled' | 'Completed';
  assignedConsultant?: string;
  messages: InquiryMessage[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'broker';
  company?: string;
  joinedDate: string;
}
