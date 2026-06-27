import { use } from 'react'
import { inr } from '@/lib/utils'

export default function Trial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="flex justify-between items-end mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">Trial workspace</div>
          <h1 className="font-display italic text-3xl mt-1">NimbusPay · Backend sprint</h1>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-[#C8A461]">{inr(25000)} in escrow</div>
          <div className="text-xs text-[#6B7280]">4d 12h remaining</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#E5E7EB] p-4">
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-3">Task list</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><input type="checkbox" defaultChecked/> Set up local environment</li>
            <li className="flex items-center gap-2"><input type="checkbox" defaultChecked/> Read transaction schema</li>
            <li className="flex items-center gap-2"><input type="checkbox"/> Implement partial-failure handler</li>
            <li className="flex items-center gap-2"><input type="checkbox"/> Add P95 latency tracker</li>
            <li className="flex items-center gap-2"><input type="checkbox"/> Write 4 integration tests</li>
            <li className="flex items-center gap-2"><input type="checkbox"/> Submit final PR</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] p-4 lg:col-span-1">
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-3">Active artifact</div>
          <div className="rounded-xl bg-[#0a0a0a] text-green-300 p-3 font-mono text-[11px] leading-relaxed overflow-auto h-64">
{`export async function reconcile(txn: Txn) {
  try {
    const verified = await provider.fetch(txn.id)
    if (verified.status !== 'CAPTURED') {
      return retry(txn, { backoff: 'exponential' })
    }
    return mark(txn.id, 'RECONCILED')
  } catch (e) {
    logger.warn({ txn: txn.id }, 'reconcile failed')
    throw e
  }
}`}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] p-4">
          <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-3">Mentor chat</div>
          <div className="space-y-2 text-sm h-64 overflow-auto">
            <div className="p-2 rounded-xl bg-[#FAFAFA]"><div className="text-[10px] font-mono text-[#A1A1AA]">Mentor (NimbusPay)</div>Good progress on day 2. Make sure partial-failure path emits the metrics.</div>
            <div className="p-2 rounded-xl bg-[#FEE8E6] ml-8"><div className="text-[10px] font-mono text-[#A1A1AA]">You</div>Will add Prometheus counters today.</div>
          </div>
          <input placeholder="Message…" className="w-full mt-2 px-3 py-2 border border-[#E5E7EB] rounded-xl text-sm"/>
        </div>
      </div>

      <div className="text-[10px] text-[#A1A1AA] mt-4 font-mono">Trial id: {id}</div>
    </div>
  )
}
