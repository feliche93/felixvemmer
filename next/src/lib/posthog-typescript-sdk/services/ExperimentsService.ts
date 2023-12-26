/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Experiment } from '../models/Experiment';
import type { PaginatedExperimentList } from '../models/PaginatedExperimentList';
import type { PatchedExperiment } from '../models/PatchedExperiment';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ExperimentsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns PaginatedExperimentList
     * @throws ApiError
     */
    public experimentsList({
        projectId,
        limit,
        offset,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
    }): CancelablePromise<PaginatedExperimentList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/experiments/',
            path: {
                'project_id': projectId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns Experiment
     * @throws ApiError
     */
    public experimentsCreate({
        projectId,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: Experiment,
    }): CancelablePromise<Experiment> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/experiments/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Experiment
     * @throws ApiError
     */
    public experimentsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this experiment.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Experiment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/experiments/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns Experiment
     * @throws ApiError
     */
    public experimentsUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this experiment.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody: Experiment,
    }): CancelablePromise<Experiment> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/projects/{project_id}/experiments/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Experiment
     * @throws ApiError
     */
    public experimentsPartialUpdate({
        id,
        projectId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this experiment.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        requestBody?: PatchedExperiment,
    }): CancelablePromise<Experiment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{project_id}/experiments/{id}/',
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
    public experimentsDestroy({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this experiment.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/projects/{project_id}/experiments/{id}/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns Experiment
     * @throws ApiError
     */
    public experimentsResultsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this experiment.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Experiment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/experiments/{id}/results/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns Experiment
     * @throws ApiError
     */
    public experimentsSecondaryResultsRetrieve({
        id,
        projectId,
    }: {
        /**
         * A unique integer value identifying this experiment.
         */
        id: number,
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Experiment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/experiments/{id}/secondary_results/',
            path: {
                'id': id,
                'project_id': projectId,
            },
        });
    }

    /**
     * @returns Experiment
     * @throws ApiError
     */
    public experimentsRequiresFlagImplementationRetrieve({
        projectId,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<Experiment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/experiments/requires_flag_implementation/',
            path: {
                'project_id': projectId,
            },
        });
    }

}
