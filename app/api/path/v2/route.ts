import { NextRequest } from 'next/server'
import { chat, hasLLM } from '@/lib/llm'

export async function POST(req: NextRequest) {
  const { resume, goal } = await req.json() as { resume: string; goal: string }

  if (!resume?.trim() || !goal?.trim()) {
    return Response.json({ error: 'Need resume and goal' }, { status: 400 })
  }

  if (!hasLLM()) {
    // deterministic fallback (so UI never breaks)
    return Response.json({
      current: { role: 'Generalist', yearsExp: 2, domain: 'Unknown', notable: [] },
      paths: [
        { id: 'p1', label: 'Direct route', summary: 'Set HF_TOKEN to see AI-generated paths.', nodes: [
          { role: 'Now', lpa: 12, years: 0, skillGap: [] },
          { role: goal, lpa: 40, years: 4, skillGap: ['strategy', 'leadership'] },
        ], totalYears: 4, totalLPAGain: 28, difficulty: 3 },
      ],
    })
  }

  const sys = `You are a senior career strategist for the Indian market.

Given a user's resume/background and target role, do TWO things:
1) Extract their current state: { "role": "<concise current title>", "yearsExp": <int>, "domain": "<industry>", "notable": ["<3-5 notable skills/themes>"] }
2) Generate 3 DISTINCT alternative paths to the target. Each path uses a different STRATEGY:
   - "Direct climb" — same function, internal promotion ladder
   - "Lateral pivot" — switch function once, leverage existing edge
   - "MBA/credential reset" — go through grad school or major certification to switch
   (If one of these doesn't fit, replace with another genuine alternative such as "Operator → Founder" or "Consultancy → Industry".)

Each path's nodes are role transitions, with realistic Indian-market LPA (in lakhs INR) and years. Be honest about LPA dips during pivots.

Return STRICT JSON ONLY, in this exact shape:
{
  "current": {"role": "...", "yearsExp": 0, "domain": "...", "notable": ["..."]},
  "paths": [
    {
      "id": "p1",
      "label": "Direct climb",
      "summary": "<one tight sentence on strategy + biggest risk>",
      "nodes": [
        {"role": "<role 1 = current>", "lpa": <int>, "years": 0, "skillGap": []},
        {"role": "<role 2>", "lpa": <int>, "years": <number>, "skillGap": ["..."]},
        {"role": "<final = goal>", "lpa": <int>, "years": <number>, "skillGap": ["..."]}
      ],
      "totalYears": <number>,
      "totalLPAGain": <int>,
      "difficulty": <1-5>
    },
    {"id": "p2", "label": "Lateral pivot", ...},
    {"id": "p3", "label": "MBA reset", ...}
  ]
}`

  const user = `Goal: ${goal}\n\nBackground (resume or freeform):\n${resume}`

  try {
    const text = await chat([
      { role: 'system', content: sys },
      { role: 'user', content: user },
    ], { maxTokens: 1800, temperature: 0.7 })

    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    const parsed = JSON.parse(match[0])
    return Response.json(parsed)
  } catch (e: any) {
    return Response.json({ error: String(e.message || e) }, { status: 500 })
  }
}
