/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { PaginatedRoleList } from '../models/PaginatedRoleList'
import type { PaginatedRoleMembershipList } from '../models/PaginatedRoleMembershipList'
import type { PatchedRole } from '../models/PatchedRole'
import type { Role } from '../models/Role'
import type { RoleMembership } from '../models/RoleMembership'
export class RolesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedRoleList
   * @throws ApiError
   */
  public rolesList({
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
  }): CancelablePromise<PaginatedRoleList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/',
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
   * @returns Role
   * @throws ApiError
   */
  public rolesCreate({
    parentLookupOrganizationId,
    requestBody,
  }: {
    parentLookupOrganizationId: string
    requestBody: Role
  }): CancelablePromise<Role> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
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
    parentLookupOrganizationId: string
    parentLookupRoleId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedRoleMembershipList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/{parent_lookup_role_id}/role_memberships/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
        parent_lookup_role_id: parentLookupRoleId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    })
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
    parentLookupOrganizationId: string
    parentLookupRoleId: string
    requestBody: RoleMembership
  }): CancelablePromise<RoleMembership> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/{parent_lookup_role_id}/role_memberships/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
        parent_lookup_role_id: parentLookupRoleId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
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
    id: string
    parentLookupOrganizationId: string
    parentLookupRoleId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/{parent_lookup_role_id}/role_memberships/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
        parent_lookup_role_id: parentLookupRoleId,
      },
    })
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
    id: string
    parentLookupOrganizationId: string
  }): CancelablePromise<Role> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
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
    id: string
    parentLookupOrganizationId: string
    requestBody: Role
  }): CancelablePromise<Role> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
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
    id: string
    parentLookupOrganizationId: string
    requestBody?: PatchedRole
  }): CancelablePromise<Role> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
      path: {
        id: id,
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
  public rolesDestroy({
    id,
    parentLookupOrganizationId,
  }: {
    /**
     * A UUID string identifying this role.
     */
    id: string
    parentLookupOrganizationId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/organizations/{parent_lookup_organization_id}/roles/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
}
