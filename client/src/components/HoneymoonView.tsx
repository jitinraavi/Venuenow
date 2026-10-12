import React, { useState, useEffect } from 'react';
import {
  PlaneTakeoff,
  Star,
  Check,
  ChevronRight,
  ExternalLink,
  Sparkles,
  TrendingDown,
  Compass,
  ArrowUpDown,
  Building
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { HoneymoonDestination } from '../types/wedding';

export const HoneymoonView: React.FC = () => {
  const {
    formatPrice,
    cart,
    selectHoneymoon,
    setActiveTab
  } = useWedding();

  const [destinations, setDestinations] = useState<HoneymoonDestination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVibe, setSelectedVibe] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'cheapest' | 'savings' | 'rating'>('cheapest');
  const [expandedDestId, setExpandedDestId] = useState<string | null>('hm-maldives');

  useEffect(() => {
    setLoading(true);
    api.getHoneymoon({
      vibe: selectedVibe,
      sortBy: sortBy
    }).then(data => {
      setDestinations(data);
      setLoading(false);
    });
  }, [selectedVibe, sortBy]);

  const vibes = [
    { id: 'all', label: 'All Destinations' },
    { id: 'tropical', label: '🏖️ Tropical Beach & Overwater' },
    { id: 'alpine', label: '🏔️ Alpine Snow & Mountain Chalet' },
    { id: 'coastal', label: '🏛️ European Cliffs & Caldera' },
    { id: 'sanctuary', label: '🌴 Ubud Rainforest Villa' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner with Skyscanner Reference */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <PlaneTakeoff className="w-3.5 h-3.5" />
            Powered by Skyscanner Metasearch Architecture
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Compare & Book The Perfect Honeymoon
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            We scan and benchmark every leading airline and booking agency—including <strong>Skyscanner, Booking.com, Agoda, Expedia, MakeMyTrip, and LuxuryEscapes</strong>—so you can automatically lock in the absolute lowest rate and most romantic VIP couples inclusions.
          </p>

          {/* Value Prop Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              Guaranteed Lowest Price Only
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-semibold border border-white/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Couples Spa & Floating Breakfast Included
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
        {/* Vibe Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {vibes.map(v => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVibe(v.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedVibe === v.id
                  ? 'bg-sky-900 text-white shadow-xs font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-stone-400" />
          <span className="text-xs text-stone-500 font-medium">Sort Comparator:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="text-xs font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="cheapest">Cheapest Rate First</option>
            <option value="savings">Highest Savings %</option>
            <option value="rating">Top Guest Rating</option>
          </select>
        </div>
      </div>

      {/* Cart Summary Bar if Honeymoon Selected */}
      {cart.honeymoon && (
        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Honeymoon Locked: <strong>{cart.honeymoon.title}</strong> via <strong>{cart.honeymoonProvider?.name}</strong> ({formatPrice(cart.honeymoonProvider?.priceINR || 0)})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('planner')}
            className="font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center"
          >
            Review Complete Wedding Budget <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      )}

      {/* Destinations & Live Provider Comparator Matrix */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2].map(i => (
            <div key={i} className="h-80 rounded-3xl bg-stone-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {destinations.map(dest => {
            const isDestinationSelected = cart.honeymoon?.id === dest.id;
            const cheapestProvider = dest.providers.reduce((min, p) => p.priceINR < min.priceINR ? p : min, dest.providers[0]);
            const isExpanded = expandedDestId === dest.id;

            return (
              <div
                key={dest.id}
                className={`rounded-3xl overflow-hidden bg-white border transition-all duration-300 shadow-sm hover:shadow-md ${
                  isDestinationSelected
                    ? 'border-sky-500 ring-2 ring-sky-400/40'
                    : 'border-stone-200'
                }`}
              >
                {/* Destination Banner Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 bg-stone-50/70 border-b border-stone-200">
                  <div className="lg:col-span-4 h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 text-stone-900 shadow-xs">
                      {dest.vibe}
                    </span>
                    <div className="absolute bottom-3 left-3 text-white text-xs font-semibold drop-shadow-md">
                      📍 {dest.destination}
                    </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5" />
                          {dest.nights} Nights & 6 Days Romantic Escape
                        </span>
                        <span className="text-xs bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200 font-semibold">
                          Best Season: {dest.bestMonth}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                        {dest.title}
                      </h3>

                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Romantic Inclusions Pill List */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {dest.romanticPerks.map((perk, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs shadow-xs font-medium"
                          >
                            <Sparkles className="w-3 h-3 text-gold-600 shrink-0" />
                            <span>{perk}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Lowest Price Banner & Accordion Toggle */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                      <div>
                        <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                          Best Rate Found:
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl font-bold text-emerald-700">
                            {formatPrice(cheapestProvider.priceINR)}
                          </span>
                          <span className="text-xs text-stone-400 line-through">
                            {formatPrice(cheapestProvider.originalPriceINR)}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            Save {cheapestProvider.savingsPercent}%
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedDestId(isExpanded ? null : dest.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 transition flex items-center gap-1.5 shadow-xs"
                      >
                        <span>{isExpanded ? 'Hide Comparator' : `Compare ${dest.providers.length} Booking Sites`}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Skyscanner-Style Provider Comparison Matrix */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 space-y-4 bg-white animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider pb-2 border-b border-stone-100">
                      <span>Provider & Airline Flight</span>
                      <span className="hidden md:inline">Resort Room & Romantic Inclusions</span>
                      <span>Total Price & Selection</span>
                    </div>

                    <div className="space-y-3">
                      {dest.providers.map(provider => {
                        const isCheapest = provider.providerId === cheapestProvider.providerId;
                        const isSelectedProvider =
                          cart.honeymoon?.id === dest.id && cart.honeymoonProvider?.providerId === provider.providerId;

                        return (
                          <div
                            key={provider.providerId}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                              isSelectedProvider
                                ? 'bg-sky-50/60 border-sky-500 shadow-sm'
                                : isCheapest
                                ? 'bg-emerald-50/30 border-emerald-300 hover:border-emerald-400'
                                : 'bg-white border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            {/* Provider Info & Flight */}
                            <div className="md:w-1/3 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-stone-900">{provider.name}</span>
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${
                                    isCheapest
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-stone-100 text-stone-700'
                                  }`}
                                >
                                  {provider.badge}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                                <PlaneTakeoff className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                                <span>{provider.flightAirline}</span>
                              </div>

                              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span>{provider.rating} Trust Score</span>
                              </div>
                            </div>

                            {/* Room & Perks */}
                            <div className="md:w-1/3 space-y-1.5 text-xs text-stone-600">
                              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                                <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <span>{provider.roomCategory}</span>
                              </div>
                              <div className="space-y-1">
                                {provider.includedPerks.map((p, idx) => (
                                  <div key={idx} className="flex items-center gap-1 text-[11px] text-stone-600">
                                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span>{p}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Price & Booking CTA */}
                            <div className="md:w-1/3 flex flex-col md:items-end justify-center space-y-2 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                              <div className="text-left md:text-right">
                                <div className="text-[10px] text-stone-500 font-semibold uppercase">
                                  Price for Couple (Flights + Stay)
                                </div>
                                <div className="font-serif text-2xl font-bold text-stone-900">
                                  {formatPrice(provider.priceINR)}
                                </div>
                                {provider.savingsPercent > 0 && (
                                  <div className="text-[11px] text-emerald-700 font-semibold">
                                    Save {provider.savingsPercent}% vs standard retail
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 w-full md:w-auto">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isSelectedProvider) {
                                      selectHoneymoon(null);
                                    } else {
                                      selectHoneymoon(dest, provider);
                                    }
                                  }}
                                  className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 ${
                                    isSelectedProvider
                                      ? 'bg-emerald-600 text-white'
                                      : isCheapest
                                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                                  }`}
                                >
                                  {isSelectedProvider ? (
                                    <>
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Selected</span>
                                    </>
                                  ) : isCheapest ? (
                                    <span>Choose Cheapest Deal</span>
                                  ) : (
                                    <span>Select Offer</span>
                                  )}
                                </button>

                                <a
                                  href={provider.directBookingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
                                  title="View on direct website"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
