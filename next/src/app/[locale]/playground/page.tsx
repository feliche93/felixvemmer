import ContentTeaser from '@/components/content-teaser'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'

export default async function PlaygroundPage() {
  const headersList = await headers()
  const { isBot } = userAgent({
    headers: headersList,
  })
  return (
    <div className="max-w-lg mx-auto">
      <pre className="p-8">
        {JSON.stringify(
          {
            isBot,
          },
          null,
          2,
        )}
      </pre>
      <p>This is not hidden</p>
      <ContentTeaser>
        <h1>This is hidden</h1>
      </ContentTeaser>
    </div>
  )
}
