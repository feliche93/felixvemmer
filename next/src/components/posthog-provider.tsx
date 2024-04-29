// app/providers.tsx
'use client'
// @ts-expect-error
import cookieCutter from 'cookie-cutter'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (!posthogKey) throw new Error('NEXT_PUBLIC_POSTHOG_KEY is not set')

if (typeof window !== 'undefined') {
  const flags = cookieCutter.get('bootstrapData')
  let bootstrapData = {}
  if (flags) {
    bootstrapData = JSON.parse(flags)
  }

  posthog.init(posthogKey, {
    api_host: '/ingest',
    ui_host: 'https://eu.i.posthog.com',
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    bootstrap: bootstrapData,
  })

  //   Enable debug mode in development
  //   if (process.env.NODE_ENV === 'development') posthog.debug()
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
