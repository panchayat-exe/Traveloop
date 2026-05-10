import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Plane, Hotel, Ticket } from 'lucide-react'
import { Card, Chip, PrimaryButton, SectionTitle } from '../../components/ui'
import { useApp } from '../../lib/store'
import { formatCurrency } from '../../lib/utils'

const tabs = [
  { label: 'All', icon: CalendarDays },
  { label: 'Flights', icon: Plane },
  { label: 'Stays', icon: Hotel },
  { label: 'Activities', icon: Ticket },
]

export default function Bookings() {
  const { bookings, currency } = useApp()
  const [tab, setTab] = useState('All')
  const navigate = useNavigate()

  const list = useMemo(() => {
    if (tab === 'All') return bookings
    return bookings.filter((b) => b.tags.includes(tab))
  }, [bookings, tab])

  const selected = list[0]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <Card className="p-6 md:col-span-7">
        <SectionTitle title="Your Bookings" subtitle="Manage your trips, flights, and experiences" />
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <Chip key={t.label} active={tab === t.label} onClick={() => setTab(t.label)}>
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {t.label}
                </span>
              </Chip>
            )
          })}
        </div>

        <div className="mt-4 space-y-3">
          {list.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/35 to-cyan-400/15">
                <Plane className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{b.title}</div>
                <div className="truncate text-xs text-white/60">{b.dateRange}</div>
              </div>
              <div className="text-right">
                <div className="rounded-full bg-emerald-400/15 px-2 py-1 text-[11px] text-emerald-200">
                  {b.status}
                </div>
                <div className="mt-2 text-xs text-white/60">{formatCurrency(b.price, currency)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden p-0 md:col-span-5">
        {selected ? (
          <div className="relative">
            <div className="h-44">
              <img src={selected.image} className="h-full w-full object-cover" alt="detail" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-[#070B18]/35 to-transparent" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Booking Details</div>
                  <div className="text-xs text-white/60">{selected.location} trip</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                  {selected.nights} nights
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-white/55">Dates</div>
                  <div className="mt-1 font-semibold">{selected.dateRange}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-white/55">Total</div>
                  <div className="mt-1 font-semibold">{formatCurrency(selected.price, currency)}</div>
                </div>
              </div>

              <PrimaryButton className="mt-4 w-full py-3" onClick={() => navigate('/app/trips')}>
                View itinerary
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <SectionTitle title="No bookings" subtitle="Create a trip to see details" />
            <PrimaryButton onClick={() => navigate('/app/trips')}>Plan a trip</PrimaryButton>
          </div>
        )}
      </Card>
    </div>
  )
}
