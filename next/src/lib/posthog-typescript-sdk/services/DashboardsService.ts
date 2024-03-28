/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { Dashboard } from '../models/Dashboard'
import type { PaginatedDashboardBasicList } from '../models/PaginatedDashboardBasicList'
import type { PatchedDashboard } from '../models/PatchedDashboard'
export class DashboardsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedDashboardBasicList
   * @throws ApiError
   */
  public dashboardsList({
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
  }): CancelablePromise<PaginatedDashboardBasicList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/dashboards/',
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
   * @returns Dashboard
   * @throws ApiError
   */
  public dashboardsCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: Dashboard
  }): CancelablePromise<Dashboard> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/dashboards/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Dashboard
   * @throws ApiError
   */
  public dashboardsRetrieve({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this dashboard.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Dashboard> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/dashboards/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns Dashboard
   * @throws ApiError
   */
  public dashboardsUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this dashboard.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: Dashboard
  }): CancelablePromise<Dashboard> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/dashboards/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Dashboard
   * @throws ApiError
   */
  public dashboardsPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this dashboard.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedDashboard
  }): CancelablePromise<Dashboard> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/dashboards/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
   * @returns void
   * @throws ApiError
   */
  public dashboardsDestroy({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this dashboard.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/dashboards/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      errors: {
        405: `No response body`,
      },
    })
  }
  /**
   * @returns Dashboard
   * @throws ApiError
   */
  public dashboardsMoveTilePartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this dashboard.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedDashboard
  }): CancelablePromise<Dashboard> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/dashboards/{id}/move_tile/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Dashboard
   * @throws ApiError
   */
  public dashboardsCreateFromTemplateJsonCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: Dashboard
  }): CancelablePromise<Dashboard> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/dashboards/create_from_template_json/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
