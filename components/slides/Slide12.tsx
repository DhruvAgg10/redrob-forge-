import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'

export function Slide12() {
  return (
    <SlideWrap>
      <SlideHeader
        number="11"
        framework="Future Vision"
        title={<>Forge is the credential layer. <span className="text-[#2563EB]">The data is the real play.</span></>}
        subtitle=""
      />

      {/* Vision statement */}
      <div className="rounded-2xl bg-[#0A0A0A] text-white p-5 mb-5 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#2563EB] mb-1">Where this goes</div>
        <div className="font-semibold text-xl leading-snug">
          8 tiles in an app store <span className="text-white/50">→</span> the platform that knows what skills India needs,
          teaches them from real winners, and <span className="text-[#2563EB]">proves you have them.</span>
        </div>
      </div>

      {/* 3 compounding data assets */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Three data assets that compound — and no one else can build</div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <DataAsset
          icon="📊" color="#2563EB"
          title="Hiring Outcome Data"
          captures="Which credentials → which hires → which retained"
          unlocks="Predictive hiring: '2x retention with this credential profile'"
        />
        <DataAsset
          icon="🏆" color="#7C3AED"
          title="Top Performer Intelligence"
          captures="How top scorers think, structure, communicate"
          unlocks="AI career coach trained on real Indian hiring outcomes"
        />
        <DataAsset
          icon="📈" color="#DC2626"
          title="Skills Demand Signal"
          captures="Which companies test for what skills, at what price"
          unlocks="Tell students what to learn before the market shifts"
        />
      </div>

      {/* Evolution arc */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Redrob evolution — platform to infrastructure</div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <YearCard year="Y1" color="#2563EB" label="Credential layer"
          metric="3K credentialed · 75 hires · first outcome data"/>
        <YearCard year="Y2" color="#7C3AED" label="Verification standard"
          metric="25K credentialed · 400 recruiters · Peer Mentor live"/>
        <YearCard year="Y3" color="#DC2626" label="Skill intelligence platform"
          metric="Predictive hiring · Skills demand API · Peer Mentor standalone"/>
      </div>

      {/* Lifecycle loop */}
      <div className="rounded-xl border border-[#E5E7EB] p-3 mb-5">
        <svg viewBox="0 0 800 110" className="w-full">
          {[
            { x: 80, label: 'What to learn', sub: 'Demand Signal', color: '#DC2626', icon: '📈' },
            { x: 240, label: 'How to learn', sub: 'Peer Mentor', color: '#7C3AED', icon: '🏆' },
            { x: 400, label: 'Prove you did', sub: 'Credential', color: '#2563EB', icon: '✓' },
            { x: 560, label: 'Get hired', sub: 'Challenge + Trial', color: '#0A0A0A', icon: '💼' },
            { x: 720, label: 'Feeds AI', sub: 'Outcome → loop', color: '#2563EB', icon: '↻' },
          ].map((s, i) => (
            <g key={s.label}>
              <circle cx={s.x} cy={45} r={22} fill="white" stroke={s.color} strokeWidth="2"/>
              <text x={s.x} y={48} textAnchor="middle" fontSize="14">{s.icon}</text>
              <text x={s.x} y={80} textAnchor="middle" fontSize="10" fill="#0A0A0A" fontWeight="bold">{s.label}</text>
              <text x={s.x} y={93} textAnchor="middle" fontSize="7" fill="#A1A1AA" fontFamily="monospace">{s.sub}</text>
              {i < 4 && (
                <line x1={s.x + 26} y1={45} x2={s.x + 134} y2={45} stroke={s.color} strokeWidth="1.5" markerEnd="url(#arr)"/>
              )}
            </g>
          ))}
          <path d="M 742 45 Q 770 45 770 15 Q 770 -10 400 -10 Q 30 -10 30 15 Q 30 45 58 45" fill="none" stroke="#2563EB" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr)"/>
          <text x={400} y={4} textAnchor="middle" fontSize="7" fill="#2563EB" fontFamily="monospace" fontWeight="bold">EACH COHORT MAKES THE NEXT BETTER</text>
          <defs>
            <marker id="arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#2563EB"/></marker>
          </defs>
        </svg>
      </div>

      {/* The ask */}
      <div className="rounded-2xl border-2 border-[#2563EB] bg-[#2563EB]/5 p-5 text-center">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB]">The Ask</div>
        <div className="font-semibold text-2xl text-[#0A0A0A] mt-2">Greenlight Forge as a Redrob Q2 launch.</div>
        <p className="text-[#525252] mt-1 text-sm">
          Live demo at <span className="font-mono text-[#2563EB]">localhost:3000</span> · Survey at <span className="font-mono text-[#2563EB]">/survey</span>
        </p>
        <div className="mt-2 text-[9px] font-mono text-[#A1A1AA]">
          Forge starts as 8 tiles. It ends as the reason Redrob becomes irreplaceable.
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Redrob: 700M profiles, 3M users, 500+ universities, $14M funding (CIOL, Business Standard)' },
        { num: '2', ref: 'W3C Verifiable Credentials 2.0 — w3.org/TR/vc-data-model-2.0' },
        { num: '3', ref: 'All projections backed in Appendix B (bottom-up funnel model)' },
      ]}/>
    </SlideWrap>
  )
}

function DataAsset({ icon, color, title, captures, unlocks }: any) {
  return (
    <div className="rounded-xl border-2 p-3" style={{ borderColor: color }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-xl">{icon}</div>
        <div className="font-bold text-sm" style={{ color }}>{title}</div>
      </div>
      <div className="text-[9px] text-[#525252] leading-snug mb-2">{captures}</div>
      <div className="rounded-lg p-2" style={{ background: color + '10' }}>
        <div className="text-[7px] uppercase tracking-wider font-mono mb-0.5" style={{ color }}>Unlocks</div>
        <div className="text-[9px] font-medium leading-snug" style={{ color }}>{unlocks}</div>
      </div>
    </div>
  )
}

function YearCard({ year, color, label, metric }: any) {
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: color + '44' }}>
      <div className="text-[10px] uppercase tracking-wider font-mono font-bold" style={{ color }}>{year}</div>
      <div className="font-bold text-base text-[#0A0A0A] mt-1">{label}</div>
      <div className="text-[9px] text-[#525252] mt-1 font-mono">{metric}</div>
    </div>
  )
}
