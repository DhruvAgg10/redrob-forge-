import { SlideWrap, SlideHeader, HoverCard } from '../PresentationDeck'
import { LayoutGrid, Compass, Hammer, Award, Briefcase, MessageSquare } from 'lucide-react'

const SCREENS = [
  {
    icon: LayoutGrid,
    label: 'AI App Store',
    url: '/app-store',
    desc: '4 existing apps active + 8 NEW · Forge tiles replacing the "Soon" placeholders.',
    detail: 'The strongest visual pitch: judges immediately see Redrob today vs Redrob after Forge ships. The Soon → NEW transition is the entire deck in one image.',
  },
  {
    icon: Compass,
    label: 'Career Path Result',
    url: '/path/result',
    desc: 'React Flow chart with 3 distinct strategy-labelled routes (Direct climb / Lateral pivot / MBA reset).',
    detail: 'Built with React Flow. Paths come from Llama 3.3 70B with strict JSON schema. Each node shows role, LPA, years, skill gap. The free no-login activation hook.',
  },
  {
    icon: Hammer,
    label: 'Skill Studio',
    url: '/skills/market-sizing',
    desc: 'Open-ended Market Sizing prompt. LLM grades each rubric criterion 0-100 with specific feedback.',
    detail: 'Replaces gameable MCQ tests. User writes a 100-200 word response. Llama grades against 4 criteria. Score ≥70 mints a portable W3C Verifiable Credential.',
  },
  {
    icon: Award,
    label: 'Credential Verifier',
    url: '/verify/[id]',
    desc: 'Passport-stamp certificate with gold/aurora gradient bands. Ed25519 signature, W3C JSON-LD payload viewer.',
    detail: 'Public URL (no login). Any employer worldwide can verify in one second. W3C VC 2.0 + Open Badges 3.0 standard. Same crypto-verification pattern as digital passports.',
  },
  {
    icon: Briefcase,
    label: 'Recruiter Dashboard',
    url: '/recruiter',
    desc: 'Posted challenges + ranked submissions. AI / Defence / Peer composite score per applicant.',
    detail: 'Recruiters see top 5 ranked by AI + Defence Interview + Peer scores. Composite formula: 0.4×AI + 0.3×Defence + 0.3×Peer. Pick top 2 for paid trial.',
  },
  {
    icon: MessageSquare,
    label: 'Peer Mentor AI',
    url: '/mentor/[id]',
    desc: 'Llama roleplays a top leaderboard candidate. First-person voice seeded from their actual stats and skills.',
    detail: 'Click "Learn from" on any leaderboard row. System prompt is built from that user\'s top-5 skills + trust score + submission averages. Persona-conditioned LLM.',
  },
]

export function Slide06() {
  return (
    <SlideWrap>
      <SlideHeader
        number="05"
        framework="Live Mockups (not slideware)"
        title={<>Six live screens. <span className="text-[#2563EB]">Hover for technical detail.</span></>}
        subtitle={`Every screen below is from the working app at localhost:3000. Real Llama 3.3 70B integrations · real W3C Ed25519-signed credentials · real PDF resume parsing · 100-respondent synthetic conjoint study.`}
      />

      <div className="grid grid-cols-3 gap-4">
        {SCREENS.map((s, i) => (
          <HoverCard key={i} title={s.label + ' · ' + s.url} body={s.detail}>
            <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden cursor-help group hover:border-[#2563EB] transition">
              <div className="aspect-video bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white">
                  <s.icon size={28}/>
                </div>
                <div className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-wider text-[#A1A1AA] px-2 py-0.5 rounded-full bg-white/80">{i + 1}/6</div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm group-hover:text-[#2563EB]">{s.label}</div>
                <div className="text-[10px] font-mono text-[#A1A1AA] mt-0.5">{s.url}</div>
                <div className="text-xs text-[#525252] mt-2 line-clamp-2 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          </HoverCard>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-[#0A0A0A] text-white p-5 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Live demo</div>
          <div className="font-semibold text-lg mt-1">localhost:3000</div>
        </div>
        <div className="text-xs text-white/70 text-right max-w-md">
          Built end-to-end on Next.js 16 · Prisma + SQLite (35 skills, 100 challenges, 100 personas) · Llama 3.3 70B via Hugging Face · React Flow · Ed25519 · unpdf · Framer Motion
        </div>
      </div>
    </SlideWrap>
  )
}
