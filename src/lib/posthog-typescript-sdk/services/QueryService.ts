/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
export class QueryService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Query results
   * @throws ApiError
   */
  public queryCreate({
    projectId,
    async,
    clientQueryId,
    query,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * (Experimental) Whether to run the query asynchronously. Defaults to False. If True, the `id` of the query can be used to check the status and to cancel it.
     */
    async?: boolean
    /**
     * Client provided query ID. Can be used to retrieve the status or cancel the query.
     */
    clientQueryId?: string
    /**
     * Submit a JSON string representing a query for PostHog data analysis, for example a HogQL query.
     *
     * Example payload:
     * ```
     * {"query": {"kind": "HogQLQuery", "query": "select * from events limit 100"}}
     * ```
     *
     * For more details on HogQL queries, see the [PostHog HogQL documentation](/docs/hogql#api-access).
     */
    query?: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/query/',
      path: {
        project_id: projectId,
      },
      query: {
        async: async,
        client_query_id: clientQueryId,
        query: query,
      },
    })
  }
  /**
   * (Experimental)
   * @returns any Query status
   * @throws ApiError
   */
  public queryRetrieve({
    id,
    projectId,
  }: {
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/query/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * (Experimental)
   * @returns void
   * @throws ApiError
   */
  public queryDestroy({
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
      url: '/api/projects/{project_id}/query/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns any No response body
   * @throws ApiError
   */
  public queryDraftSqlRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/query/draft_sql/',
      path: {
        project_id: projectId,
      },
    })
  }
}
