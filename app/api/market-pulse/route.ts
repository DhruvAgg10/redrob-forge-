import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { chat, hasLLM } from '@/lib/llm'

async function buildSnapshot() {
  const [
    totalCandidates, totalCompanies, totalChallenges, totalSubmissions, totalCredentials,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'CANDIDATE' } }),
    prisma.company.count(),
    prisma.challenge.count(),
    prisma.submission.count(),
    prisma.credential.count(),
  ])

  const challengesByIndustry = await prisma.challenge.findMany({ include: { company: true } })
  const industryCount: Record<string, number> = {}
  for (const ch of challengesByIndustry) {
    const k = ch.company.industry || 'Other'
    industryCount[k] = (industryCount[k] || 0) + 1
  }

  const challengesByRoleFamily: Record<string, number> = {}
  for (const ch of challengesByIndustry) {
    challengesByRoleFamily[ch.roleFamily] = (challengesByRoleFamily[ch.roleFamily] || 0) + 1
  }

  const credsBySkill = await prisma.credential.findMany({ include: { skill: true } })
  const skillCount: Record<string, number> = {}
  for (const c of credsBySkill) {
    const k = c.skill?.name || c.type
    skillCount[k] = (skillCount[k] || 0) + 1
  }
  const topSkills = Object.entries(skillCount).sort(([, a], [, b]) => b - a).slice(0, 10)

  const stipendBuckets = await prisma.challenge.groupBy({ by: ['stipendINR'], _count: { stipendINR: true } })

  return {
    totals: { totalCandidates, totalCompanies, totalChallenges, totalSubmissions, totalCredentials },
    challengesByIndustry: industryCount,
    challengesByRoleFamily,
    topCredentialedSkills: Object.fromEntries(topSkills),
    stipendDistribution: Object.fromEntries(stipendBuckets.map((b) => [b.stipendINR, b._count.stipendINR])),
  }
}

export async function POST(req: NextRequest) {
  const { question } = await req.json() as { question: string }
  const snapshot = await buildSnapshot()

  if (!hasLLM()) {
    return Response.json({
      answer: 'Set HF_TOKEN for an AI-driven answer.',
      chart: { title: 'Challenges by industry', bars: Object.entries(snapshot.challengesByIndustry).map(([k, v]) => ({ label: k, value: v })) },
    })
  }

  const system = `You are Market Pulse — a hiring-graph analyst for Redrob Forge.

You will receive a natural-language question and a live JSON snapshot of the platform. Answer in 60-120 words: tight, opinionated, NUMBERS-FIRST. Reference the snapshot data directly.

Then return a chart spec relevant to the question. Pick the best slice from the snapshot for visualisation.

Return STRICT JSON ONLY in this shape:
{
  "answer": "<60-120 word answer>",
  "chart": {
    "title": "<chart title>",
    "bars": [{"label": "<x>", "value": <number>}, ...]
  }
}

Snapshot:
${JSON.stringify(snapshot, null, 2)}`

  try {
    const text = await chat([
      { role: 'system', content: system },
      { role: 'user', content: question },
    ], { maxTokens: 800, temperature: 0.5 })
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    const parsed = JSON.parse(match[0])
    return Response.json(parsed)
  } catch (e: any) {
    return Response.json({
      answer: `(Market Pulse error) ${String(e.message || e)}`,
      chart: { title: 'Fallback: challenges by industry', bars: Object.entries(snapshot.challengesByIndustry).map(([k, v]) => ({ label: k, value: v })) },
    })
  }
}
