'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Sparkles, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

type Result = {
  total: number
  breakdown: {
    keyword: { score: number; hits: string[]; misses: string[]; weight: number }
    actionVerbs: { score: number; found: string[]; weight: number }
    quantification: { score: number; count: number; weight: number }
    formatting: { score: number; flags: { ok: boolean; label: string }[]; weight: number }
  }
  suggestions?: string
}

export default function AtsScanner() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')
  const [parsing, setParsing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  async function uploadPdf(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setParsing(true)
    try {
      const fd = new FormData()
      fd.append('file', f)
      const r = await fetch('/api/resume/parse', { method: 'POST', body: fd })
      const d = await r.json()
      if (d.text) setResume(d.text)
      else alert(d.error || 'Could not parse PDF')
    } finally {
      setParsing(false)
    }
  }

  async function scan() {
    if (!resume.trim()) return
    setBusy(true)
    setResult(null)
    try {
      const r = await fetch('/api/ats', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ resume, jd }),
      })
      const d = await r.json()
      setResult(d)
    } finally {
      setBusy(false)
    }
  }

  const grade = result
    ? result.total >= 80 ? { label: 'Strong', color: '#22C55E' }
    : result.total >= 60 ? { label: 'Pass', color: '#C8A461' }
    : result.total >= 40 ? { label: 'Risky', color: '#F59E0B' }
    : { label: 'Reject', color: '#EF4444' }
    : null

  const suggestions: string[] = (() => {
    try { return result?.suggestions ? (JSON.parse(result.suggestions).suggestions || []) : [] }
    catch { return [] }
  })()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6">
      <div className="mb-5">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono flex items-center gap-2">
          <FileText size={14}/> ATS Resume Scanner
        </div>
        <h1 className="font-semibold text-3xl mt-1">Will the bot pass your resume?</h1>
        <p className="text-[#6B7280] text-sm mt-1 max-w-xl">
          Score your resume against an actual job description. Keyword match, action verbs, quantification, ATS-friendly formatting — plus AI suggestions to fix the weak spots.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Your resume</label>
            <label className="text-[11px] text-[#E94B3C] inline-flex items-center gap-1 cursor-pointer">
              <Upload size={11}/> {parsing ? 'Parsing…' : 'Upload PDF'}
              <input type="file" accept="application/pdf" className="hidden" onChange={uploadPdf}/>
            </label>
          </div>
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} rows={14}
                    placeholder="Paste resume text — or upload PDF above."
                    className="w-full text-xs font-mono outline-none resize-none"/>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <label className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Job description (optional)</label>
          <textarea value={jd} onChange={(e) => setJd(e.target.value)} rows={14}
                    placeholder="Paste the JD for keyword targeting. Skipped JD scores formatting + verbs + quantification only."
                    className="w-full mt-2 text-xs font-mono outline-none resize-none"/>
        </div>
      </div>

      <button onClick={scan} disabled={!resume.trim() || busy}
              className="mt-4 w-full bg-[#111] text-white py-3.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40">
        <Sparkles size={14}/> {busy ? 'Scanning…' : 'Scan resume'}
      </button>

      {result && grade && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 flex items-center gap-6">
            <div className="relative w-28 h-28 shrink-0">
              <svg viewBox="0 0 40 40" className="-rotate-90 w-full h-full">
                <circle cx="20" cy="20" r="17" fill="none" stroke="#F4F4F5" strokeWidth="3"/>
                <circle cx="20" cy="20" r="17" fill="none" stroke={grade.color} strokeWidth="3"
                        strokeDasharray={`${(result.total / 100) * 106.8} 106.8`} strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display italic text-3xl">{result.total}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: grade.color }}>{grade.label}</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(result.breakdown).map(([k, v]: any) => (
                <div key={k}>
                  <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">{
                    k === 'keyword' ? 'Keyword match'
                    : k === 'actionVerbs' ? 'Action verbs'
                    : k === 'quantification' ? 'Quantified'
                    : 'Formatting'
                  }</div>
                  <div className="text-xl font-semibold mt-1">{v.score}</div>
                  <div className="h-1 bg-[#F4F4F5] rounded-full mt-1 overflow-hidden">
                    <div className="h-full" style={{ width: `${v.score}%`, background: grade.color }}/>
                  </div>
                  <div className="text-[10px] font-mono text-[#A1A1AA] mt-0.5">weight {v.weight}%</div>
                </div>
              ))}
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="rounded-2xl border border-[#7C5DDB]/40 bg-[#7C5DDB]/5 p-5">
              <div className="text-xs uppercase tracking-wider font-mono text-[#7C5DDB] flex items-center gap-1">
                <Sparkles size={12}/> AI suggestions
              </div>
              <ul className="mt-2 space-y-2 text-sm">
                {suggestions.map((s, i) => <li key={i} className="flex gap-2"><span className="text-[#7C5DDB]">{i+1}.</span> {s}</li>)}
              </ul>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-3">
            {result.breakdown.keyword.weight > 0 && (
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Keywords from JD</div>
                <div className="flex flex-wrap gap-1">
                  {result.breakdown.keyword.hits.map((k) => (
                    <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] inline-flex items-center gap-1">
                      <CheckCircle2 size={9}/> {k}
                    </span>
                  ))}
                  {result.breakdown.keyword.misses.slice(0, 18).map((k) => (
                    <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-[#EF4444]/10 text-[#EF4444] inline-flex items-center gap-1">
                      <XCircle size={9}/> {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Formatting checks</div>
              <ul className="space-y-1.5 text-sm">
                {result.breakdown.formatting.flags.map((f) => (
                  <li key={f.label} className="flex items-center gap-2">
                    {f.ok
                      ? <CheckCircle2 size={14} className="text-[#22C55E]"/>
                      : <AlertCircle size={14} className="text-[#F59E0B]"/>}
                    <span className={f.ok ? '' : 'text-[#6B7280]'}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Action verbs found</div>
              <div className="flex flex-wrap gap-1">
                {result.breakdown.actionVerbs.found.length === 0
                  ? <span className="text-xs text-[#6B7280]">None detected — start bullets with verbs like &quot;led&quot;, &quot;shipped&quot;, &quot;grew&quot;, &quot;reduced&quot;.</span>
                  : result.breakdown.actionVerbs.found.map((v) => (
                      <span key={v} className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAFAFA]">{v}</span>
                    ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA] mb-2">Quantified bullets</div>
              <div className="font-display italic text-3xl">{result.breakdown.quantification.count}</div>
              <p className="text-xs text-[#6B7280] mt-1">
                Numbers, percentages, $/₹ figures. Recruiters skim for these — aim for 6+.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
