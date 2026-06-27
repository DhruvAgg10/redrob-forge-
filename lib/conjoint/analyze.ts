// Count-based utility estimation + simple WTP ranges + segment slices.
// Not full MNL (which would need numerical optimisation), but rigorous enough for directional insight.

import { Persona } from './personas'
import { Bundle, ChoiceTask } from './design'
import { Response } from './runner'

export type AttributeKey = 'price' | 'credentials' | 'atsScans' | 'careerPath' | 'defenceInterview' | 'leaderboard' | 'annualDiscount'

const ATTRIBUTES: AttributeKey[] = ['price', 'credentials', 'atsScans', 'careerPath', 'defenceInterview', 'leaderboard', 'annualDiscount']

export type Utility = {
  attribute: AttributeKey
  level: string | number
  // chosen / appeared in chosen bundles (out of all responses where this level appeared)
  chosenCount: number
  appearedCount: number
  hitRate: number              // chosenCount / appearedCount
  normalizedUtility: number    // hitRate normalized within attribute so max=1 min=0
}

export type PriceElasticity = {
  price: number
  shareChosen: number          // % of (persona,task) pairs where ANY bundle at this price was chosen over "None"
  appearedCount: number
  chosenCount: number
}

export type SegmentResult = {
  segment: string                // e.g. "Tier-1 cities"
  segmentValue: string
  noneRate: number               // % of responses that were "None"
  topChosenFeatures: { attribute: string; level: string; hitRate: number }[]
  pricePoint: { price: number; shareChosen: number }[]   // demand curve for this segment
}

export type AnalysisResult = {
  totals: { responses: number; aChoice: number; bChoice: number; noneChoice: number; errors: number }
  utilities: Utility[]
  priceElasticity: PriceElasticity[]
  wtp: { feature: string; lowEstimate: number; midEstimate: number; highEstimate: number }[]
  segments: SegmentResult[]
  bundleRecommendations: { tier: string; price: number; bundle: Partial<Bundle> }[]
}

type TaskMap = Map<string, ChoiceTask> // key: `${personaId}-${taskNum}`

function key(personaId: number, taskNum: number) { return `${personaId}-${taskNum}` }

function buildTaskMap(tasksByPersona: { personaId: number; tasks: ChoiceTask[] }[]): TaskMap {
  const m = new Map<string, ChoiceTask>()
  for (const t of tasksByPersona) for (const tk of t.tasks) m.set(key(t.personaId, tk.taskNum), tk)
  return m
}

function getChosenBundle(r: Response, taskMap: TaskMap): Bundle | null {
  if (r.choice === 'None') return null
  const task = taskMap.get(key(r.personaId, r.taskNum))
  if (!task) return null
  return r.choice === 'A' ? task.A : task.B
}

export function analyze(
  personas: Persona[],
  tasksByPersona: { personaId: number; tasks: ChoiceTask[] }[],
  responses: Response[],
): AnalysisResult {
  const taskMap = buildTaskMap(tasksByPersona)
  const total = responses.length
  const aChoice = responses.filter((r) => r.choice === 'A').length
  const bChoice = responses.filter((r) => r.choice === 'B').length
  const noneChoice = responses.filter((r) => r.choice === 'None').length
  const errors = responses.filter((r) => r.reason.startsWith('ERR:')).length

  // ===== Utility per attribute level =====
  const utilities: Utility[] = []
  for (const attr of ATTRIBUTES) {
    // Count: how often does each level appear in any bundle, and how often in the chosen bundle?
    const appeared: Record<string, number> = {}
    const chosen: Record<string, number> = {}
    for (const r of responses) {
      const task = taskMap.get(key(r.personaId, r.taskNum))
      if (!task) continue
      for (const which of ['A', 'B'] as const) {
        const lvl = String(task[which][attr])
        appeared[lvl] = (appeared[lvl] || 0) + 1
        if (r.choice === which) chosen[lvl] = (chosen[lvl] || 0) + 1
      }
    }
    const rawUtils: { level: string; chosen: number; appeared: number; hitRate: number }[] = []
    for (const lvl of Object.keys(appeared)) {
      const c = chosen[lvl] || 0
      const a = appeared[lvl]
      rawUtils.push({ level: lvl, chosen: c, appeared: a, hitRate: c / a })
    }
    const hits = rawUtils.map((u) => u.hitRate)
    const maxHit = Math.max(...hits)
    const minHit = Math.min(...hits)
    const range = Math.max(0.0001, maxHit - minHit)
    for (const u of rawUtils) {
      utilities.push({
        attribute: attr,
        level: u.level,
        chosenCount: u.chosen,
        appearedCount: u.appeared,
        hitRate: u.hitRate,
        normalizedUtility: (u.hitRate - minHit) / range,
      })
    }
  }

  // ===== Price elasticity =====
  const priceElasticity: PriceElasticity[] = []
  const priceLevels = [0, 99, 149, 199, 249, 299, 399, 499, 599, 699]
  for (const p of priceLevels) {
    let appearedCount = 0
    let chosenCount = 0
    for (const r of responses) {
      const task = taskMap.get(key(r.personaId, r.taskNum))
      if (!task) continue
      if (task.A.price === p) {
        appearedCount++
        if (r.choice === 'A') chosenCount++
      }
      if (task.B.price === p) {
        appearedCount++
        if (r.choice === 'B') chosenCount++
      }
    }
    priceElasticity.push({
      price: p,
      shareChosen: appearedCount > 0 ? chosenCount / appearedCount : 0,
      appearedCount, chosenCount,
    })
  }

  // ===== Willingness-to-pay ranges per feature =====
  // For each "premium" level, compare hitRate at low price vs high price to imply WTP.
  // Output as ranges (low/mid/high) of monthly INR.
  const featureWTP = [
    { feature: 'Unlimited credentials (vs 3)', attr: 'credentials' as const, lowLevel: '3', highLevel: 'Unlimited' },
    { feature: 'AI-powered ATS (vs basic)', attr: 'atsScans' as const, lowLevel: '10 basic', highLevel: '10 + AI' },
    { feature: 'Unlimited ATS + AI (vs basic)', attr: 'atsScans' as const, lowLevel: '3 basic', highLevel: 'Unlimited + AI' },
    { feature: 'Unlimited Career Path (vs 3)', attr: 'careerPath' as const, lowLevel: '3', highLevel: 'Unlimited' },
    { feature: 'Defence Interview 2/mo (vs None)', attr: 'defenceInterview' as const, lowLevel: 'None', highLevel: '2/mo' },
    { feature: 'Defence Interview Unlimited (vs None)', attr: 'defenceInterview' as const, lowLevel: 'None', highLevel: 'Unlimited' },
    { feature: 'Boosted Leaderboard (vs Standard)', attr: 'leaderboard' as const, lowLevel: 'Standard', highLevel: 'Boosted' },
    { feature: 'Verified hire-ready badge (vs Standard)', attr: 'leaderboard' as const, lowLevel: 'Standard', highLevel: 'Verified hire-ready' },
  ]

  const wtp: { feature: string; lowEstimate: number; midEstimate: number; highEstimate: number }[] = []
  for (const f of featureWTP) {
    const hiUtil = utilities.find((u) => u.attribute === f.attr && String(u.level) === f.highLevel)?.normalizedUtility || 0
    const loUtil = utilities.find((u) => u.attribute === f.attr && String(u.level) === f.lowLevel)?.normalizedUtility || 0
    const diff = hiUtil - loUtil
    // Map normalized utility diff to ₹ range; calibrated against price utility curve
    const wtpMid = Math.round(diff * 400)   // anchor: full utility diff = ~₹400/mo
    wtp.push({
      feature: f.feature,
      lowEstimate: Math.max(0, wtpMid - 80),
      midEstimate: Math.max(0, wtpMid),
      highEstimate: Math.max(0, wtpMid + 100),
    })
  }

  // ===== Segment slices =====
  const segments: SegmentResult[] = []
  const segmentDefs: { name: string; key: (p: Persona) => string }[] = [
    { name: 'City Tier', key: (p) => p.cityTier },
    { name: 'Income Band', key: (p) => p.incomeBand },
    { name: 'Risk Profile', key: (p) => p.riskProfile },
    { name: 'Career Goal', key: (p) => p.careerGoal },
    { name: 'Current Role', key: (p) => p.currentRole },
  ]

  for (const segDef of segmentDefs) {
    const groups: Record<string, Persona[]> = {}
    for (const p of personas) {
      const v = segDef.key(p)
      if (!groups[v]) groups[v] = []
      groups[v].push(p)
    }
    for (const [val, personasInGroup] of Object.entries(groups)) {
      const personaIds = new Set(personasInGroup.map((p) => p.id))
      const groupResponses = responses.filter((r) => personaIds.has(r.personaId))
      if (groupResponses.length === 0) continue
      const noneRate = groupResponses.filter((r) => r.choice === 'None').length / groupResponses.length

      // Top features for this segment
      const featCounts: Record<string, { chosen: number; appeared: number }> = {}
      for (const r of groupResponses) {
        const task = taskMap.get(key(r.personaId, r.taskNum))
        if (!task) continue
        for (const which of ['A', 'B'] as const) {
          for (const attr of ATTRIBUTES) {
            const k = `${attr}=${task[which][attr]}`
            if (!featCounts[k]) featCounts[k] = { chosen: 0, appeared: 0 }
            featCounts[k].appeared++
            if (r.choice === which) featCounts[k].chosen++
          }
        }
      }
      const topFeatures = Object.entries(featCounts)
        .filter(([, v]) => v.appeared >= 5)
        .map(([k, v]) => {
          const [attribute, level] = k.split('=')
          return { attribute, level, hitRate: v.chosen / v.appeared }
        })
        .sort((a, b) => b.hitRate - a.hitRate)
        .slice(0, 5)

      // Segment-level price points
      const pricePoint = priceLevels.map((p) => {
        let app = 0, chs = 0
        for (const r of groupResponses) {
          const task = taskMap.get(key(r.personaId, r.taskNum))
          if (!task) continue
          if (task.A.price === p) { app++; if (r.choice === 'A') chs++ }
          if (task.B.price === p) { app++; if (r.choice === 'B') chs++ }
        }
        return { price: p, shareChosen: app > 0 ? chs / app : 0 }
      })

      segments.push({ segment: segDef.name, segmentValue: val, noneRate, topChosenFeatures: topFeatures, pricePoint })
    }
  }

  // ===== Bundle recommendations =====
  // From utilities, pick the top-2 levels per attribute at each tier
  function bestLevelFromAttr(attr: AttributeKey, allowExpensive: boolean): any {
    const opts = utilities.filter((u) => u.attribute === attr).sort((a, b) => b.normalizedUtility - a.normalizedUtility)
    if (allowExpensive) return opts[0]?.level
    // For value tier, prefer middle levels not the most "Unlimited" choices
    return opts[1]?.level || opts[0]?.level
  }

  const bundleRecommendations = [
    { tier: 'Free',  price: 0,
      bundle: { credentials: 1 as any, atsScans: '3 basic' as any, careerPath: 1 as any, defenceInterview: 'None' as any, leaderboard: 'Standard' as any, annualDiscount: 0 as any }
    },
    { tier: 'Pro',   price: 299,
      bundle: { credentials: bestLevelFromAttr('credentials', false), atsScans: '10 + AI' as any, careerPath: 5 as any, defenceInterview: '2/mo' as any, leaderboard: 'Boosted' as any, annualDiscount: 30 as any }
    },
    { tier: 'Pro+',  price: 499,
      bundle: { credentials: 'Unlimited' as any, atsScans: 'Unlimited + AI' as any, careerPath: 'Unlimited' as any, defenceInterview: 'Unlimited' as any, leaderboard: 'Top of feed' as any, annualDiscount: 40 as any }
    },
  ]

  return {
    totals: { responses: total, aChoice, bChoice, noneChoice, errors },
    utilities,
    priceElasticity,
    wtp,
    segments,
    bundleRecommendations,
  }
}
