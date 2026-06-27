import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import skills from '../data/skills.json'
import careerPaths from '../data/careerPaths.json'
import challengeTemplates from '../data/challengeTemplates.json'

const prisma = new PrismaClient()

const COMPANIES = [
  { name: 'NimbusPay', domain: 'nimbuspay.in', industry: 'FinTech' },
  { name: 'KisanGrid', domain: 'kisangrid.com', industry: 'AgriTech' },
  { name: 'Suchak Labs', domain: 'suchaklabs.io', industry: 'AI Infra' },
  { name: 'Vajra Health', domain: 'vajra.health', industry: 'HealthTech' },
  { name: 'Bharat Logistics', domain: 'bharatlogistics.in', industry: 'Logistics' },
  { name: 'Saraswati Learn', domain: 'saraswati.edu', industry: 'EdTech' },
  { name: 'Khadi Direct', domain: 'khadidirect.com', industry: 'D2C' },
  { name: 'Arya Capital', domain: 'aryacapital.in', industry: 'FinTech' },
  { name: 'Nila Foods', domain: 'nilafoods.in', industry: 'D2C' },
  { name: 'Pravaha Cloud', domain: 'pravaha.cloud', industry: 'SaaS' },
]

function openBadge3JsonLd(user: any, skill: any) {
  return {
    '@context': [
      'https://www.w3.org/ns/credentials/v2',
      'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
    ],
    type: ['VerifiableCredential', 'OpenBadgeCredential'],
    issuer: {
      id: process.env.NEXT_PUBLIC_FORGE_ISSUER_DID || 'did:web:forge.redrob.ai',
      type: ['Profile'],
      name: 'Redrob Forge',
    },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: user.did,
      type: ['AchievementSubject'],
      achievement: {
        id: `https://forge.redrob.ai/skills/${skill.slug}`,
        type: ['Achievement'],
        name: skill.name,
        description: skill.description,
        criteria: { narrative: `Passed adaptive assessment for ${skill.name}` },
      },
    },
  }
}

async function main() {
  // Idempotent — skip if already populated. (Survey responses live in their own table.)
  const existing = await prisma.user.count().catch(() => 0)
  if (existing > 0) {
    console.log(`DB already has ${existing} users — skipping seed.`)
    return
  }
  console.log('Empty DB — seeding...')

  console.log('Seeding skills...')
  for (const s of skills) {
    await prisma.skill.create({ data: s as any })
  }

  console.log('Seeding role transitions...')
  for (const t of (careerPaths as any).transitions) {
    await prisma.roleTransition.create({
      data: { ...t, requiredSkills: JSON.stringify(t.requiredSkills) },
    })
  }

  console.log('Seeding companies...')
  const companies = []
  for (const c of COMPANIES) {
    companies.push(
      await prisma.company.create({
        data: {
          name: c.name,
          domain: c.domain,
          industry: c.industry,
          mcaVerified: true,
          gstVerified: true,
          trustScore: faker.number.int({ min: 70, max: 95 }),
        },
      })
    )
  }

  console.log('Seeding candidates...')
  const allSkills = await prisma.skill.findMany()
  const candidates = []
  for (let i = 0; i < 80; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        fullName: faker.person.fullName(),
        avatarUrl: `https://i.pravatar.cc/150?u=${i}`,
        did: `did:web:forge.redrob.ai:user:${faker.string.uuid()}`,
        role: 'CANDIDATE',
        aadhaarVerified: faker.datatype.boolean({ probability: 0.85 }),
        digiLockerLinked: faker.datatype.boolean({ probability: 0.7 }),
        uanVerified: faker.datatype.boolean({ probability: 0.6 }),
        trustScore: faker.number.int({ min: 50, max: 95 }),
      },
    })
    candidates.push(user)

    const skillCount = faker.number.int({ min: 2, max: 6 })
    const sampleSkills = faker.helpers.arrayElements(allSkills, skillCount)
    for (const sk of sampleSkills) {
      await prisma.credential.create({
        data: {
          userId: user.id,
          type: 'SKILL',
          skillId: sk.id,
          level: faker.number.int({ min: 1, max: 5 }),
          jsonld: JSON.stringify(openBadge3JsonLd(user, sk)),
          signature: 'demo-sig-' + faker.string.alphanumeric(64),
          issuedAt: faker.date.past({ years: 1 }),
        },
      })
    }
  }

  console.log('Seeding recruiters...')
  for (const c of companies.slice(0, 5)) {
    for (let i = 0; i < 2; i++) {
      await prisma.user.create({
        data: {
          email: `recruiter${i}@${c.domain}`,
          fullName: faker.person.fullName(),
          avatarUrl: `https://i.pravatar.cc/150?u=rec${c.id}${i}`,
          did: `did:web:forge.redrob.ai:user:${faker.string.uuid()}`,
          role: 'RECRUITER',
          companyId: c.id,
          aadhaarVerified: true,
          trustScore: faker.number.int({ min: 75, max: 95 }),
        },
      })
    }
  }

  console.log('Seeding challenges...')
  const skillBySlug = Object.fromEntries(allSkills.map((s) => [s.slug, s]))
  for (let i = 0; i < 20; i++) {
    const company = faker.helpers.arrayElement(companies)
    const template = faker.helpers.arrayElement(challengeTemplates) as any
    const ch = await prisma.challenge.create({
      data: {
        companyId: company.id,
        title: template.title,
        brief: template.brief,
        roleFamily: template.roleFamily,
        templateId: template.id,
        mode: faker.helpers.arrayElement(['OPEN', 'CLOSED']),
        ndaRequired: true,
        stipendINR: faker.helpers.arrayElement([15000, 20000, 25000, 35000, 50000]),
        maxApplicants: 50,
        status: faker.helpers.arrayElement(['OPEN', 'OPEN', 'OPEN', 'EVALUATING', 'TRIAL', 'CLOSED']),
        closingAt: faker.date.future(),
        rubric: JSON.stringify(template.rubric),
      },
    })
    for (const slug of template.prereqSkills || []) {
      const sk = skillBySlug[slug]
      if (sk) {
        await prisma.challengeRequirement.create({
          data: { challengeId: ch.id, skillId: sk.id, minLevel: faker.number.int({ min: 2, max: 4 }) },
        })
      }
    }
  }

  console.log('Seeding submissions...')
  const evaluatingChallenges = await prisma.challenge.findMany({
    where: { status: { in: ['EVALUATING', 'CLOSED', 'TRIAL'] } },
  })
  for (const ch of evaluatingChallenges) {
    const applicants = faker.helpers.arrayElements(candidates, faker.number.int({ min: 6, max: 20 }))
    let rank = 1
    for (const a of applicants) {
      await prisma.submission.create({
        data: {
          userId: a.id,
          challengeId: ch.id,
          artifactUrl: `https://github.com/forge-demo/${faker.lorem.slug()}`,
          aiScore: faker.number.float({ min: 50, max: 95, fractionDigits: 1 }),
          peerScore: faker.number.float({ min: 50, max: 95, fractionDigits: 1 }),
          defenceScore: faker.number.float({ min: 50, max: 95, fractionDigits: 1 }),
          compositeRank: rank,
          shortlisted: rank <= 5,
        },
      })
      rank++
    }
  }

  const stats = {
    candidates: await prisma.user.count({ where: { role: 'CANDIDATE' } }),
    recruiters: await prisma.user.count({ where: { role: 'RECRUITER' } }),
    companies: await prisma.company.count(),
    skills: await prisma.skill.count(),
    credentials: await prisma.credential.count(),
    challenges: await prisma.challenge.count(),
    submissions: await prisma.submission.count(),
    roleTransitions: await prisma.roleTransition.count(),
  }
  console.log('Seed complete:', stats)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
