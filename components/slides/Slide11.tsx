import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

// AARRR Pirate Metrics for the North Star + supporting KPIs
const BUCKETS = [
  {
    name: 'Acquisition', colour: '#2563EB',
    detail: 'How users discover Forge. Free Career Path is the no-login top-of-funnel surface for organic SEO + LinkedIn sharing.',
    rows: [
      { label: 'Free Career Path users', y1: '250K', y3: '5M' },
      { label: 'Free → signup conversion', y1: '18%', y3: '25%' },
    ],
  },
  {
    name: 'Activation', colour: '#2563EB',
    detail: 'Activation = first credential minted. Target < 20 min from signup. Open-ended Skill Studio task is the activation moment.',
    rows: [
      { label: 'Credentialed candidates', y1: '25K', y3: '1M' },
      { label: 'Credentials per active', y1: '2.5', y3: '6' },
    ],
  },
  {
    name: 'Retention', colour: '#0A0A0A',
    detail: 'Recruiter side and candidate side both. Recruiters return when they post second challenge. Candidates return weekly to check new challenges.',
    rows: [
      { label: 'Trial-to-hire conversion', y1: '50%', y3: '65%' },
      { label: 'Recruiter repeat rate', y1: '60%', y3: '85%' },
    ],
  },
  {
    name: 'Referral', colour: '#DC2626',
    detail: 'Credentials shared on LinkedIn drive top-of-funnel acquisition. Hired candidates become organic evangelists. Referral coefficient K target > 1.0.',
    rows: [
      { label: 'Credential LinkedIn share rate', y1: '8%', y3: '20%' },
      { label: 'Referral coefficient K', y1: '0.6', y3: '1.3' },
    ],
  },
  {
    name: 'Revenue', colour: '#0A0A0A',
    detail: 'Multi-stream: B2C subscription + per-challenge + per-hire + enterprise + Verifier API. Visible across all five.',
    rows: [
      { label: 'ARR', y1: '₹6 Cr', y3: '₹200 Cr' },
      { label: 'Paying recruiters', y1: '100', y3: '4,000' },
    ],
  },
]

export function Slide11() {
  return (
    <SlideWrap>
      <SlideHeader
        number="10"
        framework="AARRR Pirate Metrics"
        title={<>One north star metric. <span className="text-[#2563EB]">Five buckets of supporting KPIs.</span></>}
        subtitle="Verified hires per month captures the entire funnel in one number. Below it, AARRR breaks out the leading indicators. Hover any bucket for the strategic context."
      />

      <div className="rounded-2xl bg-[#0A0A0A] text-white p-8 mb-6 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#2563EB] mb-2">North Star Metric</div>
        <div className="font-semibold text-5xl">Verified hires per month</div>
        <p className="text-white/70 mt-2 text-sm">Captures activation × conversion × retention × marketplace health in a single number.</p>

        <div className="mt-8 grid grid-cols-3 gap-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">Year 1</div>
            <div className="font-semibold text-4xl mt-1 text-white">100/mo</div>
          </div>
          <div className="border-x border-white/20">
            <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">Year 2</div>
            <div className="font-semibold text-4xl mt-1 text-white">800/mo</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB]">Year 3 target</div>
            <div className="font-semibold text-4xl mt-1 text-[#2563EB]">5,000/mo</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {BUCKETS.map((b) => (
          <HoverCard key={b.name} title={b.name + ' bucket'} body={b.detail}>
            <div className="rounded-xl border bg-white p-4 cursor-help hover:shadow-md transition" style={{ borderColor: b.colour }}>
              <div className="text-[10px] uppercase tracking-wider font-mono font-semibold mb-3" style={{ color: b.colour }}>{b.name}</div>
              {b.rows.map((r) => (
                <div key={r.label} className="mb-2 last:mb-0">
                  <div className="text-[10px] text-[#525252]">{r.label}</div>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-xs font-mono text-[#A1A1AA]">{r.y1}</span>
                    <span className="text-[10px] text-[#A1A1AA]">→</span>
                    <span className="text-sm font-semibold" style={{ color: b.colour }}>{r.y3}</span>
                  </div>
                </div>
              ))}
            </div>
          </HoverCard>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#2563EB] mb-3">Leading indicators · watch weekly</div>
        <div className="grid grid-cols-4 gap-3">
          <Indicator label="Time-to-first-credential" value="< 20 min" what="Activation depth"/>
          <Indicator label="Recruiter trial-to-hire %" value="> 50%" what="Marketplace quality"/>
          <Indicator label="Credential LinkedIn share %" value="> 12%" what="Referral coefficient"/>
          <Indicator label="Defence interview opt-in %" value="> 75%" what="Feature stickiness"/>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'McClure, D. "AARRR Pirate Metrics" — 500 Startups, 2007 (founding AARRR reference)' },
        { num: '2', ref: 'OpenView Partners, "SaaS Benchmarks Report 2024" — activation + retention targets' },
        { num: '3', ref: 'NorthStar Metric framework — Sean Ellis & Mark Roberge writings' },
        { num: '4', ref: 'Cohort revenue model — based on internal Bessemer SaaS benchmarks (publicly accessible)' },
      ]}/>
    </SlideWrap>
  )
}

function Indicator({ label, value, what }: any) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">{label}</div>
      <div className="font-mono text-2xl text-[#0A0A0A] mt-1">{value}</div>
      <div className="text-[10px] text-[#525252] mt-0.5">{what}</div>
    </div>
  )
}
