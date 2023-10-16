import Link from 'next/link'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader className="pb-8 flex flex-col items-center">
        {/* <Link
          href="/docs/changelog"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          🎉 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
          <span className="sm:hidden">Test test.</span>
          <span className="hidden sm:inline">Introducing Style, a new CLI and more.</span>
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link> */}
        <Image
          className="border border-primary-foreground rounded-full"
          src={'/logos/felix-vemmer.png'}
          priority={true}
          width={200}
          height={200}
          alt="Felix Vemmer"
        />
        <PageHeaderHeading>👋 Welcome to my personal website</PageHeaderHeading>
        <PageHeaderDescription className="text-center">
          Hey, I am Felix, a full-stack developer based in Berlin. You will find
          straight-to-the-point insights and practical advice on Python, TypeScript, and all things
          full-stack.
        </PageHeaderDescription>
        <div className="flex w-full justify-center items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Link
            href="/consulting"
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'lg',
              }),
            )}
          >
            Consulting Services
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={'/blog'}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Blog
          </Link>
        </div>
      </PageHeader>
    </div>
  )
}
