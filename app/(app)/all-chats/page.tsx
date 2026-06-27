import Link from 'next/link'

const ITEMS = [
  'High-Paying Global Jobs for MBA Grads',
  'Consulting Jobs in Australia for Indian Talent',
  'Marketing Heads for Hell Energy India',
  'Resume Consulting Style Development',
  'High-Paying FMCG Startups in India 2026',
]

export default function AllChats() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
      <h1 className="font-semibold text-2xl">All Chats</h1>
      <p className="text-[#6B7280] text-sm mt-1">Resume any of your saved conversations.</p>
      <div className="mt-6 space-y-1">
        {ITEMS.map((t) => (
          <Link key={t} href="/new-chat" className="block px-4 py-3 rounded-xl border border-[#E5E7EB] hover:bg-[#FAFAFA]">
            <div className="font-medium text-sm">{t}</div>
            <div className="text-[11px] text-[#A1A1AA] mt-0.5">Redrob 2B · 3 days ago</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
