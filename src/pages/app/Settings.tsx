import { useApp } from '../../lib/store'
import { Card, Chip, PrimaryButton, SectionTitle } from '../../components/ui'

export default function Settings() {
  const { theme, setTheme, currency, setCurrency } = useApp()

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <Card className="p-6 md:col-span-4">
        <SectionTitle title="Settings" subtitle="Manage your preferences" />
        <div className="space-y-2 text-sm text-white/75">
          {['Account', 'Notifications', 'Privacy', 'Connected Accounts', 'Appearance'].map((t) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
            >
              {t}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 md:col-span-8">
        <SectionTitle title="Appearance" subtitle="Choose your vibe" />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold">Theme</div>
            <div className="mt-3 flex gap-2">
              <Chip active={theme === 'light'} onClick={() => setTheme('light')}>
                Light
              </Chip>
              <Chip active={theme === 'dark'} onClick={() => setTheme('dark')}>
                Dark
              </Chip>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold">Currency</div>
            <div className="mt-3 flex gap-2">
              <Chip active={currency === 'USD'} onClick={() => setCurrency('USD')}>
                USD
              </Chip>
              <Chip active={currency === 'EUR'} onClick={() => setCurrency('EUR')}>
                EUR
              </Chip>
            </div>
          </div>
        </div>

        <PrimaryButton className="mt-5">Save changes</PrimaryButton>
      </Card>
    </div>
  )
}
