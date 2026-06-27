import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

// VALS-inspired persona segmentation
// X axis: Resources (income / pedigree power)
// Y axis: Motivation (status-driven vs achievement-driven vs survival-driven)

type Persona = {
  id: string
  name: string
  role: string
  x: number; y: number
  size: number  // bubble size (market potential indicator)
  color: string
  side: 'Candidate' | 'Recruiter'
  pain: string
  unlock: string
  outcome: string
}

const PERSONAS: Persona[] = [
  {
    id: 'P1', name: 'The MBA Climber', role: 'Ankita Reddy · IIM-K · 24',
    x: 70, y: 85, size: 38, color: '#2563EB', side: 'Candidate',
    pain: 'Black-box placement. Same casebook prep as 250 classmates. No way to prove she\'s sharper.',
    unlock: 'Skill Studio credentials in PRD/Sizing/Positioning → portfolio of proof → preference in closed challenges.',
    outcome: 'Lands PM offer over same-college peers.',
  },
  {
    id: 'P2', name: 'The Lateral Pivot', role: 'Vikram Shah · Senior SDE Infosys · 29',
    x: 55, y: 60, size: 50, color: '#2563EB', side: 'Candidate',
    pain: '"PM experience required" catch-22. Has skill but no signal. Resume-shotgun gets zero callbacks.',
    unlock: 'Career Path shows Lateral Pivot route. Skill Studio verifies PRD/positioning. Challenges bypass resume filter.',
    outcome: 'Switches to FinTech PM in 4 months instead of 18.',
  },
  {
    id: 'P3', name: 'The Tier-2/3 Striver', role: 'Saurabh · TCS Lucknow · 26',
    x: 25, y: 50, size: 60, color: '#1E40AF', side: 'Candidate',
    pain: 'Pedigree disadvantage. Top employers filter on college name. Forge needs to be ₹149-199 max.',
    unlock: 'Free Career Path + ₹199 Pro tier with credentials. Visible to recruiters via Forge-Verified badge.',
    outcome: 'First Indian tech credential standard reaches non-metro talent.',
  },
  {
    id: 'P4', name: 'The Time-Poor Recruiter', role: 'Priya Menon · NimbusPay · 32',
    x: 80, y: 75, size: 28, color: '#DC2626', side: 'Recruiter',
    pain: '800 inbound, 5 real. Agency = ₹5L per hire. No way to pre-filter for ability.',
    unlock: 'Post closed challenge → only credentialed PMs see it → AI ranks top 5 → 2-finalist paid trial.',
    outcome: 'Hires in 4 weeks for ₹1L vs ₹5L. 80% cost reduction.',
  },
  {
    id: 'P5', name: 'The Growth-Stage HR', role: 'Karthik · Razorpay · 35',
    x: 90, y: 85, size: 32, color: '#DC2626', side: 'Recruiter',
    pain: 'Agency dependency. Quality at scale. Cost-per-hire creeping up to ₹6L+.',
    unlock: 'Enterprise SaaS contract. Forge becomes the verified-candidate pipeline.',
    outcome: 'Year 2 ICP — ₹15L annual contract per Tier-1 startup.',
  },
]

export function Slide03() {
  return (
    <SlideWrap>
      <SlideHeader
        number="02"
        framework="VALS Segmentation"
        title={<>Five personas. <span className="text-[#2563EB]">Two sides of the marketplace.</span></>}
        subtitle="VALS-inspired segmentation by resources (X) and motivation (Y). Bubble size = addressable market potential. Hover any bubble for details."
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* VALS-style 2D grid */}
        <div className="lg:col-span-3 relative rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-6 aspect-square min-h-[440px]">
          {/* Quadrant labels */}
          <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">↑ High motivation · status / achievement</div>
          <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">↓ Survival / utility</div>
          <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] text-right">High resources →</div>
          <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] text-right">← Low resources</div>

          {/* Axes */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-[#E5E7EB]"/>
          <div className="absolute top-1/2 left-8 right-8 h-px bg-[#E5E7EB]"/>

          {/* Persona bubbles */}
          {PERSONAS.map((p) => (
            <PersonaBubble key={p.id} p={p}/>
          ))}
        </div>

        {/* Persona list */}
        <div className="lg:col-span-2 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-3">All personas — hover or click to highlight</div>
          {PERSONAS.map((p) => (
            <PersonaListCard key={p.id} p={p}/>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] p-4">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">ECP → ICP Discipline</div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <Phase q="Y0 Q1-Q2" who="IIM-K only (1 campus, 200 students)"/>
          <Phase q="Y0 Q3-Q4" who="Top-7 MBA (5K students) + founder-led recruiters"/>
          <Phase q="Y1" who="+ Lateral ICs · 50 paying recruiters"/>
          <Phase q="Y2-Y3" who="Tier 2/3 strivers · Global Verifier API"/>
        </div>
        <p className="text-[10px] text-[#A1A1AA] mt-3 italic">Discipline: don&apos;t open a new segment until NPS 50+ and 30% organic referral on the previous. HubSpot/Notion pattern.</p>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'VALS Framework — SRI International, Mitchell, A. "Nine American Lifestyles", 1983' },
        { num: '2', ref: 'Strategic Business Insights — strategicbusinessinsights.com/vals' },
        { num: '3', ref: 'IIM Bangalore Placement Report 2024 — average package + cohort size data' },
        { num: '4', ref: 'NimbusPay (NCS) Series A — Inc42 reporting, Aug 2024 (used as ECP recruiter persona)' },
        { num: '5', ref: 'TCS Annual Report FY2024 — IC compensation bands referenced for Vikram persona' },
        { num: '6', ref: 'YC India + Sequoia Surge + Accel Atoms portfolio lists — addressable founder-led recruiter pool' },
      ]}/>
    </SlideWrap>
  )
}

function PersonaBubble({ p }: { p: Persona }) {
  const labelLeft = p.x > 70
  return (
    <div className="absolute" style={{ left: `${p.x}%`, top: `${100 - p.y}%`, transform: 'translate(-50%, -50%)' }}>
      <HoverCard
        title={p.name + ' · ' + p.side}
        body={`${p.role}. PAIN: ${p.pain} FORGE UNLOCKS: ${p.unlock} OUTCOME: ${p.outcome}`}
      >
        <div className="rounded-full flex items-center justify-center text-white font-semibold text-xs cursor-help shadow-md relative"
             style={{ width: `${p.size}px`, height: `${p.size}px`, background: p.color }}>
          {p.id}
        </div>
      </HoverCard>
      <div className={`absolute top-1/2 -translate-y-1/2 text-[10px] text-[#0A0A0A] font-semibold whitespace-nowrap ${labelLeft ? 'right-full mr-2 text-right' : 'left-full ml-2'}`}>
        {p.name.split(' ').slice(-2).join(' ')}
      </div>
    </div>
  )
}

function PersonaListCard({ p }: { p: Persona }) {
  return (
    <HoverCard title={p.name} body={`PAIN: ${p.pain} · UNLOCK: ${p.unlock} · OUTCOME: ${p.outcome}`}>
      <div className="flex gap-3 items-start rounded-xl border border-[#E5E7EB] p-3 hover:bg-[#FAFAFA] cursor-help">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: p.color }}>{p.id}</div>
        <div className="min-w-0">
          <div className="font-semibold text-sm">{p.name} <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] ml-1">{p.side}</span></div>
          <div className="text-[11px] text-[#525252] truncate">{p.role}</div>
        </div>
      </div>
    </HoverCard>
  )
}

function Phase({ q, who }: any) {
  return (
    <div className="rounded-lg bg-white border border-[#E5E7EB] p-2">
      <div className="text-[9px] font-mono text-[#2563EB] uppercase tracking-wider">{q}</div>
      <div className="text-[11px] text-[#0A0A0A] mt-1 leading-tight">{who}</div>
    </div>
  )
}
