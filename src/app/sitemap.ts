import { absoluteUrl } from '@/lib/utils'
import { allPages, allPosts } from 'content-collections'
import type { MetadataRoute } from 'next'

export function generatePostsSitemaps() {
  const posts = allPosts.map((post) => {
    return {
      url: absoluteUrl(post.slug),
      lastModified: post.date,
      changeFrequency: 'monthly',
      priority: 1,
    }
  }) as MetadataRoute.Sitemap

  return posts
}

export function generatePagesSitemaps() {
  const pages = allPages.map((page) => {
    return {
      url: absoluteUrl(page.slug),
      lastModified: page.date,
      changeFrequency: 'monthly',
      priority: 1,
    }
  }) as MetadataRoute.Sitemap

  return pages
}

const defaultSitemap = [
  {
    url: absoluteUrl('/en'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: absoluteUrl('/de'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: absoluteUrl('/en/blog'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: absoluteUrl('/de/blog'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: absoluteUrl('/en/consulting-services'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: absoluteUrl('/de/consulting-services'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
] as MetadataRoute.Sitemap

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const posts = generatePostsSitemaps()
  const pages = generatePagesSitemaps()

  const sitemap = [...defaultSitemap, ...posts, ...pages]

  return sitemap
}
