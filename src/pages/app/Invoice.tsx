import { Download, Share2 } from 'lucide-react'
import { Card, GhostButton, SectionTitle } from '../../components/ui'
import { useApp } from '../../lib/store'
import { formatCurrency } from '../../lib/utils'

const rows = [
  { desc: 'Scenic Flight', cat: 'Flights', date: 'May 20, 2024', amount: 800 },
  { desc: 'Kyron Resort', cat: 'Stays', date: 'May 20, 2024', amount: 1200 },
  { desc: 'Nusa Penida Tour', cat: 'Activities', date: 'May 22, 2024', amount: 180 },
  { desc: 'Driver at Lacroce', cat: 'Transport', date: 'May 21, 2024', amount: 80 },
  { desc: 'Airport Transfer', cat: 'Transport', date: 'May 20, 2024', amount: 50 },
]

export default function Invoice() {
  const { currency } = useApp()
  const subtotal = rows.reduce((a, r) => a + r.amount, 0)
  const service = Math.round(subtotal * 0.02)
  const total = subtotal + service

  return (
    <Card className="p-6">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <SectionTitle title="Expense Invoice" subtitle="Invoice #INV-2024-0522" />
        <div className="flex items-center gap-2">
          <GhostButton className="gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </GhostButton>
          <GhostButton className="gap-2">
            <Share2 className="h-4 w-4" /> Share
          </GhostButton>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs text-white/60">
            <tr>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.desc} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <div className="font-semibold">{r.desc}</div>
                </td>
                <td className="px-4 py-3 text-white/70">{r.cat}</td>
                <td className="px-4 py-3 text-white/70">{r.date}</td>
                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(r.amount, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="md:col-span-2" />
        <div className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm">
          <div className="flex items-center justify-between text-white/70">
            <div>Subtotal</div>
            <div className="font-semibold text-white">{formatCurrency(subtotal, currency)}</div>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <div>Service fee</div>
            <div className="font-semibold text-white">{formatCurrency(service, currency)}</div>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-center justify-between">
            <div className="text-white/70">Total</div>
            <div className="text-lg font-semibold">{formatCurrency(total, currency)}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
