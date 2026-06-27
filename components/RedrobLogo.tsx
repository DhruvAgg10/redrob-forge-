export function RedrobLogo({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M16 2 L29 9 L29 23 L16 30 L3 23 L3 9 Z"
              fill="#111" stroke="#111" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 11 L11 21 M11 11 L17 11 Q21 11 21 14 Q21 17 17 17 L11 17 M17 17 L21 21"
              stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-semibold text-[22px] tracking-tight text-[#111]">redrob</span>
    </span>
  )
}
