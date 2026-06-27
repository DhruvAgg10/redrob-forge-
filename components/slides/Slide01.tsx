import { SlideWrap } from '../PresentationDeck'

export function Slide01() {
  return (
    <SlideWrap className="justify-center items-center text-center">
      <div className="text-[10px] uppercase tracking-[0.32em] font-mono text-[#2563EB] mb-6">Redrob Ideathon · Track 2</div>

      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] flex items-center justify-center">
          <div className="w-6 h-6 rounded-md bg-[#2563EB]"/>
        </div>
        <div className="text-left">
          <div className="font-semibold text-3xl">Forge</div>
          <div className="text-xs font-mono text-[#A1A1AA] tracking-wider">BY REDROB</div>
        </div>
      </div>

      <h1 className="font-sans font-semibold text-5xl sm:text-7xl leading-[1.05] text-[#0A0A0A] max-w-4xl">
        The verification layer<br/>Redrob is missing.
      </h1>

      <p className="text-[#525252] text-xl mt-8 max-w-2xl">
        Skills-first hiring, portable W3C credentials, and a real-work funnel — shipped as 8 new tiles inside Redrob today.
      </p>

      <div className="mt-14 grid grid-cols-3 gap-4 max-w-3xl w-full">
        <CoverStat headline="53%" sub="want skills-first hiring"/>
        <CoverStat headline="1 / 700" sub="actually changes their hiring"/>
        <CoverStat headline="₹200 Cr" sub="ARR target by Year 3"/>
      </div>

      <div className="mt-16 text-xs font-mono text-[#A1A1AA] uppercase tracking-[0.18em]">
        Team Dhruv Aggarwal · XLRI Delhi-NCR · PGDMBM 25-27
      </div>
    </SlideWrap>
  )
}

function CoverStat({ headline, sub }: any) {
  return (
    <div className="border-l-2 border-[#2563EB] pl-4 text-left">
      <div className="font-sans font-semibold text-4xl text-[#0A0A0A]">{headline}</div>
      <div className="text-xs text-[#525252] mt-1">{sub}</div>
    </div>
  )
}
