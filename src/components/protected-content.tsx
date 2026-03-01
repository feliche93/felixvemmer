import { headers } from "next/headers"
import { userAgent } from "next/server"
import type { FC } from "react"
import { getAuthSession } from "@/lib/auth/session"
import ContentTeaser from "./content-teaser"

export interface ProtectedContentProps {
  children: React.ReactNode
}
export const ProtectedContent: FC<ProtectedContentProps> = async ({ children }) => {
  const headersList = await headers()
  const { isBot } = userAgent({
    headers: headersList,
  })

  if (isBot) return <div>{children}</div>

  const session = await getAuthSession()
  const userId = session?.user?.id

  if (userId) return <div>{children}</div>

  return <ContentTeaser />
}
