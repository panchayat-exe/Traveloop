import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, User2 } from 'lucide-react'
import Logo from '../../components/Logo'
import { Card, PrimaryButton, GhostButton } from '../../components/ui'
import { useApp } from '../../lib/store'

export default function Register() {
  const [name, setName] = useState('Soche Sharma')
  const [email, setEmail] = useState('soche@traveloop.io')
  const [password, setPassword] = useState('password')
  const { login } = useApp()
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1800"
          className="h-full w-full object-cover"
          alt="bg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B18] via-[#070B18]/70 to-[#070B18]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.35),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.25),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(249,115,22,0.20),transparent_55%)]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/auth/login">
          <GhostButton>Login</GhostButton>
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-12 pt-6 md:grid-cols-12 md:pt-10">
        <section className="md:col-span-7">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Create your account</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Join Traveloop and build an itinerary you’ll actually love.
          </p>
        </section>

        <aside className="md:col-span-5">
          <Card className="p-5">
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                login(email)
                navigate('/app/home')
              }}
            >
              <div className="text-sm font-semibold">Sign up</div>

              <label className="block">
                <div className="mb-1 text-xs text-white/60">Full name</div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <User2 className="h-4 w-4 text-white/60" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-sm text-white/85 placeholder:text-white/35 outline-none"
                    placeholder="Your name"
                  />
                </div>
              </label>

              <label className="block">
                <div className="mb-1 text-xs text-white/60">Email</div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <Mail className="h-4 w-4 text-white/60" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-white/85 placeholder:text-white/35 outline-none"
                    placeholder="you@traveloop.io"
                  />
                </div>
              </label>

              <label className="block">
                <div className="mb-1 text-xs text-white/60">Password</div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <Lock className="h-4 w-4 text-white/60" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full bg-transparent text-sm text-white/85 placeholder:text-white/35 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </label>

              <PrimaryButton type="submit" className="w-full py-3">
                Create account
              </PrimaryButton>

              <div className="text-center text-xs text-white/55">
                By continuing, you agree to our{' '}
                <button className="text-white hover:underline" type="button">
                  Terms
                </button>
                .
              </div>
            </form>
          </Card>
        </aside>
      </main>
    </div>
  )
}
