import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'

const SPIDER_AXES = [
  { label: 'Engagement', today: 2, forge: 4, how: 'Credentials, challenges, leaderboard, mentor AI — 4 new return triggers vs search+chat today' },
  { label: 'Trust', today: 1, forge: 4, how: 'W3C credentials + Defence Interview + Aadhaar/DigiLocker verification — recruiters can verify in one click' },
  { label: 'Retention', today: 2, forge: 4, how: 'Credential wallet grows over time. Career path progress. Users don\'t leave because their proof lives here' },
  { label: 'Monetization', today: 1, forge: 3, how: 'B2C subs (₹199-499) + per-hire fee (₹49,999) + Verifier API — vs enterprise SaaS only today' },
  { label: 'Growth', today: 1, forge: 4, how: 'Credential shares on LinkedIn = free acquisition. Each hire = recruiter posts more. Self-reinforcing loops' },
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

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Qualitative Spider chart */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-3 flex flex-col items-center justify-center">
          <SpiderChart axes={SPIDER_AXES}/>
          <div className="text-[7px] text-[#A1A1AA] font-mono mt-1 text-center italic">Scale: 1 (Low) → 5 (High) · Based on feature audit of current vs proposed capabilities</div>
        </div>

        {/* How each metric improves */}
        <div className="space-y-2">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">How Forge improves each metric</div>
          {SPIDER_AXES.map((a) => (
            <div key={a.label} className="rounded-lg border border-[#E5E7EB] p-2.5">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">{a.label}</div>
                <div className="text-[8px] font-mono text-[#A1A1AA]">{a.today} → {a.forge} / 5</div>
              </div>
              <div className="text-[10px] text-[#525252] leading-snug">{a.how}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Flywheel — triangular */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">Ecosystem Flywheel — how stakeholders feed each other</div>
      <div className="rounded-xl border border-[#E5E7EB] p-4">
        <svg viewBox="0 0 700 320" className="w-full">
          {/* Triangle nodes */}
          {/* Top: Redrob Platform */}
          <rect x={280} y={10} width={140} height={60} rx={12} fill="white" stroke="#0A0A0A" strokeWidth="2.5"/>
          <text x={350} y={35} textAnchor="middle" fontSize="13" fill="#0A0A0A" fontWeight="bold">Redrob Platform</text>
          <text x={350} y={52} textAnchor="middle" fontSize="8" fill="#A1A1AA" fontFamily="monospace">Forge ecosystem</text>

          {/* Bottom-left: Candidate */}
          <rect x={40} y={230} width={140} height={60} rx={12} fill="white" stroke="#2563EB" strokeWidth="2.5"/>
          <text x={110} y={255} textAnchor="middle" fontSize="13" fill="#2563EB" fontWeight="bold">Candidate</text>
          <text x={110} y={272} textAnchor="middle" fontSize="8" fill="#A1A1AA" fontFamily="monospace">700M profiles</text>

          {/* Bottom-right: Recruiter */}
          <rect x={520} y={230} width={140} height={60} rx={12} fill="white" stroke="#DC2626" strokeWidth="2.5"/>
          <text x={590} y={255} textAnchor="middle" fontSize="13" fill="#DC2626" fontWeight="bold">Recruiter</text>
          <text x={590} y={272} textAnchor="middle" fontSize="8" fill="#A1A1AA" fontFamily="monospace">Startups & Enterprise</text>

          {/* Arrow: Platform → Candidate (left side, going down) */}
          <path d="M 290 70 Q 150 140 130 225" fill="none" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
          <text x={170} y={130} textAnchor="middle" fontSize="8.5" fill="#2563EB" fontFamily="monospace" fontWeight="bold">Career paths +</text>
          <text x={170} y={142} textAnchor="middle" fontSize="8.5" fill="#2563EB" fontFamily="monospace" fontWeight="bold">skill tasks</text>

          {/* Arrow: Candidate → Platform (left side, going up) */}
          <path d="M 155 230 Q 200 150 300 70" fill="none" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
          <text x={260} y={170} textAnchor="middle" fontSize="8.5" fill="#2563EB" fontFamily="monospace">Earns credentials +</text>
          <text x={260} y={182} textAnchor="middle" fontSize="8.5" fill="#2563EB" fontFamily="monospace">engagement data</text>

          {/* Arrow: Platform → Recruiter (right side, going down) */}
          <path d="M 410 70 Q 550 140 570 225" fill="none" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrowRed)"/>
          <text x={530} y={130} textAnchor="middle" fontSize="8.5" fill="#DC2626" fontFamily="monospace" fontWeight="bold">Verified, ranked</text>
          <text x={530} y={142} textAnchor="middle" fontSize="8.5" fill="#DC2626" fontFamily="monospace" fontWeight="bold">candidate pipeline</text>

          {/* Arrow: Recruiter → Platform (right side, going up) */}
          <path d="M 545 230 Q 500 150 400 70" fill="none" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrowRed)"/>
          <text x={440} y={170} textAnchor="middle" fontSize="8.5" fill="#DC2626" fontFamily="monospace">Challenges + hiring</text>
          <text x={440} y={182} textAnchor="middle" fontSize="8.5" fill="#DC2626" fontFamily="monospace">fees (₹49,999)</text>

          {/* Arrow: Candidate → Recruiter (bottom, going right) */}
          <path d="M 180 275 Q 350 320 520 275" fill="none" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
          <text x={350} y={310} textAnchor="middle" fontSize="8.5" fill="#7C3AED" fontFamily="monospace" fontWeight="bold">Proves skill via real work + paid trial</text>

          {/* Arrow: Recruiter → Candidate (bottom, going left) */}
          <path d="M 520 255 Q 350 210 180 255" fill="none" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
          <text x={350} y={228} textAnchor="middle" fontSize="8.5" fill="#7C3AED" fontFamily="monospace">Hires + stipend + credential validation</text>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#2563EB"/></marker>
            <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#DC2626"/></marker>
            <marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#7C3AED"/></marker>
          </defs>

          {/* Center: data flywheel label */}
          <text x={350} y={270} textAnchor="middle" fontSize="9" fill="#0A0A0A" fontWeight="bold">↻ Each hire makes AI sharper</text>
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
        { num: '1', ref: 'Spider chart based on qualitative feature audit (1=Low, 5=High) of current vs proposed capabilities' },
        { num: '2', ref: 'Hagiu & Wright, "Multi-Sided Platforms" — HBS Working Paper, 2015' },
      ]}/>
    </SlideWrap>
  )
}

function SpiderChart({ axes }: { axes: typeof SPIDER_AXES }) {
  const cx = 150, cy = 140, maxR = 110, n = axes.length, maxVal = 5

  function pt(i: number, v: number) {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2
    return { x: cx + Math.cos(a) * (v / maxVal) * maxR, y: cy + Math.sin(a) * (v / maxVal) * maxR }
  }

  const mkPath = (key: 'today' | 'forge') =>
    axes.map((a, i) => pt(i, a[key])).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <svg viewBox="0 0 300 280" className="w-full max-w-xs">
      {/* Grid rings at 1-5 */}
      {[1, 2, 3, 4, 5].map(v => (
        <circle key={v} cx={cx} cy={cy} r={(v / maxVal) * maxR} fill="none" stroke="#E5E7EB" strokeWidth="0.8"/>
      ))}
      {/* Scale labels */}
      {[1, 3, 5].map(v => (
        <text key={v} x={cx + 3} y={cy - (v / maxVal) * maxR + 3} fontSize="7" fill="#A1A1AA" fontFamily="monospace">{v}</text>
      ))}
      {/* Axis lines */}
      {axes.map((_, i) => {
        const p = pt(i, maxVal)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E5E7EB" strokeWidth="0.8"/>
      })}
      {/* Today polygon */}
      <path d={mkPath('today')} fill="#A1A1AA" fillOpacity="0.15" stroke="#A1A1AA" strokeWidth="2"/>
      {/* Forge polygon */}
      <path d={mkPath('forge')} fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="2.5"/>
      {/* Labels */}
      {axes.map((a, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2
        const lx = cx + Math.cos(angle) * (maxR + 22)
        const ly = cy + Math.sin(angle) * (maxR + 22)
        return <text key={a.label} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#0A0A0A" fontWeight="600">{a.label}</text>
      })}
      {/* Legend */}
      <g transform="translate(20,270)">
        <rect width="8" height="8" fill="#A1A1AA" fillOpacity="0.3" stroke="#A1A1AA"/>
        <text x="12" y="7" fontSize="8" fill="#525252">Today</text>
        <rect x="65" width="8" height="8" fill="#2563EB" fillOpacity="0.3" stroke="#2563EB"/>
        <text x="77" y="7" fontSize="8" fill="#2563EB" fontWeight="600">+ Forge</text>
      </g>
    </svg>
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
