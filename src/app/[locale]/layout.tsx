import PostHogPageView from '@/components/posthog-page-view'
import { PHProvider } from '@/components/posthog-provider'
import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { WrappedClerkProvider } from '@/components/wrapped-clerk-provider'
import { fontSans } from '@/lib/fonts'
import { generatePageMeta } from '@/lib/seo'
import { StructuredData } from '@/lib/structured'
import { absoluteUrl, cn } from '@/lib/utils'
import '@/styles/globals.css'
import 'fumadocs-ui/style.css'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
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

  return generatePageMeta({
    locale: locale,
    url: absoluteUrl(`/${locale}`),
  })
}

export default async function LocaleRootLayout(props: LocaleRootLayoutProps) {
  const { locale } = await props.params
  setRequestLocale(locale || 'en')
  const children = props.children
  const messages = await getMessages()

  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <WrappedClerkProvider>
                <PHProvider>
                  <Suspense>
                    <PostHogPageView />
                  </Suspense>
                  <StructuredData />
                  <NuqsAdapter>{children}</NuqsAdapter>
                </PHProvider>
              </WrappedClerkProvider>
            </NextIntlClientProvider>
            <TailwindIndicator />
            <Toaster />
          </Providers>
        </body>
      </html>
    </>
  )
}
