/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilterAction } from './FilterAction'
import type { FilterEvent } from './FilterEvent'
import type { FunnelExclusion } from './FunnelExclusion'
import type { Property } from './Property'
export type Funnel = {
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
  /**
   * A property or cohort to break down on. You can select the type of the property with breakdown_type.
   * - `event` (default): a property key
   * - `person`: a person property key
   * - `cohort`: an array of cohort IDs (ie `[9581,5812]`)
   */
  breakdown?: string
  /**
   * Type of property to break down on.
   */
  breakdown_type?: 'event' | 'person' | 'cohort' | 'group' | 'session' | 'hogql'
  /**
   * Funnel window size. Set in combination with funnel_window_interval, so defaults to 'days'.
   */
  funnel_window_interval?: number
  /**
   * The type of interval. Used in combination with `funnel_window_intervals`.
   */
  funnel_window_interval_type?: 'DAY' | 'SECOND' | 'MINUTE' | 'HOUR' | 'WEEK' | 'MONTH'
  /**
   * The visualisation type.
   * - `steps` Track instances progress between steps of the funnel
   * - `trends` Track how this funnel's conversion rate is trending over time.
   * - `time_to_convert` Track how long it takes for instances to convert
   */
  funnel_viz_type?: 'trends' | 'time_to_convert' | 'steps'
  /**
   * - `ordered` - Step B must happen after Step A, but any number events can happen between A and B.
   * - `strict` - Step B must happen directly after Step A without any events in between.
   * - `unordered` - Steps can be completed in any sequence.
   */
  funnel_order_type?: 'strict' | 'unordered' | 'ordered'
  /**
   * Exclude users/groups that completed the specified event between two specific steps. Note that these users/groups will be completely excluded from the entire funnel.
   */
  exclusions?: Array<FunnelExclusion>
  /**
   * Aggregate by users or by groups. `0` means user, `>0` means a group. See interface for the corresponding ID of the group.
   */
  aggregation_group_type_index?: number
  breakdown_limit?: number
  /**
   * (DEPRECATED) Funnel window size in days. Use `funnel_window_interval` and `funnel_window_interval_type`
   */
  funnel_window_days?: number
}
