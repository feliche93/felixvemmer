/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GenericInsights } from './GenericInsights';

export type TrendResult = {
    /**
     * The requested counts.
     */
    data: Array<number>;
    /**
     * The dates corresponding to the data field above.
     */
    days: Array<string>;
    /**
     * The dates corresponding to the data field above.
     */
    labels: Array<string>;
    /**
     * The insight that's being returned.
     */
    filter: GenericInsights;
    /**
     * A label describing this result. Will include
     * - The event or action
     * - Breakdown value
     * - If `compare:true`, whether it's `current` or `previous`
     */
    label: string;
};

