import { Card, SectionTitle, Stat } from '../../components/ui'

export default function Analytics() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle title="Travel Insights" subtitle="Visualize your travel patterns" />
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Total Trips" value="12" />
          <Stat label="Countries Visited" value="8" />
          <Stat label="Total Spent" value="$18,450" />
          <Stat label="Days Traveled" value="86" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Travel Trends</div>
              <svg viewBox="0 0 640 240" className="mt-4 h-44 w-full">
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#22d3ee" stopOpacity="0.9" />
                    <stop offset="0.55" stopColor="#a855f7" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#fb923c" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
                <path
                  d="M20,150 C130,80 190,160 260,120 C330,80 400,120 470,90 C520,70 580,90 620,60"
                  fill="none"
                  stroke="url(#g2)"
                  strokeWidth="4"
                />
                <path
                  d="M20,150 C130,80 190,160 260,120 C330,80 400,120 470,90 C520,70 580,90 620,60 L620,220 L20,220 Z"
                  fill="url(#g2)"
                  opacity="0.12"
                />
              </svg>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Top Destinations</div>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                {[
                  ['Bali, Indonesia', '42%'],
                  ['Switzerland', '20%'],
                  ['Italy', '16%'],
                  ['Thailand', '12%'],
                  ['France', '10%'],
                ].map(([d, p]) => (
                  <div key={d} className="flex items-center justify-between">
                    <div>{d}</div>
                    <div className="font-semibold text-white">{p}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="https://images.pexels.com/photos/4198063/pexels-photo-4198063.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="map"
                  className="h-40 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
