'use client'
import { useState } from 'react'
import { MessageSquare, Sparkles, Send } from 'lucide-react'

const SUGGESTED = [
  'Which industries are hiring fastest right now?',
  'What skills appear in the most credentials?',
  'How are stipends distributed across challenges?',
  'Which role families have the most open challenges?',
]

type Result = { answer: string; chart?: { title: string; bars: { label: string; value: number }[] } }

export default function MarketPulse() {
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  async function ask(question?: string) {
    const text = (question || q).trim()
    if (!text) return
    setQ(text)
    setBusy(true)
    try {
      const r = await fetch('/api/market-pulse', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: text }),
      })
      const d = await r.json()
      setResult(d)
    } finally {
      setBusy(false)
    }
  }

  const max = result?.chart ? Math.max(...result.chart.bars.map((b) => b.value), 1) : 1

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono flex items-center gap-2">
        <MessageSquare size={14}/> Market Pulse
      </div>
      <h1 className="font-semibold text-3xl mt-1">Ask the hiring graph.</h1>
      <p className="text-[#6B7280] text-sm mt-1 max-w-xl">
        Free-form natural language. The AI reads a live snapshot of the platform and answers with a chart.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); ask() }} className="mt-6 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything…"
               className="flex-1 px-4 py-3 border border-[#E5E7EB] rounded-xl outline-none"/>
        <button disabled={busy} className="bg-[#111] text-white px-4 rounded-xl text-sm inline-flex items-center gap-2">
          <Sparkles size={14}/> {busy ? 'Thinking…' : 'Ask'}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTED.map((s) => (
          <button key={s} onClick={() => ask(s)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-[#E5E7EB] hover:bg-[#FAFAFA]">
            {s}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-8 rounded-2xl border border-[#E5E7EB] p-6 bg-white">
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Answer</div>
          <p className="mt-2 leading-relaxed">{result.answer}</p>

          {result.chart && result.chart.bars && result.chart.bars.length > 0 && (
            <>
              <div className="mt-6 text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">{result.chart.title}</div>
              <div className="mt-2 space-y-2">
                {result.chart.bars.map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-sm">
                    <div className="w-40 text-[#3F3F46] truncate">{b.label}</div>
                    <div className="flex-1 h-5 bg-[#FAFAFA] rounded-full overflow-hidden">
                      <div className="h-full bg-[#E94B3C]" style={{ width: `${(b.value / max) * 100}%` }}/>
                    </div>
                    <div className="w-12 text-right font-mono text-xs">{b.value}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
