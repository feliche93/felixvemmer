import { BlogPostGrid } from '@/components/blog-post-grid'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale || 'en')

  const t = await getTranslations('blog')

  const posts = allPosts
    .filter((post) => post.published)
    .filter((post) => post.locale === locale)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <>
      {/* <pre>{JSON.stringify(blogPostsData, null, 2)}</pre> */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-2 text-lg leading-8 text-base-content">{t('subtitle')}</p>
          </div>
          <BlogPostGrid posts={posts} />
        </div>
      </div>
    </>
  )
}
