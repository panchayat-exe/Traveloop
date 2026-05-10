import { BarChart3, DollarSign, Users } from 'lucide-react'
import { Card, SectionTitle, Stat } from '../../components/ui'

export default function Admin() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle title="Admin Dashboard" subtitle="Overview of platform analytics" />
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Total Users" value="12,245" />
          <Stat label="Total Bookings" value="8,456" />
          <Stat label="Revenue" value="$245,680" />
          <Stat label="Active Now" value="320" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Bookings Overview</div>
                <Users className="h-4 w-4 text-white/60" />
              </div>
              <div className="mt-4">
                <div className="h-40 w-full rounded-3xl bg-gradient-to-r from-violet-500/20 to-cyan-400/10" />
              </div>
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Revenue Overview</div>
                <DollarSign className="h-4 w-4 text-white/60" />
              </div>
              <div className="mt-4">
                <div className="h-40 w-full rounded-3xl bg-gradient-to-r from-fuchsia-500/20 to-orange-400/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Growth</div>
            <BarChart3 className="h-4 w-4 text-white/60" />
          </div>
          <svg viewBox="0 0 700 240" className="mt-4 h-44 w-full">
            <defs>
              <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="0.55" stopColor="#a855f7" stopOpacity="0.7" />
                <stop offset="1" stopColor="#fb923c" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            <path
              d="M20,170 C150,90 240,170 320,120 C410,65 480,130 570,90 C630,65 670,90 690,55"
              fill="none"
              stroke="url(#g3)"
              strokeWidth="4"
            />
            <path
              d="M20,170 C150,90 240,170 320,120 C410,65 480,130 570,90 C630,65 670,90 690,55 L690,230 L20,230 Z"
              fill="url(#g3)"
              opacity="0.12"
            />
          </svg>
        </div>
      </Card>
    </div>
  )
}
