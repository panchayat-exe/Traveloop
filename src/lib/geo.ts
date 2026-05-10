export type Country = {
  name: string
  cca2: string
  cca3: string
  region: string
  subregion?: string
  capital?: string
  latlng?: [number, number]
  flags?: { png?: string; svg?: string }
}

export type Place = {
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  admin1?: string
  admin2?: string
  timezone?: string
  population?: number
  feature_code?: string
}

export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  const res = await fetch('https://restcountries.com/v3.1/all', { signal })
  if (!res.ok) throw new Error('Countries request failed')
  const json = await res.json()
  const mapped: Country[] = (json ?? [])
    .map((c: any) => {
      const latlng: [number, number] | undefined = Array.isArray(c.latlng) && c.latlng.length >= 2
        ? [Number(c.latlng[0]), Number(c.latlng[1])]
        : undefined
      return {
        name: c?.name?.common ?? 'Unknown',
        cca2: c?.cca2 ?? '',
        cca3: c?.cca3 ?? '',
        region: c?.region ?? 'Other',
        subregion: c?.subregion,
        capital: Array.isArray(c?.capital) ? c.capital[0] : c?.capital,
        latlng,
        flags: c?.flags,
      }
    })
    .filter((c: Country) => c.cca2 && c.name)
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name))

  return mapped
}

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<Place[]> {
  const q = query.trim()
  if (!q) return []
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    q,
  )}&count=20&language=en&format=json`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error('Place search failed')
  const json = await res.json()
  return (json?.results ?? []).map((r: any) => ({
    name: r.name,
    latitude: r.latitude,
    longitude: r.longitude,
    country: r.country,
    country_code: r.country_code,
    admin1: r.admin1,
    admin2: r.admin2,
    timezone: r.timezone,
    population: r.population,
    feature_code: r.feature_code,
  }))
}

export function placeLabel(p: Place) {
  const parts = [p.name, p.admin1, p.country].filter(Boolean)
  return parts.join(', ')
}
