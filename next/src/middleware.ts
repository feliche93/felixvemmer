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
    '/:locale/ingest/:path*',
  ],
})

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Re-include any files in the api or trpc folders that might have an extension
    '/(api|trpc)(.*)',
  ],
}
