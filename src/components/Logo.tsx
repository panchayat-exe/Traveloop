import { Compass } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)]">
        <Compass className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-wide">Traveloop</div>
        <div className="text-[11px] text-white/60">AI-driven journeys</div>
      </div>
    </div>
  )
}
