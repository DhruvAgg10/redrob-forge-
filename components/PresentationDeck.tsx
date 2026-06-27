'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { Slide01 } from './slides/Slide01'
import { Slide02 } from './slides/Slide02'
import { Slide03 } from './slides/Slide03'
import { Slide04 } from './slides/Slide04'
import { Slide05 } from './slides/Slide05'
import { Slide06 } from './slides/Slide06'
import { Slide07 } from './slides/Slide07'
import { Slide08 } from './slides/Slide08'
import { Slide09 } from './slides/Slide09'
import { Slide10 } from './slides/Slide10'
import { Slide11 } from './slides/Slide11'
import { Slide12 } from './slides/Slide12'

const SLIDES = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10, Slide11, Slide12]
const TITLES = [
  'Cover', 'Problem & Insight', 'Personas (VALS framework)', 'Solution (Use-case 2×2)',
  'User Journey (Funnel)', 'Mockups', 'Growth (Ansoff Matrix)', 'Ecosystem (Spider)',
  'Pricing (Kano + BCG)', 'Rollout', 'Metrics (AARRR)', 'Future (OLI Framework)',
]

export function PresentationDeck() {
  const [idx, setIdx] = useState(0)
  const [outline, setOutline] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') setIdx((i) => Math.min(SLIDES.length - 1, i + 1))
      else if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, i - 1))
      else if (e.key === 'Escape') setOutline(false)
      else if (e.key === 'o' || e.key === 'O') setOutline((o) => !o)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const Slide = SLIDES[idx]

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col">
      {/* Top bar */}
      <div className="border-b border-[#E5E7EB] px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs">
        <Link href="/" className="text-[#525252] hover:text-[#0A0A0A]">← Back to Forge</Link>
        <div className="text-xs uppercase tracking-[0.18em] font-mono text-[#525252]">Forge · Redrob Ideathon Track 2</div>
        <div className="flex items-center gap-4">
          <button onClick={() => setOutline(!outline)} className="text-[#525252] hover:text-[#0A0A0A] inline-flex items-center gap-1">
            {outline ? <X size={12}/> : <Maximize2 size={12}/>} {outline ? 'Close' : 'Outline'}
          </button>
          <span className="text-[#525252] font-mono">{String(idx + 1).padStart(2, '0')} / {SLIDES.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[#F4F4F5]">
        <div className="h-full bg-[#2563EB] transition-all" style={{ width: `${((idx + 1) / SLIDES.length) * 100}%` }}/>
      </div>

      {/* Outline overlay */}
      {outline && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur z-50 overflow-auto p-8" onClick={() => setOutline(false)}>
          <div className="max-w-4xl mx-auto">
            <div className="text-xs uppercase tracking-[0.18em] text-[#A1A1AA] font-mono mb-4">All slides · click any to jump</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {TITLES.map((t, i) => (
                <button key={i}
                        onClick={(e) => { e.stopPropagation(); setIdx(i); setOutline(false) }}
                        className={`text-left rounded-xl p-4 border transition ${i === idx ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white border-[#E5E7EB] hover:border-[#0A0A0A]'}`}>
                  <div className={`text-[10px] uppercase tracking-wider font-mono ${i === idx ? 'text-white/70' : 'text-[#A1A1AA]'}`}>Slide {String(i + 1).padStart(2, '0')}</div>
                  <div className="font-semibold text-base mt-1">{t}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slide content */}
      <div className="flex-1 flex flex-col">
        <Slide/>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#E5E7EB] px-4 sm:px-8 py-3 flex items-center justify-between bg-[#FAFAFA]">
        <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
                className="text-sm text-[#525252] hover:text-[#0A0A0A] disabled:opacity-30 inline-flex items-center gap-1">
          <ChevronLeft size={14}/> Prev
        </button>
        <div className="text-[10px] text-[#A1A1AA] font-mono uppercase tracking-wider">{TITLES[idx]}</div>
        <button onClick={() => setIdx(Math.min(SLIDES.length - 1, idx + 1))} disabled={idx === SLIDES.length - 1}
                className="text-sm text-[#525252] hover:text-[#0A0A0A] disabled:opacity-30 inline-flex items-center gap-1">
          Next <ChevronRight size={14}/>
        </button>
      </div>
    </div>
  )
}

// ===== Shared design primitives =====
export function SlideWrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex-1 flex flex-col px-8 sm:px-20 py-10 max-w-[1400px] mx-auto w-full ${className}`}>
      {children}
    </div>
  )
}

export function SlideHeader({ number, framework, title, subtitle }: { number: string; framework?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono text-[#2563EB] font-semibold tracking-wider">{number}</span>
        {framework && (
          <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] px-2 py-0.5 rounded-full bg-[#F4F4F5]">
            Framework · {framework}
          </span>
        )}
      </div>
      <h1 className="font-sans font-semibold text-3xl sm:text-5xl leading-[1.1] text-[#0A0A0A] max-w-4xl">{title}</h1>
      {subtitle && <p className="text-[#525252] text-base mt-3 max-w-3xl">{subtitle}</p>}
    </div>
  )
}

export function SlideSources({ items }: { items: { num: string; ref: string }[] }) {
  return (
    <div className="mt-auto pt-6 border-t border-[#E5E7EB]">
      <div className="text-[9px] uppercase tracking-[0.18em] font-mono text-[#A1A1AA] mb-2">Sources</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px] text-[#525252]">
        {items.map((s, i) => (
          <div key={i} className="leading-snug">
            <span className="font-mono text-[#2563EB] mr-1">[{s.num}]</span>{s.ref}
          </div>
        ))}
      </div>
    </div>
  )
}

export function HoverCard({ children, title, body }: { children: React.ReactNode; title: string; body: string }) {
  return (
    <div className="group relative">
      {children}
      <div className="absolute z-30 left-1/2 -translate-x-1/2 -bottom-2 translate-y-full hidden group-hover:block w-72 p-3 rounded-lg bg-[#0A0A0A] text-white shadow-xl">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">{title}</div>
        <div className="text-xs leading-relaxed">{body}</div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] rotate-45"/>
      </div>
    </div>
  )
}
