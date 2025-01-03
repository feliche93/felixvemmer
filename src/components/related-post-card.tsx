/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SvZjaEpu0ds
 */
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { allPosts } from 'content-collections'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedPostCardProps {
  absoluteUrl: string
}

export function RelatedPostCard({ absoluteUrl }: RelatedPostCardProps) {
  const post = allPosts.find((p) => p.absoluteUrl === absoluteUrl)

  if (!post) {
    throw new Error(`Cannot find post with slug "${absoluteUrl}"`)
  }

  return (
    <Link target="_blank" href={post.slug} className="no-underline">
      <Card className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
        <div className="relative h-48 w-full md:h-auto md:w-1/2">
          <Image
            alt={`Cover image for ${post.title}`}
            className="m-0 object-cover"
            src={post.image}
            fill={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full p-4 md:w-1/2 md:p-6 dark:text-gray-300">
          <h2 className="font-bold text-xl">{post.title}</h2>
          <p className="mt-2 line-clamp-3 text-muted-foreground">{post.description}</p>
          <div className="mt-4">
            <span className="font-light text-sm">{formatDate(post.date)}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
