/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

export type ExplicitTeamMember = {
    readonly id: string;
    level?: 1 | 8;
    readonly parent_level: number;
    readonly parent_membership_id: string;
    readonly joined_at: string;
    readonly updated_at: string;
    readonly user: UserBasic;
    user_uuid: string;
    readonly effective_level: 1 | 8 | 15;
};

