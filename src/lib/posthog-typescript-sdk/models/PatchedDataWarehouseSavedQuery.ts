/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBasic } from './UserBasic'
export type PatchedDataWarehouseSavedQuery = {
  readonly id?: string
  deleted?: boolean | null
  name?: string
  /**
   * HogQL query
   */
  query?: Record<string, any> | null
  readonly created_by?: UserBasic
  readonly created_at?: string
  readonly columns?: Array<{
    key: string
    type:
      | 'integer'
      | 'float'
      | 'string'
      | 'datetime'
      | 'date'
      | 'boolean'
      | 'array'
      | 'json'
      | 'lazy_table'
      | 'virtual_table'
      | 'field_traverser'
    fields?: Array<string>
    table?: string
    chain?: Array<string>
  }>
}
