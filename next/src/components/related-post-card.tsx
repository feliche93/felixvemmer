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
      <Card className="flex flex-col md:flex-row my-4 mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full md:w-1/2 h-48 md:h-auto">
          <Image
            alt={`Cover image for ${post.title}`}
            className="object-cover m-0"
            src={post.image}
            fill={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-6 dark:text-gray-300">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-muted-foreground line-clamp-3">{post.description}</p>
          <div className="mt-4">
            <span className="font-light text-sm">{formatDate(post.date)}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
