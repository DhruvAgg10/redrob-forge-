'use client'
import { useMemo } from 'react'
import ReactFlow, { Background, Controls, Node, Edge, Handle, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import type { Path } from '@/lib/careerPath'

function RoleNode({ data }: { data: any }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 min-w-[200px]"
         style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)' }}>
      <Handle type="target" position={Position.Left} style={{ background: '#E5E7EB' }}/>
      <div className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-mono">{data.family}</div>
      <div className="font-semibold mt-1 text-sm">{data.role}</div>
      <div className="font-display italic text-2xl mt-2 text-[#C8A461]">₹{data.lpa}L</div>
      {data.years > 0 && <div className="text-xs text-[#6B7280] mt-1">{data.years}y typical</div>}
      {data.skillGap?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
          <div className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-mono">Skills to add</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {data.skillGap.slice(0, 3).map((s: string) => (
              <span key={s} className="text-[10px] px-2 py-0.5 bg-[#F4F4F5] rounded-full">{s}</span>
            ))}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} style={{ background: '#E5E7EB' }}/>
    </div>
  )
}

const nodeTypes = { role: RoleNode }

export function CareerPathChart({ paths }: { paths: Path[] }) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []
    const dx = 280
    const dy = 220
    paths.forEach((p, lane) => {
      p.nodes.forEach((n, i) => {
        const id = `${p.id}-${i}`
        nodes.push({
          id,
          type: 'role',
          position: { x: i * dx, y: lane * dy },
          data: n,
        })
        if (i > 0) {
          edges.push({
            id: `${p.id}-e-${i}`,
            source: `${p.id}-${i - 1}`,
            target: id,
            animated: i === p.nodes.length - 1,
            style: { stroke: '#C8A461', strokeWidth: 2 },
          })
        }
      })
    })
    return { nodes, edges }
  }, [paths])

  return (
    <div className="h-[600px] w-full rounded-2xl border border-[#E5E7EB] bg-white">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView
                 proOptions={{ hideAttribution: true }}>
        <Background gap={20} color="#E5E7EB" />
        <Controls />
      </ReactFlow>
    </div>
  )
}
