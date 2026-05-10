import { useNavigate } from 'react-router-dom'
import { Card, PrimaryButton, SectionTitle } from '../../components/ui'

const deals = [
  {
    title: 'Bali Escape',
    subtitle: 'Flights + stays + tour',
    price: '$899',
    image: 'https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Swiss Alps Week',
    subtitle: 'Mountain stays + rail pass',
    price: '$1,450',
    image: 'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Maldives Sun',
    subtitle: 'All inclusive villas',
    price: '$1,990',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
]

export default function Deals() {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle title="Deals" subtitle="Limited-time offers picked for you" />
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {deals.map((d) => (
            <div key={d.title} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="relative h-40">
                <img src={d.image} alt={d.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{d.title}</div>
                    <div className="text-xs text-white/60">{d.subtitle}</div>
                  </div>
                  <div className="text-sm font-semibold text-orange-200">{d.price}</div>
                </div>
                <PrimaryButton className="mt-3 w-full" onClick={() => navigate('/app/bookings')}>
                  Grab deal
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
