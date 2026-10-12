import React, { useState, useEffect } from 'react';
import {
  Camera,
  MapPin,
  Star,
  Check,
  ChevronRight,
  Sparkles,
  Navigation,
  Film,
  Video,
  BookOpen,
  Share2
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { PhotographyService } from '../types/wedding';

export const PhotographyView: React.FC = () => {
  const {
    selectedCountry,
    selectedLocation,
    formatPrice,
    cart,
    selectPhotography,
    setActiveTab,
    deliverableVenue,
    filterOnlyDeliverable,
    setFilterOnlyDeliverable
  } = useWedding();

  const [studios, setStudios] = useState<PhotographyService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    api
      .getPhotography({
        country: selectedCountry,
        location: deliverableVenue ? undefined : selectedLocation,
        venueId: deliverableVenue?.id,
        onlyDeliverable: filterOnlyDeliverable
      })
      .then(data => {
        setStudios(data);
        setLoading(false);
      });
  }, [selectedCountry, selectedLocation, deliverableVenue, filterOnlyDeliverable]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-indigo-950 to-stone-950 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Camera className="w-3.5 h-3.5" />
            Fine Art Studios & 4K Cinema Storytellers • India, US & Canada
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Cinematography & Candid Photography
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Capturing timeless memories across your entire celebration. Every package includes licensed 4K drone cinematography,
            emotional documentary feature films, handcrafted Italian leather-bound albums, and same-day Instagram reels.
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
                {deliverableVenue.locationLabel} • Showing photography and film studios providing on-location shoot crews to this venue.
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
            <span>Select a venue in the <strong>Venues tab</strong> to calculate studio distance and travel logistics!</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('venues')}
            className="text-gold-700 font-bold hover:underline cursor-pointer"
          >
            Choose Venue &rarr;
          </button>
        </div>
      )}

      {/* Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Cinematography Studios ({studios.length})
          </h2>
          <p className="text-xs text-stone-500">
            Comprehensive multi-day wedding and pre-wedding coverage with dual-drone aerial licensing.
          </p>
        </div>

        {cart.photography && (
          <div className="flex items-center gap-2 p-2 bg-gold-50 border border-gold-200 rounded-2xl text-xs text-gold-900">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Selected: <strong>{cart.photography.name}</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('chauffeurs')}
              className="ml-2 font-bold text-gold-700 hover:text-gold-900 underline flex items-center cursor-pointer"
            >
              Next: Luxury Fleet <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* Studios Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-stone-200 animate-pulse" />
          ))}
        </div>
      ) : studios.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
          <p className="text-stone-600 text-sm">No photography studios found matching this deliverable distance.</p>
          <button
            type="button"
            onClick={() => setFilterOnlyDeliverable(false)}
            className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
          >
            Show All Regional Studios
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studios.map(studio => {
            const isSelected = cart.photography?.id === studio.id;

            return (
              <div
                key={studio.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-gold-500 ring-4 ring-gold-500/20 shadow-xl'
                    : 'border-stone-200 hover:border-gold-300 hover:shadow-xl'
                }`}
              >
                {/* Hero Image Section */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {studio.country?.toUpperCase() || 'INDIA'}
                      </span>
                      <span className="bg-indigo-900/90 text-indigo-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-400/30">
                        {studio.teamSize}
                      </span>
                    </div>

                    {/* Proximity / Distance Badge */}
                    {studio.distanceKm !== undefined && studio.distanceKm !== null ? (
                      <div
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 ${
                          studio.isDeliverable
                            ? 'bg-emerald-600/90 text-white'
                            : 'bg-rose-600/90 text-white'
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{studio.distanceKm} km away</span>
                        <span className="text-[9px] opacity-80">
                          {studio.isDeliverable ? '• Deliverable' : '• Exceeds range'}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-black/50 text-stone-200 text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
                        Travels up to {studio.deliverableRadiusKm || 75} km
                      </div>
                    )}
                  </div>

                  {/* Title & Location */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        <span>{studio.locationLabel}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md text-xs font-bold text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{studio.rating}</span>
                        <span className="text-stone-300 font-normal text-[10px]">({studio.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                      {studio.name}
                    </h3>
                  </div>
                </div>

                {/* Content & Deliverables */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <p className="text-xs text-stone-600 font-medium">
                      Style: <strong className="text-stone-900">{studio.style}</strong>
                    </p>

                    {/* Deliverables Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2">
                        <Film className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-stone-800 block">Film & Teaser</span>
                          <span className="text-stone-500 text-[11px] leading-tight block">
                            {studio.deliverables?.cinematicTeaser}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2">
                        <Video className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-stone-800 block">Drone & Aerial</span>
                          <span className="text-stone-500 text-[11px] leading-tight block">
                            {studio.deliverables?.droneFootage}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-stone-800 block">Albums</span>
                          <span className="text-stone-500 text-[11px] leading-tight block">
                            {studio.deliverables?.albums}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2">
                        <Share2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-stone-800 block">Social Reels</span>
                          <span className="text-stone-500 text-[11px] leading-tight block">
                            {studio.deliverables?.socialMediaReels}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Selection */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                        Complete Coverage Package
                      </div>
                      <div className="font-serif text-2xl font-bold text-stone-900">
                        {formatPrice(studio.price)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          selectPhotography(null);
                        } else {
                          selectPhotography(studio);
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
                          <span>Studio Selected</span>
                        </>
                      ) : (
                        <span>Book This Studio</span>
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
