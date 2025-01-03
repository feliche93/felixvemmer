/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { ExternalDataSchema } from '../models/ExternalDataSchema'
import type { PaginatedExternalDataSchemaList } from '../models/PaginatedExternalDataSchemaList'
import type { PatchedExternalDataSchema } from '../models/PatchedExternalDataSchema'
export class ExternalDataSchemasService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedExternalDataSchemaList
   * @throws ApiError
   */
  public externalDataSchemasList({
    projectId,
    limit,
    offset,
    search,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
    /**
     * A search term.
     */
    search?: string
  }): CancelablePromise<PaginatedExternalDataSchemaList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/external_data_schemas/',
      path: {
        project_id: projectId,
      },
      query: {
        limit: limit,
        offset: offset,
        search: search,
      },
    })
  }
  /**
   * @returns ExternalDataSchema
   * @throws ApiError
   */
  public externalDataSchemasCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: ExternalDataSchema
  }): CancelablePromise<ExternalDataSchema> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/external_data_schemas/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns ExternalDataSchema
   * @throws ApiError
   */
  public externalDataSchemasRetrieve({
    id,
    projectId,
  }: {
    /**
     * A UUID string identifying this external data schema.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<ExternalDataSchema> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/external_data_schemas/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns ExternalDataSchema
   * @throws ApiError
   */
  public externalDataSchemasUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A UUID string identifying this external data schema.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: ExternalDataSchema
  }): CancelablePromise<ExternalDataSchema> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/external_data_schemas/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns ExternalDataSchema
   * @throws ApiError
   */
  public externalDataSchemasPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A UUID string identifying this external data schema.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedExternalDataSchema
  }): CancelablePromise<ExternalDataSchema> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/external_data_schemas/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public externalDataSchemasDestroy({
    id,
    projectId,
  }: {
    /**
     * A UUID string identifying this external data schema.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/external_data_schemas/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
}
