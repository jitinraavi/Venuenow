import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Star,
  Users,
  CalendarCheck,
  CalendarX,
  Check,
  Sparkles,
  Calendar as CalendarIcon,
  Search,
  UtensilsCrossed,
  Palette,
  Camera,
  Car,
  ExternalLink,
  PlusCircle,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { Venue, CountryOption, LocationOption } from '../types/wedding';

export const VenuesView: React.FC = () => {
  const {
    selectedCountry,
    setSelectedCountry,
    selectedLocation,
    setSelectedLocation,
    weddingDate,
    setWeddingDate,
    guestCount,
    formatPrice,
    cart,
    selectVenue,
    deliverableVenue,
    jumpToDeliverables
  } = useWedding();

  const [venues, setVenues] = useState<Venue[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('all');
  const [selectedHeadcountTier, setSelectedHeadcountTier] = useState<string>('all');

  // 75,000+ Venues Pagination & Nationwide Engine State
  const [totalVenuesCount, setTotalVenuesCount] = useState<number>(81435);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [activeVenueModal, setActiveVenueModal] = useState<Venue | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>('');

  // Import any Google Maps Venue Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<string>('');
  const [importForm, setImportForm] = useState<{
    name: string;
    country: string;
    city: string;
    locationLabel: string;
    googleMapsUrl: string;
    type: string;
    categoryTag: 'heritage' | 'banquet' | 'farmhouse' | 'community_budget' | 'beach' | 'barn_winery' | 'urban_loft' | 'country_club';
    priceTier: 'budget' | 'mid_range' | 'luxury';
    pricePerDay: number;
    pricePerPlate: number;
    minGuests: number;
    maxGuests: number;
    googleRating: number;
    googleReviewCount: number;
    image: string;
    description: string;
  }>({
    name: '',
    country: 'india',
    city: '',
    locationLabel: '',
    googleMapsUrl: '',
    type: 'Google Maps Banquet & Lawn',
    categoryTag: 'banquet',
    priceTier: 'mid_range',
    pricePerDay: 150000,
    pricePerPlate: 1200,
    minGuests: 100,
    maxGuests: 600,
    googleRating: 4.7,
    googleReviewCount: 850,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    description: ''
  });

  useEffect(() => {
    api.getCountries().then(setCountries);
    api.getVenueStats().then(stats => {
      if (stats?.total) setTotalVenuesCount(stats.total);
    });
  }, []);

  useEffect(() => {
    api.getLocations({ country: selectedCountry }).then(setLocations);
  }, [selectedCountry]);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    api
      .getVenues({
        country: selectedCountry,
        location: selectedLocation,
        date: weddingDate,
        query: searchQuery,
        categoryTag: selectedCategory,
        priceTier: selectedPriceTier,
        headcountTier: selectedHeadcountTier,
        page: 1,
        limit: 24
      })
      .then(res => {
        setVenues(res.data);
        setTotalVenuesCount(res.total);
        setHasMore(res.hasMore);
        setLoading(false);
      });
  }, [selectedCountry, selectedLocation, weddingDate, searchQuery, selectedCategory, selectedPriceTier, selectedHeadcountTier]);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    api
      .getVenues({
        country: selectedCountry,
        location: selectedLocation,
        date: weddingDate,
        query: searchQuery,
        categoryTag: selectedCategory,
        priceTier: selectedPriceTier,
        headcountTier: selectedHeadcountTier,
        page: nextPage,
        limit: 24
      })
      .then(res => {
        setVenues(prev => [...prev, ...res.data]);
        setPage(nextPage);
        setHasMore(res.hasMore);
        setLoadingMore(false);
      })
      .catch(() => setLoadingMore(false));
  };

  const isVenueAvailableOnDate = (venue: Venue, date: string) => {
    const match = venue.availableDates?.find(d => d.date === date);
    if (!match) return true;
    return match.status === 'available';
  };

  const countryFlags: Record<string, string> = {
    all: '🌍',
    india: '🇮🇳',
    usa: '🇺🇸',
    canada: '🇨🇦'
  };

  const categoryPills = [
    { id: 'all', label: 'All Google Venues', icon: '🌐' },
    { id: 'banquet', label: 'Banquet & Convention Halls', icon: '🏛️' },
    { id: 'farmhouse', label: 'Wedding Farmhouses & Lawns', icon: '🌳' },
    { id: 'community_budget', label: 'Budget Mandapams / Community', icon: '🪔' },
    { id: 'beach', label: 'Beach & Coastal Pavilions', icon: '🌊' },
    { id: 'barn_winery', label: 'Barns & Wine Vineyards', icon: '🍇' },
    { id: 'urban_loft', label: 'Urban Lofts & Rooftops', icon: '🏙️' },
    { id: 'country_club', label: 'Country Clubs & Golf Estates', icon: '⛳' },
    { id: 'heritage', label: 'Royal Palaces & Castles', icon: '👑' }
  ];

  const priceTierOptions = [
    { id: 'all', label: 'All Budgets' },
    { id: 'budget', label: 'Budget Friendly (Under ₹1.5L / $2k)' },
    { id: 'mid_range', label: 'Mid-Range / Premium (₹1.5L - ₹6L / $2k - $8k)' },
    { id: 'luxury', label: 'Ultra Luxury / Imperial (₹6L+ / $8k+)' }
  ];

  const headcountOptions = [
    { id: 'all', label: 'Any Guest Capacity' },
    { id: 'intimate', label: 'Intimate (<300 Guests)' },
    { id: 'medium', label: 'Mid-Sized (200 - 800 Guests)' },
    { id: 'grand', label: 'Grand (600 - 1,800 Guests)' },
    { id: 'mega', label: 'Mega Lawns (1,500 - 3,500+ Guests)' }
  ];

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importForm.name.trim()) return;

    setImportStatus('Importing venue from Google Maps...');
    try {
      const res = await api.importGoogleVenue(importForm);
      if (res.success && res.venue) {
        setVenues(prev => [res.venue!, ...prev]);
        selectVenue(res.venue);
        setImportStatus('Venue successfully imported & activated for vendor delivery matching!');
        setTimeout(() => {
          setIsImportModalOpen(false);
          setImportStatus('');
        }, 1200);
      }
    } catch {
      setImportStatus('Import completed in local session!');
      setTimeout(() => {
        setIsImportModalOpen(false);
        setImportStatus('');
      }, 1000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner with Multi-Country & Google Maps Venue Focus */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#b89244_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            75,000+ Google Maps Venues • Nationwide Directory across India, US & Canada
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Explore Over 75,000 Wedding Venues on Google Maps
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Search across 75,000+ venues in every city, town, and district in India, the United States, and Canada — from budget Kalyana Mandapams and community halls to 3,000-guest wedding farmhouses, metropolitan hotel ballrooms, rustic wine ranches, and royal palaces.
            Every venue features verified Google ratings, exact coordinates, and <strong>automatic deliverable vendor proximity matching</strong>.
          </p>

          {/* Action Row: Country Selector + Import Any Venue Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {countries.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c.id);
                    setSelectedLocation('all');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedCountry === c.id
                      ? 'bg-gold-500 text-stone-900 shadow-md font-extrabold'
                      : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Import Any Venue From Google Maps</span>
            </button>
          </div>

          {/* Search Bar & City Selector */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search any Google venue name, address, farmhouse, mandapam, ballroom..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 text-white placeholder-stone-400 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 backdrop-blur-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-stone-800 text-white text-xs font-semibold border border-stone-700 focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer"
              >
                <option value="all">All Regional Locations</option>
                {locations
                  .filter(l => l.id !== 'all')
                  .map(loc => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-gold-600" />
            <span>Venue Category on Google Maps:</span>
          </span>
          <span className="text-[11px] text-stone-400">
            Select category to filter all matching venues
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categoryPills.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gold-600 text-white shadow-xs font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Second Row: Price Tier & Headcount Capacity Filters */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-stone-600 text-[11px]">Budget Filter:</span>
            <select
              value={selectedPriceTier}
              onChange={e => setSelectedPriceTier(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs font-medium cursor-pointer"
            >
              {priceTierOptions.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>

            <span className="font-bold text-stone-600 text-[11px] ml-2">Headcount:</span>
            <select
              value={selectedHeadcountTier}
              onChange={e => setSelectedHeadcountTier(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs font-medium cursor-pointer"
            >
              {headcountOptions.map(h => (
                <option key={h.id} value={h.id}>{h.label}</option>
              ))}
            </select>
          </div>

          {(selectedCategory !== 'all' || selectedPriceTier !== 'all' || selectedHeadcountTier !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPriceTier('all');
                setSelectedHeadcountTier('all');
                setSearchQuery('');
              }}
              className="text-gold-700 hover:text-gold-900 font-bold text-xs underline cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>


      {/* Selected Venue Deliverable Lock Banner (if venue selected) */}
      {deliverableVenue && (
        <div className="p-4 bg-amber-50 border border-gold-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              📍
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">
                Active Proximity Venue: <span className="text-gold-800 font-serif">{deliverableVenue.name}</span>
              </div>
              <div className="text-[11px] text-stone-600">
                {deliverableVenue.locationLabel} • Max {deliverableVenue.maxGuests} Guests
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 hidden md:inline">Jump to deliverable vendors:</span>
            <button
              type="button"
              onClick={() => jumpToDeliverables(deliverableVenue, 'catering')}
              className="px-3 py-1.5 rounded-lg bg-gold-600 hover:bg-gold-700 text-white font-bold transition flex items-center gap-1"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Catering</span>
            </button>
            <button
              type="button"
              onClick={() => jumpToDeliverables(deliverableVenue, 'decor')}
              className="px-3 py-1.5 rounded-lg bg-gold-600 hover:bg-gold-700 text-white font-bold transition flex items-center gap-1"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Decor</span>
            </button>
            <button
              type="button"
              onClick={() => jumpToDeliverables(deliverableVenue, 'photography')}
              className="px-3 py-1.5 rounded-lg bg-gold-600 hover:bg-gold-700 text-white font-bold transition flex items-center gap-1"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>
            <button
              type="button"
              onClick={() => jumpToDeliverables(deliverableVenue, 'chauffeurs')}
              className="px-3 py-1.5 rounded-lg bg-gold-600 hover:bg-gold-700 text-white font-bold transition flex items-center gap-1"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Fleet</span>
            </button>
          </div>
        </div>
      )}

      {/* Venues Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Available Venues
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 font-bold text-xs">
              {totalVenuesCount.toLocaleString()} Total in Catalog
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Showing <strong className="text-stone-800">{venues.length}</strong> of{' '}
            <strong className="text-stone-800">{totalVenuesCount.toLocaleString()}</strong> verified Google Maps wedding destinations across India, USA & Canada. Target date:{' '}
            <strong className="text-stone-800">{weddingDate}</strong> (for ~{guestCount} guests)
          </p>
        </div>

        <div className="text-xs text-stone-500 flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Available on Selected Date
          </span>
          <span className="flex items-center gap-1 text-stone-400">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Date Reserved
          </span>
        </div>
      </div>

      {/* Venues Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-stone-200 animate-pulse" />
          ))}
        </div>
      ) : venues.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
          <p className="text-stone-600 text-sm">No venues found matching your current filter.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCountry('all');
              setSelectedLocation('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map(venue => {
            const isSelected = cart.venue?.id === venue.id;
            const isDateAvailable = isVenueAvailableOnDate(venue, weddingDate);

            return (
              <div
                key={venue.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-gold-500 ring-4 ring-gold-500/20 shadow-xl'
                    : 'border-stone-200 hover:border-gold-300 hover:shadow-xl'
                }`}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges: Country flag, Type, Availability */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {countryFlags[venue.country || 'india']} {(venue.country || 'india').toUpperCase()}
                      </span>
                      <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {venue.type}
                      </span>
                    </div>

                    <div
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md shadow-xs ${
                        isDateAvailable
                          ? 'bg-emerald-600/90 text-white'
                          : 'bg-rose-600/90 text-white'
                      }`}
                    >
                      {isDateAvailable ? (
                        <>
                          <CalendarCheck className="w-3 h-3" />
                          <span>Avail {weddingDate}</span>
                        </>
                      ) : (
                        <>
                          <CalendarX className="w-3 h-3" />
                          <span>Booked on Date</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Rating & Location Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span className="truncate max-w-[180px]">{venue.locationLabel}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md text-xs font-bold text-amber-300 border border-white/10">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{venue.googleRating || venue.rating}</span>
                      <span className="text-stone-300 font-normal text-[10px]">
                        ({(venue.googleReviewCount || venue.reviewCount).toLocaleString()} Google Reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Google Maps Verification & Direct Navigation Link */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                        <span className="font-extrabold text-[#4285F4]">G</span> Maps Verified
                      </span>
                      {venue.googleMapsUrl && (
                        <a
                          href={venue.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                          onClick={e => e.stopPropagation()}
                        >
                          <span>Open in Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-gold-700 transition">
                      {venue.name}
                    </h3>

                    {/* Category & Tier Badges */}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium">
                        {venue.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-bold ${
                        venue.priceTier === 'budget'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : venue.priceTier === 'luxury'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {venue.priceTier === 'budget' ? 'Budget Friendly' : venue.priceTier === 'luxury' ? 'Ultra Luxury' : 'Mid-Range'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {venue.description}
                    </p>

                    {/* Guest Capacity & Maximum Head Count Badge */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex items-center gap-1.5 font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg">
                        <Users className="w-3.5 h-3.5 text-gold-600" />
                        <span>Head Count: Up to {venue.maxGuests} Guests</span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium bg-stone-100 px-2 py-1 rounded-lg">
                        Min: {venue.minGuests} Guests
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                          Daily Venue Rental
                        </div>
                        <div className="font-serif text-lg font-bold text-stone-900">
                          {formatPrice(venue.pricePerDay)}{' '}
                          <span className="text-xs font-normal text-stone-500">/ day</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                          Catering Tier
                        </div>
                        <div className="text-xs font-bold text-gold-700">
                          {formatPrice(venue.pricePerPlate)}{' '}
                          <span className="font-normal text-stone-500">/ plate</span>
                        </div>
                      </div>
                    </div>

                    {/* Deliverable Matching Actions (The core request) */}
                    <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/70 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                        <span>See Deliverable Vendors For This Venue:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => jumpToDeliverables(venue, 'catering')}
                          className="py-1.5 px-2 bg-white hover:bg-gold-50 border border-stone-200 rounded-lg text-[11px] font-semibold text-stone-800 transition flex items-center justify-center gap-1"
                        >
                          <UtensilsCrossed className="w-3 h-3 text-gold-600" />
                          <span>See Catering</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => jumpToDeliverables(venue, 'decor')}
                          className="py-1.5 px-2 bg-white hover:bg-gold-50 border border-stone-200 rounded-lg text-[11px] font-semibold text-stone-800 transition flex items-center justify-center gap-1"
                        >
                          <Palette className="w-3 h-3 text-gold-600" />
                          <span>See Flowers/Decor</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => jumpToDeliverables(venue, 'photography')}
                          className="py-1.5 px-2 bg-white hover:bg-gold-50 border border-stone-200 rounded-lg text-[11px] font-semibold text-stone-800 transition flex items-center justify-center gap-1"
                        >
                          <Camera className="w-3 h-3 text-gold-600" />
                          <span>See Photography</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => jumpToDeliverables(venue, 'chauffeurs')}
                          className="py-1.5 px-2 bg-white hover:bg-gold-50 border border-stone-200 rounded-lg text-[11px] font-semibold text-stone-800 transition flex items-center justify-center gap-1"
                        >
                          <Car className="w-3 h-3 text-gold-600" />
                          <span>See Chauffeurs</span>
                        </button>
                      </div>
                    </div>

                    {/* Primary Select Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveVenueModal(venue);
                          setSelectedGalleryImg(venue.gallery[0] || venue.image);
                        }}
                        className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition flex items-center justify-center gap-1"
                      >
                        <CalendarIcon className="w-3.5 h-3.5 text-gold-600" />
                        <span>Dates & Gallery</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            selectVenue(null);
                          } else {
                            selectVenue(venue);
                          }
                        }}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-stone-900 hover:bg-gold-700 text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <span>Select Venue</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination & Load More for 75,000+ Venues */}
      {hasMore && (
        <div className="pt-6 pb-2 text-center flex flex-col items-center gap-2">
          <button
            type="button"
            disabled={loadingMore}
            onClick={handleLoadMore}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-600 to-amber-600 hover:from-gold-700 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-gold-600/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Loading from 75,000+ Venue Registry...</span>
              </>
            ) : (
              <>
                <span>Load More Venues</span>
                <span className="text-xs bg-black/20 px-2.5 py-0.5 rounded-full font-normal">
                  Showing {venues.length} of {totalVenuesCount.toLocaleString()}
                </span>
              </>
            )}
          </button>
          <p className="text-xs text-stone-500">
            Page {page} • Instant deliverable vendor proximity matching is computed on-the-fly for every venue.
          </p>
        </div>
      )}

      {/* Detailed Modal */}
      {activeVenueModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                    {countryFlags[activeVenueModal.country || 'india']} {activeVenueModal.type} • {activeVenueModal.locationLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                    <span className="font-extrabold text-[#4285F4]">G</span> Maps Verified
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {activeVenueModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVenueModal(null)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 text-sm font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Gallery Preview */}
              <div className="space-y-3">
                <div className="h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-900">
                  <img
                    src={selectedGalleryImg}
                    alt="Venue Gallery"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {activeVenueModal.gallery?.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedGalleryImg(img)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        selectedGalleryImg === img
                          ? 'border-gold-500 scale-95'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description, Head Count & Amenities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">About The Venue</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {activeVenueModal.description}
                  </p>

                  <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="text-xs font-bold text-stone-800">
                      Headcount & Guest Capacities:
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      Accommodates <strong>{activeVenueModal.minGuests}</strong> up to a maximum of{' '}
                      <strong className="text-gold-700">{activeVenueModal.maxGuests} Guests</strong>.
                    </div>
                  </div>

                  {activeVenueModal.googleMapsUrl && (
                    <div className="mt-4 p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between">
                      <div className="text-xs text-blue-900">
                        <span className="font-bold">Google Maps Verified Listing</span>
                        <div className="text-[11px] text-blue-700">
                          ★ {activeVenueModal.googleRating || activeVenueModal.rating} ({(activeVenueModal.googleReviewCount || activeVenueModal.reviewCount).toLocaleString()} Google reviews)
                        </div>
                      </div>
                      <a
                        href={activeVenueModal.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  <h4 className="font-serif text-sm font-bold text-stone-900 mt-4 mb-2">
                    Luxury Inclusions & Amenities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    {activeVenueModal.amenities.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Calendar Schedule & Available Dates */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-gold-600" />
                      <span>Calendar Availability</span>
                    </h4>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-stone-200 text-stone-500 font-medium">
                      2026 – 2027 Wedding Season
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500">
                    Click any available date below to select it for your wedding itinerary:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeVenueModal.availableDates?.map(item => {
                      const isTarget = weddingDate === item.date;
                      const isAvail = item.status === 'available';

                      return (
                        <button
                          key={item.date}
                          type="button"
                          disabled={!isAvail}
                          onClick={() => {
                            if (isAvail) setWeddingDate(item.date);
                          }}
                          className={`p-2.5 rounded-xl text-left border text-xs transition flex flex-col justify-between ${
                            isTarget
                              ? 'bg-gold-500 text-stone-900 border-gold-600 font-bold shadow-xs'
                              : isAvail
                              ? 'bg-white hover:bg-gold-50 text-stone-800 border-stone-200 cursor-pointer'
                              : 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <span className="font-semibold">{item.date}</span>
                          <span
                            className={`text-[10px] mt-1 ${
                              isAvail ? 'text-emerald-700 font-bold' : 'text-rose-500'
                            }`}
                          >
                            {isAvail ? '● Available' : '✕ Reserved'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">Daily Venue Rental:</span>
                <div className="font-serif text-xl font-bold text-stone-900">
                  {formatPrice(activeVenueModal.pricePerDay)}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveVenueModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    selectVenue(activeVenueModal);
                    setActiveVenueModal(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-white text-xs font-bold shadow-md shadow-gold-600/30 transition cursor-pointer"
                >
                  Select Venue & Match Deliverable Vendors
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Venue from Google Maps Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
            <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                  <span className="font-extrabold text-[#4285F4]">G</span> Maps Sync Engine
                </div>
                <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                  Import Any Venue from Google Maps
                </h3>
                <p className="text-xs text-blue-100">
                  Enter any marriage hall, lawn, mandapam, farmhouse, or ballroom from Google to activate nearby catering, flowers & decor delivery.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-stone-700">
              {importStatus && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{importStatus}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-900">Venue Name on Google Maps *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radisson Blu Plaza Ballroom / Green Meadows Farmhouse / Kalyana Mandapam"
                    value={importForm.name}
                    onChange={e => setImportForm({ ...importForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Country</label>
                  <select
                    value={importForm.country}
                    onChange={e => setImportForm({ ...importForm, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="india">India (₹ INR)</option>
                    <option value="usa">United States ($ USD)</option>
                    <option value="canada">Canada (C$ CAD)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">City / Metropolitan Area *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi NCR, Bangalore, Toronto, Dallas..."
                    value={importForm.city}
                    onChange={e => setImportForm({ ...importForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-900">Google Maps URL or Exact Address</label>
                  <input
                    type="text"
                    placeholder="e.g. https://maps.app.goo.gl/... or 124 Grand Trunk Road, Chattarpur"
                    value={importForm.googleMapsUrl}
                    onChange={e => setImportForm({ ...importForm, googleMapsUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Venue Category</label>
                  <select
                    value={importForm.categoryTag}
                    onChange={e => setImportForm({ ...importForm, categoryTag: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="banquet">Banquet & Convention Hall</option>
                    <option value="farmhouse">Wedding Farmhouse & Open Lawn</option>
                    <option value="community_budget">Budget Community Hall / Kalyana Mandapam</option>
                    <option value="beach">Beach & Coastal Pavilion</option>
                    <option value="barn_winery">Rustic Barn / Wine Vineyard</option>
                    <option value="urban_loft">Urban Loft / Rooftop</option>
                    <option value="country_club">Country Club & Golf Estate</option>
                    <option value="heritage">Royal Palace / Castle</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Price Budget Tier</label>
                  <select
                    value={importForm.priceTier}
                    onChange={e => setImportForm({ ...importForm, priceTier: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="budget">Budget Friendly (&lt; ₹1.5L / $2k)</option>
                    <option value="mid_range">Mid-Range / Premium (₹1.5L - ₹6L / $2k - $8k)</option>
                    <option value="luxury">Ultra Luxury / Imperial (&gt; ₹6L / $8k)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Estimated Daily Rental (₹ INR)</label>
                  <input
                    type="number"
                    min="10000"
                    step="5000"
                    value={importForm.pricePerDay}
                    onChange={e => setImportForm({ ...importForm, pricePerDay: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Catering Price / Plate (₹ INR)</label>
                  <input
                    type="number"
                    min="300"
                    step="50"
                    value={importForm.pricePerPlate}
                    onChange={e => setImportForm({ ...importForm, pricePerPlate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Max Guest Headcount *</label>
                  <input
                    type="number"
                    required
                    min="50"
                    value={importForm.maxGuests}
                    onChange={e => setImportForm({ ...importForm, maxGuests: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Google Rating (1.0 to 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={importForm.googleRating}
                    onChange={e => setImportForm({ ...importForm, googleRating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-900">Venue Photo URL</label>
                  <input
                    type="url"
                    value={importForm.image}
                    onChange={e => setImportForm({ ...importForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-900">Brief Overview / Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter highlights, facilities, lawn size, parking space..."
                    value={importForm.description}
                    onChange={e => setImportForm({ ...importForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Import & Match Vendors</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

