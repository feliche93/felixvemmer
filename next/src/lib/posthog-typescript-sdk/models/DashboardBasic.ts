/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

/**
 * Serializer mixin that resolves appropriate response for tags depending on license.
 */
export type DashboardBasic = {
    readonly id: number;
    readonly name: string | null;
    readonly description: string;
    readonly pinned: boolean;
    readonly created_at: string;
    readonly created_by: UserBasic;
    readonly is_shared: boolean;
    readonly deleted: boolean;
    readonly creation_mode: 'default' | 'template' | 'duplicate';
    tags?: Array<any>;
    readonly restriction_level: 21 | 37;
    readonly effective_restriction_level: 21 | 37;
    readonly effective_privilege_level: 21 | 37;
};

