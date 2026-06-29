import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient | ReturnType<typeof createPrismaFallback> }

function normalizeEnv(value: string | undefined) {
  const cleaned = (value || '').trim()
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    return cleaned.slice(1, -1).trim()
  }
  return cleaned
}

// Prefer Neon/Supabase Prisma-specific URL when available — it has pgbouncer=true pre-configured.
// Falls back to DATABASE_URL if the provider-specific var isn't present.
let databaseUrl = normalizeEnv(
  process.env.DATABASE_POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL
)
const databaseProvider = normalizeEnv(process.env.DATABASE_PROVIDER).toLowerCase()

// In serverless (Vercel), each cold-start opens a new connection.
// Limit to 1 connection per instance to avoid exhausting the pool.
if (databaseUrl && /^postgres(ql)?:\/\//i.test(databaseUrl)) {
  const sep = databaseUrl.includes('?') ? '&' : '?'
  if (!databaseUrl.includes('connection_limit')) {
    databaseUrl = `${databaseUrl}${sep}connection_limit=1&pool_timeout=0`
  }
}

process.env.DATABASE_URL = databaseUrl
process.env.DATABASE_PROVIDER = databaseProvider
export const dbAvailable = /^postgres(ql)?:\/\//i.test(databaseUrl) || databaseProvider === 'sqlite' || databaseUrl.startsWith('file:')

function createPrismaFallback() {
  const throwDbError = () => {
    throw new Error('Database not connected or DATABASE_URL is invalid.')
  }

  const handler: ProxyHandler<any> = {
    get(_, prop) {
      if (prop === '$connect' || prop === '$disconnect') {
        return async () => {}
      }
      if (prop === '$on') {
        return () => {}
      }
      if (prop === '$transaction') {
        return async () => []
      }
      if (prop === 'isFallback') {
        return true
      }
      return new Proxy(throwDbError, {
        get: () => throwDbError,
        apply: throwDbError,
      })
    },
  }

  return new Proxy({}, handler)
}

const prismaClient = dbAvailable
  ? new PrismaClient({
      log: ['error', 'warn'],
    })
  : createPrismaFallback()

// Cast to PrismaClient so strict-mode TypeScript accepts prisma.user.findFirst() etc.
// At runtime this may be the fallback proxy — callers guard with (prisma as any).isFallback.
export const prisma = (globalForPrisma.prisma || prismaClient) as PrismaClient

// Cache the singleton in global to survive Next.js hot-reloads (dev) and module re-evals (prod).
if (!(globalForPrisma.prisma as any)?.isFallback) {
  globalForPrisma.prisma = prisma as any
}
