'use client'
import { useState } from 'react'
import Link from 'next/link'
import templates from '@/data/challengeTemplates.json'

export default function PostChallenge() {
  const [step, setStep] = useState(1)
  const [picked, setPicked] = useState<any>(null)
  const [stipend, setStipend] = useState(25000)
  const [maxApp, setMaxApp] = useState(50)
  const [posted, setPosted] = useState(false)

  if (posted) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-8 py-16 text-center">
        <div className="text-xs uppercase tracking-wider font-mono text-[#22C55E]">Published</div>
        <h1 className="font-display italic text-4xl mt-2">Your challenge is live</h1>
        <p className="text-[#6B7280] mt-2">Candidates will start applying within hours.</p>
        <Link href="/recruiter" className="inline-block mt-6 bg-[#111] text-white px-4 py-2.5 rounded-xl text-sm">Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <h1 className="font-display italic text-3xl mb-2">Post a challenge</h1>
      <div className="flex gap-1 text-[10px] mb-6">
        {[1,2,3,4].map((s) => (
          <div key={s} className={`flex-1 h-1 rounded-full ${step >= s ? 'bg-[#E94B3C]' : 'bg-[#F4F4F5]'}`}/>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">1 — Pick template</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {(templates as any[]).map((t) => (
              <button key={t.id} onClick={() => { setPicked(t); setStep(2) }}
                      className="text-left rounded-2xl border border-[#E5E7EB] p-4 hover:border-[#111]">
                <div className="font-medium">{t.title}</div>
                <div className="text-[10px] text-[#A1A1AA] uppercase mt-1">{t.roleFamily}</div>
                <div className="text-xs text-[#6B7280] mt-2 line-clamp-2">{t.brief}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && picked && (
        <div>
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">2 — Customize brief</div>
          <textarea defaultValue={picked.brief} rows={8}
                    className="w-full p-4 border border-[#E5E7EB] rounded-xl text-sm"/>
          <div className="flex justify-between mt-3">
            <button onClick={() => setStep(1)} className="text-sm text-[#6B7280]">Back</button>
            <button onClick={() => setStep(3)} className="bg-[#111] text-white px-4 py-2 rounded-xl text-sm">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">3 — Stipend & cap</div>
          <label className="text-xs">Stipend per finalist (₹)</label>
          <input type="number" value={stipend} onChange={(e) => setStipend(Number(e.target.value))}
                 className="w-full mt-1 px-4 py-3 border border-[#E5E7EB] rounded-xl"/>
          <label className="text-xs mt-3 block">Max applicants</label>
          <input type="number" value={maxApp} onChange={(e) => setMaxApp(Number(e.target.value))}
                 className="w-full mt-1 px-4 py-3 border border-[#E5E7EB] rounded-xl"/>
          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(2)} className="text-sm text-[#6B7280]">Back</button>
            <button onClick={() => setStep(4)} className="bg-[#111] text-white px-4 py-2 rounded-xl text-sm">Review</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">4 — Review & publish</div>
          <div className="rounded-2xl border border-[#E5E7EB] p-5">
            <div className="font-display italic text-2xl">{picked?.title}</div>
            <div className="text-[#6B7280] text-sm mt-2">{picked?.brief}</div>
            <div className="mt-3 text-xs flex gap-3">
              <span className="font-mono text-[#C8A461]">₹{stipend.toLocaleString('en-IN')} stipend</span>
              <span className="font-mono text-[#6B7280]">{maxApp} max applicants</span>
            </div>
          </div>
          <button onClick={() => setPosted(true)} className="mt-4 w-full bg-[#111] text-white py-3 rounded-xl font-medium">
            Publish challenge
          </button>
        </div>
      )}
    </div>
  )
}
