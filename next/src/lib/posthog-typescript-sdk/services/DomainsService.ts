/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { OrganizationDomain } from '../models/OrganizationDomain'
import type { PaginatedOrganizationDomainList } from '../models/PaginatedOrganizationDomainList'
import type { PatchedOrganizationDomain } from '../models/PatchedOrganizationDomain'
export class DomainsService {
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
    parentLookupOrganizationId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedOrganizationDomainList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/domains/',
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
   * @returns OrganizationDomain
   * @throws ApiError
   */
  public domainsCreate({
    parentLookupOrganizationId,
    requestBody,
  }: {
    parentLookupOrganizationId: string
    requestBody: OrganizationDomain
  }): CancelablePromise<OrganizationDomain> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/domains/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
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
    id: string
    parentLookupOrganizationId: string
  }): CancelablePromise<OrganizationDomain> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
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
    id: string
    parentLookupOrganizationId: string
    requestBody: OrganizationDomain
  }): CancelablePromise<OrganizationDomain> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
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
    id: string
    parentLookupOrganizationId: string
    requestBody?: PatchedOrganizationDomain
  }): CancelablePromise<OrganizationDomain> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
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
  public domainsDestroy({
    id,
    parentLookupOrganizationId,
  }: {
    /**
     * A UUID string identifying this domain.
     */
    id: string
    parentLookupOrganizationId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
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
    id: string
    parentLookupOrganizationId: string
    requestBody: OrganizationDomain
  }): CancelablePromise<OrganizationDomain> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/domains/{id}/verify/',
      path: {
        id: id,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
