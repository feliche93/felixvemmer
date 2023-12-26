import Link from 'next/link'

import { BlogPostGrid } from '@/components/blog-post-grid'
import { CalCom } from '@/components/cal-com'
import { Kpis } from '@/components/kpis'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import Testimonials from '@/components/testimonials'
import { buttonVariants } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/fade-in'
import { PageIntro } from '@/components/ui/page-intro'
import { Skills } from '@/components/ui/skills'
import { cn } from '@/lib/utils'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function IndexPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('index')

  const posts = allPosts
    .filter((post) => post.published)
    .filter((post) => post.locale === locale)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 6)

  return (
    <>
      {/* Hero */}
      <FadeIn className="container relative">
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
      </FadeIn>
      {/* KPIs */}
      <Kpis />
      {/* Skills */}
      <PageIntro centered title={t('skills.title')} eyebrow={t('skills.section')}>
        {t('skills.description')}
      </PageIntro>
      <Skills locale={locale} />
      {/* Latest from blog */}
      <FadeIn className="py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <PageIntro centered title={t('blog.title')} eyebrow={t('blog.section')} />
        <BlogPostGrid posts={posts} />
      </FadeIn>
      {/* <FeatureGrid /> */}
      <Testimonials>
        <PageIntro centered title={t('testimonials.title')} eyebrow={t('testimonials.section')} />
      </Testimonials>
      <FadeIn>
        <PageIntro centered title={t('bookAMeeeting.title')} eyebrow={t('bookAMeeeting.section')} />
        <CalCom />
      </FadeIn>
    </>
  )
}
