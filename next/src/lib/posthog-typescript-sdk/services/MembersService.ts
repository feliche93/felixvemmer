/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationMember } from '../models/OrganizationMember';
import type { PaginatedOrganizationMemberList } from '../models/PaginatedOrganizationMemberList';
import type { PatchedOrganizationMember } from '../models/PatchedOrganizationMember';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MembersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedOrganizationMemberList
     * @throws ApiError
     */
    public membersList({
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
    }): CancelablePromise<PaginatedOrganizationMemberList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/members/',
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
     * @returns OrganizationMember
     * @throws ApiError
     */
    public membersUpdate({
        parentLookupOrganizationId,
        userUuid,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        userUuid: string,
        requestBody?: OrganizationMember,
    }): CancelablePromise<OrganizationMember> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/members/{user__uuid}/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
                'user__uuid': userUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns OrganizationMember
     * @throws ApiError
     */
    public membersPartialUpdate({
        parentLookupOrganizationId,
        userUuid,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        userUuid: string,
        requestBody?: PatchedOrganizationMember,
    }): CancelablePromise<OrganizationMember> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/members/{user__uuid}/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
                'user__uuid': userUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public membersDestroy({
        parentLookupOrganizationId,
        userUuid,
    }: {
        parentLookupOrganizationId: string,
        userUuid: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/members/{user__uuid}/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
                'user__uuid': userUuid,
            },
        });
    }

}
