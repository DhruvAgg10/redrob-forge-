import Link from 'next/link'
import {
  Search, Building2, Briefcase, FileText, ChevronDown,
  Check, Plus, FolderClosed, Mail, Calendar,
  Hammer, Wallet, BarChart3, Code2, Compass, Trophy, MessageSquare, Video,
} from 'lucide-react'

type App = {
  icon: any; iconColor?: string; iconBg?: string
  title: string; desc: string
  state: 'active' | 'add' | 'forge'
  href?: string
}

const APPS: App[] = [
  // Active row 1
  { icon: Search, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'People Search', desc: 'Search 700M+ professional profiles by role, skills, company, or location.', state: 'active' },
  { icon: Building2, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Company Search', desc: "Look up any company's size, stack, hiring velocity, and key decision-makers.", state: 'active' },
  { icon: Briefcase, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Job Search', desc: 'Search and filter live job listings across roles, industries, and locations.', state: 'active' },
  { icon: FileText, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Resume Ranker', desc: 'Score and rank any stack of resumes against a job spec in seconds.', state: 'active' },

  // Connector row
  { icon: FolderClosed, iconBg: '#FFF4E6', iconColor: '#F4B400', title: 'Drive', desc: 'Connect your Google Drive so Redrob can search and reference your files.', state: 'add' },
  { icon: Mail, iconBg: '#FEE8E6', iconColor: '#EA4335', title: 'Gmail', desc: 'Draft replies, summarize threads, and search your inbox with AI.', state: 'add' },
  { icon: Calendar, iconBg: '#E8F0FE', iconColor: '#4285F4', title: 'Calendar', desc: 'View, manage, and schedule events through natural conversation.', state: 'add' },

  // ===== Forge (replaces Soon tiles) =====
  { icon: Hammer, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Skill Studio', desc: 'Live MBA-relevant tasks. AI-graded against rubric. Mint a portable W3C credential.', state: 'forge', href: '/skills' },
  { icon: FileText, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'ATS Resume Scanner', desc: 'Score your resume against any JD — keyword match, action verbs, quantification, formatting + AI fixes.', state: 'forge', href: '/resume' },
  { icon: BarChart3, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Skills Leaderboard', desc: 'See how your verified skills rank across India.', state: 'forge', href: '/leaderboard' },
  { icon: Code2, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Challenges', desc: 'Real company sprints. Submit work. Paid trial. Get hired.', state: 'forge', href: '/challenges' },
  { icon: Compass, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Career Path', desc: 'Paste your resume + a goal — get 3 distinct strategy-labelled routes.', state: 'forge', href: '/path' },
  { icon: Video, iconBg: '#EDE9FE', iconColor: '#7C5DDB', title: 'Interview Coach', desc: 'AI defence interview after every challenge submission. Records + scores.', state: 'forge', href: '/defence' },
  { icon: MessageSquare, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Market Pulse', desc: 'Natural-language queries on the live hiring graph.', state: 'forge', href: '/market-pulse' },
  { icon: Wallet, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Credential Wallet', desc: 'Hold and share your W3C verifiable credentials.', state: 'forge', href: '/wallet' },
  { icon: MessageSquare, iconBg: '#FEE8E6', iconColor: '#E94B3C', title: 'Community', desc: 'Show & tell, ask the room, peer mentoring with AI personas of top candidates.', state: 'forge', href: '/community' },
]

function Tile({ a }: { a: App }) {
  const inner = (
    <div className={`rounded-2xl border bg-white p-5 relative h-full transition ${
      a.state === 'active' ? 'border-[#E5E7EB]/80 bg-[#F8FAFF]/40'
      : a.state === 'forge' ? 'border-[#E94B3C]/30 hover:border-[#E94B3C] hover:shadow-md cursor-pointer'
      : 'border-[#E5E7EB] hover:border-[#D4D4D8]'
    }`}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center"
           style={{ background: a.iconBg, color: a.iconColor }}>
        <a.icon size={18}/>
      </div>
      <div className="absolute top-4 right-4">
        {a.state === 'active' && <Check size={16} className="text-[#4285F4]"/>}
        {a.state === 'add' && <Plus size={16} className="text-[#A1A1AA]"/>}
        {a.state === 'forge' && (
          <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#FEE8E6] text-[#E94B3C]">NEW · Forge</span>
        )}
      </div>
      <div className="font-semibold text-[15px] mt-4">{a.title}</div>
      <div className="text-xs text-[#6B7280] mt-1 line-clamp-2">{a.desc}</div>
    </div>
  )
  if (a.href) return <Link href={a.href}>{inner}</Link>
  return inner
}

export default function AppStore() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-xl bg-white">
          <Search size={14} className="text-[#A1A1AA]"/>
          <input placeholder="Search apps" className="flex-1 outline-none text-sm"/>
        </div>
        <button className="flex items-center justify-between gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-xl bg-white text-sm min-w-[120px]">
          Default <ChevronDown size={14} className="text-[#A1A1AA]"/>
        </button>
        <button className="flex items-center justify-between gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-xl bg-white text-sm min-w-[120px]">
          All apps <ChevronDown size={14} className="text-[#A1A1AA]"/>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {APPS.map((a) => <Tile key={a.title} a={a}/>)}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-[#E94B3C]/40 p-5 bg-[#FEE8E6]/20 text-center">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#E94B3C]">What changed</div>
        <p className="text-sm text-[#3F3F46] mt-1">
          The 8 tiles tagged <span className="text-[#E94B3C] font-medium">NEW · Forge</span> replace the &quot;Soon&quot; placeholders in Redrob today.
          One connected workflow: verify a skill → enter a challenge → paid trial → portable credential.
        </p>
      </div>
    </div>
  )
}
