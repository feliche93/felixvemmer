import { useContentTeaser } from '@/hooks/use-content-teaser'
import { FC } from 'react'

export interface ProtectedContentProps {
  children: React.ReactNode
}
export const ProtectedContent: FC<ProtectedContentProps> = ({ children }) => {
  const [showContentTeaser, setShowContentTeaser] = useContentTeaser()
  if (showContentTeaser) return <></>
  return <div>{children}</div>
}
