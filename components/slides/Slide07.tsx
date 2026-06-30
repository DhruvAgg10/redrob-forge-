import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

const ANSOFF = [
  { title: 'Market Penetration', forge: 'Replace Soon tiles for 700M Redrob users', risk: 'Low', timing: 'Y0-Y1', detail: 'Zero acquisition cost — Forge ships as NEW tiles in existing App Store.', color: '#2563EB' },
  { title: 'Product Development', forge: 'Pro/Pro+ tiers (₹199-499) + Peer Mentor AI', risk: 'Med', timing: 'Y1-Y2', detail: 'Same buyer, expanded product. Net-new monetization for existing users.', color: '#0A0A0A' },
  { title: 'Market Development', forge: 'Verifier API to global employers + Andela/Turing', risk: 'Med', timing: 'Y2-Y3', detail: 'Credential infra goes international. $0.05/verification × 500K/mo.', color: '#0A0A0A' },
  { title: 'Diversification', forge: 'Recruiter SaaS Enterprise (Razorpay, Cred, Zerodha)', risk: 'High', timing: 'Y2-Y3', detail: 'New buyer (CHRO), new product (analytics + bulk hiring). ₹15L-₹1Cr contracts.', color: '#DC2626' },
]

const LOOPS = [
  {
    title: 'Candidate Loop',
    color: '#2563EB',
    steps: ['Career Path\n(curiosity)', 'Skill Studio\n(activation)', 'Challenge\n(engagement)', 'Credential share\n(referral)'],
  },
  {
    title: 'Recruiter Loop',
    color: '#DC2626',
    steps: ['First hire\n(80% savings)', 'Posts more\nchallenges', 'Expands role\nfamilies', 'Enterprise\ncontract'],
  },
  {
    title: 'AI Sharpness Loop',
    color: '#7C3AED',
    steps: ['Trial outcomes\nfeed AI', 'AI grading\ngets sharper', 'Recruiter trust\nincreases', 'More candidates\nverify'],
  },
]

export function Slide07() {
  return (
    <SlideWrap>
      <SlideHeader
        number="06"
        framework="Growth & Engagement Model"
        title={<>Four quadrants. Three flywheels. <span className="text-[#2563EB]">Sequenced to risk.</span></>}
        subtitle=""
      />

      {/* Compact Ansoff Matrix */}
      <div className="grid grid-cols-[80px_1fr_1fr] gap-2 mb-6">
        <div/>
        <div className="text-center text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA]">Existing Product</div>
        <div className="text-center text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA]">New Product</div>

        <div className="flex items-center text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA] text-right pr-2">Existing<br/>Market</div>
        <CompactCell d={ANSOFF[0]}/>
        <CompactCell d={ANSOFF[1]}/>

        <div className="flex items-center text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA] text-right pr-2">New<br/>Market</div>
        <CompactCell d={ANSOFF[2]}/>
        <CompactCell d={ANSOFF[3]}/>
      </div>

      {/* 3 Growth Loop Diagrams — visual flywheels */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Growth Loop Diagrams — self-reinforcing flywheels</div>
      <div className="grid grid-cols-3 gap-4">
        {LOOPS.map((loop) => (
          <LoopDiagram key={loop.title} loop={loop}/>
        ))}
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Ansoff, H. I. "Strategies for Diversification" — Harvard Business Review, 1957' },
        { num: '2', ref: 'Reeves & Deimler, "Adaptive Strategy" — BCG Henderson Institute, 2011' },
      ]}/>
    </SlideWrap>
  )
}

function CompactCell({ d }: { d: any }) {
  return (
    <HoverCard title={d.title} body={d.detail}>
      <div className="rounded-xl border p-3 cursor-help hover:shadow-sm transition" style={{ borderColor: d.color }}>
        <div className="flex items-center justify-between mb-1">
          <div className="text-[8px] uppercase tracking-wider font-mono" style={{ color: d.color }}>{d.title}</div>
          <span className="text-[7px] font-mono uppercase px-1.5 py-0.5 rounded-full" style={{ background: d.color + '15', color: d.color }}>Risk: {d.risk}</span>
        </div>
        <div className="font-semibold text-[11px] text-[#0A0A0A] mb-1">{d.forge}</div>
        <div className="text-[9px] text-[#A1A1AA] font-mono">Timing · {d.timing}</div>
      </div>
    </HoverCard>
  )
}

function LoopDiagram({ loop }: { loop: typeof LOOPS[0] }) {
  const r = 80
  const cx = 100
  const cy = 95
  const n = loop.steps.length

  return (
    <div className="rounded-xl border border-[#E5E7EB] p-3">
      <div className="text-[10px] uppercase tracking-wider font-mono font-bold text-center mb-1" style={{ color: loop.color }}>{loop.title}</div>
      <svg viewBox="0 0 200 190" className="w-full">
        {/* Circular arrow path */}
        <circle cx={cx} cy={cy} r={r - 15} fill="none" stroke={loop.color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"/>

        {/* Center label */}
        <text x={cx} y={cy - 4} textAnchor="middle" fill={loop.color} fontSize="7" fontWeight="bold" fontFamily="monospace">SELF</text>
        <text x={cx} y={cy + 5} textAnchor="middle" fill={loop.color} fontSize="7" fontWeight="bold" fontFamily="monospace">REINFORCING</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={loop.color} fontSize="10">↻</text>

        {/* 4 nodes around the circle */}
        {loop.steps.map((step, i) => {
          const angle = (i * 360 / n - 90) * (Math.PI / 180)
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          const lines = step.split('\n')

          // Arrow to next node
          const nextAngle = ((i + 1) * 360 / n - 90) * (Math.PI / 180)
          const midAngle = (angle + nextAngle) / 2 + (i === n - 1 ? Math.PI : 0)
          const ax = cx + (r - 15) * Math.cos(angle + 0.3)
          const ay = cy + (r - 15) * Math.sin(angle + 0.3)

          return (
            <g key={i}>
              {/* Node circle */}
              <circle cx={x} cy={y} r={22} fill="white" stroke={loop.color} strokeWidth="2"/>
              <text x={x} y={y - 4} textAnchor="middle" fill="#0A0A0A" fontSize="6.5" fontWeight="bold">{lines[0]}</text>
              {lines[1] && <text x={x} y={y + 5} textAnchor="middle" fill="#A1A1AA" fontSize="5.5">{lines[1]}</text>}

              {/* Step number */}
              <circle cx={x + 15} cy={y - 15} r={6} fill={loop.color}/>
              <text x={x + 15} y={y - 12} textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">{i + 1}</text>

              {/* Arrow along the dashed circle */}
              <text x={ax} y={ay} textAnchor="middle" fill={loop.color} fontSize="8">›</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
