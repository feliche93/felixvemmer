/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

export type PatchedSessionRecordingPlaylist = {
    readonly id?: number;
    readonly short_id?: string;
    name?: string | null;
    derived_name?: string | null;
    description?: string;
    pinned?: boolean;
    readonly created_at?: string;
    readonly created_by?: UserBasic;
    deleted?: boolean;
    filters?: Record<string, any>;
    readonly last_modified_at?: string;
    readonly last_modified_by?: UserBasic;
};

