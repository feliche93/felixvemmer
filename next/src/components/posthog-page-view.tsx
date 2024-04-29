// app/PostHogPageView.tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

export default function PostHogPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const { user, isSignedIn, isLoaded } = useUser()

  //   Identify user
  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        first_name: user.firstName,
        last_name: user.lastName,
        full_name: user.fullName,
        image_url: user.imageUrl,
        password_enabled: user.passwordEnabled,
        created_at: user.createdAt,
      })
    }
  }, [user])

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams, posthog])

  return null
}
