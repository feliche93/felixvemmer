'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'
import { TooltipProvider } from './ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  )
}