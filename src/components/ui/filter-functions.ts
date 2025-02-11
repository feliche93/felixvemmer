import { type RankingInfo, compareItems, rankItem } from '@tanstack/match-sorter-utils'
import { type FilterFn, type SortingFn, sortingFns } from '@tanstack/table-core'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  const rankA = rowA.columnFiltersMeta[columnId]?.itemRank
  const rankB = rowB.columnFiltersMeta[columnId]?.itemRank

  // Only sort by rank if both rows have ranking information
  if (rankA !== undefined && rankB !== undefined) {
    dir = compareItems(rankA, rankB)
  }

  // Provide an alphanumeric fallback for when the item ranks are equal or undefined
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

const isWithinRange: FilterFn<any> = (row, columnId, value) => {
  const date = new Date(row.getValue(columnId))
  let [start, end] = value
  start = start ? new Date(start) : null
  end = end ? new Date(end) : null
  //If one filter defined and date is null filter it
  if ((start || end) && !date) return false
  if (start && !end) {
    return date.getTime() >= start.getTime()
  }
  if (!start && end) {
    return date.getTime() <= end.getTime()
  }
  if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
  }
  return true
}

export { fuzzyFilter, fuzzySort, isWithinRange }
