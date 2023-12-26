/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Integration } from '../models/Integration';
import type { PaginatedIntegrationList } from '../models/PaginatedIntegrationList';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class IntegrationsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedIntegrationList
     * @throws ApiError
     */
    public integrationsList({
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
    }): CancelablePromise<PaginatedIntegrationList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/integrations/',
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
     * @returns Integration
     * @throws ApiError
     */
    public integrationsCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: Integration,
    }): CancelablePromise<Integration> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/integrations/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Integration
     * @throws ApiError
     */
    public integrationsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this integration.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Integration> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/integrations/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public integrationsDestroy({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this integration.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/integrations/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns Integration
     * @throws ApiError
     */
    public integrationsChannelsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this integration.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Integration> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/integrations/{id}/channels/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

}
