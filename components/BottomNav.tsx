'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus, LayoutGrid, Compass, Hammer, User } from 'lucide-react'

const tabs = [
  { href: '/new-chat', icon: Plus, label: 'New' },
  { href: '/app-store', icon: LayoutGrid, label: 'Apps' },
  { href: '/path', icon: Compass, label: 'Path' },
  { href: '/skills', icon: Hammer, label: 'Studio' },
  { href: '/profile', icon: User, label: 'Me' },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E5E7EB] z-50">
      <div className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = pathname?.startsWith(t.href)
          return (
            <Link key={t.href} href={t.href}
              className={`flex flex-col items-center py-2 gap-0.5 ${active ? 'text-[#E94B3C]' : 'text-[#6B7280]'}`}>
              <t.icon size={20} />
              <span className="text-[10px]">{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
