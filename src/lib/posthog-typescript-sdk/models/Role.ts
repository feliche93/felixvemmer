/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBasic } from './UserBasic'
export type Role = {
  readonly id: string
  name: string
  feature_flags_access_level?: 21 | 37
  readonly created_at: string
  readonly created_by: UserBasic
  readonly members: string
  readonly associated_flags: string
}
