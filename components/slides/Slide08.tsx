import { SlideWrap, SlideHeader, HoverCard } from '../PresentationDeck'

// Spider/Radar — 8 dimensions, two polygons
type Axis = { key: string; label: string; today: number; withForge: number; detail: string }

const AXES: Axis[] = [
  { key: 'verify',   label: 'Verification depth',     today: 15, withForge: 92, detail: 'Redrob today has no skill-verification primitive. Forge adds open-ended AI-graded Skill Studio + Defence Interview + W3C credentials — the missing primitive.' },
  { key: 'trust',    label: 'Trust signal strength',  today: 35, withForge: 88, detail: 'Today employers see only self-reported resume + LinkedIn. Forge adds Ed25519-signed credentials + trust score (Aadhaar/DigiLocker/UAN).' },
  { key: 'hiring',   label: 'Hiring funnel completeness', today: 50, withForge: 94, detail: 'Redrob has job search + resume ranker. Forge closes the loop: post → submit → AI eval → defence → trial → hire.' },
  { key: 'engage',   label: 'User engagement loops',  today: 40, withForge: 85, detail: 'Today: search + chat. Forge adds: credentials to mint, challenges to enter, leaderboard to climb, mentor AI to learn from — 4 new return triggers.' },
  { key: 'network',  label: 'Network effects',        today: 30, withForge: 90, detail: 'Today: one-sided value (search). Forge makes Redrob two-sided: candidates need recruiters with challenges, recruiters need credentialed candidates.' },
  { key: 'revenue',  label: 'Revenue diversity',      today: 25, withForge: 78, detail: 'Today: enterprise SaaS only. Forge adds: B2C subscription (₹199-499), per-challenge fee, per-hire success fee, Verifier API at $0.05/call.' },
  { key: 'data',     label: 'Data depth',             today: 60, withForge: 95, detail: 'Profile graph today has metadata + resumes. Forge adds: skill-by-skill performance, defence transcripts, peer evaluations, hire outcomes — the highest-signal recruiting dataset in India.' },
  { key: 'global',   label: 'Global reach',           today: 10, withForge: 75, detail: 'Redrob today is India-only. W3C-portable credentials work cross-border. Year 3: Verifier API integrated with eIDAS (EU) and Open Badges Bank (US).' },
]

export function Slide08() {
  return (
    <SlideWrap>
      <SlideHeader
        number="07"
        framework="Spider / Radar Analysis"
        title={<>Forge <span className="text-[#2563EB]">multiplies every Redrob dimension.</span></>}
        subtitle="Eight dimensions of platform health. Inner polygon = Redrob today. Outer polygon = Redrob + Forge. Hover any axis to see the specific lift."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <RadarChart axes={AXES}/>

        <div className="space-y-2 max-h-[500px] overflow-auto pr-1">
          <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-2">Dimension-by-dimension lift</div>
          {AXES.map((a) => (
            <HoverCard key={a.key} title={a.label + ' · ' + (a.withForge - a.today) + ' points lift'} body={a.detail}>
              <div className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] p-3 cursor-help hover:bg-[#FAFAFA]">
                <div className="w-32 shrink-0 text-xs font-medium">{a.label}</div>
                <div className="flex-1 relative h-5 bg-[#F4F4F5] rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 bg-[#A1A1AA]/40" style={{ width: `${a.today}%` }}/>
                  <div className="absolute inset-y-0 bg-[#2563EB]" style={{ width: `${a.withForge}%`, opacity: 0.85 }}/>
                </div>
                <div className="w-16 shrink-0 text-right font-mono text-xs text-[#2563EB]">+{a.withForge - a.today}</div>
              </div>
            </HoverCard>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[#0A0A0A] text-white p-5">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">The unfair advantage stack — nobody else in India has all five</div>
        <div className="grid grid-cols-5 gap-3 text-sm">
          <Stack number="01" what="Distribution" why="700M-profile graph already exists as the activation funnel"/>
          <Stack number="02" what="Profile graph" why="Nobody else has Indian skill canvas at this scale"/>
          <Stack number="03" what="AI App Store" why="Forge fits as new tiles — zero retraining"/>
          <Stack number="04" what="Indian rails" why="Aadhaar / DigiLocker / UAN / NSQF — only Redrob can plug in"/>
          <Stack number="05" what="Two-sided" why="Candidates + recruiters on one platform · Forge connects them"/>
        </div>
      </div>
    </SlideWrap>
  )
}

function RadarChart({ axes }: { axes: Axis[] }) {
  const center = 200
  const maxRadius = 160
  const n = axes.length

  function point(i: number, value: number) {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2
    const r = (value / 100) * maxRadius
    return { x: center + Math.cos(angle) * r, y: center + Math.sin(angle) * r }
  }

  const todayPath = axes.map((a, i) => point(i, a.today)).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  const forgePath = axes.map((a, i) => point(i, a.withForge)).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full max-w-lg">
        {/* Concentric circles for scale */}
        {[20, 40, 60, 80, 100].map((v) => (
          <circle key={v} cx={center} cy={center} r={(v / 100) * maxRadius} fill="none" stroke="#E5E7EB" strokeWidth="1"/>
        ))}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2
          const x = center + Math.cos(angle) * maxRadius
          const y = center + Math.sin(angle) * maxRadius
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1"/>
        })}

        {/* Today polygon */}
        <path d={todayPath} fill="#A1A1AA" fillOpacity="0.2" stroke="#A1A1AA" strokeWidth="2"/>

        {/* Forge polygon */}
        <path d={forgePath} fill="#2563EB" fillOpacity="0.25" stroke="#2563EB" strokeWidth="2.5"/>

        {/* Axis labels */}
        {axes.map((a, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2
          const r = maxRadius + 25
          const x = center + Math.cos(angle) * r
          const y = center + Math.sin(angle) * r
          return (
            <text key={a.key} x={x} y={y} fontSize="11" textAnchor="middle" fill="#0A0A0A"
                  dominantBaseline="middle" fontFamily="Inter, sans-serif" fontWeight="500">
              {a.label.split(' ').slice(0, 2).join(' ')}
            </text>
          )
        })}

        {/* Legend */}
        <g transform="translate(20, 380)">
          <rect x="0" y="-8" width="10" height="10" fill="#A1A1AA" fillOpacity="0.4" stroke="#A1A1AA"/>
          <text x="14" y="0" fontSize="10" fill="#525252" fontFamily="Inter, sans-serif">Redrob today</text>
          <rect x="100" y="-8" width="10" height="10" fill="#2563EB" fillOpacity="0.4" stroke="#2563EB"/>
          <text x="114" y="0" fontSize="10" fill="#2563EB" fontFamily="Inter, sans-serif" fontWeight="600">Redrob + Forge</text>
        </g>
      </svg>
    </div>
  )
}

function Stack({ number, what, why }: any) {
  return (
    <div>
      <div className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider">{number}</div>
      <div className="font-semibold text-sm mt-1 text-white">{what}</div>
      <div className="text-[10px] text-white/70 mt-1 leading-relaxed">{why}</div>
    </div>
  )
}
