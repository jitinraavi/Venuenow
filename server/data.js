// VenueNow Master Dataset — India, USA & Canada Markets
// Geolocation Coordinates & Deliverable Distance Engine

// Haversine formula to compute great-circle distance between two points in km
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const COUNTRIES = [
  { id: 'all', name: 'All Countries', flag: '🌍' },
  { id: 'india', name: 'India', flag: '🇮🇳' },
  { id: 'usa', name: 'United States', flag: '🇺🇸' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦' }
];

export const LOCATIONS = [
  { id: 'all', name: 'All Locations', country: 'all', badge: 'Global Destinations' },
  // India
  { id: 'udaipur', name: 'Udaipur, Rajasthan', country: 'india', badge: 'Royal Palaces', lat: 24.5854, lng: 73.7125 },
  { id: 'goa', name: 'Goa', country: 'india', badge: 'Beach Weddings & Lawns', lat: 15.2993, lng: 74.1240 },
  { id: 'jaipur', name: 'Jaipur, Rajasthan', country: 'india', badge: 'Heritage Forts & Bhavans', lat: 26.9124, lng: 75.7873 },
  { id: 'mumbai', name: 'Mumbai, Maharashtra', country: 'india', badge: 'Luxury Banquets & Mandapams', lat: 19.0760, lng: 72.8777 },
  { id: 'delhi', name: 'Delhi NCR', country: 'india', badge: 'Grand Farmhouses & Community Halls', lat: 28.6139, lng: 77.2090 },
  { id: 'kerala', name: 'Kerala', country: 'india', badge: 'Backwaters & Convention Centers', lat: 9.9312, lng: 76.2673 },
  // United States
  { id: 'newyork', name: 'New York & Queens', country: 'usa', badge: 'Castles, Ballrooms & Lofts', lat: 40.7128, lng: -74.0060 },
  { id: 'california', name: 'Napa & Sacramento, CA', country: 'usa', badge: 'Vineyards & Rustic Barns', lat: 38.2975, lng: -122.2869 },
  { id: 'miami', name: 'Miami & Ft Lauderdale, FL', country: 'usa', badge: 'Oceanfront Resorts & Crystal Ballrooms', lat: 25.7617, lng: -80.1918 },
  { id: 'hawaii', name: 'Maui & Oahu, Hawaii', country: 'usa', badge: 'Pacific Beachfront Chapels', lat: 20.7984, lng: -156.3319 },
  // Canada
  { id: 'toronto', name: 'Toronto & Brampton, ON', country: 'canada', badge: 'Castles, Convention Centers & Lofts', lat: 43.6532, lng: -79.3832 },
  { id: 'banff', name: 'Banff & Canmore, AB', country: 'canada', badge: 'Rockies Alpine Castles & Pavilions', lat: 51.1784, lng: -115.5708 },
  { id: 'vancouver', name: 'Vancouver & Shipyards, BC', country: 'canada', badge: 'Waterfront Estates & Timber Halls', lat: 49.2827, lng: -123.1207 }
];

export const VENUES = [
  {
    "id": "v1",
    "name": "The Oberoi Udaivilas Palace",
    "country": "india",
    "city": "Udaipur",
    "location": "udaipur",
    "locationLabel": "Lake Pichola, Udaipur, Rajasthan 313001, India",
    "coordinates": {
      "lat": 24.5772,
      "lng": 73.6738
    },
    "type": "Royal Palace Resort",
    "categoryTag": "heritage",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJT4tX7nQGZzkRBwZ4J4pTq3M",
    "googleRating": 4.96,
    "googleReviewCount": 3420,
    "googleMapsUrl": "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
    "rating": 4.96,
    "reviewCount": 3420,
    "pricePerDay": 850000,
    "pricePerPlate": 4500,
    "minGuests": 150,
    "maxGuests": 750,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "A breathtaking royal palace rising from the serene waters of Lake Pichola. Features hand-carved stone domes, private royal boat arrivals, expansive Mughal courtyards, and Mewari gardens.",
    "amenities": [
      "Private Lake Jetty",
      "Royal Bridal Suite",
      "Helipad Access",
      "Fireworks Permission",
      "In-house 5-Star Accommodations (90 Rooms)",
      "Valet Parking for 200 Cars"
    ],
    "availableDates": [
      {
        "date": "2026-11-14",
        "status": "available"
      },
      {
        "date": "2026-11-25",
        "status": "available"
      },
      {
        "date": "2026-12-04",
        "status": "available"
      },
      {
        "date": "2026-12-18",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-2",
    "name": "Chattarpur Central Wedding Grounds & Lawns",
    "country": "india",
    "city": "Delhi NCR",
    "location": "delhi",
    "locationLabel": "Main Chattarpur Road, South Delhi, Delhi 110074, India",
    "coordinates": {
      "lat": 28.5028,
      "lng": 77.1812
    },
    "type": "Sprawling Wedding Farmhouse",
    "categoryTag": "farmhouse",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJ7_z_chat_ground_delhi",
    "googleRating": 4.72,
    "googleReviewCount": 2850,
    "googleMapsUrl": "https://maps.google.com/?q=Chattarpur+Wedding+Grounds+Delhi",
    "rating": 4.72,
    "reviewCount": 2850,
    "pricePerDay": 320000,
    "pricePerPlate": 2200,
    "minGuests": 300,
    "maxGuests": 2500,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Premier open-air South Delhi wedding estate with 10 acres of lush manicured lawns, illuminated royal entry gateways, and soundproof late-night celebration zones.",
    "amenities": [
      "2,500+ Headcount Capacity",
      "Waterproof Luxury Canopy Hall",
      "Parking for 600 Cars with Valet",
      "Dedicated Baraat Processing Road",
      "Separate Food Island Area"
    ],
    "availableDates": [
      {
        "date": "2026-11-12",
        "status": "available"
      },
      {
        "date": "2026-11-26",
        "status": "available"
      },
      {
        "date": "2026-12-10",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-3",
    "name": "Shree Radhey Shyam Community Banquet Hall",
    "country": "india",
    "city": "Delhi NCR",
    "location": "delhi",
    "locationLabel": "Outer Ring Rd, Pitampura, North West Delhi 110034, India",
    "coordinates": {
      "lat": 28.7032,
      "lng": 77.1325
    },
    "type": "Budget Community Banquet Hall",
    "categoryTag": "community_budget",
    "priceTier": "budget",
    "googlePlaceId": "ChIJradhey_pitampura_delhi",
    "googleRating": 4.54,
    "googleReviewCount": 1420,
    "googleMapsUrl": "https://maps.google.com/?q=Radhey+Shyam+Banquet+Pitampura",
    "rating": 4.54,
    "reviewCount": 1420,
    "pricePerDay": 75000,
    "pricePerPlate": 950,
    "minGuests": 100,
    "maxGuests": 550,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "High-value air-conditioned 2-tier banquet hall in North Delhi. Highly popular on Google Maps for budget-friendly weddings, Haldi, Mehendi, and family receptions.",
    "amenities": [
      "100% Pure Vegetarian Kitchen",
      "Central Air Conditioning",
      "Bridal Dressing Room with Lockers",
      "DJ & Audio Rig Setup",
      "Lift Access & Generator Backup"
    ],
    "availableDates": [
      {
        "date": "2026-11-05",
        "status": "available"
      },
      {
        "date": "2026-11-19",
        "status": "available"
      },
      {
        "date": "2026-12-03",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-4",
    "name": "Golden Green Farmhouse & Mega Resort",
    "country": "india",
    "city": "Delhi NCR (Gurgaon)",
    "location": "delhi",
    "locationLabel": "Sector 66, Golf Course Extension Rd, Gurugram, Haryana 122002, India",
    "coordinates": {
      "lat": 28.4014,
      "lng": 77.0621
    },
    "type": "Mega Wedding Grounds & Resort",
    "categoryTag": "farmhouse",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJgolden_green_gurgaon",
    "googleRating": 4.68,
    "googleReviewCount": 3120,
    "googleMapsUrl": "https://maps.google.com/?q=Golden+Green+Farmhouse+Gurugram",
    "rating": 4.68,
    "reviewCount": 3120,
    "pricePerDay": 380000,
    "pricePerPlate": 2400,
    "minGuests": 400,
    "maxGuests": 3200,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Massive 12-acre lush green estate designed for grand scale North Indian weddings with multiple interconnected celebration lawns and an all-weather glass banquet pavilion.",
    "amenities": [
      "Capacity Up to 3,200 Guests",
      "30 Luxury Rooms for Guests",
      "Swimming Pool for Pool Party & Mehendi",
      "Massive Parking for 800 Vehicles"
    ],
    "availableDates": [
      {
        "date": "2026-11-08",
        "status": "available"
      },
      {
        "date": "2026-11-22",
        "status": "available"
      },
      {
        "date": "2026-12-06",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-5",
    "name": "Radisson Blu Plaza Grand Ballroom",
    "country": "india",
    "city": "Delhi NCR",
    "location": "delhi",
    "locationLabel": "National Highway 8, Mahipalpur, New Delhi 110037, India",
    "coordinates": {
      "lat": 28.5432,
      "lng": 77.1215
    },
    "type": "5-Star Hotel Ballroom",
    "categoryTag": "banquet",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJradisson_blu_nh8_delhi",
    "googleRating": 4.65,
    "googleReviewCount": 4200,
    "googleMapsUrl": "https://maps.google.com/?q=Radisson+Blu+Plaza+Delhi+Airport",
    "rating": 4.65,
    "reviewCount": 4200,
    "pricePerDay": 260000,
    "pricePerPlate": 2100,
    "minGuests": 150,
    "maxGuests": 650,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Contemporary five-star hotel ballroom conveniently situated near Delhi International Airport. Features pillarless architecture, crystal chandeliers, and hospitality suites.",
    "amenities": [
      "Pillarless Grand Ballroom",
      "Dedicated Airport Transit for Guests",
      "Award-Winning In-House Master Chefs",
      "Valet Parking for 350 Cars"
    ],
    "availableDates": [
      {
        "date": "2026-11-14",
        "status": "available"
      },
      {
        "date": "2026-11-28",
        "status": "available"
      },
      {
        "date": "2026-12-12",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-6",
    "name": "Taj Exotica Beach Resort & Spa",
    "country": "india",
    "city": "Goa",
    "location": "goa",
    "locationLabel": "Calwaddo, Benaulim, South Goa 403716, India",
    "coordinates": {
      "lat": 15.2536,
      "lng": 73.9238
    },
    "type": "Beachfront Luxury Resort",
    "categoryTag": "beach",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJtaj_exotica_benaulim_goa",
    "googleRating": 4.88,
    "googleReviewCount": 3890,
    "googleMapsUrl": "https://maps.google.com/?q=Taj+Exotica+Resort+Benaulim+Goa",
    "rating": 4.88,
    "reviewCount": 3890,
    "pricePerDay": 620000,
    "pricePerPlate": 3800,
    "minGuests": 100,
    "maxGuests": 600,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "A Mediterranean-inspired 56-acre luxury beachfront sanctuary along Benaulim Beach in South Goa. Sunset beach pheras followed by poolside gala banquets.",
    "amenities": [
      "Direct Benaulim Beachfront Access",
      "Oceanfront Sunken Ballroom",
      "Jiva Spa & Bridal Treatments",
      "Beachfront Fireworks Permission"
    ],
    "availableDates": [
      {
        "date": "2026-11-06",
        "status": "available"
      },
      {
        "date": "2026-11-20",
        "status": "available"
      },
      {
        "date": "2026-12-04",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-7",
    "name": "Riva Beach Resort & Seafront Grove",
    "country": "india",
    "city": "Goa",
    "location": "goa",
    "locationLabel": "Mandrem Beach, Pernem, North Goa 403527, India",
    "coordinates": {
      "lat": 15.6624,
      "lng": 73.7121
    },
    "type": "Coastal Beachfront Resort & Lawns",
    "categoryTag": "beach",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJriva_beach_mandrem_goa",
    "googleRating": 4.67,
    "googleReviewCount": 2450,
    "googleMapsUrl": "https://maps.google.com/?q=Riva+Beach+Resort+Mandrem+Goa",
    "rating": 4.67,
    "reviewCount": 2450,
    "pricePerDay": 220000,
    "pricePerPlate": 1800,
    "minGuests": 80,
    "maxGuests": 450,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "North Goa favorite located right on Mandrem white sand beach with a sweet water river flowing parallel. Perfect for destination beach weddings with coconut palms.",
    "amenities": [
      "Beach Vow Deck on the Sands",
      "River & Sea Dual Views",
      "100 Beach Cottages for Guests",
      "Open-Air Wooden Dance Deck"
    ],
    "availableDates": [
      {
        "date": "2026-11-10",
        "status": "available"
      },
      {
        "date": "2026-11-24",
        "status": "available"
      },
      {
        "date": "2026-12-08",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-8",
    "name": "Zeebop By The Sea Beach Shack & Lawns",
    "country": "india",
    "city": "Goa",
    "location": "goa",
    "locationLabel": "Utorda Beach, Salcete, South Goa 403713, India",
    "coordinates": {
      "lat": 15.3178,
      "lng": 73.9015
    },
    "type": "Rustic Beachfront Wedding Lawn",
    "categoryTag": "community_budget",
    "priceTier": "budget",
    "googlePlaceId": "ChIJzeebop_utorda_goa",
    "googleRating": 4.52,
    "googleReviewCount": 3100,
    "googleMapsUrl": "https://maps.google.com/?q=Zeebop+by+the+Sea+Utorda+Goa",
    "rating": 4.52,
    "reviewCount": 3100,
    "pricePerDay": 95000,
    "pricePerPlate": 1200,
    "minGuests": 50,
    "maxGuests": 300,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Iconic South Goa coastal restaurant and seaside wedding lawn. Highly loved on Google Maps for barefoot ceremonies, sea breeze dining, and affordable coastal charm.",
    "amenities": [
      "Direct Sand Beachfront Pheras",
      "Authentic Goan Seafood & Global Menus",
      "Fairy Light Thatched Roof Pavilions",
      "Beach Bonfire Setup"
    ],
    "availableDates": [
      {
        "date": "2026-11-12",
        "status": "available"
      },
      {
        "date": "2026-11-26",
        "status": "available"
      },
      {
        "date": "2026-12-10",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-9",
    "name": "Fairmont Jaipur Heritage Palace",
    "country": "india",
    "city": "Jaipur",
    "location": "jaipur",
    "locationLabel": "2, Riico Kukas, Amber, Jaipur, Rajasthan 302028, India",
    "coordinates": {
      "lat": 27.0543,
      "lng": 75.8942
    },
    "type": "Heritage Palace Resort",
    "categoryTag": "heritage",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJfaimont_jaipur_kukas",
    "googleRating": 4.92,
    "googleReviewCount": 4150,
    "googleMapsUrl": "https://maps.google.com/?q=Fairmont+Jaipur+Rajasthan",
    "rating": 4.92,
    "reviewCount": 4150,
    "pricePerDay": 720000,
    "pricePerPlate": 4200,
    "minGuests": 200,
    "maxGuests": 1200,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "A majestic Mughal-style palace framed by the rugged Aravalli hills. Royal elephant processions, lantern-lit central Charbagh gardens, and grand ballrooms.",
    "amenities": [
      "Elephant & Camel Welcome Processing",
      "Grand Aravalli Lawns",
      "Helipad on Site",
      "245 Luxury Royal Chambers",
      "Fireworks Permission"
    ],
    "availableDates": [
      {
        "date": "2026-11-14",
        "status": "available"
      },
      {
        "date": "2026-11-28",
        "status": "available"
      },
      {
        "date": "2026-12-12",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-10",
    "name": "Brijwasi Community Marriage Bhavan & Ground",
    "country": "india",
    "city": "Jaipur",
    "location": "jaipur",
    "locationLabel": "Sector 5, Mansarovar, Jaipur, Rajasthan 302020, India",
    "coordinates": {
      "lat": 26.8532,
      "lng": 75.7684
    },
    "type": "Community Marriage Bhavan & Grounds",
    "categoryTag": "community_budget",
    "priceTier": "budget",
    "googlePlaceId": "ChIJbrijwasi_mansarovar_jaipur",
    "googleRating": 4.45,
    "googleReviewCount": 890,
    "googleMapsUrl": "https://maps.google.com/?q=Brijwasi+Marriage+Bhavan+Jaipur",
    "rating": 4.45,
    "reviewCount": 890,
    "pricePerDay": 65000,
    "pricePerPlate": 800,
    "minGuests": 150,
    "maxGuests": 850,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Established wedding community bhavan in Mansarovar Jaipur. Features a large carpeted AC hall and an attached paved marriage ground for affordable family weddings.",
    "amenities": [
      "Pure Vegetarian Kitchen Allowed",
      "Air-Cooled Indoor Hall",
      "Covered Buffet Counter Area",
      "Spacious Stage Setup"
    ],
    "availableDates": [
      {
        "date": "2026-11-09",
        "status": "available"
      },
      {
        "date": "2026-11-23",
        "status": "available"
      },
      {
        "date": "2026-12-07",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-11",
    "name": "The St. Regis Mumbai Luxury Banquets",
    "country": "india",
    "city": "Mumbai",
    "location": "mumbai",
    "locationLabel": "462, Senapati Bapat Marg, Lower Parel, Mumbai 400013, India",
    "coordinates": {
      "lat": 18.9934,
      "lng": 72.8258
    },
    "type": "Luxury Hotel Ballroom",
    "categoryTag": "banquet",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJst_regis_mumbai_lower_parel",
    "googleRating": 4.86,
    "googleReviewCount": 5400,
    "googleMapsUrl": "https://maps.google.com/?q=The+St+Regis+Mumbai",
    "rating": 4.86,
    "reviewCount": 5400,
    "pricePerDay": 550000,
    "pricePerPlate": 3900,
    "minGuests": 150,
    "maxGuests": 850,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Mumbai premier luxury wedding destination in Lower Parel. Soaring 24-foot ceilings, imported Austrian crystal chandeliers, and an open-air skyline terrace.",
    "amenities": [
      "Skyline Sunset Deck",
      "Integrated Meyer Sound Rig",
      "Two Dedicated Bridal Suites",
      "Pillarless Astor Ballroom"
    ],
    "availableDates": [
      {
        "date": "2026-11-08",
        "status": "available"
      },
      {
        "date": "2026-11-22",
        "status": "available"
      },
      {
        "date": "2026-12-08",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-12",
    "name": "Mayur Community Kalyana Mandapam",
    "country": "india",
    "city": "Mumbai",
    "location": "mumbai",
    "locationLabel": "Dr Ambedkar Rd, Dadar East, Mumbai, Maharashtra 400014, India",
    "coordinates": {
      "lat": 19.0178,
      "lng": 72.8478
    },
    "type": "Traditional Kalyana Mandapam",
    "categoryTag": "community_budget",
    "priceTier": "budget",
    "googlePlaceId": "ChIJmayur_kalyana_dadar_mumbai",
    "googleRating": 4.42,
    "googleReviewCount": 1120,
    "googleMapsUrl": "https://maps.google.com/?q=Mayur+Kalyana+Mandapam+Dadar+Mumbai",
    "rating": 4.42,
    "reviewCount": 1120,
    "pricePerDay": 85000,
    "pricePerPlate": 850,
    "minGuests": 100,
    "maxGuests": 600,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Central Mumbai favorite in Dadar East. Traditional South & North Indian wedding mandapam with attached dining hall. Extremely accessible near Dadar Railway Station.",
    "amenities": [
      "Central Air Conditioning",
      "Traditional Stage Setup",
      "Dining Hall with Banana Leaf Seating option",
      "Bridal Dressing Rooms"
    ],
    "availableDates": [
      {
        "date": "2026-11-11",
        "status": "available"
      },
      {
        "date": "2026-11-25",
        "status": "available"
      },
      {
        "date": "2026-12-09",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-13",
    "name": "Hotel Novotel Juhu Beachfront Lawn",
    "country": "india",
    "city": "Mumbai",
    "location": "mumbai",
    "locationLabel": "Balraj Sahani Marg, Juhu Beach, Mumbai 400049, India",
    "coordinates": {
      "lat": 19.1025,
      "lng": 72.8252
    },
    "type": "Seafront Poolside Lawn",
    "categoryTag": "beach",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJnovotel_juhu_beach_mumbai",
    "googleRating": 4.71,
    "googleReviewCount": 4890,
    "googleMapsUrl": "https://maps.google.com/?q=Novotel+Mumbai+Juhu+Beach",
    "rating": 4.71,
    "reviewCount": 4890,
    "pricePerDay": 450000,
    "pricePerPlate": 3400,
    "minGuests": 150,
    "maxGuests": 800,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Iconic Juhu beach wedding lawn where couples take vows framed by the Arabian Sea horizon and swaying palms, followed by celebrations by the illuminated pool deck.",
    "amenities": [
      "Arabian Sea Sunset Views",
      "Beachfront Mandap Lawn",
      "Poolside Cocktail Deck",
      "Valet Parking for 250 Cars"
    ],
    "availableDates": [
      {
        "date": "2026-11-15",
        "status": "available"
      },
      {
        "date": "2026-11-29",
        "status": "available"
      },
      {
        "date": "2026-12-13",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-14",
    "name": "Sree Gokulam Convention Center",
    "country": "india",
    "city": "Kerala (Kochi)",
    "location": "kerala",
    "locationLabel": "Banerji Rd, Kaloor, Ernakulam, Kerala 682017, India",
    "coordinates": {
      "lat": 9.9984,
      "lng": 76.2952
    },
    "type": "Mega Air-Conditioned Convention Center",
    "categoryTag": "community_budget",
    "priceTier": "budget",
    "googlePlaceId": "ChIJgokulam_convention_kochi",
    "googleRating": 4.58,
    "googleReviewCount": 3600,
    "googleMapsUrl": "https://maps.google.com/?q=Sree+Gokulam+Convention+Center+Kochi",
    "rating": 4.58,
    "reviewCount": 3600,
    "pricePerDay": 120000,
    "pricePerPlate": 750,
    "minGuests": 250,
    "maxGuests": 2200,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "One of Central Kerala largest AC convention complexes in Kaloor Kochi. Handles traditional Kerala Sadya banquets and grand multi-thousand guest receptions easily.",
    "amenities": [
      "Capacity Up to 2,200 Guests",
      "Traditional Sadya Dining Hall for 700 at a time",
      "Underground Multi-Level Car Parking",
      "Complete Sound & Lighting System"
    ],
    "availableDates": [
      {
        "date": "2026-11-13",
        "status": "available"
      },
      {
        "date": "2026-11-27",
        "status": "available"
      },
      {
        "date": "2026-12-11",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-in-15",
    "name": "Kumarakom Lake Resort & Heritage Lawns",
    "country": "india",
    "city": "Kerala (Kumarakom)",
    "location": "kerala",
    "locationLabel": "Vembanad Lake, Kumarakom, Kottayam, Kerala 686563, India",
    "coordinates": {
      "lat": 9.6178,
      "lng": 76.4312
    },
    "type": "Backwater Heritage Resort",
    "categoryTag": "heritage",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJkumarakom_lake_resort",
    "googleRating": 4.88,
    "googleReviewCount": 2980,
    "googleMapsUrl": "https://maps.google.com/?q=Kumarakom+Lake+Resort+Kerala",
    "rating": 4.88,
    "reviewCount": 2980,
    "pricePerDay": 520000,
    "pricePerPlate": 3500,
    "minGuests": 80,
    "maxGuests": 350,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Renowned backwater luxury resort along the shores of Lake Vembanad. Traditional ancestral Kerala homes, houseboats for bride entry, and lush waterside wedding lawns.",
    "amenities": [
      "Traditional Houseboat Bride Arrival",
      "Private Vembanad Lakefront Lawn",
      "Ayurvedic Bridal Retreat",
      "Sunset Flute & Chenda Melam Setup"
    ],
    "availableDates": [
      {
        "date": "2026-11-17",
        "status": "available"
      },
      {
        "date": "2026-11-24",
        "status": "available"
      },
      {
        "date": "2026-12-08",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-1",
    "name": "Oheka Castle Estate & Gardens",
    "country": "usa",
    "city": "Huntington, New York",
    "location": "newyork",
    "locationLabel": "135 W Gate Dr, Huntington, NY 11743, United States",
    "coordinates": {
      "lat": 40.8291,
      "lng": -73.4475
    },
    "type": "Historic French Chateau",
    "categoryTag": "heritage",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJoheka_castle_huntington_ny",
    "googleRating": 4.97,
    "googleReviewCount": 1480,
    "googleMapsUrl": "https://maps.google.com/?q=Oheka+Castle+Huntington+NY",
    "rating": 4.97,
    "reviewCount": 1480,
    "pricePerDay": 2050000,
    "pricePerPlate": 18500,
    "minGuests": 150,
    "maxGuests": 450,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "America’s premier French Chateau perched on Long Island Gold Coast. Formal European fountains, reflecting pools, grand ballrooms, and 32 luxury guest suites.",
    "amenities": [
      "Helicopter Landing Pad",
      "Formal French Formal Gardens",
      "Exclusive Single-Wedding-Per-Day Policy",
      "Bridal Attendant & Sommelier"
    ],
    "availableDates": [
      {
        "date": "2026-11-14",
        "status": "available"
      },
      {
        "date": "2026-11-28",
        "status": "available"
      },
      {
        "date": "2026-12-12",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-2",
    "name": "Astoria World Manor Banquet Hall",
    "country": "usa",
    "city": "Queens, New York City",
    "location": "newyork",
    "locationLabel": "25-22 Astoria Blvd, Astoria, Queens, NY 11102, United States",
    "coordinates": {
      "lat": 40.7712,
      "lng": -73.9214
    },
    "type": "Classic Multi-Tiered Banquet Hall",
    "categoryTag": "banquet",
    "priceTier": "budget",
    "googlePlaceId": "ChIJastoria_world_manor_queens",
    "googleRating": 4.48,
    "googleReviewCount": 2650,
    "googleMapsUrl": "https://maps.google.com/?q=Astoria+World+Manor+Queens+NY",
    "rating": 4.48,
    "reviewCount": 2650,
    "pricePerDay": 250000,
    "pricePerPlate": 6500,
    "minGuests": 100,
    "maxGuests": 800,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "A beloved NYC staple for multicultural weddings in Queens. Offers full-service catering, multiple ballroom sizes, crystal chandeliers, and convenient subway and highway access.",
    "amenities": [
      "Multiple Ballroom Options (100 to 800 guests)",
      "Kosher & Halal Catering Partnerships",
      "Bridal Suites on Each Floor",
      "Free Valet Parking Garage"
    ],
    "availableDates": [
      {
        "date": "2026-11-07",
        "status": "available"
      },
      {
        "date": "2026-11-21",
        "status": "available"
      },
      {
        "date": "2026-12-05",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-3",
    "name": "Terrace On The Park Flushing Meadows",
    "country": "usa",
    "city": "Queens, New York City",
    "location": "newyork",
    "locationLabel": "52-11 111th St, Corona, Queens, NY 11368, United States",
    "coordinates": {
      "lat": 40.7442,
      "lng": -73.8512
    },
    "type": "Iconic Penthouse Ballroom & Rooftop",
    "categoryTag": "banquet",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJterrace_on_the_park_queens",
    "googleRating": 4.62,
    "googleReviewCount": 3100,
    "googleMapsUrl": "https://maps.google.com/?q=Terrace+On+The+Park+Flushing+NY",
    "rating": 4.62,
    "reviewCount": 3100,
    "pricePerDay": 580000,
    "pricePerPlate": 9800,
    "minGuests": 150,
    "maxGuests": 900,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Perched high above Flushing Meadows Corona Park with 360-degree panoramic skyline views of Manhattan and Citi Field. Rooftop terrace vows and penthouse reception.",
    "amenities": [
      "360° Panoramic Manhattan Skyline Views",
      "Open-Air Penthouse Vow Deck",
      "Accommodates up to 900 Guests",
      "Helipad Access & Valet Parking"
    ],
    "availableDates": [
      {
        "date": "2026-11-14",
        "status": "available"
      },
      {
        "date": "2026-11-28",
        "status": "available"
      },
      {
        "date": "2026-12-12",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-4",
    "name": "The Foundry NYC Industrial Loft",
    "country": "usa",
    "city": "Long Island City, Queens NY",
    "location": "newyork",
    "locationLabel": "4-38 43rd Ave, Long Island City, NY 11101, United States",
    "coordinates": {
      "lat": 40.7508,
      "lng": -73.9472
    },
    "type": "19th-Century Industrial Brick Loft",
    "categoryTag": "urban_loft",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJthe_foundry_lic_ny",
    "googleRating": 4.84,
    "googleReviewCount": 650,
    "googleMapsUrl": "https://maps.google.com/?q=The+Foundry+Long+Island+City",
    "rating": 4.84,
    "reviewCount": 650,
    "pricePerDay": 920000,
    "pricePerPlate": 12500,
    "minGuests": 60,
    "maxGuests": 200,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "A meticulously restored 19th-century steel foundry in Long Island City. Exposed raw brick, soaring steel mezzanine, ivy-covered greenhouse, and views of Queensboro Bridge.",
    "amenities": [
      "Ivy-Covered Courtyard",
      "Steel Architectural Mezzanine",
      "Greenhouse & Terrace Access",
      "Custom Vendor Freedom Policy"
    ],
    "availableDates": [
      {
        "date": "2026-11-15",
        "status": "available"
      },
      {
        "date": "2026-11-22",
        "status": "available"
      },
      {
        "date": "2026-12-06",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-5",
    "name": "Pelham Bay & Split Rock Golf Pavilion",
    "country": "usa",
    "city": "Bronx, New York City",
    "location": "newyork",
    "locationLabel": "870 Shore Rd, Bronx, NY 10464, United States",
    "coordinates": {
      "lat": 40.8652,
      "lng": -73.8112
    },
    "type": "Golf Clubhouse & Gazebo Pavilion",
    "categoryTag": "country_club",
    "priceTier": "budget",
    "googlePlaceId": "ChIJpelham_bay_golf_courses",
    "googleRating": 4.54,
    "googleReviewCount": 1250,
    "googleMapsUrl": "https://maps.google.com/?q=Pelham+Bay+Split+Rock+Golf+Club",
    "rating": 4.54,
    "reviewCount": 1250,
    "pricePerDay": 280000,
    "pricePerPlate": 7200,
    "minGuests": 80,
    "maxGuests": 300,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Set within historic Pelham Bay Park. Offers an outdoor white wedding gazebo framed by fairways, a glass-enclosed pavilion tent, and an Italian-style ballroom at accessible rates.",
    "amenities": [
      "Outdoor Gazebo Ceremony Lawn",
      "Climate-Controlled Glass Pavilion Tent",
      "Historic Stone Clubhouse",
      "Free Ample Parking on Site"
    ],
    "availableDates": [
      {
        "date": "2026-11-13",
        "status": "available"
      },
      {
        "date": "2026-11-20",
        "status": "available"
      },
      {
        "date": "2026-12-04",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-6",
    "name": "Meadowood Napa Valley Estate",
    "country": "usa",
    "city": "Napa Valley, CA",
    "location": "california",
    "locationLabel": "900 Meadowood Ln, St Helena, CA 94574, United States",
    "coordinates": {
      "lat": 38.5204,
      "lng": -122.4841
    },
    "type": "Wine Country Luxury Estate",
    "categoryTag": "barn_winery",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJmeadowood_napa_valley",
    "googleRating": 4.94,
    "googleReviewCount": 420,
    "googleMapsUrl": "https://maps.google.com/?q=Meadowood+Napa+Valley+Estate",
    "rating": 4.94,
    "reviewCount": 420,
    "pricePerDay": 1650000,
    "pricePerPlate": 16000,
    "minGuests": 80,
    "maxGuests": 350,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Nestled on 250 secluded wooded acres in the heart of Napa Valley. Offers vows framed by towering olive trees, private vineyard dinners, and world-class wine cellars.",
    "amenities": [
      "Private Vineyard Views",
      "World-Class Spa for Bridal Party",
      "Curated Napa Cabernet Library",
      "Outdoor Woodland Lawn Mandap/Altar"
    ],
    "availableDates": [
      {
        "date": "2026-11-15",
        "status": "available"
      },
      {
        "date": "2026-11-29",
        "status": "available"
      },
      {
        "date": "2026-12-15",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-7",
    "name": "The Barn at Whispering Pines",
    "country": "usa",
    "city": "Napa & Sacramento Valley, CA",
    "location": "california",
    "locationLabel": "14200 Country Rd 99, Woodland, CA 95695, United States",
    "coordinates": {
      "lat": 38.6784,
      "lng": -121.7732
    },
    "type": "Rustic Chic Wooden Barn & Meadows",
    "categoryTag": "barn_winery",
    "priceTier": "budget",
    "googlePlaceId": "ChIJbarn_whispering_pines_ca",
    "googleRating": 4.81,
    "googleReviewCount": 520,
    "googleMapsUrl": "https://maps.google.com/?q=The+Barn+at+Whispering+Pines+Woodland+CA",
    "rating": 4.81,
    "reviewCount": 520,
    "pricePerDay": 220000,
    "pricePerPlate": 5500,
    "minGuests": 50,
    "maxGuests": 260,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Affordable Northern California rustic wedding venue with a grand wooden heritage barn, string-lit oak trees, and open wildflower meadows.",
    "amenities": [
      "Hand-Hewn Timber Barn with Crystal Chandeliers",
      "Bridal Dressing Farmhouse Suite",
      "Outdoor Fire Pit & Lawn Games",
      "Flexible Bring-Your-Own-Caterer Policy"
    ],
    "availableDates": [
      {
        "date": "2026-11-08",
        "status": "available"
      },
      {
        "date": "2026-11-22",
        "status": "available"
      },
      {
        "date": "2026-12-06",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-8",
    "name": "The Biltmore Coral Gables Resort",
    "country": "usa",
    "city": "Miami, Florida",
    "location": "miami",
    "locationLabel": "1200 Anastasia Ave, Coral Gables, FL 33134, United States",
    "coordinates": {
      "lat": 25.7423,
      "lng": -80.2789
    },
    "type": "Historic Mediterranean Resort",
    "categoryTag": "heritage",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJbiltmore_coral_gables_miami",
    "googleRating": 4.91,
    "googleReviewCount": 3950,
    "googleMapsUrl": "https://maps.google.com/?q=The+Biltmore+Hotel+Coral+Gables",
    "rating": 4.91,
    "reviewCount": 3950,
    "pricePerDay": 1450000,
    "pricePerPlate": 14500,
    "minGuests": 100,
    "maxGuests": 650,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "A national historic landmark in Coral Gables showcasing Spanish-Moorish architecture, hand-painted vaulted ceilings, majestic colonnades, and golf resort grounds.",
    "amenities": [
      "Historic Country Club Ballroom",
      "Iconic Colonnade Courtyard",
      "World-Famous Colossal Resort Pool",
      "Chauffeur Golf Carts"
    ],
    "availableDates": [
      {
        "date": "2026-11-10",
        "status": "available"
      },
      {
        "date": "2026-11-24",
        "status": "available"
      },
      {
        "date": "2026-12-20",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-9",
    "name": "The Crystal Ballroom Beach Place",
    "country": "usa",
    "city": "Miami & Fort Lauderdale, FL",
    "location": "miami",
    "locationLabel": "17 S Fort Lauderdale Beach Blvd, Fort Lauderdale, FL 33316, United States",
    "coordinates": {
      "lat": 26.1198,
      "lng": -80.1042
    },
    "type": "All-Inclusive Oceanfront Ballroom",
    "categoryTag": "banquet",
    "priceTier": "budget",
    "googlePlaceId": "ChIJcrystal_ballroom_beach_place",
    "googleRating": 4.64,
    "googleReviewCount": 890,
    "googleMapsUrl": "https://maps.google.com/?q=The+Crystal+Ballroom+Beach+Place+FL",
    "rating": 4.64,
    "reviewCount": 890,
    "pricePerDay": 210000,
    "pricePerPlate": 5800,
    "minGuests": 60,
    "maxGuests": 250,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "All-inclusive designer ballroom across from Fort Lauderdale Beach. Highly rated on Google for budget transparency, included uplighting, fine linens, and ocean breezes.",
    "amenities": [
      "All Decor & Centerpieces Included",
      "Atlantic Ocean Views",
      "In-House Banquet Coordination Staff",
      "Custom Outside Catering Welcome"
    ],
    "availableDates": [
      {
        "date": "2026-11-06",
        "status": "available"
      },
      {
        "date": "2026-11-20",
        "status": "available"
      },
      {
        "date": "2026-12-04",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-us-10",
    "name": "Grand Wailea Oceanfront Chapel & Lawns",
    "country": "usa",
    "city": "Maui, Hawaii",
    "location": "hawaii",
    "locationLabel": "3850 Wailea Alanui Dr, Wailea, HI 96753, United States",
    "coordinates": {
      "lat": 20.6865,
      "lng": -156.4428
    },
    "type": "Pacific Oceanfront Resort",
    "categoryTag": "beach",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJgrand_wailea_maui_hawaii",
    "googleRating": 4.98,
    "googleReviewCount": 4200,
    "googleMapsUrl": "https://maps.google.com/?q=Grand+Wailea+Maui+Hawaii",
    "rating": 4.98,
    "reviewCount": 4200,
    "pricePerDay": 1950000,
    "pricePerPlate": 17500,
    "minGuests": 50,
    "maxGuests": 400,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Breathtaking 40-acre oceanfront sanctuary on Maui golden sands. Features a seaside stained-glass wedding chapel, Molokini lookout lawn, and Pacific sunset receptions.",
    "amenities": [
      "Seaside Glass Wedding Chapel",
      "Private Beachfront Lawn",
      "Traditional Hawaiian Torch Lighting Ceremony",
      "Luxury Lagoon Pools"
    ],
    "availableDates": [
      {
        "date": "2026-11-12",
        "status": "available"
      },
      {
        "date": "2026-11-26",
        "status": "available"
      },
      {
        "date": "2026-12-14",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-1",
    "name": "Casa Loma Gothic Castle",
    "country": "canada",
    "city": "Toronto, Ontario",
    "location": "toronto",
    "locationLabel": "1 Austin Terrace, Toronto, ON M5R 1X8, Canada",
    "coordinates": {
      "lat": 43.678,
      "lng": -79.4094
    },
    "type": "Gothic Revival Castle",
    "categoryTag": "heritage",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJcasa_loma_toronto_on",
    "googleRating": 4.93,
    "googleReviewCount": 5120,
    "googleMapsUrl": "https://maps.google.com/?q=Casa+Loma+Toronto+Canada",
    "rating": 4.93,
    "reviewCount": 5120,
    "pricePerDay": 1550000,
    "pricePerPlate": 13500,
    "minGuests": 100,
    "maxGuests": 550,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Canada’s only authentic landmark castle, complete with soaring battlements, secret passageways, an exquisite glass conservatory ceiling, and 5 acres of English gardens.",
    "amenities": [
      "Glass Conservatory with Italian Stained Glass",
      "Great Hall with 60ft Soaring Ceilings",
      "Historic Terrace overlooking Toronto Skyline",
      "Bridal Dressing Tower"
    ],
    "availableDates": [
      {
        "date": "2026-11-07",
        "status": "available"
      },
      {
        "date": "2026-11-21",
        "status": "available"
      },
      {
        "date": "2026-12-05",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-2",
    "name": "Pearson Convention Center",
    "country": "canada",
    "city": "Brampton / Mississauga, ON",
    "location": "toronto",
    "locationLabel": "2638 Steeles Ave E, Brampton, ON L6T 4L7, Canada",
    "coordinates": {
      "lat": 43.7224,
      "lng": -79.6842
    },
    "type": "Massive Wedding Convention Center",
    "categoryTag": "community_budget",
    "priceTier": "budget",
    "googlePlaceId": "ChIJpearson_convention_brampton",
    "googleRating": 4.56,
    "googleReviewCount": 3850,
    "googleMapsUrl": "https://maps.google.com/?q=Pearson+Convention+Center+Brampton",
    "rating": 4.56,
    "reviewCount": 3850,
    "pricePerDay": 280000,
    "pricePerPlate": 4500,
    "minGuests": 200,
    "maxGuests": 2200,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "One of Greater Toronto’s largest and most famous multicultural wedding centers in Brampton. Handles huge South Asian and multicultural celebrations with high-tech audio-visual rigging.",
    "amenities": [
      "Capacity Up to 2,200 Guests",
      "6 Sub-Dividable Grand Ballrooms",
      "Massive Free Parking for 1,000 Cars",
      "Outside Approved Indian Catering Kitchens"
    ],
    "availableDates": [
      {
        "date": "2026-11-14",
        "status": "available"
      },
      {
        "date": "2026-11-28",
        "status": "available"
      },
      {
        "date": "2026-12-12",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-3",
    "name": "Liberty Grand Entertainment Complex",
    "country": "canada",
    "city": "Toronto, Ontario",
    "location": "toronto",
    "locationLabel": "25 British Columbia Rd, Exhibition Place, Toronto, ON M6K 3C3, Canada",
    "coordinates": {
      "lat": 43.6332,
      "lng": -79.4215
    },
    "type": "Historic Beaux-Arts Grand Ballroom",
    "categoryTag": "banquet",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJliberty_grand_toronto_on",
    "googleRating": 4.67,
    "googleReviewCount": 2980,
    "googleMapsUrl": "https://maps.google.com/?q=Liberty+Grand+Toronto+Canada",
    "rating": 4.67,
    "reviewCount": 2980,
    "pricePerDay": 620000,
    "pricePerPlate": 7800,
    "minGuests": 150,
    "maxGuests": 1500,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Overlooking Lake Ontario at Exhibition Place. Built in 1926 in Beaux-Arts style with 27-foot ceilings, arched windows, and an open European courtyard with iron gazebos.",
    "amenities": [
      "Lakeside Ceremony Courtyard",
      "Heritage 27ft Arched Ceilings",
      "Capacity up to 1,500 Guests",
      "World-Class Executive Chef Team"
    ],
    "availableDates": [
      {
        "date": "2026-11-13",
        "status": "available"
      },
      {
        "date": "2026-11-20",
        "status": "available"
      },
      {
        "date": "2026-12-04",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-4",
    "name": "The Venetian Banquet & Hospitality Centre",
    "country": "canada",
    "city": "Vaughan, Ontario",
    "location": "toronto",
    "locationLabel": "219 Romina Dr, Vaughan, ON L4K 4V3, Canada",
    "coordinates": {
      "lat": 43.8052,
      "lng": -79.5241
    },
    "type": "Modern Crystal Banquet Centre",
    "categoryTag": "banquet",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJvenetian_banquet_vaughan",
    "googleRating": 4.62,
    "googleReviewCount": 1640,
    "googleMapsUrl": "https://maps.google.com/?q=The+Venetian+Banquet+Vaughan+ON",
    "rating": 4.62,
    "reviewCount": 1640,
    "pricePerDay": 360000,
    "pricePerPlate": 5200,
    "minGuests": 100,
    "maxGuests": 900,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Premier Vaughan wedding destination featuring grand Roman arches, imported Venetian crystal chandeliers, and dynamic intelligent LED architecture.",
    "amenities": [
      "Venetian Crystal Chandeliers",
      "Custom LED Ceiling Color Programming",
      "Separate Cocktail Foyer Area",
      "Dedicated Bridal Suites with Private Restrooms"
    ],
    "availableDates": [
      {
        "date": "2026-11-06",
        "status": "available"
      },
      {
        "date": "2026-11-27",
        "status": "available"
      },
      {
        "date": "2026-12-18",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-5",
    "name": "Steam Whistle Brewery Historic Roundhouse",
    "country": "canada",
    "city": "Downtown Toronto, ON",
    "location": "toronto",
    "locationLabel": "255 Bremner Blvd, Toronto, ON M5V 3M9, Canada",
    "coordinates": {
      "lat": 43.6415,
      "lng": -79.3858
    },
    "type": "Industrial Brick Loft & Roundhouse",
    "categoryTag": "urban_loft",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJsteam_whistle_roundhouse_toronto",
    "googleRating": 4.74,
    "googleReviewCount": 2200,
    "googleMapsUrl": "https://maps.google.com/?q=Steam+Whistle+Brewing+Toronto",
    "rating": 4.74,
    "reviewCount": 2200,
    "pricePerDay": 480000,
    "pricePerPlate": 8400,
    "minGuests": 60,
    "maxGuests": 300,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Situated at the base of the CN Tower in Roundhouse Park. Heritage railway roundhouse with rustic exposed brick, heavy wooden fir timbers, and huge floor-to-ceiling windows.",
    "amenities": [
      "Views of the Iconic CN Tower",
      "Rustic Rail Heritage Architecture",
      "Outdoor Patio Overlooking the Park",
      "Fresh Craft Drafts Included on Tap"
    ],
    "availableDates": [
      {
        "date": "2026-11-15",
        "status": "available"
      },
      {
        "date": "2026-11-22",
        "status": "available"
      },
      {
        "date": "2026-12-06",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-6",
    "name": "Fairmont Banff Springs (\"The Castle in the Rockies\")",
    "country": "canada",
    "city": "Banff, Alberta",
    "location": "banff",
    "locationLabel": "405 Spray Ave, Banff, AB T1L 1J4, Canada",
    "coordinates": {
      "lat": 51.1643,
      "lng": -115.5622
    },
    "type": "Alpine Castle Resort",
    "categoryTag": "heritage",
    "priceTier": "luxury",
    "googlePlaceId": "ChIJfairmont_banff_springs_alberta",
    "googleRating": 4.98,
    "googleReviewCount": 6100,
    "googleMapsUrl": "https://maps.google.com/?q=Fairmont+Banff+Springs+Hotel",
    "rating": 4.98,
    "reviewCount": 6100,
    "pricePerDay": 1850000,
    "pricePerPlate": 15000,
    "minGuests": 80,
    "maxGuests": 500,
    "featured": true,
    "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "A UNESCO World Heritage icon in Banff National Park. Surrounded by snow-dusted alpine summits, Bow Falls, and baronial Scottish baronial halls with stone fireplaces.",
    "amenities": [
      "Mount Stephen Grand Ballroom",
      "Outdoor Terrace with 360° Rocky Mountain View",
      "Willow Stream Mineral Spa",
      "Private Heated Saltwater Pools"
    ],
    "availableDates": [
      {
        "date": "2026-11-14",
        "status": "available"
      },
      {
        "date": "2026-11-28",
        "status": "available"
      },
      {
        "date": "2026-12-18",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-7",
    "name": "Canmore Coast Hotel & Grassi Lakes Ballroom",
    "country": "canada",
    "city": "Canmore / Banff, Alberta",
    "location": "banff",
    "locationLabel": "511 Bow Valley Trail, Canmore, AB T1W 1N7, Canada",
    "coordinates": {
      "lat": 51.0921,
      "lng": -115.3524
    },
    "type": "Affordable Mountain Ballroom & Lawns",
    "categoryTag": "community_budget",
    "priceTier": "budget",
    "googlePlaceId": "ChIJcoast_canmore_hotel_ab",
    "googleRating": 4.46,
    "googleReviewCount": 1820,
    "googleMapsUrl": "https://maps.google.com/?q=Coast+Canmore+Hotel+Conference+Centre",
    "rating": 4.46,
    "reviewCount": 1820,
    "pricePerDay": 190000,
    "pricePerPlate": 4000,
    "minGuests": 60,
    "maxGuests": 350,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Affordable Canadian Rockies wedding venue in Canmore, minutes from Banff. Surrounded by the Three Sisters mountain peaks with open-air courtyard vows.",
    "amenities": [
      "Three Sisters Mountain Vista Backdrop",
      "Full Conference Center & Ballroom",
      "Budget-Friendly Group Lodging Rates",
      "Indoor Heated Pool"
    ],
    "availableDates": [
      {
        "date": "2026-11-07",
        "status": "available"
      },
      {
        "date": "2026-11-21",
        "status": "available"
      },
      {
        "date": "2026-12-05",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-8",
    "name": "Brock House Estate & Jericho Beach Lawns",
    "country": "canada",
    "city": "Vancouver, BC",
    "location": "vancouver",
    "locationLabel": "3875 Point Grey Rd, Vancouver, BC V6R 1B3, Canada",
    "coordinates": {
      "lat": 49.2725,
      "lng": -123.1974
    },
    "type": "Heritage Waterfront Estate",
    "categoryTag": "beach",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJbrock_house_estate_vancouver",
    "googleRating": 4.89,
    "googleReviewCount": 1275,
    "googleMapsUrl": "https://maps.google.com/?q=Brock+House+Restaurant+Vancouver",
    "rating": 4.89,
    "reviewCount": 1275,
    "pricePerDay": 980000,
    "pricePerPlate": 11500,
    "minGuests": 60,
    "maxGuests": 300,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Heritage Tudor revival mansion situated directly on Jericho Beach overlooking the North Shore Mountains and Pacific Ocean. Garden ceremonies on expansive green lawns.",
    "amenities": [
      "Direct Waterfront Lawn Access",
      "Glass-Walled Garden Marquee Tent",
      "Spectacular Sunset Views across English Bay",
      "Bridal Suite with Ocean Views"
    ],
    "availableDates": [
      {
        "date": "2026-11-15",
        "status": "available"
      },
      {
        "date": "2026-11-22",
        "status": "available"
      },
      {
        "date": "2026-12-12",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-9",
    "name": "The Pipe Shop at the Shipyards",
    "country": "canada",
    "city": "North Vancouver, BC",
    "location": "vancouver",
    "locationLabel": "115 Victory Ship Way, North Vancouver, BC V7L 0B2, Canada",
    "coordinates": {
      "lat": 49.3112,
      "lng": -123.0815
    },
    "type": "Restored Waterfront Timber Hall",
    "categoryTag": "urban_loft",
    "priceTier": "mid_range",
    "googlePlaceId": "ChIJpipe_shop_shipyards_vancouver",
    "googleRating": 4.75,
    "googleReviewCount": 840,
    "googleMapsUrl": "https://maps.google.com/?q=The+Pipe+Shop+North+Vancouver",
    "rating": 4.75,
    "reviewCount": 840,
    "pricePerDay": 420000,
    "pricePerPlate": 6800,
    "minGuests": 80,
    "maxGuests": 360,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Historic wooden shipyard hall built in the 1940s on the North Vancouver waterfront. Features 9,000 sq ft of open timber space with views of Vancouver downtown skyline.",
    "amenities": [
      "Vancouver Skyline Waterfront Views",
      "9,000 sq ft Open Rustic Heritage Space",
      "Open Catering & Bartending Policy",
      "Lonsdale Quay Seabus Ferry Proximity"
    ],
    "availableDates": [
      {
        "date": "2026-11-08",
        "status": "available"
      },
      {
        "date": "2026-11-22",
        "status": "available"
      },
      {
        "date": "2026-12-06",
        "status": "available"
      }
    ]
  },
  {
    "id": "v-ca-10",
    "name": "Westwood Plateau Golf & Country Club",
    "country": "canada",
    "city": "Coquitlam / Vancouver, BC",
    "location": "vancouver",
    "locationLabel": "3251 Plateau Blvd, Coquitlam, BC V3E 3B8, Canada",
    "coordinates": {
      "lat": 49.3175,
      "lng": -122.7845
    },
    "type": "Mountainside Wooden Clubhouse & Fairways",
    "categoryTag": "country_club",
    "priceTier": "budget",
    "googlePlaceId": "ChIJwestwood_plateau_golf_club",
    "googleRating": 4.62,
    "googleReviewCount": 1420,
    "googleMapsUrl": "https://maps.google.com/?q=Westwood+Plateau+Golf+Country+Club",
    "rating": 4.62,
    "reviewCount": 1420,
    "pricePerDay": 220000,
    "pricePerPlate": 4600,
    "minGuests": 60,
    "maxGuests": 250,
    "featured": false,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "Nestled on the slopes of Eagle Mountain above Vancouver. Soaring cedar beam timber ceilings, floor-to-ceiling glass windows, and romantic panoramic valley views at great value.",
    "amenities": [
      "Eagle Mountain Valley Panoramic Views",
      "Cathedral Cedar Post-and-Beam Ceilings",
      "Outdoor Fairway Ceremony Lawn",
      "Full In-House Banquet Staff"
    ],
    "availableDates": [
      {
        "date": "2026-11-13",
        "status": "available"
      },
      {
        "date": "2026-11-27",
        "status": "available"
      },
      {
        "date": "2026-12-11",
        "status": "available"
      }
    ]
  }
];

export const CATERING_SERVICES = [
  // --- INDIA CATERING ---
  {
    id: 'c1',
    name: 'Shahi Dastarkhwan & Mewari Feast',
    country: 'india',
    city: 'Udaipur',
    location: 'udaipur',
    locationLabel: 'Servicing Udaipur & Rajasthan Heritage Hubs',
    coordinates: { lat: 24.5854, lng: 73.7125 }, // 4 km from Udaivilas
    deliverableRadiusKm: 150,
    rating: 4.94,
    reviewCount: 184,
    pricePerPlate: 3200, // INR
    minGuests: 100,
    maxGuests: 1200,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    cuisines: ['Royal Rajasthani', 'Awadhi Dum', 'Modern Mughlai'],
    dietaryOptions: ['Jain Counter Available', '100% Pure Veg Tiers', 'Halal Meat Options', 'Nut-Free Safety'],
    serviceIncluded: ['Uniformed Mewari Turban Waitstaff', 'Handcrafted Copper & Silver Chafers', 'Live Clay Tandoor & Chaat Carts', 'Artisanal Mocktail Mixology Bar'],
    menu: {
      welcomeDrinks: [
        { name: 'Kesar Pista Thandai (Chilled Clay Kulhads)', description: 'Saffron-infused rich almond and pistachio milk' },
        { name: 'Smoked Gulab & Basil Sparkler', description: 'Organic Damask rose petals with fresh holy basil and effervescence' }
      ],
      appetizers: [
        { name: 'Dahi Ke Kebab with Mint Emulsion', description: 'Crisp exterior with hung curd, green chilies, and coriander heart' },
        { name: 'Truffle-infused Bhatti Paneer Tikka', description: 'Cottage cheese steeped in black truffle oil and char-grilled' },
        { name: 'Mutton Galouti on Saffron Sheermal', description: 'Melt-in-mouth Awadhi spiced lamb medallions over delicate mini sweet breads' }
      ],
      liveCounters: [
        { name: 'Purani Dilli Chaat Bazzar', description: 'Gol gappe with 5 artisanal flavored waters, crisp Palak Patta chaat, and Raj kachori' },
        { name: 'Wood-Fired Dal Baati Churma Kiosk', description: 'Clay-baked baatis dipped in pure desi ghee, Panchmel dal, and 4 churmas' }
      ],
      mains: [
        { name: 'Dal Shahi Makhani (Simmered 36 Hours)', description: 'Slow-cooked black lentils with white butter and vine-ripened tomatoes' },
        { name: 'Paneer Kundan Qaliyan', description: 'Paneer batons in a silken gravy perfumed with saffron and crushed cardamom' },
        { name: 'Lal Maas with Mathania Chillies', description: 'Classic Rajasthani royal slow-braised tender goat in smoke-infused red pepper gravy' }
      ],
      desserts: [
        { name: 'Warm Baked Jalebi Caviar with Rabdi Cannoli', description: 'Mini saffron jalebi pearls over condensed pistachio milk' },
        { name: 'Shahi Moong Dal Halwa with Gold Leaf', description: 'Pure ghee roasted lentils topped with edible 24k gold leaf' }
      ]
    }
  },
  {
    id: 'c2',
    name: 'Coastal Spice & Beach Seafood Catering',
    country: 'india',
    city: 'Goa',
    location: 'goa',
    locationLabel: 'Servicing North & South Goa Beach Resorts',
    coordinates: { lat: 15.2750, lng: 73.9300 }, // ~3.5 km from Taj Exotica
    deliverableRadiusKm: 80,
    rating: 4.89,
    reviewCount: 142,
    pricePerPlate: 2800,
    minGuests: 50,
    maxGuests: 700,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    cuisines: ['Goan Portuguese', 'Seafood Grills', 'Mediterranean'],
    dietaryOptions: ['Fresh Seafood Catch', 'Vegetarian Gourmet', 'Gluten-Free Options'],
    serviceIncluded: ['Live Beach BBQ Setup', 'Sunset Coconut Bar', 'Bilingual Hospitality Staff'],
    menu: {
      welcomeDrinks: [
        { name: 'Chilled Kokum & Coconut Water Spritzer', description: 'Tangy kokum elixir topped with tender coconut water' }
      ],
      appetizers: [
        { name: 'Butter Garlic Tiger Prawns Skewers', description: 'Succulent coastal prawns tossed with garlic confit and parsley' },
        { name: 'Truffle Mushroom Bruschetta', description: 'Toasted sourdough with wild mushrooms and thyme' }
      ],
      liveCounters: [
        { name: 'Live Charcoal Seafood & Veggie Grill', description: 'Kingfish steaks, calamari, paneer, and peppers grilled to order' }
      ],
      mains: [
        { name: 'Goan Prawn Curry with Red Rice', description: 'Creamy coconut milk stew with dried kokum' },
        { name: 'Paneer Caldine with Okra', description: 'Mild yellow turmeric coconut curry with vegetables' }
      ],
      desserts: [
        { name: 'Traditional 7-Layer Bebinca', description: 'Warm Goan coconut cake served with vanilla gelato' }
      ]
    }
  },

  // --- UNITED STATES CATERING ---
  {
    id: 'c-us-1',
    name: 'Metropolitan Haute Cuisine & Global Fusion',
    country: 'usa',
    city: 'New York',
    location: 'newyork',
    locationLabel: 'Servicing NYC Metro, Long Island & Oheka Castle',
    coordinates: { lat: 40.8100, lng: -73.4300 }, // 4.8 km from Oheka Castle
    deliverableRadiusKm: 120,
    rating: 4.96,
    reviewCount: 265,
    pricePerPlate: 16500, // ~ $195 USD
    minGuests: 75,
    maxGuests: 650,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    cuisines: ['Modern American Fine Dining', 'South Asian Fusion', 'French Classical'],
    dietaryOptions: ['Halal Certified Meats', 'Gluten-Free Stations', 'Kosher-Style & Jain Capable', 'Farm-to-Table Organic'],
    serviceIncluded: ['Butler-Passed Canapes', 'Tuxedo Service Waitstaff', 'Custom Printed Menus', 'Bar Mixologists'],
    menu: {
      welcomeDrinks: [
        { name: 'Blood Orange & Rosemary French 75', description: 'Sparkling citrus champagne with torched botanical sprigs' },
        { name: 'Elderflower Spiced Pear Sparkler', description: 'Crisp organic pear nectar with St. Germain and bubbles' }
      ],
      appetizers: [
        { name: 'A5 Wagyu Beef Carpaccio Medallions', description: 'Thinly sliced Miyazaki Wagyu with truffle aioli on brioche crisp' },
        { name: 'Butter-Poached Maine Lobster Spoons', description: 'Fresh Maine lobster claw with tarragon beurre blanc' },
        { name: 'Crispy Wild Mushroom Polenta Bites', description: 'Crisp herbed polenta cake with chanterelle ragout and aged parmesan' }
      ],
      liveCounters: [
        { name: 'Artisan Raw Bar & Caviar Station', description: 'Montauk oysters, jumbo cocktail prawns, and Oscietra caviar with blinis' },
        { name: 'Handcrafted Truffle Pasta Station', description: 'Freshly extruded agnolotti finished in 24-month Parmigiano wheel' }
      ],
      mains: [
        { name: 'Dry-Aged Prime Filet Mignon', description: 'Center-cut tenderloin with port wine demi-glace and truffled potato purée' },
        { name: 'Pan-Seared Chilean Sea Bass', description: 'Sustainably caught sea bass with saffron velouté and baby spring vegetables' },
        { name: 'Wild Morel Mushroom Risotto', description: 'Acquerello carnaroli rice with forest morels, sweet peas, and mascarpone' }
      ],
      desserts: [
        { name: 'Valrhona Grand Cru Chocolate Spheres', description: 'Warm salted caramel sauce poured tableside to reveal gold-dusted mousse' },
        { name: 'Artisan Mini Dessert Trio Display', description: 'Raspberry macarons, Meyer lemon tartlets, and espresso tiramisu cups' }
      ]
    }
  },
  {
    id: 'c-us-2',
    name: 'Napa Valley Culinary Artisans & Wine Pairing',
    country: 'usa',
    city: 'St. Helena, Napa Valley',
    location: 'california',
    locationLabel: 'Servicing St. Helena, Yountville & Sonoma Vineyards',
    coordinates: { lat: 38.5100, lng: -122.4700 }, // 2.5 km from Meadowood Napa
    deliverableRadiusKm: 100,
    rating: 4.95,
    reviewCount: 198,
    pricePerPlate: 15500, // ~ $185 USD
    minGuests: 50,
    maxGuests: 450,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    cuisines: ['California Farm-to-Table', 'Sonoma Coastal Grills', 'Artisan Italian'],
    dietaryOptions: ['100% Certified Organic', 'Vegan Tasting Menu', 'Gluten-Free Artisanal'],
    serviceIncluded: ['Sommelier Guided Wine Service', 'Live Open-Fire Wood Oven', 'Family-Style or French Plated'],
    menu: {
      welcomeDrinks: [
        { name: 'Napa Valley Peach & Verbena Spritzer', description: 'Fresh local yellow peaches with Meyer lemon verbena and sparkling wine' }
      ],
      appetizers: [
        { name: 'Sonoma Goat Cheese & Fig Crostini', description: 'Whipped chèvre with black mission figs and lavender honey' },
        { name: 'Charred Spanish Octopus Skewers', description: 'Smoked paprika and fingerling potato coin with chimichurri' }
      ],
      liveCounters: [
        { name: 'Wood-Fired Vineyard Flatbreads & Charcuterie', description: 'Artisan salumi, local Point Reyes cheeses, and honeycomb' }
      ],
      mains: [
        { name: 'Wood-Grilled Heritage Ribeye', description: 'Oak-charred prime ribeye with bone marrow jus and wild mushrooms' },
        { name: 'Petaluma Poulet Rouge with Truffles', description: 'Organic roast chicken supreme with black winter truffles' }
      ],
      desserts: [
        { name: 'Napa Berry Galette with Vanilla Bean Gelato', description: 'Flaky butter pastry with wild blackberries and olallieberries' }
      ]
    }
  },

  // --- CANADA CATERING ---
  {
    id: 'c-ca-1',
    name: 'Royal York & Chateau Culinary Group',
    country: 'canada',
    city: 'Toronto, Ontario',
    location: 'toronto',
    locationLabel: 'Servicing Greater Toronto, Casa Loma & Niagara Estates',
    coordinates: { lat: 43.6700, lng: -79.4000 }, // 1.8 km from Casa Loma
    deliverableRadiusKm: 140,
    rating: 4.93,
    reviewCount: 310,
    pricePerPlate: 12500, // ~ $200 CAD
    minGuests: 80,
    maxGuests: 750,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    cuisines: ['Canadian Contemporary', 'South Asian Royal Menus', 'French Classical'],
    dietaryOptions: ['Jain & Pure Veg Dedicated Chefs', 'Halal Certified', 'Sustainable Canadian Seafood'],
    serviceIncluded: ['Silver Service Plating', 'Ice Sculpture Seafood Display', 'Uniformed Sommelier Team'],
    menu: {
      welcomeDrinks: [
        { name: 'Niagara Icewine & Apple Blossom Sparkler', description: 'VQA Niagara Vidal icewine topped with dry prosecco and edible orchid' },
        { name: 'Smoked Maple & Cranberry Fizz', description: 'Ontario pure amber maple syrup with cold-pressed cranberries' }
      ],
      appetizers: [
        { name: 'Atlantic Crab & Avocado Roulade', description: 'Fogo Island crab rolled with Haas avocado and micro chervil' },
        { name: 'Braised Alberta Short Rib Yorkshire Puddings', description: 'Mini Yorkshire pudding bites filled with tender beef and horseradish crema' },
        { name: 'Quebec Duck Confit Croquette', description: 'Crispy panko crust with sour cherry compote' }
      ],
      liveCounters: [
        { name: 'Pacific Salmon & Maritime Lobster Station', description: 'Cedar-plank wild sockeye salmon and hot butter Maritime lobster rolls' }
      ],
      mains: [
        { name: 'Alberta AAA Beef Tenderloin', description: 'Center-cut filet with red wine demi-glace and Yukon gold dauphinoise' },
        { name: 'BC Halibut with Sweet Corn Velouté', description: 'Pan-seared halibut with chanterelles and summer peas' },
        { name: 'Roasted Butternut Squash & Truffle Gnocchi', description: 'Hand-rolled potato gnocchi with sage brown butter and pine nuts' }
      ],
      desserts: [
        { name: 'Maple Bourbon Crème Brûlée', description: 'Rich caramelized custard with Canadian maple sugar crust' },
        { name: 'Warm Apple Tarte Tatin with Cheddar Gelato', description: 'Caramelized Honeycrisp apples with artisanal Ontario cheddar swirl' }
      ]
    }
  },
  {
    id: 'c-ca-2',
    name: 'Rocky Mountain Alpine Feast Caterers',
    country: 'canada',
    city: 'Banff, Alberta',
    location: 'banff',
    locationLabel: 'Servicing Banff, Canmore & Lake Louise',
    coordinates: { lat: 51.1700, lng: -115.5600 }, // 1.2 km from Fairmont Banff Springs
    deliverableRadiusKm: 90,
    rating: 4.96,
    reviewCount: 220,
    pricePerPlate: 14000, // ~ $225 CAD
    minGuests: 50,
    maxGuests: 500,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    cuisines: ['Rocky Mountain Game & Foraged', 'Pacific Northwest', 'European Alpine'],
    dietaryOptions: ['Wild Foraged Vegetarian', 'Gluten-Free Gourmet', 'Halal Capable'],
    serviceIncluded: ['Fireside Platter Presentation', 'Lodge Uniformed Staff', 'Ice Carving Bars'],
    menu: {
      welcomeDrinks: [
        { name: 'Alpine Pine Needle & Juniper Elixir', description: 'Infused spruce tips with local honey and bubbly cider' }
      ],
      appetizers: [
        { name: 'Smoked Alberta Bison Tartare', description: 'Hand-diced bison with quail egg yolk and kettle potato crisps' },
        { name: 'Wild Forest Morel Mushroom Tartlets', description: 'Puff pastry shells with foraged morels and alpine gruyere' }
      ],
      liveCounters: [
        { name: 'Live Carvery: Slow-Roasted Alberta Prime Rib', description: 'Salt-crusted whole roast beef carved to order with natural jus and popovers' }
      ],
      mains: [
        { name: 'Pan-Seared Arctic Char', description: 'Crispy skin Arctic char with wild rice pilaf and lemon tarragon emulsion' },
        { name: 'Roasted Root Vegetable Pithivier', description: 'French dome pastry layered with roasted parsnips, beets, and goat cheese' }
      ],
      desserts: [
        { name: 'Saskatoon Berry Cobbler Skillets', description: 'Warm prairie berry compote with sweet biscuit topping and vanilla cream' }
      ]
    }
  }
];

export const DECOR_SERVICES = [
  // --- INDIA DECOR ---
  {
    id: 'd1',
    name: 'Vedic Royals Heritage Mandap & Decor',
    country: 'india',
    city: 'Udaipur',
    location: 'udaipur',
    locationLabel: 'Udaipur & Rajasthan Palaces',
    coordinates: { lat: 24.5800, lng: 73.6900 }, // ~2.8 km from Udaivilas
    deliverableRadiusKm: 200,
    rating: 4.97,
    reviewCount: 165,
    priceStarting: 450000,
    capacityCoverage: 'Up to 1000 Guests / 20,000 sq ft Area',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    theme: 'Royal Rajasthani Heritage',
    offerings: {
      mandap: 'Grand 4-pillar carved teakwood Mandap with 10,000 fresh Rajnigandha, red Dutch roses and golden kalash tops',
      entrance: '75-foot royal floral tunnel with hanging brass bells, hand-painted Mewari jharokhas, and water fountains with floating diyas',
      seating: 'Royal Maharaja throne chairs for couple, velvet banquet seating for families, and 500 gold Chiavari chairs',
      lighting: 'Warm ambient architectural uplighting, 14 crystal chandeliers, fairy light forest canopy, and stage moving heads',
      photobooth: 'Vintage palace courtyard photobooth with antique brass jhula (swing) surrounded by fresh marigolds',
      soundStage: 'Stage backdrop with acoustic draping, LED video walls (P2.9), and haze machines for varmala entry'
    },
    packages: [
      { name: 'Heritage Classic', price: 450000, guestsFedOrCovered: 'Up to 350 Guests', description: 'Traditional marigold & tuberose theme with hand-carved mandap.' },
      { name: 'Royal Grandeur (Most Popular)', price: 750000, guestsFedOrCovered: 'Up to 750 Guests', description: 'Floral tunnel, crystal chandeliers, mirror varmala stage, and ambient uplighting.' },
      { name: 'Imperial Maharaja Luxury', price: 1250000, guestsFedOrCovered: 'Up to 1500 Guests', description: 'Exotic Dutch imported florals, 20-foot palace facade structure, and cold-pyro setup.' }
    ]
  },
  {
    id: 'd2',
    name: 'Bohemian Sunset Dreams & Beach Decor',
    country: 'india',
    city: 'Goa',
    location: 'goa',
    locationLabel: 'Goa Coastal Resorts',
    coordinates: { lat: 15.2600, lng: 73.9200 }, // 1.2 km from Taj Exotica
    deliverableRadiusKm: 100,
    rating: 4.91,
    reviewCount: 128,
    priceStarting: 320000,
    capacityCoverage: 'Up to 600 Guests / Beachfront Lawn & Sands',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    theme: 'Bohemian Tropical Beachside',
    offerings: {
      mandap: 'Open-air bamboo gazebo Mandap with pampas grass, white baby breath clouds, macrame arches, and sea view backdrop',
      entrance: 'Barefoot pathway flanked by driftwood lanterns, sea shells, palm fronds, and fairy light festoons',
      seating: 'Rustic wooden cross-back chairs, cane lounge seating with linen cushions, and beach cabanas',
      lighting: 'Edison bulb strings, rattan woven pendant lights, bonfire lounge, and sunset mood spotlights',
      photobooth: 'Surfboard & tropical floral archway with neon sign "Always & Forever"',
      soundStage: 'Acoustic beach pergola stage with warm floor wash and fairy-lit dance floor'
    },
    packages: [
      { name: 'Sunset Boho Essentials', price: 320000, guestsFedOrCovered: 'Up to 250 Guests', description: 'Beach gazebo mandap with pampas grass and festoon canopy.' },
      { name: 'Coastal Romance Luxury', price: 550000, guestsFedOrCovered: 'Up to 600 Guests', description: 'Full beach setup with custom cabanas, neon dance floor, and ceiling floral clouds.' }
    ]
  },

  // --- UNITED STATES DECOR & FLORAL ---
  {
    id: 'd-us-1',
    name: 'Manhattan Grandeur Floral & Scenography',
    country: 'usa',
    city: 'New York',
    location: 'newyork',
    locationLabel: 'Servicing Oheka Castle, Long Island & Manhattan',
    coordinates: { lat: 40.8350, lng: -73.4400 }, // 1.2 km from Oheka Castle
    deliverableRadiusKm: 150,
    rating: 4.98,
    reviewCount: 240,
    priceStarting: 1250000, // ~ $15,000 USD
    capacityCoverage: 'Up to 600 Guests / Grand Ballroom & Grounds',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    theme: 'Opulent French Chateau & White Rose Luxury',
    offerings: {
      mandap: 'Crystal-draped Acrylic Altar/Mandap surrounded by 8,000 Ecuadorian white roses, hydrangeas, and trailing orchids',
      entrance: 'Mirrored runway aisle lined with 4-foot crystal candelabras and lush floral hedge borders',
      seating: 'French Louis XVI gold scroll chairs, mirrored dining tables, and crystal beaded glassware',
      lighting: 'Computerized intelligent architectural pin-spotting, motorized crystal chandeliers, and warm amber perimeter wash',
      photobooth: 'Custom 3D floral hedge wall with gold mirrored monogram crest and champagne glass wall',
      soundStage: 'Seamless white high-gloss wrap dance floor with gold decal monogram and tiered stage draping'
    },
    packages: [
      { name: 'Classic Chateau Elegance', price: 1250000, guestsFedOrCovered: 'Up to 250 Guests', description: 'Ceremony floral arch/mandap, 15 elevated table centerpieces, and aisle candles.' },
      { name: 'Royal Oheka Grandeur', price: 2100000, guestsFedOrCovered: 'Up to 450 Guests', description: 'Full castle takeover: mirrored runway, floral ceiling installations, custom dance floor, and uplighting.' }
    ]
  },
  {
    id: 'd-us-2',
    name: 'Sonoma Botanicals & Wine Country Floral',
    country: 'usa',
    city: 'St. Helena, Napa Valley',
    location: 'california',
    locationLabel: 'Servicing St. Helena, Napa Valley & Sonoma',
    coordinates: { lat: 38.5150, lng: -122.4800 }, // 1.1 km from Meadowood Napa
    deliverableRadiusKm: 110,
    rating: 4.93,
    reviewCount: 165,
    priceStarting: 950000, // ~ $11,400 USD
    capacityCoverage: 'Up to 400 Guests / Vineyard Estate Grounds',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    theme: 'Organic Vineyard Bohemian & Olive Branch Romance',
    offerings: {
      mandap: 'Rustic reclaimed oak vineyard pergola draped in trailing olive branches, blush dahlias, and garden roses',
      entrance: 'Barrel-lined entryway with distressed wine crates, glowing pillar candles, and wild greenery garland',
      seating: 'French cross-back wooden bistro chairs and reclaimed farm tables with Belgian linen runners',
      lighting: 'Bistro festoon market lights suspended between olive trees and amber glass lanterns',
      photobooth: 'Vintage wine barrel display with personalized calligraphy scroll and Polaroid floral bar',
      soundStage: 'Low-profile wooden pergola stage with warm acoustic spotlights and fairy-lit wood canopy'
    },
    packages: [
      { name: 'Napa Meadow Essentials', price: 950000, guestsFedOrCovered: 'Up to 200 Guests', description: 'Vineyard pergola altar, farm table garlands, and market lighting.' },
      { name: 'Reserve Vintage Luxury', price: 1650000, guestsFedOrCovered: 'Up to 400 Guests', description: 'Full woodland takeover: suspended floral chandeliers, lounge cabanas, and custom dance floor.' }
    ]
  },

  // --- CANADA DECOR & FLORAL ---
  {
    id: 'd-ca-1',
    name: 'Castle Scenography & Royal Floral Atelier',
    country: 'canada',
    city: 'Toronto, Ontario',
    location: 'toronto',
    locationLabel: 'Servicing Toronto, Casa Loma & Niagara Escarpment',
    coordinates: { lat: 43.6800, lng: -79.4100 }, // 0.8 km from Casa Loma
    deliverableRadiusKm: 130,
    rating: 4.95,
    reviewCount: 220,
    priceStarting: 980000, // ~ $16,000 CAD
    capacityCoverage: 'Up to 600 Guests / Historic Castle Great Halls',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    theme: 'Romantic Gothic Castle & Crystal Fantasy',
    offerings: {
      mandap: 'Majestic floral arches and Mandap under the stained-glass conservatory ceiling with ivory peonies and English ivy',
      entrance: 'Stone spiral staircase cascading with 1,000 fresh white hydrangeas, roses, and floating glass cylinder candles',
      seating: 'Ghost Chiavari chairs, velvet banquettes, and mirrored tabletop runners with crystal candelabras',
      lighting: 'Custom computerized architectural wash highlighting stone masonry and motorized crystal chandeliers',
      photobooth: 'Antique Victorian lounge corner with velvet Chesterfield sofa and gilded baroque mirrors',
      soundStage: 'Concert-grade acoustic stage draping with cold-spark fountain effects for couple entry'
    },
    packages: [
      { name: 'Castle Elegance', price: 980000, guestsFedOrCovered: 'Up to 250 Guests', description: 'Conservatory altar arch, grand staircase florals, and 18 guest table centerpieces.' },
      { name: 'Imperial Casa Sovereign', price: 1750000, guestsFedOrCovered: 'Up to 550 Guests', description: 'Full estate styling: staircase cascades, suspended floral chandeliers, and intelligent lighting.' }
    ]
  },
  {
    id: 'd-ca-2',
    name: 'Rocky Mountain Pine & Floral Artistry',
    country: 'canada',
    city: 'Banff, Alberta',
    location: 'banff',
    locationLabel: 'Servicing Banff Springs, Lake Louise & Canmore',
    coordinates: { lat: 51.1680, lng: -115.5680 }, // 0.9 km from Fairmont Banff Springs
    deliverableRadiusKm: 120,
    rating: 4.97,
    reviewCount: 185,
    priceStarting: 850000, // ~ $14,000 CAD
    capacityCoverage: 'Up to 500 Guests / Alpine Ballrooms & Terraces',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    theme: 'Alpine Elegance & Mountain Wildflower Romance',
    offerings: {
      mandap: 'Handcrafted birchwood and cedar Mandap/Altar overlooking snow-capped mountain peaks with white roses and eucalyptus',
      entrance: 'Stone archway lined with natural wood lanterns, evergreen boughs, and warm flickering candles',
      seating: 'Dark mahogany Chiavari chairs with faux-fur throw accents for outdoor mountain terrace',
      lighting: 'Edison bulb canopies, stone fireplace accent uplighting, and warm starry-night ceiling wash',
      photobooth: 'Vintage ski lodge photobooth with antique wooden snowshoes and customized couple crest',
      soundStage: 'Rustic mountain timber stage with warm floor wash and snow-globe confetti cannons'
    },
    packages: [
      { name: 'Alpine Vista Essentials', price: 850000, guestsFedOrCovered: 'Up to 200 Guests', description: 'Outdoor mountain terrace birch arch, lantern aisle, and fireplace florals.' },
      { name: 'Majestic Peaks Luxury', price: 1450000, guestsFedOrCovered: 'Up to 500 Guests', description: 'Full grand ballroom transformation, ceiling evergreen chandeliers, and mountain photo lounge.' }
    ]
  }
];

export const PHOTOGRAPHY_SERVICES = [
  // --- INDIA PHOTOGRAPHY ---
  {
    id: 'p1',
    name: 'MemoryWeavers Cinema & Fine Art Studios',
    country: 'india',
    city: 'Udaipur',
    location: 'udaipur',
    locationLabel: 'Based in Udaipur (Pan-India Available)',
    coordinates: { lat: 24.5800, lng: 73.7100 }, // ~3.5 km from Udaivilas
    deliverableRadiusKm: 500,
    rating: 4.98,
    reviewCount: 228,
    price: 380000, // INR
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    style: 'Cinematic Documentary & Emotional Fine Art',
    teamSize: 'Crew of 6 (2 Candid Masters, 2 Cinematographers, 1 Drone Pilot, 1 Traditional)',
    deliverables: {
      coverageDays: '3 Full Days Coverage (Mehendi, Sangeet, Wedding & Reception)',
      cinematicTeaser: '3-4 Minute 4K Cinematic Teaser in 10 business days',
      weddingFilm: '25-35 Minute 4K Documentary Wedding Film with curated soundtrack',
      highResPhotos: '1,200+ Color Graded and Retouched High-Resolution Photographs',
      albums: '2 Master Italian Leather-bound Handcrafted Coffee Table Albums',
      droneFootage: 'Licensed 4K Drone Aerial Coverage for Venue & Baraat',
      socialMediaReels: '5 Curated 9:16 Instagram Reels delivered within 24 hours'
    },
    gearList: ['Sony FX6 Cinema Cameras', 'Sony A7R V High-Res Bodies', 'G-Master f/1.2 Primes', 'DJI Mavic 3 Cine 5.1K']
  },

  // --- UNITED STATES PHOTOGRAPHY ---
  {
    id: 'p-us-1',
    name: 'Manhattan Editorial Wedding Cinematography',
    country: 'usa',
    city: 'New York',
    location: 'newyork',
    locationLabel: 'New York City & Long Island Castles',
    coordinates: { lat: 40.7500, lng: -73.9800 }, // Servicing Oheka & Tri-State
    deliverableRadiusKm: 250,
    rating: 4.99,
    reviewCount: 310,
    price: 850000, // ~ $10,200 USD
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    style: 'Vogue Editorial, 35mm Film & Hollywood Cinema',
    teamSize: 'Crew of 5 (2 Lead Editorial Photographers, 2 Cinematographers, 1 FAA Drone Pilot)',
    deliverables: {
      coverageDays: '2 Full Days Coverage (Rehearsal Dinner & Full Wedding Day)',
      cinematicTeaser: '4-Minute 4K Hollywood Teaser delivered in 14 days',
      weddingFilm: '30-40 Minute 4K Feature Documentary with vows audio master',
      highResPhotos: '1,000+ Master Color-Graded Photos with full digital printing rights',
      albums: '2 Fine Art Linen & Leather Keepsake Albums printed in Italy',
      droneFootage: 'FAA Part 107 Licensed 4K Aerials of Chateau & Estate',
      socialMediaReels: '4 Same-Day Vertical Highlight Reels for Instagram'
    },
    gearList: ['RED V-Raptor 8K Cinema', 'Canon R5C Bodies', 'Leica Summilux Primes', 'DJI Inspire 3 Drone']
  },
  {
    id: 'p-us-2',
    name: 'Napa Sunlit Stories & Drone Cinema',
    country: 'usa',
    city: 'St. Helena, Napa Valley',
    location: 'california',
    locationLabel: 'Napa Valley & San Francisco Bay',
    coordinates: { lat: 38.5000, lng: -122.4600 },
    deliverableRadiusKm: 200,
    rating: 4.96,
    reviewCount: 190,
    price: 720000, // ~ $8,600 USD
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    style: 'Sun-Drenched Golden Hour & Natural Candid',
    teamSize: 'Crew of 4 Specialists',
    deliverables: {
      coverageDays: '2 Days Coverage (Welcome Party & Full Wedding)',
      cinematicTeaser: '3-Minute 4K Sunset Teaser with acoustic score',
      weddingFilm: '25-Minute Vineyard Wedding Film',
      highResPhotos: '850+ Retouched Digital Deliverables on Private Cloud',
      albums: '1 Hardcover Hand-stitched Linen Photobook (80 Pages)',
      droneFootage: 'Golden Hour Vineyard Overheads',
      socialMediaReels: '3 Instagram Reels'
    },
    gearList: ['Sony FX3 Cinema Cameras', 'Sony G-Master Lenses', 'DJI Ronin RS3 Pro']
  },

  // --- CANADA PHOTOGRAPHY ---
  {
    id: 'p-ca-1',
    name: 'Toronto Fine Art Cinema & Stills',
    country: 'canada',
    city: 'Toronto, Ontario',
    location: 'toronto',
    locationLabel: 'Greater Toronto & Niagara Escarpment',
    coordinates: { lat: 43.6600, lng: -79.3900 },
    deliverableRadiusKm: 220,
    rating: 4.95,
    reviewCount: 245,
    price: 680000, // ~ $11,000 CAD
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    style: 'Timeless Fine Art & Emotional Storytelling',
    teamSize: 'Crew of 4 Professionals',
    deliverables: {
      coverageDays: '2 Full Days Coverage (Sangeet/Rehearsal & Wedding Day)',
      cinematicTeaser: '3-Minute 4K Castle Teaser delivered in 10 days',
      weddingFilm: '30-Minute 4K Cinematic Documentary',
      highResPhotos: '950+ Retouched Master Digital Portraits',
      albums: '2 Velvet-embossed Albums with Magnetic Wooden Presentation Box',
      droneFootage: 'Transport Canada Certified Aerial Overheads of Castle',
      socialMediaReels: '4 Vertical Instagram Reels'
    },
    gearList: ['Canon EOS R5C 8K Hybrid', 'Canon RF L-Series f/1.2', 'DJI Mavic 3 Pro Cine']
  },
  {
    id: 'p-ca-2',
    name: 'Banff Alpine Summit Wedding Photographers',
    country: 'canada',
    city: 'Banff, Alberta',
    location: 'banff',
    locationLabel: 'Banff, Lake Louise & Canadian Rockies',
    coordinates: { lat: 51.1750, lng: -115.5720 },
    deliverableRadiusKm: 200,
    rating: 4.98,
    reviewCount: 290,
    price: 750000, // ~ $12,000 CAD
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    style: 'Breathtaking Mountain Landscapes & Intimate Portraits',
    teamSize: 'Crew of 4 Mountain Specialists',
    deliverables: {
      coverageDays: '2 Days Coverage (Helicopter Ridge Shoot & Wedding Day)',
      cinematicTeaser: '3-4 Minute 4K Alpine Mountain Highlight',
      weddingFilm: '28-Minute Full Feature Wedding Film',
      highResPhotos: '1,100+ High-Resolution Master Digital Photos',
      albums: '2 Top-Grain Canadian Leather Heritage Albums',
      droneFootage: 'High-Altitude 4K Mountain Drone Tracking',
      socialMediaReels: '4 Same-Day Instagram Reels'
    },
    gearList: ['Nikon Z9 Full-frame Flagships', 'Nikkor 85mm f/1.2 S', 'Profoto B10X Location Lighting']
  }
];

export const CHAUFFEURS_SERVICES = [
  // --- INDIA CHAUFFEURS ---
  {
    id: 'ch1',
    name: '1938 Vintage Rolls Royce Phantom (Ivory)',
    country: 'india',
    city: 'Udaipur',
    location: 'udaipur',
    locationLabel: 'Udaipur, Jaipur & Rajasthan Palaces',
    coordinates: { lat: 24.5800, lng: 73.7100 }, // ~3.5 km from Udaivilas
    deliverableRadiusKm: 180,
    vehicleType: 'Vintage Royal Classic',
    rating: 4.99,
    reviewCount: 95,
    pricePerDay: 75000, // INR
    pricePerHour: 12000,
    passengerCapacity: '2 Passengers (Couple Entry)',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: [
      'Authentic Restored 1938 Rolls Royce with Open Sunroof option',
      'Uniformed Chauffeur in Traditional Royal Safa (Turban) and Achkan',
      'Fresh Natural White Jasmine & Exotic Orchid Garland Car Decor Included',
      'Red Carpet Deployment for Bride & Groom Boarding',
      'Chilled Champagne Cooler with Crystal Flutes'
    ]
  },
  {
    id: 'ch2',
    name: 'Mercedes-Maybach S680 V12 Luxury Limousine',
    country: 'india',
    city: 'Mumbai',
    location: 'mumbai',
    locationLabel: 'Mumbai & Goa',
    coordinates: { lat: 19.0000, lng: 72.8300 }, // ~2 km from St. Regis Mumbai
    deliverableRadiusKm: 150,
    vehicleType: 'Modern Ultra-Luxury Sedans',
    rating: 4.95,
    reviewCount: 142,
    pricePerDay: 95000,
    pricePerHour: 15000,
    passengerCapacity: '3 Passengers (First Class Rear Executive Seating)',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    features: [
      'Two-Tone Champagne & Obsidian Black Maybach S680',
      'Reclining First Class Executive Rear Seats with Calf Massage',
      'Professional Black-Tie Chauffeur with Security Clearance',
      'Artisanal Floral Bonnet Cascade Included',
      'Burmester 4D High-End Sound System for bridal entrance music'
    ]
  },

  // --- UNITED STATES CHAUFFEURS ---
  {
    id: 'ch-us-1',
    name: '1958 Vintage Rolls Royce Silver Cloud I (English White)',
    country: 'usa',
    city: 'New York',
    location: 'newyork',
    locationLabel: 'Serving Oheka Castle, Long Island & Manhattan',
    coordinates: { lat: 40.8200, lng: -73.4400 }, // ~2 km from Oheka Castle
    deliverableRadiusKm: 150,
    vehicleType: 'Vintage Royal Classic',
    rating: 4.98,
    reviewCount: 178,
    pricePerDay: 195000, // ~ $2,350 USD / day
    pricePerHour: 28000, // ~ $335 USD / hour
    passengerCapacity: '3 Passengers',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: [
      'Immaculately Restored 1958 Rolls Royce Silver Cloud in English White',
      'Red Carpet Rolled Out Upon Couple Boarding & Departure',
      'Chauffeur in Formal Black Tuxedo with White Driving Gloves',
      'Fresh Garden Rose & Eucalyptus Bonnet Garland Included',
      'Complimentary Chilled Dom Pérignon Champagne with Crystal Flutes',
      '8 Hours Unlimited Chauffeur Duty with Fuel Included'
    ]
  },
  {
    id: 'ch-us-2',
    name: 'Executive Cadillac Escalade V-Series & VIP Sprinter Fleet',
    country: 'usa',
    city: 'San Francisco & Napa, CA',
    location: 'california',
    locationLabel: 'Serving Napa Valley & Wine Country Estates',
    coordinates: { lat: 38.5100, lng: -122.4800 }, // 1.5 km from Meadowood Napa
    deliverableRadiusKm: 120,
    vehicleType: 'VIP Guest & Bridal Fleets',
    rating: 4.94,
    reviewCount: 145,
    pricePerDay: 165000, // ~ $1,980 USD / day
    pricePerHour: 22000,
    passengerCapacity: 'Up to 14 Passengers (Luxury Mercedes Sprinter Jet Van)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: [
      'Luxury Jet-Configuration Mercedes Sprinter with Reclining Leather Captain Chairs',
      'Apple TV & High-Speed Starlink Wi-Fi for Bridal Party',
      'Professional Uniformed Chauffeur with GPS Route Tracking',
      'Complimentary Local Napa Sparkling Wine and Artesian Waters'
    ]
  },

  // --- CANADA CHAUFFEURS ---
  {
    id: 'ch-ca-1',
    name: '1962 Vintage Bentley S2 Continental & Rolls Royce Ghost',
    country: 'canada',
    city: 'Toronto, Ontario',
    location: 'toronto',
    locationLabel: 'Serving Casa Loma, Downtown Toronto & Niagara',
    coordinates: { lat: 43.6750, lng: -79.4050 }, // 0.7 km from Casa Loma
    deliverableRadiusKm: 140,
    vehicleType: 'Vintage Royal Bentley',
    rating: 4.97,
    reviewCount: 160,
    pricePerDay: 175000, // ~ $2,800 CAD
    pricePerHour: 24000,
    passengerCapacity: '3 Passengers',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    features: [
      'Authentic 1962 Bentley Continental with Handcrafted Walnut Wood Inlays',
      'Red Carpet Deployment at Castle Portico Gate',
      'Chauffeur in Black Bow Tie Suit with British Cap',
      'Fresh White Peony & Rose Car Garland Included',
      'Chilled Ontario VQA Sparkling Wine with Crystal Glassware'
    ]
  },
  {
    id: 'ch-ca-2',
    name: 'Banff Alpine Luxury 4x4 Suburban & Executive Coach Shuttle',
    country: 'canada',
    city: 'Banff, Alberta',
    location: 'banff',
    locationLabel: 'Serving Banff Springs & Rocky Mountain Passes',
    coordinates: { lat: 51.1660, lng: -115.5640 }, // 0.3 km from Banff Springs
    deliverableRadiusKm: 100,
    vehicleType: 'Luxury All-Weather 4WD Fleets',
    rating: 4.96,
    reviewCount: 195,
    pricePerDay: 135000, // ~ $2,100 CAD
    pricePerHour: 18000,
    passengerCapacity: 'Up to 24 Passengers (Executive Mini Coach Shuttle)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: [
      'Heavy-Duty All-Wheel-Drive Luxury Coach Equipped for Mountain Passes',
      'Heated Leather Seating and Panoramic Alpine Roof Views',
      'Airport Calgary Shuttle & Late Night Banff Springs Guest Escort',
      'Bottled Mountain Spring Waters and Hot Chocolate Service on Board'
    ]
  }
];

// HONEYMOON COMPARATOR (Skyscanner Reference Architecture)
export const HONEYMOON_DESTINATIONS = [
  {
    id: 'hm-maldives',
    title: 'Maldives Overwater Lagoon Sanctuary',
    destination: 'Male & Baa Atoll, Maldives',
    vibe: 'Tropical Beach & Ocean Villa',
    nights: 5,
    bestMonth: 'Nov - Apr',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    description: 'Wake up directly above turquoise waters with private infinity plunge pool, stingrays swimming beneath glass floor panels, and daily champagne sunsets.',
    romanticPerks: ['Daily Champagne Breakfast in bed or floating in private pool', 'Complimentary 90-min Couples Coconut Oil Body Ritual', 'Private Candlelit Starlit Dinner on a deserted sandbank', 'Complimentary Sunset Dolphin Safari Cruise'],
    providers: [
      {
        providerId: 'skyscanner',
        name: 'Skyscanner Flights + Direct Resort',
        logo: '✈️ Skyscanner',
        badge: 'Cheapest Deal',
        flightAirline: 'Emirates / Qatar (1-Stop Ultra Comfort)',
        roomCategory: 'Sunset Overwater Villa with Private Pool',
        priceINR: 285000,
        priceUSD: 3420,
        priceCAD: 4650,
        originalPriceINR: 350000,
        savingsPercent: 19,
        rating: 4.9,
        includedPerks: ['Roundtrip Speedboat Transfer', 'Daily Floating Breakfast', 'Complimentary Spa Credit'],
        directBookingUrl: 'https://www.skyscanner.com'
      },
      {
        providerId: 'booking',
        name: 'Booking.com Genius Tier 3',
        logo: '🏨 Booking.com',
        badge: 'Free Cancellation',
        flightAirline: 'Etihad Airways (Partner Flight)',
        roomCategory: 'Ocean Lagoon Villa with Sun Deck',
        priceINR: 308000,
        priceUSD: 3690,
        priceCAD: 5020,
        originalPriceINR: 345000,
        savingsPercent: 11,
        rating: 4.8,
        includedPerks: ['Free Cancellation up to 7 days before', 'Buffet Breakfast & Dinner (Half Board)', 'Welcome Bottle of Moët & Chandon'],
        directBookingUrl: 'https://www.booking.com'
      },
      {
        providerId: 'luxuryescapes',
        name: 'Luxury Escapes Honeymoon VIP',
        logo: '💎 Luxury Escapes',
        badge: 'Best Value (All-Inclusive)',
        flightAirline: 'Singapore Airlines (Luxury Lounge Access Included)',
        roomCategory: 'Deluxe Sunset Water Villa with Glass Bottom Floor',
        priceINR: 335000,
        priceUSD: 4020,
        priceCAD: 5460,
        originalPriceINR: 420000,
        savingsPercent: 20,
        rating: 4.95,
        includedPerks: ['All-Inclusive Premium Alcohol & Gourmet Dining', 'Free Seaplane Scenic Return Transfers', 'Private Sunset Dolphin Cruise for 2', 'Unlimited Couples Spa Massages'],
        directBookingUrl: 'https://www.luxuryescapes.com'
      }
    ]
  },
  {
    id: 'hm-switzerland',
    title: 'Swiss Alps & Lake Lucerne Alpine Romance',
    destination: 'Interlaken, Zermatt & Lucerne, Switzerland',
    vibe: 'Alpine Mountain & Cozy Snow',
    nights: 6,
    bestMonth: 'Dec - Mar / Jun - Sep',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    description: 'Ride the Glacier Express through snow-blanketed peaks, stay in 5-star mountain chalets with heated outdoor infinity pools facing the Matterhorn, and savor Swiss cheese fondues by the fireplace.',
    romanticPerks: ['First-Class Swiss Travel Pass with unlimited scenic train rides', 'Private horse-drawn sleigh ride through Zermatt car-free village', 'Matterhorn Glacier Paradise cable-car tickets with champagne lounge', 'Thermal Alpine spa day with heated saltwater baths'],
    providers: [
      {
        providerId: 'skyscanner',
        name: 'Skyscanner Multi-City Package',
        logo: '✈️ Skyscanner',
        badge: 'Cheapest Deal',
        flightAirline: 'SWISS International Air Lines (Direct)',
        roomCategory: 'Matterhorn View Deluxe Suite with Fireplace',
        priceINR: 395000,
        priceUSD: 4740,
        priceCAD: 6450,
        originalPriceINR: 470000,
        savingsPercent: 16,
        rating: 4.9,
        includedPerks: ['Swiss Rail Pass 1st Class', 'Breakfast in Chalet', 'Free Ski & Winter Gear Rental'],
        directBookingUrl: 'https://www.skyscanner.com'
      },
      {
        providerId: 'booking',
        name: 'Booking.com Alpine Escapes',
        logo: '🏨 Booking.com',
        badge: 'Free Cancellation',
        flightAirline: 'Lufthansa',
        roomCategory: 'Panoramic Mountain Suite',
        priceINR: 420000,
        priceUSD: 5040,
        priceCAD: 6850,
        originalPriceINR: 480000,
        savingsPercent: 12,
        rating: 4.85,
        includedPerks: ['Free Cancellation up to 14 days before', 'Daily Gourmet 4-Course Dinner', 'Welcome Swiss Chocolate Box'],
        directBookingUrl: 'https://www.booking.com'
      }
    ]
  },
  {
    id: 'hm-santorini',
    title: 'Santorini & Amalfi Mediterranean Dream',
    destination: 'Oia, Santorini (Greece) & Positano (Italy)',
    vibe: 'European Heritage & Coastal Romance',
    nights: 7,
    bestMonth: 'Apr - Oct',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    description: 'White-washed cliffside suites cascading down volcanic calderas, private cave jacuzzi overlooking the Aegean Sea, wine tasting in private vineyards, and private catamaran cruises.',
    romanticPerks: ['Private sunset catamaran cruise with fresh Greek seafood dinner & open bar', 'Caldera view cave suite with private heated infinity jacuzzi', 'Chauffeured Mercedes tour of Santorini ancient wineries', 'Professional 1-hour honeymoon photo shoot in Oia at sunrise'],
    providers: [
      {
        providerId: 'skyscanner',
        name: 'Skyscanner Flight + Boutique Suites',
        logo: '✈️ Skyscanner',
        badge: 'Cheapest Deal',
        flightAirline: 'Qatar Airways / Aegean',
        roomCategory: 'Caldera Sunset Cave Suite with Outdoor Jacuzzi',
        priceINR: 360000,
        priceUSD: 4320,
        priceCAD: 5880,
        originalPriceINR: 430000,
        savingsPercent: 16,
        rating: 4.92,
        includedPerks: ['Private Catamaran Sunset Cruise', 'Breakfast Delivered to Balcony', 'Luggage Porter Assistance on Cliff Steps'],
        directBookingUrl: 'https://www.skyscanner.com'
      }
    ]
  },
  {
    id: 'hm-bali',
    title: 'Bali Ubud Jungle & Uluwatu Cliff Sanctuary',
    destination: 'Ubud Rainforest & Uluwatu, Bali',
    vibe: 'Tropical Sanctuary & Spiritual Serenity',
    nights: 6,
    bestMonth: 'Year-Round (Best Apr - Oct)',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Split stay: 3 nights in a secluded riverside private pool villa nestled deep in the Ubud tropical rainforest canopy, followed by 3 nights perched atop Uluwatu cliffs with endless ocean vistas.',
    romanticPerks: ['Daily Floating Tropical Breakfast with flower petals in pool', '2-Hour Royal Balinese Lulur Ritual Spa treatment for two', 'Private Candlelight 6-Course Dinner by the Ayung River', 'Sunrise Jeep tour to Mount Batur with breakfast above the clouds'],
    providers: [
      {
        providerId: 'skyscanner',
        name: 'Skyscanner Smart Saver Combo',
        logo: '✈️ Skyscanner',
        badge: 'Cheapest Deal',
        flightAirline: 'Singapore Airlines / Malaysia Airlines',
        roomCategory: 'Private Rainforest Pool Villa (Split Stay Uluwatu Cliff)',
        priceINR: 195000,
        priceUSD: 2340,
        priceCAD: 3180,
        originalPriceINR: 255000,
        savingsPercent: 24,
        rating: 4.88,
        includedPerks: ['Private AC Car with Driver for 3 Days', 'Daily Afternoon Tea & Canapés', 'Floating Breakfast Setup'],
        directBookingUrl: 'https://www.skyscanner.com'
      }
    ]
  }
];
