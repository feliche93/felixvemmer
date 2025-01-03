/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBasic } from './UserBasic'
export type PatchedViewLink = {
  readonly id?: string
  deleted?: boolean | null
  table?: string
  readonly created_by?: UserBasic
  readonly created_at?: string
  saved_query_id?: string
  readonly saved_query?: string
  to_join_key?: string
  from_join_key?: string
}
