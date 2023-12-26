/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DataManagementService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns any No response body
     * @throws ApiError
     */
    public dataManagementActivityRetrieve({
        projectId,
    }: {
        /**
         * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
         */
        projectId: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/{project_id}/data_management/activity/',
            path: {
                'project_id': projectId,
            },
        });
    }

}
