import ContentTeaser from '@/components/content-teaser'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'

export default function PlaygroundPage() {
  const { isBot } = userAgent({
    headers: headers(),
  })
  return (
    <>
      <pre>{JSON.stringify(isBot, null, 2)}</pre>
      <ContentTeaser isBot={isBot}>
        <h1>This is hidden</h1>
      </ContentTeaser>
    </>
  )
}
