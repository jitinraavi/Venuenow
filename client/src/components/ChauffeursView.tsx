import React, { useState, useEffect } from 'react';
import {
  Car,
  MapPin,
  Star,
  Users,
  Check,
  ChevronRight,
  Clock,
  Sparkles,
  Navigation
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { ChauffeurService } from '../types/wedding';

export const ChauffeursView: React.FC = () => {
  const {
    selectedCountry,
    selectedLocation,
    formatPrice,
    cart,
    selectChauffeur,
    setActiveTab,
    deliverableVenue,
    filterOnlyDeliverable,
    setFilterOnlyDeliverable
  } = useWedding();

  const [fleet, setFleet] = useState<ChauffeurService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRentalDays, setSelectedRentalDays] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    setLoading(true);
    api
      .getChauffeurs({
        country: selectedCountry,
        location: deliverableVenue ? undefined : selectedLocation,
        venueId: deliverableVenue?.id,
        onlyDeliverable: filterOnlyDeliverable
      })
      .then(data => {
        setFleet(data);
        const daysMap: { [id: string]: number } = {};
        data.forEach(item => {
          daysMap[item.id] = 1;
        });
        setSelectedRentalDays(daysMap);
        setLoading(false);
      });
  }, [selectedCountry, selectedLocation, deliverableVenue, filterOnlyDeliverable]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Car className="w-3.5 h-3.5" />
            Royal Chauffeurs & Luxury Wedding Fleets • India, US & Canada
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Bespoke Bridal Fleet & Baraat Transit
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Make an unforgettable royal grand entry in an authentic 1938 Vintage Rolls Royce Phantom,
            a modern Mercedes-Maybach, or luxury coaches for guest transit.
            Every vehicle includes professional chauffeurs, thematic floral decor, and red carpet deployment.
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
                  Deliverable Fleet Matching to:
                </span>
                <span className="font-serif font-bold text-gold-900 text-sm">
                  {deliverableVenue.name}
                </span>
              </div>
              <p className="text-[11px] text-stone-600">
                {deliverableVenue.locationLabel} • Showing luxury fleets stationed within dispatch and deliverable driving range to this venue.
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
            <span>Select a venue in the <strong>Venues tab</strong> to calculate chauffeur dispatch distance!</span>
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
            Available Luxury Fleets ({fleet.length})
          </h2>
          <p className="text-xs text-stone-500">
            Includes professional uniformed chauffeur, floral ribbon garnishing, red carpet, and fuel allowance.
          </p>
        </div>

        {cart.chauffeur && (
          <div className="flex items-center gap-2 p-2 bg-gold-50 border border-gold-200 rounded-2xl text-xs text-gold-900">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Selected: <strong>{cart.chauffeur.name}</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('honeymoon')}
              className="ml-2 font-bold text-gold-700 hover:text-gold-900 underline flex items-center cursor-pointer"
            >
              Next: Honeymoon Comparator <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* Fleet Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-stone-200 animate-pulse" />
          ))}
        </div>
      ) : fleet.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
          <p className="text-stone-600 text-sm">No chauffeur fleets found within this deliverable distance.</p>
          <button
            type="button"
            onClick={() => setFilterOnlyDeliverable(false)}
            className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
          >
            Show All Regional Fleets
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fleet.map(vehicle => {
            const isSelected = cart.chauffeur?.id === vehicle.id;
            const days = selectedRentalDays[vehicle.id] || 1;
            const totalCost = vehicle.pricePerDay * days;

            return (
              <div
                key={vehicle.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-gold-500 ring-4 ring-gold-500/20 shadow-xl'
                    : 'border-stone-200 hover:border-gold-300 hover:shadow-xl'
                }`}
              >
                {/* Hero Image Section */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {vehicle.country?.toUpperCase() || 'INDIA'}
                      </span>
                      <span className="bg-gold-500 text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {vehicle.vehicleType}
                      </span>
                    </div>

                    {/* Proximity / Distance Badge */}
                    {vehicle.distanceKm !== undefined && vehicle.distanceKm !== null ? (
                      <div
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 ${
                          vehicle.isDeliverable
                            ? 'bg-emerald-600/90 text-white'
                            : 'bg-rose-600/90 text-white'
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{vehicle.distanceKm} km away</span>
                        <span className="text-[9px] opacity-80">
                          {vehicle.isDeliverable ? '• Deliverable' : '• Exceeds range'}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-black/50 text-stone-200 text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
                        Stationed within {vehicle.deliverableRadiusKm || 60} km
                      </div>
                    )}
                  </div>

                  {/* Title & Location */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        <span>{vehicle.locationLabel}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md text-xs font-bold text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{vehicle.rating}</span>
                        <span className="text-stone-300 font-normal text-[10px]">({vehicle.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                      {vehicle.name}
                    </h3>
                  </div>
                </div>

                {/* Content & Inclusions */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-100 text-xs">
                      <div className="flex items-center gap-2 text-stone-800 font-semibold">
                        <Users className="w-4 h-4 text-gold-600" />
                        <span>Passenger Capacity:</span>
                      </div>
                      <div className="font-bold text-stone-900">
                        {vehicle.passengerCapacity}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        Luxury Inclusions
                      </div>
                      <ul className="space-y-1.5 text-xs text-stone-600">
                        {vehicle.features?.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Rental Days Selector */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        Rental Duration:
                      </span>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3].map(d => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setSelectedRentalDays(prev => ({
                                ...prev,
                                [vehicle.id]: d
                              }));
                              if (isSelected) {
                                selectChauffeur(vehicle, d);
                              }
                            }}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                              days === d
                                ? 'bg-gold-500 text-stone-900 shadow-xs'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            {d}d
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Selection */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                        Total for {days} {days === 1 ? 'Day' : 'Days'}
                      </div>
                      <div className="font-serif text-2xl font-bold text-stone-900">
                        {formatPrice(totalCost)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          selectChauffeur(null);
                        } else {
                          selectChauffeur(vehicle, days);
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
                          <span>Vehicle Selected</span>
                        </>
                      ) : (
                        <span>Book This Fleet</span>
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
