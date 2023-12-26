/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EarlyAccessFeature } from '../models/EarlyAccessFeature';
import type { EarlyAccessFeatureSerializerCreateOnly } from '../models/EarlyAccessFeatureSerializerCreateOnly';
import type { PaginatedEarlyAccessFeatureList } from '../models/PaginatedEarlyAccessFeatureList';
import type { PatchedEarlyAccessFeature } from '../models/PatchedEarlyAccessFeature';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EarlyAccessFeatureService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedEarlyAccessFeatureList
     * @throws ApiError
     */
    public earlyAccessFeatureList({
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
    }): CancelablePromise<PaginatedEarlyAccessFeatureList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/early_access_feature/',
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
     * @returns EarlyAccessFeatureSerializerCreateOnly
     * @throws ApiError
     */
    public earlyAccessFeatureCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: EarlyAccessFeatureSerializerCreateOnly,
    }): CancelablePromise<EarlyAccessFeatureSerializerCreateOnly> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/early_access_feature/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns EarlyAccessFeature
     * @throws ApiError
     */
    public earlyAccessFeatureRetrieve({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this early access feature.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<EarlyAccessFeature> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/early_access_feature/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns EarlyAccessFeature
     * @throws ApiError
     */
    public earlyAccessFeatureUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this early access feature.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: EarlyAccessFeature,
    }): CancelablePromise<EarlyAccessFeature> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/early_access_feature/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns EarlyAccessFeature
     * @throws ApiError
     */
    public earlyAccessFeaturePartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this early access feature.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedEarlyAccessFeature,
    }): CancelablePromise<EarlyAccessFeature> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/early_access_feature/{id}/',
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
    public earlyAccessFeatureDestroy({
        id,
        projectId,
    }: {
        /**
         * A UUID string identifying this early access feature.
         */
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/early_access_feature/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

}
