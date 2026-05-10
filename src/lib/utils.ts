export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
