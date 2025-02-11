import { Link } from '@/app/navigation'
import { BlogPostGrid } from '@/components/blog-post-grid'
import { CalCom } from '@/components/cal-com'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import Testimonials from '@/components/testimonials'
import { buttonVariants } from '@/components/ui/button'
import { PageIntro } from '@/components/ui/page-intro'
import { Skills } from '@/components/ui/skills'
import { generatePageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generatePageMeta({
    locale,
    url: `/${locale}`,
    image: '/og.webp',
  })
}

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('index')

  // TODO: Sort by Views
  // let postsWithView = await Promise.all(posts.map(async (post) => {
  //   const views = await getTotalPageViewsByPath({ path: post.slug });
  //   return {
  //     ...post,
  //     views,
  //   };
  // }))

  // postsWithView.sort((a, b) => (b.views || 0) - (a.views || 0))
  //   .slice(0, 6)

  return (
    <>
      {/* Hero */}
      <div className="container relative">
        <PageHeader className="flex flex-col items-center pb-8">
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
            className="rounded-full border border-primary-foreground"
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
          <div className="flex w-full flex-col items-center justify-center gap-4 pt-4 pb-8 sm:w-fit sm:flex-row md:pb-10">
            <Link
              href="/consulting-services"
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'lg',
                  className: 'w-full',
                }),
              )}
            >
              {t('hero.primaryCTA')}
            </Link>
            <Link
              href={'/blog'}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg', className: 'w-full' }),
              )}
            >
              {t('hero.secondaryCTA')}
            </Link>
          </div>
        </PageHeader>
        {/* KPIs */}
        {/* <Suspense fallback={<KpisFallback />}>
          <Kpis />
        </Suspense> */}
      </div>

      {/* Skills */}
      <PageIntro centered title={t('skills.title')} eyebrow={t('skills.section')}>
        {t('skills.description')}
      </PageIntro>
      <Skills />
      {/* Latest from blog */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <PageIntro centered title={t('blog.title')} eyebrow={t('blog.section')} />
        <BlogPostGrid locale={locale} limit={6} />
      </div>
      {/* <FeatureGrid /> */}
      <Testimonials>
        <PageIntro centered title={t('testimonials.title')} eyebrow={t('testimonials.section')} />
      </Testimonials>
      <div>
        <PageIntro centered title={t('bookAMeeeting.title')} eyebrow={t('bookAMeeeting.section')} />
        <CalCom />
      </div>
    </>
  )
}
