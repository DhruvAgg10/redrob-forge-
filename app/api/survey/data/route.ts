import fs from 'fs'
import path from 'path'

export async function GET() {
  const dir = path.join(process.cwd(), 'data', 'survey')
  try {
    const personas = JSON.parse(fs.readFileSync(path.join(dir, 'personas.json'), 'utf8'))
    const tasks = JSON.parse(fs.readFileSync(path.join(dir, 'tasks.json'), 'utf8'))
    const responses = JSON.parse(fs.readFileSync(path.join(dir, 'responses.json'), 'utf8'))
    const results = JSON.parse(fs.readFileSync(path.join(dir, 'results.json'), 'utf8'))
    return Response.json({ personas, tasks, responses, results })
  } catch (e: any) {
    return Response.json({ error: 'No survey data yet — run npm run survey' }, { status: 404 })
  }
}
