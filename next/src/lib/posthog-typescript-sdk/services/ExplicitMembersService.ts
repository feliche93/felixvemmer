/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExplicitTeamMember } from '../models/ExplicitTeamMember';
import type { PatchedExplicitTeamMember } from '../models/PatchedExplicitTeamMember';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ExplicitMembersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns ExplicitTeamMember
     * @throws ApiError
     */
    public explicitMembersList({
        projectId,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Array<ExplicitTeamMember>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/explicit_members/',
            path: {
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns ExplicitTeamMember
     * @throws ApiError
     */
    public explicitMembersCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: ExplicitTeamMember,
    }): CancelablePromise<ExplicitTeamMember> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/explicit_members/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns ExplicitTeamMember
     * @throws ApiError
     */
    public explicitMembersRetrieve({
        parentMembershipUserUuid,
        projectId,
    }: {
        parentMembershipUserUuid: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<ExplicitTeamMember> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/explicit_members/{parent_membership__user__uuid}/',
            path: {
                'parent_membership__user__uuid': parentMembershipUserUuid,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns ExplicitTeamMember
     * @throws ApiError
     */
    public explicitMembersUpdate({
        parentMembershipUserUuid,
        projectId,
        requestBody,
    }: {
        parentMembershipUserUuid: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: ExplicitTeamMember,
    }): CancelablePromise<ExplicitTeamMember> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/explicit_members/{parent_membership__user__uuid}/',
            path: {
                'parent_membership__user__uuid': parentMembershipUserUuid,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns ExplicitTeamMember
     * @throws ApiError
     */
    public explicitMembersPartialUpdate({
        parentMembershipUserUuid,
        projectId,
        requestBody,
    }: {
        parentMembershipUserUuid: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedExplicitTeamMember,
    }): CancelablePromise<ExplicitTeamMember> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/explicit_members/{parent_membership__user__uuid}/',
            path: {
                'parent_membership__user__uuid': parentMembershipUserUuid,
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
    public explicitMembersDestroy({
        parentMembershipUserUuid,
        projectId,
    }: {
        parentMembershipUserUuid: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/explicit_members/{parent_membership__user__uuid}/',
            path: {
                'parent_membership__user__uuid': parentMembershipUserUuid,
                'project_id': projectId,
            },
        });
    }

}
