import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server'
// Note: import from 'nuqs/server' to avoid the "use client" directive

export const sortOrder = ['asc', 'desc'] as const

export const pageParser = ({
  defaultPage = 1,
  clearOnDefault = true,
  scroll = false,
}: {
  defaultPage?: number
  clearOnDefault?: boolean
  scroll?: boolean
} = {}) =>
  parseAsInteger.withDefault(defaultPage).withOptions({
    shallow: false,
    clearOnDefault,
    scroll,
  })

export const perPageParser = ({
  defaultPerPage = 10,
  clearOnDefault = true,
  scroll = false,
}: {
  defaultPerPage?: number
  clearOnDefault?: boolean
  scroll?: boolean
} = {}) =>
  parseAsInteger.withDefault(defaultPerPage).withOptions({
    shallow: false,
    clearOnDefault,
    scroll,
  })

export const sortDirParser = ({
  clearOnDefault = true,
  scroll = false,
}: {
  clearOnDefault?: boolean
  scroll?: boolean
} = {}) =>
  parseAsStringLiteral(sortOrder).withOptions({
    shallow: false,
    clearOnDefault,
    scroll,
  })

export const sortColParser = ({
  clearOnDefault = true,
  scroll = false,
}: {
  clearOnDefault?: boolean
  scroll?: boolean
} = {}) =>
  parseAsString.withOptions({
    shallow: false,
    clearOnDefault,
    scroll,
  })

export const tableSearchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  page: pageParser(),
  perPage: perPageParser(),
  sortDir: sortDirParser(),
  sortCol: sortColParser(),
})
