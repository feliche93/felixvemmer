/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { EnterpriseEventDefinition } from '../models/EnterpriseEventDefinition'
import type { PaginatedEnterpriseEventDefinitionList } from '../models/PaginatedEnterpriseEventDefinitionList'
import type { PatchedEnterpriseEventDefinition } from '../models/PatchedEnterpriseEventDefinition'
export class EventDefinitionsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedEnterpriseEventDefinitionList
   * @throws ApiError
   */
  public eventDefinitionsList({
    projectId,
    limit,
    offset,
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
  }): CancelablePromise<PaginatedEnterpriseEventDefinitionList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/event_definitions/',
      path: {
        project_id: projectId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    })
  }
  /**
   * @returns EnterpriseEventDefinition
   * @throws ApiError
   */
  public eventDefinitionsRetrieve({
    id,
    projectId,
  }: {
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<EnterpriseEventDefinition> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/event_definitions/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns EnterpriseEventDefinition
   * @throws ApiError
   */
  public eventDefinitionsUpdate({
    id,
    projectId,
    requestBody,
  }: {
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: EnterpriseEventDefinition
  }): CancelablePromise<EnterpriseEventDefinition> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/event_definitions/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns EnterpriseEventDefinition
   * @throws ApiError
   */
  public eventDefinitionsPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedEnterpriseEventDefinition
  }): CancelablePromise<EnterpriseEventDefinition> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/event_definitions/{id}/',
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
  public eventDefinitionsDestroy({
    id,
    projectId,
  }: {
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/event_definitions/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
}
