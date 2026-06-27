'use client'
import Link from 'next/link'
import { ClipboardCheck, Presentation } from 'lucide-react'

export function SurveyButton() {
  return (
    <div className="fixed top-3 right-4 z-50 flex gap-2">
      <Link href="/presentation"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#111] text-white shadow-md hover:bg-black">
        <Presentation size={12}/>
        <span className="font-medium">Presentation</span>
      </Link>
      <Link href="/survey"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#7C5DDB] text-white shadow-md hover:bg-[#6b4dc7]">
        <ClipboardCheck size={12}/>
        <span className="font-medium">Survey</span>
        <span className="opacity-70">·</span>
        <span className="opacity-80">pricing</span>
      </Link>
    </div>
  )
}
