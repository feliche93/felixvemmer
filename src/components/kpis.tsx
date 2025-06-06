import { getTotalLemonSqueezyRevenue } from '@/lib/lemonsqueezy'
import { getFreelancingRevenue } from '@/lib/paierkram-api'
import { getPostHogInsightById } from '@/lib/posthog-api'
import { auth } from '@clerk/nextjs/server'
import { Grid, Metric, Text } from '@tremor/react'
import Link from 'next/link'
import type { FC } from 'react'
import { buttonVariants } from './ui/button'
import { Card } from './ui/card'

export const Kpis: FC = async () => {
  const { userId } = await auth()
  const freelancingRevenuePromise = getFreelancingRevenue()

  const pageViewsInsightPromise = getPostHogInsightById({
    id: 120881,
  })

  const lemonSqueezyRevenuePromise = getTotalLemonSqueezyRevenue({
    storeId: '24094',
  })

  const [freelancingRevenue, pageViewsInsight, lemonSqueezyRevenue] = await Promise.all([
    freelancingRevenuePromise,
    pageViewsInsightPromise,
    lemonSqueezyRevenuePromise,
  ])

  const categories = [
    {
      title: pageViewsInsight.name,
      //   @ts-ignore
      metric: pageViewsInsight.result[0].aggregated_value.toLocaleString() as string,
    },
    {
      title: 'Total Freelancing Revenue',
      protected: true,
      metric: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(freelancingRevenue),
    },
    {
      title: 'Total SaaS Revenue',
      protected: true,
      metric: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(lemonSqueezyRevenue / 100),
    },
  ]

  return (
    <>
      {/* <pre>{JSON.stringify(pageViewsInsight, null, 2)}</pre> */}
      <Grid
        numItemsSm={2}
        numItemsMd={3}
        numItemsLg={3}
        className="container mx-auto max-w-5xl gap-6"
      >
        {categories.map((item) => {
          if (item.protected && !userId) {
            return (
              <Card key={item.title} className="p-6">
                <Text>{item.title}</Text>
                <Metric>
                  <Link
                    href={'/sign-up'}
                    className={buttonVariants({
                      variant: 'outline',
                    })}
                  >
                    Sign Up to Access
                  </Link>
                </Metric>
              </Card>
            )
          }
          return (
            <Card key={item.title} className="p-6">
              <Text>{item.title}</Text>
              <Metric>{item.metric}</Metric>
            </Card>
          )
        })}
      </Grid>
    </>
  )
}
