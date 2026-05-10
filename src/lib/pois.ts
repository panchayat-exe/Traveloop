export type Category = 'Restaurants' | 'Car Rentals' | 'Stays' | 'Attractions'

export type POI = {
  id: string
  name: string
  category: Category
  rating: number
  price: '$' | '$$' | '$$$'
  distanceKm: number
  tags: string[]
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function generatePOIs(
  placeKey: string,
  placeName: string,
  category: Category,
  count = 10,
): POI[] {
  const seed = Array.from(placeKey).reduce((a, c) => a + c.charCodeAt(0), 0) + category.length * 97
  const rand = mulberry32(seed)

  const nameBits = {
    Restaurants: ['Bistro', 'Kitchen', 'Ramen', 'Grill', 'Cafe', 'Tandoor', 'Sushi', 'Bakery', 'Street Food'],
    'Car Rentals': ['Auto', 'Rentals', 'Drive', 'Mobility', 'Cars', 'Wheels', 'Go', 'Ride'],
    Stays: ['Hotel', 'Resort', 'Suites', 'Villa', 'Stay', 'Lodge', 'Inn'],
    Attractions: ['Museum', 'Park', 'Viewpoint', 'Temple', 'Market', 'Beach', 'Trail', 'Old Town'],
  } as const

  const tagsByCat: Record<Category, string[]> = {
    Restaurants: ['Local', 'Seafood', 'Vegan', 'Rooftop', 'Hidden gem', 'Family', 'Fine dining'],
    'Car Rentals': ['No deposit', 'Full insurance', 'Airport pickup', 'Unlimited km', '24/7 support'],
    Stays: ['Breakfast', 'Pool', 'Ocean view', 'Free cancellation', 'Boutique', 'Spa'],
    Attractions: ['Sunset', 'Guided', 'Tickets', 'Nature', 'Culture', 'Photography'],
  }

  const arr: POI[] = []
  for (let i = 0; i < count; i++) {
    const rating = 3.8 + rand() * 1.2
    const priceRoll = rand()
    const price: POI['price'] = priceRoll < 0.33 ? '$' : priceRoll < 0.75 ? '$$' : '$$$'
    const distanceKm = Math.max(0.2, Math.round((rand() * 18) * 10) / 10)
    const bits = nameBits[category]
    const first = bits[Math.floor(rand() * bits.length)]
    const second = bits[Math.floor(rand() * bits.length)]
    const name =
      category === 'Car Rentals'
        ? `${placeName} ${first} ${second}`
        : `${first} ${placeName} ${second}`

    const tags = [...tagsByCat[category]]
      .sort(() => rand() - 0.5)
      .slice(0, 3)

    arr.push({
      id: `${placeKey}:${category}:${i}`,
      name,
      category,
      rating: Math.round(rating * 10) / 10,
      price,
      distanceKm,
      tags,
    })
  }

  return arr.sort((a, b) => b.rating - a.rating)
}
