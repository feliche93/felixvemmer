import { BlogPostGrid } from '@/components/blog-post-grid'
import { generatePageMeta } from '@/lib/seo'
import { BreadCrumbStructuredData } from '@/lib/structured'
import { absoluteUrl } from '@/lib/utils'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '../../../../i18n'

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  return generatePageMeta({
    locale,
    title: 'Blog',
    url: absoluteUrl(`/${locale}/blog`),
  })
}

export async function generateStaticParams() {
  const params = locales.map((locale) => ({
    slug: 'blog',
    locale,
  }))

  return params
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale || 'en')
  const t = await getTranslations('blog')

  return (
    <>
      <BreadCrumbStructuredData
        itemListElement={[
          {
            name: 'Blog',
            href: absoluteUrl(`/${locale}/blog`),
          },
        ]}
      />
      {/* <pre>{JSON.stringify(blogPostsData, null, 2)}</pre> */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold text-3xl text-primary tracking-tight sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-2 text-base-content text-lg leading-8">{t('subtitle')}</p>
          </div>
          <BlogPostGrid locale={locale} />
        </div>
      </div>
    </>
  )
}
