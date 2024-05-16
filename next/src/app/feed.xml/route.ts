import { description, title } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import { allPosts } from 'contentlayer/generated'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: title,
    description: description,
    generator: 'RSS for Node and Next.js',
    feed_url: absoluteUrl('/feed.xml'),
    site_url: absoluteUrl('/'),
    managingEditor: 'felix.vemmer@gmail.com (Felix Vemmer)',
    webMaster: 'felix.vemmer@gmail.com (Felix Vemmer)',
    copyright: `Copyright ${new Date().getFullYear().toString()}, Felix Vemmer`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description ?? '',
      date: post.date,
      url: absoluteUrl(post.slug),
      categories: post.categories,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
