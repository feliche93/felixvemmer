// Do Not use <Link/> from next-intl here, as locale is in url already
import { formatDate } from '@/lib/utils'
import { allAuthors, allPosts } from 'content-collections'
import { compareDesc } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, Suspense } from 'react'
import { PageViews } from './page-views'
import { Badge } from './ui/badge'

export interface BlogPostGridProps {
  locale: string
  limit?: number
}

export const BlogPostGrid: FC<BlogPostGridProps> = ({ locale, limit }) => {
  const posts = allPosts
    .filter((post) => post.published)
    .filter((post) => post.locale === locale)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
    .slice(0, limit ?? allPosts.length)

  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => {
        const authors = post.authors.map((author) =>
          allAuthors.find(({ slug }) => slug === `/authors/${author}`),
        )

        return (
          <div key={post.slug}>
            <article className="flex flex-col items-start justify-between">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative w-full">
                  <Image
                    className="aspect-[16/9] w-full rounded-2xl bg-base-200 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    src={post.image}
                    alt={post.title}
                    width={804}
                    height={452}
                  />

                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
              </Link>
              {/* TODO: Add featured */}
              <div className="max-w-xl">
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {post.date && (
                    <time
                      dateTime={new Date(post.date).toISOString()}
                      className="text-muted-foreground text-xs"
                    >
                      {formatDate(new Date(post.date))}
                    </time>
                  )}
                  {post.categories
                    ?.map((category, index) => <Badge key={index}>{category}</Badge>)
                    .slice(0, 2)}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 font-semibold text-base-content text-lg leading-6 group-hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-base-content/80 text-sm leading-6">
                    {post.description}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  {/* Author */}
                  <div className="relative mt-4 flex items-center gap-x-4">
                    {authors[0]?.avatar && (
                      <Image
                        className="h-10 w-10 rounded-full bg-base-200"
                        src={authors[0].avatar}
                        alt={authors[0].title}
                        width={40}
                        height={40}
                      />
                    )}

                    <div className="text-sm leading-6">
                      <p className="font-semibold text-base-conten/80">
                        <Link href={'#'}>
                          <span className="absolute inset-0" />
                          {authors[0]?.title}
                        </Link>
                      </p>
                      {/* <p>{authors[0]?.twitter}</p> */}
                    </div>
                  </div>
                  {/* Page Views */}
                  <Suspense fallback={null}>
                    <PageViews className="mt-3 mr-2" slug={post.slug} />
                  </Suspense>
                </div>
              </div>
            </article>
          </div>
        )
      })}
    </div>
  )
}
