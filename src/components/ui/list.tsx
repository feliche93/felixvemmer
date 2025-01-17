import clsx from 'clsx'

import { Border } from '@/components/ui/border'
import { FadeIn, FadeInStagger } from '@/components/ui/fade-in'

export function List({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <FadeInStagger>
      <ul role="list" className={clsx('text-base text-muted-foreground', className)}>
        {children}
      </ul>
    </FadeInStagger>
  )
}

export function ListItem({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <li className="group mt-10 first:mt-0">
      <FadeIn>
        <Border className="pt-10 group-first:pt-0 group-first:after:hidden group-first:before:hidden">
          {title && <strong className="font-semibold text-foreground">{`${title}. `}</strong>}
          {children}
        </Border>
      </FadeIn>
    </li>
  )
}
