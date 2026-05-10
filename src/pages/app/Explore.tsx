import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { Card, Chip, SectionTitle } from '../../components/ui'
import { fetchCountries, placeLabel, searchPlaces, type Place } from '../../lib/geo'
import { destinationImage } from '../../lib/destinationImages'
import POIList from '../../components/POIList'
import { generatePOIs, type Category, type POI } from '../../lib/pois'

const filters = ['All', 'Beaches', 'Adventure', 'Cities', 'Culture', 'Nature']

export default function Explore() {
  const [active, setActive] = useState('All')
  const [q, setQ] = useState('')
  const [picked, setPicked] = useState<Place | null>(null)
  const [poiCat, setPoiCat] = useState<Category>('Restaurants')
  const [poiPicked, setPoiPicked] = useState<POI | null>(null)

  const countriesQuery = useQuery({
    queryKey: ['countries'],
    queryFn: ({ signal }) => fetchCountries(signal),
  })

  const placesQuery = useQuery({
    queryKey: ['placeSearch', q],
    queryFn: ({ signal }) => searchPlaces(q, signal),
    enabled: q.trim().length >= 2,
  })

  const featured = useMemo(() => {
    const list = countriesQuery.data ?? []
    // diversify regions (simple pick)
    const byRegion = new Map<string, typeof list>()
    for (const c of list) {
      const r = c.region || 'Other'
      byRegion.set(r, [...(byRegion.get(r) ?? []), c])
    }

    const pick = (region: string, n: number) => (byRegion.get(region) ?? []).slice(0, n)
    return [...pick('Europe', 6), ...pick('Asia', 6), ...pick('Americas', 6), ...pick('Africa', 4), ...pick('Oceania', 4)].slice(
      0,
      20,
    )
  }, [countriesQuery.data])

  const poiList = useMemo(() => {
    if (!picked) return []
    const key = `${picked.name}|${picked.country_code}`
    return generatePOIs(key, picked.name, poiCat, 12)
  }, [picked, poiCat])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <SectionTitle title="Explore (Worldwide)" subtitle="Countries, cities, and category-based discovery" />
          <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 md:w-[420px]">
            <Search className="h-4 w-4 text-white/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search any city (e.g., Paris, Tokyo, Cape Town)"
              className="w-full bg-transparent text-sm text-white/85 placeholder:text-white/35 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <Chip key={f} active={active === f} onClick={() => setActive(f)}>
              {f}
            </Chip>
          ))}
        </div>

        {q.trim().length >= 2 ? (
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Search Results</div>
              <div className="mt-2 space-y-2">
                {(placesQuery.data ?? []).slice(0, 10).map((p) => (
                  <button
                    key={`${p.name}-${p.latitude}-${p.longitude}`}
                    onClick={() => {
                      setPicked(p)
                      setPoiPicked(null)
                    }}
                    className={`w-full rounded-2xl border border-white/10 px-3 py-2 text-left text-sm transition hover:bg-white/10 ${
                      picked?.name === p.name && picked?.country_code === p.country_code ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <div className="font-semibold">{placeLabel(p)}</div>
                    <div className="text-xs text-white/60">
                      {p.timezone ?? 'Timezone unknown'}  pop {p.population?.toLocaleString?.() ?? ''}
                    </div>
                  </button>
                ))}
                {placesQuery.isFetching ? <div className="text-xs text-white/60">Searching</div> : null}
                {placesQuery.data && placesQuery.data.length === 0 ? (
                  <div className="text-xs text-white/60">No results. Try a different city name.</div>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Selected Place</div>
              <div className="mt-2 overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={destinationImage(picked ? `${picked.name},${picked.country}` : 'travel destination')}
                  alt="cover"
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-sm font-semibold">{picked ? placeLabel(picked) : 'Pick a city to explore'}</div>
              <div className="mt-1 text-xs text-white/60">
                {picked ? `Lat ${picked.latitude.toFixed(2)}  Lon ${picked.longitude.toFixed(2)}` : 'Worldwide search powered by Open-Meteo geocoding'}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(['Restaurants', 'Car Rentals', 'Stays', 'Attractions'] as Category[]).map((c) => (
                  <Chip key={c} active={poiCat === c} onClick={() => setPoiCat(c)}>
                    {c}
                  </Chip>
                ))}
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Local specialties</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {(
                    picked
                      ? ['Street food', 'Old town', 'Viewpoints', 'Markets', 'Museums', 'Nature routes', 'Nightlife']
                      : ['Search to see specialties']
                  ).map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                {poiPicked ? (
                  <div className="mt-3 text-xs text-white/60">
                    Selected: <span className="font-semibold text-white">{poiPicked.name}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div className="text-sm font-semibold">Browse countries (worldwide)</div>
            <div className="mt-2 text-xs text-white/60">
              Loads live from RestCountries. Tap a card to auto-search its capital.
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
              {featured.map((c) => (
                <button
                  key={c.cca3}
                  onClick={() => setQ(c.capital ?? c.name)}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
                >
                  <div className="absolute inset-0">
                    <img src={destinationImage(c.name)} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-[#070B18]/15 to-transparent" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">{c.name}</div>
                      {c.flags?.svg ? (
                        <img src={c.flags.svg} alt="" className="h-5 w-8 rounded-md border border-white/10" />
                      ) : null}
                    </div>
                    <div className="mt-1 text-xs text-white/60">
                      {c.region}{c.subregion ? `  ${c.subregion}` : ''}
                    </div>
                    <div className="mt-16 text-[11px] text-white/55">Tap to search: {c.capital ?? c.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {picked ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <POIList title={poiCat} subtitle={`Top picks near ${picked.name}`} items={poiList} onPick={(poi) => setPoiPicked(poi)} />
          </div>
          <div className="md:col-span-5">
            <Card className="p-5">
              <SectionTitle title="Category-wise" subtitle="Restaurants, car rentals, stays, attractions" />
              <div className="mt-3 space-y-2 text-sm text-white/70">
                {[
                  ['Restaurants', 'Local food  rooftop  hidden gems'],
                  ['Car Rentals', 'Airport pickup  insurance  unlimited km'],
                  ['Stays', 'Resorts  villas  boutique hotels'],
                  ['Attractions', 'Culture  nature  tours'],
                ].map(([t, s]) => (
                  <button
                    key={t}
                    onClick={() => setPoiCat(t as Category)}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-3 py-3 text-left transition hover:bg-white/10"
                  >
                    <div className="font-semibold text-white">{t}</div>
                    <div className="text-xs text-white/60">{s}</div>
                  </button>
                ))}
              </div>

              <div className="mt-4 text-[11px] text-white/55">
                Optimized: live country/city data is fetched once and cached (React Query). POI lists are generated instantly per city.
              </div>
              <div className="mt-2 text-[11px] text-white/55">
                Want true real providers (Google Places/Yelp/Booking)? Add API keys and Ill wire them in.
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      <Card className="p-5">
        <SectionTitle title="Filter mode" subtitle="This UI is ready for your category logic" />
        <div className="mt-3 text-sm text-white/70">
          Active filter: <span className="font-semibold text-white">{active}</span>
        </div>
      </Card>
    </div>
  )
}
