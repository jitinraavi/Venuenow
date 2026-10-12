import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Venue,
  CateringService,
  DecorService,
  DecorPackage,
  PhotographyService,
  ChauffeurService,
  HoneymoonDestination,
  HoneymoonProvider,
  WeddingCart,
  BudgetEstimate
} from '../types/wedding';
import { api } from '../services/api';

export type ActiveTab =
  | 'venues'
  | 'catering'
  | 'decor'
  | 'photography'
  | 'chauffeurs'
  | 'honeymoon'
  | 'planner'
  | 'vendor-portal';

export type CurrencyType = 'INR' | 'USD' | 'CAD';

interface WeddingContextType {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  weddingDate: string;
  setWeddingDate: (date: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  weddingDays: number;
  setWeddingDays: (days: number) => void;
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  cycleCurrency: () => void;
  formatPrice: (amountINR: number) => string;
  cart: WeddingCart;
  selectVenue: (venue: Venue | null) => void;
  selectCatering: (catering: CateringService | null) => void;
  selectDecor: (decor: DecorService | null, pkg?: DecorPackage | null) => void;
  selectPhotography: (photo: PhotographyService | null) => void;
  selectChauffeur: (chauffeur: ChauffeurService | null, days?: number) => void;
  selectHoneymoon: (dest: HoneymoonDestination | null, provider?: HoneymoonProvider | null) => void;
  removeItem: (category: keyof WeddingCart) => void;
  clearCart: () => void;
  cartItemCount: number;
  estimate: BudgetEstimate | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMobileAppView: boolean;
  setIsMobileAppView: (val: boolean | ((prev: boolean) => boolean)) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (val: boolean) => void;
  // Deliverable Distance & Proximity Filter Context
  deliverableVenue: Venue | null;
  setDeliverableVenue: (v: Venue | null) => void;
  filterOnlyDeliverable: boolean;
  setFilterOnlyDeliverable: (val: boolean) => void;
  jumpToDeliverables: (venue: Venue, category: ActiveTab) => void;
}

const initialCart: WeddingCart = {
  venue: null,
  catering: null,
  decor: null,
  decorPackage: null,
  photography: null,
  chauffeur: null,
  chauffeurDays: 1,
  honeymoon: null,
  honeymoonProvider: null
};

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [weddingDate, setWeddingDate] = useState<string>('2026-11-25');
  const [guestCount, setGuestCount] = useState<number>(250);
  const [weddingDays, setWeddingDays] = useState<number>(2);
  const [currency, setCurrency] = useState<CurrencyType>('INR');
  const [cart, setCart] = useState<WeddingCart>(initialCart);
  const [estimate, setEstimate] = useState<BudgetEstimate | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('venues');
  const [isMobileAppView, setIsMobileAppView] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  // Deliverable distance matching
  const [deliverableVenue, setDeliverableVenue] = useState<Venue | null>(null);
  const [filterOnlyDeliverable, setFilterOnlyDeliverable] = useState<boolean>(true);

  const cycleCurrency = () => {
    setCurrency(prev => {
      if (prev === 'INR') return 'USD';
      if (prev === 'USD') return 'CAD';
      return 'INR';
    });
  };

  const formatPrice = (amountINR: number) => {
    if (currency === 'USD') {
      const usdAmount = Math.round(amountINR / 83.5);
      return `$${usdAmount.toLocaleString('en-US')}`;
    }
    if (currency === 'CAD') {
      const cadAmount = Math.round(amountINR / 61.2);
      return `C$${cadAmount.toLocaleString('en-CA')}`;
    }
    return `₹${amountINR.toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchEst = async () => {
      const data = await api.getEstimate({
        venueId: cart.venue?.id,
        cateringId: cart.catering?.id,
        decorId: cart.decor?.id,
        photographyId: cart.photography?.id,
        chauffeurId: cart.chauffeur?.id,
        honeymoonId: cart.honeymoon?.id,
        honeymoonProviderId: cart.honeymoonProvider?.providerId,
        guestCount,
        weddingDays
      });
      if (!isCancelled) {
        setEstimate(data);
      }
    };
    fetchEst();
    return () => {
      isCancelled = true;
    };
  }, [cart, guestCount, weddingDays]);

  const selectVenue = (venue: Venue | null) => {
    setCart(prev => ({ ...prev, venue }));
    setDeliverableVenue(venue);
    if (venue && venue.location) {
      setSelectedLocation(venue.location);
      if (venue.country) {
        setSelectedCountry(venue.country);
      }
    }
  };

  const jumpToDeliverables = (venue: Venue, category: ActiveTab) => {
    selectVenue(venue);
    setDeliverableVenue(venue);
    setFilterOnlyDeliverable(true);
    setActiveTab(category);
  };

  const selectCatering = (catering: CateringService | null) => {
    setCart(prev => ({ ...prev, catering }));
  };

  const selectDecor = (decor: DecorService | null, pkg?: DecorPackage | null) => {
    setCart(prev => ({ ...prev, decor, decorPackage: pkg || null }));
  };

  const selectPhotography = (photography: PhotographyService | null) => {
    setCart(prev => ({ ...prev, photography }));
  };

  const selectChauffeur = (chauffeur: ChauffeurService | null, days = 1) => {
    setCart(prev => ({ ...prev, chauffeur, chauffeurDays: days }));
  };

  const selectHoneymoon = (honeymoon: HoneymoonDestination | null, provider?: HoneymoonProvider | null) => {
    setCart(prev => ({
      ...prev,
      honeymoon,
      honeymoonProvider: provider || honeymoon?.providers[0] || null
    }));
  };

  const removeItem = (category: keyof WeddingCart) => {
    setCart(prev => {
      const updated = { ...prev };
      if (category === 'decor') {
        updated.decor = null;
        updated.decorPackage = null;
      } else if (category === 'honeymoon') {
        updated.honeymoon = null;
        updated.honeymoonProvider = null;
      } else if (category === 'chauffeur') {
        updated.chauffeur = null;
        updated.chauffeurDays = 1;
      } else if (category === 'venue') {
        updated.venue = null;
        setDeliverableVenue(null);
      } else {
        (updated as any)[category] = null;
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart(initialCart);
    setDeliverableVenue(null);
  };

  const cartItemCount = [
    cart.venue,
    cart.catering,
    cart.decor,
    cart.photography,
    cart.chauffeur,
    cart.honeymoon
  ].filter(Boolean).length;

  return (
    <WeddingContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        selectedLocation,
        setSelectedLocation,
        weddingDate,
        setWeddingDate,
        guestCount,
        setGuestCount,
        weddingDays,
        setWeddingDays,
        currency,
        setCurrency,
        cycleCurrency,
        formatPrice,
        cart,
        selectVenue,
        selectCatering,
        selectDecor,
        selectPhotography,
        selectChauffeur,
        selectHoneymoon,
        removeItem,
        clearCart,
        cartItemCount,
        estimate,
        activeTab,
        setActiveTab,
        isMobileAppView,
        setIsMobileAppView,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        deliverableVenue,
        setDeliverableVenue,
        filterOnlyDeliverable,
        setFilterOnlyDeliverable,
        jumpToDeliverables
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
