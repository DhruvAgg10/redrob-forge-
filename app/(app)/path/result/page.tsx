'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CareerPathChart } from '@/components/CareerPathChart'
import { ArrowLeft, Sparkles } from 'lucide-react'

type Path = {
  id: string; label: string; summary: string
  nodes: { role: string; lpa: number; years: number; skillGap: string[]; family?: string }[]
  totalYears: number; totalLPAGain: number; difficulty: number
}

function PathResultContent() {
  const params = useSearchParams()
  const goal = params.get('goal') || ''
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const resume = sessionStorage.getItem('forge.resume') || ''
    if (!resume || !goal) {
      setError('Missing resume or goal — please start again.')
      setLoading(false)
      return
    }
    fetch('/api/path/v2', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ resume, goal }),
    })
      .then(async (r) => {
        const d = await r.json()
        if (!r.ok) throw new Error(d.error || 'Failed')
        setData(d)
      })
      .catch((e) => setError(String(e.message || e)))
      .finally(() => setLoading(false))
  }, [goal])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Sparkles className="mx-auto text-[#7C5DDB] animate-pulse" size={28}/>
        <div className="font-display italic text-2xl mt-3">Mapping your routes…</div>
        <p className="text-[#6B7280] text-sm mt-1">Llama is reading your background and drafting alternatives.</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-[#EF4444]">Could not generate paths.</div>
        <div className="text-xs text-[#6B7280] mt-2">{error}</div>
        <Link href="/path" className="inline-block mt-6 bg-[#111] text-white px-4 py-2.5 rounded-xl text-sm">Start over</Link>
      </div>
    )
  }

  // Augment with family field for chart
  const paths: Path[] = (data.paths || []).map((p: Path) => ({
    ...p,
    nodes: p.nodes.map((n) => ({ ...n, family: p.label })),
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <Link href="/path" className="text-xs text-[#6B7280] inline-flex items-center gap-1 mb-3">
        <ArrowLeft size={14}/> Change inputs
      </Link>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Paths to</div>
        <h1 className="font-display italic text-4xl">{goal}</h1>
        <div className="text-sm text-[#6B7280] mt-2">
          You today: <span className="text-[#111] font-medium">{data.current.role}</span>
          <span className="mx-1">·</span> {data.current.yearsExp}y exp
          <span className="mx-1">·</span> {data.current.domain}
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {(data.current.notable || []).map((s: string) => (
            <span key={s} className="text-[10px] px-2 py-0.5 bg-[#FAFAFA] rounded-full border border-[#E5E7EB]">{s}</span>
          ))}
        </div>
      </div>

      <CareerPathChart paths={paths as any}/>

      <div className="mt-6 grid lg:grid-cols-3 gap-3">
        {paths.map((p) => (
          <div key={p.id} className="rounded-2xl border border-[#E5E7EB] p-4 bg-white">
            <div className="flex justify-between items-start">
              <div className="font-medium">{p.label}</div>
              <span className="text-[10px] text-[#A1A1AA] font-mono">{'★'.repeat(p.difficulty)}</span>
            </div>
            <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{p.summary}</p>
            <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex justify-between text-xs">
              <span className="text-[#6B7280]">{p.totalYears.toFixed(1)} years</span>
              <span className="font-mono text-[#C8A461]">+₹{p.totalLPAGain}L</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PathResult() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-20 text-center"><div className="font-display italic text-2xl mt-3">Preparing your path results…</div></div>}>
      <PathResultContent />
    </Suspense>
  )
}
