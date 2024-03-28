/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PatchedPlugin = {
  readonly id?: number
  plugin_type?: 'local' | 'custom' | 'repository' | 'source' | '' | null
  name?: string | null
  description?: string | null
  readonly url?: string | null
  icon?: string | null
  config_schema?: Record<string, any>
  tag?: string | null
  readonly latest_tag?: string | null
  is_global?: boolean
  readonly organization_id?: string
  readonly organization_name?: string
  capabilities?: Record<string, any>
  metrics?: Record<string, any> | null
  public_jobs?: Record<string, any> | null
}
