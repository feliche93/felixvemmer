/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { Funnel } from '../models/Funnel'
import type { FunnelStepsResults } from '../models/FunnelStepsResults'
export class FunnelService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns FunnelStepsResults Note, if funnel_viz_type is set the response will be different.
   * @throws ApiError
   */
  public funnels({
    projectId,
    format,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    format?: 'csv' | 'json'
    requestBody?: Funnel
  }): CancelablePromise<FunnelStepsResults> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/insights/funnel/',
      path: {
        project_id: projectId,
      },
      query: {
        format: format,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
