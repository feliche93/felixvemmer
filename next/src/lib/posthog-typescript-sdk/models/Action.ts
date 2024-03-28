/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionStep } from './ActionStep'
import type { UserBasic } from './UserBasic'
/**
 * Serializer mixin that resolves appropriate response for tags depending on license.
 */
export type Action = {
  readonly id: number
  name?: string | null
  description?: string
  tags?: Array<any>
  post_to_slack?: boolean
  slack_message_format?: string
  steps?: Array<ActionStep>
  readonly created_at: string
  readonly created_by: UserBasic
  deleted?: boolean
  readonly is_calculating: boolean
  last_calculated_at?: string
  readonly team_id: number
  readonly is_action: boolean
  readonly bytecode_error: string | null
}
