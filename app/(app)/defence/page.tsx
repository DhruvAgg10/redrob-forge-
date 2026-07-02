import Link from 'next/link'
import { Mic, BrainCircuit, ShieldCheck, ArrowRight, MessageSquare, Trophy, Zap } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    icon: Zap,
    title: 'Submit a challenge',
    body: 'Pick any open challenge, build your solution, and submit. The interview is triggered automatically.',
  },
  {
    n: '02',
    icon: BrainCircuit,
    title: 'AI scores your work',
    body: 'Rubric-based AI review scores correctness, performance, and code quality — before the interview starts.',
  },
  {
    n: '03',
    icon: Mic,
    title: '5-turn defence grilling',
    body: 'A senior-engineer AI probes your specific design decisions. No generic questions — it has read your submission.',
  },
  {
    n: '04',
    icon: ShieldCheck,
    title: 'Verified composite score',
    body: 'Work score + defence score = tamper-proof composite, minted as a W3C credential on your wallet.',
  },
]

const SAMPLE_TRANSCRIPT = [
  { role: 'ai', text: 'Walk me through your most important design decision. Why that trade-off?' },
  { role: 'user', text: 'I chose eventual consistency over strong consistency because the write path is hot and a 2-phase commit would have killed throughput.' },
  { role: 'ai', text: 'How would your design handle a 10× traffic spike without that guarantee breaking?' },
  { role: 'user', text: 'Read replicas with async replication, plus a queue buffer to smooth write bursts. The TTL on stale reads is bounded at 500 ms — acceptable for this use-case.' },
  { role: 'ai', text: 'Where do you think this solution will break first in production?' },
]

const PAST_SESSIONS = [
  { challenge: 'Backend API Sprint — Razorpay', score: 87, defence: 91, status: 'COMPLETE', date: 'Jun 28' },
  { challenge: 'ML Pipeline Optimisation — Swiggy', score: 74, defence: 68, status: 'COMPLETE', date: 'Jun 21' },
  { challenge: 'Frontend Performance Audit — Zepto', score: 91, defence: 88, status: 'COMPLETE', date: 'Jun 15' },
]

export default function DefencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10">

      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5DDB]/10 text-[#7C5DDB] text-[10px] font-mono uppercase tracking-wider mb-3">
          <Mic size={10}/> AI Defence Interview
        </div>
        <h1 className="font-display italic text-4xl sm:text-5xl leading-tight">
          Your work should<br/>speak for itself.<br/>
          <span className="text-[#7C5DDB]">So should you.</span>
        </h1>
        <p className="text-[#6B7280] mt-3 text-sm max-w-xl">
          After every challenge submission, an AI senior engineer grills you on your specific decisions —
          not a quiz, a defence. Pass it and your score is verifiable anywhere.
        </p>
        <Link
          href="/challenges"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C5DDB] text-white text-sm font-medium hover:bg-[#6A4FC7] transition"
        >
          Pick a challenge to begin <ArrowRight size={14}/>
        </Link>
      </div>

      {/* How it works */}
      <div className="mb-10">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] mb-4">How it works</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-[#7C5DDB]/20 bg-[#7C5DDB]/5 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-[#7C5DDB]/60">{s.n}</span>
                <div className="w-8 h-8 rounded-lg bg-[#7C5DDB]/10 flex items-center justify-center">
                  <s.icon size={15} className="text-[#7C5DDB]"/>
                </div>
              </div>
              <div className="font-semibold text-sm">{s.title}</div>
              <div className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-10">

        {/* Sample transcript */}
        <div className="lg:col-span-3 rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
          <div className="border-b border-[#E5E7EB] px-5 py-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">Live session preview</div>
              <div className="text-sm font-medium mt-0.5">Backend API Sprint — Razorpay</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"/>
              <span className="text-[10px] text-[#22C55E] font-mono">LIVE</span>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {SAMPLE_TRANSCRIPT.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : ''}`}>
                {m.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#7C5DDB]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BrainCircuit size={12} className="text-[#7C5DDB]"/>
                  </div>
                )}
                <div className={`rounded-xl px-3 py-2 text-xs max-w-[80%] leading-relaxed ${
                  m.role === 'ai'
                    ? 'bg-[#F4F4F5] text-[#3F3F46]'
                    : 'bg-[#7C5DDB] text-white'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#7C5DDB]/10 flex items-center justify-center shrink-0 mt-0.5">
                <BrainCircuit size={12} className="text-[#7C5DDB]"/>
              </div>
              <div className="rounded-xl px-3 py-2 text-xs bg-[#F4F4F5] text-[#A1A1AA] flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#7C5DDB] animate-bounce"/>
                <span className="w-1 h-1 rounded-full bg-[#7C5DDB] animate-bounce [animation-delay:0.15s]"/>
                <span className="w-1 h-1 rounded-full bg-[#7C5DDB] animate-bounce [animation-delay:0.3s]"/>
              </div>
            </div>
          </div>
          <div className="border-t border-[#E5E7EB] px-5 py-3 flex items-center gap-2 bg-[#FAFAFA]">
            <MessageSquare size={12} className="text-[#A1A1AA]"/>
            <span className="text-[10px] text-[#A1A1AA]">Turn 4 of 5 · ~2 min remaining</span>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="lg:col-span-2 space-y-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] mb-3">Composite score</div>
            <div className="text-5xl font-display italic text-[#7C5DDB] leading-none">89</div>
            <div className="text-[10px] text-[#6B7280] mt-1">/ 100 · top 8% in Product</div>
            <div className="mt-4 space-y-2">
              {[
                { label: 'Work quality', val: 87, color: '#22C55E' },
                { label: 'Defence score', val: 91, color: '#7C5DDB' },
                { label: 'Code clarity', val: 84, color: '#C8A461' },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-[10px] text-[#6B7280] mb-1">
                    <span>{r.label}</span><span className="font-mono">{r.val}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F4F4F5] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.val}%`, background: r.color }}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-[#22C55E]">
              <ShieldCheck size={11}/> W3C credential minted · shareable
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] mb-3">Why it matters</div>
            <div className="space-y-2 text-[11px] text-[#6B7280]">
              <div className="flex gap-2"><Trophy size={11} className="text-[#C8A461] mt-0.5 shrink-0"/> Recruiters see work + defence — not just a portfolio link</div>
              <div className="flex gap-2"><ShieldCheck size={11} className="text-[#22C55E] mt-0.5 shrink-0"/> Anti-cheat: explains decisions, not just output</div>
              <div className="flex gap-2"><BrainCircuit size={11} className="text-[#7C5DDB] mt-0.5 shrink-0"/> AI trained on senior-engineering interview rubrics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Past sessions */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] mb-3">Recent sessions</div>
        <div className="space-y-2">
          {PAST_SESSIONS.map((s) => (
            <div key={s.challenge} className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{s.challenge}</div>
                <div className="text-[10px] text-[#A1A1AA] mt-0.5 font-mono">{s.date}</div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <div className="text-xs font-mono text-[#22C55E]">{s.score}</div>
                  <div className="text-[9px] text-[#A1A1AA]">work</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-mono text-[#7C5DDB]">{s.defence}</div>
                  <div className="text-[9px] text-[#A1A1AA]">defence</div>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] font-mono">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link href="/challenges" className="inline-flex items-center gap-2 text-sm text-[#7C5DDB] hover:underline">
            Start a new session via Challenges <ArrowRight size={14}/>
          </Link>
        </div>
      </div>
    </div>
  )
}
