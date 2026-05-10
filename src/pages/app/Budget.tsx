import { useMemo } from 'react'
import { Card, SectionTitle } from '../../components/ui'
import { useApp } from '../../lib/store'
import { formatCurrency } from '../../lib/utils'

export default function Budget() {
  const { bookings, currency } = useApp()

  const total = useMemo(() => bookings.reduce((a, b) => a + b.price, 0), [bookings])
  const spent = Math.round(total * 0.65)
  const remaining = Math.max(0, total - spent)

  const categories = [
    { label: 'Flights', value: Math.round(spent * 0.5), color: 'text-cyan-200' },
    { label: 'Stays', value: Math.round(spent * 0.3), color: 'text-violet-200' },
    { label: 'Activities', value: Math.round(spent * 0.2), color: 'text-orange-200' },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <Card className="p-6 md:col-span-8">
        <SectionTitle title="Your Budget Overview" subtitle="Track expenses and stay on budget" />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Total Budget</div>
            <div className="mt-1 text-2xl font-semibold">{formatCurrency(total, currency)}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Total Spent</div>
            <div className="mt-1 text-2xl font-semibold">{formatCurrency(spent, currency)}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Remaining</div>
            <div className="mt-1 text-2xl font-semibold text-emerald-200">
              {formatCurrency(remaining, currency)}
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/60">Spending over time</div>
          <svg viewBox="0 0 600 220" className="mt-4 h-44 w-full">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="0.55" stopColor="#a855f7" stopOpacity="0.7" />
                <stop offset="1" stopColor="#fb923c" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            <path
              d="M20,160 C120,120 190,170 260,140 C330,110 390,130 460,90 C520,60 560,90 580,70"
              fill="none"
              stroke="url(#g)"
              strokeWidth="4"
            />
            <path
              d="M20,160 C120,120 190,170 260,140 C330,110 390,130 460,90 C520,60 560,90 580,70 L580,210 L20,210 Z"
              fill="url(#g)"
              opacity="0.12"
            />
          </svg>
        </div>
      </Card>

      <Card className="p-6 md:col-span-4">
        <SectionTitle title="Expense Breakdown" subtitle="Where your money goes" />
        <div className="mt-2 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/20 to-violet-500/15">
            <div className="text-center">
              <div className="text-xs text-white/60">Spent</div>
              <div className="text-2xl font-semibold">{formatCurrency(spent, currency)}</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {categories.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-sm">
                <div className="text-white/70">{c.label}</div>
                <div className={`font-semibold ${c.color}`}>{formatCurrency(c.value, currency)}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
