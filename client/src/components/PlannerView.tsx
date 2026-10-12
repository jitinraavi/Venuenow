import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  Calendar,
  Users,
  Sparkles,
  Printer,
  Trash2,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { BookingSubmission } from '../types/wedding';

export const PlannerView: React.FC = () => {
  const {
    cart,
    removeItem,
    clearCart,
    guestCount,
    setGuestCount,
    weddingDays,
    setWeddingDays,
    weddingDate,
    selectedLocation,
    formatPrice,
    estimate,
    setActiveTab,
    cartItemCount
  } = useWedding();

  const [coupleNames, setCoupleNames] = useState<string>('Priya & Rohan');
  const [email, setEmail] = useState<string>('priya.rohan@weddingmail.com');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [notes, setNotes] = useState<string>('Traditional royal safa entry preferred for baraat. Jain menu for 50 guests.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: BookingSubmission = {
      coupleNames,
      email,
      phone,
      weddingDate,
      location: selectedLocation,
      guestCount,
      notes,
      selectedItems: {
        venue: cart.venue?.name,
        catering: cart.catering?.name,
        decor: cart.decor ? `${cart.decor.name} (${cart.decorPackage?.name || 'Standard'})` : undefined,
        photography: cart.photography?.name,
        chauffeur: cart.chauffeur ? `${cart.chauffeur.name} (${cart.chauffeurDays}d)` : undefined,
        honeymoon: cart.honeymoon?.title,
        honeymoonProvider: cart.honeymoonProvider?.name
      }
    };

    const res = await api.submitBooking(submission);
    setIsSubmitting(false);

    if (res.success) {
      setConfirmedBookingId(res.bookingId);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const weddingCategories = [
    { key: 'venue', name: 'Wedding Venue', tab: 'venues', item: cart.venue, icon: '🏰' },
    { key: 'catering', name: 'Haute Catering', tab: 'catering', item: cart.catering, icon: '🍽️' },
    { key: 'decor', name: 'Scenography & Decor', tab: 'decor', item: cart.decor, icon: '🌸' },
    { key: 'photography', name: 'Photography & Cinema', tab: 'photography', item: cart.photography, icon: '📸' },
    { key: 'chauffeur', name: 'Luxury Car Fleet', tab: 'chauffeurs', item: cart.chauffeur, icon: '🚘' },
    { key: 'honeymoon', name: 'Honeymoon Travel', tab: 'honeymoon', item: cart.honeymoon, icon: '✈️' }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Calculator className="w-3.5 h-3.5" />
            End-to-End Master Wedding Planner & Budget Estimator
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Unified Wedding Blueprint & Checkout
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every vendor and honeymoon provider combined in one single contract. Adjust guest headcounts, calculate transparent taxes, review per-guest economics, and lock in all bookings in a single click.
          </p>
        </div>
      </div>

      {/* Progress Pill Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-800">Wedding Checklist Completion:</span>
            <span className="text-xs font-extrabold text-gold-700 bg-gold-50 px-2 py-0.5 rounded-md border border-gold-200">
              {cartItemCount} of 6 Pillars Selected
            </span>
          </div>
          <div className="w-48 sm:w-64 h-2 bg-stone-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-rosewine-500 transition-all duration-500"
              style={{ width: `${(cartItemCount / 6) * 100}%` }}
            />
          </div>
        </div>

        {cartItemCount > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset All Selections</span>
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 6 Wedding Pillars Status & Detail Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Selected Wedding Services
          </h2>

          <div className="space-y-3">
            {weddingCategories.map(cat => {
              const hasItem = Boolean(cat.item);

              return (
                <div
                  key={cat.key}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    hasItem
                      ? 'bg-white border-gold-300 shadow-sm'
                      : 'bg-stone-50 border-stone-200/80 border-dashed'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{cat.icon}</span>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          {cat.name}
                        </div>

                        {hasItem ? (
                          <div className="mt-1 space-y-1">
                            <h3 className="font-serif text-base font-bold text-stone-900">
                              {(cat.item as any).name || (cat.item as any).title}
                            </h3>

                            {cat.key === 'venue' && cart.venue && (
                              <p className="text-xs text-stone-500">
                                {cart.venue.locationLabel} • {weddingDays} Day(s) • {formatPrice(cart.venue.pricePerDay * weddingDays)}
                              </p>
                            )}

                            {cat.key === 'catering' && cart.catering && (
                              <p className="text-xs text-stone-500">
                                {formatPrice(cart.catering.pricePerPlate)}/plate • For {guestCount} Guests: {formatPrice(cart.catering.pricePerPlate * guestCount * weddingDays)}
                              </p>
                            )}

                            {cat.key === 'decor' && cart.decor && (
                              <p className="text-xs text-stone-500">
                                {cart.decorPackage?.name || 'Selected Package'} • {formatPrice(cart.decorPackage?.price || cart.decor.priceStarting)}
                              </p>
                            )}

                            {cat.key === 'photography' && cart.photography && (
                              <p className="text-xs text-stone-500">
                                {cart.photography.style} • Full 3-Day Cinematic Package • {formatPrice(cart.photography.price)}
                              </p>
                            )}

                            {cat.key === 'chauffeur' && cart.chauffeur && (
                              <p className="text-xs text-stone-500">
                                {cart.chauffeur.vehicleType} • {cart.chauffeurDays} Day(s) • {formatPrice(cart.chauffeur.pricePerDay * cart.chauffeurDays)}
                              </p>
                            )}

                            {cat.key === 'honeymoon' && cart.honeymoon && (
                              <p className="text-xs text-stone-500">
                                {cart.honeymoon.destination} via <strong>{cart.honeymoonProvider?.name}</strong> • {formatPrice(cart.honeymoonProvider?.priceINR || 0)}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="mt-1">
                            <p className="text-xs text-stone-500">
                              No {cat.name.toLowerCase()} selected yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {hasItem ? (
                        <button
                          type="button"
                          onClick={() => removeItem(cat.key as any)}
                          className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveTab(cat.tab as any)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 transition flex items-center gap-1"
                        >
                          <span>Choose</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Financial Budget Estimator & Checkout Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-600" />
                <span>Wedding Budget Estimator</span>
              </h3>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                Live Calculator
              </span>
            </div>

            {/* Guest Count & Days Sliders */}
            <div className="space-y-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold-600" />
                  <span>Guest Headcount:</span>
                </span>
                <span className="font-bold text-stone-900 text-sm">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
                className="w-full accent-gold-600 cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  <span>Celebration Duration:</span>
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setWeddingDays(d)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        weddingDays === d
                          ? 'bg-stone-900 text-white'
                          : 'bg-white text-stone-700 border border-stone-200'
                      }`}
                    >
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Items Subtotal */}
            {estimate && (
              <div className="space-y-2 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Venue ({estimate.breakdown.venue.days}d):</span>
                  <span className="font-semibold text-stone-800">{formatPrice(estimate.breakdown.venue.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Catering ({guestCount} guests × {weddingDays}d):</span>
                  <span className="font-semibold text-stone-800">{formatPrice(estimate.breakdown.catering.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Decor:</span>
                  <span className="font-semibold text-stone-800">{formatPrice(estimate.breakdown.decor.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Photography & Cinema:</span>
                  <span className="font-semibold text-stone-800">{formatPrice(estimate.breakdown.photography.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Chauffeur & Fleet ({estimate.breakdown.chauffeur.days}d):</span>
                  <span className="font-semibold text-stone-800">{formatPrice(estimate.breakdown.chauffeur.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Honeymoon Package:</span>
                  <span className="font-semibold text-stone-800">{formatPrice(estimate.breakdown.honeymoon.cost)}</span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between text-stone-500">
                  <span>Subtotal:</span>
                  <span>{formatPrice(estimate.summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Luxury Hospitality GST (18%):</span>
                  <span>{formatPrice(estimate.summary.gstTax)}</span>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t-2 border-stone-900 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-stone-500">
                      Grand Total
                    </span>
                    <div className="text-[11px] text-stone-400">
                      Estimated ~{formatPrice(estimate.summary.costPerGuest)} / guest
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-bold text-stone-900">
                    {formatPrice(estimate.summary.grandTotal)}
                  </div>
                </div>

                {/* Advance Deposit Pill */}
                <div className="mt-3 p-3 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-between text-xs text-gold-950">
                  <span className="font-medium">25% Advance Lock Deposit:</span>
                  <span className="font-bold text-gold-800">{formatPrice(estimate.summary.recommendedAdvanceDeposit)}</span>
                </div>
              </div>
            )}

            {/* Reservation Checkout Form */}
            <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-gold-600" />
                <span>Reserve Entire Wedding Portfolio</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 uppercase">
                    Couple Names
                  </label>
                  <input
                    type="text"
                    required
                    value={coupleNames}
                    onChange={e => setCoupleNames(e.target.value)}
                    placeholder="e.g. Priya Sharma & Rohan Verma"
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 uppercase">
                    Custom Requests & Dietary Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any specific decor themes, baraat timings, or dietary restrictions..."
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItemCount === 0}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-gold-600 via-gold-500 to-rosewine-500 hover:from-gold-700 hover:to-rosewine-600 text-white font-bold text-sm shadow-xl shadow-gold-600/20 transition transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Securing Bookings...' : `Secure Entire Package (${cartItemCount} Items)`}
                </span>
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                🔒 Guaranteed Price Lock • Free Cancellation on honeymoon packages within 7 days.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Receipt Voucher Modal */}
      {confirmedBookingId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-stone-200 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600 bg-gold-100 px-3 py-1 rounded-full">
                Booking ID: {confirmedBookingId}
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-900 mt-3">
                Wedding Portfolio Reserved!
              </h3>
              <p className="text-xs text-stone-500 mt-2">
                Congratulations {coupleNames}! Your wedding itinerary for <strong>{weddingDate}</strong> in <strong>{selectedLocation.toUpperCase()}</strong> has been secured across all participating vendors and your honeymoon trip.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between font-bold text-stone-900 pb-2 border-b border-stone-200">
                <span>Contract Holder:</span>
                <span>{coupleNames}</span>
              </div>
              {cart.venue && (
                <div className="flex justify-between text-stone-700">
                  <span>Venue:</span>
                  <span className="font-medium">{cart.venue.name}</span>
                </div>
              )}
              {cart.catering && (
                <div className="flex justify-between text-stone-700">
                  <span>Catering:</span>
                  <span className="font-medium">{cart.catering.name} ({guestCount} Guests)</span>
                </div>
              )}
              {cart.decor && (
                <div className="flex justify-between text-stone-700">
                  <span>Decor:</span>
                  <span className="font-medium">{cart.decor.name}</span>
                </div>
              )}
              {cart.photography && (
                <div className="flex justify-between text-stone-700">
                  <span>Photography:</span>
                  <span className="font-medium">{cart.photography.name}</span>
                </div>
              )}
              {cart.chauffeur && (
                <div className="flex justify-between text-stone-700">
                  <span>Fleet:</span>
                  <span className="font-medium">{cart.chauffeur.name}</span>
                </div>
              )}
              {cart.honeymoon && (
                <div className="flex justify-between text-stone-700">
                  <span>Honeymoon:</span>
                  <span className="font-medium">{cart.honeymoon.title} ({cart.honeymoonProvider?.name})</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Budget:</span>
                <span className="text-emerald-700 font-serif text-base">
                  {estimate ? formatPrice(estimate.summary.grandTotal) : ''}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Itinerary Voucher</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmedBookingId(null)}
                className="flex-1 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
