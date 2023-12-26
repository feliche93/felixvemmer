/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BankingTransactionKontoumsatzService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all banking transactions
     * Cost in API Credits: 1
     * @returns any List of banking transactions
     * @throws ApiError
     */
    public getBankingTransactions({
        page,
        pageSize,
        orderBy,
        orderDirection,
        bankConnectionId,
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
        /**
         * Filter by bank connection id
         */
        bankConnectionId?: number,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/transactions',
            query: {
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_direction': orderDirection,
                'bank_connection_id': bankConnectionId,
            },
        });
    }

    /**
     * Retrieves a banking transaction
     * Cost in API Credits: 1
     * @returns any Show person
     * @throws ApiError
     */
    public getBankingTransactions1({
        id,
    }: {
        /**
         * The id of the transaction
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/transactions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified transaction was not found`,
            },
        });
    }

}
