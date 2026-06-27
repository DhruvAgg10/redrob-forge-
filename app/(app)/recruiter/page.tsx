import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { inr } from '@/lib/utils'
import { Plus } from 'lucide-react'

export default async function RecruiterDashboard() {
  const company = await prisma.company.findFirst({ orderBy: { trustScore: 'desc' } })
  if (!company) return <div className="p-8">No company seeded.</div>

  const challenges = await prisma.challenge.findMany({
    where: { companyId: company.id },
    include: { _count: { select: { submissions: true } } },
    orderBy: { postedAt: 'desc' },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Recruiter view</div>
          <h1 className="font-display italic text-4xl mt-1">{company.name}</h1>
          <div className="text-[#6B7280] text-sm">
            Trust score {company.trustScore} · {company.industry} · MCA ✓ GST ✓
          </div>
        </div>
        <Link href="/recruiter/post-challenge" className="bg-[#111111] text-white px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
          <Plus size={14}/> Post a challenge
        </Link>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FAFAFA] text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">
            <tr>
              <th className="text-left px-4 py-3">Challenge</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Applicants</th>
              <th className="text-right px-4 py-3">Stipend</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((c) => (
              <tr key={c.id} className="border-t border-[#E5E7EB]">
                <td className="px-4 py-3">
                  <Link href={`/challenges/${c.id}`} className="font-medium hover:underline">{c.title}</Link>
                  <div className="text-[10px] text-[#A1A1AA]">{c.roleFamily}</div>
                </td>
                <td className="px-4 py-3 text-xs font-mono">{c.status}</td>
                <td className="text-right px-4 py-3 font-mono">{c._count.submissions}/{c.maxApplicants}</td>
                <td className="text-right px-4 py-3 font-mono text-[#C8A461]">{inr(c.stipendINR)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
