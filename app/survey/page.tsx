import fs from 'fs'
import path from 'path'
import { SurveyExplorer } from '@/components/SurveyExplorer'
import { DEFAULT_AB_TESTS, runAbTest } from '@/lib/conjoint/abtests'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function SurveyPage() {
  const dir = path.join(process.cwd(), 'data', 'survey')
  let personas: any[] = [], tasks: any[] = [], responses: any[] = [], results: any = null
  let llmSamples: any[] = []

  try {
    personas = JSON.parse(fs.readFileSync(path.join(dir, 'personas.json'), 'utf8'))
    tasks = JSON.parse(fs.readFileSync(path.join(dir, 'tasks.json'), 'utf8'))
    responses = JSON.parse(fs.readFileSync(path.join(dir, 'responses.json'), 'utf8'))
    results = JSON.parse(fs.readFileSync(path.join(dir, 'results.json'), 'utf8'))
  } catch (e) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display italic text-3xl">Survey data not generated yet.</h1>
        <p className="text-[#6B7280] mt-2 text-sm">Synthetic study data missing — bundle data/survey/*.json files with the repo.</p>
      </div>
    )
  }

  // LLM validation samples (optional)
  try {
    llmSamples = JSON.parse(fs.readFileSync(path.join(dir, 'llm-validation-samples.json'), 'utf8'))
  } catch {}

  // Real responses come from the database
  let realResponses: any[] = []
  try {
    const rows = await prisma.surveyResponse.findMany({ orderBy: { submittedAt: 'desc' } })
    realResponses = rows.map((r) => ({
      id: r.publicId,
      submittedAt: r.submittedAt.toISOString(),
      name: r.name,
      city: r.city,
      profile: { state: r.state, age: r.age, income: r.income, role: r.role, goal: r.goal },
      choices: (() => { try { return JSON.parse(r.choices) } catch { return [] } })(),
      maxWTP: r.maxWTP,
      quote: r.quote,
    }))
  } catch (e) {
    // DB may not be reachable in some environments — gracefully degrade
    realResponses = []
  }

  // Run A/B tests on the personas
  const testDefs = DEFAULT_AB_TESTS()
  const abTests = testDefs.map((td, i) => runAbTest(personas, { ...td, seed: i + 1 }))

  return <SurveyExplorer
    personas={personas}
    tasks={tasks}
    responses={responses}
    results={results}
    liveResearch={{ studyName: 'Live submissions', method: 'Open public survey via /survey/take', moderator: 'Self-administered', field: 'Real-time' }}
    abTests={abTests}
    llmSamples={llmSamples}
    realResponses={realResponses}
  />
}
