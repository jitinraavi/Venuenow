import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  ShoppingBag,
  Smartphone,
  Monitor,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import type { ActiveTab } from '../context/WeddingContext';
import { api } from '../services/api';
import type { LocationOption, CountryOption } from '../types/wedding';

export const Navbar: React.FC = () => {
  const {
    selectedCountry,
    setSelectedCountry,
    selectedLocation,
    setSelectedLocation,
    weddingDate,
    setWeddingDate,
    guestCount,
    setGuestCount,
    currency,
    cycleCurrency,
    cartItemCount,
    activeTab,
    setActiveTab,
    isMobileAppView,
    setIsMobileAppView,
    setIsCartDrawerOpen,
    formatPrice,
    estimate
  } = useWedding();

  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  useEffect(() => {
    api.getCountries().then(setCountries);
  }, []);

  useEffect(() => {
    api.getLocations({ country: selectedCountry }).then(setLocations);
  }, [selectedCountry]);

  const navTabs: { id: ActiveTab; label: string; icon: string; count?: number; badge?: string }[] = [
    { id: 'venues', label: 'Venues', icon: '🏰' },
    { id: 'catering', label: 'Catering', icon: '🍽️' },
    { id: 'decor', label: 'Decor & Flowers', icon: '🌸' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'chauffeurs', label: 'Luxury Fleet', icon: '🚘' },
    { id: 'honeymoon', label: 'Honeymoon (Skyscanner)', icon: '✈️' },
    { id: 'planner', label: 'Planner & Budget', icon: '💎' },
    { id: 'vendor-portal', label: 'Vendor Portal', icon: '🤝', badge: 'Enroll' }
  ];

  const currentLocationName =
    locations.find(l => l.id.toLowerCase() === selectedLocation.toLowerCase())?.name || 'All Locations';

  const currentCountryName =
    countries.find(c => c.id.toLowerCase() === selectedCountry.toLowerCase())?.name || 'All Countries';

  const countryFlags: Record<string, string> = {
    all: '🌍',
    india: '🇮🇳',
    usa: '🇺🇸',
    canada: '🇨🇦'
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Brand & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => setActiveTab('venues')}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-500 to-rosewine-500 flex items-center justify-center text-white shadow-md shadow-gold-500/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                  Venue<span className="text-gold-600">Now</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full border border-gold-300">
                  India • USA • Canada
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                The Complete Wedding Ecosystem & Deliverable Distance Matcher
              </p>
            </div>
          </div>

          {/* Quick Filters: Country, Location, Date & Guests */}
          <div className="hidden md:flex items-center gap-2 bg-stone-100/80 p-1.5 rounded-full border border-stone-200 text-xs">
            {/* Country Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowCountryDropdown(prev => !prev);
                  setShowLocationDropdown(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-stone-800 font-semibold hover:bg-gold-50 transition shadow-xs cursor-pointer"
              >
                <span>{countryFlags[selectedCountry] || '🌍'}</span>
                <span className="max-w-[100px] truncate">{currentCountryName}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {showCountryDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Focus Market
                  </div>
                  {countries.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(c.id);
                        setSelectedLocation('all');
                        setShowCountryDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-gold-50 transition cursor-pointer ${
                        selectedCountry === c.id ? 'bg-gold-50/80 font-bold text-gold-900' : 'text-stone-700'
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLocationDropdown(prev => !prev);
                  setShowCountryDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white text-stone-800 font-medium hover:bg-gold-50 transition shadow-xs cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span className="max-w-[120px] truncate">{currentLocationName}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Wedding Destination
                  </div>
                  {locations.map(loc => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc.id);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gold-50 transition cursor-pointer ${
                        selectedLocation === loc.id ? 'bg-gold-50/80 font-bold text-gold-900' : 'text-stone-700'
                      }`}
                    >
                      <span>{loc.name}</span>
                      {loc.badge && (
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          {loc.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wedding Date Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-gold-600" />
              <input
                type="date"
                value={weddingDate}
                onChange={e => setWeddingDate(e.target.value)}
                className="bg-transparent border-none text-stone-700 font-medium focus:outline-none cursor-pointer text-xs"
              />
            </div>

            {/* Guest Count Slider */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-xs">
              <Users className="w-3.5 h-3.5 text-gold-600" />
              <span className="text-stone-600 font-medium">{guestCount} Guests</span>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
                className="w-16 accent-gold-600 cursor-pointer"
                title={`${guestCount} guests`}
              />
            </div>
          </div>

          {/* Right Actions: Currency (INR/USD/CAD), App View Toggle, Cart */}
          <div className="flex items-center gap-2.5">
            {/* Multi-Currency Switcher (INR, USD, CAD) */}
            <button
              type="button"
              onClick={cycleCurrency}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-stone-200 bg-stone-50 hover:bg-gold-50 text-stone-800 transition flex items-center gap-1 cursor-pointer shadow-2xs"
              title="Click to toggle currency (INR / USD / CAD)"
            >
              <span className="font-mono">
                {currency === 'INR' ? '₹ INR' : currency === 'USD' ? '$ USD' : 'C$ CAD'}
              </span>
            </button>

            {/* Mobile App vs Web View Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileAppView(prev => !prev)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition border cursor-pointer ${
                isMobileAppView
                  ? 'bg-rosewine-500 text-white border-rosewine-600 shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
              title="Switch between Mobile App Simulator and Web Platform"
            >
              {isMobileAppView ? (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>App Mode</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Web Mode</span>
                </>
              )}
            </button>

            {/* Wedding Cart / Planner Trigger */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white shadow-md shadow-gold-700/20 transition transform active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="text-left hidden lg:block">
                <div className="text-[10px] uppercase tracking-wider font-semibold text-gold-200 leading-tight">
                  Wedding Cart
                </div>
                <div className="text-xs font-bold leading-tight">
                  {estimate ? formatPrice(estimate.summary.grandTotal) : '₹0'}
                </div>
              </div>
              {cartItemCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rosewine-500 text-white text-[11px] font-bold border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar border-t border-stone-100">
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm shadow-stone-900/30'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-600 text-white font-bold uppercase tracking-wider">
                    {tab.badge}
                  </span>
                )}
                {tab.id === 'planner' && cartItemCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-gold-400 text-stone-900 font-extrabold">
                    {cartItemCount}/6
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
