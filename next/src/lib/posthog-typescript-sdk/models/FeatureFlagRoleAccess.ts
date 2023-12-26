/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FeatureFlag } from './FeatureFlag';
import type { Role } from './Role';

export type FeatureFlagRoleAccess = {
    readonly id: number;
    readonly feature_flag: FeatureFlag;
    readonly role: Role;
    role_id: string;
    readonly added_at: string;
    readonly updated_at: string;
};

