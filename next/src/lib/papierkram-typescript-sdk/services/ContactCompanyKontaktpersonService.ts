/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ContactCompanyKontaktpersonService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all persons
     * Cost in API Credits: 1
     * @returns any List of persons of a company
     * @throws ApiError
     */
    public getContactCompaniesPersons({
        companyId,
        page,
        pageSize,
        orderBy,
        orderDirection,
    }: {
        /**
         * The id of the company
         */
        companyId: number,
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
            url: '/contact/companies/{company_id}/persons',
            path: {
                'company_id': companyId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_direction': orderDirection,
            },
        });
    }

    /**
     * Create a person
     * Cost in API Credits: 10
     * @returns any Person created
     * @throws ApiError
     */
    public postContactCompaniesPersons({
        companyId,
        requestBody,
    }: {
        /**
         * The id of the company
         */
        companyId: number,
        requestBody?: {
            title?: string | null;
            salutation?: string | null;
            first_name: string;
            last_name: string;
            position?: string | null;
            department?: string | null;
            phone?: string | null;
            skype?: string | null;
            fax?: string | null;
            email?: string | null;
            flagged?: string | null;
            mobile?: string | null;
            comment?: string | null;
            default?: string | null;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/contact/companies/{company_id}/persons',
            path: {
                'company_id': companyId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Person could not be created`,
            },
        });
    }

    /**
     * Retrieves a person
     * Cost in API Credits: 1
     * @returns any Show person
     * @throws ApiError
     */
    public getContactCompaniesPersons1({
        companyId,
        id,
    }: {
        /**
         * The id of the company
         */
        companyId: number,
        /**
         * The id of the person
         */
        id: number,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contact/companies/{company_id}/persons/{id}',
            path: {
                'company_id': companyId,
                'id': id,
            },
            errors: {
                404: `The specified person was not found`,
            },
        });
    }

    /**
     * Update a person
     * Cost in API Credits: 1
     * @returns any Person updated
     * @throws ApiError
     */
    public putContactCompaniesPersons({
        companyId,
        id,
        requestBody,
    }: {
        /**
         * The id of the company
         */
        companyId: number,
        /**
         * The id of the person
         */
        id: number,
        requestBody?: {
            title?: string | null;
            salutation?: string | null;
            first_name?: string;
            last_name?: string;
            position?: string | null;
            department?: string | null;
            phone?: string | null;
            skype?: string | null;
            fax?: string | null;
            email?: string | null;
            flagged?: string | null;
            mobile?: string | null;
            comment?: string | null;
            default?: string | null;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/contact/companies/{company_id}/persons/{id}',
            path: {
                'company_id': companyId,
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `The specified person was not found`,
            },
        });
    }

    /**
     * Delete a person
     * Cost in API Credits: 1
     * @returns void
     * @throws ApiError
     */
    public deleteContactCompaniesPersons({
        companyId,
        id,
    }: {
        /**
         * The id of the company
         */
        companyId: number,
        /**
         * The id of the person
         */
        id: number,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/contact/companies/{company_id}/persons/{id}',
            path: {
                'company_id': companyId,
                'id': id,
            },
            errors: {
                404: `The specified person was not found`,
            },
        });
    }

}
