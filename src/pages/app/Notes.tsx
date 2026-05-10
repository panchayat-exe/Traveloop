import { useMemo, useState } from 'react'
import { ExternalLink, MapPinned, TrainFront, BusFront, Globe, IndianRupee, Calendar } from 'lucide-react'
import { Card, Chip, PrimaryButton, SectionTitle } from '../../components/ui'
import {
  bestSeasons,
  budgets,
  indiaDestinations,
  indiaRoutes,
  intlDestinations,
  platforms,
  travelTips,
} from '../../lib/travelNotes'
import { destinationImage } from '../../lib/destinationImages'
import { formatCurrency } from '../../lib/utils'

function inr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

function rangeINR(min: number, max: number) {
  return `${inr(min)} – ${inr(max)}`
}

export default function Notes() {
  const [tab, setTab] = useState<'India Routes' | 'India Destinations' | 'International' | 'Platforms' | 'Budgets' | 'Seasons' | 'Tips'>('India Routes')
  const [region, setRegion] = useState<'All' | 'North India' | 'West India' | 'South India' | 'East India' | 'North East' | 'Islands'>('All')

  const regions = useMemo(
    () => ['All', 'North India', 'West India', 'South India', 'East India', 'North East', 'Islands'] as const,
    [],
  )

  const filteredDest = useMemo(() => {
    if (region === 'All') return indiaDestinations
    return indiaDestinations.filter((d) => d.region === region)
  }, [region])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <SectionTitle title="Travel Notes & Tourist Data" subtitle="Your curated dataset  now interactive" />
          <div className="flex flex-wrap gap-2">
            {(
              [
                'India Routes',
                'India Destinations',
                'International',
                'Platforms',
                'Budgets',
                'Seasons',
                'Tips',
              ] as const
            ).map((t) => (
              <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      {tab === 'India Routes' ? (
        <Card className="p-6">
          <SectionTitle title="India Routes" subtitle="Duration, price range, platforms, and ratings" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {indiaRoutes.map((r) => (
              <div key={r.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{r.from}  {r.to}</div>
                    <div className="text-xs text-white/60">Platforms: {Array.from(new Set(r.modes.flatMap((m) => m.platforms))).join(', ')}</div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/35 to-cyan-400/15">
                    <MapPinned className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  {r.modes.map((m, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold">
                          {m.mode === 'Train' ? <TrainFront className="h-4 w-4 text-cyan-200" /> : <BusFront className="h-4 w-4 text-orange-200" />}
                          {m.mode}
                        </div>
                        <div className="text-xs text-white/60">Rating {m.rating.min.toFixed(1)}{m.rating.max.toFixed(1)}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-white/70">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                          <div className="text-white/55">Duration</div>
                          <div className="mt-0.5 font-semibold">{m.duration}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                          <div className="text-white/55">Price</div>
                          <div className="mt-0.5 font-semibold">{rangeINR(m.priceINR.min, m.priceINR.max)}</div>
                        </div>
                      </div>
                      {m.notes ? <div className="mt-2 text-xs text-white/60">Tip: {m.notes}</div> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'International' ? (
        <Card className="p-6">
          <SectionTitle title="International Destinations" subtitle="Flight time, trip budget and hotel/day" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {intlDestinations.map((d) => (
              <div key={d.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="relative h-40">
                  <img src={destinationImage(d.name)} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{d.name}</div>
                      <div className="text-xs text-white/60">Flight: {d.flightTime}</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                      05 {d.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/70">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="inline-flex items-center gap-2 text-white/55"><IndianRupee className="h-3.5 w-3.5" />Trip budget</div>
                      <div className="mt-1 font-semibold">{rangeINR(d.budgetINR.min, d.budgetINR.max)}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="text-white/55">Hotel/day</div>
                      <div className="mt-1 font-semibold">{rangeINR(d.hotelPerDayINR.min, d.hotelPerDayINR.max)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'India Destinations' ? (
        <Card className="p-6">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <SectionTitle title="Tourist Destinations (India)" subtitle="Region-wise, specialties, budget and season" />
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                  {r}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {filteredDest.map((d) => (
              <div key={d.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="relative h-36">
                  <img src={destinationImage(d.name)} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{d.name}</div>
                      <div className="text-xs text-white/60">
                        {d.region}  Best: {d.bestSeason}
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                      05 {d.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-white/60">Specialties</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {d.specialties.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
                    <div className="flex items-center justify-between">
                      <div className="text-white/55">Budget range</div>
                      <div className="font-semibold">{rangeINR(d.budgetINR.min, d.budgetINR.max)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'Platforms' ? (
        <Card className="p-6">
          <SectionTitle title="Platforms" subtitle="Where to book (official & popular)" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-white/60">{p.kind}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/60" />
                </div>
              </a>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'Budgets' ? (
        <Card className="p-6">
          <SectionTitle title="Budget Guide" subtitle="India vs International" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Globe className="h-4 w-4 text-cyan-200" /> India
              </div>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                {Object.entries(budgets.india).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="font-semibold text-white">{k}</div>
                    <div>{rangeINR(v.min, v.max)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Globe className="h-4 w-4 text-orange-200" /> International
              </div>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                {Object.entries(budgets.international).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="font-semibold text-white">{k}</div>
                    <div>{rangeINR(v.min, v.max)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {tab === 'Seasons' ? (
        <Card className="p-6">
          <SectionTitle title="Best Seasons" subtitle="Where to go depending on the season" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {bestSeasons.map((s) => (
              <div key={s.season} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Calendar className="h-4 w-4 text-cyan-200" /> {s.season}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.places.map((p) => (
                    <span key={p} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'Tips' ? (
        <Card className="p-6">
          <SectionTitle title="Travel Tips" subtitle="Small things that save time and money" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {travelTips.map((t) => (
              <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                {t}
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      <Card className="p-6">
        <div className="text-xs text-white/55">
          This page is built from your provided dataset. You can connect it to a backend later (MongoDB/Postgres)
          and replace static data with live feeds (IRCTC/RedBus/Booking APIs) where legally available.
        </div>
      </Card>
    </div>
  )
}
