/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBasic } from './UserBasic'
export type OrganizationInvite = {
  readonly id: string
  target_email: string
  first_name?: string
  readonly emailing_attempt_made: boolean
  readonly is_expired: boolean
  readonly created_by: UserBasic
  readonly created_at: string
  readonly updated_at: string
  message?: string | null
}
