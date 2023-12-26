/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Trend } from '../models/Trend';
import type { TrendResults } from '../models/TrendResults';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TrendService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns TrendResults
     * @throws ApiError
     */
    public trends({
        projectId,
        format,
        requestBody,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
        format?: 'csv' | 'json',
        requestBody?: Trend,
    }): CancelablePromise<TrendResults> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/{project_id}/insights/trend/',
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

}
