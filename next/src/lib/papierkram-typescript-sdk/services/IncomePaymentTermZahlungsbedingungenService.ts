/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class IncomePaymentTermZahlungsbedingungenService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all payment_terms
     * Cost in API Credits: 1
     * @returns any List of payment_terms
     * @throws ApiError
     */
    public getIncomePaymentTerms({
        page,
        pageSize,
        orderBy,
        orderDirection,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Page size (1-100)
         */
        pageSize?: number,
        /**
         * Order by field (must be used with order_direction)
         */
        orderBy?: string,
        /**
         * Order direction (must be used with order_by)
         */
        orderDirection?: Array<'asc' | 'desc'>,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/income/payment_terms',
            query: {
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_direction': orderDirection,
            },
        });
    }

    /**
     * Retrieves a payment term
     * Cost in API Credits: 1
     * @returns any Show payment_term
     * @throws ApiError
     */
    public getIncomePaymentTerms1({
        id,
    }: {
        /**
         * The id of the payment_term
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/income/payment_terms/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified payment_term was not found`,
            },
        });
    }

}
