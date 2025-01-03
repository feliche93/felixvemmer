import { auth } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import type { FC } from 'react'
import ContentTeaser from './content-teaser'

export interface ProtectedContentProps {
  children: React.ReactNode
}
export const ProtectedContent: FC<ProtectedContentProps> = async ({ children }) => {
  const headersList = await headers()
  const { isBot } = userAgent({
    headers: headersList,
  })

  if (isBot) return <div>{children}</div>

  const { userId } = await auth()

  if (userId) return <div>{children}</div>

  return <ContentTeaser />
}
