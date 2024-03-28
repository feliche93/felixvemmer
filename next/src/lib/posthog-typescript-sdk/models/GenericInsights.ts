/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilterAction } from './FilterAction'
import type { FilterEvent } from './FilterEvent'
import type { Property } from './Property'
export type GenericInsights = {
  /**
   * Events to filter on. One of `events` or `actions` is required.
   */
  events?: Array<FilterEvent>
  /**
   * Actions to filter on. One of `events` or `actions` is required.
   */
  actions?: Array<FilterAction>
  /**
   * Filter events by event property, person property, cohort, groups and more.
   */
  properties?: Property
  /**
   * Whether to filter out internal and test accounts. See "project settings" in your PostHog account for the filters.
   */
  filter_test_accounts?: boolean
  /**
   * What date to filter the results from. Can either be a date `2021-01-01`, or a relative date, like `-7d` for last seven days, `-1m` for last month, `mStart` for start of the month or `yStart` for the start of the year.
   */
  date_from?: string
  /**
   * What date to filter the results to. Can either be a date `2021-01-01`, or a relative date, like `-7d` for last seven days, `-1m` for last month, `mStart` for start of the month or `yStart` for the start of the year.
   */
  date_to?: string
}
