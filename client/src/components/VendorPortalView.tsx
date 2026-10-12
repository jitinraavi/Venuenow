import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  MapPin,
  CheckCircle2,
  UtensilsCrossed,
  Palette,
  Camera,
  Car,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { api } from '../services/api';
import type { VendorEnrollmentPayload } from '../types/wedding';

export const VendorPortalView: React.FC = () => {
  const { formatPrice, setActiveTab } = useWedding();

  const [category, setCategory] = useState<'catering' | 'decor' | 'photography' | 'chauffeurs'>('catering');
  const [businessName, setBusinessName] = useState<string>('');
  const [country, setCountry] = useState<'india' | 'usa' | 'canada'>('india');
  const [city, setCity] = useState<string>('Delhi NCR');
  const [address, setAddress] = useState<string>('12 MG Road, South Extension');
  const [deliverableRadiusKm, setDeliverableRadiusKm] = useState<number>(50);
  const [pricing, setPricing] = useState<number>(3200);
  const [minGuests, setMinGuests] = useState<number>(100);
  const [maxGuests, setMaxGuests] = useState<number>(1200);
  const [description, setDescription] = useState<string>(
    'Award-winning luxury culinary atelier specializing in royal destination banquets, heirloom recipes, and bespoke live food theater.'
  );
  const [portfolioImage, setPortfolioImage] = useState<string>(
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80'
  );
  const [contactPerson, setContactPerson] = useState<string>('Chef Vikramaditya Singhania');
  const [contactEmail, setContactEmail] = useState<string>('concierge@royalgourmet.com');
  const [contactPhone, setContactPhone] = useState<string>('+91 98100 23456');

  // Specific category state
  const [cuisines, setCuisines] = useState<string>('Royal Awadhi, Pan-Asian, Italian Trattoria, Modern Indian');
  const [dietary, setDietary] = useState<string>('100% Pure Vegetarian, Jain Sanctity, Organic Farm-to-Table');
  const [decorTheme, setDecorTheme] = useState<string>('Imperial Crystal & Fresh Orchid Scenography');
  const [photoStyle, setPhotoStyle] = useState<string>('Cinematic 4K Documentary & Fine Art Editorial');
  const [vehicleType, setVehicleType] = useState<string>('Vintage Rolls Royce Phantom & Maybach Fleet');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);

  const sampleImages: Record<string, string[]> = {
    catering: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    decor: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
    ],
    photography: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80'
    ],
    chauffeurs: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ]
  };

  const handleCategorySwitch = (cat: 'catering' | 'decor' | 'photography' | 'chauffeurs') => {
    setCategory(cat);
    setPortfolioImage(sampleImages[cat][0]);
    if (cat === 'catering') {
      setPricing(3200);
      setBusinessName('Maharaja Imperial Banquets');
    } else if (cat === 'decor') {
      setPricing(450000);
      setBusinessName('Botanica Scenography & Floral Architecture');
    } else if (cat === 'photography') {
      setPricing(350000);
      setBusinessName('Lumière Heritage Wedding Cinema');
    } else if (cat === 'chauffeurs') {
      setPricing(85000);
      setBusinessName('Royal Sovereign Vintage Carriages');
    }
  };

  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !city.trim()) {
      alert('Please fill out your business name and city.');
      return;
    }

    setIsSubmitting(true);

    const payload: VendorEnrollmentPayload = {
      category,
      name: businessName,
      country,
      city,
      location: city.toLowerCase().replace(/[^a-z0-9]/g, ''),
      locationLabel: `${city}, ${country.toUpperCase()}`,
      coordinates:
        country === 'india'
          ? { lat: 28.6139, lng: 77.2090 }
          : country === 'usa'
          ? { lat: 40.7128, lng: -74.0060 }
          : { lat: 43.6532, lng: -79.3832 },
      deliverableRadiusKm,
      pricing: Number(pricing),
      minGuests: Number(minGuests),
      maxGuests: Number(maxGuests),
      description,
      portfolioImages: [portfolioImage],
      contact: {
        contactPerson,
        email: contactEmail,
        phone: contactPhone
      },
      categoryDetails: {
        cuisines: cuisines.split(',').map(s => s.trim()),
        dietaryOptions: dietary.split(',').map(s => s.trim()),
        theme: decorTheme,
        style: photoStyle,
        vehicleType
      }
    };

    const res = await api.enrollVendor(payload);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessResponse(res.data);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-gold-950 text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5" />
            Vendor & Supplier Self-Enrollment Portal
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Grow Your Wedding Business with Deliverable Proximity Matching
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Enroll your catering, floral scenography, cinematography, or luxury fleet business.
            Couples booking venues in India, the US, and Canada will automatically discover your services when their venue falls within your <strong>deliverable distance radius</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Proximity Delivery Matching</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>India, USA & Canada Markets</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Portfolio & Custom Menus Showcase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Banner if Enrolled */}
      {successResponse && (
        <div className="p-6 bg-emerald-50 border-2 border-emerald-500 rounded-3xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950 font-serif">
                  Congratulations! "{successResponse.name}" is now Live!
                </h3>
                <p className="text-xs text-emerald-800">
                  Your business has been published to the VenueNow marketplace. Couples selecting venues within your {deliverableRadiusKm} km deliverable radius will see you immediately.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSuccessResponse(null)}
              className="text-stone-400 hover:text-stone-600 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(category)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition"
            >
              <span>View Your Live Listing in {category.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setSuccessResponse(null)}
              className="px-4 py-2.5 bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-xl hover:bg-emerald-100 transition"
            >
              Enroll Another Service
            </button>
          </div>
        </div>
      )}

      {/* Main Enrollment Workspace: Form on Left, Live Preview Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          {/* Category Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              1. Select Your Supplier Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleCategorySwitch('catering')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                  category === 'catering'
                    ? 'bg-gold-500 text-stone-900 border-gold-600 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Catering</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySwitch('decor')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                  category === 'decor'
                    ? 'bg-gold-500 text-stone-900 border-gold-600 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Decor & Floral</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySwitch('photography')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                  category === 'photography'
                    ? 'bg-gold-500 text-stone-900 border-gold-600 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Photography</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySwitch('chauffeurs')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                  category === 'chauffeurs'
                    ? 'bg-gold-500 text-stone-900 border-gold-600 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Fleet / Cars</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitEnrollment} className="space-y-6">
            {/* Section 2: Business Identity & Country */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                2. Business Name & Geographical Region
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Business / Brand Name</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Royal Palatial Caterers"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Primary Market Country</label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white"
                  >
                    <option value="india">🇮🇳 India</option>
                    <option value="usa">🇺🇸 United States</option>
                    <option value="canada">🇨🇦 Canada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">City / Metro Region</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Udaipur, New York, Toronto"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Address / Headquarters</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="e.g. Central Banquet Studios"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Deliverable Distance Radius Slider */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    Deliverable Service Radius:
                  </span>
                  <span className="bg-gold-500 text-stone-900 px-2.5 py-0.5 rounded-full font-bold">
                    {deliverableRadiusKm} km ({Math.round(deliverableRadiusKm * 0.621)} miles)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={deliverableRadiusKm}
                  onChange={e => setDeliverableRadiusKm(Number(e.target.value))}
                  className="w-full accent-gold-600 cursor-pointer"
                />
                <p className="text-[11px] text-amber-800">
                  Venues located within <strong>{deliverableRadiusKm} km</strong> will feature your business with the "📍 Within deliverable range" badge.
                </p>
              </div>
            </div>

            {/* Section 3: Pricing & Guest Capacities */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                3. Pricing & Guest Capacity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">
                    {category === 'catering'
                      ? 'Price / Plate'
                      : category === 'chauffeurs'
                      ? 'Price / Day'
                      : 'Base Package Price'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="100"
                      value={pricing}
                      onChange={e => setPricing(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500 font-bold"
                    />
                    <span className="absolute left-2.5 top-2.5 text-xs text-stone-400 font-bold">
                      {country === 'india' ? '₹' : country === 'usa' ? '$' : 'C$'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Min Capacity</label>
                  <input
                    type="number"
                    min="10"
                    value={minGuests}
                    onChange={e => setMinGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Max Guests Fed / Covered</label>
                  <input
                    type="number"
                    min="50"
                    value={maxGuests}
                    onChange={e => setMaxGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500 font-bold text-emerald-800"
                  />
                </div>
              </div>

              {/* Dynamic Category Specifics */}
              {category === 'catering' && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs text-stone-600 font-semibold">Cuisines Offered (comma separated)</label>
                    <input
                      type="text"
                      value={cuisines}
                      onChange={e => setCuisines(e.target.value)}
                      placeholder="e.g. Royal Marwari, Continental, Thai, Italian"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-stone-600 font-semibold">Dietary Options & Sanctions</label>
                    <input
                      type="text"
                      value={dietary}
                      onChange={e => setDietary(e.target.value)}
                      placeholder="e.g. Pure Jain, Halal, Gluten Free, Vegan"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                    />
                  </div>
                </div>
              )}

              {category === 'decor' && (
                <div className="space-y-1 pt-2">
                  <label className="text-xs text-stone-600 font-semibold">Decor Style & Themes</label>
                  <input
                    type="text"
                    value={decorTheme}
                    onChange={e => setDecorTheme(e.target.value)}
                    placeholder="e.g. Royal Mughal Scenography, Glass Pavilions"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
              )}

              {category === 'photography' && (
                <div className="space-y-1 pt-2">
                  <label className="text-xs text-stone-600 font-semibold">Cinematography Style</label>
                  <input
                    type="text"
                    value={photoStyle}
                    onChange={e => setPhotoStyle(e.target.value)}
                    placeholder="e.g. 4K Drone, Fine Art Editorial, Candid Documentaries"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
              )}

              {category === 'chauffeurs' && (
                <div className="space-y-1 pt-2">
                  <label className="text-xs text-stone-600 font-semibold">Fleet Types & Models</label>
                  <input
                    type="text"
                    value={vehicleType}
                    onChange={e => setVehicleType(e.target.value)}
                    placeholder="e.g. Vintage Rolls Royce, Mercedes Maybach, Stretch Escalade"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
              )}
            </div>

            {/* Section 4: Portfolio Media & Description */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                4. Portfolio Showcase Image & Description
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-semibold">Portfolio Hero Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={portfolioImage}
                    onChange={e => setPortfolioImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
                <div className="flex gap-2 pt-1 overflow-x-auto">
                  {sampleImages[category]?.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPortfolioImage(img)}
                      className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 shrink-0 ${
                        portfolioImage === img ? 'border-gold-500 scale-95' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="sample" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-semibold">Business Bio & Offerings Summary</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 leading-relaxed"
                />
              </div>
            </div>

            {/* Section 5: Direct Contact Details */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                5. Contact & Booking Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={e => setContactPerson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Direct Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-semibold">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white font-bold text-sm shadow-xl shadow-gold-600/30 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Publishing to Wedding Marketplace...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Business & Portfolio to Live Marketplace</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Live Couple View Preview
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" /> Real-time Matching
              </span>
            </div>

            {/* Simulated Live Marketplace Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl group">
              <div className="relative h-56 bg-stone-900">
                <img
                  src={portfolioImage}
                  alt={businessName || 'Business Preview'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Country Flag & Category Pill */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {country === 'india' ? '🇮🇳 India' : country === 'usa' ? '🇺🇸 USA' : '🇨🇦 Canada'}
                  </span>
                  <span className="bg-gold-500 text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {category}
                  </span>
                </div>

                {/* Deliverable Badge */}
                <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Delivers up to {deliverableRadiusKm} km</span>
                </div>

                {/* Bottom Card Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-serif text-lg font-bold truncate">
                    {businessName || 'Your Business Name'}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-stone-200">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    <span>{city || 'City Region'}</span>
                    <span className="text-stone-400">• ★ 5.0 (New Partner)</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-2xl border border-stone-100">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Pricing</div>
                    <div className="font-serif text-base font-bold text-stone-900">
                      {formatPrice(pricing)}{' '}
                      <span className="text-[10px] text-stone-500 font-normal">
                        {category === 'catering' ? '/ plate' : category === 'chauffeurs' ? '/ day' : 'base'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Capacity</div>
                    <div className="text-xs font-bold text-stone-800">
                      {minGuests} – {maxGuests} Guests
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Vendor Partner</span>
                  </div>
                  <span className="text-stone-400 text-[11px]">Instant Bookable</span>
                </div>
              </div>
            </div>

            {/* Explanatory Callout */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-600" />
                How Proximity Matching Works for You
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                When couples select a venue located within {deliverableRadiusKm} km of your headquarters in {city}, your business is surfaced with an active <strong>"Within Deliverable Distance"</strong> indicator and priority ranking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
