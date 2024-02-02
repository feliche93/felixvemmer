import { Mdx } from '@/components/mdx-components'
import { absoluteUrl } from '@/lib/utils'
import { allPages } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    slug: string[]
    locale: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  return {
    title: page?.title,
    description: page?.description,
    alternates: {
      canonical: page?.slug ? absoluteUrl(page.slug.replace('pages/', '')) : null,
    },
  }
}

async function getPageFromParams(params: PostPageProps['params']) {
  const slug = params.slug.join('/')
  const locale = params?.locale

  if (!slug) {
    null
  }

  if (!locale) {
    null
  }

  const pages = allPages.filter(
    (post) => post.slugAsParams.replace('pages/', '') === slug && post.locale === locale,
  )

  if (pages.length === 0) {
    return null
  }

  const page = pages[0]

  return page
}

export default async function PostPage({ params }: PostPageProps) {
  const page = await getPageFromParams(params)

  if (!page) notFound()

  return (
    <>
      {/* <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre>{JSON.stringify(page, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(allPages, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(allPosts, null, 2)}</pre> */}
      <div className="container py-20 prose prose-p:text-base sm:prose-p:text-lg mx-auto sm:max-w-2xl md:max-w-2xl">
        <Mdx code={page.body.code} />
      </div>
    </>
  )
}
