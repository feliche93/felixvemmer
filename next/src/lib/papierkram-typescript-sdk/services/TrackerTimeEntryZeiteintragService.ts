/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class TrackerTimeEntryZeiteintragService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List all time entries
   * Cost in API Credits: 1
   * @returns any List of time entries
   * @throws ApiError
   */
  public getTrackerTimeEntries({
    page,
    pageSize,
    orderBy,
    orderDirection,
    projectId,
    taskId,
    invoiceId,
    userId,
    billingState,
    startTimeRangeStart,
    startTimeRangeEnd,
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
     * Filter by project id
     */
    projectId?: number
    /**
     * Filter by task id
     */
    taskId?: number
    /**
     * Filter by invoice id
     */
    invoiceId?: number
    /**
     * Filter by user id
     */
    userId?: number
    /**
     * Filter by billing state
     */
    billingState?: 'billed' | 'unbilled' | 'billable' | 'unbillable' | 'archived'
    /**
     * Filter by start time. Beginning of date range. As defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z
     */
    startTimeRangeStart?: string
    /**
     * Filter by start time. End of date range. As defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z
     */
    startTimeRangeEnd?: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/tracker/time_entries',
      query: {
        page: page,
        page_size: pageSize,
        order_by: orderBy,
        order_direction: orderDirection,
        project_id: projectId,
        task_id: taskId,
        invoice_id: invoiceId,
        user_id: userId,
        billing_state: billingState,
        start_time_range_start: startTimeRangeStart,
        start_time_range_end: startTimeRangeEnd,
      },
      errors: {
        400: `Unknown filter`,
      },
    })
  }

  /**
   * Create a time entry
   * Cost in API Credits: 10
   * @returns any Time entry created
   * @throws ApiError
   */
  public postTrackerTimeEntries({
    requestBody,
  }: {
    requestBody?: {
      entry_date: string
      started_at_time: string
      ended_at_time: string
      comments?: string | null
      billable_duration?: number | null
      unbillable?: boolean | null
      task: {
        id?: number
      }
      user: {
        id?: number
      }
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/tracker/time_entries',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Time entry not created when `,
      },
    })
  }

  /**
   * Retrieves a time entry
   * Cost in API Credits: 1
   * @returns any Show time entry
   * @throws ApiError
   */
  public getTrackerTimeEntries1({
    id,
  }: {
    /**
     * The id of the time entry
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/tracker/time_entries/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified time entry was not found`,
      },
    })
  }

  /**
   * Update a time entry
   * Cost in API Credits: 1
   * @returns any Time entry updated
   * @throws ApiError
   */
  public putTrackerTimeEntries({
    id,
    requestBody,
  }: {
    /**
     * The id of the time entry
     */
    id: string
    requestBody?: {
      entry_date?: string
      started_at_time?: string
      ended_at_time?: string
      comments?: string | null
      billable_duration?: number | null
      unbillable?: boolean | null
      task?: {
        id?: number
      }
      user?: {
        id?: number
      }
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/tracker/time_entries/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `The specified time entry was not found`,
        422: `The user was inactive`,
      },
    })
  }

  /**
   * Delete a time entry
   * Cost in API Credits: 1
   * @returns void
   * @throws ApiError
   */
  public deleteTrackerTimeEntries({
    id,
  }: {
    /**
     * The id of the time entry
     */
    id: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/tracker/time_entries/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified time entry was not found`,
      },
    })
  }

  /**
   * Archive a time entry
   * Cost in API Credits: 1
   * @returns any Time entry archived
   * @throws ApiError
   */
  public postTrackerTimeEntriesArchive({
    id,
  }: {
    /**
     * The id of the time entry
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/tracker/time_entries/{id}/archive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Unarchive a time entry
   * Cost in API Credits: 1
   * @returns any Time entry unarchived
   * @throws ApiError
   */
  public postTrackerTimeEntriesUnarchive({
    id,
  }: {
    /**
     * The id of the time entry
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/tracker/time_entries/{id}/unarchive',
      path: {
        id: id,
      },
    })
  }
}
