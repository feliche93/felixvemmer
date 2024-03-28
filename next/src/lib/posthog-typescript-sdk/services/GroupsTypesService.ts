/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { GroupType } from '../models/GroupType'
import type { PatchedGroupType } from '../models/PatchedGroupType'
export class GroupsTypesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns GroupType
   * @throws ApiError
   */
  public groupsTypesList({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Array<GroupType>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/groups_types/',
      path: {
        project_id: projectId,
      },
    })
  }
  /**
   * @returns GroupType
   * @throws ApiError
   */
  public groupsTypesUpdateMetadataPartialUpdate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedGroupType
  }): CancelablePromise<GroupType> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/groups_types/update_metadata/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
