/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class IncomePropositionWareOderDienstleistungService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all propositions
     * Cost in API Credits: 1
     * @returns any List of propositions
     * @throws ApiError
     */
    public getIncomePropositions({
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
            url: '/income/propositions',
            query: {
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_direction': orderDirection,
            },
        });
    }

    /**
     * Create a proposition
     * Cost in API Credits: 10
     * @returns any Proposition created
     * @throws ApiError
     */
    public postIncomePropositions({
        requestBody,
    }: {
        requestBody?: {
            name: string;
            description?: string | null;
            article_no: string;
            price?: string | null;
            proposition_type: 'service' | 'product' | 'ecommerce';
            time_unit: 'hour' | 'day';
            vat_rate: string;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/income/propositions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Proposition could not be created`,
            },
        });
    }

    /**
     * Retrieves a proposition
     * Cost in API Credits: 1
     * @returns any Show proposition
     * @throws ApiError
     */
    public getIncomePropositions1({
        id,
    }: {
        /**
         * The id of the proposition
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/income/propositions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified proposition was not found`,
            },
        });
    }

    /**
     * Update a proposition
     * Cost in API Credits: 1
     * @returns any Proposition updated
     * @throws ApiError
     */
    public putIncomePropositions({
        id,
        requestBody,
    }: {
        /**
         * The id of the proposition
         */
        id: string,
        requestBody?: {
            name?: string;
            description?: string | null;
            article_no?: string;
            price?: string | null;
            proposition_type?: 'service' | 'product' | 'ecommerce';
            time_unit?: 'hour' | 'day';
            vat_rate?: string;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/income/propositions/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `The specified proposition was not found`,
            },
        });
    }

    /**
     * Delete a proposition
     * Cost in API Credits: 1
     * @returns void
     * @throws ApiError
     */
    public deleteIncomePropositions({
        id,
    }: {
        /**
         * The id of the proposition
         */
        id: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/income/propositions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified proposition was not found`,
            },
        });
    }

    /**
     * Archive a proposition
     * Cost in API Credits: 1
     * @returns any Project archived
     * @throws ApiError
     */
    public postIncomePropositionsArchive({
        id,
    }: {
        /**
         * The id of the proposition
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/income/propositions/{id}/archive',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Unarchive a proposition
     * Cost in API Credits: 1
     * @returns any Project unarchived
     * @throws ApiError
     */
    public postIncomePropositionsUnarchive({
        id,
    }: {
        /**
         * The id of the proposition
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/income/propositions/{id}/unarchive',
            path: {
                'id': id,
            },
        });
    }

}
