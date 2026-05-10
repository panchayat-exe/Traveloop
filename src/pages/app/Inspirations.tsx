import { Card, SectionTitle } from '../../components/ui'

const rows = [
  {
    title: 'Chasing Sunsets',
    subtitle: 'Golden-hour destinations',
    image: 'https://images.pexels.com/photos/2916820/pexels-photo-2916820.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Food Trails',
    subtitle: 'Eat like a local',
    image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Water Adventures',
    subtitle: 'Dive, snorkel, swim',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
]

export default function Inspirations() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle title="Inspirations" subtitle="Ideas to spark your next trip" />
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {rows.map((r) => (
            <div key={r.title} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="relative h-44">
                <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="text-xs text-white/60">{r.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
