/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

export type PatchedScheduledChange = {
    readonly id?: number;
    readonly team_id?: number;
    record_id?: string;
    model_name?: 'FeatureFlag';
    payload?: Record<string, any>;
    scheduled_at?: string;
    executed_at?: string | null;
    failure_reason?: string | null;
    readonly created_at?: string;
    readonly created_by?: UserBasic;
    readonly updated_at?: string;
};

