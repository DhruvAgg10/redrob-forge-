import { SlideWrap, SlideHeader, HoverCard } from '../PresentationDeck'
import { Hammer, FileText, BarChart3, Code2, Compass, Video, MessageSquare, Wallet } from 'lucide-react'

// Use-case prioritization 2x2: Value (Y) × Scale (X)
type Tile = {
  icon: any
  name: string
  replaces: string
  desc: string
  value: number   // 0-100 (y-axis)
  scale: number   // 0-100 (x-axis)
  detail: string
}

const TILES: Tile[] = [
  { icon: Compass, name: 'Career Path', replaces: '(new layer)', desc: 'Paste resume → 3 distinct routes', value: 90, scale: 92,
    detail: 'No-login top-of-funnel. AI-generated. The highest-leverage acquisition surface. Free Career Path is the hook that converts to signups, then to Skill Studio.' },
  { icon: Hammer, name: 'Skill Studio', replaces: 'Skill Tests (Soon)', desc: 'MBA tasks, AI-graded, mints W3C cred', value: 88, scale: 78,
    detail: 'Activation moment. Mint a credential within 20 min of signup. Replaces gameable MCQs with open-ended writing graded by LLM-as-judge.' },
  { icon: Code2, name: 'Challenges', replaces: 'Redrob Code (Soon)', desc: 'Real company sprints + paid trial', value: 95, scale: 65,
    detail: 'Where Forge monetizes the recruiter side. Each posted challenge brings new recruiters into the funnel. Each successful hire pays ₹49,999.' },
  { icon: FileText, name: 'ATS Resume Scanner', replaces: 'Resume Builder (Soon)', desc: 'Score vs JD with AI fixes', value: 70, scale: 88,
    detail: 'Lightweight, high-volume utility. Brings users in who aren\'t ready for Skill Studio yet. Top of funnel for ₹199 Pro upsell.' },
  { icon: Wallet, name: 'Credential Wallet', replaces: '(new layer)', desc: 'W3C VC portable proof', value: 82, scale: 75,
    detail: 'Retention engine. Every credential earned lives here permanently. Shareable verifier link drives LinkedIn virality.' },
  { icon: Video, name: 'Defence Interview', replaces: 'Interview Coach (Soon)', desc: 'AI defence after submission', value: 75, scale: 55,
    detail: 'Quality moat. Differentiates Forge from any MCQ-based competitor. Real conversation, real probing, real score. Recruiter trust builder.' },
  { icon: MessageSquare, name: 'Market Pulse', replaces: 'Market Pulse (Soon)', desc: 'NL queries on hiring graph', value: 55, scale: 35,
    detail: 'B2B value. Enterprise recruiters use it for strategic hiring decisions. Lower scale but high willingness-to-pay in enterprise tier.' },
  { icon: BarChart3, name: 'Skills Leaderboard', replaces: 'Leaderboard (Soon)', desc: 'Rank by verified skill + Peer Mentor AI', value: 50, scale: 70,
    detail: 'Engagement amplifier. Peer Mentor AI personas of top candidates is a Day-1 wow moment. Status loop for status-conscious segment.' },
]

export function Slide04() {
  return (
    <SlideWrap>
      <SlideHeader
        number="03"
        framework="Use-Case Prioritization (Value × Scale)"
        title={<>8 working tiles inside Redrob today. <span className="text-[#2563EB]">Mapped to value × scale.</span></>}
        subtitle="Forge isn't a new product — it's Redrob's roadmap shipped. Each tile plotted by business value (Y) vs user-scale potential (X). Top-right = ship first. Hover any tile for details."
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Use-case 2x2 matrix */}
        <div className="lg:col-span-3 relative rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] aspect-square p-6 min-h-[500px]">
          {/* Axis labels */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">↑ HIGH BUSINESS VALUE</div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">↓ Low value</div>
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] rotate-90 origin-center">HIGH USER SCALE →</div>
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] -rotate-90 origin-center">← Niche</div>

          {/* Crosshair */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-[#E5E7EB]"/>
          <div className="absolute top-1/2 left-8 right-8 h-px bg-[#E5E7EB]"/>

          {/* Quadrant labels */}
          <div className="absolute top-12 left-12 text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA]">Niche · High value</div>
          <div className="absolute top-12 right-12 text-[9px] uppercase tracking-wider font-mono text-[#2563EB] font-semibold">SHIP FIRST · High value · Scale</div>
          <div className="absolute bottom-12 left-12 text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA]">Deprioritize</div>
          <div className="absolute bottom-12 right-12 text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA]">High volume · Lower value</div>

          {/* Tile bubbles */}
          {TILES.map((t) => <TileBubble key={t.name} t={t}/>)}
        </div>

        {/* Tile list */}
        <div className="lg:col-span-2 space-y-2 max-h-[500px] overflow-auto pr-1">
          <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-2">All 8 tiles — hover for full details</div>
          {TILES.slice().sort((a, b) => (b.value + b.scale) - (a.value + a.scale)).map((t) => (
            <TileListRow key={t.name} t={t}/>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Insight number="01" label="Top right priority" body="Career Path + Skill Studio. High value + high scale. They're the activation funnel."/>
        <Insight number="02" label="High value niche" body="Challenges + Defence Interview. Smaller user base but biggest revenue per user. Ship for recruiters."/>
        <Insight number="03" label="Scale plays" body="ATS Scanner + Skills Leaderboard. High volume utilities. Top of funnel for Pro upsell."/>
      </div>
    </SlideWrap>
  )
}

function TileBubble({ t }: { t: Tile }) {
  const x = t.scale
  const y = 100 - t.value
  const isTopRight = t.value > 75 && t.scale > 60
  const labelLeft = x > 70
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
      <HoverCard title={t.name + ' · Replaces ' + t.replaces} body={t.detail}>
        <div className={`rounded-full flex items-center justify-center cursor-help shadow-md transition-all hover:scale-110 relative ${isTopRight ? 'bg-[#2563EB] text-white' : 'bg-white text-[#0A0A0A] border-2 border-[#0A0A0A]'}`}
             style={{ width: 56, height: 56 }}>
          <t.icon size={20}/>
        </div>
      </HoverCard>
      <div className={`absolute top-1/2 -translate-y-1/2 text-[10px] text-[#0A0A0A] font-semibold whitespace-nowrap ${labelLeft ? 'right-full mr-2 text-right' : 'left-full ml-2'}`}>
        {t.name}
      </div>
    </div>
  )
}

function TileListRow({ t }: { t: Tile }) {
  const isTopRight = t.value > 75 && t.scale > 60
  return (
    <HoverCard title={t.name} body={t.detail}>
      <div className={`flex items-start gap-3 rounded-xl p-3 cursor-help transition ${isTopRight ? 'bg-[#2563EB]/5 border border-[#2563EB]/30' : 'border border-[#E5E7EB] hover:bg-[#FAFAFA]'}`}>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isTopRight ? 'bg-[#2563EB] text-white' : 'bg-[#F4F4F5] text-[#0A0A0A]'}`}>
          <t.icon size={16}/>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <div className="font-semibold text-sm">{t.name}</div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#A1A1AA] px-1.5 py-0.5 rounded bg-[#F4F4F5]">NEW</span>
          </div>
          <div className="text-[11px] text-[#525252] mt-0.5">{t.desc}</div>
          <div className="text-[10px] text-[#A1A1AA] mt-1 font-mono">Replaces · {t.replaces}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[9px] font-mono text-[#A1A1AA]">V {t.value}</div>
          <div className="text-[9px] font-mono text-[#A1A1AA]">S {t.scale}</div>
        </div>
      </div>
    </HoverCard>
  )
}

function Insight({ number, label, body }: any) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] p-4">
      <div className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider">{number} · {label}</div>
      <p className="text-sm text-[#0A0A0A] mt-2 leading-relaxed">{body}</p>
    </div>
  )
}
