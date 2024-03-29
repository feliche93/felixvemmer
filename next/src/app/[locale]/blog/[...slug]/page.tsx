import { allAuthors, allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import { Mdx } from '@/components/mdx-components'

import '@/styles/mdx.css'
import Image from 'next/image'

import { Link } from '@/app/navigation'
import { Icons } from '@/components/icons'
import { PageViews } from '@/components/page-views'
import { DashboardTableOfContents } from '@/components/toc'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { generatePageMeta } from '@/lib/seo'
import { NewsArticleStructuredData } from '@/lib/structured'
import { getTableOfContents } from '@/lib/toc'
import { absoluteUrl, cn, createUrl, formatDate } from '@/lib/utils'
import { FireIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { Suspense } from 'react'

export interface PostPageProps {
  params: {
    slug: string[]
    locale: string
  }
}

export async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug
  // console.log({
  //   test: `blog/${slug}`,
  // })
  const post = allPosts.find((post) => post.slugAsParams === `blog/${slug}`)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) return notFound()

  const searchParams = new URLSearchParams()

  searchParams.set('heading', post.title)
  searchParams.set('type', 'Blog Post')
  searchParams.set('mode', 'dark')

  const ogUrl = createUrl('/api/og', searchParams)

  const { locale } = params

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

// export async function generateStaticParams(): Promise<PostPageProps['params'][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split('/'),
//     locale: post.locale,
//   }))
// }

export default async function PostPage({ params }: PostPageProps) {
  const { isBot } = userAgent({
    headers: headers(),
  })

  const post = await getPostFromParams(params)

  unstable_setRequestLocale(params.locale || 'en')

  const t = await getTranslations('blog')

  if (post === undefined) notFound()

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`),
  )

  if (authors === undefined || authors.length === 0 || authors[0] === undefined) {
    notFound()
  }

  const searchParams = new URLSearchParams()

  searchParams.set('heading', post.title)
  searchParams.set('type', 'Blog Post')
  searchParams.set('mode', 'dark')

  const ogUrl = createUrl('/api/og', searchParams)

  const toc = await getTableOfContents(post.body.raw)

  return (
    <>
      <NewsArticleStructuredData
        id={absoluteUrl(post.slug)}
        headline={post.metaTitle ?? post.title}
        datePublished={post.date}
        dateModified={post.date}
        imageUrl={absoluteUrl(post.image)}
        keywords={post?.keywords ?? []}
        articleSection={post.categories}
      />
      <main className="px-4 md:px-8 mx-auto max-w-6xl relative py-6 lg:grid lg:grid-cols-[1fr_300px] md:gap-5 lg:gap-10 lg:py-10 xl:gap-20">
        <div className="prose prose-p:text-base sm:prose-p:text-lg mx-auto sm:max-w-2xl md:max-w-2xl">
          <article className="">
            <div className="flex flex-wrap-reverse items-center gap-4 pb-4">
              {/* Categories */}
              <div className="flex gap-2 flex-wrap">
                {post.categories &&
                  post.categories.map((category, index) => (
                    <Badge className="" key={index}>
                      {category}
                    </Badge>
                  ))}
              </div>
              {/* Featured */}
              {post.featured && (
                <div className="flex flex-wrap items-center gap-2">
                  <FireIcon className="h-6 w-6 text-destructive" />
                  <span className="text-destructive font-semibold">Featured</span>
                </div>
              )}
            </div>
            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
            {/* Excerpt */}
            <p className="text-xl pt-4 leading-8">{post.description}</p>
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
                <span className="text-lg font-bold">{authors[0].title}</span>
                <div className="flex items-center gap-2 h-4">
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
              className="rounded-md border my-4"
              src={post.image}
            />
            {/* Content */}
            <Mdx isBot={isBot} code={post.body.code} />
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
          <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <DashboardTableOfContents title={t('tocHeading')} toc={toc} />
          </div>
        </div>
      </main>
    </>
  )
}
