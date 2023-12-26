/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedPluginConfigList } from '../models/PaginatedPluginConfigList';
import type { PatchedPluginConfig } from '../models/PatchedPluginConfig';
import type { PluginConfig } from '../models/PluginConfig';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PipelineTransformationsConfigsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedPluginConfigList
     * @throws ApiError
     */
    public pipelineTransformationsConfigsList({
        projectId,
        limit,
        offset,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
    }): CancelablePromise<PaginatedPluginConfigList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/',
            path: {
                'project_id': projectId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns PluginConfig
     * @throws ApiError
     */
    public pipelineTransformationsConfigsCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: PluginConfig,
    }): CancelablePromise<PluginConfig> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns PluginConfig
     * @throws ApiError
     */
    public pipelineTransformationsConfigsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this plugin config.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<PluginConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns PluginConfig
     * @throws ApiError
     */
    public pipelineTransformationsConfigsUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin config.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: PluginConfig,
    }): CancelablePromise<PluginConfig> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns PluginConfig
     * @throws ApiError
     */
    public pipelineTransformationsConfigsPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin config.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedPluginConfig,
    }): CancelablePromise<PluginConfig> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public pipelineTransformationsConfigsDestroy({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this plugin config.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns PluginConfig
     * @throws ApiError
     */
    public pipelineTransformationsConfigsFrontendRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this plugin config.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<PluginConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/{id}/frontend/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns PluginConfig
     * @throws ApiError
     */
    public pipelineTransformationsConfigsJobCreate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin config.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: PluginConfig,
    }): CancelablePromise<PluginConfig> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/{id}/job/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns PluginConfig
     * @throws ApiError
     */
    public pipelineTransformationsConfigsRearrangePartialUpdate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedPluginConfig,
    }): CancelablePromise<PluginConfig> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/pipeline_transformations_configs/rearrange/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
