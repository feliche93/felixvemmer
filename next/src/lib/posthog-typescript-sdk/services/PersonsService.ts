/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedPersonList } from '../models/PaginatedPersonList';
import type { PatchedPerson } from '../models/PatchedPerson';
import type { Person } from '../models/Person';
import type { Property } from '../models/Property';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PersonsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns PaginatedPersonList
     * @throws ApiError
     */
    public personsList({
        projectId,
        distinctId,
        email,
        format,
        limit,
        offset,
        properties,
        search,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        /**
         * Filter list by distinct id.
         */
        distinctId?: string,
        /**
         * Filter persons by email (exact match)
         */
        email?: string,
        format?: 'csv' | 'json',
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
        /**
         * Filter Persons by person properties.
         */
        properties?: Array<Property>,
        /**
         * Search persons, either by email (full text search) or distinct_id (exact match).
         */
        search?: string,
    }): CancelablePromise<PaginatedPersonList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/',
            path: {
                'project_id': projectId,
            },
            query: {
                'distinct_id': distinctId,
                'email': email,
                'format': format,
                'limit': limit,
                'offset': offset,
                'properties': properties,
                'search': search,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsRetrieve({
        id,
        projectId,
        format,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * Only for setting properties on the person. "properties" from the request data will be updated via a "$set" event.
     * This means that only the properties listed will be updated, but other properties won't be removed nor updated.
     * If you would like to remove a property use the `delete_property` endpoint.
     * @returns Person
     * @throws ApiError
     */
    public personsUpdate({
        id,
        projectId,
        format,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/persons/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsPartialUpdate({
        id,
        projectId,
        format,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: PatchedPerson,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/persons/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns void
     * @throws ApiError
     */
    public personsDestroy({
        id,
        projectId,
        deleteEvents = false,
        format,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        /**
         * If true, a task to delete all events associated with this person will be created and queued. The task does not run immediately and instead is batched together and at 5AM UTC every Sunday (controlled by environment variable CLEAR_CLICKHOUSE_REMOVED_DATA_SCHEDULE_CRON)
         */
        deleteEvents?: boolean,
        format?: 'csv' | 'json',
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/persons/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'delete_events': deleteEvents,
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsActivityRetrieve2({
        id,
        projectId,
        format,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/{id}/activity/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsDeletePropertyCreate({
        unset,
        id,
        projectId,
        format,
        requestBody,
    }: {
        /**
         * Specify the property key to delete
         */
        unset: string,
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/persons/{id}/delete_property/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                '$unset': unset,
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsPropertiesTimelineRetrieve({
        id,
        projectId,
        format,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/{id}/properties_timeline/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsSplitCreate({
        id,
        projectId,
        format,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/persons/{id}/split/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsUpdatePropertyCreate({
        id,
        key,
        projectId,
        value,
        format,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this person.
         */
        id: number,
        /**
         * Specify the property key
         */
        key: string,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        /**
         * Specify the property value
         */
        value: any,
        format?: 'csv' | 'json',
        requestBody?: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/persons/{id}/update_property/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            query: {
                'format': format,
                'key': key,
                'value': value,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsActivityRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/activity/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsCohortsRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/cohorts/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsFunnelRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/funnel/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsFunnelCreate({
        projectId,
        format,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/persons/funnel/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsFunnelCorrelationRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/funnel/correlation/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsFunnelCorrelationCreate({
        projectId,
        format,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/persons/funnel/correlation/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsLifecycleRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/lifecycle/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsPathRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/path/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsPathCreate({
        projectId,
        format,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/persons/path/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsRetentionRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/retention/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsStickinessRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/stickiness/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsTrendsRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/trends/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

    /**
     * To create or update persons, use a PostHog library of your choice and [use an identify call](/docs/integrate/identifying-users). This API endpoint is only for reading and deleting.
     * @returns Person
     * @throws ApiError
     */
    public personsValuesRetrieve({
        projectId,
        format,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/persons/values/',
            path: {
                'project_id': projectId,
            },
            query: {
                'format': format,
            },
        });
    }

}
