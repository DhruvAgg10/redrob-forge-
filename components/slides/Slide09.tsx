import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

const KANO_ROWS = [
  { type: 'Must-have', tier: 'Free ₹0', color: '#525252', features: ['Career Path (basic)', 'ATS Scanner', 'W3C credential mint', '3 creds/mo'] },
  { type: 'Performance', tier: 'Pro ₹299/mo', color: '#2563EB', features: ['10 Career Path scans', 'AI-graded ATS', '2 Defence sessions', 'Boosted leaderboard'] },
  { type: 'Delighter', tier: 'Pro+ ₹499/mo', color: '#DC2626', features: ['AI Peer Mentor', 'Hire-ready badge', 'Unlimited Defence', 'Verifier API'] },
]

const PRICING_TIERS = [
  {
    name: 'Free', price: '₹0', priceNote: 'forever',
    features: ['3 credentials/mo', 'Basic ATS scanner', '3 Career Path scans', 'Standard leaderboard'],
    hook: 'Career Path results expire after 30 days → re-engage to refresh',
  },
  {
    name: 'Pro', price: '₹299', priceNote: '/mo', highlight: true,
    features: ['10 credentials/mo', 'AI-graded ATS', '10 Career Path scans', '2 Defence sessions', 'Boosted leaderboard'],
    hook: 'Credential wallet grows over time → switching cost increases every month',
  },
  {
    name: 'Pro+', price: '₹499', priceNote: '/mo',
    features: ['Unlimited everything', 'Verified hire-ready badge', 'AI Peer Mentor', 'Unlimited Defence Interview'],
    hook: 'AI Peer Mentor learns your style → personalized = sticky',
  },
]

export function Slide09() {
  return (
    <SlideWrap>
      <SlideHeader
        number="08"
        framework="Pricing & Monetization Strategy"
        title={<>Three revenue streams mapped to <span className="text-[#2563EB]">Kano feature classes.</span></>}
        subtitle="Pricing backed by conjoint WTP analysis (peak ₹199-349) and industry benchmarks."
      />

      {/* Judging Q&A boxes */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <JudgingAnswer
          question="What business value is created?"
          answer="Free tier drives mass user engagement → Pro converts at 3-5% (HR SaaS avg 3.3%) → per-hire fee captures recruiter willingness at 50-75% below agency costs."
          color="#2563EB"
        />
        <JudgingAnswer
          question="How does it contribute to platform growth?"
          answer="Free Career Path = zero-friction top-of-funnel. Every credential shared on LinkedIn = organic acquisition. Each hire makes the AI sharper."
          color="#0A0A0A"
        />
        <JudgingAnswer
          question="What monetization & retention opportunities?"
          answer="3 streams: B2C subs (₹299/mo), B2B per-hire (₹49,999), Enterprise SaaS (₹15L-₹1Cr/yr). Retention: credential wallet locks in users."
          color="#DC2626"
        />
      </div>

      {/* Kano classification — compact */}
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-2">Kano Feature Classification</div>
        <div className="grid grid-cols-3 gap-3">
          {KANO_ROWS.map((k) => (
            <div key={k.type} className="rounded-xl border border-[#E5E7EB] p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider" style={{ color: k.color }}>{k.type}</span>
                <span className="text-[9px] font-mono text-[#A1A1AA]">{k.tier}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {k.features.map((f) => (
                  <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F4F4F5] text-[#0A0A0A]">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing tiers with retention hooks */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {PRICING_TIERS.map((t) => (
          <div key={t.name} className={`rounded-2xl p-4 border ${t.highlight ? 'border-[#2563EB] bg-[#2563EB]/5' : 'border-[#E5E7EB]'}`}>
            <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">{t.name}</div>
            <div className="font-semibold text-xl mt-1 text-[#0A0A0A]">{t.price}<span className="text-xs text-[#A1A1AA] font-normal"> {t.priceNote}</span></div>
            <ul className="mt-2 space-y-0.5 text-[11px] text-[#525252]">
              {t.features.map((f) => <li key={f}>· {f}</li>)}
            </ul>
            <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
              <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-0.5">Retention hook</div>
              <div className="text-[10px] text-[#525252]">{t.hook}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recruiter pricing strip */}
      <div className="rounded-2xl border border-[#0A0A0A] bg-[#0A0A0A] text-white p-4 mb-5">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">Recruiter Side · B2B Revenue</div>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <RecruiterRow label="Challenge posting" value="Free" detail="Top-of-funnel for recruiters"/>
          <RecruiterRow label="Per-hire success fee" value="₹49,999" detail="50-75% below agency fees (₹1-2L)" highlight/>
          <RecruiterRow label="Enterprise (20+ hires/yr)" value="₹15L – ₹1Cr/yr" detail="Platform SaaS for large orgs"/>
        </div>
      </div>

      {/* Growth flywheel */}
      <div className="rounded-xl border border-[#E5E7EB] p-4 mb-4">
        <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-2">Growth Flywheel</div>
        <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-[#525252] flex-wrap">
          <Step label="Free users sign up"/>
          <Arrow/>
          <Step label="Earn credentials"/>
          <Arrow/>
          <Step label="Share on LinkedIn"/>
          <Arrow/>
          <Step label="New users discover"/>
          <Arrow/>
          <Step label="Recruiters see verified talent"/>
          <Arrow/>
          <Step label="Post challenges"/>
          <Arrow/>
          <Step label="More users verify" last/>
        </div>
        <div className="text-center text-[9px] text-[#A1A1AA] mt-1 font-mono">↻ Self-reinforcing cycle — each revolution improves AI match quality</div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'First Page Sage 2026: SaaS freemium → paid avg 3.7%, HR SaaS = 3.3%' },
        { num: '2', ref: 'GoodSpace 2026: Agency recruitment fees ₹1-2L per hire' },
        { num: '3', ref: 'Conjoint survey: WTP peak ₹199-349 (n=100 synthetic + n=28 live)' },
        { num: '4', ref: 'Kano, N. "Attractive Quality vs Must-be Quality" — Quality Journal 14(2), 1984' },
      ]}/>
    </SlideWrap>
  )
}

function JudgingAnswer({ question, answer, color }: { question: string; answer: string; color: string }) {
  return (
    <div className="rounded-xl border-l-4 bg-[#FAFAFA] p-3" style={{ borderColor: color }}>
      <div className="text-[10px] uppercase tracking-wider font-mono font-semibold mb-1" style={{ color }}>{question}</div>
      <div className="text-[11px] text-[#0A0A0A] leading-relaxed">{answer}</div>
    </div>
  )
}

function RecruiterRow({ label, value, detail, highlight }: { label: string; value: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? 'bg-[#2563EB]/20 border border-[#2563EB]' : 'bg-white/10'}`}>
      <div className="text-[10px] uppercase tracking-wider font-mono text-white/60">{label}</div>
      <div className="font-semibold text-sm mt-1 text-white">{value}</div>
      <div className="text-[9px] text-white/50 mt-0.5">{detail}</div>
    </div>
  )
}

function Step({ label, last }: { label: string; last?: boolean }) {
  return (
    <span className={`px-2 py-1 rounded-md bg-[#F4F4F5] text-[#0A0A0A] whitespace-nowrap ${last ? 'border border-[#2563EB] bg-[#2563EB]/5' : ''}`}>{label}</span>
  )
}

function Arrow() {
  return <span className="text-[#A1A1AA] text-xs">→</span>
}
