export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { verifyCredentialById } from '@/lib/credentials'
import { CredentialSeal } from '@/components/CredentialSeal'
import { CheckCircle2, XCircle, Globe } from 'lucide-react'

export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let result: any = { valid: false, reason: 'Unknown' }
  try {
    result = await verifyCredentialById(id)
  } catch (e: any) {
    result = { valid: false, reason: 'Verification error: ' + String(e.message || e) }
  }

  let jsonldParsed: any = null
  if (result.valid) {
    try { jsonldParsed = JSON.parse(result.credential.jsonld) } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#FEE8E6]/30 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-xs text-[#6B7280] inline-flex items-center gap-2 mb-4">
          <Globe size={12}/> forge.redrob.ai · public verifier
        </Link>

        {result.valid ? (
          <div className="relative rounded-3xl bg-white border-2 border-[#C8A461]/40 overflow-hidden shadow-xl">
            {/* certificate header */}
            <div className="bg-gradient-to-r from-[#C8A461] to-[#7C5DDB] h-2"/>
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <CheckCircle2 size={18}/>
                  <span className="text-sm font-medium">Verified · Signature valid</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">W3C VC 2.0 · Open Badge 3.0</span>
              </div>

              <div className="mt-6 text-center">
                <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">This certifies that</div>
                <div className="font-display italic text-3xl mt-1">{result.credential.user.fullName}</div>
                <div className="text-xs text-[#6B7280] mt-1">has demonstrated competence in</div>
                <div className="font-display text-2xl text-[#E94B3C] mt-1">{result.credential.skill?.name || result.credential.type}</div>
                <div className="text-xs text-[#A1A1AA] mt-1">Level {result.credential.level} · issued {new Date(result.credential.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>

              <div className="mt-8 flex justify-center">
                <CredentialSeal skill={result.credential.skill?.name || result.credential.type} level={result.credential.level} size="lg"/>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB] grid sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-[#A1A1AA] uppercase tracking-wider font-mono text-[9px]">Issuer</div>
                  <div className="mt-1 font-mono break-all text-[10px]">did:web:forge.redrob.ai</div>
                </div>
                <div>
                  <div className="text-[#A1A1AA] uppercase tracking-wider font-mono text-[9px]">Holder DID</div>
                  <div className="mt-1 font-mono break-all text-[10px]">{result.credential.user.did.slice(0, 32)}…</div>
                </div>
                <div>
                  <div className="text-[#A1A1AA] uppercase tracking-wider font-mono text-[9px]">Signature</div>
                  <div className="mt-1 font-mono break-all text-[10px]">{result.credential.signature.slice(0, 32)}…</div>
                </div>
              </div>

              {jsonldParsed && (
                <details className="mt-4">
                  <summary className="text-xs text-[#6B7280] cursor-pointer">View raw JSON-LD payload</summary>
                  <pre className="mt-2 text-[10px] font-mono bg-[#FAFAFA] p-3 rounded-lg overflow-auto max-h-64">{JSON.stringify(jsonldParsed, null, 2)}</pre>
                </details>
              )}
            </div>
            <div className="bg-gradient-to-r from-[#7C5DDB] to-[#C8A461] h-2"/>
          </div>
        ) : (
          <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8">
            <div className="flex items-center gap-2 text-[#EF4444] mb-3">
              <XCircle size={20}/>
              <span className="text-sm font-medium">Invalid — {result.reason}</span>
            </div>
            <div className="text-sm text-[#6B7280]">
              This credential could not be verified. The link may be incorrect, or the credential has been revoked.
            </div>
          </div>
        )}
        <div className="text-center text-xs text-[#A1A1AA] mt-4 font-mono">
          Anyone, anywhere, can verify this URL in one click.
        </div>
      </div>
    </div>
  )
}
