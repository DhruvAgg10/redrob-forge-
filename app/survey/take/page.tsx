'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, ClipboardCheck, BarChart3 } from 'lucide-react'

const TASKS = [
  {
    A: { price: 199, credentials: '10', atsScans: '10 + AI', careerPath: '5', defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: '20%' },
    B: { price: 0,   credentials: '3',  atsScans: '3 basic', careerPath: '1', defenceInterview: 'None',  leaderboard: 'Standard', annualDiscount: '0%' },
  },
  {
    A: { price: 299, credentials: 'Unlimited', atsScans: 'Unlimited + AI', careerPath: 'Unlimited', defenceInterview: '5/mo', leaderboard: 'Top of feed', annualDiscount: '30%' },
    B: { price: 149, credentials: '5', atsScans: '10 + AI', careerPath: '3', defenceInterview: '1/mo', leaderboard: 'Boosted', annualDiscount: '20%' },
  },
  {
    A: { price: 499, credentials: 'Unlimited', atsScans: 'Unlimited + AI', careerPath: 'Unlimited', defenceInterview: 'Unlimited', leaderboard: 'Verified hire-ready', annualDiscount: '40%' },
    B: { price: 249, credentials: '10', atsScans: '10 + AI', careerPath: '5', defenceInterview: '2/mo', leaderboard: 'Top of feed', annualDiscount: '25%' },
  },
  {
    A: { price: 99, credentials: '3', atsScans: '10 basic', careerPath: '3', defenceInterview: 'None', leaderboard: 'Standard', annualDiscount: '15%' },
    B: { price: 199, credentials: '10', atsScans: '10 + AI', careerPath: '5', defenceInterview: '1/mo', leaderboard: 'Boosted', annualDiscount: '25%' },
  },
  {
    A: { price: 399, credentials: '25', atsScans: '25 + AI', careerPath: '10', defenceInterview: '5/mo', leaderboard: 'Top of feed', annualDiscount: '30%' },
    B: { price: 699, credentials: 'Unlimited', atsScans: 'Unlimited + AI', careerPath: 'Unlimited', defenceInterview: 'Unlimited', leaderboard: 'Verified hire-ready', annualDiscount: '50%' },
  },
  {
    A: { price: 149, credentials: '5', atsScans: '10 + AI', careerPath: '3', defenceInterview: '1/mo', leaderboard: 'Standard', annualDiscount: '20%' },
    B: { price: 249, credentials: '10', atsScans: '25 + AI', careerPath: '10', defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: '30%' },
  },
  {
    A: { price: 0, credentials: '1', atsScans: '3 basic', careerPath: '1', defenceInterview: 'None', leaderboard: 'Standard', annualDiscount: '0%' },
    B: { price: 99, credentials: '3', atsScans: '10 basic', careerPath: '3', defenceInterview: '1/mo', leaderboard: 'Standard', annualDiscount: '15%' },
  },
  {
    A: { price: 299, credentials: '10', atsScans: 'Unlimited + AI', careerPath: '5', defenceInterview: '2/mo', leaderboard: 'Boosted', annualDiscount: '35%' },
    B: { price: 399, credentials: 'Unlimited', atsScans: '25 + AI', careerPath: '10', defenceInterview: '5/mo', leaderboard: 'Top of feed', annualDiscount: '40%' },
  },
]

const STATE_OPTIONS = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi-NCR', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Other']
const AGE_OPTIONS = ['18-22', '23-26', '27-32', '33-40', '41+']
const INCOME_OPTIONS = ['₹0 (student)', '₹4-8L', '₹8-15L', '₹15-30L', '₹30L+']
const ROLE_OPTIONS = ['Student', 'Junior IC (0-3 yrs)', 'Senior IC (3-7 yrs)', 'Manager', 'Founder', 'Recruiter/HR']
const GOAL_OPTIONS = ['MBA admit', 'PM/Product switch', 'Salary jump', 'Move abroad/remote', 'Start own thing', 'Hire team']

type Step = 'intro' | 'profile' | 'tasks' | 'wtp' | 'thanks'

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

  // Live responses count (updates after submission)
  useEffect(() => {
    fetch('/api/survey/submit').then((r) => r.json()).then((d) => setResponseCount(d.count || 0)).catch(() => {})
  }, [submittedId])

  const profileValid = !!(profile.state && profile.age && profile.income && profile.role && profile.goal && city.trim())
  const taskValid = !!choices[taskIdx]
  const totalProgressSteps = 1 + TASKS.length + 1  // profile + tasks + wtp
  const completedSteps =
    step === 'intro' ? 0
    : step === 'profile' ? (profileValid ? 1 : 0)
    : step === 'tasks' ? 1 + taskIdx
    : step === 'wtp' ? 1 + TASKS.length
    : totalProgressSteps
  const progressPct = (completedSteps / totalProgressSteps) * 100

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
          choices: choices.map((c, i) => ({ taskNum: i + 1, choice: c, reason: reasons[i] })),
          maxWTP, quote,
        }),
      })
      const d = await r.json()
      setSubmittedId(d.id)
      setStep('thanks')
      // Trigger AI summary regen in background — fire and forget
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <header className="bg-white border-b border-[#E5E7EB] py-3 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-[#2563EB]"/>
            </div>
            <span className="font-semibold text-base">Forge Pricing Survey</span>
          </div>
          <Link href="/survey" className="text-[10px] font-mono text-[#525252] uppercase tracking-wider hover:text-[#0A0A0A]">
            See results · {responseCount}
          </Link>
        </div>
        <div className="max-w-3xl mx-auto mt-3">
          <div className="h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] transition-all duration-300" style={{ width: `${progressPct}%` }}/>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto">

          {step === 'intro' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-8">
              <div className="text-xs uppercase tracking-wider font-mono text-[#2563EB] flex items-center gap-2 mb-3">
                <ClipboardCheck size={12}/> Help us price Forge fairly
              </div>
              <h1 className="font-semibold text-3xl text-[#0A0A0A]">What would you actually pay?</h1>
              <p className="text-[#525252] mt-4 leading-relaxed">
                Forge is a new product layer inside Redrob that helps you verify skills, earn portable W3C credentials, and land jobs through real work.
                We&apos;re trying to price it fairly for Indian users — not what consultants suggest, but what you&apos;d genuinely pay.
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-[#FAFAFA] p-3"><span className="font-semibold">4 minutes</span><br/>~10 short questions</div>
                <div className="rounded-xl bg-[#FAFAFA] p-3"><span className="font-semibold">Anonymous</span><br/>No login or email needed</div>
                <div className="rounded-xl bg-[#FAFAFA] p-3"><span className="font-semibold">Real impact</span><br/>Your responses set our actual pricing</div>
              </div>
              <button onClick={() => setStep('profile')} className="mt-8 w-full bg-[#2563EB] text-white py-4 rounded-xl font-medium inline-flex items-center justify-center gap-2 hover:bg-[#1d4ed8]">
                Start <ArrowRight size={14}/>
              </button>
            </div>
          )}

          {step === 'profile' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-8">
              <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA]">Step 1 of 3</div>
              <h2 className="font-semibold text-2xl mt-1">Tell us about you</h2>
              <p className="text-sm text-[#525252] mt-1">No PII — just enough to slice responses by segment.</p>

              <div className="mt-6 space-y-4">
                <Field label="Your name (optional, makes the data more credible)">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dhruv Aggarwal" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm"/>
                </Field>
                <Field label="City *">
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Bangalore, Lucknow, Pune" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm"/>
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
                <Field label="What's your goal in the next 1-2 years? *">
                  <ChipGroup value={profile.goal} options={GOAL_OPTIONS} onChange={(v) => setProfile({ ...profile, goal: v })}/>
                </Field>
              </div>

              <div className="mt-8 flex gap-3 items-center">
                <button onClick={() => setStep('intro')} className="px-4 py-3 rounded-xl text-sm text-[#525252] hover:bg-[#FAFAFA]">← Back</button>
                <button onClick={() => { setTaskIdx(0); setStep('tasks') }} disabled={!profileValid}
                        className="flex-1 bg-[#0A0A0A] text-white py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-black">
                  Next: Pricing choices <ArrowRight size={14}/>
                </button>
              </div>
              {!profileValid && (
                <div className="text-xs text-[#DC2626] mt-2 text-center">
                  Fill all fields marked with * to continue.
                </div>
              )}
            </div>
          )}

          {step === 'tasks' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-6 sm:p-8">
              <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA]">Step 2 of 3 · Question {taskIdx + 1} of {TASKS.length}</div>
              <h2 className="font-semibold text-2xl mt-1">Which would you actually pick?</h2>
              <p className="text-sm text-[#525252] mt-1">Two real-feeling Forge subscription bundles. Pick one, or &quot;Neither&quot; if both feel wrong.</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <BundleCard label="A" bundle={TASKS[taskIdx].A} selected={choices[taskIdx] === 'A'} onClick={() => setChoice('A')}/>
                <BundleCard label="B" bundle={TASKS[taskIdx].B} selected={choices[taskIdx] === 'B'} onClick={() => setChoice('B')}/>
              </div>
              <button onClick={() => setChoice('None')}
                      className={`mt-3 w-full py-3 rounded-xl text-sm font-medium border ${choices[taskIdx] === 'None' ? 'border-[#DC2626] bg-[#FEE2E2] text-[#DC2626]' : 'border-[#E5E7EB] text-[#525252] hover:bg-[#FAFAFA]'}`}>
                Neither — not worth it for me right now
              </button>

              <Field label="One short sentence — why this choice?">
                <input value={reasons[taskIdx]} onChange={(e) => updateReason(e.target.value)}
                       placeholder="e.g. The annual discount makes it worth it for me"
                       className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm mt-2"/>
              </Field>

              <div className="mt-6 flex gap-3">
                <button onClick={() => {
                  if (taskIdx === 0) setStep('profile')
                  else setTaskIdx(taskIdx - 1)
                }} className="px-4 py-3 rounded-xl text-sm text-[#525252] hover:bg-[#FAFAFA] inline-flex items-center gap-1">
                  <ArrowLeft size={14}/> Back
                </button>
                <button onClick={() => {
                  if (taskIdx === TASKS.length - 1) setStep('wtp')
                  else setTaskIdx(taskIdx + 1)
                }} disabled={!taskValid}
                        className="flex-1 bg-[#0A0A0A] text-white py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-black">
                  {taskIdx === TASKS.length - 1 ? 'Final question' : 'Next'} <ArrowRight size={14}/>
                </button>
              </div>
            </div>
          )}

          {step === 'wtp' && (
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-8">
              <div className="text-xs uppercase tracking-wider font-mono text-[#A1A1AA]">Step 3 of 3 · Last two</div>
              <h2 className="font-semibold text-2xl mt-1">Two final questions</h2>

              <div className="mt-6">
                <Field label="What's the absolute maximum you'd pay per month for Forge if it was perfect for you?">
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {[0, 99, 149, 199, 249, 299, 399, 499, 599, 699, 999].map((p) => (
                      <button key={p} onClick={() => setMaxWTP(p)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium ${maxWTP === p ? 'bg-[#2563EB] text-white' : 'bg-white border border-[#E5E7EB] text-[#525252] hover:border-[#0A0A0A]'}`}>
                        {p === 0 ? 'Only free' : `₹${p}`}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="One sentence — what would make you definitely subscribe to Forge?">
                  <textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={3}
                            placeholder="e.g. If credentials are accepted by Andela/Mercor I'd commit; otherwise free only."
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm mt-2"/>
                </Field>
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={() => { setTaskIdx(TASKS.length - 1); setStep('tasks') }} className="px-4 py-3 rounded-xl text-sm text-[#525252] hover:bg-[#FAFAFA] inline-flex items-center gap-1">
                  <ArrowLeft size={14}/> Back
                </button>
                <button onClick={submit} disabled={maxWTP === null || !quote.trim() || submitting}
                        className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-[#1d4ed8]">
                  {submitting ? 'Submitting…' : <>Submit responses <Sparkles size={14}/></>}
                </button>
              </div>
            </div>
          )}

          {step === 'thanks' && (
            <div className="rounded-2xl bg-white border border-[#16A34A]/40 p-8 text-center">
              <CheckCircle2 size={42} className="text-[#16A34A] mx-auto"/>
              <h2 className="font-semibold text-3xl mt-3">Thanks — submitted.</h2>
              <p className="text-[#525252] mt-2">Your response ID: <span className="font-mono">{submittedId}</span></p>
              <p className="text-sm text-[#0A0A0A] mt-4">
                Your answers feed our Live Research Validation panel. They&apos;ll appear (anonymised) in the survey results page within seconds.
              </p>
              <div className="mt-6 flex gap-2 justify-center">
                <Link href="/survey" className="bg-[#0A0A0A] text-white px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-1.5">
                  <BarChart3 size={14}/> See live results
                </Link>
                <button onClick={() => {
                  // Reset and let them take it again with a friend
                  setSubmittedId(null); setStep('intro')
                  setChoices(new Array(TASKS.length).fill(''))
                  setReasons(new Array(TASKS.length).fill(''))
                  setMaxWTP(null); setQuote(''); setName(''); setCity('')
                  setProfile({ state: '', age: '', income: '', role: '', goal: '' })
                }} className="border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm">Share with a friend</button>
              </div>
            </div>
          )}

          {/* Live results panel — visible only on thanks step */}
          {step === 'thanks' && <LiveResultsTeaser/>}
        </div>
      </main>
    </div>
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
    <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6">
      <div className="text-xs uppercase tracking-wider font-mono text-[#2563EB] mb-3">
        Live results · {data.responses.length} response{data.responses.length === 1 ? '' : 's'} collected
      </div>
      {data.summary && (
        <div className="rounded-xl bg-[#FAFAFA] p-4 mb-4">
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1">Llama 3.3 70B summary · auto-updates on each submission</div>
          <p className="text-sm text-[#0A0A0A] leading-relaxed">{data.summary}</p>
        </div>
      )}
      <div className="space-y-2">
        {data.responses.slice().reverse().slice(0, 5).map((r: any) => (
          <div key={r.id} className="rounded-lg border border-[#E5E7EB] p-3 text-xs">
            <div className="flex items-center gap-2 mb-1 text-[#525252]">
              <span className="font-mono px-1.5 py-0.5 rounded bg-[#F4F4F5]">{r.id}</span>
              <span className="font-medium text-[#0A0A0A]">{r.name || 'Anonymous'}</span>
              <span>· {r.city}</span>
              <span>· max WTP <span className="font-mono text-[#2563EB]">₹{r.maxWTP}</span></span>
            </div>
            <div className="text-[#0A0A0A] italic">&quot;{r.quote}&quot;</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link href="/survey" className="text-xs text-[#2563EB] underline">View full results dashboard →</Link>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-medium text-[#0A0A0A]">{label}</div>
      {children}
    </div>
  )
}

function ChipGroup({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap mt-2">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${value === o ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white border-[#E5E7EB] text-[#525252] hover:border-[#0A0A0A]'}`}>
          {o}
        </button>
      ))}
    </div>
  )
}

function BundleCard({ label, bundle, selected, onClick }: { label: string; bundle: any; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
            className={`text-left rounded-2xl p-5 border-2 transition ${selected ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-sm' : 'border-[#E5E7EB] bg-white hover:border-[#0A0A0A]'}`}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Bundle</span>
        <span className="font-semibold text-3xl text-[#2563EB]">{label}</span>
      </div>
      <div className="font-semibold text-lg">{bundle.price === 0 ? 'Free' : `₹${bundle.price}/month`}</div>
      {bundle.annualDiscount !== '0%' && <div className="text-[11px] text-[#2563EB] font-mono">{bundle.annualDiscount} off annual</div>}
      <div className="mt-3 space-y-1 text-xs text-[#0A0A0A]">
        <div>· <span className="font-medium">{bundle.credentials}</span> skill credentials/mo</div>
        <div>· <span className="font-medium">{bundle.atsScans}</span> ATS scans</div>
        <div>· <span className="font-medium">{bundle.careerPath}</span> Career Path scans</div>
        <div>· Defence Interview: <span className="font-medium">{bundle.defenceInterview}</span></div>
        <div>· Leaderboard: <span className="font-medium">{bundle.leaderboard}</span></div>
      </div>
    </button>
  )
}
