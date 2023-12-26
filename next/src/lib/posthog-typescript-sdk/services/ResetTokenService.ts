/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedTeam } from '../models/PatchedTeam';
import type { Team } from '../models/Team';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ResetTokenService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Projects for the current organization.
     * @returns Team
     * @throws ApiError
     */
    public resetTokenPartialUpdate({
        id,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this team.
         */
        id: number,
        requestBody?: PatchedTeam,
    }): CancelablePromise<Team> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/projects/{id}/reset_token/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
