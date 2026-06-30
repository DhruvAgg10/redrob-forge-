import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'
import { Search, UserPlus, Target, Trophy, ArrowRight } from 'lucide-react'

const STAGES = [
  {
    stage: 'Discover',
    icon: Search,
    color: '#2563EB',
    before: 'Takes skill tests via university placement cell. Uses AI chat + Job Search. No career direction tool.',
    after: 'Sees Forge tiles in AI App Store → tries Career Path → gets 3 personalised role routes. No login.',
    intervention: 'Career Path (free)',
    improves: 'From passive browsing → instant personalised career direction',
  },
  {
    stage: 'Onboard',
    icon: UserPlus,
    color: '#1E40AF',
    before: 'Signs up free. Uses Resume Ranker + People Search. But no way to prove skills — resume is the only signal.',
    after: '"Save your path" → signup → takes Skill Studio task → earns W3C credential.',
    intervention: 'Skill Studio + Wallet',
    improves: 'From waiting → proving skill in 20 min with a portable credential',
  },
  {
    stage: 'Engage',
    icon: Target,
    color: '#7C3AED',
    before: 'Searches jobs across 50+ platforms. Applies. No feedback, no way to stand out from other applicants.',
    after: 'Credentialed → sees closed Challenges → submits real work → AI Defence Interview → ranked.',
    intervention: 'Challenges + Defence',
    improves: 'From black-box applications → skill-gated, ranked pipeline',
  },
  {
    stage: 'Value',
    icon: Trophy,
    color: '#DC2626',
    before: 'Gets interview through traditional channels. No verified skill signal sent. No trial mechanism.',
    after: 'Paid trial (₹25K stipend) → hired. Credential shared on LinkedIn → referral loop.',
    intervention: 'Paid Trial + Leaderboard',
    improves: 'From hope → verifiable outcome + viral referral',
  },
]

export function Slide05() {
  return (
    <SlideWrap>
      <SlideHeader
        number="04"
        framework="User Journey Map"
        title={<>Discover → Onboard → Engage → <span className="text-[#2563EB]">Value.</span></>}
        subtitle=""
      />

      {/* Journey Map — visual flow */}
      <div className="grid grid-cols-4 gap-0 mb-5">
        {STAGES.map((s, i) => (
          <div key={s.stage} className="relative">
            {/* Stage header with icon */}
            <div className="flex items-center justify-center gap-2 py-2.5 text-white text-xs font-bold uppercase tracking-wider" style={{ background: s.color }}>
              <s.icon size={14}/>
              {s.stage}
            </div>

            <div className="border border-t-0 border-[#E5E7EB] p-3 h-full flex flex-col gap-3">
              {/* Before */}
              <div>
                <div className="text-[8px] uppercase tracking-wider font-mono text-[#DC2626] font-bold mb-1">Before Forge</div>
                <div className="text-[10px] text-[#A1A1AA] leading-snug line-through decoration-[#DC2626]/30">{s.before}</div>
              </div>

              {/* After */}
              <div>
                <div className="text-[8px] uppercase tracking-wider font-mono text-[#22C55E] font-bold mb-1">With Forge</div>
                <div className="text-[10px] text-[#0A0A0A] leading-snug font-medium">{s.after}</div>
              </div>

              {/* Intervention point */}
              <div className="mt-auto">
                <div className="text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">Forge intervention</div>
                <div className="text-[10px] font-bold rounded-md px-2 py-1 text-center text-white" style={{ background: s.color }}>{s.intervention}</div>
              </div>
            </div>

            {/* Arrow between stages */}
            {i < 3 && (
              <div className="absolute top-[18px] -right-[9px] z-10 text-white">
                <ArrowRight size={14}/>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* How does the experience improve — icon row */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">How the experience improves at each stage</div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {STAGES.map((s) => (
          <div key={s.stage} className="rounded-lg border border-[#E5E7EB] p-3 text-center">
            <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2" style={{ background: s.color + '15' }}>
              <s.icon size={16} style={{ color: s.color }}/>
            </div>
            <div className="text-[10px] text-[#0A0A0A] font-medium leading-snug">{s.improves}</div>
          </div>
        ))}
      </div>

      {/* Where intervention occurs — visual */}
      <div className="rounded-xl bg-[#0A0A0A] text-white p-4">
        <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">Where Forge sits inside Redrob</div>
        <div className="flex items-center justify-between gap-2">
          <FlowStep label="Redrob App" sub="Existing platform" color="#A1A1AA"/>
          <Arrow/>
          <FlowStep label="AI App Store" sub="Existing nav" color="#A1A1AA"/>
          <Arrow/>
          <FlowStep label="Forge Tiles" sub="NEW — 8 tiles" color="#2563EB" highlight/>
          <Arrow/>
          <FlowStep label="Skill Journey" sub="Studio → Defence → Credential" color="#2563EB" highlight/>
          <Arrow/>
          <FlowStep label="Challenge" sub="Real work → Paid trial → Hired" color="#DC2626" highlight/>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Redrob acquires users via 500+ university skill-testing partnerships (CIOL, 2025)' },
        { num: '2', ref: 'Redrob.ai consumer platform launched June 2026 (IT Voice, Analytics Insight)' },
      ]}/>
    </SlideWrap>
  )
}

function FlowStep({ label, sub, color, highlight }: { label: string; sub: string; color: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg px-3 py-2 text-center ${highlight ? 'border border-[#2563EB]' : 'border border-[#333]'}`}>
      <div className="text-[10px] font-bold" style={{ color: highlight ? color : '#fff' }}>{label}</div>
      <div className="text-[7px] text-[#A1A1AA] mt-0.5">{sub}</div>
    </div>
  )
}

function Arrow() {
  return <div className="text-[#A1A1AA] text-xs shrink-0">→</div>
}
