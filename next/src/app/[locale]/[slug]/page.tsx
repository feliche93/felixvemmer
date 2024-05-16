import { Mdx } from '@/components/mdx-components'
import { generatePageMeta } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import '@/styles/mdx.css'
import { allPages } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    slug: string
    locale: string
  }
}

// export async function generateStaticParams() {
//   const params = allPages.map((page) => ({
//     slug: page._raw.sourceFileName.replace('.mdx', '') ?? null,
//     locale: page.locale ?? null,
//   }))

//   // console.log({ params })

//   return params
// }

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) return notFound()

  return generatePageMeta({
    locale: params.locale,
    title: page.title,
    description: page.description,
    url: absoluteUrl(page.slug.replace('pages/', '')),
  })
}

async function getPageFromParams(params: PostPageProps['params']) {
  const slug = params.slug
  const locale = params?.locale

  if (!slug) {
    null
  }

  if (!locale) {
    null
  }

  const page = allPages.find(
    (post) => post.slugAsParams.replace('pages/', '') === slug && post.locale === locale,
  )

  if (!page) {
    null
  }

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
