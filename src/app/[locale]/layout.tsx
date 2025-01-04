import PostHogPageView from '@/components/posthog-page-view'
import { PHProvider } from '@/components/posthog-provider'
import { Providers } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { WrappedClerkProvider } from '@/components/wrapped-clerk-provider'
import { fontSans } from '@/lib/fonts'
import { generatePageMeta } from '@/lib/seo'
import { StructuredData } from '@/lib/structured'
import { absoluteUrl, cn } from '@/lib/utils'
import '@/styles/globals.css'
import 'fumadocs-ui/style.css'
import type { Metadata, Viewport } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { locales } from '../../../i18n'

interface LocaleRootLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string | undefined
  }>
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata(props: LocaleRootLayoutProps): Promise<Metadata> {
  const { locale } = await props.params

  setRequestLocale(locale || 'en')

  return generatePageMeta({
    locale: locale,
    url: absoluteUrl(`/${locale}`),
  })
}

export default async function LocaleRootLayout(props: LocaleRootLayoutProps) {
  const { locale } = await props.params
  const children = props.children
  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  setRequestLocale(locale || 'en')

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WrappedClerkProvider>
              <PHProvider>
                <StructuredData />
                <div className="relative flex min-h-screen flex-col">
                  <Suspense>
                    <PostHogPageView />
                  </Suspense>
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                  <SiteFooter />
                </div>
              </PHProvider>
            </WrappedClerkProvider>
            <TailwindIndicator />
            <Toaster />
          </Providers>
        </body>
      </html>
    </>
  )
}
