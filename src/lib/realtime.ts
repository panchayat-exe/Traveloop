export type WeatherNow = {
  tempC: number
  windKph: number
  code: number
  time: string
}

export type FxRates = {
  base: string
  date: string
  rates: Record<string, number>
}

export async function fetchWeatherNow(lat: number, lon: number): Promise<WeatherNow> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    lat,
  )}&longitude=${encodeURIComponent(lon)}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather request failed')
  const json = await res.json()
  return {
    tempC: json.current?.temperature_2m ?? 0,
    windKph: json.current?.wind_speed_10m ?? 0,
    code: json.current?.weather_code ?? 0,
    time: json.current?.time ?? '',
  }
}

export async function fetchFx(base: string, symbols: string[]): Promise<FxRates> {
  const url = `https://api.exchangerate.host/latest?base=${encodeURIComponent(base)}&symbols=${encodeURIComponent(
    symbols.join(','),
  )}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('FX request failed')
  const json = await res.json()
  return {
    base: json.base,
    date: json.date,
    rates: json.rates ?? {},
  }
}

export function weatherLabel(code: number) {
  // Open-Meteo weather codes, simplified
  if ([0].includes(code)) return 'Clear'
  if ([1, 2, 3].includes(code)) return 'Partly cloudy'
  if ([45, 48].includes(code)) return 'Fog'
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle'
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow'
  if ([95, 96, 99].includes(code)) return 'Thunder'
  return 'Mixed'
}
