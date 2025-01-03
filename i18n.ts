import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export default getRequestConfig(async ({ requestLocale }) => {
  if (!locales.includes(requestLocale as any)) notFound()

  return {
    messages: (await import(`./messages/${requestLocale}.json`)).default,
    timeZone: 'Europe/Berlin',
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 5,
        },
      },
      list: {
        enumeration: {
          style: 'long',
          type: 'conjunction',
        },
      },
    },
  }
})

export const locales = ['en', 'de']
