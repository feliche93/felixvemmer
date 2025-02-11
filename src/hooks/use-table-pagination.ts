'use client'

import { pageParser, perPageParser } from '@/search-params/table'
import { useQueryState } from 'nuqs'

export function usePerPage({
  scroll = false,
  defaultPerPage = 10,
  clearOnDefault = true,
}: {
  searchParam?: string
  scroll?: boolean
  defaultPerPage?: number
  clearOnDefault?: boolean
} = {}) {
  return useQueryState(
    'perPage',
    perPageParser({
      defaultPerPage,
      clearOnDefault,
      scroll,
    }),
  )
}

export function usePage({
  scroll = false,
  defaultPage = 1,
  clearOnDefault = true,
}: {
  scroll?: boolean
  defaultPage?: number
  clearOnDefault?: boolean
} = {}) {
  return useQueryState(
    'page',
    pageParser({
      defaultPage,
      clearOnDefault,
      scroll,
    }),
  )
}
