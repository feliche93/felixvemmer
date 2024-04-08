import { useContentTeaser } from '@/hooks/use-content-teaser'
import { FC } from 'react'
import ContentTeaser from './content-teaser'

export interface ProtectedContentProps {
  children: React.ReactNode
}
export const ProtectedContent: FC<ProtectedContentProps> = ({ children }) => {
  const [showContentTeaser, setShowContentTeaser] = useContentTeaser()
  if (showContentTeaser) return <ContentTeaser />
  return <div>{children}</div>
}
