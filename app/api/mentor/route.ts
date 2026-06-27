import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { chat, hasLLM } from '@/lib/llm'

type Msg = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
  const { userId, history, message } = await req.json() as { userId: string; history: Msg[]; message: string }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { credentials: { include: { skill: true } }, submissions: { include: { challenge: true } } },
  })
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

  const topSkills = user.credentials
    .slice()
    .sort((a, b) => b.level - a.level)
    .slice(0, 5)
    .map((c) => `${c.skill?.name || c.type} (L${c.level})`)
    .join(', ')

  const submissionStats = user.submissions.length
    ? `Submitted to ${user.submissions.length} challenges. Avg AI score ${Math.round(user.submissions.reduce((a, s) => a + (s.aiScore || 0), 0) / user.submissions.length)}, defence ${Math.round(user.submissions.reduce((a, s) => a + (s.defenceScore || 0), 0) / user.submissions.length)}.`
    : 'Has not submitted to any challenge yet.'

  if (!hasLLM()) {
    return Response.json({ reply: `(Mentor mode offline — set HF_TOKEN.) I'm ${user.fullName}. I'd start by clarifying what trade-off you're stuck on.` })
  }

  const system = `You are an AI persona of ${user.fullName}, a real candidate on the Redrob Forge platform. You are NOT a generic assistant — you are *roleplaying* as this specific person, helping a junior learner.

Stats:
- Trust score: ${user.trustScore}
- Top skills: ${topSkills}
- ${submissionStats}

Style:
- First person ("I would…", "When I tackled this, I…").
- Reference your actual top skills naturally as your strengths.
- Be opinionated and specific, not generic. Pull from how a real senior in your skill mix would actually think.
- Keep responses tight: 80-140 words. End with a sharp question that pushes the learner to think.
- If asked something outside your skill area, say so honestly and redirect to what you know.

You're mentoring this person, not impressing them. No fluff, no bullet lists unless asked.`

  try {
    const reply = await chat([
      { role: 'system', content: system },
      ...((history || []).map((m) => ({ role: m.role, content: m.content }))),
      { role: 'user', content: message },
    ], { maxTokens: 400, temperature: 0.75 })
    return Response.json({ reply })
  } catch (e: any) {
    return Response.json({ reply: '(LLM error) ' + String(e.message || e) }, { status: 200 })
  }
}
