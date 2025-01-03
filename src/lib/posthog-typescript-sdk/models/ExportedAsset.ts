/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Standard ExportedAsset serializer that doesn't return content.
 */
export type ExportedAsset = {
  readonly id: number
  dashboard?: number | null
  insight?: number | null
  export_format: 'image/png' | 'application/pdf' | 'text/csv'
  readonly created_at: string
  readonly has_content: string
  export_context?: Record<string, any> | null
  readonly filename: string
  expires_after?: string | null
}
