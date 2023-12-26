/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedViewLinkList } from '../models/PaginatedViewLinkList';
import type { PatchedViewLink } from '../models/PatchedViewLink';
import type { ViewLink } from '../models/ViewLink';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WarehouseViewLinkService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create, Read, Update and Delete View Columns.
     * @returns PaginatedViewLinkList
     * @throws ApiError
     */
    public warehouseViewLinkList({
        projectId,
        limit,
        offset,
        search,
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
        /**
         * A search term.
         */
        search?: string,
    }): CancelablePromise<PaginatedViewLinkList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/warehouse_view_link/',
            path: {
                'project_id': projectId,
            },
            query: {
                'limit': limit,
                'offset': offset,
                'search': search,
            },
        });
    }

    /**
     * Create, Read, Update and Delete View Columns.
     * @returns ViewLink
     * @throws ApiError
     */
    public warehouseViewLinkCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: ViewLink,
    }): CancelablePromise<ViewLink> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/warehouse_view_link/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create, Read, Update and Delete View Columns.
     * @returns ViewLink
     * @throws ApiError
     */
    public warehouseViewLinkRetrieve({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this data warehouse view link.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<ViewLink> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/warehouse_view_link/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * Create, Read, Update and Delete View Columns.
     * @returns ViewLink
     * @throws ApiError
     */
    public warehouseViewLinkUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this data warehouse view link.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: ViewLink,
    }): CancelablePromise<ViewLink> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/warehouse_view_link/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create, Read, Update and Delete View Columns.
     * @returns ViewLink
     * @throws ApiError
     */
    public warehouseViewLinkPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this data warehouse view link.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedViewLink,
    }): CancelablePromise<ViewLink> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/warehouse_view_link/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create, Read, Update and Delete View Columns.
     * @returns void
     * @throws ApiError
     */
    public warehouseViewLinkDestroy({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this data warehouse view link.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/warehouse_view_link/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

}
