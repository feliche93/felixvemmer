import Link from 'next/link'

import { BlogPostGrid } from '@/components/blog-post-grid'
import { CalCom } from '@/components/cal-com'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import Testimonials from '@/components/testimonials'
import { buttonVariants } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { cn } from '@/lib/utils'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function IndexPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('index')

  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 6)

  return (
    <>
      {/* Hero */}
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
          <PageHeaderHeading className="text-center">{t('hero.title')}</PageHeaderHeading>
          <PageHeaderDescription className="text-center">
            {t('hero.description')}
          </PageHeaderDescription>
          <div className="flex w-full justify-center items-center space-x-4 pb-8 pt-4 md:pb-10">
            <Link
              href="/consulting-services"
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'lg',
                }),
              )}
            >
              {t('hero.primaryCTA')}
            </Link>
            <Link href={'/blog'} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              {t('hero.secondaryCTA')}
            </Link>
          </div>
        </PageHeader>
      </div>
      {/* Latest from blog */}
      <div className="py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <Header className="mx-auto max-w-xl text-center mb-16">
          <Header.Section>{t('blog.section')}</Header.Section>
          <Header.Title>{t('blog.title')}</Header.Title>
        </Header>
        <BlogPostGrid posts={posts} />
      </div>
      {/* <FeatureGrid /> */}
      <Testimonials>
        <Header className="mx-auto max-w-xl text-center">
          <Header.Section>{t('testimonials.section')}</Header.Section>
          <Header.Title>{t('testimonials.title')}</Header.Title>
        </Header>
      </Testimonials>
      <div>
        <Header className="mx-auto max-w-xl text-center mb-16">
          <Header.Section className="pt-12 sm:pt-16">{t('bookAMeeeting.section')}</Header.Section>
          <Header.Title>{t('bookAMeeeting.title')}</Header.Title>
        </Header>
        <CalCom />
      </div>
    </>
  )
}
