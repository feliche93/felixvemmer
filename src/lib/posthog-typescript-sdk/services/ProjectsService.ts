/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { PaginatedTeamBasicList } from '../models/PaginatedTeamBasicList'
import type { PatchedTeam } from '../models/PatchedTeam'
import type { Team } from '../models/Team'
export class ProjectsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Projects for the current organization.
   * @returns PaginatedTeamBasicList
   * @throws ApiError
   */
  public list({
    limit,
    offset,
  }: {
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedTeamBasicList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/',
      query: {
        limit: limit,
        offset: offset,
      },
    })
  }
  /**
   * Projects for the current organization.
   * @returns Team
   * @throws ApiError
   */
  public create({ requestBody }: { requestBody?: Team }): CancelablePromise<Team> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/',
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Projects for the current organization.
   * @returns Team
   * @throws ApiError
   */
  public retrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this team.
     */
    id: number
  }): CancelablePromise<Team> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{id}/',
      path: {
        id: id,
      },
    })
  }
  /**
   * Projects for the current organization.
   * @returns Team
   * @throws ApiError
   */
  public update({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this team.
     */
    id: number
    requestBody?: Team
  }): CancelablePromise<Team> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Projects for the current organization.
   * @returns Team
   * @throws ApiError
   */
  public partialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this team.
     */
    id: number
    requestBody?: PatchedTeam
  }): CancelablePromise<Team> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Projects for the current organization.
   * @returns void
   * @throws ApiError
   */
  public destroy({
    id,
  }: {
    /**
     * A unique integer value identifying this team.
     */
    id: number
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{id}/',
      path: {
        id: id,
      },
    })
  }
}
