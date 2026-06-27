import fs from 'fs'
import path from 'path'

function toCsv(rows: any[]): string {
  if (rows.length === 0) return ''
  const keys = Object.keys(rows[0])
  const escape = (v: any) => {
    const s = v === null || v === undefined ? '' : String(v)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) return '"' + s.replace(/"/g, '""') + '"'
    return s
  }
  const header = keys.join(',')
  const lines = rows.map((r) => keys.map((k) => escape(r[k])).join(','))
  return [header, ...lines].join('\n')
}

export async function GET(_req: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const dir = path.join(process.cwd(), 'data', 'survey')
  let rows: any[] = []
  let filename = `${type}.csv`

  if (type === 'personas') {
    rows = JSON.parse(fs.readFileSync(path.join(dir, 'personas.json'), 'utf8'))
  } else if (type === 'responses') {
    rows = JSON.parse(fs.readFileSync(path.join(dir, 'responses.json'), 'utf8'))
  } else if (type === 'tasks') {
    const tasks = JSON.parse(fs.readFileSync(path.join(dir, 'tasks.json'), 'utf8'))
    rows = tasks.flatMap((t: any) => t.tasks.map((tk: any) => ({
      personaId: t.personaId, taskNum: tk.taskNum,
      A_price: tk.A.price, A_credentials: tk.A.credentials, A_atsScans: tk.A.atsScans,
      A_careerPath: tk.A.careerPath, A_defenceInterview: tk.A.defenceInterview,
      A_leaderboard: tk.A.leaderboard, A_annualDiscount: tk.A.annualDiscount,
      B_price: tk.B.price, B_credentials: tk.B.credentials, B_atsScans: tk.B.atsScans,
      B_careerPath: tk.B.careerPath, B_defenceInterview: tk.B.defenceInterview,
      B_leaderboard: tk.B.leaderboard, B_annualDiscount: tk.B.annualDiscount,
    })))
  } else if (type === 'utilities') {
    const results = JSON.parse(fs.readFileSync(path.join(dir, 'results.json'), 'utf8'))
    rows = results.utilities
  } else {
    return Response.json({ error: 'Unknown type' }, { status: 400 })
  }

  const csv = toCsv(rows)
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
    },
  })
}
