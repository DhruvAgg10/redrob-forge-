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
      <div className="rounded-2xl bg-[#0A0A0A] text-white p-6 mb-5 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#2563EB] mb-2">Where this goes</div>
        <div className="font-semibold text-2xl leading-snug">
          Forge starts as <span className="text-white/60">8 tiles in an app store.</span><br/>
          It becomes <span className="text-[#2563EB]">the platform that knows what skills India needs,<br/>teaches them from real winners, and proves you have them.</span>
        </div>
      </div>

      {/* 3 data flywheels that compound */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Three data assets that compound — and no one else can build</div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <DataAsset
          icon="📊"
          color="#2563EB"
          title="Hiring Outcome Data"
          what="Which credentials → which hires → which retained"
          today="Redrob has 700M profiles + recruiter activity. Forge adds the missing link: verified skill → job outcome."
          compounds="Over time, Redrob knows what actually predicts job success. Not LinkedIn keywords. Not resume padding. Real outcome data."
          unlocks="Predictive hiring — tell recruiters 'candidates with this credential profile have 2x retention' before they even post a challenge."
        />
        <DataAsset
          icon="🏆"
          color="#7C3AED"
          title="Top Performer Intelligence"
          what="Leaderboard data → AI Peer Mentor trained on winners"
          today="Skill Studio captures how top scorers think, structure, and communicate. Leaderboard ranks them."
          compounds="AI Peer Mentor learns from the best — not generic LLM advice, but patterns from candidates who actually got hired and retained."
          unlocks="The first AI career coach trained on real Indian hiring outcomes. 'People who got this role scored 90+ on these rubrics and structured answers like this.'"
        />
        <DataAsset
          icon="📈"
          color="#DC2626"
          title="Skills Demand Signal"
          what="Which companies → which challenges → which roles → at what price"
          today="Recruiters post challenges by role + skill. Forge sees real-time demand — not job descriptions, but what companies actually test for."
          compounds="Redrob becomes the source of truth for 'what skills does India need right now?' Better than any job board or government report."
          unlocks="Tell students what to learn BEFORE the market shifts. Tell universities which courses to build. Tell policymakers where the gaps are."
        />
      </div>

      {/* Evolution arc — what Redrob BECOMES */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">How Redrob evolves — from AI platform to skill intelligence infrastructure</div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <YearCard
          year="Year 1"
          color="#2563EB"
          redrob="AI platform + credential layer"
          shift="Forge adds verification to Redrob's existing search + chat. First hiring outcomes flow. Peer Mentor AI in alpha."
          proof="3K credentialed candidates · 75 verified hires · First outcome-to-credential correlations"
        />
        <YearCard
          year="Year 2"
          color="#7C3AED"
          redrob="India's skill verification standard"
          shift="Hiring data compounds. Peer Mentor AI goes live — trained on 10K+ real task responses. Skills demand dashboard for universities."
          proof="25K credentialed · 400 recruiters · Universities use Forge data for curriculum planning"
        />
        <YearCard
          year="Year 3"
          color="#DC2626"
          redrob="India's skill intelligence platform"
          shift="Redrob doesn't just verify skills — it tells the market what skills matter, teaches them from real winners, and connects proven talent to demand."
          proof="Predictive hiring signals · AI Peer Mentor as standalone product · Skills demand API for policymakers"
        />
      </div>

      {/* Full lifecycle visual */}
      <div className="rounded-2xl border border-[#E5E7EB] p-4 mb-5">
        <svg viewBox="0 0 800 140" className="w-full">
          {/* The loop */}
          {[
            { x: 80, label: 'What to learn', sub: 'Skills Demand Signal', color: '#DC2626', icon: '📈' },
            { x: 240, label: 'How to learn it', sub: 'AI Peer Mentor', color: '#7C3AED', icon: '🏆' },
            { x: 400, label: 'Prove you did', sub: 'Skill Studio + Credential', color: '#2563EB', icon: '✓' },
            { x: 560, label: 'Get hired', sub: 'Challenge + Trial', color: '#0A0A0A', icon: '💼' },
            { x: 720, label: 'Success feeds AI', sub: 'Outcome data loops back', color: '#2563EB', icon: '↻' },
          ].map((s, i) => (
            <g key={s.label}>
              <circle cx={s.x} cy={55} r={28} fill="white" stroke={s.color} strokeWidth="2.5"/>
              <text x={s.x} y={58} textAnchor="middle" fontSize="18">{s.icon}</text>
              <text x={s.x} y={95} textAnchor="middle" fontSize="11" fill="#0A0A0A" fontWeight="bold">{s.label}</text>
              <text x={s.x} y={110} textAnchor="middle" fontSize="8" fill="#A1A1AA" fontFamily="monospace">{s.sub}</text>
              {i < 4 && (
                <line x1={s.x + 32} y1={55} x2={s.x + 128} y2={55} stroke={s.color} strokeWidth="2" markerEnd="url(#arrow)"/>
              )}
            </g>
          ))}
          {/* Return arrow from last to first */}
          <path d="M 748 55 Q 780 55 780 20 Q 780 -10 400 -10 Q 20 -10 20 20 Q 20 55 48 55" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow)"/>
          <text x={400} y={6} textAnchor="middle" fontSize="8" fill="#2563EB" fontFamily="monospace" fontWeight="bold">EACH COHORT MAKES THE NEXT COHORT BETTER</text>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#2563EB"/></marker>
          </defs>
        </svg>
      </div>

      {/* The ask */}
      <div className="rounded-2xl border-2 border-[#2563EB] bg-[#2563EB]/5 p-6 text-center">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB]">The Ask</div>
        <div className="font-semibold text-2xl text-[#0A0A0A] mt-2">Greenlight Forge as a Redrob Q2 launch.</div>
        <p className="text-[#525252] mt-2 text-sm">
          Live demo at <span className="font-mono text-[#2563EB]">localhost:3000</span> · Pricing study at <span className="font-mono text-[#2563EB]">/survey</span> · Take the survey at <span className="font-mono text-[#2563EB]">/survey/take</span>
        </p>
        <div className="mt-3 text-[9px] font-mono text-[#A1A1AA]">
          Forge starts as 8 tiles. It ends as the reason Redrob becomes irreplaceable.
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Redrob: 700M profiles, 3M users, 500+ universities, $14M funding (CIOL, Business Standard)' },
        { num: '2', ref: 'W3C Verifiable Credentials 2.0 — w3.org/TR/vc-data-model-2.0' },
        { num: '3', ref: 'All Y1-Y3 projections backed in Appendix B (bottom-up funnel model)' },
      ]}/>
    </SlideWrap>
  )
}

function DataAsset({ icon, color, title, what, today, compounds, unlocks }: any) {
  return (
    <div className="rounded-2xl border-2 p-4 flex flex-col" style={{ borderColor: color }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="font-bold text-sm" style={{ color }}>{title}</div>
          <div className="text-[8px] font-mono text-[#A1A1AA]">{what}</div>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <div>
          <div className="text-[7px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-0.5">What Forge captures</div>
          <div className="text-[9px] text-[#525252] leading-snug">{today}</div>
        </div>
        <div>
          <div className="text-[7px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-0.5">How it compounds</div>
          <div className="text-[9px] text-[#525252] leading-snug">{compounds}</div>
        </div>
        <div className="rounded-lg p-2" style={{ background: color + '10' }}>
          <div className="text-[7px] uppercase tracking-wider font-mono mb-0.5" style={{ color }}>What it unlocks</div>
          <div className="text-[9px] font-medium leading-snug" style={{ color }}>{unlocks}</div>
        </div>
      </div>
    </div>
  )
}

function YearCard({ year, color, redrob, shift, proof }: any) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: color + '44' }}>
      <div className="text-[10px] uppercase tracking-wider font-mono font-bold" style={{ color }}>{year}</div>
      <div className="font-bold text-base text-[#0A0A0A] mt-1 leading-tight">{redrob}</div>
      <div className="text-[10px] text-[#525252] mt-2 leading-snug">{shift}</div>
      <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
        <div className="text-[7px] uppercase tracking-wider font-mono text-[#A1A1AA]">Proof points</div>
        <div className="text-[9px] text-[#0A0A0A] font-medium mt-0.5">{proof}</div>
      </div>
    </div>
  )
}
