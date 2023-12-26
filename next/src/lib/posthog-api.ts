import { unstable_cache } from 'next/cache'
import { client } from './posthog-typescript-sdk'

const token = process.env.POSTHOG_PERSONAL_API_KEY

if (!token) {
  throw new Error('POSTHOG_PERSONAL_API_KEY is not set')
}

const projectId = process.env.POSTHOG_PROJECT_ID

if (!projectId) {
  throw new Error('POSTHOG_PROJECT_ID is not set')
}

const posthogApi = new client({
  TOKEN: token,
  BASE: 'https://eu.posthog.com',
})

export const getPostHogInsightById = unstable_cache(async ({ id }: { id: number }) => {
  const result = await posthogApi.insights.insightsRetrieve({
    projectId,
    id,
    format: 'json',
    refresh: true,
  })
  return result
})
