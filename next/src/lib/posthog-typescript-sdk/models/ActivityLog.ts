/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

export type ActivityLog = {
    readonly id: string;
    user: UserBasic;
    readonly unread: boolean;
    organization_id?: string | null;
    is_system?: boolean | null;
    activity: string;
    item_id?: string | null;
    scope: string;
    detail?: Record<string, any> | null;
    created_at?: string;
};

