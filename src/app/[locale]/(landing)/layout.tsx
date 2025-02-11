import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
