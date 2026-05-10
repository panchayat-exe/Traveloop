export type RoutePlatform = {
  name: string
  kind: 'Train' | 'Bus' | 'Flights+Hotels' | 'Hotels' | 'Deals' | 'Flights' | 'Stays' | 'Packages'
  url: string
}

export type IndiaRoute = {
  id: string
  from: string
  to: string
  modes: Array<{
    mode: 'Bus' | 'Train'
    duration: string
    priceINR: { min: number; max: number }
    platforms: string[]
    rating: { min: number; max: number }
    notes?: string
  }>
}

export type IntlDestination = {
  id: string
  name: string
  flightTime: string
  budgetINR: { min: number; max: number }
  hotelPerDayINR: { min: number; max: number }
  rating: number
}

export type IndiaDestination = {
  id: string
  region:
    | 'North India'
    | 'West India'
    | 'South India'
    | 'East India'
    | 'North East'
    | 'Islands'
  name: string
  specialties: string[]
  budgetINR: { min: number; max: number }
  rating: number
  bestSeason: 'Summer' | 'Winter' | 'Monsoon' | 'All year'
}

export const platforms: RoutePlatform[] = [
  { name: 'IRCTC', kind: 'Train', url: 'https://www.irctc.co.in/' },
  { name: 'RedBus', kind: 'Bus', url: 'https://www.redbus.in/' },
  { name: 'AbhiBus', kind: 'Bus', url: 'https://www.abhibus.com/' },
  { name: 'MakeMyTrip', kind: 'Flights+Hotels', url: 'https://www.makemytrip.com/' },
  { name: 'Goibibo', kind: 'Deals', url: 'https://www.goibibo.com/' },
  { name: 'Skyscanner', kind: 'Flights', url: 'https://www.skyscanner.co.in/' },
  { name: 'Booking.com', kind: 'Hotels', url: 'https://www.booking.com/' },
  { name: 'Agoda', kind: 'Hotels', url: 'https://www.agoda.com/' },
  { name: 'Expedia', kind: 'Packages', url: 'https://www.expedia.co.in/' },
  { name: 'Airbnb', kind: 'Stays', url: 'https://www.airbnb.co.in/' },
]

export const indiaRoutes: IndiaRoute[] = [
  {
    id: 'r1',
    from: 'Ahmedabad',
    to: 'Mumbai',
    modes: [
      {
        mode: 'Bus',
        duration: '9–12h',
        priceINR: { min: 500, max: 1500 },
        platforms: ['RedBus'],
        rating: { min: 4.2, max: 4.7 },
      },
      {
        mode: 'Train',
        duration: '5–6h',
        priceINR: { min: 1200, max: 1500 },
        platforms: ['IRCTC'],
        rating: { min: 4.2, max: 4.7 },
      },
    ],
  },
  {
    id: 'r2',
    from: 'Delhi',
    to: 'Manali',
    modes: [
      {
        mode: 'Bus',
        duration: '12–14h',
        priceINR: { min: 1200, max: 2200 },
        platforms: ['RedBus'],
        rating: { min: 4.5, max: 4.5 },
        notes: 'Volvo recommended for overnight.',
      },
    ],
  },
  {
    id: 'r3',
    from: 'Delhi',
    to: 'Jaipur',
    modes: [
      {
        mode: 'Bus',
        duration: '5–6h',
        priceINR: { min: 400, max: 900 },
        platforms: ['AbhiBus'],
        rating: { min: 4.1, max: 4.4 },
      },
      {
        mode: 'Train',
        duration: '4–5h',
        priceINR: { min: 300, max: 1000 },
        platforms: ['IRCTC'],
        rating: { min: 4.1, max: 4.4 },
      },
    ],
  },
  {
    id: 'r4',
    from: 'Delhi',
    to: 'Agra',
    modes: [
      {
        mode: 'Train',
        duration: '1.5–2h',
        priceINR: { min: 1000, max: 1500 },
        platforms: ['IRCTC'],
        rating: { min: 4.8, max: 4.8 },
        notes: 'Vande Bharat / Shatabdi.',
      },
    ],
  },
  {
    id: 'r5',
    from: 'Mumbai',
    to: 'Goa',
    modes: [
      {
        mode: 'Train',
        duration: '8–12h',
        priceINR: { min: 700, max: 2000 },
        platforms: ['IRCTC'],
        rating: { min: 4.3, max: 4.7 },
      },
      {
        mode: 'Bus',
        duration: '10–14h',
        priceINR: { min: 900, max: 2000 },
        platforms: ['RedBus'],
        rating: { min: 4.3, max: 4.7 },
      },
    ],
  },
  {
    id: 'r6',
    from: 'Bangalore',
    to: 'Chennai',
    modes: [
      {
        mode: 'Bus',
        duration: '6–7h',
        priceINR: { min: 400, max: 1500 },
        platforms: ['MakeMyTrip'],
        rating: { min: 4.1, max: 4.5 },
      },
      {
        mode: 'Train',
        duration: '5–6h',
        priceINR: { min: 400, max: 1500 },
        platforms: ['IRCTC'],
        rating: { min: 4.1, max: 4.5 },
      },
    ],
  },
]

export const intlDestinations: IntlDestination[] = [
  {
    id: 'i1',
    name: 'Dubai',
    flightTime: '3–4h',
    budgetINR: { min: 45000, max: 120000 },
    hotelPerDayINR: { min: 4000, max: 12000 },
    rating: 4.7,
  },
  {
    id: 'i2',
    name: 'Thailand',
    flightTime: '4–5h',
    budgetINR: { min: 40000, max: 90000 },
    hotelPerDayINR: { min: 2000, max: 8000 },
    rating: 4.6,
  },
  {
    id: 'i3',
    name: 'Singapore',
    flightTime: '5–6h',
    budgetINR: { min: 70000, max: 150000 },
    hotelPerDayINR: { min: 6000, max: 15000 },
    rating: 4.8,
  },
  {
    id: 'i4',
    name: 'Maldives',
    flightTime: '4–5h',
    budgetINR: { min: 80000, max: 200000 },
    hotelPerDayINR: { min: 10000, max: 40000 },
    rating: 4.9,
  },
  {
    id: 'i5',
    name: 'Bali',
    flightTime: '7–9h',
    budgetINR: { min: 70000, max: 180000 },
    hotelPerDayINR: { min: 3000, max: 12000 },
    rating: 4.8,
  },
  {
    id: 'i6',
    name: 'Japan',
    flightTime: '9–12h',
    budgetINR: { min: 120000, max: 300000 },
    hotelPerDayINR: { min: 6000, max: 20000 },
    rating: 4.9,
  },
  {
    id: 'i7',
    name: 'USA',
    flightTime: '16–24h',
    budgetINR: { min: 200000, max: 600000 },
    hotelPerDayINR: { min: 10000, max: 35000 },
    rating: 4.8,
  },
]

export const budgets = {
  india: {
    Budget: { min: 5000, max: 15000 },
    Mid: { min: 20000, max: 60000 },
    Luxury: { min: 100000, max: 250000 },
  },
  international: {
    Budget: { min: 40000, max: 80000 },
    Mid: { min: 100000, max: 200000 },
    Luxury: { min: 300000, max: 1000000 },
  },
}

export const indiaDestinations: IndiaDestination[] = [
  {
    id: 'n1',
    region: 'North India',
    name: 'Srinagar',
    specialties: ['Dal Lake', 'Snow'],
    budgetINR: { min: 15000, max: 60000 },
    rating: 4.8,
    bestSeason: 'Summer',
  },
  {
    id: 'n2',
    region: 'North India',
    name: 'Gulmarg',
    specialties: ['Skiing'],
    budgetINR: { min: 20000, max: 70000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },
  {
    id: 'n3',
    region: 'North India',
    name: 'Leh Ladakh',
    specialties: ['Bike Trips'],
    budgetINR: { min: 25000, max: 100000 },
    rating: 4.9,
    bestSeason: 'Summer',
  },
  {
    id: 'n4',
    region: 'North India',
    name: 'Manali',
    specialties: ['Snow', 'Adventure'],
    budgetINR: { min: 10000, max: 50000 },
    rating: 4.7,
    bestSeason: 'Summer',
  },
  {
    id: 'n5',
    region: 'North India',
    name: 'Shimla',
    specialties: ['Hills'],
    budgetINR: { min: 8000, max: 40000 },
    rating: 4.5,
    bestSeason: 'Summer',
  },
  {
    id: 'n6',
    region: 'North India',
    name: 'Dharamshala',
    specialties: ['Nature'],
    budgetINR: { min: 10000, max: 35000 },
    rating: 4.6,
    bestSeason: 'Summer',
  },
  {
    id: 'n7',
    region: 'North India',
    name: 'Nainital',
    specialties: ['Lakes'],
    budgetINR: { min: 8000, max: 30000 },
    rating: 4.5,
    bestSeason: 'Summer',
  },
  {
    id: 'n8',
    region: 'North India',
    name: 'Mussoorie',
    specialties: ['Waterfalls'],
    budgetINR: { min: 10000, max: 35000 },
    rating: 4.6,
    bestSeason: 'Summer',
  },
  {
    id: 'n9',
    region: 'North India',
    name: 'Rishikesh',
    specialties: ['Rafting', 'Yoga'],
    budgetINR: { min: 7000, max: 25000 },
    rating: 4.7,
    bestSeason: 'All year',
  },

  {
    id: 'w1',
    region: 'West India',
    name: 'Jaipur',
    specialties: ['Palaces'],
    budgetINR: { min: 10000, max: 40000 },
    rating: 4.7,
    bestSeason: 'Winter',
  },
  {
    id: 'w2',
    region: 'West India',
    name: 'Udaipur',
    specialties: ['Lakes'],
    budgetINR: { min: 12000, max: 60000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },
  {
    id: 'w3',
    region: 'West India',
    name: 'Jaisalmer',
    specialties: ['Desert Safari'],
    budgetINR: { min: 15000, max: 50000 },
    rating: 4.7,
    bestSeason: 'Winter',
  },
  {
    id: 'w4',
    region: 'West India',
    name: 'Ahmedabad',
    specialties: ['Heritage', 'Food'],
    budgetINR: { min: 5000, max: 20000 },
    rating: 4.4,
    bestSeason: 'Winter',
  },
  {
    id: 'w5',
    region: 'West India',
    name: 'Statue of Unity',
    specialties: ['Monument', 'Views'],
    budgetINR: { min: 5000, max: 25000 },
    rating: 4.7,
    bestSeason: 'Winter',
  },
  {
    id: 'w6',
    region: 'West India',
    name: 'Kutch',
    specialties: ['Rann Festival'],
    budgetINR: { min: 10000, max: 40000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },
  {
    id: 'w7',
    region: 'West India',
    name: 'Mumbai',
    specialties: ['Marine Drive', 'Bollywood'],
    budgetINR: { min: 10000, max: 70000 },
    rating: 4.6,
    bestSeason: 'Winter',
  },
  {
    id: 'w8',
    region: 'West India',
    name: 'Lonavala',
    specialties: ['Monsoon Hills'],
    budgetINR: { min: 5000, max: 25000 },
    rating: 4.5,
    bestSeason: 'Monsoon',
  },

  {
    id: 's1',
    region: 'South India',
    name: 'North Goa',
    specialties: ['Beaches', 'Nightlife'],
    budgetINR: { min: 10000, max: 60000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },
  {
    id: 's2',
    region: 'South India',
    name: 'South Goa',
    specialties: ['Luxury Beaches'],
    budgetINR: { min: 15000, max: 100000 },
    rating: 4.9,
    bestSeason: 'Winter',
  },
  {
    id: 's3',
    region: 'South India',
    name: 'Munnar',
    specialties: ['Tea Gardens'],
    budgetINR: { min: 12000, max: 40000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },
  {
    id: 's4',
    region: 'South India',
    name: 'Alleppey',
    specialties: ['Houseboats'],
    budgetINR: { min: 15000, max: 70000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },
  {
    id: 's5',
    region: 'South India',
    name: 'Wayanad',
    specialties: ['Forests'],
    budgetINR: { min: 10000, max: 35000 },
    rating: 4.7,
    bestSeason: 'Winter',
  },
  {
    id: 's6',
    region: 'South India',
    name: 'Ooty',
    specialties: ['Toy Train'],
    budgetINR: { min: 10000, max: 40000 },
    rating: 4.7,
    bestSeason: 'Summer',
  },
  {
    id: 's7',
    region: 'South India',
    name: 'Kodaikanal',
    specialties: ['Lakes'],
    budgetINR: { min: 10000, max: 35000 },
    rating: 4.6,
    bestSeason: 'Summer',
  },
  {
    id: 's8',
    region: 'South India',
    name: 'Chennai',
    specialties: ['Marina Beach'],
    budgetINR: { min: 8000, max: 40000 },
    rating: 4.4,
    bestSeason: 'Winter',
  },
  {
    id: 's9',
    region: 'South India',
    name: 'Bangalore',
    specialties: ['IT', 'Cafes'],
    budgetINR: { min: 8000, max: 50000 },
    rating: 4.5,
    bestSeason: 'All year',
  },
  {
    id: 's10',
    region: 'South India',
    name: 'Coorg',
    specialties: ['Coffee Estates'],
    budgetINR: { min: 12000, max: 40000 },
    rating: 4.8,
    bestSeason: 'Monsoon',
  },
  {
    id: 's11',
    region: 'South India',
    name: 'Mysore',
    specialties: ['Palace'],
    budgetINR: { min: 8000, max: 30000 },
    rating: 4.6,
    bestSeason: 'Winter',
  },

  {
    id: 'e1',
    region: 'East India',
    name: 'Kolkata',
    specialties: ['Culture', 'Food'],
    budgetINR: { min: 8000, max: 35000 },
    rating: 4.5,
    bestSeason: 'Winter',
  },
  {
    id: 'e2',
    region: 'East India',
    name: 'Darjeeling',
    specialties: ['Tea Gardens'],
    budgetINR: { min: 12000, max: 45000 },
    rating: 4.8,
    bestSeason: 'Summer',
  },
  {
    id: 'e3',
    region: 'East India',
    name: 'Puri',
    specialties: ['Temple', 'Beach'],
    budgetINR: { min: 8000, max: 30000 },
    rating: 4.6,
    bestSeason: 'Winter',
  },
  {
    id: 'e4',
    region: 'East India',
    name: 'Konark',
    specialties: ['Sun Temple'],
    budgetINR: { min: 6000, max: 20000 },
    rating: 4.5,
    bestSeason: 'Winter',
  },

  {
    id: 'ne1',
    region: 'North East',
    name: 'Gangtok',
    specialties: ['Mountains'],
    budgetINR: { min: 15000, max: 50000 },
    rating: 4.8,
    bestSeason: 'Summer',
  },
  {
    id: 'ne2',
    region: 'North East',
    name: 'Shillong',
    specialties: ['Waterfalls'],
    budgetINR: { min: 15000, max: 45000 },
    rating: 4.8,
    bestSeason: 'Monsoon',
  },
  {
    id: 'ne3',
    region: 'North East',
    name: 'Cherrapunji',
    specialties: ['Root Bridges'],
    budgetINR: { min: 15000, max: 40000 },
    rating: 4.9,
    bestSeason: 'Monsoon',
  },
  {
    id: 'ne4',
    region: 'North East',
    name: 'Kaziranga',
    specialties: ['Rhino Safari'],
    budgetINR: { min: 12000, max: 50000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },

  {
    id: 'is1',
    region: 'Islands',
    name: 'Havelock',
    specialties: ['Scuba', 'Beaches'],
    budgetINR: { min: 25000, max: 100000 },
    rating: 4.9,
    bestSeason: 'Winter',
  },
  {
    id: 'is2',
    region: 'Islands',
    name: 'Lakshadweep',
    specialties: ['Coral Beaches'],
    budgetINR: { min: 30000, max: 150000 },
    rating: 4.8,
    bestSeason: 'Winter',
  },
]

export const bestSeasons = [
  { season: 'Summer', places: ['Himachal', 'Kashmir', 'Ladakh'] },
  { season: 'Winter', places: ['Rajasthan', 'Goa', 'Kerala'] },
  { season: 'Monsoon', places: ['Lonavala', 'Coorg', 'Meghalaya'] },
] as const

export const travelTips = [
  'Book IRCTC early for better availability and pricing.',
  'Use Volvo buses for overnight travel (comfort + safety).',
  'Flights save long-distance time; compare deals across platforms.',
  'Carry ID proof and keep digital copies.',
  'Travel off-season for cheaper prices and fewer crowds.',
] as const
