/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PatchedExternalDataSchema = {
  readonly id?: string
  name?: string
  readonly table?: Record<string, any> | null
  should_sync?: boolean
  last_synced_at?: string | null
  /**
   * The latest error that occurred when syncing this schema.
   */
  latest_error?: string | null
}
