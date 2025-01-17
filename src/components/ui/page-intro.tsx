import clsx from 'clsx'

import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/ui/fade-in'
import { cn } from '@/lib/utils'

export function PageIntro({
  eyebrow,
  title,
  className,
  children,
  centered = false,
}: {
  eyebrow: string
  title: string
  className?: string
  children?: React.ReactNode
  centered?: boolean
}) {
  return (
    <Container className={cn('mt-12 sm:mt-18 lg:mt-18', centered && 'text-center', className)}>
      <FadeIn>
        <h2>
          <span className="block font-display font-semibold text-base text-muted-foreground">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={clsx(
              'mt-6 block max-w-3xl font-bold font-display text-4xl text-foreground tracking-tight [text-wrap:balance] sm:text-text-5xl',
              centered && 'mx-auto',
            )}
          >
            {title}
          </span>
        </h2>
        {children && (
          <div
            className={clsx('mt-6 max-w-3xl text-muted-foreground text-xl', centered && 'mx-auto')}
          >
            {children}
          </div>
        )}
      </FadeIn>
    </Container>
  )
}
