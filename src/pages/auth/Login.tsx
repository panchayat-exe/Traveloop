import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Logo from '../../components/Logo'
import { Card, PrimaryButton, GhostButton } from '../../components/ui'
import { useApp } from '../../lib/store'

export default function Login() {
  const [email, setEmail] = useState('terry@traveloop.io')
  const [password, setPassword] = useState('password')
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { login } = useApp()

  const hint = useMemo(() => {
    if (email.toLowerCase().includes('admin')) return 'Admin access enabled'
    return 'Traveler access enabled'
  }, [email])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1800"
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
        <Link to="/auth/register">
          <GhostButton>Create account</GhostButton>
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-12 pt-6 md:grid-cols-12 md:pt-10">
        <section className="md:col-span-7">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Welcome back</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Login to continue planning. Tip: use an email containing{' '}
            <span className="font-semibold text-white">admin</span> to open the admin panel.
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
              <div className="text-sm font-semibold">Sign in</div>

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
                    type={show ? 'text' : 'password'}
                    className="w-full bg-transparent text-sm text-white/85 placeholder:text-white/35 outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="grid h-8 w-8 place-items-center rounded-xl text-white/60 transition hover:bg-white/10"
                    aria-label="Toggle password"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-white/55">{hint}</div>
                <button type="button" className="text-xs text-cyan-200 hover:underline">
                  Forgot password?
                </button>
              </div>

              <PrimaryButton type="submit" className="w-full py-3">
                Continue
              </PrimaryButton>

              <div className="text-center text-xs text-white/55">
                New here?{' '}
                <Link className="text-white hover:underline" to="/auth/register">
                  Create an account
                </Link>
              </div>
            </form>
          </Card>
        </aside>
      </main>
    </div>
  )
}
