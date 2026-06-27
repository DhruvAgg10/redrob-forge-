import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

// Ansoff Matrix: Existing/New Market × Existing/New Product
const ANSOFF = [
  {
    cell: 'penetration',
    title: 'Market Penetration',
    market: 'Existing market',
    product: 'Existing product',
    forge: 'Replace Soon tiles for existing Redrob users',
    detail: 'Forge ships as new tiles in the existing AI App Store. 700M-profile Redrob users see Career Path, Skill Studio, Challenges glow as NEW. Zero acquisition cost. Y1 primary growth lever.',
    risk: 'Low',
    timing: 'Y0-Y1',
  },
  {
    cell: 'product-dev',
    title: 'Product Development',
    market: 'Existing market',
    product: 'New product',
    forge: 'Forge premium tiers (Pro, Pro+) + Peer Mentor AI',
    detail: 'Net-new monetization for existing Redrob users: ₹199-499 subscription tiers, Peer Mentor AI, Community room with Forge Room AI. Same buyer, expanded product.',
    risk: 'Med',
    timing: 'Y1-Y2',
  },
  {
    cell: 'market-dev',
    title: 'Market Development',
    market: 'New market',
    product: 'Existing product',
    forge: 'Verifier API to global employers + Andela/Turing partnership',
    detail: 'Take the same credential infrastructure to international employers. $0.05/verification × 500K/mo = $25M ARR. Mercor/Andela become channel partners — they verify Indian talent via our API.',
    risk: 'Med',
    timing: 'Y2-Y3',
  },
  {
    cell: 'diversification',
    title: 'Diversification',
    market: 'New market',
    product: 'New product',
    forge: 'Forge Recruiter SaaS Enterprise (different buyer + product)',
    detail: 'B2B enterprise SaaS for 20+ hires/year companies (Razorpay, Cred, Zerodha). New buyer persona (CHRO, not founder), new product surface (analytics + bulk hiring). ₹15L-₹1Cr annual contracts.',
    risk: 'High',
    timing: 'Y2-Y3',
  },
]

export function Slide07() {
  return (
    <SlideWrap>
      <SlideHeader
        number="06"
        framework="Ansoff Growth Matrix"
        title={<>Four growth quadrants. <span className="text-[#2563EB]">Sequenced to risk.</span></>}
        subtitle="Existing vs new market × existing vs new product. Forge starts in the safest quadrant (penetration) and expands clockwise. Hover any cell for the Forge play in that quadrant."
      />

      <div className="grid grid-cols-[200px_1fr_1fr] gap-3">
        {/* Top row */}
        <div/>
        <ColumnLabel>Existing Product</ColumnLabel>
        <ColumnLabel>New Product</ColumnLabel>

        {/* Row 1: Existing market */}
        <RowLabel>Existing<br/>Market</RowLabel>
        <AnsoffCell data={ANSOFF[0]} colour="#2563EB"/>
        <AnsoffCell data={ANSOFF[1]} colour="#0A0A0A"/>

        {/* Row 2: New market */}
        <RowLabel>New<br/>Market</RowLabel>
        <AnsoffCell data={ANSOFF[2]} colour="#0A0A0A"/>
        <AnsoffCell data={ANSOFF[3]} colour="#DC2626"/>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Loop title="Loop 1 · Candidate" steps={['Free Career Path → curiosity', 'Skill Studio → activation', 'Challenge → engagement', 'Credential share → referral']}/>
        <Loop title="Loop 2 · Recruiter" steps={['First hire = 80% saving', 'Posts more challenges', 'Expands role families', 'Enterprise contract']}/>
        <Loop title="Loop 3 · AI Smartness" steps={['Each trial outcome feeds AI', 'AI gets sharper', 'Recruiter trust ↑', 'More candidates verify']}/>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Ansoff, H. I. "Strategies for Diversification" — Harvard Business Review, Sept-Oct 1957' },
        { num: '2', ref: 'Ansoff, H. I. "Corporate Strategy" — McGraw Hill, 1965 (the canonical text)' },
        { num: '3', ref: 'Andela, Turing, Mercor — referenced as global Verifier API channel partners (see Slide 2 sources)' },
      ]}/>
    </SlideWrap>
  )
}

function ColumnLabel({ children }: any) {
  return <div className="text-center text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] py-2">{children}</div>
}
function RowLabel({ children }: any) {
  return <div className="flex items-center text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] text-right pr-3">{children}</div>
}

function AnsoffCell({ data, colour }: { data: any; colour: string }) {
  return (
    <HoverCard title={data.title} body={data.detail}>
      <div className="rounded-2xl border p-5 cursor-help hover:shadow-md transition min-h-[180px] flex flex-col" style={{ borderColor: colour }}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider font-mono" style={{ color: colour }}>{data.title}</div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: colour + '15', color: colour }}>Risk: {data.risk}</span>
        </div>
        <div className="font-semibold text-base text-[#0A0A0A] mb-2">{data.forge}</div>
        <div className="text-xs text-[#525252] leading-relaxed flex-1">{data.detail.slice(0, 110)}…</div>
        <div className="text-[10px] font-mono text-[#A1A1AA] mt-3">Timing · {data.timing}</div>
      </div>
    </HoverCard>
  )
}

function Loop({ title, steps }: any) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] p-4">
      <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB] mb-3">{title}</div>
      <div className="space-y-1.5">
        {steps.map((s: string, i: number) => (
          <div key={i} className="flex gap-2 text-xs items-start">
            <span className="text-[#A1A1AA] font-mono">{i + 1}</span>
            <span className="text-[#0A0A0A]">{s}</span>
          </div>
        ))}
        <div className="text-[10px] text-[#A1A1AA] font-mono mt-3">↻ self-reinforcing</div>
      </div>
    </div>
  )
}
