/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnterprisePropertyDefinition } from '../models/EnterprisePropertyDefinition';
import type { PaginatedEnterprisePropertyDefinitionList } from '../models/PaginatedEnterprisePropertyDefinitionList';
import type { PatchedEnterprisePropertyDefinition } from '../models/PatchedEnterprisePropertyDefinition';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PropertyDefinitionsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedEnterprisePropertyDefinitionList
     * @throws ApiError
     */
    public propertyDefinitionsList({
        projectId,
        eventNames,
        excludedProperties,
        filterByEventNames,
        groupTypeIndex,
        isFeatureFlag,
        isNumerical,
        limit,
        offset,
        properties,
        search,
        type = 'event',
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        /**
         * If sent, response value will have `is_seen_on_filtered_events` populated. JSON-encoded
         */
        eventNames?: string,
        /**
         * JSON-encoded list of excluded properties
         */
        excludedProperties?: string,
        /**
         * Whether to return only properties for events in `event_names`
         */
        filterByEventNames?: boolean | null,
        /**
         * What group type is the property for. Only should be set if `type=group`
         */
        groupTypeIndex?: number,
        /**
         * Whether to return only (or excluding) feature flag properties
         */
        isFeatureFlag?: boolean | null,
        /**
         * Whether to return only (or excluding) numerical property definitions
         */
        isNumerical?: boolean | null,
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
        /**
         * Comma-separated list of properties to filter
         */
        properties?: string,
        /**
         * Searches properties by name
         */
        search?: string,
        /**
         * What property definitions to return
         */
        type?: 'event' | 'person' | 'group',
    }): CancelablePromise<PaginatedEnterprisePropertyDefinitionList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/property_definitions/',
            path: {
                'project_id': projectId,
            },
            query: {
                'event_names': eventNames,
                'excluded_properties': excludedProperties,
                'filter_by_event_names': filterByEventNames,
                'group_type_index': groupTypeIndex,
                'is_feature_flag': isFeatureFlag,
                'is_numerical': isNumerical,
                'limit': limit,
                'offset': offset,
                'properties': properties,
                'search': search,
                'type': type,
            },
        });
    }

    /**
     * @returns EnterprisePropertyDefinition
     * @throws ApiError
     */
    public propertyDefinitionsRetrieve({
        id,
        projectId,
    }: {
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<EnterprisePropertyDefinition> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/property_definitions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns EnterprisePropertyDefinition
     * @throws ApiError
     */
    public propertyDefinitionsUpdate({
        id,
        projectId,
        requestBody,
    }: {
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: EnterprisePropertyDefinition,
    }): CancelablePromise<EnterprisePropertyDefinition> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/property_definitions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns EnterprisePropertyDefinition
     * @throws ApiError
     */
    public propertyDefinitionsPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedEnterprisePropertyDefinition,
    }): CancelablePromise<EnterprisePropertyDefinition> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/property_definitions/{id}/',
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
    public propertyDefinitionsDestroy({
        id,
        projectId,
    }: {
        id: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/property_definitions/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * Allows a caller to provide a list of event names and a single property name
     * Returns a map of the event names to a boolean representing whether that property has ever been seen with that event_name
     * @returns EnterprisePropertyDefinition
     * @throws ApiError
     */
    public propertyDefinitionsSeenTogetherRetrieve({
        projectId,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<EnterprisePropertyDefinition> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/property_definitions/seen_together/',
            path: {
                'project_id': projectId,
            },
        });
    }

}
