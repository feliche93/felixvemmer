import { allAuthors, allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import { Mdx } from '@/components/mdx-components'

import '@/styles/mdx.css'
import { Metadata } from 'next'
import Image from 'next/image'

import { Icons } from '@/components/icons'
import { DashboardTableOfContents } from '@/components/toc'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { getTableOfContents } from '@/lib/toc'
import { absoluteUrl, cn, formatDate } from '@/lib/utils'
import { FireIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) return notFound()

  const url = process.env.NEXT_PUBLIC_URL

  const ogUrl = new URL(`${siteConfig.url}/api/og`)
  ogUrl.searchParams.set('heading', post.title)
  ogUrl.searchParams.set('type', 'Blog Post')
  ogUrl.searchParams.set('mode', 'dark')

  return {
    title: post?.metaTitle ?? post.title,
    description: post?.metaDescription ?? post.description,
    keywords: post?.keywords ?? [],
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<PostPageProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) notFound()

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`),
  )

  if (authors === undefined || authors.length === 0 || authors[0] === undefined) {
    notFound()
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <main className="px-4 md:px-8 mx-auto max-w-6xl relative py-6 lg:grid lg:grid-cols-[1fr_300px] md:gap-5 lg:gap-10 lg:py-10 xl:gap-20">
      <div className="prose prose-p:text-base sm:prose-p:text-lg mx-auto sm:max-w-2xl md:max-w-2xl">
        <article className="">
          <div className="flex flex-row items-center gap-4 pb-4">
            {/* Categories */}
            <div className="flex flex-wrap">
              {post.categories &&
                post.categories.map((category, index) => (
                  <Badge className="mr-2" key={index}>
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
            <Image width={56} height={56} alt={authors[0].title} src={authors[0].avatar} />

            <div className="flex flex-col gap-1 text-sm">
              <span className="text-lg font-bold">{authors[0].title}</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
          {/* Cover Image */}
          <Image
            alt={post.title}
            width={804}
            height={452}
            className="rounded-md border my-4"
            src={post.image}
          />

          {/* Content */}
          <Mdx code={post.body.code} />
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
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}