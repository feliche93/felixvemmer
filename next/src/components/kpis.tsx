import { getPostHogInsightById } from '@/lib/posthog-api'
import { Card, Grid, Metric, Text } from '@tremor/react'
import { FC } from 'react'

export const Kpis: FC = async () => {
  const pageViewsInsight = await getPostHogInsightById({
    id: 120881,
  })

  const categories = [
    {
      title: pageViewsInsight.name,
      //   @ts-ignore
      metric: pageViewsInsight.result[0].aggregated_value.toLocaleString() as string,
    },
    {
      title: 'Freelancing Hours sold',
      metric: undefined,
    },
    {
      title: 'SaaS MRR',
      metric: undefined,
    },
  ]

  return (
    <>
      {/* <pre>{JSON.stringify(pageViewsInsight, null, 2)}</pre> */}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 max-w-5xl mx-auto container">
        {categories.map((item) => (
          <Card key={item.title}>
            <Text>{item.title}</Text>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </Grid>
    </>
  )
}
