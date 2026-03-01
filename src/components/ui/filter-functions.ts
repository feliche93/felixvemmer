import { compareItems, type RankingInfo, rankItem } from "@tanstack/match-sorter-utils"
import { type FilterFn, type SortingFn, sortingFns } from "@tanstack/table-core"

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort: SortingFn<unknown> = (rowA, rowB, columnId) => {
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

const isWithinRange: FilterFn<unknown> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId)
  const date = new Date((rowValue as string | number | Date | null | undefined) ?? "")
  let [start, end] = Array.isArray(value) ? value : [null, null]
  start = start ? new Date(start as string | number | Date) : null
  end = end ? new Date(end as string | number | Date) : null
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
