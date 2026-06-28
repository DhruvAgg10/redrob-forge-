#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const schema = process.env.DATABASE_PROVIDER === 'sqlite' || (!process.env.DATABASE_PROVIDER && !process.env.DATABASE_URL)
  ? 'prisma/schema.sqlite.prisma'
  : 'prisma/schema.prisma'

console.log(`[prisma-setup] Using schema: ${schema}`)
execSync(`npx prisma generate --schema ${schema}`, { stdio: 'inherit' })

if (fs.existsSync(path.join(__dirname, '..', 'prisma', 'dev.db'))) {
  console.log('[prisma-setup] Existing SQLite db found; skipping push.')
}
