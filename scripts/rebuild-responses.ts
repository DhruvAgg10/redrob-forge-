// Combine: keep the LLM responses where they're valid (not ERR), simulate the rest.
import fs from 'fs'
import path from 'path'
import { simulateOne } from '../lib/conjoint/simulator'

async function main() {
  const dir = path.join(process.cwd(), 'data', 'survey')
  const personas = JSON.parse(fs.readFileSync(path.join(dir, 'personas.json'), 'utf8'))
  const tasksByPersona = JSON.parse(fs.readFileSync(path.join(dir, 'tasks.json'), 'utf8'))
  const llmResponses = JSON.parse(fs.readFileSync(path.join(dir, 'responses.json'), 'utf8'))

  // Build lookup: which (personaId, taskNum, model) had a valid LLM response
  const validLLM = new Map<string, any>()
  let llmValidCount = 0
  for (const r of llmResponses) {
    if (!r.reason.startsWith('ERR:')) {
      validLLM.set(`${r.personaId}-${r.taskNum}-${r.model}`, { ...r, source: 'llm' })
      llmValidCount++
    }
  }
  console.log(`Kept ${llmValidCount} valid LLM responses as validation samples`)

  // Personas + tasks index
  const tasksLookup = new Map<number, any[]>()
  for (const t of tasksByPersona) tasksLookup.set(t.personaId, t.tasks)

  const final: any[] = []
  let simCount = 0
  for (const p of personas) {
    const tasks = tasksLookup.get(p.id) || []
    for (const t of tasks) {
      for (const model of ['llama', 'qwen']) {
        const k = `${p.id}-${t.taskNum}-${model}`
        if (validLLM.has(k)) {
          final.push(validLLM.get(k))
        } else {
          const sim = simulateOne(p, t, model as any) as any
          sim.source = 'simulated'
          final.push(sim)
          simCount++
        }
      }
    }
  }

  fs.writeFileSync(path.join(dir, 'responses.json'), JSON.stringify(final, null, 2))
  console.log(`Wrote ${final.length} total responses (${llmValidCount} LLM + ${simCount} simulated)`)

  // Quick stats
  const A = final.filter((r) => r.choice === 'A').length
  const B = final.filter((r) => r.choice === 'B').length
  const N = final.filter((r) => r.choice === 'None').length
  console.log(`A: ${A} (${(A/final.length*100).toFixed(1)}%) · B: ${B} (${(B/final.length*100).toFixed(1)}%) · None: ${N} (${(N/final.length*100).toFixed(1)}%)`)
}

main().catch((e) => { console.error(e); process.exit(1) })
