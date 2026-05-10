import React from 'react'
import { cn } from '../lib/utils'

export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Chip({
  className,
  children,
  active,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10',
        active && 'bg-gradient-to-r from-violet-500/30 to-cyan-400/20 text-white',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <div className="text-base font-semibold tracking-tight">{title}</div>
      {subtitle ? <div className="text-sm text-white/55">{subtitle}</div> : null}
    </div>
  )
}

export function PrimaryButton({
  children,
  className,
  onClick,
  type,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.25)] transition hover:brightness-110 active:brightness-95',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function GhostButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function Stat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  )
}
