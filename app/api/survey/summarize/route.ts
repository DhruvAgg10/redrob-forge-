import { prisma } from '@/lib/prisma'
import { chat, hasLLM } from '@/lib/llm'

async function loadResponses() {
  let rows: any[] = []
  try {
    rows = await prisma.surveyResponse.findMany({ orderBy: { submittedAt: 'desc' } })
  } catch {
    return []
  }
  return rows.map((r) => ({
    name: r.name || 'Anonymous',
    city: r.city,
    state: r.state,
    age: r.age,
    income: r.income,
    role: r.role,
    goal: r.goal,
    maxWTP: r.maxWTP,
    quote: r.quote,
    bundleChoices: (() => { try { return JSON.parse(r.choices).map((c: any) => c.choice).join('-') } catch { return '' } })(),
  }))
}

async function buildSummary(responses: any[]): Promise<string> {
  if (responses.length === 0) return 'No responses yet — be the first to take the survey.'

  if (!hasLLM()) {
    const wtps = responses.map((r) => r.maxWTP).filter((w) => typeof w === 'number').sort((a, b) => a - b)
    const median = wtps[Math.floor(wtps.length / 2)] || 0
    return `${responses.length} respondents · median max WTP ₹${median} · (HF token not set for AI summary)`
  }

  const system = `You are a market research analyst summarizing live pricing survey responses for Forge — a credential-verification subscription product targeting Indian MBA / IT professionals.

Write 80-140 words. Be NUMBERS-FIRST, opinionated, and specific. Reference actual respondents by name + city where notable. Surface:
1. The modal max-WTP band
2. Strongest segment patterns (by income / role / goal)
3. Most striking qualitative quote
4. One actionable pricing recommendation

Do not use bullet points or markdown — pure prose. Start with the headline number.`

  try {
    const text = await chat([
      { role: 'system', content: system },
      { role: 'user', content: `Respondents (n=${responses.length}):\n${JSON.stringify(responses, null, 2)}` },
    ], { maxTokens: 300, temperature: 0.5 })
    return text
  } catch (e: any) {
    return `n=${responses.length} responses · summary error: ${String(e.message || e).slice(0, 100)}`
  }
}

async function safeUpsert(summary: string, responseCount: number) {
  try {
    await prisma.surveySummary.upsert({
      where: { id: 1 },
      create: { id: 1, summary, responseCount },
      update: { summary, responseCount, generatedAt: new Date() },
    })
  } catch {}
}

export async function POST() {
  const responses = await loadResponses()
  const summary = await buildSummary(responses)
  await safeUpsert(summary, responses.length)
  return Response.json({ summary, responseCount: responses.length, generatedAt: new Date().toISOString() })
}

export async function GET() {
  try {
    const cached = await prisma.surveySummary.findUnique({ where: { id: 1 } })
    if (cached) {
      return Response.json({
        summary: cached.summary,
        responseCount: cached.responseCount,
        generatedAt: cached.generatedAt.toISOString(),
      })
    }
  } catch {
    return Response.json({ summary: '', responseCount: 0 })
  }
  const responses = await loadResponses()
  const summary = await buildSummary(responses)
  await safeUpsert(summary, responses.length)
  return Response.json({ summary, responseCount: responses.length, generatedAt: new Date().toISOString() })
}
