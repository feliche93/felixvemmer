/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ContactCompanyUnternehmenService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all companies
     * Cost in API Credits: 1
     * @returns any List of companies
     * @throws ApiError
     */
    public getContactCompanies({
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
            url: '/contact/companies',
            query: {
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_direction': orderDirection,
            },
        });
    }

    /**
     * Create a company
     * Cost in API Credits: 10
     * @returns any Company created
     * @throws ApiError
     */
    public postContactCompanies({
        requestBody,
    }: {
        requestBody?: {
            name: string;
            contact_type: 'customer' | 'supplier' | null;
            phone?: string | null;
            fax?: string | null;
            email?: string | null;
            website?: string | null;
            twitter?: string | null;
            ust_idnr?: string | null;
            delivery_method?: 'pdf' | 'email' | null;
            postal_street?: string | null;
            postal_zip?: string | null;
            postal_city?: string | null;
            postal_country?: string | null;
            physical_street?: string | null;
            physical_zip?: string | null;
            physical_city?: string | null;
            physical_country?: string | null;
            bank_account_no?: string | null;
            bank_blz?: string | null;
            bank_institute?: string | null;
            bank_bic?: string | null;
            bank_iban?: string | null;
            notes?: string | null;
            color?: string | null;
            people?: Array<{
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
            }> | null;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/contact/companies',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Company could not be created`,
            },
        });
    }

    /**
     * Retrieves a company
     * Cost in API Credits: 1
     * @returns any Show company
     * @throws ApiError
     */
    public getContactCompanies1({
        id,
    }: {
        /**
         * The id of the company
         */
        id: number,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contact/companies/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified company was not found`,
            },
        });
    }

    /**
     * Update a company
     * Cost in API Credits: 1
     * @returns any Company updated
     * @throws ApiError
     */
    public putContactCompanies({
        id,
        requestBody,
    }: {
        /**
         * The id of the company
         */
        id: number,
        requestBody?: {
            name?: string;
            contact_type?: 'customer' | 'supplier' | null;
            phone?: string | null;
            fax?: string | null;
            email?: string | null;
            website?: string | null;
            twitter?: string | null;
            ust_idnr?: string | null;
            delivery_method?: 'pdf' | 'email' | null;
            postal_street?: string | null;
            postal_zip?: string | null;
            postal_city?: string | null;
            postal_country?: string | null;
            physical_street?: string | null;
            physical_zip?: string | null;
            physical_city?: string | null;
            physical_country?: string | null;
            bank_account_no?: string | null;
            bank_blz?: string | null;
            bank_institute?: string | null;
            bank_bic?: string | null;
            bank_iban?: string | null;
            notes?: string | null;
            color?: string | null;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/contact/companies/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `The specified company was not found`,
            },
        });
    }

    /**
     * Delete a company
     * Cost in API Credits: 1
     * @returns void
     * @throws ApiError
     */
    public deleteContactCompanies({
        id,
    }: {
        /**
         * The id of the company
         */
        id: number,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/contact/companies/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `The specified company was not found`,
            },
        });
    }

    /**
     * Archive a company
     * Cost in API Credits: 1
     * @returns any Company archived
     * @throws ApiError
     */
    public postContactCompaniesArchive({
        id,
    }: {
        /**
         * The id of the company
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/contact/companies/{id}/archive',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Unarchive a company
     * Cost in API Credits: 1
     * @returns any Company unarchived
     * @throws ApiError
     */
    public postContactCompaniesUnarchive({
        id,
    }: {
        /**
         * The id of the company
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/contact/companies/{id}/unarchive',
            path: {
                'id': id,
            },
        });
    }

}
