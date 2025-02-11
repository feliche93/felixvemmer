import { parseAsString, useQueryState } from 'nuqs'

export function useSearchFilter<TColumns extends Record<string, unknown>>(column: keyof TColumns) {
  const [value, setValue] = useQueryState(
    column.toString(),
    parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 1000,
    }),
  )

  return { value, setValue }
}
