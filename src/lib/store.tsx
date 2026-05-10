import React, { createContext, useContext, useMemo, useState } from 'react'
import { assets, bookings, type Trip } from './data'

export type User = {
  name: string
  handle: string
  role: 'traveler' | 'admin'
  avatar: string
}

type AppState = {
  user: User | null
  theme: 'dark' | 'light'
  currency: 'USD' | 'EUR'
  bookings: Trip[]
  login: (email: string) => void
  logout: () => void
  setTheme: (t: 'dark' | 'light') => void
  setCurrency: (c: 'USD' | 'EUR') => void
  addBooking: (trip: Trip) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD')
  const [myBookings, setMyBookings] = useState<Trip[]>([])

  const value = useMemo<AppState>(
    () => ({
      user,
      theme,
      currency,
      bookings: myBookings,
      login: (email: string) => {
        const isAdmin = email.toLowerCase().includes('admin')
        setUser({
          name: isAdmin ? 'Admin' : 'Soche Sharma',
          handle: isAdmin ? '@admin' : '@soche',
          role: isAdmin ? 'admin' : 'traveler',
          avatar:
            'https://api.dicebear.com/8.x/lorelei/svg?seed=' +
            encodeURIComponent(isAdmin ? 'Admin' : 'Soche') +
            '&backgroundColor=0b1020',
        })
      },
      logout: () => setUser(null),
      setTheme,
      setCurrency,
      addBooking: (trip: Trip) => setMyBookings((prev) => [trip, ...prev]),
    }),
    [currency, myBookings, theme, user],
  )

  return (
    <Ctx.Provider value={value}>
      <div
        className={
          theme === 'dark'
            ? 'min-h-screen bg-[#070B18] text-white'
            : 'min-h-screen bg-slate-50 text-slate-900'
        }
      >
        {children}
      </div>
    </Ctx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function useAuthed() {
  const { user } = useApp()
  return Boolean(user)
}

export function requireRole(user: User | null, role: User['role']) {
  return user?.role === role
}

export const heroBg = assets.mockHero
