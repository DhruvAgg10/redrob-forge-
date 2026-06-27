import Link from 'next/link'
import studio from '@/data/skillStudio.json'
import { Hammer } from 'lucide-react'

export default function SkillStudio() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
      <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono flex items-center gap-2">
        <Hammer size={14}/> Skill Studio
      </div>
      <h1 className="font-display italic text-4xl mt-1">Prove a skill with real work.</h1>
      <p className="text-[#6B7280] mt-1 text-sm max-w-xl">
        15–20 minute MBA-relevant tasks. AI grades your written output against a rubric.
        Score ≥ 70 mints a portable W3C credential.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {(studio as any[]).map((s) => (
          <Link key={s.slug} href={`/skills/${s.slug}`}
                className="rounded-2xl border border-[#E5E7EB] p-5 bg-white hover:border-[#111] transition">
            <div className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">{s.tag}</div>
            <div className="font-display italic text-xl mt-1">{s.name}</div>
            <p className="text-xs text-[#6B7280] mt-2">{s.blurb}</p>
            <div className="mt-3 pt-3 border-t border-[#E5E7EB] text-[10px] text-[#A1A1AA] font-mono">
              {s.rubric.length} rubric points · ~{s.minWords} words
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
