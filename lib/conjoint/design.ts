// Conjoint bundle + task design
// 7 attributes, choice-based conjoint (CBC) with forced choice of 2 bundles + "Neither"
// Expanded option set for finer-grained pricing inference.

export type Bundle = {
  id: string
  price: number                           // ₹/month: 0, 99, 149, 199, 249, 299, 399, 499, 599, 699
  credentials: 1 | 3 | 5 | 10 | 25 | 'Unlimited'
  atsScans: '3 basic' | '10 basic' | '10 + AI' | '25 + AI' | 'Unlimited + AI'
  careerPath: 1 | 3 | 5 | 10 | 'Unlimited'
  defenceInterview: 'None' | '1/mo' | '2/mo' | '5/mo' | 'Unlimited'
  leaderboard: 'Standard' | 'Boosted' | 'Top of feed' | 'Verified hire-ready'
  annualDiscount: 0 | 15 | 20 | 25 | 30 | 35 | 40 | 50       // %
}

export type ChoiceTask = {
  taskNum: number
  A: Bundle
  B: Bundle
}

const PRICES: Bundle['price'][] = [0, 99, 149, 199, 249, 299, 399, 499, 599, 699]
const CREDS: Bundle['credentials'][] = [1, 3, 5, 10, 25, 'Unlimited']
const ATS: Bundle['atsScans'][] = ['3 basic', '10 basic', '10 + AI', '25 + AI', 'Unlimited + AI']
const CP: Bundle['careerPath'][] = [1, 3, 5, 10, 'Unlimited']
const DI: Bundle['defenceInterview'][] = ['None', '1/mo', '2/mo', '5/mo', 'Unlimited']
const LB: Bundle['leaderboard'][] = ['Standard', 'Boosted', 'Top of feed', 'Verified hire-ready']
const DISC: Bundle['annualDiscount'][] = [0, 15, 20, 25, 30, 35, 40, 50]

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

function makeRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function genBundle(rand: () => number, id: string): Bundle {
  return {
    id,
    price: pick(PRICES, rand),
    credentials: pick(CREDS, rand),
    atsScans: pick(ATS, rand),
    careerPath: pick(CP, rand),
    defenceInterview: pick(DI, rand),
    leaderboard: pick(LB, rand),
    annualDiscount: pick(DISC, rand),
  }
}

// Generate 10 distinct choice tasks per persona (was 8)
export function generateTasksForPersona(personaId: number, numTasks = 10): ChoiceTask[] {
  const rand = makeRand(personaId * 31 + 1)
  const tasks: ChoiceTask[] = []
  for (let t = 0; t < numTasks; t++) {
    let A = genBundle(rand, `p${personaId}-t${t}-A`)
    let B = genBundle(rand, `p${personaId}-t${t}-B`)
    let attempts = 0
    while (countDifferences(A, B) < 3 && attempts < 6) {
      B = genBundle(rand, `p${personaId}-t${t}-B-r${attempts}`)
      attempts++
    }
    if (A.price === 0 && B.price === 0 && countDifferences(A, B) < 4) {
      B.price = pick(PRICES.filter((p) => p !== 0) as Bundle['price'][], rand)
    }
    tasks.push({ taskNum: t + 1, A, B })
  }
  return tasks
}

function countDifferences(a: Bundle, b: Bundle): number {
  let diff = 0
  const keys: (keyof Bundle)[] = ['price', 'credentials', 'atsScans', 'careerPath', 'defenceInterview', 'leaderboard', 'annualDiscount']
  for (const k of keys) if (a[k] !== b[k]) diff++
  return diff
}

export function describeBundle(b: Bundle): string {
  const price = b.price === 0 ? 'Free' : `₹${b.price}/month`
  const annual = b.annualDiscount > 0 ? ` (${b.annualDiscount}% off annual)` : ''
  return `${price}${annual} · ${b.credentials} skill credentials/mo · ${b.atsScans} ATS scans · ${b.careerPath} Career Path scans/mo · Defence Interview: ${b.defenceInterview} · Leaderboard: ${b.leaderboard}`
}

export { PRICES, CREDS, ATS, CP, DI, LB, DISC }
