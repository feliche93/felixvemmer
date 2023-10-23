'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'

import { absoluteUrl } from '@/lib/utils'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const posthogHost = absoluteUrl('/ingest')

if (!posthogKey) throw new Error('NEXT_PUBLIC_POSTHOG_KEY is not set')
if (!posthogHost) throw new Error('NEXT_PUBLIC_POSTHOG_HOST is not set')

if (typeof window !== 'undefined') {
  console.log('posthogHost', posthogHost)
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    // Enable debug mode in development
    // loaded: (posthog) => {
    //   if (process.env.NODE_ENV === 'development') posthog.debug()
    // },
  })
}

export interface PosthogProviderProps extends PropsWithChildren {}
export const PosthogProvider: FC<PosthogProviderProps> = ({ children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // const { user } = useUser()

  // useEffect(() => {
  //   if (user) {
  //     posthog.identify(user.id, {
  //       email: user.primaryEmailAddress?.emailAddress,
  //       first_name: user.firstName,
  //       last_name: user.lastName,
  //       full_name: user.fullName,
  //       image_url: user.imageUrl,
  //       password_enabled: user.passwordEnabled,
  //       created_at: user.createdAt,
  //     })
  //   }
  // }, [user])

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
