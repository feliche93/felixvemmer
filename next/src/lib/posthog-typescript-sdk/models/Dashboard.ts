/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

/**
 * Serializer mixin that resolves appropriate response for tags depending on license.
 */
export type Dashboard = {
    readonly id: number;
    name?: string | null;
    description?: string;
    pinned?: boolean;
    readonly created_at: string;
    readonly created_by: UserBasic;
    readonly is_shared: boolean;
    deleted?: boolean;
    readonly creation_mode: 'default' | 'template' | 'duplicate';
    use_template?: string;
    use_dashboard?: number | null;
    delete_insights?: boolean;
    filters?: Record<string, any>;
    tags?: Array<any>;
    readonly tiles: string;
    restriction_level?: 21 | 37;
    readonly effective_restriction_level: 21 | 37;
    readonly effective_privilege_level: 21 | 37;
};

