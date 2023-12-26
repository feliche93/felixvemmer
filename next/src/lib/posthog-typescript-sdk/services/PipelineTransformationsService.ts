/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedPluginList } from '../models/PaginatedPluginList';
import type { PatchedPlugin } from '../models/PatchedPlugin';
import type { Plugin } from '../models/Plugin';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PipelineTransformationsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedPluginList
     * @throws ApiError
     */
    public pipelineTransformationsList({
        parentLookupOrganizationId,
        limit,
        offset,
    }: {
        parentLookupOrganizationId: string,
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
    }): CancelablePromise<PaginatedPluginList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsPartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public pipelineTransformationsDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsCheckForUpdatesRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/check_for_updates/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsSourceRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUpdateSourcePartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/update_source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUpgradeCreate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/upgrade/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsActivityRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/activity/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsRepositoryRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/repository/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUnusedRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/unused/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

}
