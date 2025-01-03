/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { PaginatedPluginList } from '../models/PaginatedPluginList'
import type { PatchedPlugin } from '../models/PatchedPlugin'
import type { Plugin } from '../models/Plugin'
export class PipelineDestinationsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedPluginList
   * @throws ApiError
   */
  public pipelineDestinationsList({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/',
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
  public pipelineDestinationsCreate({
    parentLookupOrganizationId,
    requestBody,
  }: {
    parentLookupOrganizationId: string
    requestBody?: Plugin
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/',
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
  public pipelineDestinationsRetrieve({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
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
  public pipelineDestinationsUpdate({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
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
  public pipelineDestinationsPartialUpdate({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
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
  public pipelineDestinationsDestroy({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
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
  public pipelineDestinationsCheckForUpdatesRetrieve({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/check_for_updates/',
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
  public pipelineDestinationsSourceRetrieve({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/source/',
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
  public pipelineDestinationsUpdateSourcePartialUpdate({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/update_source/',
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
  public pipelineDestinationsUpgradeCreate({
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
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/upgrade/',
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
  public pipelineDestinationsActivityRetrieve({
    parentLookupOrganizationId,
  }: {
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/activity/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pipelineDestinationsRepositoryRetrieve({
    parentLookupOrganizationId,
  }: {
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/repository/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns Plugin
   * @throws ApiError
   */
  public pipelineDestinationsUnusedRetrieve({
    parentLookupOrganizationId,
  }: {
    parentLookupOrganizationId: string
  }): CancelablePromise<Plugin> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/unused/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
}
