/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { Hook } from '../models/Hook'
import type { PaginatedHookList } from '../models/PaginatedHookList'
import type { PatchedHook } from '../models/PatchedHook'
export class HooksService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Retrieve, create, update or destroy REST hooks.
   * @returns PaginatedHookList
   * @throws ApiError
   */
  public hooksList({
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
  }): CancelablePromise<PaginatedHookList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/hooks/',
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
   * Retrieve, create, update or destroy REST hooks.
   * @returns Hook
   * @throws ApiError
   */
  public hooksCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: Hook
  }): CancelablePromise<Hook> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/hooks/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Retrieve, create, update or destroy REST hooks.
   * @returns Hook
   * @throws ApiError
   */
  public hooksRetrieve({
    id,
    projectId,
  }: {
    /**
     * A unique value identifying this hook.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Hook> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/hooks/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * Retrieve, create, update or destroy REST hooks.
   * @returns Hook
   * @throws ApiError
   */
  public hooksUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique value identifying this hook.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: Hook
  }): CancelablePromise<Hook> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/hooks/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Retrieve, create, update or destroy REST hooks.
   * @returns Hook
   * @throws ApiError
   */
  public hooksPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique value identifying this hook.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedHook
  }): CancelablePromise<Hook> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/hooks/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Retrieve, create, update or destroy REST hooks.
   * @returns void
   * @throws ApiError
   */
  public hooksDestroy({
    id,
    projectId,
  }: {
    /**
     * A unique value identifying this hook.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/hooks/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
}
