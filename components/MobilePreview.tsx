'use client'
import { useState } from 'react'
import { Smartphone, Monitor } from 'lucide-react'

export function MobilePreviewWrap({ children }: { children: React.ReactNode }) {
  const [mobile, setMobile] = useState(false)
  return (
    <>
      <div className="fixed top-3 right-4 z-50 hidden lg:flex gap-1 items-center bg-white border border-[#E5E7EB] rounded-full p-1 shadow-sm">
        <button onClick={() => setMobile(false)}
                className={`px-2 py-1 rounded-full flex items-center gap-1 text-[11px] ${!mobile ? 'bg-[#111] text-white' : 'text-[#6B7280]'}`}>
          <Monitor size={12}/> Desktop
        </button>
        <button onClick={() => setMobile(true)}
                className={`px-2 py-1 rounded-full flex items-center gap-1 text-[11px] ${mobile ? 'bg-[#111] text-white' : 'text-[#6B7280]'}`}>
          <Smartphone size={12}/> Mobile
        </button>
      </div>
      {mobile ? (
        <div className="flex justify-center bg-[#F4F4F5] py-6 min-h-screen">
          <div className="w-[380px] bg-white border-[12px] border-[#111] rounded-[36px] overflow-hidden shadow-2xl">
            <div className="h-[760px] overflow-y-auto">{children}</div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
