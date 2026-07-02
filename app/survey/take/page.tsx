'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, ClipboardCheck, BarChart3, GripVertical } from 'lucide-react'

/* ─── 6 focused A/B tasks ─── */
const TASKS = [
  {
    hypothesis: 'Will students pay ₹99 for slightly more?',
    A: { name: 'Free', price: 0, features: ['1 credential/mo', 'Basic ATS scan', 'Standard leaderboard'] },
    B: { name: 'Basic', price: 99, features: ['3 credentials/mo', 'Basic ATS scan', 'Standard leaderboard'] },
  },
  {
    hypothesis: 'Is Defence Interview worth ₹100?',
    A: { name: 'Pro', price: 199, features: ['10 credentials/mo', 'AI ATS scanner', 'No Defence Interview'] },
    B: { name: 'Pro', price: 299, features: ['10 credentials/mo', 'AI ATS scanner', '2 Defence Interview sessions/mo'] },
  },
  {
    hypothesis: 'Does 10% more annual discount move the needle?',
    A: { name: 'Pro', price: 299, features: ['10 credentials/mo', 'AI ATS scanner', '30% annual discount'] },
    B: { name: 'Pro', price: 299, features: ['10 credentials/mo', 'AI ATS scanner', '40% annual discount'] },
  },
  {
    hypothesis: 'Will status-seekers pay 67% more for badge?',
    A: { name: 'Pro', price: 299, features: ['10 credentials/mo', 'Boosted leaderboard', 'No badge'] },
    B: { name: 'Pro+', price: 499, features: ['10 credentials/mo', 'Boosted leaderboard', 'Verified hire-ready badge'] },
  },
  {
    hypothesis: 'Price sensitivity around unlimited',
    A: { name: 'Pro', price: 249, features: ['5 credentials/mo', 'AI ATS scanner', 'Career Path'] },
    B: { name: 'Pro', price: 349, features: ['Unlimited credentials', 'AI ATS scanner', 'Career Path'] },
  },
  {
    hypothesis: 'Is AI Peer Mentor a ₹200 feature?',
    A: { name: 'Pro', price: 299, features: ['10 credentials/mo', 'AI ATS scanner', 'No Peer Mentor'] },
    B: { name: 'Pro+', price: 499, features: ['Unlimited credentials', 'AI ATS scanner', 'AI Peer Mentor'] },
  },
]

const FEATURE_LIST = [
  'W3C Credential (portable proof)',
  'AI Defence Interview (anti-cheat)',
  'AI Peer Mentor (learn from top performers)',
  'Career Path (role recommendations)',
  'ATS Scanner (resume optimization)',
  'Skills Leaderboard (visibility to recruiters)',
  'Credential Wallet (store all creds)',
]

const STATE_OPTIONS = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi-NCR', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Other']
const AGE_OPTIONS = ['18-22', '23-26', '27-32', '33-40', '41+']
const INCOME_OPTIONS = ['₹0 (student)', '₹4-8L', '₹8-15L', '₹15-30L', '₹30L+']
const ROLE_OPTIONS = ['Student', 'Junior IC (0-3 yrs)', 'Senior IC (3-7 yrs)', 'Manager', 'Founder', 'Recruiter/HR']
const GOAL_OPTIONS = ['MBA admit', 'PM/Product switch', 'Salary jump', 'Move abroad/remote', 'Start own thing', 'Hire team']
const COLLEGE_TIER_OPTIONS = ['IIT/IIM/NIT', 'Tier-1 private', 'Tier-2', 'Tier-3', 'Self-taught']

type Step = 'intro' | 'profile' | 'tasks' | 'vanWestendorp' | 'featureRank' | 'wtp' | 'thanks'

export default function TakeSurvey() {
  const [step, setStep] = useState<Step>('intro')
  const [taskIdx, setTaskIdx] = useState(0)
  const [profile, setProfile] = useState({ state: '', age: '', income: '', role: '', goal: '' })
  const [choices, setChoices] = useState<string[]>(new Array(TASKS.length).fill(''))
  const [reasons, setReasons] = useState<string[]>(new Array(TASKS.length).fill(''))
  const [maxWTP, setMaxWTP] = useState<number | null>(null)
  const [quote, setQuote] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [responseCount, setResponseCount] = useState<number>(0)

  // New fields
  const [currentPlatform, setCurrentPlatform] = useState<{ paying: string; which: string }>({ paying: '', which: '' })
  const [collegeTier, setCollegeTier] = useState('')
  const [vanWestendorp, setVanWestendorp] = useState({ tooCheap: '', cheap: '', expensive: '', tooExpensive: '' })
  const [featureRanking, setFeatureRanking] = useState<string[]>([])
  const [habitFeatures, setHabitFeatures] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/survey/submit').then((r) => r.json()).then((d) => setResponseCount(d.count || 0)).catch(() => {})
    window.scrollTo({ top: 0 })
  }, [submittedId, step])

  const profileValid = !!(profile.state && profile.age && profile.income && profile.role && profile.goal && city.trim() && collegeTier && currentPlatform.paying)
  const taskValid = !!choices[taskIdx]
  const vwValid = !!(vanWestendorp.tooCheap && vanWestendorp.cheap && vanWestendorp.expensive && vanWestendorp.tooExpensive)
  const featureRankValid = featureRanking.length === 3 && habitFeatures.length >= 1

  const totalSteps = 6 // intro, profile, tasks, vw, features, wtp
  const currentStep =
    step === 'intro' ? 0
    : step === 'profile' ? 1
    : step === 'tasks' ? 2
    : step === 'vanWestendorp' ? 3
    : step === 'featureRank' ? 4
    : step === 'wtp' ? 5
    : 6
  const progressPct = step === 'thanks' ? 100 : ((currentStep + (step === 'tasks' ? taskIdx / TASKS.length : 0)) / totalSteps) * 100

  async function submit() {
    setSubmitting(true)
    try {
      const r = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || null,
          city: city.trim(),
          profile,
          collegeTier,
          currentPlatform,
          choices: choices.map((c, i) => ({ taskNum: i + 1, choice: c, reason: reasons[i] })),
          vanWestendorp: {
            tooCheap: Number(vanWestendorp.tooCheap),
            cheap: Number(vanWestendorp.cheap),
            expensive: Number(vanWestendorp.expensive),
            tooExpensive: Number(vanWestendorp.tooExpensive),
          },
          featureRanking,
          habitFeatures,
          maxWTP, quote,
        }),
      })
      const d = await r.json()
      setSubmittedId(d.id)
      setStep('thanks')
      fetch('/api/survey/summarize', { method: 'POST' }).catch(() => {})
    } catch (e: any) {
      alert('Could not submit — ' + String(e.message || e))
    } finally {
      setSubmitting(false)
    }
  }

  function setChoice(c: string) {
    const next = [...choices]; next[taskIdx] = c; setChoices(next)
  }
  function updateReason(r: string) {
    const next = [...reasons]; next[taskIdx] = r; setReasons(next)
  }

  function toggleFeatureRank(f: string) {
    setFeatureRanking((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f)
      if (prev.length >= 3) return prev
      return [...prev, f]
    })
  }

  function toggleHabitFeature(f: string) {
    setHabitFeatures((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f)
      if (prev.length >= 2) return prev
      return [...prev, f]
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col" style={{ touchAction: 'manipulation' }}>
      <header className="bg-white border-b border-[#E5E7EB] py-3 px-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#0A0A0A] flex items-center justify-center shrink-0">
              <div className="w-3 h-3 rounded-sm bg-[#2563EB]"/>
            </div>
            <span className="font-semibold text-sm sm:text-base truncate">Forge Pricing Survey</span>
          </div>
          <Link href="/survey" className="text-[10px] font-mono text-[#525252] uppercase tracking-wider whitespace-nowrap">
            {responseCount} responses
          </Link>
        </div>
        <div className="max-w-3xl mx-auto mt-2">
          <div className="h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] transition-all duration-300" style={{ width: `${progressPct}%` }}/>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-5 sm:py-8">
        <div className="max-w-3xl mx-auto">

          {/* ─── INTRO ─── */}
          {step === 'intro' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-8">
              <div className="text-[11px] uppercase tracking-wider font-mono text-[#2563EB] flex items-center gap-2 mb-3">
                <ClipboardCheck size={12}/> Help us price Forge fairly
              </div>
              <h1 className="font-semibold text-2xl sm:text-3xl text-[#0A0A0A] leading-tight">What would you actually pay?</h1>
              <p className="text-[#525252] mt-4 leading-relaxed text-sm sm:text-base">
                Forge is a new product layer inside Redrob that helps you verify skills, earn portable W3C credentials, and land jobs through real work.
                We&apos;re trying to price it fairly for Indian users — not what consultants suggest, but what you&apos;d genuinely pay.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-[#FAFAFA] p-3"><span className="font-semibold">5 minutes</span> · ~15 short questions</div>
                <div className="rounded-xl bg-[#FAFAFA] p-3"><span className="font-semibold">Anonymous</span> · no login or email</div>
                <div className="rounded-xl bg-[#FAFAFA] p-3"><span className="font-semibold">Real impact</span> · sets our pricing</div>
              </div>
              <button
                type="button"
                onClick={() => setStep('profile')}
                className="mt-6 w-full bg-[#2563EB] text-white py-4 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 active:bg-[#1d4ed8]"
                style={{ minHeight: 52 }}>
                Start <ArrowRight size={16}/>
              </button>
            </div>
          )}

          {/* ─── PROFILE ─── */}
          {step === 'profile' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-8">
              <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Step 1 of 5</div>
              <h2 className="font-semibold text-xl sm:text-2xl mt-1">Tell us about you</h2>
              <p className="text-xs sm:text-sm text-[#525252] mt-1">No PII — just enough to slice responses by segment.</p>

              <div className="mt-5 space-y-4">
                <Field label="Your name (optional)">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dhruv Aggarwal" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-base" style={{ fontSize: 16 }}/>
                </Field>
                <Field label="City *">
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Bangalore, Lucknow, Pune" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-base" style={{ fontSize: 16 }}/>
                </Field>
                <Field label="State *">
                  <ChipGroup value={profile.state} options={STATE_OPTIONS} onChange={(v) => setProfile({ ...profile, state: v })}/>
                </Field>
                <Field label="Age *">
                  <ChipGroup value={profile.age} options={AGE_OPTIONS} onChange={(v) => setProfile({ ...profile, age: v })}/>
                </Field>
                <Field label="Annual income *">
                  <ChipGroup value={profile.income} options={INCOME_OPTIONS} onChange={(v) => setProfile({ ...profile, income: v })}/>
                </Field>
                <Field label="Current stage *">
                  <ChipGroup value={profile.role} options={ROLE_OPTIONS} onChange={(v) => setProfile({ ...profile, role: v })}/>
                </Field>
                <Field label="Goal in next 1-2 years *">
                  <ChipGroup value={profile.goal} options={GOAL_OPTIONS} onChange={(v) => setProfile({ ...profile, goal: v })}/>
                </Field>
                <Field label="College tier *">
                  <ChipGroup value={collegeTier} options={COLLEGE_TIER_OPTIONS} onChange={setCollegeTier}/>
                </Field>
                <Field label="Currently paying for any career/learning platform? *">
                  <ChipGroup value={currentPlatform.paying} options={['Yes', 'No']} onChange={(v) => setCurrentPlatform({ ...currentPlatform, paying: v, which: v === 'No' ? '' : currentPlatform.which })}/>
                </Field>
                {currentPlatform.paying === 'Yes' && (
                  <Field label="Which one(s)?">
                    <input type="text" value={currentPlatform.which} onChange={(e) => setCurrentPlatform({ ...currentPlatform, which: e.target.value })} placeholder="e.g. Coursera, Unacademy, LinkedIn Premium" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-base" style={{ fontSize: 16 }}/>
                  </Field>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep('intro')}
                        className="px-4 py-3 rounded-xl text-sm text-[#525252] active:bg-[#FAFAFA]" style={{ minHeight: 48 }}>
                  ← Back
                </button>
                <button type="button"
                        onClick={() => { setTaskIdx(0); setStep('tasks') }}
                        disabled={!profileValid}
                        className="flex-1 bg-[#0A0A0A] text-white py-3 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 disabled:opacity-40 active:bg-black"
                        style={{ minHeight: 52 }}>
                  Next: Pricing choices <ArrowRight size={16}/>
                </button>
              </div>
              {!profileValid && (
                <div className="text-xs text-[#DC2626] mt-2 text-center">
                  Fill all fields marked with * to continue.
                </div>
              )}
            </div>
          )}

          {/* ─── A/B TASKS ─── */}
          {step === 'tasks' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-4 sm:p-6">
              <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Step 2 of 5 · Q {taskIdx + 1} of {TASKS.length}</div>
              <h2 className="font-semibold text-xl sm:text-2xl mt-1">Which would you pick?</h2>
              <p className="text-xs sm:text-sm text-[#525252] mt-1">Tap one plan, or &quot;Neither&quot;.</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <PlanCard plan={TASKS[taskIdx].A} selected={choices[taskIdx] === 'A'} onClick={() => setChoice('A')}/>
                <PlanCard plan={TASKS[taskIdx].B} selected={choices[taskIdx] === 'B'} onClick={() => setChoice('B')}/>
              </div>
              <button type="button" onClick={() => setChoice('None')}
                      className={`mt-3 w-full py-3 rounded-xl text-sm font-semibold border-2 ${choices[taskIdx] === 'None' ? 'border-[#DC2626] bg-[#FEE2E2] text-[#DC2626]' : 'border-[#E5E7EB] text-[#525252]'}`}
                      style={{ minHeight: 48 }}>
                Neither — not worth it for me
              </button>

              <Field label="One sentence — why?">
                <input type="text" value={reasons[taskIdx]} onChange={(e) => updateReason(e.target.value)}
                       placeholder="e.g. The annual discount makes it worth it"
                       className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-base mt-2"
                       style={{ fontSize: 16 }}/>
              </Field>

              <div className="mt-5 flex gap-2">
                <button type="button" onClick={() => {
                  if (taskIdx === 0) setStep('profile')
                  else setTaskIdx(taskIdx - 1)
                }} className="px-4 py-3 rounded-xl text-sm text-[#525252] active:bg-[#FAFAFA] inline-flex items-center gap-1" style={{ minHeight: 48 }}>
                  <ArrowLeft size={14}/> Back
                </button>
                <button type="button" onClick={() => {
                  if (taskIdx === TASKS.length - 1) setStep('vanWestendorp')
                  else setTaskIdx(taskIdx + 1)
                }} disabled={!taskValid}
                        className="flex-1 bg-[#0A0A0A] text-white py-3 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 disabled:opacity-40 active:bg-black"
                        style={{ minHeight: 52 }}>
                  {taskIdx === TASKS.length - 1 ? 'Next section' : 'Next'} <ArrowRight size={16}/>
                </button>
              </div>
            </div>
          )}

          {/* ─── VAN WESTENDORP ─── */}
          {step === 'vanWestendorp' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-8">
              <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Step 3 of 5</div>
              <h2 className="font-semibold text-xl sm:text-2xl mt-1">Price sensitivity</h2>
              <p className="text-xs sm:text-sm text-[#525252] mt-1">Think about Forge as a full monthly subscription — all features included.</p>

              <div className="mt-5 space-y-5">
                <VWQuestion
                  label="At what price would Forge be SO CHEAP you'd doubt its quality?"
                  tag="Too Cheap"
                  value={vanWestendorp.tooCheap}
                  onChange={(v) => setVanWestendorp({ ...vanWestendorp, tooCheap: v })}
                />
                <VWQuestion
                  label="At what price is Forge a BARGAIN — great value for money?"
                  tag="Good Value"
                  value={vanWestendorp.cheap}
                  onChange={(v) => setVanWestendorp({ ...vanWestendorp, cheap: v })}
                />
                <VWQuestion
                  label="At what price does Forge start to feel EXPENSIVE but you'd still consider it?"
                  tag="Expensive"
                  value={vanWestendorp.expensive}
                  onChange={(v) => setVanWestendorp({ ...vanWestendorp, expensive: v })}
                />
                <VWQuestion
                  label="At what price is Forge TOO EXPENSIVE — you'd never buy it?"
                  tag="Too Expensive"
                  value={vanWestendorp.tooExpensive}
                  onChange={(v) => setVanWestendorp({ ...vanWestendorp, tooExpensive: v })}
                />
              </div>

              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => { setTaskIdx(TASKS.length - 1); setStep('tasks') }}
                        className="px-4 py-3 rounded-xl text-sm text-[#525252] active:bg-[#FAFAFA] inline-flex items-center gap-1" style={{ minHeight: 48 }}>
                  <ArrowLeft size={14}/> Back
                </button>
                <button type="button" onClick={() => setStep('featureRank')} disabled={!vwValid}
                        className="flex-1 bg-[#0A0A0A] text-white py-3 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 disabled:opacity-40 active:bg-black"
                        style={{ minHeight: 52 }}>
                  Next: Feature ranking <ArrowRight size={16}/>
                </button>
              </div>
            </div>
          )}

          {/* ─── FEATURE RANKING + HABIT ─── */}
          {step === 'featureRank' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-8">
              <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Step 4 of 5</div>
              <h2 className="font-semibold text-xl sm:text-2xl mt-1">Feature priorities</h2>

              <div className="mt-5">
                <Field label="Pick your TOP 3 features in order of importance (tap to select 1st, 2nd, 3rd)">
                  <div className="mt-2 space-y-2">
                    {FEATURE_LIST.map((f) => {
                      const idx = featureRanking.indexOf(f)
                      const selected = idx >= 0
                      return (
                        <button type="button" key={f} onClick={() => toggleFeatureRank(f)}
                                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium flex items-center gap-3 ${selected ? 'border-[#2563EB] bg-[#2563EB]/5' : 'border-[#E5E7EB] bg-white'}`}
                                style={{ minHeight: 48 }}>
                          {selected ? (
                            <span className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold shrink-0">
                              {idx + 1}
                            </span>
                          ) : (
                            <span className="w-7 h-7 rounded-full border-2 border-[#E5E7EB] flex items-center justify-center shrink-0">
                              <GripVertical size={12} className="text-[#A1A1AA]"/>
                            </span>
                          )}
                          <span className={selected ? 'text-[#0A0A0A]' : 'text-[#525252]'}>{f}</span>
                        </button>
                      )
                    })}
                  </div>
                  {featureRanking.length > 0 && featureRanking.length < 3 && (
                    <div className="text-xs text-[#2563EB] mt-2">Pick {3 - featureRanking.length} more</div>
                  )}
                </Field>
              </div>

              <div className="mt-6">
                <Field label="Which feature would you use WEEKLY? (pick up to 2)">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {FEATURE_LIST.map((f) => {
                      const selected = habitFeatures.includes(f)
                      return (
                        <button type="button" key={f} onClick={() => toggleHabitFeature(f)}
                                className={`px-3 py-2 rounded-full text-xs font-medium border ${selected ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white border-[#E5E7EB] text-[#525252]'}`}
                                style={{ minHeight: 40 }}>
                          {f.split(' (')[0]}
                        </button>
                      )
                    })}
                  </div>
                </Field>
              </div>

              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep('vanWestendorp')}
                        className="px-4 py-3 rounded-xl text-sm text-[#525252] active:bg-[#FAFAFA] inline-flex items-center gap-1" style={{ minHeight: 48 }}>
                  <ArrowLeft size={14}/> Back
                </button>
                <button type="button" onClick={() => setStep('wtp')} disabled={!featureRankValid}
                        className="flex-1 bg-[#0A0A0A] text-white py-3 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 disabled:opacity-40 active:bg-black"
                        style={{ minHeight: 52 }}>
                  Last step <ArrowRight size={16}/>
                </button>
              </div>
              {!featureRankValid && (
                <div className="text-xs text-[#DC2626] mt-2 text-center">
                  Pick 3 ranked features and at least 1 weekly-use feature.
                </div>
              )}
            </div>
          )}

          {/* ─── MAX WTP + FINAL QUOTE ─── */}
          {step === 'wtp' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-8">
              <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Step 5 of 5 · Last two</div>
              <h2 className="font-semibold text-xl sm:text-2xl mt-1">Two final questions</h2>

              <div className="mt-5">
                <Field label="What's the absolute MAX you'd pay per month for Forge?">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                    {[0, 99, 149, 199, 249, 299, 399, 499, 599, 699, 999].map((p) => (
                      <button type="button" key={p} onClick={() => setMaxWTP(p)}
                              className={`py-3 rounded-lg text-sm font-semibold border ${maxWTP === p ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white border-[#E5E7EB] text-[#525252]'}`}
                              style={{ minHeight: 48 }}>
                        {p === 0 ? 'Free only' : `₹${p}`}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="One sentence — what would make you DEFINITELY subscribe?">
                  <textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={3}
                            placeholder="e.g. If credentials are accepted by Andela/Mercor I'd commit; otherwise free only."
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-base mt-2"
                            style={{ fontSize: 16 }}/>
                </Field>
              </div>

              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep('featureRank')}
                        className="px-4 py-3 rounded-xl text-sm text-[#525252] active:bg-[#FAFAFA] inline-flex items-center gap-1" style={{ minHeight: 48 }}>
                  <ArrowLeft size={14}/> Back
                </button>
                <button type="button" onClick={submit} disabled={maxWTP === null || !quote.trim() || submitting}
                        className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 disabled:opacity-40 active:bg-[#1d4ed8]"
                        style={{ minHeight: 52 }}>
                  {submitting ? 'Submitting...' : <>Submit <Sparkles size={16}/></>}
                </button>
              </div>
            </div>
          )}

          {/* ─── THANKS ─── */}
          {step === 'thanks' && (
            <div className="rounded-2xl bg-white border border-[#16A34A]/40 p-6 text-center">
              <CheckCircle2 size={42} className="text-[#16A34A] mx-auto"/>
              <h2 className="font-semibold text-2xl sm:text-3xl mt-3">Thanks — submitted.</h2>
              <p className="text-[#525252] mt-2 text-sm">Your response ID: <span className="font-mono">{submittedId}</span></p>
              <p className="text-sm text-[#0A0A0A] mt-4">
                Your answers feed our Live Research panel.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/survey" className="bg-[#0A0A0A] text-white px-4 py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2" style={{ minHeight: 48 }}>
                  <BarChart3 size={14}/> See live results
                </Link>
                <button type="button" onClick={() => {
                  setSubmittedId(null); setStep('intro')
                  setChoices(new Array(TASKS.length).fill(''))
                  setReasons(new Array(TASKS.length).fill(''))
                  setMaxWTP(null); setQuote(''); setName(''); setCity('')
                  setProfile({ state: '', age: '', income: '', role: '', goal: '' })
                  setCollegeTier(''); setCurrentPlatform({ paying: '', which: '' })
                  setVanWestendorp({ tooCheap: '', cheap: '', expensive: '', tooExpensive: '' })
                  setFeatureRanking([]); setHabitFeatures([])
                }} className="border border-[#E5E7EB] px-4 py-3 rounded-xl text-sm font-medium" style={{ minHeight: 48 }}>
                  Share with a friend
                </button>
              </div>
            </div>
          )}

          {step === 'thanks' && <LiveResultsTeaser/>}
        </div>
      </main>
    </div>
  )
}

/* ─── Van Westendorp question component ─── */
function VWQuestion({ label, tag, value, onChange }: { label: string; tag: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-sm font-semibold text-[#0A0A0A]">{label}</div>
      <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] mt-0.5">{tag}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm font-semibold text-[#525252]">₹</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={999}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0 – 999"
          className="flex-1 px-4 py-3 border border-[#E5E7EB] rounded-xl text-base"
          style={{ fontSize: 16 }}
        />
      </div>
    </div>
  )
}

/* ─── Plan card for A/B tasks ─── */
function PlanCard({ plan, selected, onClick }: { plan: { name: string; price: number; features: string[] }; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
            className={`text-left rounded-2xl p-4 border-2 ${selected ? 'border-[#2563EB] bg-[#2563EB]/5' : 'border-[#E5E7EB] bg-white'}`}
            style={{ minHeight: 160 }}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA]">{plan.name}</span>
      </div>
      <div className="font-semibold text-xl sm:text-2xl text-[#0A0A0A]">{plan.price === 0 ? 'Free' : `₹${plan.price}/mo`}</div>
      <div className="mt-3 space-y-1">
        {plan.features.map((f, i) => (
          <div key={i} className="text-xs text-[#0A0A0A] flex items-start gap-1.5">
            <span className="text-[#2563EB] mt-0.5 shrink-0">·</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
    </button>
  )
}

function LiveResultsTeaser() {
  const [data, setData] = useState<{ responses: any[]; summary?: string } | null>(null)
  useEffect(() => {
    Promise.all([
      fetch('/api/survey/submit').then((r) => r.json()),
      fetch('/api/survey/summarize').then((r) => r.json()).catch(() => ({}))
    ]).then(([subs, sum]) => {
      setData({ responses: subs.responses || [], summary: sum.summary })
    })
  }, [])

  if (!data) return null

  return (
    <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white p-5">
      <div className="text-xs uppercase tracking-wider font-mono text-[#2563EB] mb-3">
        Live results · {data.responses.length} response{data.responses.length === 1 ? '' : 's'}
      </div>
      {data.summary && (
        <div className="rounded-xl bg-[#FAFAFA] p-3 mb-3">
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">Llama 3.3 70B summary</div>
          <p className="text-sm text-[#0A0A0A] leading-relaxed">{data.summary}</p>
        </div>
      )}
      <div className="space-y-2">
        {data.responses.slice(0, 5).map((r: any) => (
          <div key={r.id} className="rounded-lg border border-[#E5E7EB] p-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 mb-1 text-[#525252]">
              <span className="font-mono px-1.5 py-0.5 rounded bg-[#F4F4F5]">{r.id}</span>
              <span className="font-semibold text-[#0A0A0A]">{r.name || 'Anonymous'}</span>
              <span>{r.city}</span>
              <span>· max ₹{r.maxWTP}</span>
            </div>
            <div className="text-[#0A0A0A] italic">&quot;{r.quote}&quot;</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-3">
        <Link href="/survey" className="text-xs text-[#2563EB] underline">View full dashboard →</Link>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-semibold text-[#0A0A0A]">{label}</div>
      {children}
    </div>
  )
}

function ChipGroup({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {options.map((o) => (
        <button type="button" key={o} onClick={() => onChange(o)}
                className={`px-3 py-2 rounded-full text-sm font-medium border ${value === o ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white border-[#E5E7EB] text-[#525252]'}`}
                style={{ minHeight: 40 }}>
          {o}
        </button>
      ))}
    </div>
  )
}
