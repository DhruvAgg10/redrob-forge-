import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MentorChat } from '@/components/MentorChat'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default async function MentorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let user: any = null
  let loadError = ''
  try {
    if ((prisma as any).isFallback) {
      throw new Error('Database not configured')
    }
    user = await prisma.user.findUnique({
      where: { id },
      include: {
        credentials: { include: { skill: true }, orderBy: { level: 'desc' }, take: 5 },
      },
    })
    if (!user) notFound()
  } catch (error: any) {
    loadError = String(error.message || error)
  }

  if (loadError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-2xl font-semibold">Mentor coach unavailable</div>
        <div className="mt-4 text-sm text-[#6B7280]">{loadError}</div>
        <div className="mt-6 text-sm text-[#7C5DDB]">Connect your database or deploy with a valid Vercel DATABASE_URL.</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6">
      <Link href="/leaderboard" className="text-xs text-[#6B7280] inline-flex items-center gap-1 mb-3">
        <ArrowLeft size={12}/> Back to leaderboard
      </Link>

      <div className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] p-5 bg-white">
        <img src={user.avatarUrl || ''} alt="" className="w-16 h-16 rounded-full"/>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-lg">{user.fullName}</div>
            <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded-full bg-[#7C5DDB]/10 text-[#7C5DDB] inline-flex items-center gap-1">
              <Sparkles size={9}/> AI persona
            </span>
          </div>
          <div className="text-xs text-[#6B7280] mt-1">Trust {user.trustScore} · {user.credentials.length} verified skills</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {user.credentials.map((c) => (
              <span key={c.id} className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAFAFA] border border-[#F4F4F5]">
                {c.skill?.name || c.type} <span className="text-[#A1A1AA]">L{c.level}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-[#6B7280] mt-4 mb-2">
        This isn&apos;t {user.fullName}. It&apos;s an AI roleplaying their problem-solving style based on signal Redrob has from their work on Forge. They get to choose their own consent boundaries.
      </div>

      <MentorChat userId={user.id} name={user.fullName.split(' ')[0]}/>
    </div>
  )
}
