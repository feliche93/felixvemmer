/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PropertyItem = {
    /**
     * Key of the property you're filtering on. For example `email` or `$current_url`
     */
    key: string;
    /**
     * Value of your filter. For example `test@example.com` or `https://example.com/test/`. Can be an array for an OR query, like `["test@example.com","ok@example.com"]`
     */
    value: string;
    operator?: 'exact' | 'is_not' | 'icontains' | 'not_icontains' | 'regex' | 'not_regex' | 'gt' | 'lt' | 'gte' | 'lte' | 'is_set' | 'is_not_set' | 'is_date_exact' | 'is_date_after' | 'is_date_before' | 'is_relative_date_after' | 'is_relative_date_before' | '' | null;
    type?: 'event' | 'person' | 'cohort' | 'element' | 'static-cohort' | 'precalculated-cohort' | 'group' | 'recording' | 'behavioral' | 'session' | 'hogql' | '';
};

