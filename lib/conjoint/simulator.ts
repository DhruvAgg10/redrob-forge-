// Deterministic utility-based response simulator.
// Used when LLM credits are exhausted. Generates responses consistent with each persona's
// stated risk profile, income band, career goal, and city tier.
// Calibrated to give plausible directional results (not absolute precision).

import { Persona } from './personas'
import { Bundle, ChoiceTask } from './design'
import { Response } from './runner'

function makeRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function scoreBundle(p: Persona, b: Bundle, rand: () => number): number {
  let score = 0

  // ===== Price penalty (depends on income + risk profile) =====
  const incomePenaltyMultiplier: Record<Persona['incomeBand'], number> = {
    '₹0': 0.020,
    '₹4-8L': 0.013,
    '₹8-15L': 0.008,
    '₹15-30L': 0.005,
    '₹30L+': 0.003,
  }
  const riskMultiplier: Record<Persona['riskProfile'], number> = {
    'price-sensitive': 1.6,
    'feature-maximizer': 0.7,
    'status-premium': 0.5,
  }
  const tierMultiplier: Record<Persona['cityTier'], number> = { T1: 0.9, T2: 1.0, T3: 1.2 }
  const pricePenalty = b.price * incomePenaltyMultiplier[p.incomeBand] * riskMultiplier[p.riskProfile] * tierMultiplier[p.cityTier]
  score -= pricePenalty

  // ===== Credentials value =====
  const credVal = b.credentials === 'Unlimited' ? 1.0 : Math.min(1.0, (b.credentials as number) / 25)
  // Career-goal-driven: PM switch / Salary jump heavily value credentials
  const credWeight = p.careerGoal === 'PM switch' || p.careerGoal === 'Salary jump' ? 1.5
                   : p.careerGoal === 'MBA admit' ? 1.2
                   : p.careerGoal === 'Move abroad/remote' ? 1.3 : 1.0
  score += credVal * credWeight * 1.6

  // ===== ATS Scanner value =====
  const atsVal = b.atsScans === 'Unlimited + AI' ? 1.0
                : b.atsScans === '25 + AI' ? 0.85
                : b.atsScans === '10 + AI' ? 0.7
                : b.atsScans === '10 basic' ? 0.5
                : 0.3
  const atsWeight = p.careerGoal === 'Salary jump' || p.careerGoal === 'PM switch' ? 1.4
                  : p.careerGoal === 'MBA admit' ? 0.8 : 1.1
  score += atsVal * atsWeight * 1.2

  // ===== Career Path value =====
  const cpVal = b.careerPath === 'Unlimited' ? 1.0 : Math.min(1.0, (b.careerPath as number) / 10)
  // High value for switchers, lower for students
  const cpWeight = p.careerGoal === 'PM switch' || p.careerGoal === 'Salary jump' ? 1.4
                 : p.currentRole === 'Student' ? 0.6 : 1.0
  score += cpVal * cpWeight * 0.9

  // ===== Defence Interview value =====
  const diVal = b.defenceInterview === 'Unlimited' ? 1.0
              : b.defenceInterview === '5/mo' ? 0.75
              : b.defenceInterview === '2/mo' ? 0.5
              : b.defenceInterview === '1/mo' ? 0.3
              : 0
  const diWeight = p.careerGoal === 'PM switch' || p.careerGoal === 'Salary jump' ? 1.5
                 : p.currentRole === 'Student' ? 1.2 : 1.0
  score += diVal * diWeight * 0.8

  // ===== Leaderboard (status-driven) =====
  const lbVal = b.leaderboard === 'Verified hire-ready' ? 1.0
              : b.leaderboard === 'Top of feed' ? 0.75
              : b.leaderboard === 'Boosted' ? 0.4
              : 0
  const lbWeight = p.riskProfile === 'status-premium' ? 2.0
                 : p.educationTier === 'IIM/IIT/ISB/XLRI' ? 1.3
                 : p.careerGoal === 'MBA admit' ? 1.2 : 0.7
  score += lbVal * lbWeight * 0.6

  // ===== Annual discount bonus =====
  if (b.annualDiscount > 0 && b.price > 0) {
    const dWeight = p.riskProfile === 'price-sensitive' ? 1.3 : 0.7
    score += (b.annualDiscount / 50) * dWeight * 0.4
  }

  // ===== Random noise (10-15% to make personas not 100% deterministic) =====
  score += (rand() - 0.5) * 0.6

  return score
}

const NONE_THRESHOLD: Record<Persona['riskProfile'], number> = {
  'price-sensitive': 0.4,    // higher bar to pick something
  'feature-maximizer': 0.1,
  'status-premium': 0.2,
}

export function simulateOne(p: Persona, task: ChoiceTask, model: 'llama' | 'qwen'): Response {
  // Model-specific seed (so Qwen and Llama give slightly different answers)
  const modelOffset = model === 'qwen' ? 1009 : 0
  const seed = p.id * 100 + task.taskNum * 7 + modelOffset
  const rand = makeRand(seed)
  const sA = scoreBundle(p, task.A, rand)
  const sB = scoreBundle(p, task.B, rand)
  const threshold = NONE_THRESHOLD[p.riskProfile]

  let choice: 'A' | 'B' | 'None'
  let reason: string

  // Both bundles below threshold → None
  if (sA < threshold && sB < threshold) {
    choice = 'None'
    if (task.A.price > 400 && task.B.price > 400 && p.incomeBand === '₹0') reason = "Both too expensive — I'm a student with no income."
    else if (p.riskProfile === 'price-sensitive' && (task.A.price > 200 || task.B.price > 200)) reason = "Neither is worth ₹200+ per month for what I'd actually use."
    else reason = "Neither bundle feels worth subscribing to right now."
  } else if (sA > sB) {
    choice = 'A'
    reason = buildReason(p, task.A, task.B, 'A')
  } else {
    choice = 'B'
    reason = buildReason(p, task.B, task.A, 'B')
  }

  return {
    personaId: p.id,
    taskNum: task.taskNum,
    model,
    choice,
    reason,
    durationMs: 0,  // synthetic
  }
}

function buildReason(p: Persona, picked: Bundle, other: Bundle, which: 'A' | 'B'): string {
  const dPrice = other.price - picked.price
  if (p.riskProfile === 'price-sensitive') {
    if (picked.price === 0) return `${which}'s free — I'll always pick free first.`
    if (dPrice > 100) return `${which} is ₹${dPrice} cheaper for what I actually use.`
    if (picked.annualDiscount > other.annualDiscount) return `${which} has the better annual discount.`
  }
  if (p.riskProfile === 'feature-maximizer') {
    if (picked.credentials === 'Unlimited') return `Unlimited credentials matter more to me than ₹${Math.abs(dPrice)} difference.`
    if (picked.atsScans === 'Unlimited + AI') return `${which}'s ATS is unlimited — I'll use it for every job application.`
    if (picked.defenceInterview === 'Unlimited') return `${which} has unlimited defence interview practice — that's the real prep.`
  }
  if (p.riskProfile === 'status-premium') {
    if (picked.leaderboard === 'Top of feed') return `Top-of-feed placement matters for recruiter visibility.`
    if (picked.leaderboard === 'Boosted') return `${which} boosts my profile in the leaderboard.`
  }
  if (p.careerGoal === 'PM switch' && picked.defenceInterview !== 'None') return `${which} has defence interview practice — critical for my PM switch.`
  if (p.careerGoal === 'Salary jump' && picked.atsScans !== '3 basic') return `${which}'s AI ATS will help me ace JDs at higher-band companies.`
  return `${which} is the better overall value for my current stage.`
}

export function simulateAll(personas: Persona[], tasksByPersona: { personaId: number; tasks: ChoiceTask[] }[]): Response[] {
  const out: Response[] = []
  for (const p of personas) {
    const tasks = tasksByPersona.find((t) => t.personaId === p.id)!.tasks
    for (const t of tasks) {
      out.push(simulateOne(p, t, 'llama'))
      out.push(simulateOne(p, t, 'qwen'))
    }
  }
  return out
}
