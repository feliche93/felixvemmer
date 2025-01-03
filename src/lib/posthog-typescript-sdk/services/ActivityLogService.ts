/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { ActivityLog } from '../models/ActivityLog'
import type { PaginatedActivityLogList } from '../models/PaginatedActivityLogList'
export class ActivityLogService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedActivityLogList
   * @throws ApiError
   */
  public activityLogList({
    projectId,
    cursor,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * The pagination cursor value.
     */
    cursor?: string
  }): CancelablePromise<PaginatedActivityLogList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/activity_log/',
      path: {
        project_id: projectId,
      },
      query: {
        cursor: cursor,
      },
    })
  }
  /**
   * @returns ActivityLog
   * @throws ApiError
   */
  public activityLogBookmarkActivityNotificationCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: ActivityLog
  }): CancelablePromise<ActivityLog> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/activity_log/bookmark_activity_notification/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns ActivityLog
   * @throws ApiError
   */
  public activityLogImportantChangesRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<ActivityLog> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/activity_log/important_changes/',
      path: {
        project_id: projectId,
      },
    })
  }
}
