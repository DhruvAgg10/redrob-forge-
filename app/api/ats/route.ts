import { NextRequest } from 'next/server'
import { chat, hasLLM } from '@/lib/llm'

const STOPWORDS = new Set('a an and the of to in for on with from by at as is are be been being or if but it this that these those we you they our your their i my me he she his her them us at into about across after before over under between within without not no so do does did doing have has had having will would can could should may might must shall let lets'.split(' '))
const ACTION_VERBS = ['led','built','designed','launched','shipped','grew','scaled','reduced','increased','optimized','negotiated','closed','drove','managed','owned','architected','delivered','implemented','automated','spearheaded','mentored','orchestrated','partnered','presented','published','researched','analyzed','synthesized','prioritized','executed','validated','prototyped','tested','migrated','refactored','onboarded','recruited','hired','trained','authored']

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
}

function extractKeywords(jd: string): string[] {
  // Extract noun-like tokens, bigrams, and tech/skill-looking patterns
  const text = jd.toLowerCase()
  const single = Array.from(new Set(tokenize(jd))).filter((w) => /[a-z]/.test(w))

  // Bigrams of capitalised pairs (likely tech / product names)
  const bigrams = new Set<string>()
  const lower = text.replace(/[^a-z0-9+#./\s-]/g, ' ').split(/\s+/).filter(Boolean)
  for (let i = 0; i < lower.length - 1; i++) {
    const a = lower[i], b = lower[i + 1]
    if (!STOPWORDS.has(a) && !STOPWORDS.has(b) && a.length > 2 && b.length > 2) {
      bigrams.add(`${a} ${b}`)
    }
  }

  // Rank by frequency in JD
  const freq: Record<string, number> = {}
  for (const w of tokenize(jd)) freq[w] = (freq[w] || 0) + 1

  const ranked = single
    .filter((w) => freq[w] >= 1)
    .sort((a, b) => freq[b] - freq[a])
    .slice(0, 25)

  return Array.from(new Set([...ranked, ...Array.from(bigrams).slice(0, 8)]))
}

function score(resume: string, jd: string) {
  const resumeTokens = new Set(tokenize(resume))
  const resumeText = resume.toLowerCase()
  const keywords = jd.trim() ? extractKeywords(jd) : []
  const hits: string[] = []
  const misses: string[] = []
  for (const kw of keywords) {
    if (resumeText.includes(kw)) hits.push(kw)
    else misses.push(kw)
  }

  const keywordScore = keywords.length === 0 ? 70 : Math.round((hits.length / keywords.length) * 100)

  // Action verbs
  const verbsFound = ACTION_VERBS.filter((v) => resumeText.includes(v + ' ') || resumeText.includes(v + 'ed') || resumeTokens.has(v))
  const verbScore = Math.min(100, verbsFound.length * 8)

  // Quantification: count numbers/percent/$/Rs
  const numbers = (resume.match(/\b\d+(\.\d+)?%?|\b\d+x\b|\brs\.?\s?\d+|\$\d+/gi) || []).length
  const quantScore = Math.min(100, numbers * 10)

  // Formatting flags
  const flags: { ok: boolean; label: string }[] = []
  flags.push({ ok: resume.length > 800, label: 'Length 800+ chars' })
  flags.push({ ok: /\n[•\-*]/.test(resume) || /\n\s*[-*]/.test(resume), label: 'Uses bullet points' })
  flags.push({ ok: !/page \d+ of \d+/i.test(resume), label: 'No page numbers in text (often a parser issue)' })
  flags.push({ ok: !/[│║┃▌▍▎▏]/.test(resume), label: 'No box-drawing characters (ATS-unfriendly tables)' })
  flags.push({ ok: /\b(20\d{2})\b/.test(resume), label: 'Contains years (20xx)' })
  flags.push({ ok: /\b(?:\w+@\w+\.\w+|\+91|\(\d{3}\))/i.test(resume), label: 'Contact info present' })

  const formatScore = Math.round((flags.filter((f) => f.ok).length / flags.length) * 100)

  // Weighted total
  const total = jd.trim()
    ? Math.round(keywordScore * 0.45 + verbScore * 0.2 + quantScore * 0.15 + formatScore * 0.2)
    : Math.round(verbScore * 0.4 + quantScore * 0.3 + formatScore * 0.3)

  return {
    total,
    breakdown: {
      keyword: { score: keywordScore, hits, misses, weight: jd.trim() ? 45 : 0 },
      actionVerbs: { score: verbScore, found: verbsFound, weight: jd.trim() ? 20 : 40 },
      quantification: { score: quantScore, count: numbers, weight: jd.trim() ? 15 : 30 },
      formatting: { score: formatScore, flags, weight: jd.trim() ? 20 : 30 },
    },
  }
}

export async function POST(req: NextRequest) {
  const { resume, jd } = await req.json() as { resume: string; jd: string }
  if (!resume?.trim()) return Response.json({ error: 'Resume text required' }, { status: 400 })

  const result = score(resume, jd || '')

  let suggestions = ''
  if (hasLLM()) {
    try {
      const system = `You are an ATS resume specialist for Indian MBA hires. Given a resume, a job description, and an automated score breakdown, write 3 surgically specific suggestions (each one sentence, action-oriented, naming the actual missing keyword/section). No fluff. Return JSON: {"suggestions": ["...", "...", "..."]}`
      const user = `JD:\n${(jd || '(none provided)').slice(0, 2000)}\n\nResume:\n${resume.slice(0, 4000)}\n\nScore: ${result.total}\nMissed keywords: ${result.breakdown.keyword.misses.slice(0, 12).join(', ')}\nAction-verb count: ${result.breakdown.actionVerbs.found.length}\nQuantified bullets: ${result.breakdown.quantification.count}`
      const text = await chat([{ role: 'system', content: system }, { role: 'user', content: user }], { maxTokens: 300, temperature: 0.4 })
      const match = text.match(/\{[\s\S]*\}/)
      if (match) suggestions = JSON.stringify(JSON.parse(match[0]))
    } catch {}
  }

  return Response.json({ ...result, suggestions })
}
