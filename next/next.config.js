const { withContentlayer } = require('next-contentlayer')
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts',
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
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
        source: '/*/pages/tech-stack',
        destination: '/*/tech-stack',
        permanent: true,
      },
      {
        source: '/*/pages/hardware',
        destination: '/*/hardware',
        permanent: true,
      },
      {
        source: '/*/pages/consulting-services',
        destination: '/*/consulting-services',
        permanent: true,
      },
      {
        source: '/*/pages/about',
        destination: '/*/about',
        permanent: true,
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

module.exports = withNextIntl(withContentlayer(nextConfig))
