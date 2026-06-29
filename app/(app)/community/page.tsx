'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, MessageCircle, Heart, Pin, Plus, Link as LinkIcon, ChevronDown } from 'lucide-react'
import posts from '@/data/communityPosts.json'

type Msg = { who: 'user' | 'ai'; text: string }

export default function Community() {
  const [composer, setComposer] = useState(false)
  const [tab, setTab] = useState<'all' | 'show' | 'ask'>('all')
  const [room, setRoom] = useState<Msg[]>([
    { who: 'ai', text: 'Welcome to the Forge community room. Ask the room a question, or post your own project below.' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)

  const filtered = (posts as any[]).filter((p) =>
    tab === 'all' ? true :
    tab === 'show' ? (p.tag === 'Show & Tell' || p.tag === 'Showcase') :
    p.tag === 'Ask'
  )

  async function askRoom() {
    if (!input.trim()) return
    const q = input
    setInput('')
    setRoom((r) => [...r, { who: 'user', text: q }])
    setBusy(true)
    try {
      const resp = await fetch('/api/community/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      const d = await resp.json().catch(() => null)
      if (!resp.ok) {
        const errorMessage = d?.answer || d?.error || `Room AI error (${resp.status})`
        setRoom((r) => [...r, { who: 'ai', text: errorMessage }])
        return
      }
      setRoom((r) => [...r, { who: 'ai', text: d?.answer ?? 'Room AI did not return an answer.' }])
    } catch (error: any) {
      setRoom((r) => [...r, { who: 'ai', text: `Room AI error: ${String(error?.message || error)}` }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Forge Community</div>
          <h1 className="font-semibold text-3xl mt-1">What is the room building today?</h1>
        </div>
        <button onClick={() => setComposer(!composer)}
                className="bg-[#111] text-white px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
          <Plus size={14}/> Post
        </button>
      </div>

      {composer && (
        <div className="rounded-2xl border border-[#E5E7EB] p-4 mb-5 bg-white">
          <input placeholder="Title — short, sharp" className="w-full px-3 py-2 border-b border-[#E5E7EB] outline-none text-base font-medium mb-2"/>
          <textarea rows={3} placeholder="Body — what did you build, or what are you stuck on?" className="w-full px-3 py-2 outline-none text-sm"/>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-1">
              {['Show & Tell', 'Ask', 'Showcase'].map((t) => (
                <button key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-[#E5E7EB] hover:bg-[#FAFAFA]">{t}</button>
              ))}
            </div>
            <button className="bg-[#111] text-white px-3 py-1.5 rounded-lg text-sm">Publish (demo)</button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="flex gap-1 mb-3 text-xs">
            {(['all', 'show', 'ask'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                      className={`px-3 py-1.5 rounded-full ${
                        tab === t ? 'bg-[#111] text-white' : 'border border-[#E5E7EB] text-[#6B7280]'
                      }`}>
                {t === 'all' ? 'All' : t === 'show' ? 'Show & Tell' : 'Ask the room'}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((p: any) => (
              <div key={p.id} className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex items-center gap-3 mb-2">
                  {p.avatar ? (
                    <img src={p.avatar} alt="" className="w-9 h-9 rounded-full"/>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E94B3C] to-[#7C5DDB] flex items-center justify-center text-white">
                      <Sparkles size={14}/>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{p.author}</div>
                    <div className="text-[11px] text-[#A1A1AA]">{p.time}</div>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    p.tag === 'Pinned' ? 'bg-[#FEE8E6] text-[#E94B3C]'
                    : p.tag === 'Ask' ? 'bg-[#FFF4E6] text-[#C8A461]'
                    : 'bg-[#FAFAFA] text-[#6B7280]'
                  }`}>
                    {p.tag === 'Pinned' ? <Pin size={9} className="inline mr-0.5"/> : null}{p.tag}
                  </span>
                </div>
                <div className="font-semibold text-[15px]">{p.title}</div>
                <p className="text-sm text-[#3F3F46] mt-1 leading-relaxed">{p.body}</p>
                {p.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.links.map((l: string) => (
                      <span key={l} className="text-[11px] inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAFAFA]">
                        <LinkIcon size={10}/> {l}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex gap-4 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1"><Heart size={12}/> {p.claps}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={12}/> {p.comments}</span>
                  <button className="ml-auto text-[#E94B3C]">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-[#E5E7EB] bg-white p-4 flex flex-col h-fit lg:sticky lg:top-4">
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono flex items-center gap-1 mb-2">
            <Sparkles size={12} className="text-[#7C5DDB]"/> Forge Room AI
          </div>
          <div className="text-xs text-[#6B7280] mb-3">Ask the room anything — career, frameworks, founder ops.</div>
          <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {room.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                          className={`text-[13px] p-2.5 rounded-xl ${m.who === 'ai' ? 'bg-[#FAFAFA] border border-[#F4F4F5]' : 'bg-[#FEE8E6] ml-6'}`}>
                {m.text}
              </motion.div>
            ))}
            {busy && <div className="text-[11px] text-[#A1A1AA]">Room AI is thinking…</div>}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && askRoom()}
                   placeholder="Ask…"
                   className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-xl text-sm outline-none"/>
            <button onClick={askRoom} disabled={busy} className="bg-[#111] text-white px-3 rounded-xl">
              <Send size={14}/>
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
