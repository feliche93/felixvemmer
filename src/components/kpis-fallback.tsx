import { Grid } from '@tremor/react'
import { Skeleton } from './ui/skeleton'

export const KpisFallback = () => {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="container mx-auto max-w-5xl gap-6">
      <Skeleton className="h-[104px]" />
      <Skeleton className="h-[104px]" />
      <Skeleton className="h-[104px]" />
    </Grid>
  )
}
