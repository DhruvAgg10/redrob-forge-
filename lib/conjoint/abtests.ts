// A/B test runner over the 100-respondent panel.
// For each test, randomly assign half panel to A and half to B, compute conversion + z-test significance.

import { Persona } from './personas'
import { Bundle } from './design'

export type AbVariant = {
  name: string
  bundle: Partial<Bundle> & { price: number }
}

export type AbTest = {
  id: string
  hypothesis: string
  primaryMetric: 'conversion to subscribe'
  variants: { A: AbVariant; B: AbVariant }
  results: {
    nA: number; convA: number; rateA: number
    nB: number; convB: number; rateB: number
    lift: number              // % lift of B over A
    zScore: number
    pValue: number
    significant: boolean
    confidence: number        // 0-100
    winner: 'A' | 'B' | 'tie'
  }
}

function scoreBundleForAB(p: Persona, b: Bundle): number {
  // Simplified: same logic as simulator but condensed
  const incomePenalty: Record<string, number> = { '₹0': 0.020, '₹4-8L': 0.013, '₹8-15L': 0.008, '₹15-30L': 0.005, '₹30L+': 0.003 }
  const riskMult: Record<string, number> = { 'price-sensitive': 1.6, 'feature-maximizer': 0.7, 'status-premium': 0.5 }
  let s = -b.price * incomePenalty[p.incomeBand] * riskMult[p.riskProfile]

  const credVal = b.credentials === 'Unlimited' ? 1.0 : Math.min(1.0, (b.credentials as number) / 25)
  s += credVal * 1.6

  const atsVal = b.atsScans === 'Unlimited + AI' ? 1.0
              : b.atsScans === '25 + AI' ? 0.85
              : b.atsScans === '10 + AI' ? 0.7
              : b.atsScans === '10 basic' ? 0.5 : 0.3
  s += atsVal * 1.2

  const cpVal = b.careerPath === 'Unlimited' ? 1.0 : Math.min(1.0, (b.careerPath as number) / 10)
  s += cpVal * 0.9

  const diVal = b.defenceInterview === 'Unlimited' ? 1.0
              : b.defenceInterview === '5/mo' ? 0.75
              : b.defenceInterview === '2/mo' ? 0.5
              : b.defenceInterview === '1/mo' ? 0.3 : 0
  s += diVal * 0.8

  const lbVal = b.leaderboard === 'Verified hire-ready' ? 1.0
              : b.leaderboard === 'Top of feed' ? 0.75
              : b.leaderboard === 'Boosted' ? 0.4 : 0
  s += lbVal * (p.riskProfile === 'status-premium' ? 1.5 : 0.6)

  if (b.annualDiscount && b.annualDiscount > 0 && b.price > 0) {
    s += (b.annualDiscount / 50) * (p.riskProfile === 'price-sensitive' ? 1.3 : 0.7) * 0.4
  }
  return s
}

const DEFAULT_FILL: Bundle = {
  id: 'default',
  price: 0,
  credentials: 1, atsScans: '3 basic', careerPath: 1,
  defenceInterview: 'None', leaderboard: 'Standard', annualDiscount: 0,
}

function expand(v: AbVariant): Bundle {
  return { ...DEFAULT_FILL, ...v.bundle } as Bundle
}

function zTestProportions(nA: number, convA: number, nB: number, convB: number) {
  const pA = convA / Math.max(1, nA)
  const pB = convB / Math.max(1, nB)
  const pPool = (convA + convB) / Math.max(1, nA + nB)
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB))
  const z = se === 0 ? 0 : (pB - pA) / se
  // Two-tailed approximate p-value via standard normal CDF
  const p = 2 * (1 - normalCdf(Math.abs(z)))
  return { z, p }
}

function normalCdf(x: number): number {
  // Abramowitz-Stegun approximation
  const t = 1 / (1 + 0.2316419 * x)
  const d = 0.3989422804 * Math.exp(-x * x / 2)
  const probMore = d * (t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))))
  return 1 - probMore
}

export function runAbTest(personas: Persona[], test: Omit<AbTest, 'results'> & { seed?: number }): AbTest {
  // Stable hash-based 50/50 split using personaId
  const seed = test.seed ?? 1
  let nA = 0, convA = 0, nB = 0, convB = 0
  const bundleA = expand(test.variants.A)
  const bundleB = expand(test.variants.B)

  for (const p of personas) {
    const inA = ((p.id + seed) % 2) === 0
    if (inA) {
      nA++
      // "Converted" if utility > 0.4 (a typical decision threshold)
      const s = scoreBundleForAB(p, bundleA)
      if (s > 0.4) convA++
    } else {
      nB++
      const s = scoreBundleForAB(p, bundleB)
      if (s > 0.4) convB++
    }
  }

  const rateA = nA > 0 ? convA / nA : 0
  const rateB = nB > 0 ? convB / nB : 0
  const lift = rateA > 0 ? ((rateB - rateA) / rateA) * 100 : 0
  const { z, p: pVal } = zTestProportions(nA, convA, nB, convB)
  const significant = pVal < 0.05
  const confidence = (1 - pVal) * 100
  const winner: 'A' | 'B' | 'tie' = !significant ? 'tie' : (rateB > rateA ? 'B' : 'A')

  return {
    ...test,
    results: { nA, convA, rateA, nB, convB, rateB, lift, zScore: z, pValue: pVal, significant, confidence, winner },
  }
}

export const DEFAULT_AB_TESTS = (): Omit<AbTest, 'results'>[] => [
  {
    id: 'price-basic-0-vs-99',
    hypothesis: 'Students earning ₹0-8L will not pay ₹99 for 2 extra credentials per month.',
    primaryMetric: 'conversion to subscribe',
    variants: {
      A: { name: 'Free @ ₹0/mo · 1 cred', bundle: { price: 0, credentials: 1, atsScans: '3 basic', careerPath: 1, defenceInterview: 'None', leaderboard: 'Standard', annualDiscount: 0 } },
      B: { name: 'Basic @ ₹99/mo · 3 cred', bundle: { price: 99, credentials: 3, atsScans: '3 basic', careerPath: 1, defenceInterview: 'None', leaderboard: 'Standard', annualDiscount: 0 } },
    },
  },
  {
    id: 'defence-value-100',
    hypothesis: 'Defence Interview is worth ₹100/mo to career-switchers and MBA aspirants.',
    primaryMetric: 'conversion to subscribe',
    variants: {
      A: { name: 'Pro @ ₹199/mo · no Defence', bundle: { price: 199, credentials: 10, atsScans: '10 + AI', careerPath: 5, defenceInterview: 'None', leaderboard: 'Boosted', annualDiscount: 30 } },
      B: { name: 'Pro @ ₹299/mo · Defence 2/mo', bundle: { price: 299, credentials: 10, atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: 30 } },
    },
  },
  {
    id: 'annual-discount-30-vs-40',
    hypothesis: 'A 40% annual discount will outperform 30% on Pro-tier subscription conversion among price-sensitive segments.',
    primaryMetric: 'conversion to subscribe',
    variants: {
      A: { name: 'Pro · 30% annual off', bundle: { price: 299, credentials: 10, atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: 30 } },
      B: { name: 'Pro · 40% annual off', bundle: { price: 299, credentials: 10, atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: 40 } },
    },
  },
  {
    id: 'status-badge-premium',
    hypothesis: 'Status-premium personas will pay 67% more for verified hire-ready badge.',
    primaryMetric: 'conversion to subscribe',
    variants: {
      A: { name: 'Pro @ ₹299/mo · Boosted', bundle: { price: 299, credentials: 10, atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: 30 } },
      B: { name: 'Pro+ @ ₹499/mo · Verified hire-ready', bundle: { price: 499, credentials: 10, atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Verified hire-ready', annualDiscount: 30 } },
    },
  },
  {
    id: 'unlimited-ceiling',
    hypothesis: 'The word "Unlimited" drives >15% conversion lift among feature-maximizer personas.',
    primaryMetric: 'conversion to subscribe',
    variants: {
      A: { name: 'Pro @ ₹249/mo · 5 cred', bundle: { price: 249, credentials: 5, atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: 30 } },
      B: { name: 'Pro @ ₹349/mo · Unlimited cred', bundle: { price: 349, credentials: 'Unlimited', atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: 30 } },
    },
  },
  {
    id: 'peer-mentor-value',
    hypothesis: 'AI Peer Mentor + badge bundle justifies ₹200 premium for salary-jump seekers.',
    primaryMetric: 'conversion to subscribe',
    variants: {
      A: { name: 'Pro @ ₹299/mo · no Peer Mentor · Boosted', bundle: { price: 299, credentials: 10, atsScans: '10 + AI', careerPath: 5, defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: 30 } },
      B: { name: 'Pro+ @ ₹499/mo · Peer Mentor · Verified hire-ready', bundle: { price: 499, credentials: 'Unlimited', atsScans: 'Unlimited + AI', careerPath: 'Unlimited', defenceInterview: '5/mo', leaderboard: 'Verified hire-ready', annualDiscount: 40 } },
    },
  },
]
