/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataWarehouseSavedQuery } from '../models/DataWarehouseSavedQuery';
import type { PaginatedDataWarehouseSavedQueryList } from '../models/PaginatedDataWarehouseSavedQueryList';
import type { PatchedDataWarehouseSavedQuery } from '../models/PatchedDataWarehouseSavedQuery';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WarehouseSavedQueriesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns PaginatedDataWarehouseSavedQueryList
     * @throws ApiError
     */
    public warehouseSavedQueriesList({
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
    }): CancelablePromise<PaginatedDataWarehouseSavedQueryList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/warehouse_saved_queries/',
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
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns DataWarehouseSavedQuery
     * @throws ApiError
     */
    public warehouseSavedQueriesCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: DataWarehouseSavedQuery,
    }): CancelablePromise<DataWarehouseSavedQuery> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/warehouse_saved_queries/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns DataWarehouseSavedQuery
     * @throws ApiError
     */
    public warehouseSavedQueriesRetrieve({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this data warehouse saved query.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<DataWarehouseSavedQuery> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/warehouse_saved_queries/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns DataWarehouseSavedQuery
     * @throws ApiError
     */
    public warehouseSavedQueriesUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this data warehouse saved query.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: DataWarehouseSavedQuery,
    }): CancelablePromise<DataWarehouseSavedQuery> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/warehouse_saved_queries/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns DataWarehouseSavedQuery
     * @throws ApiError
     */
    public warehouseSavedQueriesPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this data warehouse saved query.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedDataWarehouseSavedQuery,
    }): CancelablePromise<DataWarehouseSavedQuery> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/warehouse_saved_queries/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns void
     * @throws ApiError
     */
    public warehouseSavedQueriesDestroy({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this data warehouse saved query.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/warehouse_saved_queries/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

}
