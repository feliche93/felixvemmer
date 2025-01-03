import { getTotalPageViewsByPath } from '@/lib/posthog-api'
import { cn } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import type { FC } from 'react'

export interface PageViewsProps {
  slug: string
  className?: string
}
export const PageViews: FC<PageViewsProps> = async ({ slug, className }) => {
  let pageviews
  try {
    pageviews = await getTotalPageViewsByPath({ path: slug })
  } catch (error) {
    console.error(error)
  }

  if (!pageviews) return null

  return (
    <div className={cn('text-muted-foreground text-sm', className)}>
      <EyeIcon className="inline-block h-4 w-4" /> {pageviews.toLocaleString()}
    </div>
  )
}
