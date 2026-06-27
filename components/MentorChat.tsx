'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'

type Msg = { role: 'user' | 'assistant'; content: string }

export function MentorChat({ userId, name }: { userId: string; name: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: `Hey — happy to think this through with you. What are you working on?` },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)

  async function send() {
    if (!input.trim()) return
    const next: Msg[] = [...messages, { role: 'user', content: input }]
    setMessages(next)
    setInput('')
    setBusy(true)
    try {
      const r = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userId, history: messages, message: input }),
      })
      const d = await r.json()
      setMessages([...next, { role: 'assistant', content: d.reply || '(no reply)' }])
    } catch (e: any) {
      setMessages([...next, { role: 'assistant', content: '(error) ' + String(e.message || e) }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 flex flex-col">
      <div className="space-y-3 max-h-[480px] overflow-auto pr-1">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      className={`text-[14px] p-3 rounded-2xl ${
                        m.role === 'assistant'
                          ? 'bg-gradient-to-br from-[#FAFAFA] to-[#FEE8E6]/20 border border-[#F4F4F5]'
                          : 'bg-[#111] text-white ml-12'
                      }`}>
            {m.role === 'assistant' && (
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7C5DDB] inline-flex items-center gap-1 mb-1">
                <Sparkles size={9}/> {name}
              </div>
            )}
            <div className="whitespace-pre-wrap">{m.content}</div>
          </motion.div>
        ))}
        {busy && <div className="text-[11px] text-[#A1A1AA]">{name} is thinking…</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && send()}
               placeholder={`Ask ${name} anything…`}
               className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-xl text-sm outline-none"/>
        <button onClick={send} disabled={busy} className="bg-[#111] text-white px-3 rounded-xl">
          <Send size={14}/>
        </button>
      </div>
    </div>
  )
}
