/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { OrganizationInvite } from '../models/OrganizationInvite'
import type { PaginatedOrganizationInviteList } from '../models/PaginatedOrganizationInviteList'
export class InvitesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedOrganizationInviteList
   * @throws ApiError
   */
  public invitesList({
    parentLookupOrganizationId,
    limit,
    offset,
  }: {
    parentLookupOrganizationId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedOrganizationInviteList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/invites/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    })
  }
  /**
   * @returns OrganizationInvite
   * @throws ApiError
   */
  public invitesCreate({
    parentLookupOrganizationId,
    requestBody,
  }: {
    parentLookupOrganizationId: string
    requestBody: OrganizationInvite
  }): CancelablePromise<OrganizationInvite> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/invites/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
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
    id: string
    parentLookupOrganizationId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/organizations/{parent_lookup_organization_id}/invites/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * @returns OrganizationInvite
   * @throws ApiError
   */
  public invitesBulkCreate({
    parentLookupOrganizationId,
    requestBody,
  }: {
    parentLookupOrganizationId: string
    requestBody: OrganizationInvite
  }): CancelablePromise<OrganizationInvite> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/invites/bulk/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
