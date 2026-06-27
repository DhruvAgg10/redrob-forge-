import { NextRequest } from 'next/server'
import { chat, hasLLM } from '@/lib/llm'

type Msg = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
  const { challengeTitle, rubric, history, candidateAnswer, turn } = await req.json() as {
    challengeTitle: string
    rubric?: any
    history: Msg[]
    candidateAnswer: string
    turn: number
  }

  if (!hasLLM()) {
    const fallbacks = [
      'Interesting. How would your design handle a 10x traffic spike?',
      'What would you have done differently with one more week?',
      'Where do you think this solution will break first in production?',
      'Walk me through how you decided that trade-off.',
      'How did you choose between consistency and availability there?',
    ]
    if (turn >= 5) {
      const score = 65 + Math.floor(Math.random() * 30)
      return Response.json({ message: '', final: true, score, summary: 'Candidate showed solid trade-off awareness. (mock — set HF_TOKEN for real evaluation.)' })
    }
    return Response.json({ message: fallbacks[turn % fallbacks.length], final: false })
  }

  const system = `You are a senior engineer conducting a 15-minute defence interview about: "${challengeTitle}". Rubric: ${JSON.stringify(rubric || {})}.

Probe specific decisions. Ask ONE focused question, under 30 words. No preamble.

This is turn ${turn} of 5. If turn >= 5, respond with ONLY a single JSON line: {"final": true, "score": <0-100>, "summary": "<two sentences>"} — nothing else.`

  try {
    const text = await chat(
      [
        { role: 'system', content: system },
        ...((history || []).map((m) => ({ role: m.role, content: m.content }))),
        { role: 'user', content: candidateAnswer },
      ],
      { maxTokens: 300 }
    )

    const lastLine = text.split('\n').filter(Boolean).pop() || ''
    if (lastLine.startsWith('{') && lastLine.includes('"final"')) {
      try {
        const parsed = JSON.parse(lastLine)
        return Response.json({ message: '', final: true, score: parsed.score, summary: parsed.summary })
      } catch {}
    }
    return Response.json({ message: text, final: false })
  } catch (e: any) {
    return Response.json({ message: `(LLM error: ${String(e.message || e).slice(0, 120)})`, final: false }, { status: 200 })
  }
}
