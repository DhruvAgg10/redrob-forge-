import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

type Persona = {
  name: string
  role: string
  side: 'Candidate' | 'Recruiter'
  color: string
  icon: string
  who: string
  motivation: string
  behavior: string
  painPoints: string[]
  needs: string[]
  forgeUnlock: string
}

const PERSONAS: Persona[] = [
  {
    name: 'ANKITA',
    role: 'MBA Final-Year (IIM-K)',
    side: 'Candidate',
    color: '#2563EB',
    icon: '👩‍🎓',
    who: 'Top-MBA students competing for PM/consulting roles. Same casebook prep as 250 classmates.',
    motivation: 'Stand out from identical resumes. Wants proof of skill, not just pedigree.',
    behavior: 'Preps via casebooks, LinkedIn networking. Applies to 30+ companies. Accepts first decent offer under placement pressure.',
    painPoints: [
      'Black-box placement process — no way to prove she\'s sharper than peers',
      'Resume looks identical to 250 classmates',
      'No portfolio of real work to show recruiters',
    ],
    needs: 'Verified skill credentials (PRD, sizing, positioning) + real company challenges to build a portfolio of proof.',
    forgeUnlock: 'Skill Studio credentials → closed challenges → recruiter preference → lands PM offer over same-college peers.',
  },
  {
    name: 'VIKRAM',
    role: 'Senior SDE, Infosys (Lateral Pivot)',
    side: 'Candidate',
    color: '#1E40AF',
    icon: '👨‍💻',
    who: 'Mid-career engineers (3-6 YOE) wanting to pivot to PM/strategy. Has skill but no signal.',
    motivation: 'Escape the "PM experience required" catch-22. Prove ability without prior title.',
    behavior: 'Resume-shotguns 50+ PM roles. Gets zero callbacks. Considers expensive bootcamps. Frustrated and stuck.',
    painPoints: [
      '"PM experience required" on every listing — classic catch-22',
      'Resume filter rejects him before skill is evaluated',
      'No affordable way to get credentialed for a new role',
    ],
    needs: 'A clear lateral-pivot pathway with skill verification that bypasses the resume filter.',
    forgeUnlock: 'Career Path maps SDE→PM route. Skill Studio verifies PRD/positioning. Challenges give real PM work. Switches in 4 months vs 18.',
  },
  {
    name: 'SAURABH',
    role: 'TCS Lucknow, Tier-2 (Striver)',
    side: 'Candidate',
    color: '#0A0A0A',
    icon: '👨‍💼',
    who: 'Tier-2/3 city professionals. Strong skills but filtered out by college name. Price-sensitive (₹149-199 max).',
    motivation: 'Break the pedigree barrier. Get seen by top employers despite non-IIT/IIM background.',
    behavior: 'Self-studies via YouTube/Coursera. Applies en masse on Naukri/LinkedIn. Rarely gets past the ATS filter.',
    painPoints: [
      'Top employers filter on college name — never reaches interview',
      'Coursera certificates carry zero recruiter weight',
      'Can\'t afford ₹50K bootcamps on ₹6L salary',
    ],
    needs: 'Affordable (₹199) skill credential that recruiters actually trust + visibility to employers regardless of college.',
    forgeUnlock: 'Free Career Path + ₹199 Pro tier → Forge-Verified badge visible to recruiters. First credentialing system that reaches non-metro India.',
  },
  {
    name: 'PRIYA',
    role: 'Talent Lead, NimbusPay (Startup Recruiter)',
    side: 'Recruiter',
    color: '#DC2626',
    icon: '👩‍💼',
    who: 'Startup/growth-stage recruiters drowning in unqualified inbound. 800 applications, 5 real candidates.',
    motivation: 'Hire faster, cheaper, and with higher signal. Reduce agency dependency.',
    behavior: 'Posts on LinkedIn + Naukri. Gets flooded. Falls back on ₹5L agency hires because no pre-filter exists.',
    painPoints: [
      '800 inbound per role, 5 actually qualified — no pre-filter',
      'Agency cost: ₹4-6L per hire, eating into runway',
      'No way to test candidates on real work before committing',
    ],
    needs: 'Pre-filtered, skill-verified candidate pipeline + paid trial mechanism before full-time offer.',
    forgeUnlock: 'Posts closed challenge → only credentialed candidates see it → AI ranks top 5 → 2-week paid trial. Hires in 4 weeks for ₹1L vs ₹5L.',
  },
]

export function Slide03() {
  return (
    <SlideWrap>
      <SlideHeader
        number="02"
        framework="Persona Analysis"
        title={<>Four personas. <span className="text-[#2563EB]">Two sides</span> of the marketplace.</>}
        subtitle="Who are they? What motivates them? What barriers exist? What can Forge do?"
      />

      <div className="grid grid-cols-4 gap-4">
        {PERSONAS.map((p) => (
          <PersonaCard key={p.name} p={p}/>
        ))}
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Cooper, A. "About Face: The Essentials of Interaction Design" — persona methodology, Wiley 2014' },
        { num: '2', ref: 'IIM Bangalore Placement Report 2024 — cohort size + average package data' },
        { num: '3', ref: 'NASSCOM, "Technology Sector in India 2024" — lateral hiring + Tier-2/3 talent data' },
        { num: '4', ref: 'Inc42, "Indian Startup Hiring Report 2024" — cost-per-hire and recruiter pain points' },
      ]}/>
    </SlideWrap>
  )
}

function PersonaCard({ p }: { p: Persona }) {
  const borderColor = p.color
  return (
    <div className="rounded-2xl border-2 overflow-hidden flex flex-col" style={{ borderColor }}>
      {/* Header */}
      <div className="px-4 py-3 text-white text-center" style={{ background: p.color }}>
        <div className="text-2xl mb-1">{p.icon}</div>
        <div className="font-bold text-sm uppercase tracking-wider">{p.name} ({p.side})</div>
      </div>

      {/* Role badge */}
      <div className="mx-3 -mt-0 mb-2">
        <div className="bg-white border rounded-lg px-3 py-2 text-center mt-2" style={{ borderColor }}>
          <div className="text-[11px] font-bold" style={{ color: p.color }}>{p.role}</div>
        </div>
      </div>

      {/* Who */}
      <div className="px-3 mb-2">
        <div className="text-[9px] uppercase tracking-wider font-mono font-bold mb-1" style={{ color: p.color }}>Who</div>
        <div className="text-[10px] text-[#525252] leading-snug">{p.who}</div>
      </div>

      {/* Motivation */}
      <div className="px-3 mb-2">
        <div className="text-[9px] uppercase tracking-wider font-mono font-bold mb-1" style={{ color: p.color }}>Motivation</div>
        <div className="text-[10px] text-[#525252] leading-snug">{p.motivation}</div>
      </div>

      {/* Behavior */}
      <div className="px-3 mb-2">
        <div className="text-[9px] uppercase tracking-wider font-mono font-bold mb-1" style={{ color: p.color }}>Behavior</div>
        <div className="text-[10px] text-[#525252] leading-snug">{p.behavior}</div>
      </div>

      {/* Pain Points */}
      <div className="px-3 mb-2">
        <div className="text-[9px] uppercase tracking-wider font-mono font-bold mb-1 text-[#DC2626]">Pain Points</div>
        <ul className="space-y-1">
          {p.painPoints.map((pt, i) => (
            <li key={i} className="text-[10px] text-[#525252] leading-snug flex gap-1">
              <span className="text-[#DC2626] shrink-0">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Needs */}
      <div className="px-3 mb-2 bg-[#F8FAFC] py-2 rounded-lg mx-1">
        <div className="text-[9px] uppercase tracking-wider font-mono font-bold mb-1" style={{ color: p.color }}>Needs</div>
        <div className="text-[10px] text-[#0A0A0A] leading-snug font-medium">{p.needs}</div>
      </div>

      {/* Forge Unlock */}
      <div className="px-3 pb-3 mt-auto">
        <div className="text-[9px] uppercase tracking-wider font-mono font-bold mb-1 text-[#22C55E]">What Forge Does</div>
        <div className="text-[10px] text-[#525252] leading-snug">{p.forgeUnlock}</div>
      </div>
    </div>
  )
}

