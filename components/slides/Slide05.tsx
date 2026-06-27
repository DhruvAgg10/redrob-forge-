import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

// AARRR pirate funnel for candidates, simplified funnel for recruiters
const CANDIDATE_STAGES = [
  { name: 'Awareness', pct: 100, count: '5M', tool: 'Free Career Path · Redrob App Store NEW tile', detail: 'Anonymous user lands on Career Path Engine. Pastes resume + types goal. Llama generates 3 distinct strategy-labelled routes. No login required.' },
  { name: 'Signup', pct: 18, count: '900K', tool: '"Save your path" gate', detail: '18% conversion target based on Career Path → signup wall on "save / drill into nodes". Industry benchmark for similar SaaS top-of-funnel is 8-15%.' },
  { name: 'Activation', pct: 35, count: '315K', tool: 'Skill Studio · first credential minted', detail: 'Activation event = first credential earned. Open-ended 15-min task (Market Sizing / PRD / Positioning). LLM-graded against rubric. Score ≥70 mints W3C VC.' },
  { name: 'Engagement', pct: 40, count: '126K', tool: 'Challenges · applied to 1+', detail: 'Credentialed candidate sees closed challenges where they meet prerequisites. Submits artifact + does AI defence interview. Top 5 reach recruiter.' },
  { name: 'Conversion', pct: 12, count: '15K', tool: 'Paid trial · ₹25K stipend', detail: 'Top-2 finalists invited to paid 2-week trial sprint. ₹25K in escrow, paid regardless of hire outcome. ~50% trial-to-hire ratio.' },
  { name: 'Hire / Referral', pct: 50, count: '7.5K', tool: 'Hired + W3C credential', detail: 'Hire rate 50% of trials. Both finalists walk away with a trial credential. Hired candidate shares on LinkedIn → top of funnel for next cohort.' },
]

const RECRUITER_STAGES = [
  { name: 'Outreach', pct: 100, count: '8,000', tool: 'Founder Slack groups · YC India · Surge', detail: 'Top of funnel from founder-led startups (Series A/B, 5-15 hires/yr). 600 addressable cohort companies.' },
  { name: 'Signup', pct: 12, count: '960', tool: 'Free challenge posting', detail: 'No upfront cost — outcome-based pricing kills the procurement objection. Founder-led decisions, no agency lock-in.' },
  { name: 'Post 1st challenge', pct: 65, count: '624', tool: '4-step wizard · template-based', detail: '~8 minutes from signup to first posted challenge. Pre-built templates: Backend Sprint, PM Discovery, Frontend Build, ML Forecast.' },
  { name: 'Trial', pct: 70, count: '437', tool: 'Top 2 finalists in 2-week sprint', detail: 'AI ranks top 5 submissions. Recruiter picks 2 for paid trial. ₹4,999 trial workspace fee + escrow pass-through.' },
  { name: 'Hire', pct: 65, count: '284', tool: '₹49,999 success fee', detail: 'Win-rate target 65% (trial → hire). Recruiter pays only on successful hire — ₹49,999 OR 8% of first-year CTC, whichever lower.' },
  { name: 'Repeat', pct: 80, count: '227', tool: 'Posts 2+ more challenges', detail: 'Repeat rate 80%. Average 3 challenges/year per active recruiter. Expansion to enterprise contract at 20+ hires/yr.' },
]

export function Slide05() {
  return (
    <SlideWrap>
      <SlideHeader
        number="04"
        framework="AARRR Funnel · Two-sided"
        title={<>Two funnels. <span className="text-[#2563EB]">One marketplace.</span></>}
        subtitle="Year 3 target volume at each stage. Drop-off % between stages. Hover any stage for the activating Forge tool + benchmark."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <FunnelColumn title="Candidate funnel" colour="#2563EB" stages={CANDIDATE_STAGES}/>
        <FunnelColumn title="Recruiter funnel" colour="#DC2626" stages={RECRUITER_STAGES}/>
      </div>

      <div className="mt-6 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] p-4 grid grid-cols-4 gap-3 text-xs">
        <KeyMetric label="Time-to-first-value (candidate)" value="2 min" hint="Career Path is no-login"/>
        <KeyMetric label="Time-to-first-credential" value="< 20 min" hint="Activation event"/>
        <KeyMetric label="Time-to-first-hire (recruiter)" value="28 days" hint="vs 90+ days agency average"/>
        <KeyMetric label="Cost-per-hire" value="₹1L" hint="vs ₹4-6L agency"/>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'McClure, D. "AARRR Pirate Metrics" — Stanford CS Lecture / 500 Startups, 2007' },
        { num: '2', ref: 'OpenView Partners, "SaaS Activation Benchmarks 2024" — 18% top-of-funnel conversion median' },
        { num: '3', ref: 'NASSCOM Tech Hiring Pulse 2024 — time-to-hire baseline for Indian startups' },
        { num: '4', ref: 'Agency hiring fee benchmark — Michael Page India Salary Guide 2024 (₹4-6L Tier-1)' },
      ]}/>
    </SlideWrap>
  )
}

function FunnelColumn({ title, colour, stages }: { title: string; colour: string; stages: any[] }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.18em] font-mono mb-4" style={{ color: colour }}>{title}</div>
      <div className="space-y-1">
        {stages.map((s, i) => {
          const width = 100 - (i * 13)
          return (
            <div key={s.name} className="relative">
              <HoverCard title={`${s.name} · ${s.tool}`} body={s.detail}>
                <div className="flex items-center gap-3 cursor-help">
                  <div className="w-16 shrink-0 text-right">
                    <div className="text-[10px] font-mono text-[#A1A1AA]">{s.count}</div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="rounded-md py-3 px-4 text-white text-sm font-medium transition-all hover:brightness-110"
                         style={{ background: colour, width: `${width}%`, margin: '0 auto', textAlign: 'center' }}>
                      {s.name}
                    </div>
                  </div>
                  <div className="w-12 shrink-0">
                    <div className="text-[10px] font-mono" style={{ color: colour }}>{s.pct}%</div>
                  </div>
                </div>
              </HoverCard>
              {i < stages.length - 1 && (
                <div className="text-center my-0.5">
                  <span className="text-[9px] font-mono text-[#A1A1AA]">↓ {Math.round((stages[i + 1].pct / stages[i].pct) * 100)}% drop-off</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function KeyMetric({ label, value, hint }: any) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">{label}</div>
      <div className="font-semibold text-xl text-[#0A0A0A] mt-1">{value}</div>
      <div className="text-[10px] text-[#525252]">{hint}</div>
    </div>
  )
}
