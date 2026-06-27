import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { inr } from '@/lib/utils'
import { ShieldCheck, Users } from 'lucide-react'

export default async function Challenges() {
  const challenges = await prisma.challenge.findMany({
    include: { company: true, requirements: { include: { skill: true } }, _count: { select: { submissions: true } } },
    orderBy: { postedAt: 'desc' },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Challenge Marketplace</div>
        <h1 className="font-display italic text-4xl mt-1">Real work. Real stipend. Real hire.</h1>
        <p className="text-[#6B7280] mt-1 text-sm">{challenges.length} active challenges across India.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {challenges.map((c) => (
          <Link key={c.id} href={`/challenges/${c.id}`}
                className="rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#111] hover:shadow-sm transition bg-white">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="min-w-0">
                <div className="text-xs font-medium flex items-center gap-1">
                  {c.company.name}
                  <ShieldCheck size={12} className="text-[#22C55E]"/>
                </div>
                <div className="text-[10px] text-[#A1A1AA]">{c.company.industry}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                c.status === 'OPEN' ? 'bg-[#22C55E]/10 text-[#22C55E]'
                  : c.status === 'EVALUATING' ? 'bg-[#7C5DDB]/10 text-[#7C5DDB]'
                  : c.status === 'TRIAL' ? 'bg-[#C8A461]/15 text-[#C8A461]'
                  : 'bg-[#F4F4F5] text-[#6B7280]'
              }`}>{c.status}</span>
            </div>
            <div className="font-display italic text-xl leading-tight">{c.title}</div>
            <div className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-1">{c.roleFamily}</div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="font-mono text-[#C8A461]">{inr(c.stipendINR)} stipend</div>
              <div className="flex items-center gap-1 text-[#6B7280]">
                <Users size={12}/> {c._count.submissions}/{c.maxApplicants}
              </div>
            </div>
            {c.requirements.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex flex-wrap gap-1">
                {c.requirements.slice(0, 3).map((r) => (
                  <span key={r.id} className="text-[10px] px-2 py-0.5 bg-[#FAFAFA] rounded-full">
                    {r.skill.name} L{r.minLevel}+
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
