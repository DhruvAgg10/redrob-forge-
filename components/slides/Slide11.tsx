import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

const BUCKETS = [
  {
    name: 'Acquisition', colour: '#2563EB',
    detail: 'Forge ships inside Redrob\'s existing App Store (3M users). Free Career Path is the no-login top-of-funnel. Funnel: 3M users → 450K MAU → 90K exposed → 100K Career Path tries (Y1).',
    rows: [
      { label: 'Free Career Path users', y1: '100K', y3: '500K', note: '3M base × 15% MAU × 20% discover × 30% try' },
      { label: 'Free → signup conversion', y1: '9%', y3: '12%', note: 'SaaS freemium avg 3.7% (FPS 2026). Instant-value premium = 2.5x' },
    ],
  },
  {
    name: 'Activation', colour: '#2563EB',
    detail: 'Activation = first credential minted. Signup → attempt (50%, cf. Duolingo 60%) → pass at 70% threshold (mid-range of PMP 60-65%, AWS 60-78%). Y1: 100K × 9% × 50% × 70% = 3,150.',
    rows: [
      { label: 'Credentialed candidates', y1: '3K', y3: '25K', note: '100K × 9% signup × 50% attempt × 70% pass' },
      { label: 'Credentials per active', y1: '2', y3: '4', note: '1 per 6mo Y1 → 1 per quarter Y3' },
    ],
  },
  {
    name: 'Retention', colour: '#0A0A0A',
    detail: 'Recruiter GRR benchmarked against B2B SaaS SMB median 82-90% (SaaS Capital 2023). Trial-to-hire: interview-to-offer avg is 15-25% (Pin.com 2026), Forge pre-screens → higher quality.',
    rows: [
      { label: 'Trial-to-hire conversion', y1: 'Tgt 50%', y3: 'Tgt 60%', note: 'Interview-to-offer avg 15-25% (Pin.com). Forge pre-screens.' },
      { label: 'Recruiter GRR (annual)', y1: 'Tgt 85%', y3: 'Tgt 90%', note: 'B2B SaaS SMB GRR median 82-90% (SaaS Capital)' },
    ],
  },
  {
    name: 'Referral', colour: '#DC2626',
    detail: 'Credly platform avg: 67% badge acceptance rate, 47% share rate (of accepted). Effective share = 67% × 47% = 31%. Credentials shared on LinkedIn drive free acquisition.',
    rows: [
      { label: 'Credential acceptance rate', y1: '67%', y3: '75%', note: 'Credly platform avg 67%, top programs 80%' },
      { label: 'LinkedIn share rate (effective)', y1: '31%', y3: '41%', note: '67% accept × 47% share = 31% (Credly data)' },
    ],
  },
  {
    name: 'Revenue', colour: '#0A0A0A',
    detail: 'B2C: 3K cred × 3% convert = 95 Pro users × ₹299/mo. B2B: 50 recruiters × 1.5 hires × ₹49,999. Total Y1 ARR = ₹0.4 Cr (bottom-up). Y3: ₹8.5 Cr.',
    rows: [
      { label: 'ARR (Forge)', y1: '₹0.4 Cr', y3: '₹8.5 Cr', note: 'B2C ₹3.4L + B2B ₹37.5L = ₹41L Y1' },
      { label: 'Paying recruiters', y1: '50', y3: '400', note: 'Phase 2: 15 seed + Phase 3: 35 growth' },
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
        subtitle="Every number below is derived bottom-up from Redrob's 3M user base or benchmarked against industry data. Targets are labeled. Hover any bucket for the full calculation."
      />

      <div className="rounded-2xl bg-[#0A0A0A] text-white p-8 mb-6 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#2563EB] mb-2">North Star Metric</div>
        <div className="font-semibold text-5xl">Verified hires per month</div>
        <p className="text-white/70 mt-2 text-sm">Captures activation × conversion × retention × marketplace health in a single number.</p>

        <div className="mt-8 grid grid-cols-3 gap-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">Year 1 (end)</div>
            <div className="font-semibold text-4xl mt-1 text-white">15-20<span className="text-lg">/mo</span></div>
            <div className="text-[8px] font-mono text-white/40 mt-1">50 recruiters × 1.5 hires/yr ÷ 12, ramping</div>
          </div>
          <div className="border-x border-white/20">
            <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">Year 2</div>
            <div className="font-semibold text-4xl mt-1 text-white">60-80<span className="text-lg">/mo</span></div>
            <div className="text-[8px] font-mono text-white/40 mt-1">~200 recruiters × 3 hires/yr, steady state</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB]">Year 3 target</div>
            <div className="font-semibold text-4xl mt-1 text-[#2563EB]">130-150<span className="text-lg">/mo</span></div>
            <div className="text-[8px] font-mono text-[#2563EB]/60 mt-1">400 recruiters × 4 hires/yr ÷ 12</div>
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
                  <div className="text-[7px] text-[#A1A1AA] font-mono mt-0.5 leading-snug">{r.note}</div>
                </div>
              ))}
            </div>
          </HoverCard>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#2563EB] mb-3">Leading indicators · watch weekly</div>
        <div className="grid grid-cols-4 gap-3">
          <Indicator label="Time-to-first-credential" value="< 20 min" what="Activation depth" source="Skill Studio tasks = 15-20 min"/>
          <Indicator label="Recruiter trial-to-hire %" value="Tgt 50%" what="Marketplace quality" source="Interview-to-offer avg 15-25% (Pin.com)"/>
          <Indicator label="Credential share % (effective)" value="> 31%" what="Referral engine" source="Credly avg: 67% accept × 47% share"/>
          <Indicator label="Defence interview opt-in %" value="Tgt 60%" what="Feature stickiness" source="New feature — target, not benchmark"/>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'First Page Sage, "SaaS Freemium Conversion Rates 2026" — HR SaaS = 3.3%, all-SaaS avg = 3.7%' },
        { num: '2', ref: 'Credly/LeaderU case study — badge acceptance avg 67%, share rate avg 47%' },
        { num: '3', ref: 'Pin.com, "Recruitment Funnel Benchmarks 2026" — interview-to-offer 15-25% avg' },
        { num: '4', ref: 'SaaS Capital / ChartMogul — B2B SaaS SMB GRR median 82-90%' },
      ]}/>
    </SlideWrap>
  )
}

function Indicator({ label, value, what, source }: any) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">{label}</div>
      <div className="font-mono text-2xl text-[#0A0A0A] mt-1">{value}</div>
      <div className="text-[10px] text-[#525252] mt-0.5">{what}</div>
      <div className="text-[7px] text-[#A1A1AA] font-mono mt-0.5">{source}</div>
    </div>
  )
}
