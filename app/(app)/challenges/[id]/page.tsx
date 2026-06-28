import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { inr } from '@/lib/utils'
import { ShieldCheck, Clock, Users, ArrowLeft } from 'lucide-react'

export default async function ChallengeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ch = await prisma.challenge.findUnique({
    where: { id },
    include: { company: true, requirements: { include: { skill: true } }, submissions: { orderBy: { compositeRank: 'asc' }, take: 5, include: { user: true } } },
  })
  if (!ch) notFound()

  const user = await prisma.user.findFirst({ where: { role: 'CANDIDATE' } })
  const userCreds = user ? await prisma.credential.findMany({ where: { userId: user.id } }) : []
  const userSkillIds = new Set(userCreds.map((c) => c.skillId).filter(Boolean))

  const rubric = JSON.parse(ch.rubric as unknown as string)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <Link href="/challenges" className="text-xs text-[#6B7280] inline-flex items-center gap-1 mb-4">
        <ArrowLeft size={14}/> All challenges
      </Link>

      <div className="flex items-center gap-2 text-sm font-medium">
        {ch.company.name}
        <ShieldCheck size={14} className="text-[#22C55E]"/>
        <span className="text-[10px] text-[#A1A1AA]">· {ch.company.industry}</span>
      </div>
      <h1 className="font-display italic text-4xl mt-2">{ch.title}</h1>

      <div className="flex flex-wrap gap-3 mt-4 text-xs">
        <div className="flex items-center gap-1 text-[#C8A461] font-mono"><Clock size={12}/> Closes {new Date(ch.closingAt).toLocaleDateString()}</div>
        <div className="flex items-center gap-1 text-[#C8A461] font-mono">{inr(ch.stipendINR)} stipend</div>
        <div className="flex items-center gap-1 text-[#6B7280]"><Users size={12}/> {ch.submissions.length} applicants</div>
        <div className="text-[#7C5DDB] font-mono">{ch.mode} · NDA {ch.ndaRequired ? 'required' : 'optional'}</div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">Brief</div>
            <p className="text-sm leading-relaxed">{ch.brief}</p>
          </section>

          <section>
            <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">Evaluation rubric</div>
            <div className="space-y-2">
              {rubric.criteria.map((cr: any) => (
                <div key={cr.name} className="rounded-xl border border-[#E5E7EB] p-3">
                  <div className="flex justify-between text-sm">
                    <div className="font-medium">{cr.name}</div>
                    <div className="font-mono text-[#C8A461]">{cr.weight}%</div>
                  </div>
                  {cr.description && <div className="text-xs text-[#6B7280] mt-1">{cr.description}</div>}
                </div>
              ))}
            </div>
          </section>

          {ch.submissions.length > 0 && (
            <section>
              <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">Top submissions</div>
              <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#FAFAFA] text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">
                    <tr><th className="text-left px-3 py-2">Rank</th><th className="text-left px-3 py-2">Candidate</th><th className="text-right px-3 py-2">AI</th><th className="text-right px-3 py-2">Defence</th><th className="text-right px-3 py-2">Peer</th></tr>
                  </thead>
                  <tbody>
                    {ch.submissions.map((s) => (
                      <tr key={s.id} className="border-t border-[#E5E7EB]">
                        <td className="px-3 py-2">#{s.compositeRank}</td>
                        <td className="px-3 py-2 truncate max-w-[140px]">{s.user.fullName}</td>
                        <td className="text-right px-3 py-2 font-mono">{s.aiScore?.toFixed(1)}</td>
                        <td className="text-right px-3 py-2 font-mono">{s.defenceScore?.toFixed(1)}</td>
                        <td className="text-right px-3 py-2 font-mono">{s.peerScore?.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#E5E7EB] p-4">
            <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-2">Prerequisites</div>
            <div className="space-y-1.5">
              {ch.requirements.length === 0 && <div className="text-xs text-[#6B7280]">No prerequisites</div>}
              {ch.requirements.map((r) => {
                const has = userSkillIds.has(r.skillId)
                return (
                  <div key={r.id} className="flex items-center justify-between text-sm">
                    <span>{r.skill.name} <span className="text-[10px] text-[#A1A1AA]">L{r.minLevel}+</span></span>
                    <span className={`text-xs ${has ? 'text-[#22C55E]' : 'text-[#A1A1AA]'}`}>{has ? '✓' : '○'}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <Link href={`/challenges/${ch.id}/submit`}
                className="block bg-[#111111] text-white text-center py-3 rounded-xl text-sm font-medium">
            Apply to challenge
          </Link>
        </aside>
      </div>
    </div>
  )
}
