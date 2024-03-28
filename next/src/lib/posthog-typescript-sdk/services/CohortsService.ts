/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { Cohort } from '../models/Cohort'
import type { PaginatedCohortList } from '../models/PaginatedCohortList'
import type { PatchedCohort } from '../models/PatchedCohort'
export class CohortsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedCohortList
   * @throws ApiError
   */
  public cohortsList({
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
  }): CancelablePromise<PaginatedCohortList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/cohorts/',
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
   * @returns Cohort
   * @throws ApiError
   */
  public cohortsCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: Cohort
  }): CancelablePromise<Cohort> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/cohorts/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Cohort
   * @throws ApiError
   */
  public cohortsRetrieve({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this cohort.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Cohort> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/cohorts/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns Cohort
   * @throws ApiError
   */
  public cohortsUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this cohort.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: Cohort
  }): CancelablePromise<Cohort> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/cohorts/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Cohort
   * @throws ApiError
   */
  public cohortsPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this cohort.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedCohort
  }): CancelablePromise<Cohort> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/cohorts/{id}/',
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
  public cohortsDestroy({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this cohort.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/cohorts/{id}/',
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
   * @returns Cohort
   * @throws ApiError
   */
  public cohortsDuplicateAsStaticCohortRetrieve({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this cohort.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Cohort> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/cohorts/{id}/duplicate_as_static_cohort/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns Cohort
   * @throws ApiError
   */
  public cohortsPersonsRetrieve({
    id,
    projectId,
    format,
  }: {
    /**
     * A unique integer value identifying this cohort.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    format?: 'csv' | 'json'
  }): CancelablePromise<Cohort> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/cohorts/{id}/persons/',
      path: {
        id: id,
        project_id: projectId,
      },
      query: {
        format: format,
      },
    })
  }
}
