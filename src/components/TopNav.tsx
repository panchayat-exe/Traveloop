import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Search, Settings, UserCircle2 } from 'lucide-react'
import Logo from './Logo'
import { cn } from '../lib/utils'
import { useApp } from '../lib/store'

const links = [
  { to: '/app/home', label: 'Home' },
  { to: '/app/trips', label: 'Trips' },
  { to: '/app/explore', label: 'Explore' },
  { to: '/app/deals', label: 'Deals' },
  { to: '/app/inspirations', label: 'Inspirations' },
  { to: '/app/notes', label: 'Notes' },
  { to: '/app/profile', label: 'Profile' },
]

export default function TopNav() {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070B18]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white',
                    isActive && 'bg-white/12 text-white',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-white/60" />
            <input
              placeholder="Search destinations, activities, or interests"
              className="w-[320px] bg-transparent text-sm text-white/80 placeholder:text-white/40 outline-none"
            />
            <kbd className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/50">
              ⌘ K
            </kbd>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10"
            aria-label="Notifications"
            onClick={() => navigate('/app/bookings')}
          >
            <Bell className="h-5 w-5" />
          </button>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10"
            aria-label="Settings"
            onClick={() => navigate('/app/settings')}
          >
            <Settings className="h-5 w-5" />
          </button>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10"
            aria-label="Profile"
            onClick={() => navigate('/app/profile')}
            title="Profile"
          >
            <UserCircle2 className="h-5 w-5" />
          </button>

          {user ? (
            <div className="ml-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5">
              <img
                src={user.avatar}
                alt="avatar"
                className="h-8 w-8 rounded-xl border border-white/10 bg-white/5"
              />
              <div className="hidden pr-2 leading-tight md:block">
                <div className="text-xs font-semibold">{user.name}</div>
                <div className="text-[11px] text-white/55">{user.handle}</div>
              </div>
              <button
                onClick={() => {
                  logout()
                  navigate('/auth/login')
                }}
                className="grid h-8 w-8 place-items-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
