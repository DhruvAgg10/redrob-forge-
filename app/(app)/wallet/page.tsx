export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { CredentialSeal } from '@/components/CredentialSeal'
import { ExternalLink } from 'lucide-react'

export default async function Wallet() {
  let creds = [] as Array<{
    id: string
    type: string
    level: number
    issuedAt: Date | string
    skill?: { name: string; category: string } | null
  }>
  let loadError = ''
  try {
    const user = await prisma.user.findFirst({ where: { role: 'CANDIDATE' } })
    if (user) {
      creds = await prisma.credential.findMany({
        where: { userId: user.id },
        include: { skill: true },
        orderBy: { issuedAt: 'desc' },
      })
    }
  } catch (error: any) {
    loadError = String(error.message || error)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Credential Wallet</div>
        <h1 className="font-display italic text-4xl mt-1">{creds.length} portable credentials</h1>
        <p className="text-[#6B7280] mt-1 text-sm">
          Each is a W3C Verifiable Credential. Share the public verify link — any employer worldwide can confirm it in one second.
        </p>
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
          <div className="text-[#991B1B] mb-4">Wallet data unavailable.</div>
          <div className="text-sm text-[#7F1D1D]">{loadError}</div>
          <div className="mt-4 text-sm text-[#7F1D1D]">Restart the app after fixing your database configuration.</div>
        </div>
      ) : creds.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E5E7EB] p-12 text-center">
          <div className="text-[#6B7280] mb-4">No credentials yet.</div>
          <Link href="/skills" className="bg-[#111111] text-white px-4 py-2.5 rounded-xl text-sm">Open Skill Studio</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {creds.map((c) => (
            <Link key={c.id} href={`/verify/${c.id}`} target="_blank"
                  className="rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#111] transition flex gap-5 items-center bg-white">
              <CredentialSeal skill={c.skill?.name || c.type} level={c.level} size="md"/>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-base truncate">{c.skill?.name || c.type}</div>
                <div className="text-xs text-[#6B7280] mt-1">{c.skill?.category || c.type}</div>
                <div className="mt-2 flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-[#FAFAFA]">L{c.level}</span>
                  <span className="text-[#A1A1AA]">{new Date(c.issuedAt).toLocaleDateString()}</span>
                </div>
                <div className="text-[10px] text-[#E94B3C] mt-2 inline-flex items-center gap-1">
                  Verify link <ExternalLink size={10}/>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
