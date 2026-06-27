import { User, Lightbulb, Eye, Pencil } from 'lucide-react'

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-semibold text-2xl">Profile</h1>
          <p className="text-[#6B7280] text-sm mt-1">Your skills, activity, and career snapshot — all in one place.</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-sm font-medium">Sync With LinkedIn</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="font-semibold">My achievement</h2>
            <p className="text-xs text-[#6B7280] mt-1">Milestones you unlocked based on your usage and activity.</p>
            <div className="flex gap-3 mt-3">
              {[<User key="u" size={18}/>, <Lightbulb key="l" size={18}/>, <span key="10" className="text-xs font-semibold">10</span>, <Eye key="e" size={18}/>].map((icon, i) => (
                <div key={i} className="w-14 h-14 rounded-full bg-gradient-to-br from-[#374151] to-[#111] text-white flex items-center justify-center">{icon}</div>
              ))}
            </div>
            <div className="mt-3 px-3 py-2 rounded-lg bg-[#F4F4F5] text-[11px] text-[#6B7280]">Unlock more achievements by staying active and exploring new use cases.</div>
          </section>

          <section>
            <h2 className="font-semibold">My activity</h2>
            <p className="text-xs text-[#6B7280] mt-1">A snapshot of how you use Redrob.</p>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { label: 'Total no of queries', value: '11' },
                { label: 'Total no of projects', value: '1' },
                { label: 'No of Chatrooms', value: '0' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#E5E7EB] p-4">
                  <div className="text-[11px] text-[#6B7280]">{s.label}</div>
                  <div className="font-semibold text-2xl mt-1">{s.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold">Daily log-ins</h2>
            <p className="text-xs text-[#6B7280] mt-1">Track your consistency and engagement over time.</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-[#E5E7EB] p-4">
                <div className="text-xs text-[#6B7280]">Login streak</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span>💧</span>
                  <span className="font-semibold text-2xl">5 day</span>
                </div>
                <div className="text-xs text-[#6B7280] mt-2">Keep logging in daily to build your streaks.</div>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] p-4">
                <div className="text-xs text-[#6B7280]">Daily usage per week</div>
                <svg viewBox="0 0 200 80" className="w-full mt-2">
                  <path d="M0,60 C40,40 80,20 100,30 C140,50 180,40 200,30" fill="none" stroke="#4285F4" strokeWidth="2"/>
                </svg>
                <div className="grid grid-cols-7 text-[10px] text-[#6B7280] mt-1">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => <div key={d} className="text-center">{d}</div>)}
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-2xl border border-[#E5E7EB] p-5 bg-white">
            <div className="flex justify-between mb-3">
              <div className="px-2 py-1 rounded-md bg-[#FAFAFA] text-xs text-[#6B7280] inline-flex items-center gap-1">
                <Eye size={12}/> Private
              </div>
              <button className="text-[#A1A1AA]"><Pencil size={14}/></button>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#111] text-white flex items-center justify-center font-semibold mb-3">DA</div>
            <div className="font-semibold">Dhruv Aggarwal</div>
            <div className="text-xs text-[#6B7280]">b25362@astra.xlri.ac.in</div>
            <div className="text-xs text-[#6B7280]">+91 9319944001</div>

            <div className="mt-4 px-3 py-2 rounded-lg bg-[#FEF3C7] text-[11px] text-[#92400E] flex gap-2">
              <span>⚠</span><span>This profile is hidden from recruiters and collaborators.</span>
            </div>

            <div className="mt-5 text-xs">
              <div className="font-semibold text-sm mb-1">Summary</div>
              <p className="text-[#6B7280]">Aspiring business leader with a strong technical background, having experience in web development and a passion for innovation and management.</p>

              <div className="font-semibold text-sm mt-4 mb-1">Profession</div>
              <p className="text-[#6B7280]">PGDMBM Student at XLRI</p>

              <div className="font-semibold text-sm mt-4 mb-1">Education</div>
              <p className="text-[#6B7280]">Post graduate diploma in business management from XLRI Delhi-NCR</p>

              <div className="font-semibold text-sm mt-4 mb-1">Experience</div>
              <p className="text-[#6B7280]">8 months as Junior Executive at E-Cell, XLRI · 2 months management trainee intern at RuPay product team at NPCI · 2 months web development at Suvidha Foundation and Airport Authority of India.</p>

              <div className="font-semibold text-sm mt-4 mb-1">Skills</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {['React','Node.js','SQL','PM','Financial Modeling','Market Sizing'].map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4F4F5]">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
