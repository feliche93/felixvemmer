/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationResourceAccess } from '../models/OrganizationResourceAccess';
import type { PaginatedOrganizationResourceAccessList } from '../models/PaginatedOrganizationResourceAccessList';
import type { PatchedOrganizationResourceAccess } from '../models/PatchedOrganizationResourceAccess';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ResourceAccessService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedOrganizationResourceAccessList
     * @throws ApiError
     */
    public resourceAccessList({
        parentLookupOrganizationId,
        limit,
        offset,
    }: {
        parentLookupOrganizationId: string,
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
    }): CancelablePromise<PaginatedOrganizationResourceAccessList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/resource_access/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns OrganizationResourceAccess
     * @throws ApiError
     */
    public resourceAccessCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody: OrganizationResourceAccess,
    }): CancelablePromise<OrganizationResourceAccess> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/resource_access/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns OrganizationResourceAccess
     * @throws ApiError
     */
    public resourceAccessRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this organization resource access.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<OrganizationResourceAccess> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/resource_access/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns OrganizationResourceAccess
     * @throws ApiError
     */
    public resourceAccessUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this organization resource access.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody: OrganizationResourceAccess,
    }): CancelablePromise<OrganizationResourceAccess> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/resource_access/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns OrganizationResourceAccess
     * @throws ApiError
     */
    public resourceAccessPartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this organization resource access.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedOrganizationResourceAccess,
    }): CancelablePromise<OrganizationResourceAccess> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/resource_access/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public resourceAccessDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this organization resource access.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/resource_access/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

}
