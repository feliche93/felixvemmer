import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js'
import { unstable_cache } from 'next/cache'

const apiKey = process.env.LEMON_SQUEEZY_BACKLINKGPT_API_KEY

if (!apiKey) {
  throw new Error('Missing LEMON_SQUEEZY_BACKLINKGPT_API_KEY')
}

export const lemonSqueezy = new LemonSqueezy(apiKey)

export const getTotalLemonSqueezyRevenue = unstable_cache(
  async ({ storeId }: { storeId: string }) => {
    const revenue = await lemonSqueezy.getStore({
      id: storeId,
    })

    return revenue.data.attributes.total_revenue
  },
  ['lemonsqueezy'],
  { revalidate: 3600 },
)
