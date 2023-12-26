/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MinimalPerson } from './MinimalPerson';

export type SessionRecording = {
    readonly id: string;
    readonly distinct_id: string | null;
    readonly viewed: string;
    readonly recording_duration: number;
    readonly active_seconds: number | null;
    readonly inactive_seconds: number | null;
    readonly start_time: string | null;
    readonly end_time: string | null;
    readonly click_count: number | null;
    readonly keypress_count: number | null;
    readonly mouse_activity_count: number | null;
    readonly console_log_count: number | null;
    readonly console_warn_count: number | null;
    readonly console_error_count: number | null;
    readonly start_url: string | null;
    person?: MinimalPerson;
    readonly storage: string;
};

