'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Stage = 'form' | 'ai' | 'defence' | 'done'

export default function Submit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [stage, setStage] = useState<Stage>('form')
  const [artifactUrl, setArtifactUrl] = useState('https://github.com/forge-demo/my-submission')
  const [notes, setNotes] = useState('')
  const [aiScore, setAiScore] = useState<number | null>(null)
  const [defenceMessages, setDefenceMessages] = useState<{ role: string; text: string }[]>([])
  const [defenceInput, setDefenceInput] = useState('')
  const [defenceTurns, setDefenceTurns] = useState(0)
  const [defenceScore, setDefenceScore] = useState<number | null>(null)

  async function submit() {
    setStage('ai')
    await new Promise((r) => setTimeout(r, 1500))
    setAiScore(70 + Math.random() * 25)
    setStage('defence')
    setDefenceMessages([{ role: 'ai', text: 'Walk me through your most important design decision. Why that trade-off?' }])
  }

  async function defenceSend() {
    if (!defenceInput.trim()) return
    const userMsg = { role: 'user', text: defenceInput }
    const msgs = [...defenceMessages, userMsg]
    setDefenceMessages(msgs)
    const sent = defenceInput
    setDefenceInput('')
    const nextTurn = defenceTurns + 1
    setDefenceTurns(nextTurn)

    try {
      const resp = await fetch('/api/defence', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          challengeTitle: 'Backend Sprint',
          rubric: { correctness: 30, performance: 20, codeQuality: 20 },
          history: defenceMessages.map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text })),
          candidateAnswer: sent,
          turn: nextTurn,
        }),
      })
      const data = await resp.json()
      if (data.final) {
        setDefenceScore(data.score || 75)
        if (data.summary) setDefenceMessages([...msgs, { role: 'ai', text: data.summary }])
        setStage('done')
      } else {
        setDefenceMessages([...msgs, { role: 'ai', text: data.message || '…' }])
      }
    } catch {
      setDefenceMessages([...msgs, { role: 'ai', text: '(connection issue — try again)' }])
    }
  }

  const composite = aiScore && defenceScore ? aiScore * 0.4 + defenceScore * 0.3 + 75 * 0.3 : null

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <Link href={`/challenges/${id}`} className="text-xs text-[#6B7280] mb-3 inline-block">← Back to challenge</Link>
      <h1 className="font-display italic text-3xl mb-4">Submit your work</h1>

      <div className="flex gap-1 text-[10px] font-mono uppercase mb-6">
        {(['form','ai','defence','done'] as Stage[]).map((s) => (
          <div key={s} className={`flex-1 h-1 rounded-full ${
            ['form','ai','defence','done'].indexOf(stage) >= ['form','ai','defence','done'].indexOf(s)
              ? 'bg-[#E94B3C]' : 'bg-[#F4F4F5]'}`}/>
        ))}
      </div>

      {stage === 'form' && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">Artifact URL</label>
            <input value={artifactUrl} onChange={(e) => setArtifactUrl(e.target.value)}
                   className="w-full mt-1 px-4 py-3 border border-[#E5E7EB] rounded-xl"/>
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
                      placeholder="Anything the reviewer should know about your trade-offs."
                      className="w-full mt-1 px-4 py-3 border border-[#E5E7EB] rounded-xl"/>
          </div>
          <button onClick={submit} className="w-full bg-[#111111] text-white py-3 rounded-xl font-medium">
            Submit for evaluation
          </button>
        </div>
      )}

      {stage === 'ai' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-[#E5E7EB] p-6 text-center">
          <div className="text-xs uppercase tracking-wider font-mono text-[#7C5DDB]">Stage 1 — AI evaluation</div>
          <div className="font-display italic text-2xl mt-2">Scoring your artifact…</div>
          <div className="mt-4 h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.4 }}
                        className="h-full bg-[#7C5DDB]"/>
          </div>
        </motion.div>
      )}

      {stage === 'defence' && (
        <div className="rounded-2xl border border-[#E5E7EB] p-4">
          <div className="text-xs uppercase tracking-wider font-mono text-[#7C5DDB] mb-3">Stage 2 — AI defence interview</div>
          <div className="space-y-2 max-h-[300px] overflow-auto">
            {defenceMessages.map((m, i) => (
              <div key={i} className={`text-sm p-3 rounded-xl ${m.role === 'ai' ? 'bg-[#FAFAFA]' : 'bg-[#FEE8E6] ml-8'}`}>
                <div className="text-[10px] font-mono uppercase text-[#A1A1AA]">{m.role}</div>
                {m.text}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={defenceInput} onChange={(e) => setDefenceInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && defenceSend()}
                   placeholder="Your response…"
                   className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-xl text-sm"/>
            <button onClick={defenceSend} className="bg-[#111] text-white px-4 rounded-xl text-sm">Send</button>
          </div>
          <div className="text-[10px] text-[#A1A1AA] font-mono mt-2">Turn {defenceTurns + 1} / 3</div>
        </div>
      )}

      {stage === 'done' && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="rounded-2xl border border-[#E5E7EB] p-6 text-center">
          <div className="text-xs uppercase tracking-wider font-mono text-[#22C55E]">Submission complete</div>
          <div className="font-display italic text-3xl mt-2">Composite score {composite?.toFixed(1)}</div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="rounded-xl bg-[#FAFAFA] p-3">
              <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">AI eval</div>
              <div className="font-display italic text-xl">{aiScore?.toFixed(1)}</div>
            </div>
            <div className="rounded-xl bg-[#FAFAFA] p-3">
              <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">Defence</div>
              <div className="font-display italic text-xl">{defenceScore?.toFixed(1)}</div>
            </div>
            <div className="rounded-xl bg-[#FAFAFA] p-3">
              <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">Peer (mock)</div>
              <div className="font-display italic text-xl">75.0</div>
            </div>
          </div>
          <div className="mt-6 text-xs text-[#6B7280]">
            Recruiter shortlist updates within 24h. Top 2 candidates progress to paid trial.
          </div>
          <div className="flex gap-2 justify-center mt-6">
            <Link href={`/challenges/${id}`} className="border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm">Back to challenge</Link>
            <Link href="/wallet" className="bg-[#111] text-white px-4 py-2.5 rounded-xl text-sm">Open wallet</Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
