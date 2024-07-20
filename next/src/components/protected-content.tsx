import { auth } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { FC } from 'react'
import ContentTeaser from './content-teaser'

export interface ProtectedContentProps {
  children: React.ReactNode
}
export const ProtectedContent: FC<ProtectedContentProps> = ({ children }) => {
  const { isBot } = userAgent({
    headers: headers(),
  })

  if (isBot) return <div>{children}</div>

  const { userId } = auth()

  if (!!userId) return <div>{children}</div>

  return <ContentTeaser />
}
