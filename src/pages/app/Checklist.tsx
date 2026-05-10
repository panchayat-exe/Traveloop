import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { Card, Chip, PrimaryButton, SectionTitle } from '../../components/ui'

const items = [
  { id: 'i1', group: 'Documents', label: 'Passport' },
  { id: 'i2', group: 'Documents', label: 'Travel Insurance' },
  { id: 'i3', group: 'Documents', label: 'Visa / eSIM' },
  { id: 'i4', group: 'Clothing', label: 'Swimwear' },
  { id: 'i5', group: 'Clothing', label: 'Rain jacket' },
  { id: 'i6', group: 'Gadgets', label: 'Power adapter' },
  { id: 'i7', group: 'Gadgets', label: 'Portable charger' },
  { id: 'i8', group: 'Accessories', label: 'Sunscreen' },
  { id: 'i9', group: 'Accessories', label: 'Mosquito repellent' },
]

export default function Checklist() {
  const groups = useMemo(() => Array.from(new Set(items.map((i) => i.group))), [])
  const [done, setDone] = useState<Record<string, boolean>>({ i1: true, i2: true, i4: true })

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <Card className="p-6 md:col-span-7">
        <SectionTitle title="Packing Checklist" subtitle="Don’t forget the important stuff" />

        <div className="mt-4 space-y-4">
          {groups.map((g) => (
            <div key={g}>
              <div className="text-xs font-semibold text-white/65">{g}</div>
              <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                {items
                  .filter((i) => i.group === g)
                  .map((i) => (
                    <button
                      key={i.id}
                      onClick={() => setDone((p) => ({ ...p, [i.id]: !p[i.id] }))}
                      className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10"
                    >
                      <div className="font-semibold">{i.label}</div>
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-2xl border border-white/10 ${
                          done[i.id] ? 'bg-emerald-400/20 text-emerald-100' : 'bg-white/5 text-white/60'
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <PrimaryButton>Add to list</PrimaryButton>
          <Chip>AI suggestions</Chip>
        </div>
      </Card>

      <Card className="p-6 md:col-span-5">
        <SectionTitle title="AI Suggestions" subtitle="Smart add-ons" />
        <div className="space-y-2">
          {[
            'Water shoes',
            'Microfiber towel',
            'Offline maps',
            'Motion sickness pills',
            'Reef-safe sunscreen',
          ].map((s) => (
            <div key={s} className="rounded-3xl border border-white/10 bg-white/5 px-3 py-3 text-sm">
              {s}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
