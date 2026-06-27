type Props = {
  skill: string
  level?: number
  size?: 'sm' | 'md' | 'lg'
}

export function CredentialSeal({ skill, level = 1, size = 'md' }: Props) {
  const dims = { sm: 'w-16 h-16', md: 'w-28 h-28', lg: 'w-40 h-40' }[size]
  const inner = { sm: 'w-14 h-14', md: 'w-24 h-24', lg: 'w-36 h-36' }[size]
  return (
    <div className={`relative ${dims} rounded-full seal-gradient flex items-center justify-center`}
         style={{ boxShadow: '0 0 0 1px rgba(200,164,97,0.5), 0 8px 24px rgba(200,164,97,0.15)' }}>
      <div className={`${inner} rounded-full bg-white flex flex-col items-center justify-center text-center px-2`}>
        <span className="font-display italic text-[10px] text-[#6B7280]">verified</span>
        <span className="font-sans font-semibold text-[11px] leading-tight text-[#111111]">{skill}</span>
        <span className="font-mono text-[9px] text-[#A1A1AA] mt-0.5">L{level}</span>
      </div>
    </div>
  )
}
