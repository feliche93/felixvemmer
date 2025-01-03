/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class ProjectProjektService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List all projects
   * Cost in API Credits: 1
   * @returns any List of projects
   * @throws ApiError
   */
  public getProjects({
    page,
    pageSize,
    orderBy,
    orderDirection,
    companyId,
  }: {
    /**
     * Page number
     */
    page?: number
    /**
     * Page size (1-100)
     */
    pageSize?: number
    /**
     * Order by field (must be used with order_direction)
     */
    orderBy?: string
    /**
     * Order direction (must be used with order_by)
     */
    orderDirection?: Array<'asc' | 'desc'>
    /**
     * Filter by company id
     */
    companyId?: number
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/projects',
      query: {
        page: page,
        page_size: pageSize,
        order_by: orderBy,
        order_direction: orderDirection,
        company_id: companyId,
      },
    })
  }

  /**
   * Create a project
   * Cost in API Credits: 10
   * @returns any Project created
   * @throws ApiError
   */
  public postProjects({
    requestBody,
  }: {
    requestBody?: {
      name: string
      customer: {
        id?: number
      }
      description?: string | null
      start_date?: string | null
      end_date?: string | null
      flagged?: boolean | null
      budget_type?: 'money' | 'working_time' | null
      budget_money?: string | null
      budget_time?: string | null
      budget_time_unit?: 'hour' | 'day' | null
      color?: 'blue' | 'green' | 'lime' | 'pink' | 'purple' | 'orange' | null
      default_proposition?: {
        id?: number
      }
      team_members?: Array<{
        id?: number
      }> | null
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/projects',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Project could not be created`,
      },
    })
  }

  /**
   * Retrieves a project
   * Cost in API Credits: 1
   * @returns any Show project
   * @throws ApiError
   */
  public getProjects1({
    id,
  }: {
    /**
     * The id of the project
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/projects/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified project was not found`,
      },
    })
  }

  /**
   * Update a project
   * Cost in API Credits: 1
   * @returns any Project updated
   * @throws ApiError
   */
  public putProjects({
    id,
    requestBody,
  }: {
    /**
     * The id of the project
     */
    id: string
    requestBody?: {
      name?: string
      customer?: {
        id?: number
      }
      description?: string | null
      start_date?: string | null
      end_date?: string | null
      flagged?: boolean | null
      budget_type?: 'money' | 'working_time' | null
      budget_money?: string | null
      budget_time?: string | null
      budget_time_unit?: 'hour' | 'day' | null
      color?: 'blue' | 'green' | 'lime' | 'pink' | 'purple' | 'orange' | null
      default_proposition?: {
        id?: number
      }
      team_members?: Array<{
        id?: number
      }> | null
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/projects/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `The specified project was not found`,
      },
    })
  }

  /**
   * Delete a project
   * Cost in API Credits: 1
   * @returns void
   * @throws ApiError
   */
  public deleteProjects({
    id,
  }: {
    /**
     * The id of the project
     */
    id: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/projects/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified project was not found`,
      },
    })
  }

  /**
   * Archive a project
   * Cost in API Credits: 1
   * @returns any Project archived
   * @throws ApiError
   */
  public postProjectsArchive({
    id,
  }: {
    /**
     * The id of the project
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/projects/{id}/archive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Unarchive a project
   * Cost in API Credits: 1
   * @returns any Project unarchived
   * @throws ApiError
   */
  public postProjectsUnarchive({
    id,
  }: {
    /**
     * The id of the project
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/projects/{id}/unarchive',
      path: {
        id: id,
      },
    })
  }
}
