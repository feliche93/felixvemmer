/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MinimalFeatureFlag } from './MinimalFeatureFlag';
import type { UserBasic } from './UserBasic';

export type PatchedExperiment = {
    readonly id?: number;
    name?: string;
    description?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    feature_flag_key?: string;
    readonly feature_flag?: MinimalFeatureFlag;
    parameters?: Record<string, any> | null;
    secondary_metrics?: Record<string, any> | null;
    filters?: Record<string, any>;
    archived?: boolean;
    readonly created_by?: UserBasic;
    readonly created_at?: string;
    readonly updated_at?: string;
};

