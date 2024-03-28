/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { PaginatedScheduledChangeList } from '../models/PaginatedScheduledChangeList'
import type { PatchedScheduledChange } from '../models/PatchedScheduledChange'
import type { ScheduledChange } from '../models/ScheduledChange'
export class ScheduledChangesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create, read, update and delete scheduled changes.
   * @returns PaginatedScheduledChangeList
   * @throws ApiError
   */
  public scheduledChangesList({
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
  }): CancelablePromise<PaginatedScheduledChangeList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/scheduled_changes/',
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
   * Create, read, update and delete scheduled changes.
   * @returns ScheduledChange
   * @throws ApiError
   */
  public scheduledChangesCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: ScheduledChange
  }): CancelablePromise<ScheduledChange> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/scheduled_changes/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Create, read, update and delete scheduled changes.
   * @returns ScheduledChange
   * @throws ApiError
   */
  public scheduledChangesRetrieve({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this scheduled change.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<ScheduledChange> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/scheduled_changes/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete scheduled changes.
   * @returns ScheduledChange
   * @throws ApiError
   */
  public scheduledChangesUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this scheduled change.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: ScheduledChange
  }): CancelablePromise<ScheduledChange> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/scheduled_changes/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Create, read, update and delete scheduled changes.
   * @returns ScheduledChange
   * @throws ApiError
   */
  public scheduledChangesPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this scheduled change.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedScheduledChange
  }): CancelablePromise<ScheduledChange> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/scheduled_changes/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Create, read, update and delete scheduled changes.
   * @returns void
   * @throws ApiError
   */
  public scheduledChangesDestroy({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this scheduled change.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/scheduled_changes/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
}
