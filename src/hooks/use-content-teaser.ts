import { atom, useAtom } from 'jotai'

const showContentTeaser = atom(false)

export function useContentTeaser() {
  return useAtom(showContentTeaser)
}
