import { Plus, Languages, ArrowUp, ChevronDown, Search, Building2, Briefcase, FileText } from 'lucide-react'

export default function NewChat() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-20 pb-12">
      <div className="text-center">
        <h1 className="font-display text-5xl sm:text-6xl leading-tight font-semibold">
          Built <span className="italic font-normal">around</span> you.
        </h1>
        <p className="text-[#6B7280] mt-3 text-sm">AI tools for India&apos;s most ambitious</p>
      </div>

      <div className="mt-10 rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <input placeholder="Ask Redrob anything"
               className="w-full outline-none text-[15px] py-12 px-1 placeholder:text-[#A1A1AA]"/>
        <div className="flex items-center justify-between mt-3">
          <button className="w-9 h-9 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[#6B7280]">
            <Plus size={16}/>
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#111] px-2 py-1 rounded-lg">
              Redrob 2B <ChevronDown size={12}/>
            </button>
            <button className="w-9 h-9 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[#6B7280]">
              <Languages size={14}/>
            </button>
            <button className="w-9 h-9 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[#6B7280]">
              <ArrowUp size={14}/>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 justify-center">
        {[
          { icon: Search, label: 'People Search' },
          { icon: Building2, label: 'Company Search' },
          { icon: Briefcase, label: 'Job Search' },
          { icon: FileText, label: 'Resume Ranker' },
        ].map((q) => (
          <button key={q.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E7EB] bg-white text-sm hover:bg-[#FAFAFA]">
            <q.icon size={14} className="text-[#6B7280]"/>
            <span>{q.label}</span>
            <ChevronDown size={12} className="text-[#A1A1AA]"/>
          </button>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-6 sm:py-4 flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
        <div className="flex-1">
          <div className="font-semibold text-[15px]">Download Redrob AI for Android</div>
          <div className="text-sm text-[#6B7280] mt-1">Keep your own AI handy everywhere</div>
          <a href="#" className="mt-3 inline-flex items-center gap-2 bg-[#111] text-white px-4 py-2.5 rounded-lg text-sm hover:bg-black">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 20.5V3.5l13 8.5-13 8.5z" fill="#fff"/>
              <path d="M3 3.5l13 8.5L3 20.5" stroke="#fff" strokeWidth="0.5"/>
            </svg>
            <span className="flex flex-col items-start leading-none">
              <span className="text-[9px] uppercase opacity-70">Get it on</span>
              <span className="font-semibold text-sm">Google Play</span>
            </span>
          </a>
        </div>
        <div className="relative w-56 h-32 shrink-0">
          {/* Phone mockup */}
          <div className="absolute inset-0 rounded-[18px] bg-[#FAFAFA] border-2 border-[#111] overflow-hidden shadow-md">
            <div className="h-3 bg-[#111] flex items-center justify-center">
              <div className="w-10 h-1 bg-black rounded-full"/>
            </div>
            <div className="p-2 text-[7px]">
              <div className="flex justify-between text-[#A1A1AA]">
                <span>9:41</span>
                <span>📶 🔋</span>
              </div>
              <div className="mt-1 text-[8px] font-semibold">Software developer</div>
              <div className="mt-1 px-1.5 py-1 bg-white rounded text-[6.5px] text-[#3F3F46] border border-[#E5E7EB]">
                Find software developers from noida location specialized in react.js and have experience over 8+ years
              </div>
              <div className="mt-1 flex items-center gap-1 text-[6.5px] text-[#6B7280]">
                <div className="w-2 h-2 rounded-sm bg-[#111]"/>
                <span className="font-mono">[Dynamic text]...</span>
              </div>
              <div className="text-[6.5px] text-[#A1A1AA] mt-0.5">LLM Response and reasoning text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
