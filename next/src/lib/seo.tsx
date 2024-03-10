import { type Metadata } from 'next'
import { type OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { type Twitter } from 'next/dist/lib/metadata/types/twitter-types'
import { type StaticImageData } from 'next/image'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not defined')

const title = 'Felix Vemmer: Freelance Full-Stack Developer and Indiepreneur based in Berlin'
const description = `Explore my insights on full-stack development and discover the freelance services I offer, directly from Berlin.`
export const rootOpenGraph: OpenGraph = {
  locale: 'en',
  type: 'website',
  url: baseUrl,
  siteName: 'Felix Vemmer',
  title,
  description,
}

export const rootTwitter: Twitter = {
  title,
  description,
  card: 'summary_large_image',
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  applicationName: 'Felix Vemmer',
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  robots:
    'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
}

function getImage(image?: StaticImageData | string, alt?: string) {
  if (!image) {
    return null
  }

  if (typeof image === 'string') {
    return {
      url: image,
      alt,
    }
  }

  return {
    url: image.src,
    width: image.width,
    height: image.height,
    alt,
  }
}

export function generatePageMeta({
  locale = 'en',
  title = rootOpenGraph.title as string,
  description = rootOpenGraph.description as string,
  url,
  image,
  image_alt,
  publishedAt,
  updatedAt,
  author = 'Felix Vemmer',
  siteName = rootOpenGraph.siteName,
  feed,
}: {
  locale?: string
  title?: string
  description?: string
  url?: string
  image?: StaticImageData | string
  image_alt?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  siteName?: string
  feed?: string
} = {}): Metadata {
  const metadata = {
    ...rootMetadata,
    title,
    description,
    publisher: siteName,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...rootOpenGraph,
      locale,
      url,
      title: `${title} - ${siteName ?? rootOpenGraph.siteName}`,
      description,
    } as OpenGraph,
    twitter: {
      ...rootTwitter,
      title: `${title} - ${siteName ?? rootOpenGraph.siteName}`,
      description,
    } as Twitter,
  } as Metadata

  if (publishedAt && author) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: [author],
      section: siteName,
      tags: ['gift', 'gift-ideas', 'gift-finder', 'gift-idea-generator'],
    }
    metadata.creator = author
  }

  const img = getImage(image, image_alt || title)
  const screenshot = {
    url: `/social.jpg`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/jpeg',
  }
  metadata.openGraph!.images = img ? [img] : [screenshot]
  metadata.twitter!.images = img ? [img] : [screenshot]

  if (siteName) {
    metadata.applicationName = siteName
    metadata.openGraph!.siteName = siteName
  }

  if (feed) {
    if (!metadata.alternates!.types) {
      metadata.alternates!.types = {}
    }
    metadata.alternates!.types['application/rss+xml'] = feed
  }

  return metadata
}
