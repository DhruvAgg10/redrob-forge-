import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Sparkles } from 'lucide-react'

export default async function Leaderboard() {
  const users = await prisma.user.findMany({
    where: { role: 'CANDIDATE' },
    include: { credentials: true },
  })
  const ranked = users
    .map((u) => ({
      id: u.id,
      name: u.fullName,
      avatar: u.avatarUrl,
      score: u.credentials.reduce((acc, c) => acc + c.level * 10, 0),
      creds: u.credentials.length,
      trust: u.trustScore,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Skills Leaderboard</div>
        <h1 className="font-semibold text-3xl mt-1">Top {ranked.length} candidates</h1>
        <p className="text-[#6B7280] text-sm mt-1">
          Click <span className="text-[#7C5DDB] font-medium">Learn from</span> to chat with an AI built on that person&apos;s signal — how they solve problems in their top skills.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FAFAFA] text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Candidate</th>
              <th className="text-right px-4 py-3">Credentials</th>
              <th className="text-right px-4 py-3">Trust</th>
              <th className="text-right px-4 py-3">Score</th>
              <th className="text-right px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((u, i) => (
              <tr key={u.id} className={`border-t border-[#E5E7EB] ${i === 0 ? 'bg-[#FEE8E6]/30' : ''}`}>
                <td className="px-4 py-3 font-mono text-[#A1A1AA]">{i + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={u.avatar || ''} className="w-7 h-7 rounded-full" alt=""/>
                  <span className="truncate max-w-[180px]">{u.name}</span>
                </td>
                <td className="text-right px-4 py-3 font-mono">{u.creds}</td>
                <td className="text-right px-4 py-3 font-mono">{u.trust}</td>
                <td className="text-right px-4 py-3 font-mono text-[#C8A461]">{u.score}</td>
                <td className="text-right px-4 py-3">
                  <Link href={`/mentor/${u.id}`}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#7C5DDB]/10 text-[#7C5DDB] hover:bg-[#7C5DDB]/15">
                    <Sparkles size={11}/> Learn from
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
