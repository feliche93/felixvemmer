/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BankingBankConnectionBankverbindungService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all banking bank_connections
     * Cost in API Credits: 1
     * @returns any List of banking bank_connections
     * @throws ApiError
     */
    public getBankingBankConnections({
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
            url: '/banking/bank_connections',
            query: {
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_direction': orderDirection,
            },
        });
    }

    /**
     * Retrieves a banking bank_connection
     * Cost in API Credits: 1
     * @returns any Show person
     * @throws ApiError
     */
    public getBankingBankConnections1({
        id,
    }: {
        /**
         * The id of the bank_connection
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/bank_connections/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified bank_connection was not found`,
            },
        });
    }

}
