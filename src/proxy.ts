import { getSessionCookie } from "better-auth/cookies"
import { type NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { locales } from "../i18n"
import { localePrefix, pathnames } from "./app/navigation"

const intlMiddleware = createMiddleware({
  locales,
  pathnames,
  localePrefix,
  defaultLocale: "en",
})

const PROTECTED_ROUTES = ["/app", "/setup"]

const isProtectedRoute = (pathname: string) =>
  PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const sessionCookie = getSessionCookie(req)

  if (isProtectedRoute(pathname) && !sessionCookie) {
    const signInUrl = new URL("/sign-in", req.url)
    signInUrl.searchParams.set("returnUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|ingest).*)", "/", "/(api|trpc)(.*)"],
}
