/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MinimalFeatureFlag } from './MinimalFeatureFlag';
import type { UserBasic } from './UserBasic';

export type SurveySerializerCreateUpdateOnly = {
    readonly id: string;
    name: string;
    description?: string;
    type: 'popover' | 'widget' | 'button' | 'email' | 'full_screen' | 'api';
    readonly linked_flag: MinimalFeatureFlag;
    linked_flag_id?: number | null;
    targeting_flag_id?: number;
    readonly targeting_flag: MinimalFeatureFlag;
    targeting_flag_filters?: Record<string, any> | null;
    remove_targeting_flag?: boolean | null;
    questions?: Record<string, any> | null;
    conditions?: Record<string, any> | null;
    appearance?: Record<string, any> | null;
    readonly created_at: string;
    readonly created_by: UserBasic;
    start_date?: string | null;
    end_date?: string | null;
    archived?: boolean;
};

