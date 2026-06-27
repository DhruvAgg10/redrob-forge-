'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Plus, MessageCircle, LayoutGrid, FolderKanban, Users2, Contact, Smartphone, PanelLeftClose, PanelLeft,
} from 'lucide-react'
import { RedrobLogo } from './RedrobLogo'

const NAV = [
  { href: '/new-chat', icon: Plus, label: 'New Chat' },
  { href: '/all-chats', icon: MessageCircle, label: 'All Chats' },
  { href: '/app-store', icon: LayoutGrid, label: 'AI App Store' },
  { href: '/projects', icon: FolderKanban, label: 'Projects' },
  { href: '/chat-rooms', icon: Users2, label: 'Chat Rooms' },
  { href: '/community', icon: Users2, label: 'Community' },
  { href: '/contacts', icon: Contact, label: 'Contacts' },
  { href: '/profile', icon: Smartphone, label: 'Profile' },
]

const RECENTS = [
  'High-Paying Global Jobs for M...',
  'Consulting Jobs in Australia for...',
  'Marketing Heads for Hell Ener...',
  'Resume Consulting Style Devel...',
  'High-Paying FMCG Startups in...',
]

export function RedrobSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <aside className="hidden lg:flex flex-col w-16 h-screen sticky top-0 border-r border-[#E5E7EB] bg-white items-center py-4 gap-3">
        <button onClick={() => setCollapsed(false)} className="text-[#6B7280] hover:text-[#111]">
          <PanelLeft size={18}/>
        </button>
        <RedrobLogo size={22}/>
        <div className="flex-1"/>
        {NAV.slice(0, 4).map((t) => (
          <Link key={t.href} href={t.href} className="text-[#6B7280] hover:text-[#111] p-2">
            <t.icon size={18}/>
          </Link>
        ))}
      </aside>
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 border-r border-[#E5E7EB] bg-white">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <Link href="/"><RedrobLogo /></Link>
        <button onClick={() => setCollapsed(true)} className="text-[#A1A1AA] hover:text-[#111]">
          <PanelLeftClose size={16}/>
        </button>
      </div>

      <nav className="px-2 py-2 space-y-0.5">
        {NAV.map((t) => {
          const active = pathname === t.href || (t.href !== '/' && pathname?.startsWith(t.href))
          return (
            <Link key={t.href} href={t.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active ? 'bg-[#F4F4F5] text-[#111] font-medium' : 'text-[#3F3F46] hover:bg-[#FAFAFA]'
              }`}>
              <t.icon size={16} />
              <span>{t.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 mt-4 mb-1 text-[11px] text-[#A1A1AA]">Recents</div>
      <nav className="px-2 flex-1 overflow-y-auto space-y-0.5">
        {RECENTS.map((r) => (
          <div key={r} className="px-3 py-1.5 text-[13px] text-[#3F3F46] truncate cursor-pointer hover:bg-[#FAFAFA] rounded-lg">{r}</div>
        ))}
      </nav>

      <div className="p-3 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-semibold">DA</div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium truncate">Dhruv Aggarwal</div>
            <div className="text-[11px] text-[#A1A1AA] truncate">Dhruv&apos;s workspace</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
