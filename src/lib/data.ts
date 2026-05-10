export type Trip = {
  id: string
  title: string
  location: string
  dateRange: string
  price: number
  nights: number
  status: 'Confirmed' | 'Pending'
  image: string
  tags: string[]
}

export type Destination = {
  id: string
  name: string
  country: string
  tagline: string
  image: string
  rating: number
  priceHint: string
}

export type CommunityPost = {
  id: string
  author: { name: string; handle: string; avatar: string }
  title: string
  image: string
  likes: number
  comments: number
  time: string
}

export const assets = {
  mockHero:
    'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1800',
  bali:
    'https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=1600',
  iceland:
    'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=1600',
  maldives:
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600',
  dubai:
    'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1600',
  switzerland:
    'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1600',
  northernLights:
    'https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=1600',
  safari:
    'https://images.pexels.com/photos/667205/pexels-photo-667205.jpeg?auto=compress&cs=tinysrgb&w=1600',
  scuba:
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600',
  journalCover:
    'https://images.pexels.com/photos/2916820/pexels-photo-2916820.jpeg?auto=compress&cs=tinysrgb&w=1600',
}

export const destinations: Destination[] = [
  {
    id: 'd1',
    name: 'Maldives',
    country: 'Indian Ocean',
    tagline: 'Paradise on Earth',
    image: assets.maldives,
    rating: 4.9,
    priceHint: 'Premium',
  },
  {
    id: 'd2',
    name: 'Switzerland',
    country: 'Alps',
    tagline: 'Alpine Dreams',
    image: assets.switzerland,
    rating: 4.8,
    priceHint: 'Luxury',
  },
  {
    id: 'd3',
    name: 'Dubai',
    country: 'UAE',
    tagline: 'Luxury Redefined',
    image: assets.dubai,
    rating: 4.7,
    priceHint: 'Luxury',
  },
]

export const trendingExperiences = [
  { id: 'e1', title: 'Northern Lights', subtitle: 'Iceland', image: assets.northernLights },
  { id: 'e2', title: 'Safari Adventure', subtitle: 'Kenya', image: assets.safari },
  { id: 'e3', title: 'Scuba Diving', subtitle: 'Great Barrier Reef', image: assets.scuba },
]

export const bookings: Trip[] = [
  {
    id: 't1',
    title: 'Flight to Bali',
    location: 'Bali',
    dateRange: 'May 20 – May 30, 2024',
    price: 1200,
    nights: 10,
    status: 'Confirmed',
    image: assets.bali,
    tags: ['Flights'],
  },
  {
    id: 't2',
    title: 'The Kyron Resort',
    location: 'Bali',
    dateRange: 'May 20 – May 30, 2024',
    price: 800,
    nights: 10,
    status: 'Confirmed',
    image: assets.bali,
    tags: ['Stays'],
  },
  {
    id: 't3',
    title: 'Nusa Penida Day Tour',
    location: 'Bali',
    dateRange: 'May 21, 2024 • 8:00 AM',
    price: 180,
    nights: 0,
    status: 'Confirmed',
    image: assets.bali,
    tags: ['Activities'],
  },
]

export const communityPosts: CommunityPost[] = [
  {
    id: 'p1',
    author: {
      name: 'Sarah J.',
      handle: '@sarahj',
      avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Sarah&backgroundColor=0b1020',
    },
    title: 'Sunset in Santorini is something else.',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-architecture-161815.jpeg?auto=compress&cs=tinysrgb&w=1600',
    likes: 195,
    comments: 26,
    time: '2h',
  },
  {
    id: 'p2',
    author: {
      name: 'Mike Adventure',
      handle: '@mikeadventure',
      avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Mike&backgroundColor=0b1020',
    },
    title: 'Hiking the Dolomites. Alps are unreal.',
    image: 'https://images.pexels.com/photos/754198/pexels-photo-754198.jpeg?auto=compress&cs=tinysrgb&w=1600',
    likes: 98,
    comments: 18,
    time: '6h',
  },
  {
    id: 'p3',
    author: {
      name: 'Wanderlust Lee',
      handle: '@wanderlee',
      avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Lee&backgroundColor=0b1020',
    },
    title: 'Crystal waters, zero worries.',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600',
    likes: 75,
    comments: 12,
    time: '1d',
  },
]
