/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBasic } from './UserBasic'
export type PatchedCohort = {
  readonly id?: number
  name?: string | null
  description?: string
  groups?: Record<string, any>
  deleted?: boolean
  filters?: Record<string, any> | null
  query?: Record<string, any> | null
  readonly is_calculating?: boolean
  readonly created_by?: UserBasic
  readonly created_at?: string | null
  readonly last_calculation?: string | null
  readonly errors_calculating?: number
  readonly count?: number | null
  is_static?: boolean
}
