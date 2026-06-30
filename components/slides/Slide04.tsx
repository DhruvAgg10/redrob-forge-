import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'
import { Hammer, FileText, BarChart3, Code2, Compass, Video, MessageSquare, Wallet } from 'lucide-react'

type Tile = {
  icon: any
  name: string
  tagline: string
  what: string
  differentiator: string
  journey: string
  tier: 'Free' | 'Freemium' | 'Pro' | 'Paid'
  tierColor: string
  highlight?: boolean
}

const TILES: Tile[] = [
  {
    icon: Compass, name: 'Career Path', tagline: 'Discovery & direction',
    what: 'Paste resume → see 3 role-transition routes with salary bands, skill gaps, and timelines. No login required.',
    differentiator: 'Table-stakes hook. Not a differentiator — it\'s the free top-of-funnel that converts users into the paid ecosystem.',
    journey: 'Acquisition → first value in 30 seconds → drives signup for Skill Studio.',
    tier: 'Free', tierColor: '#22C55E',
  },
  {
    icon: Hammer, name: 'Skill Studio', tagline: 'Prove, don\'t claim',
    what: 'MBA-style open-ended tasks (PRD writing, market sizing, positioning). AI-graded by LLM-as-judge. Mints a W3C Verifiable Credential on pass.',
    differentiator: 'No platform in India issues W3C-compliant skill credentials. Replaces gameable MCQs with real work assessment.',
    journey: 'Activation → credential minted within 20 min of signup → stored in Wallet → visible to recruiters.',
    tier: 'Pro', tierColor: '#2563EB', highlight: true,
  },
  {
    icon: Code2, name: 'Challenges', tagline: 'Real work, real companies',
    what: 'Companies post real business problems as closed sprints. Credentialed candidates compete. Top performers get a 2-week paid trial before full-time offer.',
    differentiator: 'Replaces the agency model entirely. Candidates prove on real work, not interviews. Companies pay ₹49,999 per hire vs ₹4-6L agency fee.',
    journey: 'Revenue → recruiter-side monetization. Each posted challenge = new recruiter in the funnel.',
    tier: 'Paid', tierColor: '#DC2626', highlight: true,
  },
  {
    icon: FileText, name: 'ATS Resume Scanner', tagline: 'Beat the keyword filter',
    what: 'Paste JD + resume → AI scores keyword match, suggests rewrites, and flags missing skills. Build your resume to pass ATS filters.',
    differentiator: 'Utility play — not unique, but high-volume. Gateway drug to Pro tier.',
    journey: 'Acquisition → brings users who aren\'t ready for Skill Studio yet. Free scans → Pro upsell.',
    tier: 'Freemium', tierColor: '#F59E0B',
  },
  {
    icon: Wallet, name: 'Credential Wallet', tagline: 'Portable proof',
    what: 'All earned credentials stored as W3C Verifiable Credentials. One-click shareable verification link. Works like a digital diploma locker.',
    differentiator: 'This layer doesn\'t exist anywhere in India. Portable across platforms — not locked inside Redrob.',
    journey: 'Retention → every credential earned lives here permanently. Shareable link drives LinkedIn virality.',
    tier: 'Pro', tierColor: '#2563EB', highlight: true,
  },
  {
    icon: Video, name: 'Defence Interview', tagline: 'AI stress-tests your submission',
    what: 'After completing a Skill Studio task or Challenge submission, an AI conducts a live viva — probing your reasoning, testing edge cases, scoring your ability to defend decisions under pressure. Full transcript + score saved.',
    differentiator: 'No competitor does post-submission defence. Proves the candidate actually did the work (anti-cheating) + builds recruiter trust in the credential.',
    journey: 'Trust → quality moat. Recruiters trust Forge credentials because they\'re defended, not just submitted.',
    tier: 'Pro', tierColor: '#2563EB',
  },
  {
    icon: BarChart3, name: 'Skills Leaderboard', tagline: 'Rank + learn from the best',
    what: 'Ranked board by verified skill scores. But the real USP: AI Peer Mentor trained on top-ranked candidates\' approaches. Learn how the #1 person solved the same task.',
    differentiator: 'AI Peer Mentor is a Redrob USP — no one else lets you learn from an AI trained on the top performer\'s actual work.',
    journey: 'Engagement → status loop for competitive users + learning loop for aspirational users.',
    tier: 'Free', tierColor: '#22C55E',
  },
  {
    icon: MessageSquare, name: 'Market Pulse', tagline: 'What\'s happening in hiring',
    what: 'Natural language queries on Redrob\'s hiring graph. "What\'s the avg salary for PM in Bangalore?" → instant answer with trends.',
    differentiator: 'Context layer — helps users make informed career decisions. Keeps them coming back.',
    journey: 'Engagement → free utility that builds daily habit. No direct revenue but high retention value.',
    tier: 'Free', tierColor: '#22C55E',
  },
]

export function Slide04() {
  return (
    <SlideWrap>
      <SlideHeader
        number="03"
        framework="Proposed Solution"
        title={<>8 tiles. One ecosystem. <span className="text-[#2563EB]">Forge ships Redrob&apos;s roadmap.</span></>}
        subtitle="What is the solution? Why is it differentiated? Which user journey does it improve?"
      />

      {/* Answer the 3 questions upfront */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <AnswerBox
          question="What is the proposed solution?"
          answer="An 8-tile skill-verification ecosystem built inside Redrob. Candidates prove skills through real tasks → earn W3C credentials → get matched to company challenges → hired via paid trial. No agency needed."
          color="#2563EB"
        />
        <AnswerBox
          question="Why is it differentiated?"
          answer="Three things no competitor has: (1) W3C credential issuance in India, (2) AI Defence Interview that proves authorship, (3) AI Peer Mentor trained on top performers' actual work — Redrob's core USP."
          color="#DC2626"
        />
        <AnswerBox
          question="Which journey does it improve?"
          answer="Candidate: discovery → proof → hire (4 months vs 18). Recruiter: post → pre-filtered pipeline → paid trial → hire at ₹1L vs ₹5L. Both sides stay on Redrob instead of leaking to agencies."
          color="#0A0A0A"
        />
      </div>

      {/* 8 tiles as cards */}
      <div className="grid grid-cols-4 gap-3">
        {TILES.map((t) => (
          <TileCard key={t.name} t={t}/>
        ))}
      </div>

      <SlideSources items={[
        { num: '1', ref: 'W3C, "Verifiable Credentials Data Model v2.0" — w3.org/TR/vc-data-model-2.0' },
        { num: '2', ref: 'Zheng et al., "Judging LLM-as-a-Judge," NeurIPS 2023 — arxiv.org/abs/2306.05685' },
        { num: '3', ref: 'Park et al., "Generative Agents," Stanford/Google, UIST 2023 — arxiv.org/abs/2304.03442' },
      ]}/>
    </SlideWrap>
  )
}

function AnswerBox({ question, answer, color }: { question: string; answer: string; color: string }) {
  return (
    <div className="rounded-xl border-2 p-4" style={{ borderColor: color }}>
      <div className="text-[9px] uppercase tracking-wider font-mono font-bold mb-2" style={{ color }}>{question}</div>
      <div className="text-[11px] text-[#0A0A0A] leading-relaxed">{answer}</div>
    </div>
  )
}

function TileCard({ t }: { t: Tile }) {
  return (
    <div className={`rounded-xl border p-4 flex flex-col ${t.highlight ? 'border-[#2563EB] bg-[#2563EB]/[0.03]' : 'border-[#E5E7EB]'}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t.highlight ? 'bg-[#2563EB] text-white' : 'bg-[#F4F4F5] text-[#0A0A0A]'}`}>
          <t.icon size={16}/>
        </div>
        <div>
          <div className="font-semibold text-xs">{t.name}</div>
          <div className="text-[9px] text-[#A1A1AA]">{t.tagline}</div>
        </div>
        <span className="ml-auto text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full" style={{ color: t.tierColor, background: t.tierColor + '15' }}>{t.tier}</span>
      </div>

      {/* What */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">What it does</div>
      <div className="text-[10px] text-[#525252] leading-snug mb-2">{t.what}</div>

      {/* Differentiator */}
      <div className="text-[9px] uppercase tracking-wider font-mono text-[#DC2626] mb-1">Why it&apos;s different</div>
      <div className="text-[10px] text-[#525252] leading-snug mb-2">{t.differentiator}</div>

      {/* Journey */}
      <div className="mt-auto pt-2 border-t border-[#E5E7EB]">
        <div className="text-[9px] uppercase tracking-wider font-mono text-[#2563EB] mb-1">Journey impact</div>
        <div className="text-[10px] text-[#0A0A0A] leading-snug font-medium">{t.journey}</div>
      </div>
    </div>
  )
}
