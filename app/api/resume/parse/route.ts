import { NextRequest } from 'next/server'
import { extractText, getDocumentProxy } from 'unpdf'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return Response.json({ error: 'No file' }, { status: 400 })

  try {
    const buf = new Uint8Array(await file.arrayBuffer())
    const pdf = await getDocumentProxy(buf)
    const { text } = await extractText(pdf, { mergePages: true })
    const cleaned = (Array.isArray(text) ? text.join('\n') : text).trim()
    return Response.json({ text: cleaned.slice(0, 6000) })
  } catch (e: any) {
    return Response.json({ error: 'Could not parse PDF: ' + String(e.message || e) }, { status: 500 })
  }
}
