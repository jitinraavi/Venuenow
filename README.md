# VenueNow — End-to-End Wedding & Honeymoon Ecosystem

**VenueNow** is a comprehensive, full-stack web and mobile application designed for couples planning their dream wedding. It unifies every single wedding requirement—palaces, haute catering menus, bespoke scenography & decor, 4K cinematography, luxury bridal fleets, and Skyscanner-compared honeymoon packages—all synchronized by wedding location into one seamless checkout.

---

## 🌟 Key Features

### 🏰 1. Royal Venues & Date Availability Calendar
- Curated heritage palaces, beachfront resorts, grand farmhouses, and luxury city ballrooms (*Udaipur, Goa, Jaipur, Mumbai, Delhi NCR, Kerala, Bali*).
- **Interactive Calendar Schedule**: Check live availability for specific wedding dates in the 2026/2027 season.
- Detailed pricing: Venue rental per day + catering per plate.
- Guest capacity ranges (Min - Max guests), luxury amenities (*private lake jetty, helipad, fireworks permission, bridal villas*), and photo galleries.

### 🍽️ 2. Haute Gastronomy & Catering Suite
- **Location-Matched Caterers**: Automatically filtered based on the couple's chosen wedding destination.
- **Complete Itemized Menus**:
  - Welcome Drinks (e.g. *Kesar Pista Thandai, Smoked Gulab & Basil Sparkler*)
  - Starters & Kebabs (e.g. *Dahi Ke Kebab, Truffle-infused Bhatti Paneer, Mutton Galouti on Sheermal*)
  - Live Food Theaters (e.g. *Purani Dilli Chaat Bazaar, Wood-Fired Dal Baati Churma, Artisanal Dim Sum Steamers*)
  - Royal Mains (e.g. *36-Hour Dal Bukhara, Paneer Kundan Qaliyan, Rajasthani Lal Maas, Awadhi Dum Biryani*)
  - Artisan Desserts (e.g. *Baked Jalebi Caviar with Rabdi Cannoli, 24k Gold Leaf Moong Dal Halwa*)
- **Capacity & Scaling**: Displays minimum and maximum guests it will feed, automatically recalculating catering cost when you change the guest headcount.
- **Dietary Sanctities**: Jain Certified, 100% Pure Veg, Halal, Seafood catch, Nut-free protocols.

### 🌸 3. Scenography & Mandap Decor
- Filtered by wedding location.
- Detailed itemized setup breakdowns:
  - Mandap / Varmala Stage architecture
  - 75-foot Royal Floral Entrance Tunnels & Passage
  - Ambient Lighting & Moving Stage Heads
  - Interactive Photobooth & Jhula Corners
- Package tier selector (*Heritage Classic, Royal Grandeur, Imperial Maharaja Luxury*) with square-footage and guest capacity metrics.

### 📸 4. 4K Cinematography & Fine Art Photography
- Complete deliverables checklist: 3 Days coverage, 4K Cinematic Teaser, Full Feature Documentary Wedding Film, 1,200+ retouched high-res portraits, 2 Handcrafted Italian Leather-bound Albums, 4K Drone Aerials, and 5 same-day Instagram Reels.
- Flagship camera gear inventory (*Sony FX6, Canon R5C, DJI Mavic 3 Cine*).

### 🚘 5. Royal Chauffeurs & Luxury Fleets
- Restored 1938 Vintage Rolls Royce Phantom (Ivory), Mercedes-Maybach S680 V12 Limousine, Vintage Open-Top Buick Tourer, and VIP Baraat multi-axle AC Volvo Coaches.
- Inclusive amenities: Uniformed royal safa (turbaned) chauffeurs, fresh natural jasmine & orchid floral car decor, red carpet deployment, and chilled champagne coolers.
- Rental duration selector (1, 2, or 3 days).

### ✈️ 6. Honeymoon Travel Agency (Skyscanner Reference Comparator)
- Curated destinations: *Maldives Overwater Lagoons, Swiss Alps St. Moritz, Santorini & Amalfi Coast, Bali Rainforest Pool Villas*.
- **Live Meta-Search Comparison Matrix**:
  - Compares **Skyscanner, Booking.com, Agoda, Expedia, MakeMyTrip, and LuxuryEscapes** side by side.
  - Highlights **"Cheapest Deal"** (guaranteed lowest tickets + resort price), **"Best Value (All-Inclusive)"**, and **"Direct Airline Rate"**.
  - Direct savings calculator (*e.g. Save 19% - 24% vs retail*).
  - Couple Perks: Daily floating pool breakfasts, 90-min couples massage, private sunset catamaran cruises, candlelit beach dinners.

### 💎 7. Unified Master Wedding Planner & Budget Estimator
- 6-Pillar completion progress bar.
- Real-time guest headcount slider & celebration duration selector.
- Granular budget breakdown: Venue + Catering (plates × guests × days) + Decor + Photography + Fleet + Honeymoon.
- 18% Luxury Hospitality GST & 25% Advance Lock Deposit schedule.
- Reservation confirmation modal with couple credentials, unique Booking ID generation (`VN-XXXXXX`), celebration confetti, and printable itinerary voucher.

### 📱 8. Dual Web & Native Mobile App Experience
- **Responsive Desktop Web Platform**: Full-width expansive editorial layout.
- **Mobile App Mode**: Live interactive smartphone device simulator with native dynamic island, top app header, and fixed bottom tab bar.
- Dual Currency Switcher: **INR (₹)** and **USD ($)**.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
From the root directory:
```bash
npm run install:all
```

### Start Both Backend & Frontend in Development
```bash
npm run dev
```
- Frontend (Vite with HMR): [http://localhost:5173](http://localhost:5173)
- Backend (Express API): [http://localhost:5000](http://localhost:5000)

### Production Fullstack Mode
```bash
npm run build
npm start
```
The full application (API + React Frontend) will be served unified on [http://localhost:5000](http://localhost:5000).

---

## 📡 Backend API Endpoints

- `GET /api/countries` — Supported market countries (India, USA, Canada)
- `GET /api/locations` — Supported wedding destinations & metropolitan regions
- `GET /api/venues/stats` — Nationwide catalog statistics across 81,435 venues
- `GET /api/venues?country=...&location=...&page=...&limit=...` — Paginated Google Maps venue engine
- `POST /api/venues/import-google` — Import any venue from Google Maps into live catalog
- `GET /api/catering?venueId=...&onlyDeliverable=true` — Nearby deliverable caterers with menus
- `GET /api/decor?venueId=...&onlyDeliverable=true` — Nearby deliverable floral/scenography decorators
- `GET /api/photography?venueId=...&onlyDeliverable=true` — Nearby cinematography studios
- `GET /api/chauffeurs?venueId=...&onlyDeliverable=true` — Nearby dispatch luxury car fleets
- `GET /api/honeymoon?vibe=...&sortBy=cheapest` — Skyscanner metasearch comparison
- `POST /api/vendors/enroll` — Vendor & supplier portal business enrollment
- `GET /api/vendors/enrolled` — Retrieve live enrolled marketplace partners
- `POST /api/estimate` — Dynamic unified budget calculation across all 6 pillars
- `POST /api/bookings` — Secure reservation inquiry & voucher generation
