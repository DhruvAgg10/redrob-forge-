'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Trophy, Wallet, Briefcase, BarChart3, FileText, Building2, Network, MessageSquare } from 'lucide-react'

const nav = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/path', icon: Compass, label: 'Career Path' },
  { href: '/skills', icon: Trophy, label: 'Skills' },
  { href: '/challenges', icon: Briefcase, label: 'Challenges' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/leaderboard', icon: BarChart3, label: 'Leaderboard' },
  { href: '/resume', icon: FileText, label: 'Resume' },
  { href: '/market-pulse', icon: MessageSquare, label: 'Market Pulse' },
  { href: '/recruiter', icon: Building2, label: 'Recruiter' },
  { href: '/about/architecture', icon: Network, label: 'Architecture' },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 border-r border-[#E5E7EB] bg-white">
      <div className="px-5 py-5 border-b border-[#E5E7EB]">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg seal-gradient flex items-center justify-center">
            <span className="w-5 h-5 rounded-md bg-white" />
          </span>
          <span className="font-display italic text-xl">Forge</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] mt-1">by redrob</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((t) => {
          const active = pathname === t.href || (t.href !== '/dashboard' && pathname?.startsWith(t.href))
          return (
            <Link key={t.href} href={t.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active ? 'bg-[#FEE8E6] text-[#E94B3C] font-medium' : 'text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#111111]'
              }`}>
              <t.icon size={16} />
              <span>{t.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FEE8E6] flex items-center justify-center text-[#E94B3C] text-xs font-semibold">DA</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">Demo Candidate</div>
            <div className="text-[10px] text-[#A1A1AA] truncate">demo@forge.ai</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
