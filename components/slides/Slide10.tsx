import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

const PHASES = [
  {
    name: 'Foundation', months: 'M1', colour: '#0A0A0A',
    headline: 'Ship Forge tiles into existing App Store',
    bullets: ['Identity verification (Aadhaar/DigiLocker/UAN)', 'W3C VC + Ed25519 signing infra', 'Expand to 50 Skill Studio exercises', 'Internal pilot with Redrob\'s 148-person team'],
    detail: 'Prototype already built. Leverage Redrob\'s existing Delhi + Mumbai offices and 148-person team for internal testing before external launch.',
  },
  {
    name: 'Closed Beta', months: 'M2-M4', colour: '#2563EB',
    headline: 'Tier-3 campuses + seed startups',
    bullets: ['Leverage Redrob\'s existing 500+ university partnerships', 'Start with Tier-3 colleges — highest pedigree-barrier pain', 'Seed/Series-A startups who can\'t hire from Tier-1 campuses', 'Validate WTP + trial-to-hire conversion'],
    detail: 'Redrob already has 3M users across 500+ universities — not starting from zero. Tier-3 students face the worst pedigree barrier, so Forge credentials have highest marginal value here.',
  },
  {
    name: 'Public Launch', months: 'M5-M8', colour: '#2563EB',
    headline: 'Tier-2 colleges + growth startups',
    bullets: ['Expand to NITs, IIITs, state universities', 'Growth-stage companies (Series A-B, 5-15 hires/yr)', 'ProductHunt + LinkedIn launch from SF office', 'Ship Defence Interview + Peer Mentor AI'],
    detail: 'Tier-2 validates credential works across segments. Growth startups have volume and budget. Redrob\'s SF office drives ProductHunt launch for international visibility.',
  },
  {
    name: 'Marketplace Scale', months: 'M9-M12', colour: '#DC2626',
    headline: 'Tier-1 + Enterprise + Global API',
    bullets: ['IIM/IIT — credential now proven across tiers', 'Enterprise SaaS for 20+ hires/yr companies', 'Verifier API via Seoul/SF/NY offices', 'Andela / Turing / Mercor as channels'],
    detail: 'By M9 the credential has Tier-3/2 proof. Tier-1 adopts because it\'s validated. Redrob\'s Seoul + NY offices enable global API partnerships.',
  },
]

const ONBOARDING = [
  { who: 'Tier-3 students', how: 'Redrob already partners with 500+ universities. Activate existing campus reps to run Forge workshops. In-app guided tooltip tour on first login. Zero new acquisition cost.' },
  { who: 'Tier-2 students', how: 'Placement cell integrations — Forge becomes part of placement prep. Campus tours from Delhi/Mumbai offices (10 cities in Phase 3).' },
  { who: 'Startups', how: 'Founder communities (YC India, Surge, Accel Atoms). Free challenge posting — no procurement barrier. 4-step wizard, 8 min to first live challenge.' },
  { who: 'Enterprise', how: 'Account-led sales from Redrob\'s existing B2B team ($7M ARR = existing enterprise relationships). Pilot 1 role family → expand. Dedicated CSM.' },
]

const ASSUMPTIONS = [
  {
    asm: 'Recruiters will pay ₹49,999/hire',
    method: 'Pilot pricing in Phase 2 + post-hire interviews',
    risk: 'Med',
    by: 'M3',
    reasoning: 'Agency fees: ₹1-2L for a ₹12L dev (8.33-16.67% of CTC). LinkedIn Recruiter Lite: ₹1.19L/yr. Forge at ₹49,999 = 50-75% cheaper than agency, cheaper than LinkedIn annual seat.',
    sources: 'GoodSpace 2026; HeadsUp Corp; DigitalThoughtZ',
  },
  {
    asm: '70% pass rate is right credential bar',
    method: 'A/B test 60% vs 70% vs 80% in Skill Studio',
    risk: 'Low',
    by: 'M4',
    reasoning: 'PMP exam: 60-65% pass rate. AWS SA Associate: 60-68%. AWS Cloud Practitioner: 72-78%. 70% sits at the mid-range of professional certification standards globally.',
    sources: 'StarAgile 2026; StudyTech 2026',
  },
  {
    asm: 'Candidates pay ₹299/mo Pro tier',
    method: 'Free → paid conversion + Van Westendorp survey',
    risk: 'Med',
    by: 'M6',
    reasoning: 'Live conjoint study at /survey shows peak WTP at ₹199-349 range. ₹299 is mid-range. Coursera Plus India: ₹3,399/mo — Forge is 10x cheaper for a more targeted credential.',
    sources: 'Conjoint survey (live at /survey); Coursera India pricing',
  },
  {
    asm: 'Verifier API has global demand',
    method: '10 inbound partner conversations',
    risk: 'High',
    by: 'M9',
    reasoning: 'Unvalidated until Phase 4. Redrob\'s Seoul + SF + NY offices provide reach, but demand is contingent on credential volume. Contingency: if no demand, Forge still works as India-only B2C/B2B.',
    sources: 'No external validation yet — flagged as highest risk',
  },
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
      <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-3 mb-4">
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

      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Onboarding */}
        <div className="rounded-xl border border-[#E5E7EB] p-3">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">How users get onboarded</div>
          <div className="space-y-1.5">
            {ONBOARDING.map((o) => (
              <div key={o.who} className="text-[9px]">
                <span className="font-bold text-[#0A0A0A]">{o.who}:</span>{' '}
                <span className="text-[#525252]">{o.how}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg bg-[#F8FAFC] p-2 text-[8px] text-[#525252]">
            <span className="font-bold text-[#0A0A0A]">Why this works:</span> Redrob already has 500+ university partnerships, 3M users, $14M funding, 148 employees, offices in Delhi + Mumbai + Seoul + SF + NY. This is activation of existing infra, not cold-start.
          </div>
        </div>

        {/* Assumptions */}
        <div className="rounded-xl border border-[#E5E7EB] p-3">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">Assumptions to validate · with reasoning</div>
          <div className="space-y-1.5">
            {ASSUMPTIONS.map((a, i) => (
              <HoverCard key={i} title={a.asm} body={`Reasoning: ${a.reasoning}\n\nSources: ${a.sources}\n\nValidation: ${a.method} (by ${a.by})`}>
                <div className="cursor-help hover:bg-[#FAFAFA] rounded p-1.5 -mx-1">
                  <div className="flex items-start gap-1.5">
                    <div className="flex-1">
                      <div className="text-[9px] font-medium text-[#0A0A0A]">{a.asm}</div>
                      <div className="text-[8px] text-[#525252] mt-0.5 leading-snug">{a.reasoning.split('.').slice(0, 2).join('.')}.</div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <span className="text-[7px] font-mono text-[#2563EB]">{a.by}</span>
                      <span className={`text-[7px] font-mono px-1 py-0.5 rounded-full ${
                        a.risk === 'Low' ? 'bg-[#16A34A]/10 text-[#16A34A]'
                        : a.risk === 'Med' ? 'bg-[#F59E0B]/15 text-[#B45309]'
                        : 'bg-[#DC2626]/10 text-[#DC2626]'
                      }`}>{a.risk}</span>
                    </div>
                  </div>
                </div>
              </HoverCard>
            ))}
          </div>
          <div className="text-[7px] text-[#A1A1AA] font-mono mt-2 italic">Hover for full reasoning + sources · Detailed model in appendix</div>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'GoodSpace, "Recruitment Agency Fees India 2026" — goodspace.ai/blogs/709434' },
        { num: '2', ref: 'StarAgile, "PMP Exam Pass Rate 2026"; StudyTech, "AWS Certification Pass Rates 2026"' },
        { num: '3', ref: 'DigitalThoughtZ, "LinkedIn Premium Cost India 2026" — Recruiter Lite ₹1.19L/yr' },
        { num: '4', ref: 'Redrob Series A: $10M led by Korea Investment Partners (Business Standard, Nov 2025)' },
      ]}/>
    </SlideWrap>
  )
}
