import { Outlet, useNavigate } from 'react-router-dom'
import { Lock, Sparkles } from 'lucide-react'
import Logo from './Logo'

export default function PreviewShell() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070B18]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 md:inline-flex">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              Preview mode
            </div>
            <button
              onClick={() => navigate('/auth/login')}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-orange-400 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.25)] hover:brightness-110"
            >
              <Lock className="h-4 w-4" /> Login to unlock
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
