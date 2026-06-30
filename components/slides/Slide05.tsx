import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'

const STAGES = [
  {
    stage: 'Discover',
    emoji: '🔍',
    color: '#2563EB',
    before: 'Skill tests via university placement. AI chat + Job Search. No career direction.',
    after: 'Career Path → paste resume → 3 personalised role routes. No login needed.',
    intervention: 'Career Path',
    tag: 'FREE',
  },
  {
    stage: 'Onboard',
    emoji: '🚀',
    color: '#1E40AF',
    before: 'Resume Ranker + People Search. Resume is the only signal. No proof of skill.',
    after: 'Skill Studio task → AI grades → W3C credential minted → stored in Wallet.',
    intervention: 'Skill Studio + Wallet',
    tag: 'PRO',
  },
  {
    stage: 'Engage',
    emoji: '🎯',
    color: '#7C3AED',
    before: 'Job search across 50+ platforms. Applies. No feedback, can\'t stand out.',
    after: 'Credentialed → closed Challenges → real work → Defence Interview → ranked top 5.',
    intervention: 'Challenges + Defence',
    tag: 'PAID',
  },
  {
    stage: 'Value',
    emoji: '🏆',
    color: '#DC2626',
    before: 'Traditional interview channels. No verified skill signal. No trial mechanism.',
    after: 'Paid trial (₹25K stipend) → hired. Credential on LinkedIn → referral loop.',
    intervention: 'Trial + Leaderboard',
    tag: 'REVENUE',
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

      {/* Visual journey — connected cards */}
      <div className="relative mb-6">
        {/* Connecting line */}
        <div className="absolute top-[52px] left-[8%] right-[8%] h-[3px] bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#DC2626] rounded-full z-0"/>

        <div className="grid grid-cols-4 gap-5 relative z-10">
          {STAGES.map((s, i) => (
            <div key={s.stage} className="flex flex-col items-center">
              {/* Circle node */}
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white mb-3"
                   style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)` }}>
                {s.emoji}
              </div>

              {/* Stage label */}
              <div className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: s.color }}>{s.stage}</div>

              {/* Card */}
              <div className="rounded-2xl border-2 overflow-hidden w-full flex-1 flex flex-col" style={{ borderColor: s.color }}>
                {/* Before */}
                <div className="p-3 bg-[#FEF2F2]">
                  <div className="text-[8px] uppercase tracking-wider font-mono font-bold text-[#DC2626] mb-1">✗ Today on Redrob</div>
                  <div className="text-[9px] text-[#525252] leading-snug">{s.before}</div>
                </div>

                {/* Divider with arrow */}
                <div className="flex items-center justify-center py-1 bg-white">
                  <div className="text-xs" style={{ color: s.color }}>▼</div>
                </div>

                {/* After */}
                <div className="p-3 bg-[#F0FDF4] flex-1">
                  <div className="text-[8px] uppercase tracking-wider font-mono font-bold text-[#22C55E] mb-1">✓ With Forge</div>
                  <div className="text-[9px] text-[#0A0A0A] leading-snug font-medium">{s.after}</div>
                </div>

                {/* Intervention footer */}
                <div className="px-3 py-2 text-center text-white text-[9px] font-bold" style={{ background: s.color }}>
                  {s.intervention} <span className="opacity-60 ml-1">· {s.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Where Forge sits — visual pipeline */}
      <div className="rounded-2xl bg-[#0A0A0A] p-4">
        <div className="text-[8px] uppercase tracking-wider font-mono text-[#2563EB] mb-3">Where Forge sits inside Redrob</div>
        <div className="flex items-center gap-1">
          {[
            { label: 'Redrob App', sub: '3M users · 500+ colleges', dim: true },
            { label: 'AI App Store', sub: 'Existing navigation', dim: true },
            { label: 'Forge Tiles', sub: '8 NEW tiles', color: '#2563EB' },
            { label: 'Skill Journey', sub: 'Studio → Defence → Cred', color: '#7C3AED' },
            { label: 'Hired', sub: 'Trial → Offer → Referral', color: '#DC2626' },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-1 flex-1">
              <div className={`rounded-xl px-3 py-2.5 text-center flex-1 ${step.dim ? 'border border-[#333]' : 'border-2'}`}
                   style={step.color ? { borderColor: step.color } : undefined}>
                <div className="text-[10px] font-bold" style={{ color: step.color || '#888' }}>{step.label}</div>
                <div className="text-[7px] text-[#666] mt-0.5">{step.sub}</div>
              </div>
              {i < 4 && <div className="text-[#555] text-[10px] shrink-0">→</div>}
            </div>
          ))}
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Redrob acquires users via 500+ university skill-testing partnerships (CIOL, 2025)' },
        { num: '2', ref: 'Redrob.ai consumer platform launched June 2026 (IT Voice, Analytics Insight)' },
      ]}/>
    </SlideWrap>
  )
}
