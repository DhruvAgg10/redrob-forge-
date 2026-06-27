import { RedrobSidebar } from '@/components/RedrobSidebar'
import { BottomNav } from '@/components/BottomNav'
import { SurveyButton } from '@/components/SurveyButton'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <RedrobSidebar />
      <SurveyButton/>
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">{children}</main>
      <BottomNav />
    </div>
  )
}
