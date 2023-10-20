import '@/styles/globals.css'
import { Metadata } from 'next'

import { PosthogProvider } from '@/components/posthog-provider'
import { ThemeProvider } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { getTranslator } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '../../../i18n'

interface LocaleRootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string | undefined
  }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: LocaleRootLayoutProps['params']
}): Promise<Metadata> {
  const t = await getTranslator(locale ?? 'en', 'site')

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: t('description'),
    keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
    authors: [
      {
        name: 'Felix Vemmer',
        url: 'https://felixvemmer.com',
      },
    ],
    creator: 'Felix Vemmer',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: t('description'),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: t('description'),
      images: [siteConfig.ogImage],
      creator: '@felixvemmer',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  }
}

export default function LocaleRootLayout({ children, params: { locale } }: LocaleRootLayoutProps) {
  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <PosthogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </PosthogProvider>
          {/* <ThemeSwitcher /> */}
          {/* <Analytics /> */}
          {/* <NewYorkToaster />
          <DefaultToaster /> */}
        </body>
      </html>
    </>
  )
}
