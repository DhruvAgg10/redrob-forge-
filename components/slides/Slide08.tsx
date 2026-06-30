import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'

const SPIDER_AXES = [
  { label: 'Engagement', today: 25, forge: 80, how: 'Credentials, challenges, leaderboard, mentor AI — 4 new return triggers vs just search+chat today' },
  { label: 'Trust', today: 20, forge: 85, how: 'W3C signed credentials + Defence Interview + Aadhaar/DigiLocker verification — signal recruiters can rely on' },
  { label: 'Retention', today: 30, forge: 75, how: 'Credential wallet grows over time. Leaderboard status. Career path progress. Users don\'t leave because their proof lives here' },
  { label: 'Monetization', today: 15, forge: 70, how: 'B2C subscription (₹199-499) + per-hire fee (₹49,999) + Verifier API ($0.05/call) vs enterprise SaaS only today' },
  { label: 'Growth', today: 20, forge: 80, how: 'Credential LinkedIn shares = free acquisition. Each hire = recruiter posts more. AI gets sharper = more candidates verify' },
]

export function Slide08() {
  return (
    <SlideWrap>
      <SlideHeader
        number="07"
        framework="Ecosystem & Platform Impact"
        title={<>Forge <span className="text-[#2563EB]">multiplies every Redrob dimension.</span></>}
        subtitle=""
      />

      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Spider chart — 5 axes matching the 5 asked metrics */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-3 flex items-center justify-center">
          <SpiderChart axes={SPIDER_AXES}/>
        </div>

        {/* How each metric improves — no abstract numbers, just explanation */}
        <div className="space-y-2">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">How Forge improves each metric</div>
          {SPIDER_AXES.map((a) => (
            <div key={a.label} className="rounded-lg border border-[#E5E7EB] p-3">
              <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider mb-0.5">{a.label}</div>
              <div className="text-[10px] text-[#525252] leading-snug">{a.how}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Flywheel — mandatory visual */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">Ecosystem Flywheel — how stakeholders feed each other</div>
      <div className="rounded-xl border border-[#E5E7EB] p-4">
        <svg viewBox="0 0 800 220" className="w-full">
          {/* Three stakeholder nodes */}
          <StakeholderNode x={120} y={110} label="Candidate" sub="700M profiles" color="#2563EB"/>
          <StakeholderNode x={400} y={110} label="Redrob Platform" sub="Forge ecosystem" color="#0A0A0A"/>
          <StakeholderNode x={680} y={110} label="Recruiter" sub="Startups & Enterprise" color="#DC2626"/>

          {/* Arrows: Candidate → Platform */}
          <Arrow x1={185} y1={95} x2={335} y2={95} color="#2563EB"/>
          <text x={260} y={87} textAnchor="middle" fontSize="8" fill="#2563EB" fontFamily="monospace">earns credentials</text>

          {/* Arrows: Platform → Candidate */}
          <Arrow x1={335} y1={125} x2={185} y2={125} color="#2563EB"/>
          <text x={260} y={140} textAnchor="middle" fontSize="8" fill="#2563EB" fontFamily="monospace">career paths + skill tasks</text>

          {/* Arrows: Platform → Recruiter */}
          <Arrow x1={465} y1={95} x2={615} y2={95} color="#DC2626"/>
          <text x={540} y={87} textAnchor="middle" fontSize="8" fill="#DC2626" fontFamily="monospace">verified pipeline</text>

          {/* Arrows: Recruiter → Platform */}
          <Arrow x1={615} y1={125} x2={465} y2={125} color="#DC2626"/>
          <text x={540} y={140} textAnchor="middle" fontSize="8" fill="#DC2626" fontFamily="monospace">challenges + hiring fees</text>

          {/* Bottom arc: Candidate ←→ Recruiter (via platform) */}
          <path d="M 160 160 Q 400 250 640 160" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="4 3"/>
          <text x={400} y={215} textAnchor="middle" fontSize="9" fill="#7C3AED" fontFamily="monospace" fontWeight="bold">each hire → AI learns → better matches → more hires</text>
          <text x={400} y={200} textAnchor="middle" fontSize="8" fill="#7C3AED" fontFamily="monospace">↻ data flywheel</text>
        </svg>
      </div>

      {/* Unfair advantage strip */}
      <div className="mt-4 rounded-xl bg-[#0A0A0A] text-white p-4">
        <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">Unfair advantages — nobody else in India has all five</div>
        <div className="grid grid-cols-5 gap-3">
          <Moat n="01" what="Distribution" why="700M profiles = built-in funnel"/>
          <Moat n="02" what="Profile graph" why="Indian skill canvas at unmatched scale"/>
          <Moat n="03" what="App Store" why="Forge fits as tiles — zero retraining"/>
          <Moat n="04" what="Indian rails" why="Aadhaar / DigiLocker / UAN / NSQF"/>
          <Moat n="05" what="Two-sided" why="Candidates + recruiters on one platform"/>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Porter, M. "Competitive Advantage" — Free Press, 1985 (ecosystem moat framework)' },
        { num: '2', ref: 'Hagiu & Wright, "Multi-Sided Platforms" — HBS Working Paper, 2015' },
      ]}/>
    </SlideWrap>
  )
}

function SpiderChart({ axes }: { axes: typeof SPIDER_AXES }) {
  const cx = 160, cy = 150, maxR = 120, n = axes.length

  function pt(i: number, v: number) {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2
    return { x: cx + Math.cos(a) * (v / 100) * maxR, y: cy + Math.sin(a) * (v / 100) * maxR }
  }

  const mkPath = (key: 'today' | 'forge') =>
    axes.map((a, i) => pt(i, a[key])).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <svg viewBox="0 0 320 300" className="w-full max-w-sm">
      {[25, 50, 75, 100].map(v => (
        <circle key={v} cx={cx} cy={cy} r={(v / 100) * maxR} fill="none" stroke="#E5E7EB" strokeWidth="0.8"/>
      ))}
      {axes.map((_, i) => {
        const p = pt(i, 100)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E5E7EB" strokeWidth="0.8"/>
      })}
      <path d={mkPath('today')} fill="#A1A1AA" fillOpacity="0.2" stroke="#A1A1AA" strokeWidth="2"/>
      <path d={mkPath('forge')} fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="2.5"/>
      {axes.map((a, i) => {
        const p = pt(i, 100)
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2
        const lx = cx + Math.cos(angle) * (maxR + 20)
        const ly = cy + Math.sin(angle) * (maxR + 20)
        return <text key={a.label} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#0A0A0A" fontWeight="600">{a.label}</text>
      })}
      <g transform="translate(20,290)">
        <rect width="8" height="8" fill="#A1A1AA" fillOpacity="0.4" stroke="#A1A1AA"/>
        <text x="12" y="7" fontSize="8" fill="#525252">Today</text>
        <rect x="60" width="8" height="8" fill="#2563EB" fillOpacity="0.4" stroke="#2563EB"/>
        <text x="72" y="7" fontSize="8" fill="#2563EB" fontWeight="600">+ Forge</text>
      </g>
    </svg>
  )
}

function StakeholderNode({ x, y, label, sub, color }: { x: number; y: number; label: string; sub: string; color: string }) {
  return (
    <g>
      <rect x={x - 60} y={y - 35} width={120} height={70} rx={12} fill="white" stroke={color} strokeWidth="2.5"/>
      <text x={x} y={y - 5} textAnchor="middle" fontSize="12" fill={color} fontWeight="bold" fontFamily="Inter, sans-serif">{label}</text>
      <text x={x} y={y + 12} textAnchor="middle" fontSize="8" fill="#A1A1AA" fontFamily="monospace">{sub}</text>
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len, uy = dy / len
  const ax = x2 - ux * 6, ay = y2 - uy * 6
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5"/>
      <polygon points={`${x2},${y2} ${ax - uy * 4},${ay + ux * 4} ${ax + uy * 4},${ay - ux * 4}`} fill={color}/>
    </g>
  )
}

function Moat({ n, what, why }: { n: string; what: string; why: string }) {
  return (
    <div>
      <div className="text-[9px] font-mono text-[#2563EB]">{n}</div>
      <div className="font-semibold text-xs mt-0.5">{what}</div>
      <div className="text-[9px] text-white/60 mt-0.5">{why}</div>
    </div>
  )
}
