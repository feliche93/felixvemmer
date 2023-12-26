/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TrackerTaskAufgabeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all tasks
     * Cost in API Credits: 1
     * @returns any List of tasks
     * @throws ApiError
     */
    public getTrackerTasks({
        page,
        pageSize,
        orderBy,
        orderDirection,
        projectId,
        propositionId,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Page size (1-100)
         */
        pageSize?: number,
        /**
         * Order by field (must be used with order_direction)
         */
        orderBy?: string,
        /**
         * Order direction (must be used with order_by)
         */
        orderDirection?: Array<'asc' | 'desc'>,
        /**
         * Filter by project id
         */
        projectId?: number,
        /**
         * Filter by proposition id
         */
        propositionId?: number,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tracker/tasks',
            query: {
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_direction': orderDirection,
                'project_id': projectId,
                'proposition_id': propositionId,
            },
        });
    }

    /**
     * Create a task
     * Cost in API Credits: 10
     * @returns any Task created
     * @throws ApiError
     */
    public postTrackerTasks({
        requestBody,
    }: {
        requestBody?: {
            name: string;
            relative_costs?: string | null;
            complete?: string | null;
            deadline?: string | null;
            flagged?: string | null;
            project: {
                id?: number;
            };
            proposition?: {
                id?: number;
            };
            user?: {
                id?: number;
            };
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/tracker/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Task could not be created`,
            },
        });
    }

    /**
     * Retrieves a task
     * Cost in API Credits: 1
     * @returns any Show task
     * @throws ApiError
     */
    public getTrackerTasks1({
        id,
    }: {
        /**
         * The id of the task
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tracker/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified task was not found`,
            },
        });
    }

    /**
     * Update a task
     * Cost in API Credits: 1
     * @returns any Task updated
     * @throws ApiError
     */
    public putTrackerTasks({
        id,
        requestBody,
    }: {
        /**
         * The id of the task
         */
        id: string,
        requestBody?: {
            name?: string;
            relative_costs?: string | null;
            complete?: string | null;
            deadline?: string | null;
            flagged?: string | null;
            project?: {
                id?: number;
            };
            proposition?: {
                id?: number;
            };
            user?: {
                id?: number;
            };
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/tracker/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `The specified task was not found`,
            },
        });
    }

    /**
     * Delete a task
     * Cost in API Credits: 1
     * @returns void
     * @throws ApiError
     */
    public deleteTrackerTasks({
        id,
    }: {
        /**
         * The id of the task
         */
        id: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/tracker/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified task was not found`,
            },
        });
    }

    /**
     * Archive a task
     * Cost in API Credits: 1
     * @returns any Task archived
     * @throws ApiError
     */
    public postTrackerTasksArchive({
        id,
    }: {
        /**
         * The id of the task
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/tracker/tasks/{id}/archive',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Unarchive a task
     * Cost in API Credits: 1
     * @returns any Task unarchived
     * @throws ApiError
     */
    public postTrackerTasksUnarchive({
        id,
    }: {
        /**
         * The id of the task
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/tracker/tasks/{id}/unarchive',
            path: {
                'id': id,
            },
        });
    }

}
