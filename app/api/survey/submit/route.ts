import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const profile = body.profile || {}

  const count = await prisma.surveyResponse.count()
  const publicId = 'R' + String(count + 1).padStart(3, '0')

  const created = await prisma.surveyResponse.create({
    data: {
      publicId,
      name: body.name || null,
      city: body.city || '',
      state: profile.state || '',
      age: profile.age || '',
      income: profile.income || '',
      role: profile.role || '',
      goal: profile.goal || '',
      choices: JSON.stringify(body.choices || []),
      maxWTP: typeof body.maxWTP === 'number' ? body.maxWTP : null,
      quote: body.quote || '',
    },
  })
  return Response.json({ ok: true, id: created.publicId, total: count + 1 })
}

export async function GET() {
  const rows = await prisma.surveyResponse.findMany({ orderBy: { submittedAt: 'desc' } })
  const responses = rows.map((r) => ({
    id: r.publicId,
    submittedAt: r.submittedAt.toISOString(),
    name: r.name,
    city: r.city,
    profile: { state: r.state, age: r.age, income: r.income, role: r.role, goal: r.goal },
    choices: JSON.parse(r.choices),
    maxWTP: r.maxWTP,
    quote: r.quote,
  }))
  return Response.json({ responses, count: responses.length })
}
