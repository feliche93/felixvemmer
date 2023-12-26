/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FunnelStepsResult = {
    /**
     * Number of people in this step.
     */
    count: number;
    /**
     * Corresponds to the `id` of the entities passed through to `events` or `actions`.
     */
    action_id: string;
    /**
     * Average conversion time of person or groups between steps. `null` for the first step.
     */
    average_conversion_time: number;
    /**
     * Median conversion time of person or groups between steps. `null` for the first step.
     */
    median_conversion_time: number;
    /**
     * Path of a URL to get a list of people that converted after this step. In this format: `/api/person/funnel?...`
     */
    converted_people_url: string;
    /**
     * Path of a URL to get a list of people that dropped after this step. In this format: `/api/person/funnel?...`
     */
    dropped_people_url: string;
    /**
     * Order of this step in the funnel. The API should return the steps in order anyway.
     */
    order: string;
};

