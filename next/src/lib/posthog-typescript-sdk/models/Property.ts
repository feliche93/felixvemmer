/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PropertyItem } from './PropertyItem';

export type Property = {
    /**
     *
     * You can use a simplified version:
     * ```json
     * {
         * "properties": [
             * {
                 * "key": "email",
                 * "value": "x@y.com",
                 * "operator": "exact",
                 * "type": "event"
                 * }
                 * ]
                 * }
                 * ```
                 *
                 * Or you can create more complicated queries with AND and OR:
                 * ```json
                 * {
                     * "properties": {
                         * "type": "AND",
                         * "values": [
                             * {
                                 * "type": "OR",
                                 * "values": [
                                     * {"key": "email", ...},
                                     * {"key": "email", ...}
                                     * ]
                                     * },
                                     * {
                                         * "type": "AND",
                                         * "values": [
                                             * {"key": "email", ...},
                                             * {"key": "email", ...}
                                             * ]
                                             * }
                                             * ]
                                             * ]
                                             * }
                                             * ```
                                             *
                                             */
                                            type?: 'AND' | 'OR';
                                            values: Array<PropertyItem>;
                                        };

