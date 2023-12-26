/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BatchExportLogEntry = {
    team_id: number;
    batch_export_id: string;
    run_id: string;
    timestamp: string;
    level: 'DEBUG' | 'LOG' | 'INFO' | 'WARNING' | 'ERROR';
    message: string;
};

