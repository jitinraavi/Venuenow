import React from 'react';
import {
  ShoppingBag,
  Trash2,
  Calculator,
  X
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeItem,
    clearCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    guestCount,
    weddingDays,
    formatPrice,
    estimate,
    setActiveTab,
    cartItemCount
  } = useWedding();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gold-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Wedding Portfolio Cart
                </h3>
                <span className="text-[11px] text-stone-500">
                  {cartItemCount} of 6 Categories Selected
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cartItemCount === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <h4 className="font-serif text-base font-bold text-stone-700">
                  Your Wedding Cart is Empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse Venues, Catering Menus, Decor, Photography, Cars, or Skyscanner Honeymoon packages to build your celebration.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActiveTab('venues');
                  }}
                  className="mt-3 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
                >
                  Explore Venues
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.venue && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">🏰 Venue</div>
                      <div className="font-bold text-stone-900">{cart.venue.name}</div>
                      <div className="text-stone-500">{weddingDays} Day(s): {formatPrice(cart.venue.pricePerDay * weddingDays)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('venue')}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {cart.catering && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">🍽️ Catering</div>
                      <div className="font-bold text-stone-900">{cart.catering.name}</div>
                      <div className="text-stone-500">{guestCount} Guests: {formatPrice(cart.catering.pricePerPlate * guestCount * weddingDays)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('catering')}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {cart.decor && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">🌸 Decor</div>
                      <div className="font-bold text-stone-900">{cart.decor.name}</div>
                      <div className="text-stone-500">{cart.decorPackage?.name || 'Standard'}: {formatPrice(cart.decorPackage?.price || cart.decor.priceStarting)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('decor')}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {cart.photography && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">📸 Photography</div>
                      <div className="font-bold text-stone-900">{cart.photography.name}</div>
                      <div className="text-stone-500">Full 3-Day Cinematic: {formatPrice(cart.photography.price)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('photography')}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {cart.chauffeur && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">🚘 Luxury Fleet</div>
                      <div className="font-bold text-stone-900">{cart.chauffeur.name}</div>
                      <div className="text-stone-500">{cart.chauffeurDays} Day(s): {formatPrice(cart.chauffeur.pricePerDay * cart.chauffeurDays)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('chauffeur')}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {cart.honeymoon && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">✈️ Honeymoon</div>
                      <div className="font-bold text-stone-900">{cart.honeymoon.title}</div>
                      <div className="text-stone-500">{cart.honeymoonProvider?.name}: {formatPrice(cart.honeymoonProvider?.priceINR || 0)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('honeymoon')}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cartItemCount > 0 && estimate && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(estimate.summary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hospitality GST (18%):</span>
                  <span>{formatPrice(estimate.summary.gstTax)}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200">
                  <span>Grand Total:</span>
                  <span className="font-serif text-lg text-gold-700">{formatPrice(estimate.summary.grandTotal)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="px-3 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActiveTab('planner');
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Go to Checkout & Budget</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
