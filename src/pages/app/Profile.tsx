import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, MapPin, ShieldCheck, UserRound } from 'lucide-react'
import { Card, Chip, PrimaryButton, SectionTitle, Stat } from '../../components/ui'
import { useApp } from '../../lib/store'
import { fetchWeatherNow, weatherLabel } from '../../lib/realtime'

const recent = [
  {
    title: 'Bali, Indonesia',
    date: 'May 20 – May 30, 2024',
    image: 'https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Switzerland',
    date: 'Apr 10 – Apr 20, 2024',
    image: 'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Maldives',
    date: 'Mar 5 – Mar 12, 2024',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
]

export default function Profile() {
  const { user } = useApp()
  const [tab, setTab] = useState<'About' | 'Recent Trips' | 'Photos' | 'Saved'>('About')
  const [weather, setWeather] = useState<{ tempC: number; text: string } | null>(null)

  // Example: live weather for "home city" (Bali)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const w = await fetchWeatherNow(-8.4095, 115.1889)
        if (cancelled) return
        setWeather({ tempC: w.tempC, text: weatherLabel(w.code) })
      } catch {
        if (cancelled) return
        setWeather(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const display = useMemo(() => {
    return {
      name: user?.name ?? 'Traveler',
      handle: user?.handle ?? '@guest',
      avatar: user?.avatar ?? 'https://api.dicebear.com/8.x/lorelei/svg?seed=Traveler&backgroundColor=0b1020',
      role: user?.role ?? 'traveler',
    }
  }, [user])

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden p-6">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B18] via-[#070B18]/70 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={display.avatar}
              alt="avatar"
              className="h-16 w-16 rounded-3xl border border-white/10 bg-white/5"
            />
            <div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold">{display.name}</div>
                <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-200" />
                  {display.role === 'admin' ? 'Admin' : 'Verified'}
                </div>
              </div>
              <div className="mt-1 text-sm text-white/60">
                {display.handle} • Travel Enthusiast • Photographer • Dreamer
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/app/settings"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Edit Profile
            </Link>
            <PrimaryButton onClick={() => (window.location.href = '/app/trips')} className="px-4">
              Plan New Trip
            </PrimaryButton>
          </div>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Trips" value="12" />
          <Stat label="Countries" value="8" />
          <Stat label="Community" value="1.2k" />
          <Stat label="Followers" value="320" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-sm text-white/75">
            <MapPin className="h-4 w-4 text-white/60" />
            Home vibe: Bali
            <span className="text-white/45">•</span>
            {weather ? `${Math.round(weather.tempC)}°C ${weather.text}` : 'Weather unavailable'}
          </div>
          <div className="flex flex-wrap gap-2">
            {(['About', 'Recent Trips', 'Photos', 'Saved'] as const).map((t) => (
              <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      {tab === 'About' ? (
        <Card className="p-6">
          <SectionTitle title="About" subtitle="Your traveler identity" />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Bio</div>
                  <UserRound className="h-4 w-4 text-white/60" />
                </div>
                <div className="mt-2 text-sm text-white/70">
                  I collect sunsets, street food stories, and mountain trails. I plan trips like a producer: tight
                  timelines, beautiful moments.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Adventure', 'Food', 'Photography', 'Beaches', 'Hikes'].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Gear</div>
                  <Camera className="h-4 w-4 text-white/60" />
                </div>
                <div className="mt-3 space-y-2 text-sm text-white/70">
                  {['Mirrorless camera', 'Prime lens 35mm', 'Portable tripod', 'Drone (when allowed)'].map((g) => (
                    <div key={g} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {tab === 'Recent Trips' ? (
        <Card className="p-6">
          <SectionTitle title="Recent Trips" subtitle="Your latest adventures" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {recent.map((r) => (
              <button
                key={r.title}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left transition hover:bg-white/10"
                onClick={() => (window.location.href = '/app/bookings')}
              >
                <div className="relative h-40">
                  <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold">{r.title}</div>
                  <div className="text-xs text-white/60">{r.date}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'Photos' ? (
        <Card className="p-6">
          <SectionTitle title="Photos" subtitle="Your travel gallery" />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/386006/pexels-photo-386006.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/161815/santorini-oia-greece-architecture-161815.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/2916820/pexels-photo-2916820.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=1600',
            ].map((src) => (
              <div key={src} className="overflow-hidden rounded-3xl border border-white/10">
                <img src={src} alt="" className="h-40 w-full object-cover" />
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'Saved' ? (
        <Card className="p-6">
          <SectionTitle title="Saved" subtitle="Bookmarks & wishlists" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { title: 'Northern Lights (Iceland)', hint: 'Best time: Sep–Mar', to: '/app/explore' },
              { title: 'Maldives Water Villas', hint: 'Premium picks', to: '/app/deals' },
              { title: 'Tokyo Food Trail', hint: 'Street food + ramen', to: '/app/trips' },
              { title: 'Dolomites Hike Route', hint: '7 days', to: '/app/trips' },
            ].map((s) => (
              <button
                key={s.title}
                onClick={() => (window.location.href = s.to)}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
              >
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="text-xs text-white/60">{s.hint}</div>
              </button>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  )
}
