// Runs the analysis step on the saved JSON files. Outputs data/survey/results.json.
import fs from 'fs'
import path from 'path'
import { analyze } from '../lib/conjoint/analyze'

async function main() {
  const dir = path.join(process.cwd(), 'data', 'survey')
  const personas = JSON.parse(fs.readFileSync(path.join(dir, 'personas.json'), 'utf8'))
  const tasksByPersona = JSON.parse(fs.readFileSync(path.join(dir, 'tasks.json'), 'utf8'))
  const responses = JSON.parse(fs.readFileSync(path.join(dir, 'responses.json'), 'utf8'))

  console.log(`Analyzing ${responses.length} responses across ${personas.length} personas...`)
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
    console.log(`  ${w.feature}: ₹${w.lowEstimate}-${w.highEstimate}/mo (mid ₹${w.midEstimate})`)
  }

  console.log('\n=== Top utilities per attribute ===')
  const attrs = Array.from(new Set(result.utilities.map((u) => u.attribute)))
  for (const a of attrs) {
    const top = result.utilities.filter((u) => u.attribute === a).sort((a, b) => b.normalizedUtility - a.normalizedUtility).slice(0, 3)
    console.log(`  ${a}: ${top.map((t) => `${t.level} (${(t.hitRate * 100).toFixed(0)}%)`).join(', ')}`)
  }

  console.log(`\nSaved results.json to ${dir}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
