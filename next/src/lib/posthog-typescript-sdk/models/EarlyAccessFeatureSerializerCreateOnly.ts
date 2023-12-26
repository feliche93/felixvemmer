/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MinimalFeatureFlag } from './MinimalFeatureFlag';

export type EarlyAccessFeatureSerializerCreateOnly = {
    readonly id: string;
    name: string;
    description?: string;
    stage: 'draft' | 'concept' | 'alpha' | 'beta' | 'general-availability' | 'archived';
    documentation_url?: string;
    readonly created_at: string;
    feature_flag_id?: number;
    readonly feature_flag: MinimalFeatureFlag;
};

