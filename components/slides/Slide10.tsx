import { SlideWrap, SlideHeader, HoverCard } from '../PresentationDeck'

const PHASES = [
  {
    name: 'Foundation', months: 'M1', colour: '#0A0A0A',
    headline: 'Ship Forge tiles inside Redrob App Store',
    bullets: ['Aadhaar / DigiLocker / UAN integration', 'W3C VC + Ed25519 signing infra', '50 Skill Studio exercises', 'Internal pilot with 50 employees'],
    detail: 'Built today (live demo at localhost:3000). Add Aadhaar verification, expand from 6 to 50 Skill Studio exercises. Internal pilot before external launch.',
  },
  {
    name: 'Closed Beta', months: 'M2-M4', colour: '#2563EB',
    headline: '500 hand-picked users · 10 pilot companies',
    bullets: ['B-school finalists (IIM-K + ISB + XLRI cohorts)', '10 founder-led companies from YC India / Surge', 'Goal: 100 verified hires', 'Validate trial-to-hire conversion'],
    detail: 'Recruit 500 power users via campus placement cells. Onboard 10 pilot companies through founder networks. Tight feedback loops. Validate ₹49,999/hire willingness-to-pay.',
  },
  {
    name: 'Public Launch', months: 'M5-M8', colour: '#2563EB',
    headline: 'Open signup · 50 partner companies',
    bullets: ['ProductHunt + LinkedIn launch', 'IIM/IIT campus tours (10 cities)', 'AI Defence Interview shipped', 'Peer Mentor AI + Community shipped'],
    detail: 'Public open signup. Launch on ProductHunt + LinkedIn. Campus tours across 10 cities. Ship the remaining 3 Forge tiles (Defence, Mentor, Community). 50 paying recruiters target.',
  },
  {
    name: 'Marketplace Scale', months: 'M9-M12', colour: '#DC2626',
    headline: 'Verifier API · Global partnerships',
    bullets: ['Open Verifier API for global employers', 'Andela / Turing / Mercor as channels', 'Trial v2 with real Razorpay escrow', 'Enterprise SaaS launch (20+ hires/yr)'],
    detail: 'Open the Verifier API publicly. Start partnership conversations with Andela, Turing, Mercor — they pay $0.05/verification. Enterprise contracts (₹15L-₹1Cr) with Tier-1 startups.',
  },
]

const ASSUMPTIONS = [
  { asm: 'Recruiters will pay ₹49,999/hire', method: 'Pilot pricing in Phase 1, post-hire interviews', by: 'M3', risk: 'Med' },
  { asm: '70% pass rate is right credential bar', method: 'A/B test 60% vs 70% vs 80% in Skill Studio', by: 'M4', risk: 'Low' },
  { asm: 'Candidates pay ₹299/mo Pro tier', method: 'Free → paid conversion measurement, Van Westendorp', by: 'M6', risk: 'Med' },
  { asm: 'Verifier API has paying demand globally', method: '10 inbound conversations from international partners', by: 'M9', risk: 'High' },
]

export function Slide10() {
  return (
    <SlideWrap>
      <SlideHeader
        number="09"
        framework="4-Phase Rollout · 12 months"
        title={<>Sequenced by risk. <span className="text-[#2563EB]">Each phase unlocks the next.</span></>}
        subtitle="Foundation → Closed Beta → Public Launch → Marketplace Scale. Hover any phase for the activation plan."
      />

      <div className="grid grid-cols-4 gap-3 mb-6">
        {PHASES.map((p, i) => (
          <HoverCard key={p.name} title={p.name + ' · ' + p.months} body={p.detail}>
            <div className="rounded-2xl border bg-white p-4 cursor-help h-full hover:shadow-md transition flex flex-col"
                 style={{ borderColor: p.colour + '44' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: p.colour }}>Phase {i + 1}</div>
                <div className="text-[10px] font-mono text-[#A1A1AA]">{p.months}</div>
              </div>
              <div className="font-semibold text-lg text-[#0A0A0A]">{p.name}</div>
              <div className="text-sm text-[#0A0A0A] mt-2 leading-snug">{p.headline}</div>
              <ul className="mt-3 space-y-1 text-[11px] text-[#525252] flex-1">
                {p.bullets.map((b, j) => <li key={j} className="leading-relaxed">· {b}</li>)}
              </ul>
            </div>
          </HoverCard>
        ))}
      </div>

      {/* Gantt visualization */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 mb-6">
        <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-3">Timeline · Month-by-month</div>
        <div className="space-y-2">
          {PHASES.map((p, i) => {
            const startMonth = i === 0 ? 1 : i === 1 ? 2 : i === 2 ? 5 : 9
            const endMonth = i === 0 ? 1 : i === 1 ? 4 : i === 2 ? 8 : 12
            const left = ((startMonth - 1) / 12) * 100
            const width = ((endMonth - startMonth + 1) / 12) * 100
            return (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-32 text-xs font-medium text-[#0A0A0A] shrink-0">{p.name}</div>
                <div className="flex-1 relative h-7 bg-white rounded-md border border-[#E5E7EB]">
                  <div className="absolute inset-y-1 rounded-sm flex items-center px-2 text-[10px] text-white font-mono"
                       style={{ left: `${left}%`, width: `${width}%`, background: p.colour }}>
                    {p.months}
                  </div>
                </div>
              </div>
            )
          })}
          <div className="flex gap-3 mt-1 text-[10px] font-mono text-[#A1A1AA]">
            <div className="w-32"/>
            <div className="flex-1 grid grid-cols-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="text-center">M{i + 1}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#2563EB] mb-3">Assumptions to validate · no faith-based bets</div>
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-mono">
            <tr>
              <th className="text-left py-2 font-medium">Assumption</th>
              <th className="text-left py-2 font-medium">Validation method</th>
              <th className="text-center py-2 font-medium">By</th>
              <th className="text-center py-2 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {ASSUMPTIONS.map((a, i) => (
              <tr key={i} className="border-t border-[#E5E7EB]">
                <td className="py-3 text-[#0A0A0A]">{a.asm}</td>
                <td className="py-3 text-xs text-[#525252]">{a.method}</td>
                <td className="text-center py-3 text-xs font-mono text-[#2563EB]">{a.by}</td>
                <td className="text-center py-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    a.risk === 'Low' ? 'bg-[#16A34A]/10 text-[#16A34A]'
                    : a.risk === 'Med' ? 'bg-[#F59E0B]/15 text-[#B45309]'
                    : 'bg-[#DC2626]/10 text-[#DC2626]'
                  }`}>{a.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideWrap>
  )
}
