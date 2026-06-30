import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'

export function Slide06() {
  return (
    <SlideWrap>
      <SlideHeader
        number="05"
        framework="Experience Wireframes"
        title={<>Built inside Redrob. <span className="text-[#2563EB]">Not a new app.</span></>}
        subtitle=""
      />

      <div className="flex flex-col items-center gap-0">
        {/* Level 1 + 2 side by side */}
        <div className="grid grid-cols-2 gap-4 w-full mb-1">
          {/* Level 1: Homepage */}
          <div>
            <div className="text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1 text-center">1 · Redrob Homepage</div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-3 h-[160px] flex flex-col">
              {/* Sidebar + main */}
              <div className="flex gap-2 flex-1">
                {/* Sidebar */}
                <div className="w-20 border-r border-[#E5E7EB] pr-2 space-y-1.5">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#0A0A0A]"/><span className="text-[7px] font-bold">redrob</span></div>
                  <div className="text-[6px] text-[#A1A1AA] space-y-1">
                    <div>+ New Chat</div>
                    <div>All Chats</div>
                    <div className="text-[#2563EB] font-bold bg-[#2563EB]/10 rounded px-1 py-0.5">AI App Store ←</div>
                    <div>Projects</div>
                    <div>Community</div>
                    <div>Profile</div>
                  </div>
                </div>
                {/* Main */}
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="text-sm font-bold italic text-[#0A0A0A]">Built <span className="italic">around</span> you.</div>
                  <div className="text-[7px] text-[#A1A1AA] mt-1">AI tools for India&apos;s most ambitious</div>
                  <div className="mt-2 border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-[7px] text-[#A1A1AA] w-48">Ask Redrob anything</div>
                  <div className="flex gap-1.5 mt-2">
                    {['People Search', 'Company Search', 'Job Search', 'Resume Ranker'].map(t => (
                      <div key={t} className="text-[5px] border border-[#E5E7EB] rounded-full px-1.5 py-0.5">{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 2: App Store */}
          <div>
            <div className="text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1 text-center">2 · AI App Store</div>
            <div className="rounded-lg border-2 border-[#2563EB] bg-white p-3 h-[160px] flex flex-col">
              <div className="text-[6px] text-[#A1A1AA] mb-1.5">Existing apps (active)</div>
              <div className="grid grid-cols-4 gap-1 mb-1.5">
                {['People Search', 'Company Search', 'Job Search', 'Resume Ranker'].map(a => (
                  <div key={a} className="border border-[#E5E7EB] rounded p-1 text-center">
                    <div className="text-[5px] text-[#0A0A0A]">{a}</div>
                    <div className="text-[5px] text-[#22C55E]">✓</div>
                  </div>
                ))}
              </div>
              <div className="text-[6px] text-[#DC2626] font-bold mb-1">NEW · FORGE tiles</div>
              <div className="grid grid-cols-4 gap-1 flex-1">
                {[
                  { n: 'Skill Studio', hl: true }, { n: 'Challenges' }, { n: 'Career Path' }, { n: 'ATS Scanner' },
                  { n: 'Leaderboard' }, { n: 'Interview Coach' }, { n: 'Market Pulse' }, { n: 'Credential Wallet' },
                ].map(a => (
                  <div key={a.n} className={`border rounded p-0.5 text-center ${a.hl ? 'border-[#DC2626] bg-[#DC2626]/5 ring-1 ring-[#DC2626]' : 'border-[#E5E7EB]'}`}>
                    <div className="text-[5px] font-bold text-[#0A0A0A]">{a.n}</div>
                    <div className="text-[4px] text-[#DC2626] font-mono">NEW·FORGE</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-[#2563EB] text-sm my-0.5">User clicks Skill Studio ↓</div>

        {/* Level 3: Skill Studio Journey — 3 screens */}
        <div className="w-full">
          <div className="text-[8px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1 text-center">3 · Skill Studio journey — pick → write → credential</div>
          <div className="grid grid-cols-3 gap-3">

            {/* Screen A: Pick a skill */}
            <div className="rounded-lg border-2 border-[#0A0A0A] bg-white overflow-hidden">
              <div className="bg-[#0A0A0A] text-white px-3 py-1.5 text-[8px] font-bold">3a · Pick a skill</div>
              <div className="p-3">
                <div className="text-[7px] font-mono text-[#A1A1AA] mb-0.5">SKILL STUDIO</div>
                <div className="text-xs font-bold italic mb-1">Prove a skill with real work.</div>
                <div className="text-[7px] text-[#A1A1AA] mb-2">15-20 min tasks. AI grades against rubric. Score ≥ 70 mints W3C credential.</div>
                <div className="space-y-1.5">
                  {[
                    { cat: 'CONSULTING · PM', name: 'Market Sizing', desc: 'Estimate a real market in 15 min', meta: '4 rubric points · ~120 words' },
                    { cat: 'CONSULTING', name: 'Guesstimate', desc: 'Offbeat estimation under pressure', meta: '4 rubric points · ~100 words' },
                    { cat: 'PRODUCT', name: 'PRD Writing', desc: 'Write a 1-page PRD for a real problem', meta: '4 rubric points · ~180 words' },
                  ].map(s => (
                    <div key={s.name} className="border border-[#E5E7EB] rounded-lg p-2">
                      <div className="text-[6px] text-[#A1A1AA] font-mono">{s.cat}</div>
                      <div className="text-[9px] font-bold italic">{s.name}</div>
                      <div className="text-[7px] text-[#525252]">{s.desc}</div>
                      <div className="text-[6px] text-[#A1A1AA] mt-0.5">{s.meta}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[6px] text-[#A1A1AA] mt-1.5">+ 3 more: Finance, Marketing, Strategy</div>
              </div>
            </div>

            {/* Screen B: Write response */}
            <div className="rounded-lg border-2 border-[#0A0A0A] bg-white overflow-hidden">
              <div className="bg-[#0A0A0A] text-white px-3 py-1.5 text-[8px] font-bold">3b · Write &amp; submit</div>
              <div className="p-3">
                <div className="text-[7px] font-mono text-[#A1A1AA]">CONSULTING</div>
                <div className="text-xs font-bold italic mb-2">Guesstimate</div>

                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded p-2 mb-2">
                  <div className="text-[6px] font-mono text-[#A1A1AA] mb-0.5">PROMPT</div>
                  <div className="text-[7px] text-[#0A0A0A] leading-snug">How many cups of chai are sold in Mumbai on a single weekday? Walk through your logic, assumptions, and final number.</div>
                </div>

                <div className="border border-[#E5E7EB] rounded p-2 mb-2">
                  <div className="flex justify-between text-[6px] mb-1">
                    <span className="font-mono text-[#A1A1AA]">YOUR RESPONSE</span>
                    <span className="text-[#22C55E] font-mono">350 / 100 WORDS</span>
                  </div>
                  <div className="text-[6px] text-[#525252] leading-snug">assume a more conservative average for purchased chai. Let&apos;s assume the average chai drinker buys 1.5 cups per day... 26 million cups is a defensible estimate...</div>
                </div>

                <div className="border border-[#E5E7EB] rounded p-2 mb-2">
                  <div className="text-[6px] font-mono text-[#A1A1AA] mb-1">YOU&apos;LL BE GRADED ON</div>
                  <div className="text-[6px] text-[#525252] space-y-0.5">
                    <div>· Population segmentation logic is explicit</div>
                    <div>· Per-capita consumption assumption stated</div>
                    <div>· Reasonable arithmetic</div>
                    <div>· Honest about overestimates/underestimates</div>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] text-white rounded-lg py-1.5 text-center text-[8px] font-bold">✦ Grade my response</div>
              </div>
            </div>

            {/* Screen C: Credential earned */}
            <div className="rounded-lg border-2 border-[#0A0A0A] bg-white overflow-hidden">
              <div className="bg-[#0A0A0A] text-white px-3 py-1.5 text-[8px] font-bold">3c · Credential earned</div>
              <div className="p-3 text-center">
                <div className="text-[#22C55E] text-lg mb-0.5">✓</div>
                <div className="text-sm font-bold italic">Credential earned · 88</div>

                {/* Seal */}
                <div className="w-16 h-16 mx-auto my-2 rounded-full border-4 flex items-center justify-center" style={{ borderImage: 'linear-gradient(135deg, #C8A461, #7C5DDB) 1', borderStyle: 'solid' }}>
                  <div className="text-center">
                    <div className="text-[5px] text-[#A1A1AA]">VERIFIED</div>
                    <div className="text-[7px] font-bold">Guesstimate</div>
                    <div className="text-[6px] text-[#2563EB]">L4</div>
                  </div>
                </div>

                <div className="text-[6px] text-[#A1A1AA] font-mono mb-2">Verifier: /verify/cmr0y4hau0...</div>

                {/* Score breakdown */}
                <div className="space-y-1 text-left">
                  {[
                    { c: 'Population segmentation', s: 90 },
                    { c: 'Per-capita assumption', s: 80 },
                    { c: 'Reasonable arithmetic', s: 100 },
                    { c: 'Honest about estimates', s: 80 },
                  ].map(r => (
                    <div key={r.c} className="flex items-center gap-1">
                      <div className="flex-1 text-[6px] text-[#525252] truncate">{r.c}</div>
                      <div className="w-16 h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${r.s}%` }}/>
                      </div>
                      <div className="text-[7px] font-mono font-bold text-[#C8A461] w-8 text-right">{r.s}/100</div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 text-[6px] text-[#A1A1AA]">W3C VC 2.0 · Ed25519 signed · Portable</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'All wireframes represent the live working prototype' },
        { num: '2', ref: 'W3C, "Verifiable Credentials Data Model v2.0" — w3.org/TR/vc-data-model-2.0' },
      ]}/>
    </SlideWrap>
  )
}
