'use client'
import { useEffect, useRef } from 'react'

let initialized = false

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      const mermaid = (await import('mermaid')).default
      if (!initialized) {
        mermaid.initialize({ startOnLoad: false, theme: 'default', fontFamily: 'Inter, system-ui, sans-serif' })
        initialized = true
      }
      if (ref.current) {
        const id = 'mmd-' + Math.random().toString(36).slice(2)
        try {
          const { svg } = await mermaid.render(id, chart)
          ref.current.innerHTML = svg
        } catch (e) {
          ref.current.innerHTML = '<pre class="text-xs text-red-500">' + String(e) + '</pre>'
        }
      }
    })()
  }, [chart])

  return <div ref={ref} className="mermaid-container w-full overflow-auto"/>
}
