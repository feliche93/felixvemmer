import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'

import { PHProvider } from '@/components/posthog-provider'
import { ThemeProvider } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { locales } from '../../../i18n'

const PostHogPageView = dynamic(() => import('../../components/posthog-page-view'), {
  ssr: false,
})

interface LocaleRootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string | undefined
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export async function generateMetadata({
  params: { locale },
}: {
  params: LocaleRootLayoutProps['params']
}): Promise<Metadata> {
  unstable_setRequestLocale(locale || 'en')

  const t = await getTranslations('site')

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

  unstable_setRequestLocale(locale || 'en')

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <PHProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <PostHogPageView />
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </PHProvider>
          {/* <ThemeSwitcher /> */}
          {/* <Analytics /> */}
          {/* <NewYorkToaster />
          <DefaultToaster /> */}
        </body>
      </html>
    </>
  )
}
