/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { FeatureFlag } from '../models/FeatureFlag'
import type { FeatureFlagRoleAccess } from '../models/FeatureFlagRoleAccess'
import type { PaginatedFeatureFlagList } from '../models/PaginatedFeatureFlagList'
import type { PaginatedFeatureFlagRoleAccessList } from '../models/PaginatedFeatureFlagRoleAccessList'
import type { PatchedFeatureFlag } from '../models/PatchedFeatureFlag'
export class FeatureFlagsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Retrieves all feature flags for a given organization and key.
   * @returns any No response body
   * @throws ApiError
   */
  public featureFlagsRetrieve({
    featureFlagKey,
    parentLookupOrganizationId,
  }: {
    featureFlagKey: string
    parentLookupOrganizationId: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/organizations/{parent_lookup_organization_id}/feature_flags/{feature_flag_key}/',
      path: {
        feature_flag_key: featureFlagKey,
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * Retrieves all feature flags for a given organization and key.
   * @returns any No response body
   * @throws ApiError
   */
  public featureFlagsCopyFlagsCreate({
    parentLookupOrganizationId,
  }: {
    parentLookupOrganizationId: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/organizations/{parent_lookup_organization_id}/feature_flags/copy_flags/',
      path: {
        parent_lookup_organization_id: parentLookupOrganizationId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns PaginatedFeatureFlagList
   * @throws ApiError
   */
  public featureFlagsList({
    projectId,
    limit,
    offset,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedFeatureFlagList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/',
      path: {
        project_id: projectId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: FeatureFlag
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/feature_flags/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns PaginatedFeatureFlagRoleAccessList
   * @throws ApiError
   */
  public featureFlagsRoleAccessList({
    parentLookupFeatureFlagId,
    projectId,
    limit,
    offset,
  }: {
    parentLookupFeatureFlagId: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedFeatureFlagRoleAccessList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/{parent_lookup_feature_flag_id}/role_access/',
      path: {
        parent_lookup_feature_flag_id: parentLookupFeatureFlagId,
        project_id: projectId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    })
  }
  /**
   * @returns FeatureFlagRoleAccess
   * @throws ApiError
   */
  public featureFlagsRoleAccessCreate({
    parentLookupFeatureFlagId,
    projectId,
    requestBody,
  }: {
    parentLookupFeatureFlagId: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: FeatureFlagRoleAccess
  }): CancelablePromise<FeatureFlagRoleAccess> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/feature_flags/{parent_lookup_feature_flag_id}/role_access/',
      path: {
        parent_lookup_feature_flag_id: parentLookupFeatureFlagId,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns FeatureFlagRoleAccess
   * @throws ApiError
   */
  public featureFlagsRoleAccessRetrieve({
    id,
    parentLookupFeatureFlagId,
    projectId,
  }: {
    /**
     * A unique integer value identifying this feature flag role access.
     */
    id: number
    parentLookupFeatureFlagId: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<FeatureFlagRoleAccess> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/{parent_lookup_feature_flag_id}/role_access/{id}/',
      path: {
        id: id,
        parent_lookup_feature_flag_id: parentLookupFeatureFlagId,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public featureFlagsRoleAccessDestroy({
    id,
    parentLookupFeatureFlagId,
    projectId,
  }: {
    /**
     * A unique integer value identifying this feature flag role access.
     */
    id: number
    parentLookupFeatureFlagId: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/feature_flags/{parent_lookup_feature_flag_id}/role_access/{id}/',
      path: {
        id: id,
        parent_lookup_feature_flag_id: parentLookupFeatureFlagId,
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsRetrieve2({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: FeatureFlag
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/feature_flags/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedFeatureFlag
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/feature_flags/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
   * @returns void
   * @throws ApiError
   */
  public featureFlagsDestroy({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/feature_flags/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      errors: {
        405: `No response body`,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsActivityRetrieve2({
    id,
    projectId,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/{id}/activity/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsCreateStaticCohortForFlagCreate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: FeatureFlag
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/feature_flags/{id}/create_static_cohort_for_flag/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsDashboardCreate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: FeatureFlag
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/feature_flags/{id}/dashboard/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsEnrichUsageDashboardCreate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this feature flag.
     */
    id: number
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: FeatureFlag
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/feature_flags/{id}/enrich_usage_dashboard/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsActivityRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/activity/',
      path: {
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsEvaluationReasonsRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/evaluation_reasons/',
      path: {
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsLocalEvaluationRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/local_evaluation/',
      path: {
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsMyFlagsRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/feature_flags/my_flags/',
      path: {
        project_id: projectId,
      },
    })
  }
  /**
   * Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/user-guides/feature-flags) for more information on feature flags.
   *
   * If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
   * @returns FeatureFlag
   * @throws ApiError
   */
  public featureFlagsUserBlastRadiusCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: FeatureFlag
  }): CancelablePromise<FeatureFlag> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/feature_flags/user_blast_radius/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
