// app/posthog.js
import { PostHog } from 'posthog-node'

export default function PostHogClient() {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = 'https://eu.posthog.com' // no need to rewrite the host as happening on the server

  if (!posthogKey) throw new Error('NEXT_PUBLIC_POSTHOG_KEY is not set')
  if (!posthogHost) throw new Error('NEXT_PUBLIC_POSTHOG_HOST is not set')

  console.log('posthogHost', posthogHost)

  const posthogClient = new PostHog(posthogKey, {
    host: posthogHost,
    flushAt: 1,
    flushInterval: 0,
  })

  return posthogClient
}
