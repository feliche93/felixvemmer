/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Serializer for an BatchExportDestination model.
 */
export type BatchExportDestination = {
    /**
     * A choice of supported BatchExportDestination types.
     */
    type: 'S3' | 'Snowflake' | 'Postgres' | 'Redshift' | 'BigQuery' | 'NoOp';
    /**
     * A JSON field to store all configuration parameters required to access a BatchExportDestination.
     */
    config?: Record<string, any>;
};

