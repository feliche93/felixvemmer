import { authMiddleware } from '@clerk/nextjs'
import createMiddleware from 'next-intl/middleware'
import { locales } from '../i18n'
import { localePrefix, pathnames } from './app/navigation'

const intlMiddleware = createMiddleware({
  locales,
  pathnames,
  localePrefix,
  defaultLocale: 'en',
})

export default authMiddleware({
  beforeAuth(request) {
    return intlMiddleware(request)
  },

  // Ensure that locale-specific sign in pages are public
  publicRoutes: [
    '/:locale',
    '/:locale/sign-in',
    '/:locale/sign-up',
    // blog
    '/:locale/blog/:path*',
    '/:locale/about',
    '/:locale/tech-stack',
    '/:locale/hardware',
    '/:locale/consulting-services',
    '/:locale/playground',
    // posthog
    '/ingest/:path*',
    '/api/revalidate-tag',
    '/api/revalidate-path',
  ],
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};