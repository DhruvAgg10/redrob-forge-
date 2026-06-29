#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function normalizeEnv(value) {
  const cleaned = (value || '').trim()
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    return cleaned.slice(1, -1).trim()
  }
  return cleaned
}

// Resolve the best available postgres URL (Neon provides provider-specific vars).
const resolvedUrl = normalizeEnv(
  process.env.DATABASE_POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL
)
process.env.DATABASE_URL = resolvedUrl
process.env.DATABASE_PROVIDER = normalizeEnv(process.env.DATABASE_PROVIDER)

const schema = process.env.DATABASE_PROVIDER === 'sqlite' || (!process.env.DATABASE_PROVIDER && !resolvedUrl)
  ? 'prisma/schema.sqlite.prisma'
  : 'prisma/schema.prisma'

console.log(`[prisma-setup] Using schema: ${schema}`)
execSync(`npx prisma generate --schema ${schema}`, { stdio: 'inherit' })

if (fs.existsSync(path.join(__dirname, '..', 'prisma', 'dev.db'))) {
  console.log('[prisma-setup] Existing SQLite db found; skipping push.')
}
