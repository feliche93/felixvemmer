/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedTableList } from '../models/PaginatedTableList';
import type { PatchedTable } from '../models/PatchedTable';
import type { Table } from '../models/Table';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WarehouseTablesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns PaginatedTableList
     * @throws ApiError
     */
    public warehouseTablesList({
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
    }): CancelablePromise<PaginatedTableList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/warehouse_tables/',
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
     * @returns Table
     * @throws ApiError
     */
    public warehouseTablesCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: Table,
    }): CancelablePromise<Table> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/warehouse_tables/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns Table
     * @throws ApiError
     */
    public warehouseTablesRetrieve({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this data warehouse table.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Table> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/warehouse_tables/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * Create, Read, Update and Delete Warehouse Tables.
     * @returns Table
     * @throws ApiError
     */
    public warehouseTablesUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this data warehouse table.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: Table,
    }): CancelablePromise<Table> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/warehouse_tables/{id}/',
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
     * @returns Table
     * @throws ApiError
     */
    public warehouseTablesPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this data warehouse table.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedTable,
    }): CancelablePromise<Table> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/warehouse_tables/{id}/',
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
    public warehouseTablesDestroy({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this data warehouse table.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/warehouse_tables/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

}
