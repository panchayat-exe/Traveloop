import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, SectionTitle, PrimaryButton } from '../../components/ui'
import { assets } from '../../lib/data'

const days = [
  { id: 'd1', label: 'Day 1', date: 'May 20', title: 'Arrival & Beachwalk' },
  { id: 'd2', label: 'Day 2', date: 'May 21', title: 'Ubud Exploration' },
  { id: 'd3', label: 'Day 3', date: 'May 22', title: 'Waterfalls & Temples' },
  { id: 'd4', label: 'Day 4', date: 'May 23', title: 'Island Day' },
]

export default function Journal() {
  const [active, setActive] = useState('d2')

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <Card className="p-5 md:col-span-4">
        <div className="flex items-center justify-between">
          <SectionTitle title="My Travel Journal" subtitle="Capture your memories" />
          <PrimaryButton className="h-10 px-4">
            <Plus className="h-4 w-4" />
          </PrimaryButton>
        </div>

        <div className="mt-3 space-y-2">
          {days.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`w-full rounded-3xl border border-white/10 px-3 py-3 text-left transition hover:bg-white/10 ${
                active === d.id ? 'bg-white/10' : 'bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{d.label}</div>
                <div className="text-xs text-white/55">{d.date}</div>
              </div>
              <div className="mt-1 text-xs text-white/60">{d.title}</div>
            </button>
          ))}
        </div>

        <button className="mt-3 w-full rounded-3xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm font-semibold text-white/80 hover:bg-white/10">
          + Add Day
        </button>
      </Card>

      <Card className="relative overflow-hidden p-0 md:col-span-8">
        <div className="relative h-56">
          <img src={assets.bali} className="h-full w-full object-cover" alt="cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-[#070B18]/25 to-transparent" />
        </div>
        <div className="p-5">
          <div className="text-sm font-semibold">Day 2 – Ubud Exploration</div>
          <div className="mt-2 text-sm text-white/70">
            Explored the rice terraces and visited a hidden waterfall. The vibe is unreal and the air is
            sweet with frangipani.
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src="https://images.pexels.com/photos/386006/pexels-photo-386006.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="j1"
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="j2"
                className="h-40 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
