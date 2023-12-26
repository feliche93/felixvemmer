/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

/**
 * Serializer mixin that resolves appropriate response for tags depending on license.
 */
export type FeatureFlag = {
    readonly id: number;
    /**
     * contains the description for the flag (field name `name` is kept for backwards-compatibility)
     */
    name?: string;
    key: string;
    filters?: Record<string, any>;
    deleted?: boolean;
    active?: boolean;
    readonly created_by: UserBasic;
    created_at?: string;
    readonly is_simple_flag: boolean;
    readonly rollout_percentage: number | null;
    ensure_experience_continuity?: boolean | null;
    readonly experiment_set: Array<number>;
    readonly surveys: Record<string, any>;
    readonly features: Record<string, any>;
    rollback_conditions?: Record<string, any> | null;
    performed_rollback?: boolean | null;
    readonly can_edit: boolean;
    tags?: Array<any>;
    readonly usage_dashboard: number;
    analytics_dashboards?: Array<number>;
    has_enriched_analytics?: boolean | null;
};

