import { NextRequest } from 'next/server'
import { chat, hasLLM } from '@/lib/llm'

export async function POST(req: NextRequest) {
  const { goal, paths } = await req.json() as { goal: string; paths: any[] }

  if (!hasLLM()) {
    return Response.json({
      narratives: paths.map((p) => ({
        id: p.id,
        narrative: `${p.label}: ${p.nodes.length}-step route to ${goal}. ${p.totalYears.toFixed(1)} years, +₹${p.totalLPAGain}L lifetime growth. Set HF_TOKEN for AI-written guidance.`,
      })),
    })
  }

  const prompt = `A user wants to reach "${goal}". For each path below, write ONE tight sentence (max 30 words) of strategic guidance: what kind of person it suits and the biggest risk on it. Return ONLY strict JSON in this exact form, nothing else:
{"narratives":[{"id":"<id>","narrative":"<sentence>"}]}

Paths: ${JSON.stringify(paths.map((p) => ({
    id: p.id, label: p.label, nodes: p.nodes.map((n: any) => n.role), years: p.totalYears, lpaGain: p.totalLPAGain, difficulty: p.difficulty,
  })))}`

  try {
    const text = await chat([{ role: 'user', content: prompt }], { maxTokens: 600, temperature: 0.6 })
    const match = text.match(/\{[\s\S]*\}/)
    const parsed = match ? JSON.parse(match[0]) : { narratives: [] }
    return Response.json(parsed)
  } catch (e: any) {
    return Response.json({
      narratives: paths.map((p) => ({ id: p.id, narrative: `${p.label} · ${p.totalYears.toFixed(1)}y · +₹${p.totalLPAGain}L (LLM error)` })),
      error: String(e.message || e),
    })
  }
}
