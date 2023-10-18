import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
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
}))

export const locales = ['en', 'de']
