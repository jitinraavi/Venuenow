import React, { useState, useEffect } from 'react';
import {
  Palette,
  MapPin,
  Star,
  Users,
  Check,
  ChevronRight,
  Sparkles,
  Navigation
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { DecorService, DecorPackage } from '../types/wedding';

export const DecorView: React.FC = () => {
  const {
    selectedCountry,
    selectedLocation,
    formatPrice,
    cart,
    selectDecor,
    setActiveTab,
    deliverableVenue,
    filterOnlyDeliverable,
    setFilterOnlyDeliverable
  } = useWedding();

  const [decorList, setDecorList] = useState<DecorService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPackages, setSelectedPackages] = useState<{ [decorId: string]: DecorPackage }>({});

  useEffect(() => {
    setLoading(true);
    api
      .getDecor({
        country: selectedCountry,
        location: deliverableVenue ? undefined : selectedLocation,
        venueId: deliverableVenue?.id,
        onlyDeliverable: filterOnlyDeliverable
      })
      .then(data => {
        setDecorList(data);
        const map: { [decorId: string]: DecorPackage } = {};
        data.forEach(d => {
          if (d.packages && d.packages.length > 0) {
            map[d.id] = d.packages[0];
          }
        });
        setSelectedPackages(map);
        setLoading(false);
      });
  }, [selectedCountry, selectedLocation, deliverableVenue, filterOnlyDeliverable]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-rosewine-900 to-amber-950 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Palette className="w-3.5 h-3.5" />
            Bespoke Mandaps, Florals & Cinematic Scenography • India, US & Canada
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Exquisite Wedding Decor & Floral Architecture
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From imperial crystal mandaps and fairytale botanical tunnels to minimalist European chic chateau arches.
            Every decorator delivers and styles directly at your chosen venue.
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
                {deliverableVenue.locationLabel} • Showing floral designers and decorators with active logistics delivery to this venue.
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
            <span>Select a venue in the <strong>Venues tab</strong> to calculate exact decorator logistics distance!</span>
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

      {/* Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Decor & Floral Designers ({decorList.length})
          </h2>
          <p className="text-xs text-stone-500">
            All setups include complete fabrication, live fresh flower arches, ambient lighting, and strike-down.
          </p>
        </div>

        {cart.decor && (
          <div className="flex items-center gap-2 p-2 bg-gold-50 border border-gold-200 rounded-2xl text-xs text-gold-900">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Selected: <strong>{cart.decor.name}</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('photography')}
              className="ml-2 font-bold text-gold-700 hover:text-gold-900 underline flex items-center cursor-pointer"
            >
              Next: Photography <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* Decor Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-stone-200 animate-pulse" />
          ))}
        </div>
      ) : decorList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
          <p className="text-stone-600 text-sm">No decorators found matching this deliverable distance.</p>
          <button
            type="button"
            onClick={() => setFilterOnlyDeliverable(false)}
            className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
          >
            Show All Regional Decorators
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {decorList.map(decor => {
            const isSelected = cart.decor?.id === decor.id;
            const currentPkg = selectedPackages[decor.id] || decor.packages?.[0];
            const packagePrice = currentPkg ? currentPkg.price : decor.priceStarting;

            return (
              <div
                key={decor.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-gold-500 ring-4 ring-gold-500/20 shadow-xl'
                    : 'border-stone-200 hover:border-gold-300 hover:shadow-xl'
                }`}
              >
                {/* Hero Image Section */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img
                    src={decor.image}
                    alt={decor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {decor.country?.toUpperCase() || 'INDIA'}
                      </span>
                      <span className="bg-gold-500 text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {decor.theme}
                      </span>
                    </div>

                    {/* Proximity / Distance Badge */}
                    {decor.distanceKm !== undefined && decor.distanceKm !== null ? (
                      <div
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 ${
                          decor.isDeliverable
                            ? 'bg-emerald-600/90 text-white'
                            : 'bg-rose-600/90 text-white'
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{decor.distanceKm} km away</span>
                        <span className="text-[9px] opacity-80">
                          {decor.isDeliverable ? '• Deliverable' : '• Exceeds range'}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-black/50 text-stone-200 text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
                        Delivers up to {decor.deliverableRadiusKm || 50} km
                      </div>
                    )}
                  </div>

                  {/* Title & Location */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        <span>{decor.locationLabel}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md text-xs font-bold text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{decor.rating}</span>
                        <span className="text-stone-300 font-normal text-[10px]">({decor.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                      {decor.name}
                    </h3>
                  </div>
                </div>

                {/* Content & Packages */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Guest Capacity Coverage */}
                    <div className="flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-xs">
                      <div className="flex items-center gap-2 text-stone-800 font-semibold">
                        <Users className="w-4 h-4 text-gold-600" />
                        <span>Venue Guest Coverage:</span>
                      </div>
                      <div className="font-bold text-stone-900">
                        {decor.capacityCoverage}
                      </div>
                    </div>

                    {/* Offerings Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="font-bold text-stone-800 block mb-0.5">Mandap / Canopy</span>
                        <span className="text-stone-500 text-[11px] leading-tight block">
                          {decor.offerings?.mandap}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="font-bold text-stone-800 block mb-0.5">Lighting / FX</span>
                        <span className="text-stone-500 text-[11px] leading-tight block">
                          {decor.offerings?.lighting}
                        </span>
                      </div>
                    </div>

                    {/* Tier Selection */}
                    {decor.packages && decor.packages.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                          Choose Decor Tier & Scale:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {decor.packages.map(pkg => (
                            <button
                              key={pkg.name}
                              type="button"
                              onClick={() => {
                                setSelectedPackages(prev => ({
                                  ...prev,
                                  [decor.id]: pkg
                                }));
                                if (isSelected) {
                                  selectDecor(decor, pkg);
                                }
                              }}
                              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                                currentPkg?.name === pkg.name
                                  ? 'bg-gold-50/70 border-gold-500 ring-2 ring-gold-500/30'
                                  : 'bg-white hover:bg-stone-50 border-stone-200'
                              }`}
                            >
                              <div className="font-bold text-xs text-stone-900">{pkg.name}</div>
                              <div className="text-[11px] text-stone-500 mt-1">{pkg.guestsFedOrCovered}</div>
                              <div className="font-serif text-sm font-bold text-gold-800 mt-2">
                                {formatPrice(pkg.price)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing & Selection */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                        Package Total
                      </div>
                      <div className="font-serif text-2xl font-bold text-stone-900">
                        {formatPrice(packagePrice)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          selectDecor(null);
                        } else {
                          selectDecor(decor, currentPkg);
                        }
                      }}
                      className={`py-3 px-6 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-stone-900 hover:bg-gold-700 text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Decor Selected</span>
                        </>
                      ) : (
                        <span>Book This Decor</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
