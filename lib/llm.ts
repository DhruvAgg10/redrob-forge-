type Msg = { role: 'system' | 'user' | 'assistant'; content: string }

const ENDPOINT = 'https://router.huggingface.co/v1/chat/completions'
const DEFAULT_MODEL = process.env.HF_MODEL || 'meta-llama/Llama-3.3-70B-Instruct'

export function hasLLM() {
  return Boolean(process.env.HF_TOKEN?.trim())
}

export async function chat(messages: Msg[], opts: { maxTokens?: number; temperature?: number; model?: string } = {}): Promise<string> {
  const token = process.env.HF_TOKEN?.trim()
  if (!token) throw new Error('HF_TOKEN not set')

  const resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: opts.model || DEFAULT_MODEL,
      messages,
      max_tokens: opts.maxTokens ?? 400,
      temperature: opts.temperature ?? 0.7,
      top_p: 0.95,
    }),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`HF ${resp.status}: ${text.slice(0, 200)}`)
  }

  const data = await resp.json()
  const content = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? data?.choices?.[0]?.content
  return String(content ?? '').trim()
}
