/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

export type PatchedAnnotation = {
    readonly id?: number;
    content?: string | null;
    date_marker?: string | null;
    creation_type?: 'USR' | 'GIT';
    dashboard_item?: number | null;
    readonly insight_short_id?: string | null;
    readonly insight_name?: string | null;
    readonly created_by?: UserBasic;
    readonly created_at?: string | null;
    readonly updated_at?: string;
    deleted?: boolean;
    scope?: 'dashboard_item' | 'project' | 'organization';
};

