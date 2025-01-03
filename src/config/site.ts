import { env } from '@/client'
import { absoluteUrl } from '@/lib/utils'

const baseUrl = env.NEXT_PUBLIC_BASE_URL

export const siteConfig = {
  name: 'Felix Vemmer',
  url: baseUrl,
  logo: absoluteUrl('/logos/felix-vemmer.png'),
  ogImage: absoluteUrl('/og.webp'),
  links: {
    twitter: 'https://twitter.com/felixvemmer',
    github: 'https://github.com/feliche93/cryptoneur',
    linkedin: 'https://www.linkedin.com/in/felix-vemmer/',
  },
}

export type SiteConfig = typeof siteConfig
