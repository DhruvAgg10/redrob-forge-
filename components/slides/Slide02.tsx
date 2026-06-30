import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

export function Slide02() {
  return (
    <SlideWrap>
      <SlideHeader
        number="01"
        framework="The Intent-to-Action Gap"
        title={<><span className="text-[#DC2626]">53% want skills-first.</span> Only <span className="text-[#0A0A0A]">1 in 700</span> hires changes.</>}
        subtitle=""
      />

      {/* Hero — Redrob's specific problem */}
      <div className="rounded-2xl bg-[#0A0A0A] text-white p-6 mb-6">
        <p className="text-sm leading-relaxed">
          Redrob has <span className="font-semibold text-[#2563EB]">700M+ profiles</span> and both sides of the marketplace — but <span className="font-semibold text-[#DC2626]">no skill-verification primitive</span>.
          Recruiters can&apos;t trust the signal → fall back on agencies → Redrob loses the hire and the revenue.
        </p>
        <p className="text-sm leading-relaxed mt-3 font-semibold text-[#2563EB]">
          Forge is the missing verification layer that turns Redrob from a listing platform into a credentialing marketplace.
        </p>
      </div>

      {/* The Gap Visual */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-8 mb-6">
        <div className="grid grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#2563EB] mb-3">Intent</div>
            <div className="font-semibold text-5xl text-[#0A0A0A]">53%</div>
            <div className="text-xs text-[#525252] mt-2">of employers dropped degree requirements (Burning Glass, 2024)</div>
          </div>

          <div className="relative">
            <div className="h-1 bg-gradient-to-r from-[#2563EB] via-[#DC2626] to-[#DC2626] rounded-full"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-3 py-1 rounded-full border border-[#DC2626] text-[10px] font-mono uppercase tracking-wider text-[#DC2626] font-semibold">
                Missing infrastructure
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#DC2626] mb-3">Action</div>
            <div className="font-semibold text-5xl text-[#0A0A0A]">0.14%</div>
            <div className="text-xs text-[#525252] mt-2">of hires actually changed (Harvard Business School, 2023)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard value="₹4-6L" label="Cost per Tier-1 hire" hint="NASSCOM, 2024"/>
        <StatCard value="31 days" label="Median time-to-hire" hint="SHRM, 2024"/>
        <StatCard value="0" label="W3C skill issuers in India" hint="No compliant credential issuer exists"/>
        <StatCard value="0%" label="Forge markup" hint="vs 15-50% competitors"/>
      </div>

      <div className="rounded-xl border border-[#E5E7EB] p-5 mb-4">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-3">Competitor Markup — why agencies capture Redrob&apos;s revenue (hover for context)</div>
        <div className="space-y-3">
          <CompetitorBar name="Andela" markup={40} raised="$381M Series E" detail="15–40% markup on Indian talent placement. SoftBank-backed."/>
          <CompetitorBar name="Turing" markup={40} raised="$3.5B valuation" detail="30–50% markup. AI-matched remote engineers."/>
          <CompetitorBar name="Mercor" markup={35} raised="$2B valuation" detail="AI-matched but no credential layer. $2B val in 2 years."/>
          <CompetitorBar name="Redrob Forge" markup={1} raised="Built-in" detail="0% placement markup. Verification is a platform feature, not a service fee." highlight/>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Burning Glass Institute, "Skills-Based Hiring 2024" — burningglassinstitute.org/research/skills-based-hiring-2024' },
        { num: '2', ref: 'Fuller & Raman, "The Emerging Degree Reset," Harvard Business School, Feb 2023 — hbs.edu/managing-the-future-of-work' },
        { num: '3', ref: 'NASSCOM, "Technology Sector in India 2024" — nasscom.in/knowledge-center/publications' },
        { num: '4', ref: 'SHRM, "Average Time to Fill a Job" — shrm.org/topics-tools/news/talent-acquisition' },
        { num: '5', ref: 'W3C, "Verifiable Credentials Data Model v2.0" — w3.org/TR/vc-data-model-2.0' },
        { num: '6', ref: 'TechCrunch — Andela $381M (Sep 2021), Mercor $2B (Jan 2025); Forbes — Turing' },
      ]}/>
    </SlideWrap>
  )
}

function StatCard({ value, label, hint }: any) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] p-4">
      <div className="font-semibold text-2xl text-[#0A0A0A]">{value}</div>
      <div className="text-xs text-[#0A0A0A] font-medium mt-1">{label}</div>
      <div className="text-[10px] text-[#A1A1AA] mt-1">{hint}</div>
    </div>
  )
}

function CompetitorBar({ name, markup, raised, detail, highlight }: any) {
  return (
    <HoverCard title={name} body={`${detail} Raised/valued at ${raised}.`}>
      <div className="flex items-center gap-2">
        <div className={`w-32 text-xs ${highlight ? 'text-[#2563EB] font-semibold' : 'text-[#0A0A0A]'}`}>{name}</div>
        <div className="flex-1 h-5 bg-[#F4F4F5] rounded-full overflow-hidden">
          <div className={highlight ? 'h-full bg-[#2563EB]' : 'h-full bg-[#DC2626]'} style={{ width: `${(markup / 50) * 100}%` }}/>
        </div>
        <div className={`w-14 text-right text-xs font-mono ${highlight ? 'text-[#2563EB] font-semibold' : 'text-[#525252]'}`}>{highlight ? '0%' : `${markup}%`}</div>
      </div>
    </HoverCard>
  )
}
