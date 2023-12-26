/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrganizationResourceAccess = {
    readonly id: number;
    resource: 'feature flags' | 'experiments' | 'cohorts' | 'data management' | 'session recordings' | 'insights' | 'dashboards';
    access_level?: 21 | 37;
    readonly organization: string;
    readonly created_at: string;
    readonly updated_at: string;
    readonly created_by: number | null;
};

