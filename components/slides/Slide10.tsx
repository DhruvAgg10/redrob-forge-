import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

const PHASES = [
  {
    name: 'Foundation', months: 'M1', colour: '#0A0A0A',
    headline: 'Ship Forge tiles inside Redrob App Store',
    bullets: ['Aadhaar / DigiLocker / UAN integration', 'W3C VC + Ed25519 signing infra', 'Expand to 50 Skill Studio exercises', 'Internal pilot with Redrob team'],
    detail: 'Built today (live prototype). Add identity verification, expand skill library, test internally before opening up.',
  },
  {
    name: 'Closed Beta', months: 'M2-M4', colour: '#2563EB',
    headline: 'Tier-3 campuses + seed-stage startups',
    bullets: ['Start with Tier-3 colleges where degree-signal fails most', 'Seed/Series-A startups who can\'t access Tier-1 campuses', 'Tight feedback loops — NPS + post-hire interviews', 'Validate trial-to-hire conversion + WTP'],
    detail: 'Why Tier-3 first: these students face the biggest pedigree barrier — Forge\'s credential has the highest marginal value here. Startups can\'t recruit from IIMs directly — Forge gives them access to verified talent.',
  },
  {
    name: 'Public Launch', months: 'M5-M8', colour: '#2563EB',
    headline: 'Move up-tier: Tier-2 colleges + growth startups',
    bullets: ['Expand to Tier-2 colleges (NITs, IIITs, state universities)', 'Onboard growth-stage companies (Series A-B)', 'ProductHunt + LinkedIn launch', 'Ship Defence Interview + Peer Mentor AI'],
    detail: 'Tier-2 adoption validates that credential works across segments, not just for underserved. Growth startups have volume (5-15 hires/yr) and budget.',
  },
  {
    name: 'Marketplace Scale', months: 'M9-M12', colour: '#DC2626',
    headline: 'Tier-1 + Enterprise + Global API',
    bullets: ['IIM/IIT campuses — credential now has Tier-3/2 proof', 'Enterprise SaaS for 20+ hires/yr companies', 'Open Verifier API for global employers', 'Andela / Turing / Mercor as channel partners'],
    detail: 'By now the credential has been validated across tiers. Tier-1 campuses adopt because it\'s proven, not because it\'s new. Enterprise + global = monetization phase.',
  },
]

const ONBOARDING = [
  { who: 'Tier-3 students', how: 'Campus ambassador program — 1 student per college runs a Forge workshop. In-app guided onboarding (tooltip tour on first login).' },
  { who: 'Tier-2 students', how: 'College placement cell partnerships — Forge integrated into placement prep. Campus tours in 10 cities.' },
  { who: 'Startups', how: 'Founder Slack groups (YC India, Surge) — free challenge posting, no procurement barrier. 4-step wizard takes 8 min to first posted challenge.' },
  { who: 'Enterprise', how: 'Account-led sales. Pilot with 1 role family → expand. Dedicated onboarding manager.' },
]

const ASSUMPTIONS = [
  { asm: 'Recruiters will pay ₹49,999/hire', method: 'Pilot pricing in Phase 2, post-hire interviews', by: 'M3', risk: 'Med', reasoning: '80% cheaper than agency (₹4-6L). Comparable to LinkedIn Recruiter Lite annual cost.' },
  { asm: '70% pass rate is right credential bar', method: 'A/B test 60% vs 70% vs 80% in Skill Studio', by: 'M4', risk: 'Low', reasoning: 'Standard psychometric pass rate for certification exams (AWS, PMP). Too low = no signal, too high = no supply.' },
  { asm: 'Candidates pay ₹299/mo Pro tier', method: 'Free → paid conversion, Van Westendorp survey', by: 'M6', risk: 'Med', reasoning: 'Conjoint study (live on /survey) shows peak WTP at ₹199-349. ₹299 is mid-range.' },
  { asm: 'Verifier API has global demand', method: '10 inbound partner conversations', by: 'M9', risk: 'High', reasoning: 'Unvalidated until Phase 4. Contingent on credential volume being large enough to matter.' },
]

export function Slide10() {
  return (
    <SlideWrap>
      <SlideHeader
        number="09"
        framework="Rollout & Adoption Strategy"
        title={<>Start where the pain is highest. <span className="text-[#2563EB]">Move up-tier.</span></>}
        subtitle=""
      />

      {/* 4 Phase cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {PHASES.map((p, i) => (
          <HoverCard key={p.name} title={p.name + ' · ' + p.months} body={p.detail}>
            <div className="rounded-xl border bg-white p-3 cursor-help h-full hover:shadow-sm transition flex flex-col"
                 style={{ borderColor: p.colour + '44' }}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-[9px] font-mono uppercase tracking-wider font-semibold" style={{ color: p.colour }}>Phase {i + 1}</div>
                <div className="text-[9px] font-mono text-[#A1A1AA]">{p.months}</div>
              </div>
              <div className="font-semibold text-sm text-[#0A0A0A]">{p.name}</div>
              <div className="text-[10px] text-[#525252] mt-1">{p.headline}</div>
              <ul className="mt-2 space-y-0.5 text-[9px] text-[#525252] flex-1">
                {p.bullets.map((b, j) => <li key={j}>· {b}</li>)}
              </ul>
            </div>
          </HoverCard>
        ))}
      </div>

      {/* Gantt */}
      <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 mb-4">
        <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Timeline</div>
        <div className="space-y-1.5">
          {PHASES.map((p, i) => {
            const startMonth = i === 0 ? 1 : i === 1 ? 2 : i === 2 ? 5 : 9
            const endMonth = i === 0 ? 1 : i === 1 ? 4 : i === 2 ? 8 : 12
            const left = ((startMonth - 1) / 12) * 100
            const width = ((endMonth - startMonth + 1) / 12) * 100
            return (
              <div key={p.name} className="flex items-center gap-2">
                <div className="w-28 text-[10px] font-medium text-[#0A0A0A] shrink-0">{p.name}</div>
                <div className="flex-1 relative h-5 bg-white rounded border border-[#E5E7EB]">
                  <div className="absolute inset-y-0.5 rounded-sm flex items-center px-2 text-[8px] text-white font-mono"
                       style={{ left: `${left}%`, width: `${width}%`, background: p.colour }}>{p.months}</div>
                </div>
              </div>
            )
          })}
          <div className="flex gap-2 mt-1">
            <div className="w-28"/>
            <div className="flex-1 grid grid-cols-12 text-[8px] font-mono text-[#A1A1AA]">
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="text-center">M{i + 1}</div>)}
            </div>
          </div>
        </div>
      </div>

      {/* How users get educated/onboarded */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border border-[#E5E7EB] p-3">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">How users get onboarded</div>
          <div className="space-y-1.5">
            {ONBOARDING.map((o) => (
              <div key={o.who} className="flex gap-2 text-[10px]">
                <div className="w-20 shrink-0 font-bold text-[#0A0A0A]">{o.who}</div>
                <div className="text-[#525252] leading-snug">{o.how}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Assumptions table */}
        <div className="rounded-xl border border-[#E5E7EB] p-3">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">Assumptions to validate</div>
          <div className="space-y-1.5">
            {ASSUMPTIONS.map((a, i) => (
              <HoverCard key={i} title={a.asm} body={`Reasoning: ${a.reasoning}\n\nValidation: ${a.method}`}>
                <div className="flex items-start gap-2 text-[9px] cursor-help hover:bg-[#FAFAFA] rounded p-1 -mx-1">
                  <div className="flex-1">
                    <div className="font-medium text-[#0A0A0A]">{a.asm}</div>
                    <div className="text-[#A1A1AA] mt-0.5">{a.method}</div>
                  </div>
                  <div className="text-[8px] font-mono text-[#2563EB] shrink-0">{a.by}</div>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ${
                    a.risk === 'Low' ? 'bg-[#16A34A]/10 text-[#16A34A]'
                    : a.risk === 'Med' ? 'bg-[#F59E0B]/15 text-[#B45309]'
                    : 'bg-[#DC2626]/10 text-[#DC2626]'
                  }`}>{a.risk}</span>
                </div>
              </HoverCard>
            ))}
          </div>
          <div className="text-[7px] text-[#A1A1AA] font-mono mt-2 italic">Hover any assumption for reasoning · Detailed model in appendix</div>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Blank, S. "The Startup Owner\'s Manual" — K&S Ranch, 2012 (phased rollout methodology)' },
        { num: '2', ref: 'Conjoint survey (live at /survey) — WTP data backing ₹299 Pro tier assumption' },
      ]}/>
    </SlideWrap>
  )
}
