import { NextRequest } from 'next/server'
import { chat, hasLLM } from '@/lib/llm'

export async function POST(req: NextRequest) {
  const { question, postContext } = await req.json() as { question: string; postContext?: string }
  if (!hasLLM()) {
    return Response.json({ answer: 'Set HF_TOKEN to get a real AI answer from the community room.' })
  }
  const system = `You are the Forge Room AI — a thoughtful, MBA-pipeline-aware community assistant. The user is in a community of ambitious Indian professionals (consultants, PMs, founders, B-school students).
Give specific, opinionated answers. 80-150 words. End with a single follow-up question to provoke further discussion.${postContext ? `\n\nDiscussion thread context:\n${postContext}` : ''}`
  try {
    const answer = await chat([
      { role: 'system', content: system },
      { role: 'user', content: question },
    ], { maxTokens: 400, temperature: 0.7 })
    return Response.json({ answer })
  } catch (e: any) {
    return Response.json({ answer: 'Room AI is offline — ' + String(e.message || e) })
  }
}
