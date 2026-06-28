#!/usr/bin/env node
// Resilient Vercel build: skips DB steps if DATABASE_URL is missing/invalid.
const { execSync } = require('child_process')

const url = process.env.DATABASE_URL || ''
const isRealPostgres = /^postgres(ql)?:\/\//.test(url) && !url.includes('placeholder')

if (!isRealPostgres) {
  console.log('[forge build] DATABASE_URL not set or invalid — using placeholder for Prisma schema validation only.')
  console.log('[forge build] Skipping `prisma db push` and seed. Connect Postgres in Vercel Storage and redeploy.')
  process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder'
  execSync('prisma generate', { stdio: 'inherit' })
  execSync('next build', { stdio: 'inherit' })
} else {
  console.log('[forge build] Real DATABASE_URL detected. Running full setup: generate → db push → seed → build.')
  execSync('prisma generate', { stdio: 'inherit' })
  execSync('prisma db push --accept-data-loss', { stdio: 'inherit' })
  try {
    execSync('tsx prisma/seed.ts', { stdio: 'inherit' })
  } catch (e) {
    console.warn('[forge build] Seed failed (continuing anyway):', e.message)
  }
  execSync('next build', { stdio: 'inherit' })
}
