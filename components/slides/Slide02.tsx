import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

export function Slide02() {
  return (
    <SlideWrap>
      <SlideHeader
        number="01"
        framework="The Intent-to-Action Gap"
        title={<><span className="text-[#DC2626]">53% want skills-first.</span> Only <span className="text-[#0A0A0A]">1 in 700</span> hires changes.</>}
        subtitle="Indian employers say one thing and do another — because the verification infrastructure to act on intent doesn't exist yet."
      />

      {/* The Gap Visual */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-10 mb-6">
        <div className="grid grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#2563EB] mb-3">Intent</div>
            <div className="font-semibold text-5xl text-[#0A0A0A]">53%</div>
            <div className="text-xs text-[#525252] mt-2">of employers dropped degree requirements in 2025 (Burning Glass)</div>
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
            <div className="text-xs text-[#525252] mt-2">of hires actually changed (Harvard Business School 2024)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard value="₹4-6L" label="Cost per Tier-1 hire" hint="Agency markup"/>
        <StatCard value="31 days" label="Median time-to-hire" hint="In skilled white-collar India"/>
        <StatCard value="12%" label="LinkedIn InMail open" hint="What recruiters get from outbound"/>
        <StatCard value="0" label="Indian credential standards" hint="No W3C-compliant issuer exists today"/>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#E5E7EB] p-5">
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Competitor Markup (hover for context)</div>
          <div className="space-y-3">
            <CompetitorBar name="Andela" markup={45} raised="$381M"/>
            <CompetitorBar name="Turing" markup={30} raised="$3.5B val"/>
            <CompetitorBar name="Mercor" markup={35} raised="$2B val in 2y"/>
            <CompetitorBar name="Forge (Y3 target)" markup={1} raised="Infrastructure" highlight/>
          </div>
        </div>

        <div className="rounded-xl bg-[#0A0A0A] text-white p-5">
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">The Redrob asset nobody is using</div>
          <p className="text-sm leading-relaxed">
            Redrob already has the candidate side (Resume Ranker, Job Search, 700M profile graph) and the recruiter side (Company Search).
          </p>
          <p className="text-sm leading-relaxed mt-3 font-semibold text-[#2563EB]">
            What&apos;s missing is the verification layer that connects them — and that&apos;s exactly what Forge ships.
          </p>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Burning Glass Institute & Harvard, "Skills-Based Hiring Report 2025"' },
        { num: '2', ref: 'Fuller, J. et al., "The Emerging Degree Reset" — HBR, Feb 2024' },
        { num: '3', ref: 'Andela Series E (Sept 2021) — $381M led by SoftBank Vision Fund 2' },
        { num: '4', ref: 'Mercor Series C (Feb 2025) — $100M raise at $2B val' },
        { num: '5', ref: 'Turing.com — $3.5B valuation (Aug 2024)' },
        { num: '6', ref: 'NASSCOM-Zinnov, "Indian IT Hiring Outlook 2025"' },
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

function CompetitorBar({ name, markup, raised, highlight }: any) {
  return (
    <HoverCard title={name} body={`${name} raised ${raised}. They take ${markup}% margin on Indian talent placement. Their entire business model depends on holding this markup.`}>
      <div className="flex items-center gap-2">
        <div className={`w-32 text-xs ${highlight ? 'text-[#2563EB] font-semibold' : 'text-[#0A0A0A]'}`}>{name}</div>
        <div className="flex-1 h-5 bg-[#F4F4F5] rounded-full overflow-hidden">
          <div className={highlight ? 'h-full bg-[#2563EB]' : 'h-full bg-[#DC2626]'} style={{ width: `${(markup / 50) * 100}%` }}/>
        </div>
        <div className={`w-14 text-right text-xs font-mono ${highlight ? 'text-[#2563EB] font-semibold' : 'text-[#525252]'}`}>{markup}%</div>
      </div>
    </HoverCard>
  )
}
