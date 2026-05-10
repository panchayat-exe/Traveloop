import { Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider, useApp } from './lib/store'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AppShell from './components/AppShell'
import PreviewShell from './components/PreviewShell'
import Home from './pages/app/Home'
import TripPlanner from './pages/app/TripPlanner'
import Explore from './pages/app/Explore'
import Deals from './pages/app/Deals'
import Inspirations from './pages/app/Inspirations'
import Bookings from './pages/app/Bookings'
import Budget from './pages/app/Budget'
import Invoice from './pages/app/Invoice'
import Community from './pages/app/Community'
import Assistant from './pages/app/Assistant'
import Journal from './pages/app/Journal'
import Analytics from './pages/app/Analytics'
import Profile from './pages/app/Profile'
import Settings from './pages/app/Settings'
import Checklist from './pages/app/Checklist'
import Admin from './pages/app/Admin'
import Notes from './pages/app/Notes'

function AdminGate() {
  const { user } = useApp()
  if (user?.role !== 'admin') return <Navigate to="/app/home" replace />
  return <Admin />
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route path="/preview" element={<PreviewShell />}>
          <Route index element={<Navigate to="/preview/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="deals" element={<Deals />} />
          <Route path="inspirations" element={<Inspirations />} />
        </Route>

        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="trips" element={<TripPlanner />} />
          <Route path="explore" element={<Explore />} />
          <Route path="deals" element={<Deals />} />
          <Route path="inspirations" element={<Inspirations />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="budget" element={<Budget />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="community" element={<Community />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="journal" element={<Journal />} />
          <Route path="analytics" element={<Analytics />} />
        <Route path="notes" element={<Notes />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="admin" element={<AdminGate />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  )
}
