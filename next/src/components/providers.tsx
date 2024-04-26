'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { PHProvider } from './posthog-provider'
import { TooltipProvider } from './ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ClerkProvider>
        <PHProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </PHProvider>
      </ClerkProvider>
    </NextThemesProvider>
  )
}
