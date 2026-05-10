import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PrimaryButton, GhostButton, Card } from '../components/ui'
import Logo from '../components/Logo'
import { heroBg } from '../lib/store'

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} className="h-full w-full object-cover" alt="hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B18] via-[#070B18]/65 to-[#070B18]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.35),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.25),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(249,115,22,0.18),transparent_55%)]" />
      </div>

      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <Logo />
          <div className="flex items-center gap-2">
            <Link to="/auth/login">
              <GhostButton>Login</GhostButton>
            </Link>
            <Link to="/auth/register">
              <PrimaryButton>
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-14 pt-8 md:grid-cols-12 md:pt-12">
        <section className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            AI-powered travel planning, curated experiences, and real budgets
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Your Journey,
            <span className="bg-gradient-to-r from-orange-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
              {' '}Reimagined.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Build a stunning itinerary, track spending, book experiences, and share moments — all in one
            futuristic dashboard.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link to="/auth/register">
              <PrimaryButton className="px-6 py-3">Start Your Adventure</PrimaryButton>
            </Link>
            <Link to="/preview/home">
              <GhostButton className="px-6 py-3">Preview the App</GhostButton>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:max-w-xl md:grid-cols-4">
            {[
              ['AI Itineraries', 'Plan in minutes'],
              ['Budget', 'Stay on track'],
              ['Bookings', 'All in one place'],
              ['Community', 'Share & discover'],
            ].map(([t, s]) => (
              <Card key={t} className="p-3">
                <div className="text-sm font-semibold">{t}</div>
                <div className="text-xs text-white/60">{s}</div>
              </Card>
            ))}
          </div>
        </section>

        <aside className="md:col-span-5">
          <Card className="p-4">
            <div className="text-sm font-semibold">Insane preview</div>
            <div className="mt-2 overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1800"
                alt="travel preview"
                className="h-[340px] w-full object-cover"
              />
            </div>
            <div className="mt-3 text-xs text-white/60">
              Preview is a locked demo (no personal data shown). To plan trips, save bookings, or view
              your profile, please login.
            </div>
          </Card>
        </aside>
      </main>
    </div>
  )
}
