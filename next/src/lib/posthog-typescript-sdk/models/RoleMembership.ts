/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

export type RoleMembership = {
    readonly id: string;
    readonly role_id: string;
    readonly user: UserBasic;
    readonly joined_at: string;
    readonly updated_at: string;
    user_uuid: string;
};

