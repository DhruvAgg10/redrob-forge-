import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

// Kano model: Must-have / Performance / Delighter features
// BCG matrix: Stars / Question Marks / Cash Cows / Dogs

const KANO_FEATURES = [
  { type: 'Must-have', features: ['Free Career Path', 'Basic Skill Studio (1/mo)', 'W3C credential mint', 'ATS scanner (basic)'], detail: 'Without these, the product fails. Users expect them silently. No upside if you ship them — major downside if you don\'t.' },
  { type: 'Performance', features: ['Unlimited credentials', 'AI-graded ATS', '10 Career Path scans/mo', '2 Defence interview sessions', 'Boosted leaderboard'], detail: 'More = more satisfaction. Linear relationship. Pro tier (₹199-299) is built entirely from these.' },
  { type: 'Delighter', features: ['Verified hire-ready badge', 'AI Peer Mentor', 'Unlimited Defence Interview', 'Verifier API at $0.05', 'Custom verifier domain'], detail: 'Wow features. Pro+ tier (₹399-499). Users don\'t expect them. When they see them, they switch from competitors.' },
]

const BCG = [
  { quad: 'Stars', x: 75, y: 80, label: 'Skill Studio + Challenges', detail: 'High growth, high share. Activation + monetization engine. Where Year 1-2 investment goes.' },
  { quad: 'Question Marks', x: 80, y: 40, label: 'Community + Mentor AI', detail: 'High growth potential, low share today. Could be Star or Dog. Test for retention impact in Y1.' },
  { quad: 'Cash Cows', x: 25, y: 75, label: 'Verifier API (Y3)', detail: 'Low growth (mature credential standard), high share. Pays for the rest of the platform.' },
  { quad: 'Dogs', x: 20, y: 25, label: 'Resume Builder (legacy)', detail: 'Low growth, low share. Replaced by ATS Scanner. Documented to show discipline of what we did NOT build.' },
]

export function Slide09() {
  return (
    <SlideWrap>
      <SlideHeader
        number="08"
        framework="Kano Model + BCG Portfolio Matrix"
        title={<>Pricing tiers map to <span className="text-[#2563EB]">Kano feature classes.</span> Portfolio mapped via BCG.</>}
        subtitle="Validated by 100-respondent synthetic conjoint + n=28 live respondents. Ranges, not points. Hover for the Kano + BCG reasoning."
      />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Kano model */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-3">Kano Feature Classification</div>
          <div className="space-y-3">
            {KANO_FEATURES.map((k, i) => (
              <HoverCard key={k.type} title={k.type + ' features'} body={k.detail}>
                <div className="rounded-xl border border-[#E5E7EB] p-4 cursor-help hover:border-[#2563EB]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider"
                         style={{ color: i === 0 ? '#525252' : i === 1 ? '#2563EB' : '#DC2626' }}>
                      {k.type}
                    </div>
                    <div className="text-[10px] font-mono text-[#A1A1AA]">
                      Tier · {i === 0 ? 'Free' : i === 1 ? 'Pro ₹199-299' : 'Pro+ ₹399-499'}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {k.features.map((f) => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4F4F5] text-[#0A0A0A]">{f}</span>
                    ))}
                  </div>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* BCG Matrix */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-3">BCG Portfolio Matrix</div>
          <div className="relative rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] aspect-square p-6 min-h-[420px]">
            {/* Quadrant labels */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">↑ HIGH MARKET GROWTH</div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">↓ Low growth</div>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] -rotate-90">← Low share</div>
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] rotate-90">HIGH SHARE →</div>

            <div className="absolute left-1/2 top-8 bottom-8 w-px bg-[#E5E7EB]"/>
            <div className="absolute top-1/2 left-8 right-8 h-px bg-[#E5E7EB]"/>

            {/* Quadrant text */}
            <div className="absolute top-10 left-10 text-[10px] font-mono uppercase tracking-wider text-[#2563EB] font-semibold">★ Stars</div>
            <div className="absolute top-10 right-10 text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">? Question marks</div>
            <div className="absolute bottom-10 left-10 text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">$ Cash cows</div>
            <div className="absolute bottom-10 right-10 text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">✕ Dogs</div>

            {/* Bubbles */}
            {BCG.map((b) => {
              const labelLeft = b.x > 60
              return (
                <div key={b.quad} className="absolute" style={{ left: `${b.x}%`, top: `${100 - b.y}%`, transform: 'translate(-50%, -50%)' }}>
                  <HoverCard title={b.quad + ' · ' + b.label} body={b.detail}>
                    <div className={`rounded-full flex items-center justify-center font-semibold text-xs shadow-md transition hover:scale-110 cursor-help relative ${
                      b.quad === 'Stars' ? 'bg-[#2563EB] text-white' :
                      b.quad === 'Cash Cows' ? 'bg-[#0A0A0A] text-white' :
                      'bg-white border-2 border-[#0A0A0A] text-[#0A0A0A]'
                    }`} style={{ width: 70, height: 70 }}>{b.quad.split(' ')[0]}</div>
                  </HoverCard>
                  <div className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#0A0A0A] whitespace-nowrap max-w-[140px] ${labelLeft ? 'right-full mr-2 text-right' : 'left-full ml-2'}`}>{b.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <PricingTier name="Free" price="₹0" features={['3 credentials/mo', '10 basic ATS', '3 Career Path scans', 'Standard leaderboard']} share="79%"/>
        <PricingTier name="Pro" price="₹199–₹299" features={['10 credentials/mo', '10 + AI ATS', '5 Career Path', '2 Defence sessions', 'Boosted leaderboard', '35% annual']} share="40-48%" highlight/>
        <PricingTier name="Pro+" price="₹399–₹499" features={['Unlimited everything', 'Verified hire-ready badge', 'Unlimited Defence', '40% annual']} share="18-22%"/>
      </div>

      <div className="rounded-2xl border border-[#0A0A0A] bg-[#0A0A0A] text-white p-5">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">Recruiter side · Outcome-based (Sierra/Fin pattern)</div>
        <div className="grid grid-cols-5 gap-3 text-xs">
          <RecruiterRow label="Challenge posting" value="Free"/>
          <RecruiterRow label="Per-hire success fee" value="₹49,999 or 8% CTC" highlight/>
          <RecruiterRow label="Defence Interview AI" value="₹999/finalist"/>
          <RecruiterRow label="Trial workspace" value="₹4,999 + escrow"/>
          <RecruiterRow label="Enterprise (20+ hires/yr)" value="₹15L - ₹1Cr/yr"/>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <UnitEcon value="20:1" label="Candidate LTV:CAC" hint="CAC ₹120 organic · LTV ₹2,400 over 12mo"/>
        <UnitEcon value="22:1" label="Recruiter LTV:CAC" hint="CAC ₹8K outbound · LTV ₹1.75L (3 challenges + 1 hire)"/>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Argyle, L. et al., "Out of One, Many: Using Language Models to Simulate Human Samples" — Political Analysis 31(3), 2023' },
        { num: '2', ref: 'Brand, J. et al., "Using GPT for Market Research" — HBS Working Paper 23-062, 2023' },
        { num: '3', ref: 'Aher, G. et al., "Using LLMs to Simulate Multiple Humans" — ICML 2023 (Harvard)' },
        { num: '4', ref: 'Sierra AI pricing — $0.50-5 per resolution — sierra.ai/pricing (Mar 2025)' },
        { num: '5', ref: 'Intercom Fin AI agent — $0.99 per resolved ticket — intercom.com/fin' },
        { num: '6', ref: 'Kano, N. "Attractive Quality vs Must-be Quality" — Quality Journal 14(2), 1984' },
        { num: '7', ref: 'BCG Growth-Share Matrix — Henderson, B. "Product Portfolio" — BCG Perspectives, 1970' },
        { num: '8', ref: 'Van Westendorp PSM — Van Westendorp, P. "NSS-Price Sensitivity Meter" — ESOMAR 1976' },
      ]}/>
    </SlideWrap>
  )
}

function PricingTier({ name, price, features, share, highlight }: any) {
  return (
    <div className={`rounded-2xl p-5 border ${highlight ? 'border-[#2563EB] bg-[#2563EB]/5' : 'border-[#E5E7EB]'}`}>
      <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">{name}</div>
      <div className="font-semibold text-2xl mt-1 text-[#0A0A0A]">{price}<span className="text-xs text-[#A1A1AA] font-normal"> /mo</span></div>
      <ul className="mt-3 space-y-1 text-xs text-[#525252]">
        {features.map((f: string) => <li key={f}>· {f}</li>)}
      </ul>
      <div className="mt-3 pt-3 border-t border-[#E5E7EB] text-[10px] uppercase tracking-wider font-mono text-[#2563EB]">Preference share: {share}</div>
    </div>
  )
}

function RecruiterRow({ label, value, highlight }: any) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? 'bg-[#2563EB]/20 border border-[#2563EB]' : 'bg-white/10'}`}>
      <div className="text-[10px] uppercase tracking-wider font-mono text-white/60">{label}</div>
      <div className="font-semibold text-sm mt-1 text-white">{value}</div>
    </div>
  )
}

function UnitEcon({ value, label, hint }: any) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] p-4 flex items-center gap-4">
      <div className="font-semibold text-3xl text-[#2563EB]">{value}</div>
      <div>
        <div className="text-sm font-medium text-[#0A0A0A]">{label}</div>
        <div className="text-[10px] text-[#A1A1AA] mt-0.5">{hint}</div>
      </div>
    </div>
  )
}
