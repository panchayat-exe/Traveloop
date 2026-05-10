import { Outlet, Navigate, useLocation } from 'react-router-dom'
import TopNav from './TopNav'
import { useApp } from '../lib/store'

export default function AppShell() {
  const { user } = useApp()
  const loc = useLocation()

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: loc.pathname }} />
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
