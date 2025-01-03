import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request, defaulting to 'en' if not available
  let locale = await requestLocale

  // Ensure that the incoming locale is valid
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'
  }

  return {
    locale, // Return the locale as required by next-intl v3.22
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
  }
})

export const locales = ['en', 'de']
