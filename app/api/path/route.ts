import { NextRequest } from 'next/server'
import { generatePaths } from '@/lib/careerPath'

export async function POST(req: NextRequest) {
  const { goal, currentRole } = await req.json()
  const out = await generatePaths(goal || 'Senior PM at FinTech', currentRole)
  return Response.json(out)
}
