import { prisma } from './prisma'

export type PathNode = {
  role: string
  family: string
  lpa: number
  years: number
  skillGap: string[]
}

export type Path = {
  id: string
  label: string
  nodes: PathNode[]
  totalYears: number
  totalLPAGain: number
  difficulty: number
}

const ROLE_LABELS: Record<string, { name: string; family: string }> = {
  'software-engineer': { name: 'Software Engineer', family: 'Engineering' },
  'senior-software-engineer': { name: 'Senior SWE', family: 'Engineering' },
  'staff-engineer': { name: 'Staff Engineer', family: 'Engineering' },
  'engineering-manager': { name: 'Engineering Manager', family: 'Engineering' },
  'director-engineering': { name: 'Director of Eng', family: 'Engineering' },
  'apm': { name: 'Associate PM', family: 'Product' },
  'pm': { name: 'Product Manager', family: 'Product' },
  'senior-pm': { name: 'Senior PM', family: 'Product' },
  'group-pm': { name: 'Group PM', family: 'Product' },
  'consultant': { name: 'Consultant', family: 'Consulting' },
  'senior-consultant': { name: 'Senior Consultant', family: 'Consulting' },
  'data-analyst': { name: 'Data Analyst', family: 'Data' },
  'data-scientist': { name: 'Data Scientist', family: 'Data' },
  'senior-data-scientist': { name: 'Senior DS', family: 'Data' },
  'product-designer': { name: 'Product Designer', family: 'Design' },
  'senior-designer': { name: 'Senior Designer', family: 'Design' },
  'growth-marketer': { name: 'Growth Marketer', family: 'Marketing' },
  'head-of-growth': { name: 'Head of Growth', family: 'Marketing' },
}

function labelOf(slug: string) {
  return ROLE_LABELS[slug] || { name: slug, family: 'Generalist' }
}

// Match a freeform goal text to a role slug
function matchRole(text: string): string | null {
  const t = text.toLowerCase()
  const map: [string, string][] = [
    ['senior pm', 'senior-pm'],
    ['senior product', 'senior-pm'],
    ['group pm', 'group-pm'],
    ['product manager', 'pm'],
    ['apm', 'apm'],
    ['associate pm', 'apm'],
    ['staff engineer', 'staff-engineer'],
    ['engineering manager', 'engineering-manager'],
    ['director', 'director-engineering'],
    ['senior swe', 'senior-software-engineer'],
    ['senior software', 'senior-software-engineer'],
    ['head of growth', 'head-of-growth'],
    ['data scientist', 'senior-data-scientist'],
    ['senior designer', 'senior-designer'],
  ]
  for (const [k, v] of map) if (t.includes(k)) return v
  return null
}

export async function generatePaths(goalText: string, currentRole = 'software-engineer'): Promise<{ paths: Path[]; goalSlug: string }> {
  const goal = matchRole(goalText) || 'senior-pm'
  const transitions = await prisma.roleTransition.findMany()

  // BFS find paths from currentRole to goal, max depth 4
  const allPaths: string[][] = []
  function dfs(node: string, visited: Set<string>, trail: string[]) {
    if (trail.length > 5) return
    if (node === goal && trail.length > 1) {
      allPaths.push([...trail])
      return
    }
    const outs = transitions.filter((t) => t.fromRole === node)
    for (const t of outs) {
      if (visited.has(t.toRole)) continue
      visited.add(t.toRole)
      trail.push(t.toRole)
      dfs(t.toRole, visited, trail)
      trail.pop()
      visited.delete(t.toRole)
    }
  }
  dfs(currentRole, new Set([currentRole]), [currentRole])

  // Pick top 3 distinct by uniqueness of second node
  const seen = new Set<string>()
  const picked = allPaths
    .filter((p) => {
      const key = p[1] || p[0]
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 3)

  const paths: Path[] = picked.map((slugs, i) => {
    const nodes: PathNode[] = []
    let prevLpa = 12
    let totalYears = 0
    let totalDifficulty = 0
    for (let idx = 0; idx < slugs.length; idx++) {
      const slug = slugs[idx]
      const label = labelOf(slug)
      let lpa = prevLpa
      let years = 0
      let skills: string[] = []
      if (idx > 0) {
        const tr = transitions.find((t) => t.fromRole === slugs[idx - 1] && t.toRole === slug)
        if (tr) {
          lpa = tr.avgLPAEnd
          years = tr.yearsTypical
          totalYears += years
          totalDifficulty += tr.difficulty
          skills = JSON.parse(tr.requiredSkills as unknown as string)
        }
      } else {
        lpa = transitions.find((t) => t.fromRole === slug)?.avgLPAStart || 12
      }
      nodes.push({ role: label.name, family: label.family, lpa, years, skillGap: skills })
      prevLpa = lpa
    }
    return {
      id: `path-${i}`,
      label: nodes.map((n) => n.family).filter((v, j, a) => a.indexOf(v) === j).join(' → '),
      nodes,
      totalYears,
      totalLPAGain: (nodes[nodes.length - 1]?.lpa || 0) - (nodes[0]?.lpa || 0),
      difficulty: Math.round(totalDifficulty / Math.max(1, slugs.length - 1)),
    }
  })

  return { paths, goalSlug: goal }
}
