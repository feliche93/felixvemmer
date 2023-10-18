import { formatDate } from '@/lib/utils'
import { allAuthors, allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
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
              BacklinkGPT Knowledge Hub
            </h2>
            <p className="mt-2 text-lg leading-8 text-base-content">
              From SEO basics to AI-powered tactics, discover the future of link building.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => {
              const authors = post.authors.map((author) =>
                allAuthors.find(({ slug }) => slug === `/authors/${author}`),
              )

              return (
                <div key={post._id}>
                  {/* <pre>
                    {JSON.stringify(
                      {
                        post,
                        authors,
                      },
                      null,
                      2,
                    )}
                  </pre> */}
                  <article className="flex flex-col items-start justify-between">
                    <div className="relative w-full">
                      <Image
                        className="aspect-[16/9] w-full rounded-2xl bg-base-200 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        src={post.image}
                        alt={post.title}
                        width={804}
                        height={452}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="max-w-xl">
                      <div className="mt-8 flex items-center gap-x-4 text-xs">
                        {post.date && (
                          <time dateTime={post.date} className="text-base-content/80">
                            {formatDate(post.date)}
                          </time>
                        )}
                        {/* {post?.blogpostCategories?.name && (
                        <Link
                          href={record.blogpostCategories?.name ?? '#'}
                          className="badge badge-neutral"
                        >
                          {record.blogpostCategories?.name}
                        </Link>
                      )} */}
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-base-content group-hover:text-primary">
                          <Link href={post.slug}>
                            <span className="absolute inset-0" />
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-base-content/80">
                          {post.description}
                        </p>
                      </div>
                      <div className="relative mt-8 flex items-center gap-x-4">
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
                          <p className="text-base-conten/80 font-semibold">
                            <Link href={'#'}>
                              <span className="absolute inset-0" />
                              {authors[0]?.title}
                            </Link>
                          </p>
                          <p className="text-base-content/60">{authors[0]?.title}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
