import { SlideWrap, SlideHeader, SlideSources } from '../PresentationDeck'

export function Slide06() {
  return (
    <SlideWrap>
      <SlideHeader
        number="05"
        framework="Experience Wireframes"
        title={<>Built inside Redrob. <span className="text-[#2563EB]">Not a new app.</span></>}
        subtitle="Forge lives inside Redrob's existing interface. User clicks a tile → completes a skill journey → earns a credential."
      />

      <div className="flex flex-col items-center gap-0">
        {/* Level 1: Redrob Homepage */}
        <div className="w-[700px]">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1 text-center">1 · Redrob existing homepage</div>
          <div className="rounded-xl border-2 border-[#0A0A0A] bg-white p-4">
            {/* Nav bar mockup */}
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-20 h-5 rounded bg-[#DC2626] flex items-center justify-center text-white text-[8px] font-bold">REDROB</div>
              <div className="flex gap-3 text-[9px] text-[#A1A1AA]">
                <span>Jobs</span><span>Companies</span><span>Resume</span><span className="text-[#2563EB] font-bold">AI App Store ←</span>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full bg-[#E5E7EB]"/>
            </div>
            {/* Hero area */}
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-[#0A0A0A]">700M+ profiles · 1M+ companies</div>
              <div className="text-[10px] text-[#A1A1AA] mt-1">User clicks <span className="text-[#2563EB] font-bold">"AI App Store"</span> in nav</div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-[#2563EB] text-lg my-1">↓</div>

        {/* Level 2: App Store Grid */}
        <div className="w-[700px]">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1 text-center">2 · AI App Store — 8 Forge tiles</div>
          <div className="rounded-xl border-2 border-[#2563EB] bg-white p-4">
            <div className="grid grid-cols-4 gap-2">
              <AppTile name="Career Path" icon="🧭" free highlight={false}/>
              <AppTile name="Skill Studio" icon="🔨" highlight/>
              <AppTile name="Challenges" icon="💻" highlight={false}/>
              <AppTile name="ATS Scanner" icon="📄" free highlight={false}/>
              <AppTile name="Credential Wallet" icon="🪪" highlight={false}/>
              <AppTile name="Defence Interview" icon="🎥" highlight={false}/>
              <AppTile name="Leaderboard" icon="📊" free highlight={false}/>
              <AppTile name="Market Pulse" icon="💬" free highlight={false}/>
            </div>
            <div className="text-center text-[9px] text-[#A1A1AA] mt-2">User clicks <span className="text-[#2563EB] font-bold">Skill Studio</span> tile</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-[#2563EB] text-lg my-1">↓</div>

        {/* Level 3: Skill Studio Journey — 4 screens in a row */}
        <div className="w-full">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1 text-center">3 · Skill Studio journey — one complete flow</div>
          <div className="grid grid-cols-4 gap-3">
            <JourneyScreen
              step="3a"
              title="Pick a skill"
              content={
                <div className="space-y-1.5">
                  <SkillRow name="Market Sizing" level="L2" />
                  <SkillRow name="PRD Writing" level="L2" active />
                  <SkillRow name="Positioning" level="L3" />
                  <SkillRow name="Go-to-Market" level="L2" />
                </div>
              }
              note="35 skills across PM, SDE, Design"
            />
            <JourneyScreen
              step="3b"
              title="Write response"
              content={
                <div>
                  <div className="bg-[#F8FAFC] rounded p-2 text-[8px] text-[#525252] leading-snug mb-2">
                    <span className="font-bold text-[#0A0A0A]">Prompt:</span> &quot;Write a PRD for a feature that helps Redrob recruiters filter candidates by verified skills...&quot;
                  </div>
                  <div className="border border-[#E5E7EB] rounded p-2 h-12 flex items-start">
                    <div className="text-[8px] text-[#A1A1AA]">Type your answer (100-200 words)...</div>
                  </div>
                  <div className="mt-1.5 bg-[#0A0A0A] text-white rounded px-2 py-1 text-[8px] text-center font-bold">Submit for AI grading</div>
                </div>
              }
              note="Open-ended, not MCQ"
            />
            <JourneyScreen
              step="3c"
              title="AI grades + Defence"
              content={
                <div className="space-y-1.5">
                  <ScoreRow criterion="Clarity" score={82} />
                  <ScoreRow criterion="Depth" score={75} />
                  <ScoreRow criterion="Structure" score={88} />
                  <ScoreRow criterion="Feasibility" score={71} />
                  <div className="border-t border-[#E5E7EB] pt-1 flex justify-between text-[9px]">
                    <span className="font-bold">Overall</span>
                    <span className="font-bold text-[#22C55E]">79 · Pass</span>
                  </div>
                  <div className="bg-[#2563EB] text-white rounded px-2 py-1 text-[8px] text-center font-bold mt-1">Start Defence Interview →</div>
                </div>
              }
              note="LLM-as-judge, 4 criteria"
            />
            <JourneyScreen
              step="3d"
              title="W3C Credential minted"
              content={
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#C8A461] to-[#7C5DDB] flex items-center justify-center text-white text-lg mb-1.5">✓</div>
                  <div className="text-[9px] font-bold text-[#0A0A0A]">PRD Writing · Level 2</div>
                  <div className="text-[8px] text-[#A1A1AA] mt-0.5">W3C VC 2.0 · Ed25519 signed</div>
                  <div className="text-[8px] text-[#A1A1AA] mt-0.5">did:web:forge.redrob.ai</div>
                  <div className="mt-2 flex gap-1 justify-center">
                    <div className="bg-[#2563EB] text-white rounded px-2 py-0.5 text-[7px] font-bold">Share on LinkedIn</div>
                    <div className="border border-[#E5E7EB] rounded px-2 py-0.5 text-[7px]">View JSON-LD</div>
                  </div>
                </div>
              }
              note="Portable, verifiable by anyone"
            />
          </div>
        </div>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'W3C, "Verifiable Credentials Data Model v2.0" — w3.org/TR/vc-data-model-2.0' },
        { num: '2', ref: 'All wireframes represent the working prototype at localhost:3000' },
      ]}/>
    </SlideWrap>
  )
}

function AppTile({ name, icon, free, highlight }: { name: string; icon: string; free?: boolean; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-2 text-center ${highlight ? 'border-[#2563EB] bg-[#2563EB]/5 ring-2 ring-[#2563EB]' : 'border-[#E5E7EB]'}`}>
      <div className="text-lg">{icon}</div>
      <div className={`text-[8px] font-bold mt-0.5 ${highlight ? 'text-[#2563EB]' : 'text-[#0A0A0A]'}`}>{name}</div>
      {free && <div className="text-[7px] text-[#22C55E] font-mono">FREE</div>}
    </div>
  )
}

function JourneyScreen({ step, title, content, note }: { step: string; title: string; content: React.ReactNode; note: string }) {
  return (
    <div className="rounded-xl border-2 border-[#2563EB] overflow-hidden">
      <div className="bg-[#2563EB] text-white px-3 py-1.5 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase">{step} · {title}</span>
      </div>
      <div className="p-3 bg-white min-h-[140px]">{content}</div>
      <div className="px-3 py-1.5 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="text-[8px] text-[#A1A1AA] text-center">{note}</div>
      </div>
    </div>
  )
}

function SkillRow({ name, level, active }: { name: string; level: string; active?: boolean }) {
  return (
    <div className={`flex justify-between items-center rounded px-2 py-1 text-[9px] ${active ? 'bg-[#2563EB] text-white' : 'bg-[#F8FAFC] text-[#0A0A0A]'}`}>
      <span>{name}</span>
      <span className="font-mono text-[8px]">{level}</span>
    </div>
  )
}

function ScoreRow({ criterion, score }: { criterion: string; score: number }) {
  const color = score >= 70 ? '#22C55E' : '#F59E0B'
  return (
    <div className="flex items-center gap-2 text-[9px]">
      <span className="w-16 text-[#525252]">{criterion}</span>
      <div className="flex-1 h-2 bg-[#F4F4F5] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }}/>
      </div>
      <span className="w-6 text-right font-mono font-bold" style={{ color }}>{score}</span>
    </div>
  )
}
