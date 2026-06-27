'use client'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import questions from '@/data/questionBank.json'

type Q = { id: string; difficulty: number; question: string; options: string[]; answer: string; explanation: string }
type Answer = { id: string; difficulty: number; correct: boolean }

const POOL: Q[] = (questions as any)._default

function pickNext(history: Answer[]): Q {
  if (history.length === 0) return POOL.find((q) => q.difficulty === 3) || POOL[0]
  const last = history[history.length - 1]
  const target = Math.max(1, Math.min(5, last.difficulty + (last.correct ? 1 : -1)))
  const used = new Set(history.map((h) => h.id))
  return POOL.find((q) => q.difficulty === target && !used.has(q.id))
      || POOL.find((q) => !used.has(q.id))
      || POOL[0]
}

export default function SkillTest({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const [history, setHistory] = useState<Answer[]>([])
  const [current, setCurrent] = useState<Q>(POOL.find((q) => q.difficulty === 3) || POOL[0])
  const [selected, setSelected] = useState<string | null>(null)
  const total = Math.min(8, POOL.length)

  function submit() {
    if (!selected) return
    const correct = selected === current.answer
    const next = [...history, { id: current.id, difficulty: current.difficulty, correct }]
    if (next.length >= total) {
      const weighted = next.reduce((acc, a) => acc + (a.correct ? a.difficulty * 20 : 0), 0)
      const max = next.reduce((acc, a) => acc + a.difficulty * 20, 0)
      const score = Math.round((weighted / Math.max(1, max)) * 100)
      const passed = score >= 70
      router.push(`/skills/${slug}/result?score=${score}&passed=${passed ? 1 : 0}`)
      return
    }
    setHistory(next)
    setCurrent(pickNext(next))
    setSelected(null)
  }

  const progress = (history.length / total) * 100

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="mb-2 flex justify-between text-xs text-[#6B7280] font-mono">
        <span>{slug}</span>
        <span>Question {history.length + 1} / {total}</span>
      </div>
      <div className="h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden mb-8">
        <div className="h-full bg-[#E94B3C] transition-all" style={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}>
          <div className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
            Difficulty {current.difficulty}/5
          </div>
          <h2 className="font-display italic text-2xl sm:text-3xl mb-6">{current.question}</h2>
          <div className="space-y-2">
            {current.options.map((opt) => (
              <button key={opt} onClick={() => setSelected(opt)}
                      className={`w-full text-left px-4 py-4 rounded-xl border transition ${
                        selected === opt
                          ? 'border-[#111111] bg-[#FAFAFA]'
                          : 'border-[#E5E7EB] hover:border-[#D4D4D8]'
                      }`}>
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={submit} disabled={!selected}
              className="mt-8 w-full bg-[#111111] text-white py-4 rounded-xl font-medium disabled:opacity-40">
        {history.length + 1 === total ? 'Finish & grade' : 'Next question'}
      </button>
    </div>
  )
}
