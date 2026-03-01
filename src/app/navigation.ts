import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"
import { locales } from "../../i18n"

export const localePrefix = "always" // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/blog": "/blog",
  "/sign-in": "/sign-in",
  "/sign-up": "/sign-up",
  "/consulting-services": "/consulting-services",
  // If locales use different paths, you can
  // specify each external path per locale.
  "/about": {
    en: "/about",
    de: "/ueber-uns",
  },

  // // Dynamic params are supported via square brackets
  // '/news/[articleSlug]-[articleId]': {
  //   en: '/news/[articleSlug]-[articleId]',
  //   de: '/neuigkeiten/[articleSlug]-[articleId]',
  // },

  // // Also (optional) catch-all segments are supported
  // '/categories/[...slug]': {
  //   en: '/categories/[...slug]',
  //   de: '/kategorien/[...slug]',
  // },
} as const

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix,
  pathnames,
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
