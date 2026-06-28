#!/usr/bin/env node
// Resilient Vercel build: picks the proper Prisma schema for SQLite or Postgres and skips DB steps when needed.
const { execSync } = require('child_process')

const provider = (process.env.DATABASE_PROVIDER || '').toLowerCase()
const url = process.env.DATABASE_URL || ''
const isRealPostgres = /^postgres(ql)?:\/\//.test(url) && !url.includes('placeholder')
const schema = provider === 'sqlite' || (!provider && !isRealPostgres && url.startsWith('file:'))
  ? 'prisma/schema.sqlite.prisma'
  : 'prisma/schema.prisma'

if (!isRealPostgres) {
  console.log('[forge build] DATABASE_URL not set or invalid — using a build-safe Prisma setup.')
  console.log(`[forge build] Using schema: ${schema}`)
  if (schema.includes('sqlite')) {
    process.env.DATABASE_URL = 'file:./dev.db'
  } else {
    process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder'
  }
  execSync(`prisma generate --schema ${schema}`, { stdio: 'inherit' })
  execSync('next build', { stdio: 'inherit' })
} else {
  console.log('[forge build] Real DATABASE_URL detected. Running full setup: generate → db push → seed → build.')
  execSync(`prisma generate --schema ${schema}`, { stdio: 'inherit' })
  execSync(`prisma db push --schema ${schema} --accept-data-loss`, { stdio: 'inherit' })
  try {
    execSync('tsx prisma/seed.ts', { stdio: 'inherit' })
  } catch (e) {
    console.warn('[forge build] Seed failed (continuing anyway):', e.message)
  }
  execSync('next build', { stdio: 'inherit' })
}
