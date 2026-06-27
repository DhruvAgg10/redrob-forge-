import { NextRequest } from 'next/server'
import { chat, hasLLM } from '@/lib/llm'
import studio from '@/data/skillStudio.json'

export async function POST(req: NextRequest) {
  const { slug, answer } = await req.json() as { slug: string; answer: string }
  const ex = (studio as any[]).find((s) => s.slug === slug)
  if (!ex) return Response.json({ error: 'Unknown exercise' }, { status: 400 })

  if (!hasLLM()) {
    // deterministic fallback — naive length-based score
    const score = Math.min(100, Math.round((answer.length / (ex.minWords * 8)) * 100))
    const passed = score >= 70
    return Response.json({
      score, passed,
      breakdown: ex.rubric.map((r: string) => ({
        criterion: r, score, feedback: 'AI grader not configured — falling back to length heuristic. Set HF_TOKEN.',
      })),
    })
  }

  const system = `You are a strict but fair grader for an MBA-pipeline skill assessment.

The exercise is:
"""${ex.prompt}"""

The candidate must be graded on these criteria:
${ex.rubric.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n')}

Score each criterion 0-100. Score 70+ requires the criterion to be clearly satisfied. Be honest and specific in feedback — point at the actual sentence or missing element. Don't hand out 90s for mediocre work.

Return ONLY strict JSON in this exact shape:
{
  "breakdown": [
    {"criterion": "<criterion text>", "score": <0-100>, "feedback": "<one tight sentence>"}
  ],
  "score": <weighted average rounded to int>,
  "passed": <true if score >= 70>
}`

  try {
    const text = await chat([
      { role: 'system', content: system },
      { role: 'user', content: answer },
    ], { maxTokens: 800, temperature: 0.3 })
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    const parsed = JSON.parse(match[0])
    // Trust LLM score, but ensure pass-line consistency
    parsed.passed = (parsed.score ?? 0) >= 70
    return Response.json(parsed)
  } catch (e: any) {
    return Response.json({ error: String(e.message || e) }, { status: 500 })
  }
}
