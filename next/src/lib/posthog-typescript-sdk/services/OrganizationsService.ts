/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationDomain } from '../models/OrganizationDomain';
import type { OrganizationInvite } from '../models/OrganizationInvite';
import type { OrganizationMember } from '../models/OrganizationMember';
import type { OrganizationResourceAccess } from '../models/OrganizationResourceAccess';
import type { PaginatedOrganizationDomainList } from '../models/PaginatedOrganizationDomainList';
import type { PaginatedOrganizationInviteList } from '../models/PaginatedOrganizationInviteList';
import type { PaginatedOrganizationMemberList } from '../models/PaginatedOrganizationMemberList';
import type { PaginatedOrganizationResourceAccessList } from '../models/PaginatedOrganizationResourceAccessList';
import type { PaginatedPluginList } from '../models/PaginatedPluginList';
import type { PaginatedRoleList } from '../models/PaginatedRoleList';
import type { PaginatedRoleMembershipList } from '../models/PaginatedRoleMembershipList';
import type { PatchedOrganizationDomain } from '../models/PatchedOrganizationDomain';
import type { PatchedOrganizationMember } from '../models/PatchedOrganizationMember';
import type { PatchedOrganizationResourceAccess } from '../models/PatchedOrganizationResourceAccess';
import type { PatchedPlugin } from '../models/PatchedPlugin';
import type { PatchedRole } from '../models/PatchedRole';
import type { Plugin } from '../models/Plugin';
import type { Role } from '../models/Role';
import type { RoleMembership } from '../models/RoleMembership';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class OrganizationsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedOrganizationDomainList
     * @throws ApiError
     */
    public domainsList({
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
    }): CancelablePromise<PaginatedOrganizationDomainList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/domains/',
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
     * @returns OrganizationDomain
     * @throws ApiError
     */
    public domainsCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody: OrganizationDomain,
    }): CancelablePromise<OrganizationDomain> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/domains/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns OrganizationDomain
     * @throws ApiError
     */
    public domainsRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A UUID string identifying this domain.
         */
        id: string,
        parentLookupOrganizationId: string,
    }): CancelablePromise<OrganizationDomain> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns OrganizationDomain
     * @throws ApiError
     */
    public domainsUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this domain.
         */
        id: string,
        parentLookupOrganizationId: string,
        requestBody: OrganizationDomain,
    }): CancelablePromise<OrganizationDomain> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns OrganizationDomain
     * @throws ApiError
     */
    public domainsPartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this domain.
         */
        id: string,
        parentLookupOrganizationId: string,
        requestBody?: PatchedOrganizationDomain,
    }): CancelablePromise<OrganizationDomain> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
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
    public domainsDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A UUID string identifying this domain.
         */
        id: string,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns OrganizationDomain
     * @throws ApiError
     */
    public domainsVerifyCreate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this domain.
         */
        id: string,
        parentLookupOrganizationId: string,
        requestBody: OrganizationDomain,
    }): CancelablePromise<OrganizationDomain> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/verify/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieves all feature flags for a given organization and key.
     * @returns any No response body
     * @throws ApiError
     */
    public featureFlagsRetrieve({
        featureFlagKey,
        parentLookupOrganizationId,
    }: {
        featureFlagKey: string,
        parentLookupOrganizationId: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/feature_flags/{feature_flag_key}/',
            path: {
                'feature_flag_key': featureFlagKey,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * Retrieves all feature flags for a given organization and key.
     * @returns any No response body
     * @throws ApiError
     */
    public featureFlagsCopyFlagsCreate({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/feature_flags/copy_flags/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns PaginatedOrganizationInviteList
     * @throws ApiError
     */
    public invitesList({
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
    }): CancelablePromise<PaginatedOrganizationInviteList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/invites/',
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
     * @returns OrganizationInvite
     * @throws ApiError
     */
    public invitesCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody: OrganizationInvite,
    }): CancelablePromise<OrganizationInvite> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/invites/',
            path: {
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
    public invitesDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A UUID string identifying this organization invite.
         */
        id: string,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/invites/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns OrganizationInvite
     * @throws ApiError
     */
    public invitesBulkCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody: OrganizationInvite,
    }): CancelablePromise<OrganizationInvite> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/invites/bulk/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

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

    /**
     * @returns PaginatedPluginList
     * @throws ApiError
     */
    public pipelineDestinationsList({
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
    }): CancelablePromise<PaginatedPluginList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/',
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
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsPartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
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
    public pipelineDestinationsDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsCheckForUpdatesRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/check_for_updates/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsSourceRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsUpdateSourcePartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/update_source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsUpgradeCreate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/{id}/upgrade/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsActivityRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/activity/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsRepositoryRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/repository/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineDestinationsUnusedRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_destinations/unused/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns PaginatedPluginList
     * @throws ApiError
     */
    public pipelineTransformationsList({
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
    }): CancelablePromise<PaginatedPluginList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/',
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
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsPartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
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
    public pipelineTransformationsDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsCheckForUpdatesRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/check_for_updates/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsSourceRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUpdateSourcePartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/update_source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUpgradeCreate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/{id}/upgrade/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsActivityRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/activity/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsRepositoryRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/repository/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pipelineTransformationsUnusedRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/pipeline_transformations/unused/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns PaginatedPluginList
     * @throws ApiError
     */
    public pluginsList({
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
    }): CancelablePromise<PaginatedPluginList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/',
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
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsPartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
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
    public pluginsDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsCheckForUpdatesRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/check_for_updates/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsSourceRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsUpdateSourcePartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: PatchedPlugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/update_source/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsUpgradeCreate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this plugin.
         */
        id: number,
        parentLookupOrganizationId: string,
        requestBody?: Plugin,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/{id}/upgrade/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsActivityRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/activity/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsRepositoryRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/repository/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Plugin
     * @throws ApiError
     */
    public pluginsUnusedRetrieve({
        parentLookupOrganizationId,
    }: {
        parentLookupOrganizationId: string,
    }): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/plugins/unused/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

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

    /**
     * @returns PaginatedRoleList
     * @throws ApiError
     */
    public rolesList({
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
    }): CancelablePromise<PaginatedRoleList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/',
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
     * @returns Role
     * @throws ApiError
     */
    public rolesCreate({
        parentLookupOrganizationId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        requestBody: Role,
    }): CancelablePromise<Role> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns PaginatedRoleMembershipList
     * @throws ApiError
     */
    public rolesRoleMembershipsList({
        parentLookupOrganizationId,
        parentLookupRoleId,
        limit,
        offset,
    }: {
        parentLookupOrganizationId: string,
        parentLookupRoleId: string,
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
    }): CancelablePromise<PaginatedRoleMembershipList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/{parent_lookup_role_id}/role_memberships/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
                'parent_lookup_role_id': parentLookupRoleId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns RoleMembership
     * @throws ApiError
     */
    public rolesRoleMembershipsCreate({
        parentLookupOrganizationId,
        parentLookupRoleId,
        requestBody,
    }: {
        parentLookupOrganizationId: string,
        parentLookupRoleId: string,
        requestBody: RoleMembership,
    }): CancelablePromise<RoleMembership> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/{parent_lookup_role_id}/role_memberships/',
            path: {
                'parent_lookup_organization_id': parentLookupOrganizationId,
                'parent_lookup_role_id': parentLookupRoleId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public rolesRoleMembershipsDestroy({
        id,
        parentLookupOrganizationId,
        parentLookupRoleId,
    }: {
        /**
         * A UUID string identifying this role membership.
         */
        id: string,
        parentLookupOrganizationId: string,
        parentLookupRoleId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/{parent_lookup_role_id}/role_memberships/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
                'parent_lookup_role_id': parentLookupRoleId,
            },
        });
    }

    /**
     * @returns Role
     * @throws ApiError
     */
    public rolesRetrieve({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A UUID string identifying this role.
         */
        id: string,
        parentLookupOrganizationId: string,
    }): CancelablePromise<Role> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

    /**
     * @returns Role
     * @throws ApiError
     */
    public rolesUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this role.
         */
        id: string,
        parentLookupOrganizationId: string,
        requestBody: Role,
    }): CancelablePromise<Role> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Role
     * @throws ApiError
     */
    public rolesPartialUpdate({
        id,
        parentLookupOrganizationId,
        requestBody,
    }: {
        /**
         * A UUID string identifying this role.
         */
        id: string,
        parentLookupOrganizationId: string,
        requestBody?: PatchedRole,
    }): CancelablePromise<Role> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
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
    public rolesDestroy({
        id,
        parentLookupOrganizationId,
    }: {
        /**
         * A UUID string identifying this role.
         */
        id: string,
        parentLookupOrganizationId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
            path: {
                'id': id,
                'parent_lookup_organization_id': parentLookupOrganizationId,
            },
        });
    }

}
