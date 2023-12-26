/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BatchExportDestination } from './BatchExportDestination';
import type { BatchExportRun } from './BatchExportRun';

/**
 * Serializer for a BatchExport model.
 */
export type BatchExport = {
    readonly id: string;
    /**
     * A human-readable name for this BatchExport.
     */
    name: string;
    destination: BatchExportDestination;
    interval: 'hour' | 'day' | 'week' | 'every 5 minutes';
    /**
     * Whether this BatchExport is paused or not.
     */
    paused?: boolean;
    /**
     * The timestamp at which this BatchExport was created.
     */
    readonly created_at: string;
    /**
     * The timestamp at which this BatchExport was last updated.
     */
    readonly last_updated_at: string;
    /**
     * The timestamp at which this BatchExport was last paused.
     */
    last_paused_at?: string | null;
    /**
     * Time before which any Batch Export runs won't be triggered.
     */
    start_at?: string | null;
    /**
     * Time after which any Batch Export runs won't be triggered.
     */
    end_at?: string | null;
    readonly latest_runs: Array<BatchExportRun>;
};

