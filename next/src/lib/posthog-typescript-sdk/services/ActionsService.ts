/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Action } from '../models/Action';
import type { PaginatedActionList } from '../models/PaginatedActionList';
import type { PatchedAction } from '../models/PatchedAction';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ActionsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedActionList
     * @throws ApiError
     */
    public actionsList({
        projectId,
        format,
        limit,
        offset,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
    }): CancelablePromise<PaginatedActionList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/actions/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns Action
     * @throws ApiError
     */
    public actionsCreate({
        projectId,
        format,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Action,
    }): CancelablePromise<Action> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/actions/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Action
     * @throws ApiError
     */
    public actionsRetrieve({
        id,
        projectId,
        format,
    }: {
        /**
         * A unique integer value identifying this action.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Action> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/actions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * @returns Action
     * @throws ApiError
     */
    public actionsUpdate({
        id,
        projectId,
        format,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this action.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Action,
    }): CancelablePromise<Action> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/actions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Action
     * @throws ApiError
     */
    public actionsPartialUpdate({
        id,
        projectId,
        format,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this action.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: PatchedAction,
    }): CancelablePromise<Action> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/actions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
     * @returns void
     * @throws ApiError
     */
    public actionsDestroy({
        id,
        projectId,
        format,
    }: {
        /**
         * A unique integer value identifying this action.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/actions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            errors: {
                405: `No response body`,
            },
        });
    }

    /**
     * @returns Action
     * @throws ApiError
     */
    public actionsCountRetrieve({
        id,
        projectId,
        format,
    }: {
        /**
         * A unique integer value identifying this action.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Action> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/actions/{id}/count/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * @returns Action
     * @throws ApiError
     */
    public actionsPeopleRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Action> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/actions/people/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

}
