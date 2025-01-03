/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PatchedDashboardTemplate = {
  readonly id?: string
  template_name?: string | null
  dashboard_description?: string | null
  dashboard_filters?: Record<string, any> | null
  tags?: Array<string> | null
  tiles?: Record<string, any> | null
  variables?: Record<string, any> | null
  deleted?: boolean | null
  readonly created_at?: string | null
  created_by?: number | null
  image_url?: string | null
  readonly team_id?: number | null
  scope?: 'team' | 'global' | 'feature_flag' | '' | null
}
