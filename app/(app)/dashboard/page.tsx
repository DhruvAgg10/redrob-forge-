export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { CredentialSeal } from '@/components/CredentialSeal'
import { ArrowRight, Compass, Briefcase, ChevronRight } from 'lucide-react'
import { inr } from '@/lib/utils'

export default async function Dashboard() {
  const user = await prisma.user.findFirst({ where: { role: 'CANDIDATE' } })
  const credCount = user ? await prisma.credential.count({ where: { userId: user.id } }) : 0
  const challenges = await prisma.challenge.findMany({
    where: { status: 'OPEN' },
    include: { company: true },
    take: 3,
    orderBy: { postedAt: 'desc' },
  })
  const recentCreds = user
    ? await prisma.credential.findMany({
        where: { userId: user.id },
        include: { skill: true },
        take: 3,
        orderBy: { issuedAt: 'desc' },
      })
    : []

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-[#E5E7EB] p-5 bg-white">
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Welcome back</div>
          <h1 className="font-display text-3xl italic mt-1">{user?.fullName || 'Demo Candidate'}</h1>
          <div className="mt-4 flex items-end gap-4">
            <div>
              <div className="text-xs text-[#6B7280]">Trust score</div>
              <div className="text-3xl font-semibold">{user?.trustScore ?? 82}</div>
            </div>
            <div className="flex-1 h-2 bg-[#F4F4F5] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#22C55E]" style={{ width: `${user?.trustScore ?? 82}%` }} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] p-5 bg-white">
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Your credentials</div>
          <div className="text-3xl font-semibold mt-1">{credCount}</div>
          <div className="text-xs text-[#6B7280]">portable W3C credentials</div>
          <Link href="/wallet" className="text-xs text-[#E94B3C] inline-flex items-center gap-1 mt-3">
            Open wallet <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-[#FEE8E6]/40 mb-6">
        <div className="text-xs uppercase tracking-wider text-[#E94B3C] font-mono">Continue your path</div>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <div className="font-display text-2xl italic">Map a path to your next role</div>
            <p className="text-sm text-[#6B7280] mt-1">Paste your resume + a goal. Get 3 distinct routes.</p>
          </div>
          <Link href="/path" className="bg-[#111111] text-white px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 self-start">
            Open Path Engine <Compass size={14} />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold flex items-center gap-2"><Briefcase size={16}/> Open challenges</div>
            <Link href="/challenges" className="text-xs text-[#E94B3C]">See all →</Link>
          </div>
          <div className="space-y-2">
            {challenges.map((ch) => (
              <Link key={ch.id} href={`/challenges/${ch.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E7EB] hover:bg-[#FAFAFA]">
                <div className="w-10 h-10 rounded-lg bg-[#FEE8E6] flex items-center justify-center text-[#E94B3C] text-xs font-semibold">
                  {ch.company.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#6B7280]">{ch.company.name}</div>
                  <div className="font-medium text-sm truncate">{ch.title}</div>
                </div>
                <div className="text-xs font-mono text-[#C8A461] whitespace-nowrap">{inr(ch.stipendINR)}</div>
                <ChevronRight size={14} className="text-[#A1A1AA]"/>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">Recent credentials</div>
            <Link href="/leaderboard" className="text-xs text-[#E94B3C]">Leaderboard →</Link>
          </div>
          {recentCreds.length === 0 ? (
            <div className="text-xs text-[#6B7280] text-center py-6">Take a Skill Studio exercise to earn one.</div>
          ) : (
            <div className="space-y-3">
              {recentCreds.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <CredentialSeal skill={c.skill?.name || c.type} level={c.level} size="sm"/>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{c.skill?.name || c.type}</div>
                    <div className="text-[10px] text-[#A1A1AA] font-mono">L{c.level} · {new Date(c.issuedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
