// Type definitions for VenueNow Wedding Ecosystem — Multi-Country (India, USA, Canada)

export interface CountryOption {
  id: string;
  name: string;
  flag: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationOption {
  id: string;
  name: string;
  country?: string;
  badge?: string;
  lat?: number;
  lng?: number;
}

export interface VenueDate {
  date: string;
  status: 'available' | 'booked';
}

export interface Venue {
  id: string;
  name: string;
  country?: string; // 'india' | 'usa' | 'canada'
  city?: string;
  location: string;
  locationLabel: string;
  coordinates?: Coordinates;
  type: string;
  rating: number;
  reviewCount: number;
  googlePlaceId?: string;
  googleRating?: number;
  googleReviewCount?: number;
  googleMapsUrl?: string;
  categoryTag?: string; // 'banquet' | 'farmhouse' | 'heritage' | 'beach' | 'barn_winery' | 'urban_loft' | 'community_budget' | 'country_club'
  priceTier?: 'budget' | 'mid_range' | 'luxury';
  pricePerDay: number; // in INR
  pricePerPlate: number; // in INR
  priceUSD?: number;
  priceCAD?: number;
  minGuests: number;
  maxGuests: number;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  availableDates: VenueDate[];
}

export interface VenueStats {
  total: number;
  byCountry: Record<string, number>;
  byCategory: Record<string, number>;
  byPriceTier: Record<string, number>;
}

export interface VenueQueryResult {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
  count: number;
  data: Venue[];
}

export interface MenuItem {
  name: string;
  description: string;
}

export interface CateringMenu {
  welcomeDrinks: MenuItem[];
  appetizers: MenuItem[];
  liveCounters: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
}

export interface CateringService {
  id: string;
  name: string;
  country?: string;
  city?: string;
  location: string;
  locationLabel: string;
  coordinates?: Coordinates;
  deliverableRadiusKm?: number;
  distanceKm?: number | null;
  isDeliverable?: boolean;
  referenceVenue?: { id: string; name: string; locationLabel: string };
  rating: number;
  reviewCount: number;
  pricePerPlate: number;
  priceUSD?: number;
  priceCAD?: number;
  minGuests: number;
  maxGuests: number;
  image: string;
  cuisines: string[];
  dietaryOptions: string[];
  serviceIncluded: string[];
  menu: CateringMenu;
  enrolledAt?: string;
}

export interface DecorPackage {
  name: string;
  price: number;
  guestsFedOrCovered: string;
  description: string;
}

export interface DecorOfferings {
  mandap: string;
  entrance: string;
  seating: string;
  lighting: string;
  photobooth: string;
  soundStage: string;
}

export interface DecorService {
  id: string;
  name: string;
  country?: string;
  city?: string;
  location: string;
  locationLabel: string;
  coordinates?: Coordinates;
  deliverableRadiusKm?: number;
  distanceKm?: number | null;
  isDeliverable?: boolean;
  referenceVenue?: { id: string; name: string; locationLabel: string };
  rating: number;
  reviewCount: number;
  priceStarting: number;
  priceUSD?: number;
  priceCAD?: number;
  capacityCoverage: string;
  image: string;
  theme: string;
  offerings: DecorOfferings;
  packages: DecorPackage[];
  enrolledAt?: string;
}

export interface PhotoDeliverables {
  coverageDays: string;
  cinematicTeaser: string;
  weddingFilm: string;
  highResPhotos: string;
  albums: string;
  droneFootage: string;
  socialMediaReels: string;
}

export interface PhotographyService {
  id: string;
  name: string;
  country?: string;
  city?: string;
  location: string;
  locationLabel: string;
  coordinates?: Coordinates;
  deliverableRadiusKm?: number;
  distanceKm?: number | null;
  isDeliverable?: boolean;
  referenceVenue?: { id: string; name: string; locationLabel: string };
  rating: number;
  reviewCount: number;
  price: number;
  priceUSD?: number;
  priceCAD?: number;
  image: string;
  style: string;
  teamSize: string;
  deliverables: PhotoDeliverables;
  gearList: string[];
  enrolledAt?: string;
}

export interface ChauffeurService {
  id: string;
  name: string;
  country?: string;
  city?: string;
  vehicleType: string;
  location: string;
  locationLabel: string;
  coordinates?: Coordinates;
  deliverableRadiusKm?: number;
  distanceKm?: number | null;
  isDeliverable?: boolean;
  referenceVenue?: { id: string; name: string; locationLabel: string };
  rating: number;
  reviewCount: number;
  pricePerDay: number;
  pricePerHour: number;
  priceUSD?: number;
  priceCAD?: number;
  passengerCapacity: string;
  image: string;
  features: string[];
  enrolledAt?: string;
}

export interface HoneymoonProvider {
  providerId: string;
  name: string;
  logo: string;
  badge: string;
  flightAirline: string;
  roomCategory: string;
  priceINR: number;
  priceUSD: number;
  priceCAD?: number;
  originalPriceINR: number;
  savingsPercent: number;
  rating: number;
  includedPerks: string[];
  directBookingUrl: string;
}

export interface HoneymoonDestination {
  id: string;
  title: string;
  destination: string;
  vibe: string;
  nights: number;
  bestMonth: string;
  image: string;
  description: string;
  romanticPerks: string[];
  providers: HoneymoonProvider[];
}

export interface WeddingCart {
  venue: Venue | null;
  catering: CateringService | null;
  decor: DecorService | null;
  decorPackage?: DecorPackage | null;
  photography: PhotographyService | null;
  chauffeur: ChauffeurService | null;
  chauffeurDays: number;
  honeymoon: HoneymoonDestination | null;
  honeymoonProvider: HoneymoonProvider | null;
}

export interface BudgetEstimateBreakdown {
  venue: { item?: string; cost: number; days: number };
  catering: { item?: string; cost: number; guests: number; pricePerPlate?: number };
  decor: { item?: string; cost: number };
  photography: { item?: string; cost: number };
  chauffeur: { item?: string; cost: number; days: number };
  honeymoon: { destination?: string; provider?: string; cost: number };
}

export interface BudgetEstimate {
  breakdown: BudgetEstimateBreakdown;
  summary: {
    subtotal: number;
    gstTax: number;
    grandTotal: number;
    guestCount: number;
    costPerGuest: number;
    recommendedAdvanceDeposit: number;
  };
}

export interface BookingSubmission {
  coupleNames: string;
  email: string;
  phone: string;
  weddingDate: string;
  location: string;
  guestCount: number;
  notes?: string;
  selectedItems: {
    venue?: string;
    catering?: string;
    decor?: string;
    photography?: string;
    chauffeur?: string;
    honeymoon?: string;
    honeymoonProvider?: string;
  };
}

export interface VendorEnrollmentPayload {
  category: 'catering' | 'decor' | 'photography' | 'chauffeurs';
  name: string;
  country: 'india' | 'usa' | 'canada';
  city: string;
  location?: string;
  locationLabel?: string;
  coordinates?: Coordinates;
  deliverableRadiusKm: number;
  pricing: number;
  minGuests?: number;
  maxGuests?: number;
  description: string;
  portfolioImages: string[];
  contact: {
    contactPerson: string;
    email: string;
    phone: string;
  };
  categoryDetails?: {
    cuisines?: string[];
    dietaryOptions?: string[];
    serviceIncluded?: string[];
    theme?: string;
    style?: string;
    vehicleType?: string;
    teamSize?: string;
    features?: string[];
  };
}
