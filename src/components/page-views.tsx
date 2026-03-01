import { EyeIcon } from "lucide-react"
import type { FC } from "react"
import { getTotalPageViewsByPath } from "@/lib/posthog-api"
import { cn } from "@/lib/utils"

export interface PageViewsProps {
  slug: string
  className?: string
}
export const PageViews: FC<PageViewsProps> = async ({ slug, className }) => {
  let pageviews: number | null = null
  try {
    pageviews = (await getTotalPageViewsByPath({ path: slug })) ?? null
  } catch (error) {
    console.error(error)
  }

  if (!pageviews) return null

  return (
    <div className={cn("text-muted-foreground text-sm", className)}>
      <EyeIcon className="inline-block h-4 w-4" /> {pageviews.toLocaleString()}
    </div>
  )
}
