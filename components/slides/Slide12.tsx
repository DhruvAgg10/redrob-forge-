import { SlideWrap, SlideHeader, HoverCard, SlideSources } from '../PresentationDeck'

// OLI Framework (Dunning): Ownership · Location · Internalization advantages
const OLI = [
  {
    letter: 'O',
    pillar: 'Ownership Advantages',
    subtitle: 'What only Redrob owns',
    points: [
      { what: '700M Indian profile graph', why: 'Largest skill canvas in India. Cannot be bought, only built over time.' },
      { what: 'AI App Store distribution', why: 'Forge ships as new tiles inside an existing AI surface used by professionals.' },
      { what: 'Two-sided marketplace', why: 'Candidates + recruiters on one platform. Forge connects them with credentials.' },
      { what: 'Brand recognition in MBA pipeline', why: 'Redrob already in placement cell conversations. Forge inherits this trust.' },
    ],
    colour: '#2563EB',
  },
  {
    letter: 'L',
    pillar: 'Location Advantages',
    subtitle: 'Why India · why now',
    points: [
      { what: 'Aadhaar / DigiLocker / UAN rails', why: 'Only Indian-entity platforms can plug in. Mercor (Delaware) cannot. Verification cost ~1/100th of Western alternatives.' },
      { what: 'NSQF alignment ready', why: 'India\'s skills framework allows direct mapping. Government-recognized credentials path opens.' },
      { what: '53% employer intent already exists', why: 'Demand is primed. Need only the supply layer.' },
      { what: 'W3C VC 2.0 finalized May 2025', why: '12-month land-grab window before any Indian standard solidifies.' },
    ],
    colour: '#0A0A0A',
  },
  {
    letter: 'I',
    pillar: 'Internalization Advantages',
    subtitle: 'Why build, not license',
    points: [
      { what: 'AI evaluation is core, not commodity', why: 'Quality of rubric grading determines credential trust. Cannot outsource to a vendor.' },
      { what: 'Network effects compound internally', why: 'Every trial outcome feeds AI. Outsourcing eval = losing the data flywheel.' },
      { what: 'Standard-setter premium', why: 'Owning the verification standard = Visa-like long-run economics. Licensing it from someone else kills the moat.' },
      { what: 'Credential UX is the brand', why: 'Wallet, verifier page, and seal design are recognizable artefacts. Cannot be white-labelled.' },
    ],
    colour: '#DC2626',
  },
]

export function Slide12() {
  return (
    <SlideWrap>
      <SlideHeader
        number="11"
        framework="Dunning's OLI Framework"
        title={<>Why Redrob can build this. <span className="text-[#2563EB]">Why Mercor can't.</span></>}
        subtitle="Ownership × Location × Internalization. Each pillar contains the advantages that compound. Hover any point for the deeper logic. This is the moat."
      />

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {OLI.map((p) => (
          <div key={p.letter} className="rounded-2xl border p-5 flex flex-col" style={{ borderColor: p.colour + '44' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-2xl text-white" style={{ background: p.colour }}>{p.letter}</div>
              <div>
                <div className="font-semibold text-base text-[#0A0A0A]">{p.pillar}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">{p.subtitle}</div>
              </div>
            </div>

            <div className="space-y-2 flex-1">
              {p.points.map((pt, i) => (
                <HoverCard key={i} title={pt.what} body={pt.why}>
                  <div className="rounded-lg bg-[#FAFAFA] p-3 cursor-help hover:bg-[#F4F4F5]">
                    <div className="text-xs font-medium text-[#0A0A0A]">{pt.what}</div>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-[#0A0A0A] text-white p-6 mb-6">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB] mb-2">The hidden killer Mercor structurally cannot copy</div>
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div>
            <p className="text-white leading-relaxed">
              Mercor is Delaware-domiciled. They cannot plug into <span className="font-semibold text-[#2563EB]">Aadhaar, DigiLocker, UAN/EPFO, or NSQF</span> without a regulated Indian entity.
              Redrob can. That integration is what makes Indian credentials trustworthy at low cost — not the AI test itself.
            </p>
            <p className="text-[#2563EB] italic text-sm mt-4">
              &quot;Mercor verifies Indians using American infrastructure. We verify Indians using Indian infrastructure. That&apos;s why our credentials cost 1/100th and are accepted by Indian banks, B-schools, and visa offices.&quot;
            </p>
          </div>
          <PositioningGrid/>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <ArcCard year="Year 1" title="Credential standard for Indian B-schools" bullets={['Top-7 MBA placement cells integrated', '25K credentialed candidates']}/>
        <ArcCard year="Year 2" title="Credential layer for Indian startup hiring" bullets={['500 paying recruiters · 8,000 challenges', 'Verifier API publicly launched']} highlight/>
        <ArcCard year="Year 3" title="Global infrastructure for Indian skill verification" bullets={['eIDAS (EU) + Open Badges Bank (US) integration', '500K verifications/month at $0.05']}/>
      </div>

      <div className="rounded-2xl border border-[#2563EB] bg-[#2563EB]/5 p-6 text-center">
        <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB]">The Ask</div>
        <div className="font-semibold text-3xl text-[#0A0A0A] mt-2">Greenlight Forge as a Redrob Q2 launch.</div>
        <p className="text-[#525252] mt-2 text-sm">Live demo at <span className="font-mono text-[#2563EB]">localhost:3000</span> · Pricing study at <span className="font-mono text-[#2563EB]">/survey</span> · Take the real survey at <span className="font-mono text-[#2563EB]">/survey/take</span></p>
      </div>

      <SlideSources items={[
        { num: '1', ref: 'Dunning, J. H. "The Eclectic Paradigm of International Production" — Journal of International Business Studies, 1988' },
        { num: '2', ref: 'Dunning, J. H. "Multinational Enterprises and the Global Economy" — Addison-Wesley, 1993 (OLI framework)' },
        { num: '3', ref: 'W3C Verifiable Credentials 2.0 — published May 2025 — w3.org/TR/vc-data-model-2.0' },
        { num: '4', ref: 'Open Badges 3.0 — IMS Global, June 2024 — imsglobal.org/spec/ob/v3p0' },
        { num: '5', ref: 'UIDAI Aadhaar e-KYC API — uidai.gov.in (Indian rails advantage)' },
        { num: '6', ref: 'eIDAS Regulation 910/2014 (EU electronic ID interoperability) — eur-lex.europa.eu' },
        { num: '7', ref: 'NSQF — National Skills Qualifications Framework, NSDC — nsdcindia.org/nsqf' },
      ]}/>
    </SlideWrap>
  )
}

function PositioningGrid() {
  return (
    <div className="aspect-square w-full max-w-sm mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <rect x="40" y="40" width="320" height="320" fill="white" stroke="#525252" strokeOpacity="0.3"/>

        {/* Axes */}
        <line x1="40" y1="200" x2="360" y2="200" stroke="#A1A1AA" strokeWidth="1"/>
        <line x1="200" y1="40" x2="200" y2="360" stroke="#A1A1AA" strokeWidth="1"/>

        {/* Axis labels */}
        <text x="200" y="30" fill="#A1A1AA" fontSize="10" textAnchor="middle" fontFamily="monospace" letterSpacing="1">HIGH MARGIN</text>
        <text x="200" y="380" fill="#A1A1AA" fontSize="10" textAnchor="middle" fontFamily="monospace" letterSpacing="1">LOW MARGIN · infra</text>
        <text x="50" y="395" fill="#A1A1AA" fontSize="9" fontFamily="monospace" letterSpacing="1">NICHE</text>
        <text x="350" y="395" fill="#A1A1AA" fontSize="9" textAnchor="end" fontFamily="monospace" letterSpacing="1">BROAD</text>

        {/* Companies */}
        <Comp x={100} y={80} label="Andela" sub="$381M · 45%"/>
        <Comp x={260} y={110} label="McKinsey"/>
        <Comp x={180} y={140} label="Mercor" sub="$2B · 35%"/>
        <Comp x={290} y={280} label="Turing" sub="$3.5B · 30%"/>

        {/* Forge */}
        <circle cx="320" cy="330" r="10" fill="#2563EB"/>
        <circle cx="320" cy="330" r="20" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.4"/>
        <text x="320" y="355" fill="#2563EB" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700">Forge · Y3</text>
        <text x="320" y="368" fill="#2563EB" fontSize="9" textAnchor="middle" fontFamily="monospace">1% take rate · infrastructure</text>
      </svg>
    </div>
  )
}

function Comp({ x, y, label, sub }: any) {
  return (
    <g>
      <circle cx={x} cy={y} r="6" fill="#525252" fillOpacity="0.5"/>
      <text x={x} y={y - 12} fill="white" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600">{label}</text>
      {sub && <text x={x} y={y + 18} fill="#A1A1AA" fontSize="8" textAnchor="middle" fontFamily="monospace">{sub}</text>}
    </g>
  )
}

function ArcCard({ year, title, bullets, highlight }: any) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? 'bg-[#2563EB]/5 border-[#2563EB]' : 'bg-white border-[#E5E7EB]'}`}>
      <div className="text-[10px] uppercase tracking-wider font-mono text-[#2563EB]">{year}</div>
      <div className="font-semibold text-base text-[#0A0A0A] mt-1 leading-tight">{title}</div>
      <ul className="mt-3 space-y-1 text-[11px] text-[#525252]">
        {bullets.map((b: string, i: number) => <li key={i}>· {b}</li>)}
      </ul>
    </div>
  )
}
