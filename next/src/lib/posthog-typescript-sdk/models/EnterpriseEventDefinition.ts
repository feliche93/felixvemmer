/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

/**
 * Serializer mixin that resolves appropriate response for tags depending on license.
 */
export type EnterpriseEventDefinition = {
    readonly id: string;
    readonly name: string;
    owner?: number | null;
    description?: string | null;
    tags?: Array<any>;
    readonly created_at: string | null;
    readonly updated_at: string;
    readonly updated_by: UserBasic;
    readonly last_seen_at: string | null;
    readonly last_updated_at: string;
    verified?: boolean;
    readonly verified_at: string | null;
    readonly verified_by: UserBasic;
    readonly is_action: string;
    readonly action_id: number;
    readonly is_calculating: boolean;
    readonly last_calculated_at: string;
    readonly created_by: UserBasic;
    post_to_slack?: boolean;
};

