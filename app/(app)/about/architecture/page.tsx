import { MermaidDiagram } from '@/components/MermaidDiagram'

const SYSTEM = `flowchart TB
    subgraph CS["CANDIDATE SIDE"]
        C1[Discover<br/>Market Pulse]
        C2[Verify<br/>Skill Tests + Interview Coach]
        C3[Compete<br/>Challenges + Trial Workspace]
        C4[Carry<br/>Credential Wallet]
    end
    subgraph CORE["FORGE CORE"]
        K1[Skill Graph<br/>ESCO + NSQF]
        K2[Credential Mint<br/>W3C VC + Open Badges 3.0]
        K3[Adaptive Assessment]
        K4[AI Evaluation Pipeline]
        K5[Trial Sandbox]
        K6[Identity & Trust]
    end
    subgraph RS["RECRUITER SIDE"]
        R1[Post Challenge]
        R2[Filter by Verified Skills]
        R3[Watch + Score Submissions]
        R4[Verify Hires]
    end
    subgraph GV["GLOBAL VERIFICATION GATEWAY"]
        G1[Open Verifier API]
        G2[eIDAS / W3C compat]
        G3[Integration partners]
    end
    CS <--> CORE
    CORE <--> RS
    CORE --> GV
    style CORE fill:#FEE8E6,stroke:#E94B3C
    style GV fill:#FFF4E6,stroke:#C8A461,stroke-dasharray: 5 5`

const FUNNEL = `sequenceDiagram
    actor C as Candidate
    participant F as Forge
    participant K as Claude
    participant Co as Company
    C->>F: Sign up + verify identity
    F-->>C: Trust score
    C->>F: Take adaptive skill test
    F-->>C: Question N
    C->>F: Answer
    Note over F: Loop 10 times
    F->>F: Score, mint W3C VC if pass
    F-->>C: Credential seal
    C->>F: Apply to challenge
    C->>F: Submit artifact
    F->>K: AI evaluation
    K-->>F: Score + breakdown
    F->>K: Defence interview
    K-->>F: Defence score
    F->>Co: Top 5 shortlist
    Co->>F: Pick 2 finalists
    F-->>C: Trial invite (stipend escrowed)
    Co->>F: Hire decision`

const FLYWHEEL = `flowchart LR
    A[Verify skill] --> B[Eligible for better challenges]
    B --> C[Paid trial / hire]
    C --> D[Companies post more challenges]
    D --> E[More candidates verify]
    E --> A
    style C fill:#22C55E,color:#fff
    style A fill:#FEE8E6
    style D fill:#FFF4E6`

export default function ArchitecturePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono">How it works</div>
        <h1 className="font-display italic text-4xl mt-1">Forge architecture</h1>
      </div>

      <section className="mb-12">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-3">System</div>
        <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
          <MermaidDiagram chart={SYSTEM}/>
        </div>
      </section>

      <section className="mb-12">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-3">Candidate funnel</div>
        <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
          <MermaidDiagram chart={FUNNEL}/>
        </div>
      </section>

      <section className="mb-12">
        <div className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-3">Growth loop</div>
        <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
          <MermaidDiagram chart={FLYWHEEL}/>
        </div>
      </section>
    </div>
  )
}
