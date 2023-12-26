/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PluginLogEntry = {
    id: string;
    team_id: number;
    plugin_id: number;
    plugin_config_id: number;
    timestamp: string;
    source: 'SYSTEM' | 'PLUGIN' | 'CONSOLE';
    type: 'DEBUG' | 'LOG' | 'INFO' | 'WARN' | 'ERROR';
    message: string;
    instance_id: string;
};

