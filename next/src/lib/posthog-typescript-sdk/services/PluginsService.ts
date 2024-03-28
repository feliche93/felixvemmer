/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { PaginatedPluginList } from '../models/PaginatedPluginList'
import type { PatchedPlugin } from '../models/PatchedPlugin'
import type { Plugin } from '../models/Plugin'
export class PluginsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedPluginList
   * @throws ApiError
   */
  public pluginsList({
    parentLookupOrganizationId,
    limit,
    offset,
  }: {
    parentLookupOrganizationId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedPluginList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsCreate({
    parentLookupOrganizationId,
    requestBody,
  }: {
    parentLookupOrganizationId: string
    requestBody?: Plugin
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsRetrieve({
    id,
    parentLookupOrganizationId,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsUpdate({
    id,
    parentLookupOrganizationId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
    requestBody?: Plugin
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsPartialUpdate({
    id,
    parentLookupOrganizationId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
    requestBody?: PatchedPlugin
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public pluginsDestroy({
    id,
    parentLookupOrganizationId,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsCheckForUpdatesRetrieve({
    id,
    parentLookupOrganizationId,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/check_for_updates/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsSourceRetrieve({
    id,
    parentLookupOrganizationId,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/source/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsUpdateSourcePartialUpdate({
    id,
    parentLookupOrganizationId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
    requestBody?: PatchedPlugin
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/update_source/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsUpgradeCreate({
    id,
    parentLookupOrganizationId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this plugin.
     */
    id: number
    parentLookupOrganizationId: string
    requestBody?: Plugin
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/upgrade/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsActivityRetrieve({
    parentLookupOrganizationId,
  }: {
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/activity/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsRepositoryRetrieve({
    parentLookupOrganizationId,
  }: {
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/repository/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pluginsUnusedRetrieve({
    parentLookupOrganizationId,
  }: {
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/plugins/unused/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
}
