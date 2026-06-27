'use client'
import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CredentialSeal } from '@/components/CredentialSeal'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function Result({
  params,
  searchParams,
}: { params: Promise<{ slug: string }>; searchParams: Promise<{ score?: string; passed?: string }> }) {
  const { slug } = use(params)
  const { score: s, passed: p } = use(searchParams)
  const score = Number(s || 0)
  const passed = p === '1'
  const [credentialId, setCredentialId] = useState<string | null>(null)

  useEffect(() => {
    if (!passed) return
    fetch('/api/credentials/mint', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ skillSlug: slug, level: Math.max(1, Math.min(5, Math.floor(score / 20))) }),
    })
      .then((r) => r.json())
      .then((d) => setCredentialId(d.id))
      .catch(() => {})
  }, [passed, score, slug])

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-8 py-12 text-center">
      <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA]">{slug}</div>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}>
        {passed ? (
          <>
            <CheckCircle2 className="mx-auto text-[#22C55E] mt-4" size={40}/>
            <h1 className="font-display italic text-4xl mt-2">Credential earned</h1>
            <div className="text-[#6B7280] mt-1">Score {score}/100</div>
            <motion.div initial={{ scale: 0.5, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
                        className="mt-8 flex justify-center">
              <CredentialSeal skill={slug} level={Math.max(1, Math.min(5, Math.floor(score / 20)))} size="lg"/>
            </motion.div>
            <div className="mt-6 text-xs text-[#6B7280]">
              {credentialId
                ? <>Verifiable at <Link className="font-mono text-[#E94B3C]" href={`/verify/${credentialId}`}>/verify/{credentialId.slice(0, 10)}…</Link></>
                : 'Minting W3C Verifiable Credential…'}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <Link href="/wallet" className="border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm">Open wallet</Link>
              <Link href="/challenges" className="bg-[#111111] text-white px-4 py-2.5 rounded-xl text-sm">Find a challenge</Link>
            </div>
          </>
        ) : (
          <>
            <XCircle className="mx-auto text-[#EF4444] mt-4" size={40}/>
            <h1 className="font-display italic text-4xl mt-2">Not quite — score {score}</h1>
            <p className="text-[#6B7280] mt-2">Need 70+ to earn a credential. Retake when ready.</p>
            <Link href={`/skills/${slug}/test`} className="inline-block mt-6 bg-[#111111] text-white px-4 py-2.5 rounded-xl text-sm">Retake test</Link>
          </>
        )}
      </motion.div>
    </div>
  )
}
