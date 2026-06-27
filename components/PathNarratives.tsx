'use client'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

type N = { id: string; narrative: string }

export function PathNarratives({ goal, paths }: { goal: string; paths: any[] }) {
  const [narratives, setNarratives] = useState<N[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch('/api/path/narrate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ goal, paths }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        setNarratives(d.narratives || [])
      })
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [goal, paths])

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] p-5 bg-[#FAFAFA] text-xs text-[#6B7280] flex items-center gap-2">
        <Sparkles size={14} className="text-[#7C5DDB] animate-pulse"/> Claude is summarizing each route…
      </div>
    )
  }
  if (!narratives || narratives.length === 0) return null

  return (
    <div className="rounded-2xl border border-[#E5E7EB] p-5 bg-white">
      <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono flex items-center gap-2 mb-3">
        <Sparkles size={12} className="text-[#7C5DDB]"/> AI guidance per path
      </div>
      <div className="space-y-3">
        {paths.map((p) => {
          const n = narratives.find((x) => x.id === p.id)
          if (!n) return null
          return (
            <div key={p.id} className="flex gap-3">
              <div className="w-32 shrink-0 text-xs font-medium text-[#111]">{p.label}</div>
              <div className="text-sm text-[#6B7280] flex-1">{n.narrative}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
