import { Link } from '@/app/navigation'
import { Icons } from '@/components/icons'
import { Mdx } from '@/components/mdx-components'
import { PageViews } from '@/components/page-views'
import { TOC } from '@/components/toc'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { generatePageMeta } from '@/lib/seo'
import { BreadCrumbStructuredData, NewsArticleStructuredData } from '@/lib/structured'
import { absoluteUrl, cn, createUrl, formatDate } from '@/lib/utils'
import { FireIcon } from '@heroicons/react/24/outline'
import { allAuthors, allPosts } from 'content-collections'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export interface PostPageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function getPostFromParams(params: PostPageProps['params']) {
  const { slug, locale } = await params
  const post = allPosts.find((p) => p.slug === slug && p.locale === locale && p.published === true)

  if (!post) {
    notFound()
  }

  return post
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = allPosts.find((p) => p.slug === slug && p.locale === locale && p.published === true)

  if (!post) {
    notFound()
  }

  const searchParams = new URLSearchParams()

  searchParams.set('heading', post.title)
  searchParams.set('type', 'Blog Post')
  searchParams.set('mode', 'dark')

  const ogUrl = createUrl('/api/og', searchParams)

  return generatePageMeta({
    locale: locale,
    url: absoluteUrl(post.slug),
    image: absoluteUrl(post.image),
    image_alt: post.title,
    title: post?.metaTitle ?? post.title,
    description: post?.metaDescription ?? post.description,
    keywords: post?.keywords,
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params

  const post = await getPostFromParams(params)
  const t = await getTranslations('blog')

  if (post === undefined) notFound()

  const authors = post.authors.map((author) => allAuthors.find(({ slug }) => slug === author))

  if (authors === undefined || authors.length === 0 || authors[0] === undefined) {
    notFound()
  }

  const searchParams = new URLSearchParams()
  searchParams.set('heading', post.title)
  searchParams.set('type', 'Blog Post')
  searchParams.set('mode', 'dark')

  const ogUrl = createUrl('/api/og', searchParams)

  return (
    <Suspense>
      <NewsArticleStructuredData
        id={absoluteUrl(post.slug)}
        headline={post.metaTitle ?? post.title}
        datePublished={post.date}
        dateModified={post.date}
        imageUrl={absoluteUrl(post.image)}
        keywords={post?.keywords ?? []}
        articleSection={post.categories}
      />
      <BreadCrumbStructuredData
        itemListElement={[
          {
            name: 'Blog',
            href: absoluteUrl(`/${locale}/blog`),
          },
          {
            name: post.title,
            href: absoluteUrl(post.slug),
          },
        ]}
      />
      <main className="relative mx-auto max-w-6xl px-4 py-6 md:gap-5 md:px-8 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
        <div className="prose mx-auto prose-p:text-base sm:max-w-2xl sm:prose-p:text-lg md:max-w-2xl">
          <article className="">
            <div className="flex flex-wrap-reverse items-center gap-4 pb-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {post.categories?.map((category, index) => (
                  <Badge className="" key={index}>
                    {category}
                  </Badge>
                ))}
              </div>
              {/* Featured */}
              {post.featured && (
                <div className="flex flex-wrap items-center gap-2">
                  <FireIcon className="h-6 w-6 text-destructive" />
                  <span className="font-semibold text-destructive">Featured</span>
                </div>
              )}
            </div>
            {/* Title */}
            <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">{post.title}</h1>
            {/* Excerpt */}
            <p className="pt-4 text-xl leading-8">{post.description}</p>
            {/* Author */}
            <div className="flex h-24 flex-row items-center gap-x-4">
              <Image
                priority={true}
                width={56}
                height={56}
                alt={authors[0].title}
                src={authors[0].avatar}
              />
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-bold text-lg">{authors[0].title}</span>
                <div className="flex h-4 items-center gap-2">
                  <span>{formatDate(post.date)}</span>
                  <Separator orientation="vertical" />
                  <Suspense fallback={null}>
                    <PageViews slug={post.slug} />
                  </Suspense>
                </div>
              </div>
            </div>
            {/* Cover Image */}
            <Image
              priority={true}
              alt={post.title}
              width={804}
              height={452}
              className="my-4 rounded-md border"
              src={post.image}
            />
            {/* Content */}
            <Suspense fallback={<div>Loading content...</div>}>
              <Mdx code={post.body} />
            </Suspense>
          </article>
          <hr className="my-8" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link href="/blog" className={cn(buttonVariants({ variant: 'ghost' }))}>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              See all posts
            </Link>
          </div>
        </div>
        <div className="hidden text-sm lg:block">
          <div className="-mt-10 sticky top-16 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <TOC toc={post.toc} title={t('tocHeading')} />
          </div>
        </div>
      </main>
    </Suspense>
  )
}
