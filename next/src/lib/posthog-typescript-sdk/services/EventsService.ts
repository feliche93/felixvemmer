/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { ClickhouseEvent } from '../models/ClickhouseEvent'
import type { PaginatedClickhouseEventList } from '../models/PaginatedClickhouseEventList'
import type { Property } from '../models/Property'
export class EventsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedClickhouseEventList
   * @throws ApiError
   */
  public eventsList({
    projectId,
    after,
    before,
    distinctId,
    event,
    format,
    limit,
    offset,
    personId,
    properties,
    select,
    where,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * Only return events with a timestamp after this time.
     */
    after?: string
    /**
     * Only return events with a timestamp before this time.
     */
    before?: string
    /**
     * Filter list by distinct id.
     */
    distinctId?: number
    /**
     * Filter list by event. For example `user sign up` or `$pageview`.
     */
    event?: string
    format?: 'csv' | 'json'
    /**
     * The maximum number of results to return
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
    /**
     * Filter list by person id.
     */
    personId?: number
    /**
     * Filter events by event property, person property, cohort, groups and more.
     */
    properties?: Array<Property>
    /**
     * (Experimental) JSON-serialized array of HogQL expressions to return
     */
    select?: Array<string>
    /**
     * (Experimental) JSON-serialized array of HogQL expressions that must pass
     */
    where?: Array<string>
  }): CancelablePromise<PaginatedClickhouseEventList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/events/',
      path: {
        project_id: projectId,
      },
      query: {
        after: after,
        before: before,
        distinct_id: distinctId,
        event: event,
        format: format,
        limit: limit,
        offset: offset,
        person_id: personId,
        properties: properties,
        select: select,
        where: where,
      },
    })
  }
  /**
   * @returns ClickhouseEvent
   * @throws ApiError
   */
  public eventsRetrieve({
    id,
    projectId,
    format,
  }: {
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    format?: 'csv' | 'json'
  }): CancelablePromise<ClickhouseEvent> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/events/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      query: {
        format: format,
      },
    })
  }
  /**
   * @returns ClickhouseEvent
   * @throws ApiError
   */
  public eventsValuesRetrieve({
    projectId,
    format,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    format?: 'csv' | 'json'
  }): CancelablePromise<ClickhouseEvent> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/events/values/',
      path: {
        project_id: projectId,
      },
      query: {
        format: format,
      },
    })
  }
}
