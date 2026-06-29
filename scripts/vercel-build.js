#!/usr/bin/env node
// Resilient Vercel build: picks the proper Prisma schema for SQLite or Postgres and skips DB steps when needed.
const { execSync } = require('child_process')

function normalizeEnv(value) {
  const cleaned = (value || '').trim()
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    return cleaned.slice(1, -1).trim()
  }
  return cleaned
}

process.env.DATABASE_URL = normalizeEnv(process.env.DATABASE_URL)
process.env.DATABASE_PROVIDER = normalizeEnv(process.env.DATABASE_PROVIDER)

const provider = (process.env.DATABASE_PROVIDER || '').toLowerCase()
// Check all possible postgres URL sources — prefer Neon's Prisma-specific URL.
const url = process.env.DATABASE_POSTGRES_PRISMA_URL ||
            process.env.POSTGRES_PRISMA_URL ||
            process.env.DATABASE_URL || ''
// For db push we need the direct (non-pooling) connection — PgBouncer doesn't support DDL.
const directUrl = process.env.DATABASE_POSTGRES_NON_POOLING ||
                  process.env.POSTGRES_URL_NON_POOLING ||
                  process.env.DATABASE_URL_UNPOOLED ||
                  process.env.DATABASE_URL || ''
const isRealPostgres = /^postgres(ql)?:\/\//.test(url) && !url.includes('placeholder')
const isSqlite = provider === 'sqlite' || url.startsWith('file:')
const schema = isSqlite || (!provider && !isRealPostgres && !url)
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
  execSync(`npx prisma generate --schema ${schema}`, { stdio: 'inherit' })
  execSync('npx next build', { stdio: 'inherit' })
} else {
  console.log('[forge build] Real DATABASE_URL detected. Running full setup: generate → db push → seed → build.')
  execSync(`npx prisma generate --schema ${schema}`, { stdio: 'inherit' })
  // Use the direct (non-pooling) URL for db push — PgBouncer in transaction mode blocks DDL.
  try {
    execSync(`npx prisma db push --schema ${schema} --accept-data-loss`, { stdio: 'inherit', env: { ...process.env, DATABASE_URL: directUrl } })
  } catch (e) {
    console.warn('[forge build] db push failed (continuing anyway — schema may already be up to date):', e.message)
  }
  try {
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' })
  } catch (e) {
    console.warn('[forge build] Seed failed (continuing anyway):', e.message)
  }
  execSync('npx next build', { stdio: 'inherit' })
}
