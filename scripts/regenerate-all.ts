// Regenerate the entire study using expanded attribute set + simulator.
// Keeps personas; regenerates tasks (10 per persona) + responses (utility-model-based).
import fs from 'fs'
import path from 'path'
import { generatePersonas } from '../lib/conjoint/personas'
import { generateTasksForPersona } from '../lib/conjoint/design'
import { simulateOne } from '../lib/conjoint/simulator'
import { analyze } from '../lib/conjoint/analyze'

async function main() {
  const dir = path.join(process.cwd(), 'data', 'survey')
  fs.mkdirSync(dir, { recursive: true })

  const N = 100
  const TASKS_PER_PERSONA = 10

  console.log(`Regenerating with expanded attribute set...`)
  console.log(`  ${N} personas, ${TASKS_PER_PERSONA} tasks/persona, 2 models`)

  const personas = generatePersonas(N)
  const tasksByPersona = personas.map((p) => ({ personaId: p.id, tasks: generateTasksForPersona(p.id, TASKS_PER_PERSONA) }))

  // Try to preserve LLM-validated responses
  let llmValidMap = new Map<string, any>()
  try {
    const old = JSON.parse(fs.readFileSync(path.join(dir, 'responses.json'), 'utf8'))
    for (const r of old) {
      if (r.source === 'llm' && !r.reason.startsWith('ERR:')) {
        llmValidMap.set(`${r.personaId}-${r.taskNum}-${r.model}`, { ...r })
      }
    }
    console.log(`  Preserving ${llmValidMap.size} LLM responses where task layout matches`)
  } catch {}

  const responses: any[] = []
  let llmKept = 0
  for (const p of personas) {
    const tasks = tasksByPersona.find((t) => t.personaId === p.id)!.tasks
    for (const t of tasks) {
      for (const model of ['llama', 'qwen'] as const) {
        const k = `${p.id}-${t.taskNum}-${model}`
        // Even if we have an old LLM response, the task layout has changed, so simulate fresh.
        // We'll preserve the LLM ones in a separate "validation samples" file.
        const sim = simulateOne(p, t, model) as any
        sim.source = 'simulated'
        responses.push(sim)
      }
    }
  }

  fs.writeFileSync(path.join(dir, 'personas.json'), JSON.stringify(personas, null, 2))
  fs.writeFileSync(path.join(dir, 'tasks.json'), JSON.stringify(tasksByPersona, null, 2))
  fs.writeFileSync(path.join(dir, 'responses.json'), JSON.stringify(responses, null, 2))

  // Preserve LLM-validation samples in a separate file (from prior run)
  const llmSamples = Array.from(llmValidMap.values())
  fs.writeFileSync(path.join(dir, 'llm-validation-samples.json'), JSON.stringify(llmSamples, null, 2))
  console.log(`  Saved ${llmSamples.length} LLM samples to llm-validation-samples.json`)

  console.log(`\nAnalyzing ${responses.length} responses...`)
  const result = analyze(personas, tasksByPersona, responses)
  fs.writeFileSync(path.join(dir, 'results.json'), JSON.stringify(result, null, 2))

  console.log('\n=== Totals ===')
  console.log(result.totals)
  console.log('\n=== Price elasticity ===')
  for (const p of result.priceElasticity) {
    console.log(`  ₹${p.price}: ${(p.shareChosen * 100).toFixed(1)}% chosen (n=${p.appearedCount})`)
  }
  console.log('\n=== WTP ranges ===')
  for (const w of result.wtp) {
    console.log(`  ${w.feature}: ₹${w.lowEstimate}-${w.highEstimate}/mo`)
  }
  console.log(`\nSaved to ${dir}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
