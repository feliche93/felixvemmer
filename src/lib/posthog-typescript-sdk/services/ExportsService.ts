/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { ExportedAsset } from '../models/ExportedAsset'
export class ExportsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns ExportedAsset
   * @throws ApiError
   */
  public exportsCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: ExportedAsset
  }): CancelablePromise<ExportedAsset> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/exports/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns ExportedAsset
   * @throws ApiError
   */
  public exportsRetrieve({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this exported asset.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<ExportedAsset> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/exports/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns ExportedAsset
   * @throws ApiError
   */
  public exportsContentRetrieve({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this exported asset.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<ExportedAsset> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/exports/{id}/content/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
}
