/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBasic } from './UserBasic';

/**
 * Serializer mixin that resolves appropriate response for tags depending on license.
 */
export type EnterprisePropertyDefinition = {
    readonly id: string;
    readonly name: string;
    description?: string | null;
    tags?: Array<any>;
    readonly is_numerical: boolean;
    readonly updated_at: string;
    readonly updated_by: UserBasic;
    readonly is_seen_on_filtered_events: string;
    property_type?: 'DateTime' | 'String' | 'Numeric' | 'Boolean' | '' | null;
    verified?: boolean;
    readonly verified_at: string | null;
    readonly verified_by: UserBasic;
};

