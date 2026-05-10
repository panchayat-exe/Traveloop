import { Heart, MessageCircle, TrendingUp } from 'lucide-react'
import { Card, Chip, SectionTitle } from '../../components/ui'
import { communityPosts } from '../../lib/data'

export default function Community() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <SectionTitle title="Travel Community" subtitle="Share trips, get tips, and connect" />
          <div className="flex flex-wrap gap-2">
            {['For You', 'Following', 'Popular'].map((t, i) => (
              <Chip key={i} active={i === 0}>
                <span className="inline-flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> {t}
                </span>
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {communityPosts.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="relative h-40">
                <img src={p.image} alt="post" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-[#070B18]/10 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <img
                    src={p.author.avatar}
                    alt="a"
                    className="h-8 w-8 rounded-xl border border-white/10 bg-white/5"
                  />
                  <div className="leading-tight">
                    <div className="text-sm font-semibold">{p.author.name}</div>
                    <div className="text-xs text-white/60">{p.author.handle} • {p.time}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-white/85">{p.title}</div>
                <div className="mt-4 flex items-center gap-4 text-xs text-white/60">
                  <div className="inline-flex items-center gap-2">
                    <Heart className="h-4 w-4" /> {p.likes}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> {p.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
