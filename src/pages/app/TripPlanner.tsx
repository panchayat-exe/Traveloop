import { useMemo, useState } from 'react'
import { CheckCircle2, Map, Sparkles } from 'lucide-react'
import { Card, Chip, PrimaryButton, SectionTitle } from '../../components/ui'

type PlannerForm = {
  destination: string
  days: number
  travelStyle: string
  budget: string
}

const defaultItinerary = [
  { day: 1, title: 'Arrive & settle in', bullets: ['Airport pickup', 'Check-in', 'Sunset viewpoint'] },
  { day: 2, title: 'Old town & street food', bullets: ['Walking tour', 'Night market', 'Hidden cafe'] },
  { day: 3, title: 'Adventure day', bullets: ['Hike', 'Waterfall swim', 'Local dinner'] },
  { day: 4, title: 'Slow morning', bullets: ['Spa', 'Beach time', 'Sunrise photos'] },
  { day: 5, title: 'Island hopping', bullets: ['Boat tour', 'Snorkeling', 'Seafood'] },
]

export default function TripPlanner() {
  const [form, setForm] = useState<PlannerForm>({
    destination: 'Bali, Indonesia',
    days: 7,
    travelStyle: 'Balanced',
    budget: '$2,500 – $3,000',
  })
  const [activeDay, setActiveDay] = useState(2)

  const itinerary = useMemo(() => {
    const base = defaultItinerary.slice(0, Math.min(10, Math.max(3, form.days)))
    return base.map((d) => ({ ...d, title: d.title.replace('day', form.destination) }))
  }, [form.days, form.destination])

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <Card className="p-6 md:col-span-5">
        <SectionTitle title="Plan Your Perfect Trip" subtitle="Craft an itinerary that matches your vibe" />

        <div className="space-y-3">
          <label className="block">
            <div className="mb-1 text-xs text-white/60">Destination</div>
            <input
              value={form.destination}
              onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/85 outline-none placeholder:text-white/35"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <div className="mb-1 text-xs text-white/60">Days</div>
              <input
                type="number"
                min={3}
                max={14}
                value={form.days}
                onChange={(e) => setForm((p) => ({ ...p, days: Number(e.target.value || 7) }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/85 outline-none"
              />
            </label>
            <label className="block">
              <div className="mb-1 text-xs text-white/60">Budget</div>
              <input
                value={form.budget}
                onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/85 outline-none"
              />
            </label>
          </div>

          <div>
            <div className="mb-2 text-xs text-white/60">Travel Style</div>
            <div className="flex flex-wrap gap-2">
              {['Relaxed', 'Balanced', 'Adventurous', 'Luxury'].map((s) => (
                <Chip
                  key={s}
                  active={form.travelStyle === s}
                  onClick={() => setForm((p) => ({ ...p, travelStyle: s }))}
                >
                  {s}
                </Chip>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Trip Preferences</div>
                <div className="text-xs text-white/60">Choose what you care about</div>
              </div>
              <Map className="h-5 w-5 text-white/60" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Flights', 'Stays', 'Activities', 'Transport', 'Food'].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>

          <PrimaryButton className="w-full py-3">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Itinerary
          </PrimaryButton>

          <div className="text-xs text-white/55">
            Tip: the itinerary updates instantly. In a real full-stack app this would call your API.
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden p-6 md:col-span-7">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.22),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_40%_90%,rgba(249,115,22,0.12),transparent_60%)]" />
          <svg className="absolute -right-10 top-10 h-[520px] w-[520px] opacity-80" viewBox="0 0 600 600">
            <path
              d="M80,120 C220,10 250,260 360,190 C470,120 430,350 520,320"
              fill="none"
              stroke="rgba(34,211,238,0.45)"
              strokeWidth="3"
              strokeDasharray="6 10"
            />
            <path
              d="M90,260 C220,170 260,420 380,350 C500,280 470,520 560,470"
              fill="none"
              stroke="rgba(168,85,247,0.35)"
              strokeWidth="3"
              strokeDasharray="4 12"
            />
            <circle cx="80" cy="120" r="6" fill="rgba(249,115,22,0.9)" />
            <circle cx="360" cy="190" r="6" fill="rgba(34,211,238,0.9)" />
            <circle cx="520" cy="320" r="6" fill="rgba(168,85,247,0.9)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <SectionTitle title="AI Generated Itinerary" subtitle={`${form.days} Days • ${form.destination}`} />
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Model: TravelGPT
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-3">
            {itinerary.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 ${
                  activeDay === d.day ? 'ring-1 ring-cyan-300/40' : ''
                }`}
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/35 to-cyan-400/15">
                  <div className="text-sm font-semibold">{d.day}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">Day {d.day}: {d.title}</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {d.bullets.map((b) => (
                      <div key={b} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/65">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-200/80" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
