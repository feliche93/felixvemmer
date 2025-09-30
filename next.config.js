const { withContentCollections } = require('@content-collections/next')
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts',
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    ppr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale/pages/tech-stack',
        destination: '/:locale/tech-stack',
        permanent: true,
        locale: false, // Add this if you want to manually handle locales in the path
      },
      {
        source: '/:locale/pages/hardware',
        destination: '/:locale/hardware',
        permanent: true,
        locale: false, // Add this if you want to manually handle locales in the path
      },
      {
        source: '/:locale/pages/consulting-services',
        destination: '/:locale/consulting-services',
        permanent: true,
        locale: false, // Add this if you want to manually handle locales in the path
      },
      {
        source: '/:locale/pages/about',
        destination: '/:locale/about',
        permanent: true,
        locale: false, // Add this if you want to manually handle locales in the path
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/ingest/:path*',
        destination: 'https://eu.posthog.com/:path*',
      },
    ]
  },
}

module.exports = withContentCollections(withNextIntl(nextConfig))
