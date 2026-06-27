const AGENTS = [
  { name: 'Finn', color: '#86EFAC', desc: 'Handles budget queries, invoice questions and financial summaries within conversations.' },
  { name: 'Pixel', color: '#F9A8D4', desc: 'Reviews design decisions, gives feedback on UI/UX, suggests improvements, and system questions.' },
  { name: 'Memo', color: '#67E8F9', desc: 'Summarizes long chat threads, generates meeting notes, and creates action items from conversations.' },
  { name: 'Draft', color: '#FCD34D', desc: 'Writes, edits, and improves any content — emails, messages, announcements, job posts, or docs.' },
]

export default function ChatRooms() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
      <div className="text-center">
        <h1 className="font-semibold text-3xl">Chat Rooms</h1>
        <p className="text-[#6B7280] mt-2">One space for real-time conversations and collaboration.</p>
        <button className="mt-6 px-6 py-2.5 rounded-lg bg-[#F4F4F5] text-[#111] text-sm font-medium hover:bg-[#E5E7EB]">
          Start A Chatroom
        </button>
      </div>

      <div className="my-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#E5E7EB]"/>
        <div className="text-xs text-[#6B7280]">or start chat with an agent</div>
        <div className="h-px flex-1 bg-[#E5E7EB]"/>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {AGENTS.map((a) => (
          <div key={a.name} className="rounded-2xl border border-[#E5E7EB] p-5 flex gap-4 items-start hover:border-[#D4D4D8] cursor-pointer">
            <div className="w-10 h-10 rounded-full shrink-0" style={{ background: a.color }}/>
            <div>
              <div className="font-semibold">{a.name}</div>
              <div className="text-xs text-[#6B7280] mt-1 leading-relaxed">{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
