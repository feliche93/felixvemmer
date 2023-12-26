/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Team } from '../models/Team';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class IsGeneratingDemoDataService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Projects for the current organization.
     * @returns Team
     * @throws ApiError
     */
    public isGeneratingDemoDataRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this team.
         */
        id: number,
    }): CancelablePromise<Team> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{id}/is_generating_demo_data/',
            path: {
                'id': id,
            },
        });
    }

}
