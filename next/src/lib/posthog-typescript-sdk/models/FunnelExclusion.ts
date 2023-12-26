/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Property } from './Property';

export type FunnelExclusion = {
    /**
     * Name of the event to filter on. For example `$pageview` or `user sign up`.
     */
    id: string;
    /**
     * Filter events by event property, person property, cohort, groups and more.
     */
    properties?: Property;
    funnel_from_step?: number;
    funnel_to_step?: number;
};

