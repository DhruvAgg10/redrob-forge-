'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Compass, ArrowRight, Upload, FileText, Sparkles } from 'lucide-react'

const EXAMPLES = [
  'Senior PM at a FinTech',
  'Engagement Manager at McKinsey',
  'Head of Growth at a D2C startup',
  'Senior Data Scientist',
  'VP Strategy at a Unicorn',
]

const SAMPLE_RESUME = `Consultant at BCG India · 2 years
- Worked on go-to-market for a FinTech (Series B) — defined ICP, built unit economics model
- Operations workstream for a HealthTech IPO
- IIT Bombay, Mechanical Engineering (2022)
Skills: financial modeling, market sizing, stakeholder mgmt, SQL`

export default function PathEntry() {
  const router = useRouter()
  const [resume, setResume] = useState('')
  const [goal, setGoal] = useState('')
  const [parsing, setParsing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handlePdf(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setParsing(true)
    try {
      const fd = new FormData()
      fd.append('file', f)
      const r = await fetch('/api/resume/parse', { method: 'POST', body: fd })
      const d = await r.json()
      if (d.text) setResume(d.text)
      else alert(d.error || 'Parse failed')
    } finally {
      setParsing(false)
    }
  }

  async function submit() {
    if (!resume.trim() || !goal.trim()) return
    setSubmitting(true)
    sessionStorage.setItem('forge.resume', resume)
    sessionStorage.setItem('forge.goal', goal)
    router.push(`/path/result?goal=${encodeURIComponent(goal)}`)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">
          <Compass size={14}/> Career Path Engine
        </div>
        <h1 className="font-display italic text-4xl sm:text-5xl mt-3 leading-tight">
          Where are you now, where to <span className="text-[#E94B3C]">next?</span>
        </h1>
        <p className="text-[#6B7280] mt-3 max-w-xl mx-auto">
          Tell us your background. We&apos;ll generate 3 distinct routes — direct climb, lateral pivot, MBA reset — each with LPA and the skills you&apos;d need.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-5 bg-white">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">1 · Your background</label>
          <div className="flex gap-2">
            <button onClick={() => setResume(SAMPLE_RESUME)}
                    className="text-[11px] text-[#6B7280] underline">use sample</button>
            <label className="text-[11px] text-[#E94B3C] inline-flex items-center gap-1 cursor-pointer">
              <Upload size={11}/> {parsing ? 'Parsing…' : 'Upload PDF'}
              <input type="file" accept="application/pdf" className="hidden" onChange={handlePdf}/>
            </label>
          </div>
        </div>
        <textarea value={resume} onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste resume text, or describe your role + years + domain. PDF upload also works."
                  rows={7}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm font-mono"/>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-5 bg-white mt-3">
        <label className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">2 · Target role</label>
        <input value={goal} onChange={(e) => setGoal(e.target.value)}
               placeholder="e.g. Senior PM at a FinTech"
               className="w-full mt-2 px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm"/>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {EXAMPLES.map((e) => (
            <button key={e} onClick={() => setGoal(e)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-[#E5E7EB] hover:bg-[#FAFAFA]">{e}</button>
          ))}
        </div>
      </div>

      <button onClick={submit} disabled={!resume.trim() || !goal.trim() || submitting}
              className="mt-5 w-full bg-[#111] text-white py-4 rounded-xl font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40">
        <Sparkles size={14}/> {submitting ? 'Generating…' : 'Generate paths'} <ArrowRight size={14}/>
      </button>
    </div>
  )
}
