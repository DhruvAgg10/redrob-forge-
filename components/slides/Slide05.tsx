import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

const JOURNEY_STAGES = [
  {
    stage: 'Discover',
    before: 'Finds Redrob via job search. Browses listings. Leaves.',
    after: 'Finds Career Path tile → pastes resume → gets 3 role routes in 30 sec. No login.',
    forge: 'Career Path (free)',
    color: '#2563EB',
  },
  {
    stage: 'Onboard',
    before: 'Creates account. Uploads resume. Waits for recruiter to find them.',
    after: '"Save your path" → signup → takes first Skill Studio task → earns W3C credential in 20 min.',
    forge: 'Skill Studio + Credential Wallet',
    color: '#1E40AF',
  },
  {
    stage: 'Engage',
    before: 'Applies to jobs. Gets lost in 800-applicant pile. No feedback.',
    after: 'Credentialed → sees closed Challenges → submits real work → AI Defence Interview → ranked top 5.',
    forge: 'Challenges + Defence Interview',
    color: '#7C3AED',
  },
  {
    stage: 'Value',
    before: 'Maybe gets an interview after weeks. No skill signal sent.',
    after: '2-week paid trial (₹25K stipend) → hired in 4 months. Credential shared on LinkedIn → referral loop.',
    forge: 'Paid Trial + Leaderboard',
    color: '#DC2626',
  },
]

const CANDIDATE_FUNNEL = [
  { name: 'Career Path (free)', count: '5M', pct: '100%' },
  { name: 'Signup (save path)', count: '900K', pct: '18%' },
  { name: 'First credential', count: '315K', pct: '35%' },
  { name: 'Challenge applied', count: '126K', pct: '40%' },
  { name: 'Paid trial', count: '15K', pct: '12%' },
  { name: 'Hired + referral', count: '7.5K', pct: '50%' },
]

const RECRUITER_FUNNEL = [
  { name: 'Founder outreach', count: '8,000', pct: '100%' },
  { name: 'Free challenge post', count: '960', pct: '12%' },
  { name: 'First challenge live', count: '624', pct: '65%' },
  { name: 'Trial (top 2)', count: '437', pct: '70%' },
  { name: 'Hire (₹49,999)', count: '284', pct: '65%' },
  { name: 'Repeat (2+ posts)', count: '227', pct: '80%' },
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

      {/* Journey Map — mandatory visual */}
      <div className="grid grid-cols-4 gap-0 mb-6">
        {JOURNEY_STAGES.map((s, i) => (
          <div key={s.stage} className="relative">
            {/* Stage header */}
            <div className="text-center py-2 text-white text-xs font-bold uppercase tracking-wider" style={{ background: s.color }}>
              {s.stage}
            </div>

            <div className="border border-t-0 border-[#E5E7EB] p-3 h-full flex flex-col gap-2">
              {/* Before */}
              <div>
                <div className="text-[8px] uppercase tracking-wider font-mono text-[#DC2626] font-bold mb-0.5">Before Forge</div>
                <div className="text-[10px] text-[#A1A1AA] leading-snug line-through decoration-[#DC2626]/40">{s.before}</div>
              </div>

              {/* After */}
              <div>
                <div className="text-[8px] uppercase tracking-wider font-mono text-[#22C55E] font-bold mb-0.5">With Forge</div>
                <div className="text-[10px] text-[#0A0A0A] leading-snug font-medium">{s.after}</div>
              </div>

              {/* Intervention */}
              <div className="mt-auto pt-2 border-t border-[#E5E7EB]">
                <div className="text-[9px] font-mono font-bold" style={{ color: s.color }}>{s.forge}</div>
              </div>
            </div>

            {/* Arrow between stages */}
            {i < 3 && (
              <div className="absolute top-[14px] -right-2 z-10 text-[#A1A1AA] text-sm">→</div>
            )}
          </div>
        ))}
      </div>

      {/* Two funnels — compact */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <CompactFunnel title="Candidate AARRR" color="#2563EB" stages={CANDIDATE_FUNNEL}/>
        <CompactFunnel title="Recruiter funnel" color="#DC2626" stages={RECRUITER_FUNNEL}/>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-4 gap-3">
        <Metric value="30 sec" label="Time to first value" />
        <Metric value="20 min" label="Time to first credential" />
        <Metric value="28 days" label="Recruiter time-to-hire" />
        <Metric value="₹1L" label="Cost-per-hire vs ₹5L agency" />
      </div>

      <SlideSources items={[
        { num: '1', ref: 'McClure, D. "AARRR Pirate Metrics" — 500 Startups, 2007' },
        { num: '2', ref: 'OpenView Partners, "SaaS Activation Benchmarks 2024"' },
        { num: '3', ref: 'NASSCOM, "Tech Hiring Pulse 2024" — time-to-hire baseline' },
      ]}/>
    </SlideWrap>
  )
}

function CompactFunnel({ title, color, stages }: { title: string; color: string; stages: any[] }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] font-mono mb-2" style={{ color }}>{title}</div>
      <div className="space-y-0.5">
        {stages.map((s, i) => {
          const width = 100 - (i * 12)
          return (
            <div key={s.name} className="flex items-center gap-2">
              <div className="w-12 text-right text-[9px] font-mono text-[#A1A1AA]">{s.count}</div>
              <div className="flex-1">
                <div className="rounded py-1.5 px-3 text-white text-[10px] font-medium"
                     style={{ background: color, width: `${width}%`, margin: '0 auto', textAlign: 'center', opacity: 1 - (i * 0.1) }}>
                  {s.name}
                </div>
              </div>
              <div className="w-8 text-[9px] font-mono" style={{ color }}>{s.pct}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] p-3 text-center">
      <div className="font-bold text-lg text-[#0A0A0A]">{value}</div>
      <div className="text-[9px] text-[#A1A1AA] font-mono uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}
