import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'
import { Hammer, FileText, BarChart3, Code2, Compass, Video, MessageSquare, Wallet } from 'lucide-react'

type Tile = {
  icon: any
  name: string
  what: string
  diff: string
  journey: string
  tier: string
  tierColor: string
  highlight?: boolean
}

const TILES: Tile[] = [
  { icon: Compass, name: 'Career Path', what: 'Paste resume → 3 role routes with salary & skill gaps', diff: 'Free hook — converts to paid ecosystem', journey: 'Acquisition', tier: 'Free', tierColor: '#22C55E' },
  { icon: Hammer, name: 'Skill Studio', what: 'MBA tasks, AI-graded, mints W3C credential on pass', diff: 'Only W3C skill credential issuer in India', journey: 'Activation', tier: 'Pro', tierColor: '#2563EB', highlight: true },
  { icon: Code2, name: 'Challenges', what: 'Real company sprints → paid trial → full-time offer', diff: 'Replaces ₹5L agency model with ₹49K platform hire', journey: 'Revenue', tier: 'Paid', tierColor: '#DC2626', highlight: true },
  { icon: FileText, name: 'ATS Scanner', what: 'Score resume vs JD keywords, get AI rewrite suggestions', diff: 'High-volume gateway to Pro upsell', journey: 'Acquisition', tier: 'Freemium', tierColor: '#F59E0B' },
  { icon: Wallet, name: 'Credential Wallet', what: 'W3C VCs stored permanently, one-click shareable link', diff: 'Portable proof — not locked inside Redrob', journey: 'Retention', tier: 'Pro', tierColor: '#2563EB', highlight: true },
  { icon: Video, name: 'Defence Interview', what: 'AI viva post-submission — probes reasoning, scores defence', diff: 'Anti-cheating + recruiter trust builder', journey: 'Trust', tier: 'Pro', tierColor: '#2563EB' },
  { icon: BarChart3, name: 'Leaderboard', what: 'Rank by skill + AI Peer Mentor trained on #1\'s approach', diff: 'Learn from the best — Redrob\'s core USP', journey: 'Engagement', tier: 'Free', tierColor: '#22C55E' },
  { icon: MessageSquare, name: 'Market Pulse', what: 'NL queries on hiring trends, salaries, demand shifts', diff: 'Daily-habit context layer for career decisions', journey: 'Engagement', tier: 'Free', tierColor: '#22C55E' },
]

export function Slide04() {
  return (
    <SlideWrap>
      <SlideHeader
        number="03"
        framework="Proposed Solution"
        title={<>8 tiles. One ecosystem. <span className="text-[#2563EB]">Forge ships Redrob&apos;s roadmap.</span></>}
        subtitle=""
      />

      {/* 3 answers — crisp */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl border-2 border-[#2563EB] p-3">
          <div className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#2563EB] mb-1">What is it?</div>
          <div className="text-[11px] text-[#0A0A0A] leading-snug">Skill-verification ecosystem inside Redrob. Prove skills → earn credentials → match to companies → hire via paid trial.</div>
        </div>
        <div className="rounded-xl border-2 border-[#DC2626] p-3">
          <div className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#DC2626] mb-1">Why different?</div>
          <div className="text-[11px] text-[#0A0A0A] leading-snug">W3C credentials (first in India) + AI Defence Interview (anti-cheat) + AI Peer Mentor trained on top performers (Redrob USP).</div>
        </div>
        <div className="rounded-xl border-2 border-[#0A0A0A] p-3">
          <div className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#0A0A0A] mb-1">Which journey?</div>
          <div className="text-[11px] text-[#0A0A0A] leading-snug">Candidate: discover → prove → hire in 4 months. Recruiter: post → filtered pipeline → trial → hire at ₹1L vs ₹5L.</div>
        </div>
      </div>

      {/* 8 tile cards — compact */}
      <div className="grid grid-cols-4 gap-3">
        {TILES.map((t) => (
          <TileCard key={t.name} t={t}/>
        ))}
      </div>

      <SlideSources items={[
        { num: '1', ref: 'W3C, "Verifiable Credentials Data Model v2.0" — w3.org/TR/vc-data-model-2.0' },
        { num: '2', ref: 'Zheng et al., "Judging LLM-as-a-Judge," NeurIPS 2023' },
      ]}/>
    </SlideWrap>
  )
}

function TileCard({ t }: { t: Tile }) {
  return (
    <div className={`rounded-xl border p-3 flex flex-col gap-1.5 ${t.highlight ? 'border-[#2563EB] bg-[#2563EB]/[0.03]' : 'border-[#E5E7EB]'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${t.highlight ? 'bg-[#2563EB] text-white' : 'bg-[#F4F4F5] text-[#0A0A0A]'}`}>
          <t.icon size={14}/>
        </div>
        <div className="font-semibold text-xs">{t.name}</div>
        <span className="ml-auto text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full" style={{ color: t.tierColor, background: t.tierColor + '15' }}>{t.tier}</span>
      </div>
      <div className="text-[10px] text-[#525252] leading-snug">{t.what}</div>
      <div className="text-[10px] text-[#DC2626] leading-snug font-medium">{t.diff}</div>
      <div className="text-[9px] font-mono text-[#2563EB] mt-auto pt-1 border-t border-[#E5E7EB]">{t.journey}</div>
    </div>
  )
}
