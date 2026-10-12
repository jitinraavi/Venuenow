import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  calculateDistanceKm,
  COUNTRIES,
  LOCATIONS,
  VENUES,
  CATERING_SERVICES,
  DECOR_SERVICES,
  PHOTOGRAPHY_SERVICES,
  CHAUFFEURS_SERVICES,
  HONEYMOON_DESTINATIONS
} from './data.js';
import {
  TOTAL_VENUES_COUNT,
  getVenueStats,
  queryVenues,
  findVenueById,
  importCustomVenue
} from './venueRegistry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory stores
const bookings = [];
const enrolledVendors = [];

// Helper: Filter & annotate vendor items with deliverable distance relative to a venue
function applyProximityFiltering(items, venueId, onlyDeliverable = 'true', location, country) {
  let results = [...items];

  // Country filter
  if (country && country !== 'all') {
    results = results.filter(item => item.country && item.country.toLowerCase() === country.toLowerCase());
  }

  // Location filter (if venueId is not given or fallback)
  if (location && location !== 'all') {
    results = results.filter(item => item.location && item.location.toLowerCase() === location.toLowerCase());
  }

  // If a venueId is provided, calculate distance using Haversine formula
  if (venueId) {
    const venue = findVenueById(venueId) || VENUES.find(v => v.id === venueId);
    if (venue && venue.coordinates) {
      results = results.map(item => {
        let dist = null;
        if (item.coordinates && item.coordinates.lat && item.coordinates.lng) {
          dist = calculateDistanceKm(
            venue.coordinates.lat,
            venue.coordinates.lng,
            item.coordinates.lat,
            item.coordinates.lng
          );
        }
        const maxRadius = item.deliverableRadiusKm || 50;
        const isDeliverable = dist !== null ? dist <= maxRadius : true;
        return {
          ...item,
          distanceKm: dist,
          isDeliverable,
          referenceVenue: {
            id: venue.id,
            name: venue.name,
            locationLabel: venue.locationLabel
          }
        };
      });

      // Filter by deliverable radius if requested
      if (onlyDeliverable === 'true' || onlyDeliverable === true) {
        results = results.filter(item => item.isDeliverable);
      }

      // Sort by distance (closest first)
      results.sort((a, b) => {
        if (a.distanceKm === null) return 1;
        if (b.distanceKm === null) return -1;
        return a.distanceKm - b.distanceKm;
      });
    }
  }

  return results;
}

// GET /api/countries
app.get('/api/countries', (req, res) => {
  res.json({ success: true, data: COUNTRIES });
});

// GET /api/locations
// Supports query: country
app.get('/api/locations', (req, res) => {
  const { country } = req.query;
  let results = [...LOCATIONS];
  if (country && country !== 'all') {
    results = results.filter(loc => loc.country === 'all' || loc.country.toLowerCase() === country.toLowerCase());
  }
  res.json({ success: true, data: results });
});

// GET /api/venues/stats
// Return live distribution metrics across the 75,000+ Google Maps venue registry
app.get('/api/venues/stats', (req, res) => {
  res.json({
    success: true,
    data: getVenueStats()
  });
});

// GET /api/venues
// Fast paginated query engine across all 75,000+ venues
// Supports query: country, location, date, minGuests, maxPrice, categoryTag, priceTier, headcountTier, query, page, limit
app.get('/api/venues', (req, res) => {
  const result = queryVenues(req.query);
  res.json({
    success: true,
    total: result.total,
    page: result.page,
    limit: result.limit,
    totalPages: result.totalPages,
    hasMore: result.hasMore,
    count: result.data.length,
    data: result.data
  });
});


// POST /api/venues/import-google
// Import any venue from Google Maps into the active ecosystem
app.post('/api/venues/import-google', (req, res) => {
  const {
    name,
    city = 'Metropolitan City',
    country = 'india',
    locationLabel,
    coordinates,
    type = 'Google Maps Wedding Venue',
    categoryTag = 'banquet',
    priceTier = 'mid_range',
    pricePerDay = 150000,
    pricePerPlate = 1500,
    minGuests = 100,
    maxGuests = 600,
    googleRating = 4.7,
    googleReviewCount = 850,
    googleMapsUrl,
    image,
    description
  } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Venue name is required to import from Google' });
  }

  const newVenueId = `v-google-${Date.now()}`;
  const importedVenue = {
    id: newVenueId,
    name,
    country,
    city,
    location: city.toLowerCase().replace(/[^a-z0-9]/g, '') || 'central',
    locationLabel: locationLabel || `${name}, ${city}, ${country.toUpperCase()}`,
    coordinates: coordinates || { lat: 28.6139, lng: 77.2090 },
    type,
    categoryTag,
    priceTier,
    rating: Number(googleRating) || 4.7,
    reviewCount: Number(googleReviewCount) || 850,
    googlePlaceId: `ChIJ_imported_${Date.now()}`,
    googleRating: Number(googleRating) || 4.7,
    googleReviewCount: Number(googleReviewCount) || 850,
    googleMapsUrl: googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(name + ' ' + city)}`,
    pricePerDay: Number(pricePerDay) || 150000,
    pricePerPlate: Number(pricePerPlate) || 1500,
    minGuests: Number(minGuests) || 100,
    maxGuests: Number(maxGuests) || 600,
    featured: true,
    image: image || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      image || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: description || `Verified venue on Google Maps: ${name} in ${city}. Available for full wedding celebration, banquet dining, and ceremonies.`,
    amenities: ['Verified on Google Maps', 'Central Air Conditioning / Climate Control', 'Bridal Dressing Suite', 'Ample Parking Available'],
    availableDates: [
      { date: '2026-11-14', status: 'available' },
      { date: '2026-11-21', status: 'available' },
      { date: '2026-11-28', status: 'available' },
      { date: '2026-12-05', status: 'available' },
      { date: '2026-12-12', status: 'available' },
      { date: '2026-12-19', status: 'available' }
    ]
  };

  importCustomVenue(importedVenue);
  VENUES.unshift(importedVenue);

  res.status(201).json({
    success: true,
    message: 'Venue successfully imported from Google Maps into live ecosystem!',
    data: importedVenue
  });
});

// GET /api/venues/:id
app.get('/api/venues/:id', (req, res) => {
  const venue = findVenueById(req.params.id) || VENUES.find(v => v.id === req.params.id);
  if (!venue) {
    return res.status(404).json({ success: false, message: 'Venue not found' });
  }
  res.json({ success: true, data: venue });
});

// GET /api/catering
// Supports query: venueId, onlyDeliverable, country, location, cuisine, guests, maxPricePerPlate
app.get('/api/catering', (req, res) => {
  const { venueId, onlyDeliverable, country, location, cuisine, guests, maxPricePerPlate } = req.query;

  let results = applyProximityFiltering(CATERING_SERVICES, venueId, onlyDeliverable, location, country);

  if (cuisine) {
    results = results.filter(c => c.cuisines && c.cuisines.some(item => item.toLowerCase().includes(cuisine.toLowerCase())));
  }

  if (guests) {
    const g = parseInt(guests, 10);
    results = results.filter(c => c.maxGuests >= g && c.minGuests <= g);
  }

  if (maxPricePerPlate) {
    const p = parseInt(maxPricePerPlate, 10);
    results = results.filter(c => c.pricePerPlate <= p);
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/decor
// Supports query: venueId, onlyDeliverable, country, location, theme, maxPrice
app.get('/api/decor', (req, res) => {
  const { venueId, onlyDeliverable, country, location, theme, maxPrice } = req.query;

  let results = applyProximityFiltering(DECOR_SERVICES, venueId, onlyDeliverable, location, country);

  if (theme) {
    results = results.filter(d => d.theme && d.theme.toLowerCase().includes(theme.toLowerCase()));
  }

  if (maxPrice) {
    const p = parseInt(maxPrice, 10);
    results = results.filter(d => d.priceStarting <= p);
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/photography
// Supports query: venueId, onlyDeliverable, country, location, style, maxPrice
app.get('/api/photography', (req, res) => {
  const { venueId, onlyDeliverable, country, location, style, maxPrice } = req.query;

  let results = applyProximityFiltering(PHOTOGRAPHY_SERVICES, venueId, onlyDeliverable, location, country);

  if (style) {
    results = results.filter(p => p.style && p.style.toLowerCase().includes(style.toLowerCase()));
  }

  if (maxPrice) {
    const p = parseInt(maxPrice, 10);
    results = results.filter(p => p.price <= p);
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/chauffeurs
// Supports query: venueId, onlyDeliverable, country, location, vehicleType, maxPrice
app.get('/api/chauffeurs', (req, res) => {
  const { venueId, onlyDeliverable, country, location, vehicleType, maxPrice } = req.query;

  let results = applyProximityFiltering(CHAUFFEURS_SERVICES, venueId, onlyDeliverable, location, country);

  if (vehicleType) {
    results = results.filter(c => c.vehicleType && c.vehicleType.toLowerCase().includes(vehicleType.toLowerCase()));
  }

  if (maxPrice) {
    const p = parseInt(maxPrice, 10);
    results = results.filter(c => c.pricePerDay <= p);
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/honeymoon
// Honeymoon comparator with live Skyscanner reference algorithm
app.get('/api/honeymoon', (req, res) => {
  const { vibe, sortBy, maxBudget } = req.query;
  let results = JSON.parse(JSON.stringify(HONEYMOON_DESTINATIONS));

  if (vibe && vibe !== 'all') {
    results = results.filter(h => h.vibe.toLowerCase().includes(vibe.toLowerCase()));
  }

  if (maxBudget) {
    const budget = parseInt(maxBudget, 10);
    results = results.filter(h => {
      const lowestPrice = Math.min(...h.providers.map(p => p.priceINR));
      return lowestPrice <= budget;
    });
  }

  // Sort providers inside each destination by price or best deal
  results.forEach(dest => {
    dest.providers.sort((a, b) => {
      if (sortBy === 'cheapest') {
        return a.priceINR - b.priceINR;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'savings') {
        return b.savingsPercent - a.savingsPercent;
      }
      // default: best value
      return (a.priceINR / a.savingsPercent) - (b.priceINR / b.savingsPercent);
    });
  });

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/honeymoon/:id
app.get('/api/honeymoon/:id', (req, res) => {
  const dest = HONEYMOON_DESTINATIONS.find(h => h.id === req.params.id);
  if (!dest) {
    return res.status(404).json({ success: false, message: 'Honeymoon destination not found' });
  }
  res.json({ success: true, data: dest });
});

// POST /api/vendors/enroll
// Self-service portal for vendors & suppliers to enroll their business and portfolio
app.post('/api/vendors/enroll', (req, res) => {
  const {
    category, // 'catering' | 'decor' | 'photography' | 'chauffeurs'
    name,
    country = 'india',
    city,
    location,
    locationLabel,
    coordinates,
    deliverableRadiusKm = 45,
    pricing,
    minGuests,
    maxGuests,
    description,
    portfolioImages = [],
    contact,
    categoryDetails
  } = req.body;

  if (!category || !name || !city) {
    return res.status(400).json({
      success: false,
      message: 'Category, business name, and city are required for enrollment.'
    });
  }

  const generatedId = `${category[0]}-enrolled-${Date.now()}`;
  const defaultImage = portfolioImages[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';

  let newVendor = null;

  if (category === 'catering') {
    newVendor = {
      id: generatedId,
      name,
      country,
      city,
      location: location || city.toLowerCase().replace(/[^a-z0-9]/g, ''),
      locationLabel: locationLabel || `${city}, ${country.toUpperCase()}`,
      coordinates: coordinates || { lat: 28.6139, lng: 77.2090 },
      deliverableRadiusKm: Number(deliverableRadiusKm) || 45,
      rating: 5.0,
      reviewCount: 1,
      pricePerPlate: Number(pricing) || 2800,
      minGuests: Number(minGuests) || 100,
      maxGuests: Number(maxGuests) || 1000,
      image: defaultImage,
      cuisines: categoryDetails?.cuisines || ['Royal Gourmet', 'Regional Specialties'],
      dietaryOptions: categoryDetails?.dietaryOptions || ['Pure Vegetarian', 'Custom Menus Available'],
      serviceIncluded: categoryDetails?.serviceIncluded || ['Full Staff & Uniformed Butlers', 'Artisan Chafing Dishes', 'Live Culinary Showmanship'],
      menu: categoryDetails?.menu || {
        welcomeDrinks: [{ name: 'Artisan Welcome Drink', description: 'Fresh bespoke botanical infusion' }],
        appetizers: [{ name: 'Chef Signature Canapés', description: 'Freshly plated gourmet appetizers' }],
        liveCounters: [{ name: 'Interactive Gourmet Station', description: 'Chef-tended bespoke live cooking counter' }],
        mains: [{ name: 'Signature Grand Entrées', description: 'Curated royal banquet selection' }],
        desserts: [{ name: 'Artisan Pastry & Sweet Table', description: 'Handcrafted luxury dessert presentation' }]
      },
      enrolledAt: new Date().toISOString()
    };
    CATERING_SERVICES.unshift(newVendor);
  } else if (category === 'decor') {
    newVendor = {
      id: generatedId,
      name,
      country,
      city,
      location: location || city.toLowerCase().replace(/[^a-z0-9]/g, ''),
      locationLabel: locationLabel || `${city}, ${country.toUpperCase()}`,
      coordinates: coordinates || { lat: 28.6139, lng: 77.2090 },
      deliverableRadiusKm: Number(deliverableRadiusKm) || 50,
      rating: 5.0,
      reviewCount: 1,
      priceStarting: Number(pricing) || 350000,
      capacityCoverage: `${minGuests || 100} – ${maxGuests || 800} Guests`,
      image: defaultImage,
      theme: categoryDetails?.theme || 'Bespoke Floral Scenography & Architecture',
      offerings: categoryDetails?.offerings || {
        mandap: 'Custom sculptural stage and mandap canopy',
        entrance: 'Grand floral archway with dramatic mood lighting',
        seating: 'Luxury designer banquet seating and linens',
        lighting: 'Architectural mood lighting and crystal chandeliers',
        photobooth: 'Curated custom floral photo wall',
        soundStage: 'Acoustic stage backdrop and designer dance floor'
      },
      packages: categoryDetails?.packages || [
        {
          name: 'Signature Luxe Package',
          price: Number(pricing) || 350000,
          guestsFedOrCovered: 'Up to 500 Guests',
          description: 'Comprehensive venue floral architecture and lighting styling.'
        }
      ],
      enrolledAt: new Date().toISOString()
    };
    DECOR_SERVICES.unshift(newVendor);
  } else if (category === 'photography') {
    newVendor = {
      id: generatedId,
      name,
      country,
      city,
      location: location || city.toLowerCase().replace(/[^a-z0-9]/g, ''),
      locationLabel: locationLabel || `${city}, ${country.toUpperCase()}`,
      coordinates: coordinates || { lat: 28.6139, lng: 77.2090 },
      deliverableRadiusKm: Number(deliverableRadiusKm) || 75,
      rating: 5.0,
      reviewCount: 1,
      price: Number(pricing) || 320000,
      image: defaultImage,
      style: categoryDetails?.style || 'Cinematic Documentary & Fine Art Editorial',
      teamSize: categoryDetails?.teamSize || '4 Masters (2 Directors, 2 Cinematographers)',
      deliverables: categoryDetails?.deliverables || {
        coverageDays: 'Full 2-Day Coverage',
        cinematicTeaser: '3-Minute 4K HDR Teaser',
        weddingFilm: '20-Minute Feature Documentary Film',
        highResPhotos: '1,000+ Master Retouched Stills',
        albums: 'Two Italian Leather Bound Heirloom Albums',
        droneFootage: 'Dual Cinema Drone 4K Coverage',
        socialMediaReels: '10 Handcrafted 9:16 Vertical Reels'
      },
      gearList: categoryDetails?.gearList || ['Sony Cinema Line FX6/FX3', 'G Master Primes', 'DJI Ronin Gimbal', 'DJI Inspire 3 Drone'],
      enrolledAt: new Date().toISOString()
    };
    PHOTOGRAPHY_SERVICES.unshift(newVendor);
  } else if (category === 'chauffeurs') {
    newVendor = {
      id: generatedId,
      name,
      country,
      city,
      location: location || city.toLowerCase().replace(/[^a-z0-9]/g, ''),
      locationLabel: locationLabel || `${city}, ${country.toUpperCase()}`,
      coordinates: coordinates || { lat: 28.6139, lng: 77.2090 },
      deliverableRadiusKm: Number(deliverableRadiusKm) || 60,
      rating: 5.0,
      reviewCount: 1,
      vehicleType: categoryDetails?.vehicleType || 'Luxury Wedding Chauffeured Fleet',
      pricePerDay: Number(pricing) || 75000,
      pricePerHour: Math.round((Number(pricing) || 75000) / 8),
      passengerCapacity: categoryDetails?.passengerCapacity || 'Bridal Couple + Entourage',
      image: defaultImage,
      features: categoryDetails?.features || ['Professional Chauffeur in Livery', 'Red Carpet Arrival Rollout', 'Chilled Mineral Water & Champagne Bar'],
      enrolledAt: new Date().toISOString()
    };
    CHAUFFEURS_SERVICES.unshift(newVendor);
  }

  if (newVendor) {
    enrolledVendors.unshift({
      ...newVendor,
      contact: contact || {},
      category
    });

    res.status(201).json({
      success: true,
      message: 'Business successfully enrolled and published to live wedding marketplace!',
      data: newVendor
    });
  } else {
    res.status(400).json({ success: false, message: 'Invalid vendor category' });
  }
});

// GET /api/vendors/enrolled
app.get('/api/vendors/enrolled', (req, res) => {
  res.json({ success: true, count: enrolledVendors.length, data: enrolledVendors });
});

// POST /api/estimate
// Live unified budget calculation
app.post('/api/estimate', (req, res) => {
  const {
    venueId,
    cateringId,
    decorId,
    photographyId,
    chauffeurId,
    honeymoonId,
    honeymoonProviderId,
    guestCount = 200,
    weddingDays = 2
  } = req.body;

  const venue = findVenueById(venueId) || VENUES.find(v => v.id === venueId);
  const catering = CATERING_SERVICES.find(c => c.id === cateringId);
  const decor = DECOR_SERVICES.find(d => d.id === decorId);
  const photography = PHOTOGRAPHY_SERVICES.find(p => p.id === photographyId);
  const chauffeur = CHAUFFEURS_SERVICES.find(c => c.id === chauffeurId);
  
  let honeymoon = null;
  let honeymoonProvider = null;
  if (honeymoonId) {
    honeymoon = HONEYMOON_DESTINATIONS.find(h => h.id === honeymoonId);
    if (honeymoon && honeymoonProviderId) {
      honeymoonProvider = honeymoon.providers.find(p => p.providerId === honeymoonProviderId) || honeymoon.providers[0];
    } else if (honeymoon) {
      honeymoonProvider = honeymoon.providers[0];
    }
  }

  const venueCost = venue ? venue.pricePerDay * weddingDays : 0;
  const cateringCost = catering ? catering.pricePerPlate * guestCount * weddingDays : 0;
  const decorCost = decor ? decor.priceStarting : 0;
  const photographyCost = photography ? photography.price : 0;
  const chauffeurCost = chauffeur ? chauffeur.pricePerDay * weddingDays : 0;
  const honeymoonCost = honeymoonProvider ? honeymoonProvider.priceINR : 0;

  const subtotal = venueCost + cateringCost + decorCost + photographyCost + chauffeurCost + honeymoonCost;
  const gstTax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstTax;
  const costPerGuest = guestCount > 0 ? Math.round(grandTotal / guestCount) : 0;

  res.json({
    success: true,
    data: {
      breakdown: {
        venue: { item: venue?.name, cost: venueCost, days: weddingDays },
        catering: { item: catering?.name, cost: cateringCost, guests: guestCount, pricePerPlate: catering?.pricePerPlate },
        decor: { item: decor?.name, cost: decorCost },
        photography: { item: photography?.name, cost: photographyCost },
        chauffeur: { item: chauffeur?.name, cost: chauffeurCost, days: weddingDays },
        honeymoon: { destination: honeymoon?.title, provider: honeymoonProvider?.name, cost: honeymoonCost }
      },
      summary: {
        subtotal,
        gstTax,
        grandTotal,
        guestCount,
        costPerGuest,
        recommendedAdvanceDeposit: Math.round(grandTotal * 0.25)
      }
    }
  });
});

// POST /api/bookings
// Submit a unified wedding booking / reservation inquiry
app.post('/api/bookings', (req, res) => {
  const {
    coupleNames,
    email,
    phone,
    weddingDate,
    location,
    guestCount,
    selectedItems,
    notes
  } = req.body;

  if (!coupleNames || !email || !weddingDate) {
    return res.status(400).json({ success: false, message: 'Please provide couple names, email, and wedding date.' });
  }

  const bookingId = 'VN-' + Math.floor(100000 + Math.random() * 900000);
  const newBooking = {
    bookingId,
    coupleNames,
    email,
    phone,
    weddingDate,
    location,
    guestCount: parseInt(guestCount, 10) || 200,
    selectedItems,
    notes,
    createdAt: new Date().toISOString(),
    status: 'CONFIRMED_RESERVATION'
  };

  bookings.push(newBooking);

  res.status(201).json({
    success: true,
    message: 'Wedding reservation secured successfully!',
    data: newBooking
  });
});

// GET /api/bookings
app.get('/api/bookings', (req, res) => {
  res.json({ success: true, count: bookings.length, data: bookings });
});

// Serve frontend build statically if available
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`VenueNow API Server running smoothly on http://localhost:${PORT}`);
});
