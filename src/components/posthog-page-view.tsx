// app/PostHogPageView.tsx
"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useEffect } from "react"
import { useSession } from "@/lib/auth/client"

export default function PostHogPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const { data } = useSession()
  const user = data?.user

  //   Identify user
  useEffect(() => {
    if (!user) return
    posthog.identify(user.id, {
      email: user.email,
      full_name: user.name,
      image_url: user.image,
      created_at: user.createdAt,
    })
  }, [user, posthog])

  // Track pageviews
  useEffect(() => {
    if (typeof window === "undefined") return
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`
      }
      posthog.capture("$pageview", {
        $current_url: url,
      })
    }
  }, [pathname, searchParams, posthog])

  return null
}
