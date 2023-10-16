import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader className="pb-8">
        <Link
          href="/docs/changelog"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          🎉 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
          <span className="sm:hidden">Test test.</span>
          <span className="hidden sm:inline">Introducing Style, a new CLI and more.</span>
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
        <PageHeaderHeading>Build your component library.</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your apps. Accessible.
          Customizable. Open Source.
        </PageHeaderDescription>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Link href="/docs" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </div>
      </PageHeader>
    </div>
  )
}
