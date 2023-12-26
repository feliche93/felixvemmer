/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSubscriptionList } from '../models/PaginatedSubscriptionList';
import type { PatchedSubscription } from '../models/PatchedSubscription';
import type { Subscription } from '../models/Subscription';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SubscriptionsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedSubscriptionList
     * @throws ApiError
     */
    public subscriptionsList({
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
    }): CancelablePromise<PaginatedSubscriptionList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/subscriptions/',
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
     * @returns Subscription
     * @throws ApiError
     */
    public subscriptionsCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: Subscription,
    }): CancelablePromise<Subscription> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/subscriptions/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Subscription
     * @throws ApiError
     */
    public subscriptionsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this subscription.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Subscription> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/subscriptions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns Subscription
     * @throws ApiError
     */
    public subscriptionsUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this subscription.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: Subscription,
    }): CancelablePromise<Subscription> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/subscriptions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Subscription
     * @throws ApiError
     */
    public subscriptionsPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this subscription.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedSubscription,
    }): CancelablePromise<Subscription> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/subscriptions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
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
    public subscriptionsDestroy({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this subscription.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/subscriptions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            errors: {
                405: `No response body`,
            },
        });
    }

}
