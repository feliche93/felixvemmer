'use client'

import type * as React from 'react'

import { useConfig } from '@/hooks/use-config'
import type { Style } from '@/registry/styles'

interface StyleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  styleName?: Style['name']
}

export function StyleWrapper({ styleName, children }: StyleWrapperProps) {
  const [config] = useConfig()

  if (!styleName || config.style === styleName) {
    return <>{children}</>
  }

  return null
}
