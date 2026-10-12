import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  MapPin,
  Star,
  Users,
  Check,
  ChevronRight,
  Sparkles,
  Flame,
  Navigation
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { CateringService } from '../types/wedding';

export const CateringView: React.FC = () => {
  const {
    selectedCountry,
    selectedLocation,
    guestCount,
    weddingDays,
    formatPrice,
    cart,
    selectCatering,
    setActiveTab,
    deliverableVenue,
    filterOnlyDeliverable,
    setFilterOnlyDeliverable
  } = useWedding();

  const [cateringList, setCateringList] = useState<CateringService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeMenuModal, setActiveMenuModal] = useState<CateringService | null>(null);
  const [activeMenuCategory, setActiveMenuCategory] = useState<
    'welcomeDrinks' | 'appetizers' | 'liveCounters' | 'mains' | 'desserts'
  >('appetizers');

  useEffect(() => {
    setLoading(true);
    api
      .getCatering({
        country: selectedCountry,
        location: deliverableVenue ? undefined : selectedLocation,
        venueId: deliverableVenue?.id,
        onlyDeliverable: filterOnlyDeliverable
      })
      .then(data => {
        setCateringList(data);
        setLoading(false);
      });
  }, [selectedCountry, selectedLocation, deliverableVenue, filterOnlyDeliverable]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-rose-950 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Bespoke Royal & Global Wedding Catering • India, US & Canada
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Grand Menus, Haute Gastronomy & Deliverable Distance
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every caterer shows their complete itemized menu, total guest feed capacity, and exact deliverable distance to your chosen venue.
            Filtered automatically for your <strong>{guestCount} guests</strong> across <strong>{weddingDays} wedding days</strong>.
          </p>
        </div>
      </div>

      {/* Proximity / Deliverable Venue Match Banner */}
      {deliverableVenue ? (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-gold-300 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gold-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-stone-900">
                  Deliverable Radius Matching to:
                </span>
                <span className="font-serif font-bold text-gold-900 text-sm">
                  {deliverableVenue.name}
                </span>
              </div>
              <p className="text-[11px] text-stone-600">
                {deliverableVenue.locationLabel} • Showing caterers that deliver fresh hot gourmet banquets directly to this venue.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs">
              <input
                type="checkbox"
                checked={filterOnlyDeliverable}
                onChange={e => setFilterOnlyDeliverable(e.target.checked)}
                className="w-4 h-4 accent-gold-600 rounded cursor-pointer"
              />
              <span>Only Within Deliverable Range</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Select a venue first in the <strong>Venues tab</strong> to enable live distance calculations to that venue!</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('venues')}
            className="text-gold-700 font-bold hover:underline"
          >
            Choose Venue &rarr;
          </button>
        </div>
      )}

      {/* Catering Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Available Caterers ({cateringList.length})
          </h2>
          <p className="text-xs text-stone-500">
            Catering totals calculated for <strong>{guestCount} guests</strong> across <strong>{weddingDays} wedding days</strong>.
          </p>
        </div>

        {cart.catering && (
          <div className="flex items-center gap-2 p-2 bg-gold-50 border border-gold-200 rounded-2xl text-xs text-gold-900">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Selected: <strong>{cart.catering.name}</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('decor')}
              className="ml-2 font-bold text-gold-700 hover:text-gold-900 underline flex items-center cursor-pointer"
            >
              Next: Decor <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* Catering Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-stone-200 animate-pulse" />
          ))}
        </div>
      ) : cateringList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
          <p className="text-stone-600 text-sm">No caterers found matching this deliverable distance.</p>
          <button
            type="button"
            onClick={() => setFilterOnlyDeliverable(false)}
            className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
          >
            Show All Regional Caterers (Disable Radius Lock)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cateringList.map(catering => {
            const isSelected = cart.catering?.id === catering.id;
            const totalCateringCost = catering.pricePerPlate * guestCount * weddingDays;

            return (
              <div
                key={catering.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-gold-500 ring-4 ring-gold-500/20 shadow-xl'
                    : 'border-stone-200 hover:border-gold-300 hover:shadow-xl'
                }`}
              >
                {/* Hero Image Section */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img
                    src={catering.image}
                    alt={catering.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {catering.country?.toUpperCase() || 'INDIA'}
                      </span>
                      {catering.dietaryOptions?.slice(0, 2).map((opt, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>

                    {/* Proximity / Distance Badge */}
                    {catering.distanceKm !== undefined && catering.distanceKm !== null ? (
                      <div
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 ${
                          catering.isDeliverable
                            ? 'bg-emerald-600/90 text-white'
                            : 'bg-rose-600/90 text-white'
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{catering.distanceKm} km away</span>
                        <span className="text-[9px] opacity-80">
                          {catering.isDeliverable ? '• Deliverable' : '• Exceeds range'}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-black/50 text-stone-200 text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
                        Delivers up to {catering.deliverableRadiusKm || 50} km
                      </div>
                    )}
                  </div>

                  {/* Title & Location */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        <span>{catering.locationLabel}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md text-xs font-bold text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{catering.rating}</span>
                        <span className="text-stone-300 font-normal text-[10px]">({catering.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                      {catering.name}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Guest Capacity Info: Feeds X guests */}
                    <div className="flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-xs">
                      <div className="flex items-center gap-2 text-stone-800 font-semibold">
                        <Users className="w-4 h-4 text-gold-600" />
                        <span>Feeds Capacity:</span>
                      </div>
                      <div className="font-bold text-stone-900">
                        {catering.minGuests} – {catering.maxGuests} Guests
                      </div>
                    </div>

                    {/* Cuisines */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        Specialty Cuisines
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {catering.cuisines?.map((c, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sample Menu Highlights */}
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-gold-600" />
                          <span>Curated Menu Preview</span>
                        </div>
                        <span className="text-[10px] text-stone-400">5 Distinct Courses</span>
                      </div>

                      <div className="text-xs text-stone-600 space-y-1">
                        <div>
                          <strong className="text-stone-800">Appetizers:</strong>{' '}
                          {catering.menu?.appetizers?.map(a => a.name).join(', ') || 'Chef Signature Canapés'}
                        </div>
                        <div>
                          <strong className="text-stone-800">Grand Mains:</strong>{' '}
                          {catering.menu?.mains?.map(m => m.name).join(', ') || 'Royal Gourmet Selection'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown & Buttons */}
                  <div className="pt-4 border-t border-stone-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                          Per Plate Rate
                        </div>
                        <div className="font-serif text-xl font-bold text-stone-900">
                          {formatPrice(catering.pricePerPlate)}{' '}
                          <span className="text-xs font-normal text-stone-500">/ guest</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                          Total for {guestCount} Guests ({weddingDays}d)
                        </div>
                        <div className="font-serif text-lg font-bold text-gold-800">
                          {formatPrice(totalCateringCost)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuModal(catering);
                          setActiveMenuCategory('appetizers');
                        }}
                        className="py-3 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <UtensilsCrossed className="w-3.5 h-3.5 text-gold-600" />
                        <span>View Entire Menu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            selectCatering(null);
                          } else {
                            selectCatering(catering);
                          }
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-stone-900 hover:bg-gold-700 text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Catering Selected</span>
                          </>
                        ) : (
                          <span>Book This Caterer</span>
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

      {/* Complete Itemized Menu Modal */}
      {activeMenuModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                  Haute Gastronomy Menu • Feeds {activeMenuModal.minGuests} – {activeMenuModal.maxGuests} Guests
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {activeMenuModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveMenuModal(null)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 text-sm font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Menu Category Switcher */}
            <div className="px-6 pt-4 pb-2 flex gap-2 border-b border-stone-100 overflow-x-auto">
              {(['welcomeDrinks', 'appetizers', 'liveCounters', 'mains', 'desserts'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveMenuCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                    activeMenuCategory === cat
                      ? 'bg-gold-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat.replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>

            {/* Items List */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(!activeMenuModal.menu?.[activeMenuCategory] || activeMenuModal.menu[activeMenuCategory].length === 0) ? (
                  <div className="col-span-full py-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200/60 p-4">
                    Bespoke gourmet selections for this course are customized directly with the executive culinary brigade.
                  </div>
                ) : (
                  activeMenuModal.menu[activeMenuCategory].map((item, idx) => (
                    <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                        <span>{item.name}</span>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed pl-3">
                        {item.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">Price Per Plate:</span>
                <div className="font-serif text-xl font-bold text-stone-900">
                  {formatPrice(activeMenuModal.pricePerPlate)}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMenuModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    selectCatering(activeMenuModal);
                    setActiveMenuModal(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-white text-xs font-bold shadow-md shadow-gold-600/30 transition cursor-pointer"
                >
                  Select This Catering Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
