/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
export class UploadedMediaService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   *
   * When object storage is available this API allows upload of media which can be used, for example, in text cards on dashboards.
   *
   * Uploaded media must have a content type beginning with 'image/' and be less than 4MB.
   *
   * @returns any No response body
   * @throws ApiError
   */
  public uploadedMediaCreate({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/uploaded_media/',
      path: {
        project_id: projectId,
      },
    })
  }
}
