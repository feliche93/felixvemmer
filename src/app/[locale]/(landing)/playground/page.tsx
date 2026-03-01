import { headers } from "next/headers"
import { userAgent } from "next/server"
import ContentTeaser from "@/components/content-teaser"

export default async function PlaygroundPage() {
  const headersList = await headers()
  const { isBot } = userAgent({
    headers: headersList,
  })
  return (
    <div className="mx-auto max-w-lg">
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
