// Runs the LLM survey: for each persona, for each task, ask both models which bundle they'd pick.

import { Persona } from './personas'
import { ChoiceTask, Bundle, describeBundle } from './design'

export type Response = {
  personaId: number
  taskNum: number
  model: 'llama' | 'qwen'
  choice: 'A' | 'B' | 'None'
  reason: string
  durationMs: number
}

const MODELS = {
  llama: 'meta-llama/Llama-3.3-70B-Instruct',
  qwen: 'Qwen/Qwen2.5-72B-Instruct',
}

const ENDPOINT = 'https://router.huggingface.co/v1/chat/completions'

function buildPrompt(persona: Persona, task: ChoiceTask): { system: string; user: string } {
  const system = `You are roleplaying as a real Indian consumer making a buying decision about a career-credential subscription called Forge.

Your profile:
${persona.bio}

You are about to evaluate two subscription bundles. Pick the ONE you would actually choose, OR "None" if neither is worth it to you. Be honest to your profile — if you're price-sensitive, act price-sensitive. If you're in a low-income bracket, ₹699/month is genuinely a lot of money.

Reply ONLY with strict JSON in this shape, nothing else:
{"choice": "A" | "B" | "None", "reason": "<one short sentence explaining the choice from your perspective>"}`

  const user = `Bundle A: ${describeBundle(task.A)}
Bundle B: ${describeBundle(task.B)}
Bundle C: Neither — not worth it for me right now.

Which do you choose?`

  return { system, user }
}

async function callHF(token: string, model: string, system: string, user: string): Promise<string> {
  const resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      max_tokens: 150,
      temperature: 0.8,
    }),
  })
  if (!resp.ok) throw new Error(`HF ${resp.status}: ${(await resp.text()).slice(0, 200)}`)
  const data = await resp.json()
  return data?.choices?.[0]?.message?.content?.trim() || ''
}

function parseResponse(text: string): { choice: 'A' | 'B' | 'None'; reason: string } {
  // Try to find a JSON object in the response
  const match = text.match(/\{[\s\S]*?\}/)
  if (match) {
    try {
      const parsed = JSON.parse(match[0])
      const choice = ['A', 'B', 'None'].includes(parsed.choice) ? parsed.choice : 'None'
      return { choice, reason: String(parsed.reason || '').slice(0, 240) }
    } catch {}
  }
  // Fallback: detect choice letter in plain text
  const upper = text.toUpperCase()
  if (/CHOICE.*?A\b/.test(upper) || /BUNDLE A/.test(upper) || /\bA\b/.test(upper.slice(0, 40))) return { choice: 'A', reason: text.slice(0, 200) }
  if (/CHOICE.*?B\b/.test(upper) || /BUNDLE B/.test(upper) || /\bB\b/.test(upper.slice(0, 40))) return { choice: 'B', reason: text.slice(0, 200) }
  return { choice: 'None', reason: text.slice(0, 200) }
}

export async function runOne(token: string, persona: Persona, task: ChoiceTask, modelKey: 'llama' | 'qwen'): Promise<Response> {
  const { system, user } = buildPrompt(persona, task)
  const start = Date.now()
  try {
    const text = await callHF(token, MODELS[modelKey], system, user)
    const { choice, reason } = parseResponse(text)
    return { personaId: persona.id, taskNum: task.taskNum, model: modelKey, choice, reason, durationMs: Date.now() - start }
  } catch (e: any) {
    return { personaId: persona.id, taskNum: task.taskNum, model: modelKey, choice: 'None', reason: 'ERR: ' + String(e.message || e).slice(0, 120), durationMs: Date.now() - start }
  }
}

// Concurrency-limited batch runner. concurrency = how many in flight at once.
export async function runBatch(
  token: string,
  jobs: { persona: Persona; task: ChoiceTask; model: 'llama' | 'qwen' }[],
  concurrency = 8,
  onProgress?: (done: number, total: number) => void,
): Promise<Response[]> {
  const results: Response[] = []
  let done = 0
  let cursor = 0
  async function worker() {
    while (cursor < jobs.length) {
      const i = cursor++
      const j = jobs[i]
      const r = await runOne(token, j.persona, j.task, j.model)
      results[i] = r
      done++
      onProgress?.(done, jobs.length)
    }
  }
  const workers = Array.from({ length: concurrency }, () => worker())
  await Promise.all(workers)
  return results
}
