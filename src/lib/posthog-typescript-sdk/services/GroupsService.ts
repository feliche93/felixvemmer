/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { Group } from '../models/Group'
import type { PaginatedGroupList } from '../models/PaginatedGroupList'
export class GroupsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * List all groups of a specific group type. You must pass ?group_type_index= in the URL. To get a list of valid group types, call /api/:project_id/groups_types/
   * @returns PaginatedGroupList
   * @throws ApiError
   */
  public groupsList({
    groupTypeIndex,
    projectId,
    search,
    cursor,
  }: {
    /**
     * Specify the group type to list
     */
    groupTypeIndex: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * Search the group name
     */
    search: string
    /**
     * The pagination cursor value.
     */
    cursor?: string
  }): CancelablePromise<PaginatedGroupList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/groups/',
      path: {
        project_id: projectId,
      },
      query: {
        cursor: cursor,
        group_type_index: groupTypeIndex,
        search: search,
      },
    })
  }
  /**
   * @returns Group
   * @throws ApiError
   */
  public groupsFindRetrieve({
    groupKey,
    groupTypeIndex,
    projectId,
  }: {
    /**
     * Specify the key of the group to find
     */
    groupKey: string
    /**
     * Specify the group type to find
     */
    groupTypeIndex: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Group> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/groups/find/',
      path: {
        project_id: projectId,
      },
      query: {
        group_key: groupKey,
        group_type_index: groupTypeIndex,
      },
    })
  }
  /**
   * @returns Group
   * @throws ApiError
   */
  public groupsPropertyDefinitionsRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Group> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/groups/property_definitions/',
      path: {
        project_id: projectId,
      },
    })
  }
  /**
   * @returns Group
   * @throws ApiError
   */
  public groupsPropertyValuesRetrieve({
    groupTypeIndex,
    key,
    projectId,
  }: {
    /**
     * Specify the group type to find property values of
     */
    groupTypeIndex: number
    /**
     * Specify the property key to find values for
     */
    key: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Group> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/groups/property_values/',
      path: {
        project_id: projectId,
      },
      query: {
        group_type_index: groupTypeIndex,
        key: key,
      },
    })
  }
  /**
   * @returns Group
   * @throws ApiError
   */
  public groupsRelatedRetrieve({
    groupTypeIndex,
    id,
    projectId,
  }: {
    /**
     * Specify the group type to find
     */
    groupTypeIndex: number
    /**
     * Specify the id of the user to find groups for
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Group> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/groups/related/',
      path: {
        project_id: projectId,
      },
      query: {
        group_type_index: groupTypeIndex,
        id: id,
      },
    })
  }
}
