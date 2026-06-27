// One-shot precompute: generate personas, run survey, save JSON files in data/survey/.
// Usage: HF_TOKEN=... npx tsx scripts/run-conjoint.ts

import fs from 'fs'
import path from 'path'
import { generatePersonas } from '../lib/conjoint/personas'
import { generateTasksForPersona } from '../lib/conjoint/design'
import { runBatch } from '../lib/conjoint/runner'

async function main() {
  const token = process.env.HF_TOKEN
  if (!token) { console.error('Set HF_TOKEN env var'); process.exit(1) }

  const N = Number(process.env.N || 100)
  const TASKS_PER_PERSONA = Number(process.env.T || 8)

  console.log(`Generating ${N} personas, ${TASKS_PER_PERSONA} tasks each, 2 models...`)
  const personas = generatePersonas(N)
  const tasksByPersona = personas.map((p) => ({ personaId: p.id, tasks: generateTasksForPersona(p.id, TASKS_PER_PERSONA) }))

  const jobs: { persona: any; task: any; model: 'llama' | 'qwen' }[] = []
  for (const p of personas) {
    const tasks = tasksByPersona.find((t) => t.personaId === p.id)!.tasks
    for (const t of tasks) {
      jobs.push({ persona: p, task: t, model: 'llama' })
      jobs.push({ persona: p, task: t, model: 'qwen' })
    }
  }
  console.log(`Total LLM calls: ${jobs.length}`)

  const start = Date.now()
  const results = await runBatch(token, jobs, 8, (done, total) => {
    if (done % 50 === 0 || done === total) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(0)
      console.log(`  ${done}/${total} (${elapsed}s)`)
    }
  })

  const outDir = path.join(process.cwd(), 'data', 'survey')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'personas.json'), JSON.stringify(personas, null, 2))
  fs.writeFileSync(path.join(outDir, 'tasks.json'), JSON.stringify(tasksByPersona, null, 2))
  fs.writeFileSync(path.join(outDir, 'responses.json'), JSON.stringify(results, null, 2))

  // Quick sanity stats
  const total = results.length
  const aCount = results.filter((r) => r.choice === 'A').length
  const bCount = results.filter((r) => r.choice === 'B').length
  const noneCount = results.filter((r) => r.choice === 'None').length
  const errCount = results.filter((r) => r.reason.startsWith('ERR:')).length

  console.log(`\nDone. Saved to ${outDir}`)
  console.log(`Total responses: ${total}`)
  console.log(`  A: ${aCount} (${(aCount/total*100).toFixed(1)}%)`)
  console.log(`  B: ${bCount} (${(bCount/total*100).toFixed(1)}%)`)
  console.log(`  None: ${noneCount} (${(noneCount/total*100).toFixed(1)}%)`)
  console.log(`  Errors: ${errCount}`)
  console.log(`Total elapsed: ${((Date.now()-start)/1000).toFixed(1)}s`)
}

main().catch((e) => { console.error(e); process.exit(1) })
