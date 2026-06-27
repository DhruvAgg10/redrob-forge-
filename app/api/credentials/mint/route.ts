import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mintCredential } from '@/lib/credentials'
import studio from '@/data/skillStudio.json'

async function demoUser() {
  return prisma.user.findFirst({ where: { role: 'CANDIDATE' } })
}

export async function POST(req: NextRequest) {
  const { skillSlug, level } = await req.json()
  const user = await demoUser()
  if (!user) return Response.json({ error: 'No demo user' }, { status: 500 })

  // First try existing skill graph
  let skill = await prisma.skill.findUnique({ where: { slug: skillSlug } })

  // Otherwise treat as a Skill Studio exercise and create-on-the-fly
  if (!skill) {
    const ex = (studio as any[]).find((s) => s.slug === skillSlug)
    if (ex) {
      skill = await prisma.skill.create({
        data: {
          slug: ex.slug,
          name: ex.name,
          category: 'Skill Studio',
          description: ex.blurb,
        },
      })
    }
  }

  const cred = await mintCredential({
    userId: user.id,
    type: 'SKILL',
    skillId: skill?.id,
    level: level || 1,
  })
  return Response.json({ id: cred.id })
}
