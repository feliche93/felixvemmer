/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchExport } from '../models/BatchExport';
import type { BatchExportRun } from '../models/BatchExportRun';
import type { PaginatedBatchExportList } from '../models/PaginatedBatchExportList';
import type { PaginatedBatchExportLogEntryList } from '../models/PaginatedBatchExportLogEntryList';
import type { PaginatedBatchExportRunList } from '../models/PaginatedBatchExportRunList';
import type { PatchedBatchExport } from '../models/PatchedBatchExport';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BatchExportsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedBatchExportList
     * @throws ApiError
     */
    public batchExportsList({
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
    }): CancelablePromise<PaginatedBatchExportList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/batch_exports/',
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
     * @returns BatchExport
     * @throws ApiError
     */
    public batchExportsCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: BatchExport,
    }): CancelablePromise<BatchExport> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/batch_exports/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns PaginatedBatchExportLogEntryList
     * @throws ApiError
     */
    public batchExportsLogsList({
        parentLookupBatchExportId,
        projectId,
        limit,
        offset,
    }: {
        parentLookupBatchExportId: string,
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
    }): CancelablePromise<PaginatedBatchExportLogEntryList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/batch_exports/{parent_lookup_batch_export_id}/logs/',
            path: {
                'parent_lookup_batch_export_id': parentLookupBatchExportId,
                'project_id': projectId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Get all BatchExportRuns for a BatchExport.
     * @returns PaginatedBatchExportRunList
     * @throws ApiError
     */
    public batchExportsRunsList({
        parentLookupBatchExportId,
        projectId,
        cursor,
    }: {
        parentLookupBatchExportId: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        /**
         * The pagination cursor value.
         */
        cursor?: string,
    }): CancelablePromise<PaginatedBatchExportRunList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/batch_exports/{parent_lookup_batch_export_id}/runs/',
            path: {
                'parent_lookup_batch_export_id': parentLookupBatchExportId,
                'project_id': projectId,
            },
            query: {
                'cursor': cursor,
            },
        });
    }

    /**
     * @returns PaginatedBatchExportLogEntryList
     * @throws ApiError
     */
    public batchExportsRunsLogsList({
        parentLookupBatchExportId,
        parentLookupRunId,
        projectId,
        limit,
        offset,
    }: {
        parentLookupBatchExportId: string,
        parentLookupRunId: string,
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
    }): CancelablePromise<PaginatedBatchExportLogEntryList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/batch_exports/{parent_lookup_batch_export_id}/runs/{parent_lookup_run_id}/logs/',
            path: {
                'parent_lookup_batch_export_id': parentLookupBatchExportId,
                'parent_lookup_run_id': parentLookupRunId,
                'project_id': projectId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns BatchExportRun
     * @throws ApiError
     */
    public batchExportsRunsRetrieve({
        id,
        parentLookupBatchExportId,
        projectId,
    }: {
        /**
         * A UUID string identifying this batch export run.
         */
        id: string,
        parentLookupBatchExportId: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<BatchExportRun> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/batch_exports/{parent_lookup_batch_export_id}/runs/{id}/',
            path: {
                'id': id,
                'parent_lookup_batch_export_id': parentLookupBatchExportId,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns BatchExport
     * @throws ApiError
     */
    public batchExportsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this batch export.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<BatchExport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/batch_exports/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns BatchExport
     * @throws ApiError
     */
    public batchExportsUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this batch export.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: BatchExport,
    }): CancelablePromise<BatchExport> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/batch_exports/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns BatchExport
     * @throws ApiError
     */
    public batchExportsPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this batch export.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedBatchExport,
    }): CancelablePromise<BatchExport> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/batch_exports/{id}/',
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
    public batchExportsDestroy({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this batch export.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/batch_exports/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * Trigger a backfill for a BatchExport.
     * @returns BatchExport
     * @throws ApiError
     */
    public batchExportsBackfillCreate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this batch export.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: BatchExport,
    }): CancelablePromise<BatchExport> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/batch_exports/{id}/backfill/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Pause a BatchExport.
     * @returns BatchExport
     * @throws ApiError
     */
    public batchExportsPauseCreate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this batch export.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: BatchExport,
    }): CancelablePromise<BatchExport> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/batch_exports/{id}/pause/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Unpause a BatchExport.
     * @returns BatchExport
     * @throws ApiError
     */
    public batchExportsUnpauseCreate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this batch export.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: BatchExport,
    }): CancelablePromise<BatchExport> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/batch_exports/{id}/unpause/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
