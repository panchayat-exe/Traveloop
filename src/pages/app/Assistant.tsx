import { useMemo, useState } from 'react'
import { Bot, Send } from 'lucide-react'
import { Card, SectionTitle } from '../../components/ui'

type Msg = { role: 'user' | 'ai'; text: string }

export default function Assistant() {
  const [input, setInput] = useState('What’s the best time to visit Bali?')
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'ai', text: "Hi! I’m TravelGPT — ask me anything (budget, seasons, routes, food, packing)." },
    { role: 'user', text: 'What’s the best time to visit Bali?' },
    {
      role: 'ai',
      text: 'May to September is ideal (dry season). For fewer crowds, try May/June or September. Want a 7-day itinerary with beach + culture + waterfalls?',
    },
  ])

  const quick = useMemo(
    () => [
      'Build a 7-day Bali itinerary (relaxed)',
      'Best Maldives resorts under $2k',
      'I want a food-focused Tokyo trip',
    ],
    [],
  )

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/40 to-cyan-400/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">TravelGPT</div>
            <div className="text-xs text-white/60">Ask about seasons, routes, budgets</div>
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Online
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="h-[520px] overflow-auto p-5">
            <div className="space-y-3">
              {msgs.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[92%] rounded-3xl border border-white/10 p-3 text-sm ${
                    m.role === 'user'
                      ? 'ml-auto bg-gradient-to-r from-violet-500/20 to-cyan-400/10 text-white'
                      : 'bg-white/5 text-white/80'
                  }`}
                >
                  {m.text}
                </div>
              ))}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Great choice! Here’s a preview:</div>
                <div className="mt-2 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="card"
                    className="h-40 w-full object-cover"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">7 Days in Bali</div>
                    <div className="text-xs text-white/60">From {`$1,300`} / person</div>
                  </div>
                  <button className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15">
                    View itinerary
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap gap-2 pb-3">
              {quick.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!input.trim()) return
                setMsgs((prev) => [...prev, { role: 'user', text: input.trim() }])
                setMsgs((prev) => [
                  ...prev,
                  {
                    role: 'ai',
                    text: 'Got it — I can generate that. In a real full-stack build, this message would come from your AI endpoint. Want it optimized for budget or luxury?',
                  },
                ])
                setInput('')
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                className="w-full rounded-2xl border border-white/10 bg-[#070B18] px-3 py-2.5 text-sm text-white/85 outline-none placeholder:text-white/35"
              />
              <button
                className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 md:col-span-4 md:border-l md:border-t-0">
          <div className="p-5">
            <SectionTitle title="Trip Snapshot" subtitle="What the AI is building" />
            <div className="space-y-3">
              {[
                ['Dates', 'Mar 10 – Mar 18'],
                ['Budget', '$1,500 – $2,800'],
                ['Mood', 'Relaxed + Culture'],
                ['Transport', 'Scooter + Driver'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-3xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/55">{k}</div>
                  <div className="mt-1 text-sm font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
