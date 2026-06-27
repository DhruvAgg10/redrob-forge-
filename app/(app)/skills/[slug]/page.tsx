'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CredentialSeal } from '@/components/CredentialSeal'
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react'
import studio from '@/data/skillStudio.json'

type Stage = 'work' | 'grading' | 'done'

export default function StudioExercise({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const exercise = (studio as any[]).find((s) => s.slug === slug)
  const [stage, setStage] = useState<Stage>('work')
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<any>(null)
  const [credId, setCredId] = useState<string | null>(null)

  if (!exercise) return <div className="p-12">Unknown exercise.</div>

  async function grade() {
    setStage('grading')
    try {
      const r = await fetch('/api/skills/grade', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, answer }),
      })
      const d = await r.json()
      setResult(d)
      if (d.passed) {
        // mint
        const m = await fetch('/api/credentials/mint', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ skillSlug: slug, level: Math.max(1, Math.min(5, Math.floor(d.score / 20))) }),
        })
        const mj = await m.json()
        setCredId(mj.id)
      }
      setStage('done')
    } catch (e: any) {
      setResult({ error: String(e.message || e) })
      setStage('done')
    }
  }

  const words = answer.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
      <Link href="/skills" className="text-xs text-[#6B7280]">← All exercises</Link>

      <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">{exercise.tag}</div>
      <h1 className="font-display italic text-3xl mt-1">{exercise.name}</h1>

      {stage === 'work' && (
        <>
          <div className="mt-5 rounded-2xl border border-[#E5E7EB] p-5 bg-[#FAFAFA]">
            <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">Prompt</div>
            <p className="text-sm leading-relaxed">{exercise.prompt}</p>
          </div>

          <div className="mt-3 rounded-2xl border border-[#E5E7EB] p-5">
            <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2 flex justify-between">
              <span>Your response</span>
              <span className={words >= exercise.minWords ? 'text-[#22C55E]' : 'text-[#A1A1AA]'}>
                {words} / {exercise.minWords} words
              </span>
            </div>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={14}
                      placeholder="Type your answer…"
                      className="w-full text-sm font-mono outline-none resize-none"/>
          </div>

          <div className="mt-3 rounded-2xl border border-dashed border-[#E5E7EB] p-4">
            <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">You&apos;ll be graded on</div>
            <ul className="text-sm space-y-1">
              {exercise.rubric.map((r: string) => <li key={r} className="text-[#6B7280]">· {r}</li>)}
            </ul>
          </div>

          <button onClick={grade} disabled={words < exercise.minWords}
                  className="mt-5 w-full bg-[#111] text-white py-4 rounded-xl font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40">
            <Sparkles size={14}/> Grade my response
          </button>
        </>
      )}

      {stage === 'grading' && (
        <div className="mt-10 text-center">
          <Sparkles className="mx-auto text-[#7C5DDB] animate-pulse" size={32}/>
          <div className="font-display italic text-2xl mt-3">Grading against rubric…</div>
        </div>
      )}

      {stage === 'done' && result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          {result.error ? (
            <div className="rounded-2xl border border-[#EF4444] p-6 text-[#EF4444]">{result.error}</div>
          ) : result.passed ? (
            <div className="rounded-2xl border border-[#E5E7EB] p-6 text-center">
              <CheckCircle2 className="mx-auto text-[#22C55E]" size={32}/>
              <div className="font-display italic text-3xl mt-2">Credential earned · {result.score}</div>
              <div className="mt-6 flex justify-center"><CredentialSeal skill={exercise.name} level={Math.max(1, Math.min(5, Math.floor(result.score / 20)))} size="lg"/></div>
              <div className="text-xs text-[#6B7280] mt-4">{credId
                ? <>Verifier: <Link href={`/verify/${credId}`} className="font-mono text-[#E94B3C]">/verify/{credId.slice(0,10)}…</Link></>
                : 'Minting…'}</div>
              <div className="mt-4 text-left space-y-2">
                {(result.breakdown || []).map((b: any, i: number) => (
                  <div key={i} className="rounded-xl border border-[#E5E7EB] p-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{b.criterion}</span>
                      <span className="font-mono text-[#C8A461]">{b.score}/100</span>
                    </div>
                    <div className="text-xs text-[#6B7280] mt-1">{b.feedback}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E5E7EB] p-6">
              <XCircle className="mx-auto text-[#EF4444]" size={28}/>
              <div className="font-display italic text-2xl text-center mt-2">Not yet — {result.score}</div>
              <div className="text-xs text-[#6B7280] text-center">Need 70+ to mint a credential.</div>
              <div className="mt-4 space-y-2">
                {(result.breakdown || []).map((b: any, i: number) => (
                  <div key={i} className="rounded-xl border border-[#E5E7EB] p-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{b.criterion}</span>
                      <span className="font-mono text-[#6B7280]">{b.score}/100</span>
                    </div>
                    <div className="text-xs text-[#6B7280] mt-1">{b.feedback}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => { setStage('work'); setResult(null) }}
                      className="mt-5 w-full bg-[#111] text-white py-3 rounded-xl text-sm">Try again</button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
