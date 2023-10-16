import Link from 'next/link'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function IndexPage() {
  const t = useTranslations('index.hero')

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
        <PageHeaderHeading className="text-center">{t('title')}</PageHeaderHeading>
        <PageHeaderDescription className="text-center">{t('description')}</PageHeaderDescription>
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
            {t('primaryCTA')}
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={'/blog'}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            {t('secondaryCTA')}
          </Link>
        </div>
      </PageHeader>
    </div>
  )
}
