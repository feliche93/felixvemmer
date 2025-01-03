import { env } from '@/server'
import { getStore, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import { unstable_cache } from 'next/cache'

const apiKey = env.LEMON_SQUEEZY_BACKLINKGPT_API_KEY

lemonSqueezySetup({ apiKey })

export const getTotalLemonSqueezyRevenue = unstable_cache(
  async ({ storeId }: { storeId: string }) => {
    const { error, data, statusCode } = await getStore(storeId)

    if (error) {
      throw new Error(`Failed to fetch store: ${error}`)
    }

    if (!data) {
      throw new Error(`Failed to fetch store: ${statusCode}`)
    }

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${data.data.attributes.total_revenue}&from=USD&to=EUR`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    )

    interface ConversionResponse {
      amount: number
      base: string
      date: string
      rates: { [key: string]: number }
    }

    const converted: ConversionResponse = await res.json()

    return Number(converted.rates.EUR)
  },
  ['lemonsqueezy'],
  { revalidate: 3600 },
)
