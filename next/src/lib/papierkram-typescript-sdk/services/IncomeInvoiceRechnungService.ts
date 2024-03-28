/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class IncomeInvoiceRechnungService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List all invoices
   * Cost in API Credits: 1
   * @returns any List of invoices
   * @throws ApiError
   */
  public getIncomeInvoices({
    page,
    pageSize,
    orderBy,
    orderDirection,
    companyId,
    projectId,
    documentDateRangeStart,
    documentDateRangeEnd,
  }: {
    /**
     * Page number
     */
    page?: number
    /**
     * Page size (1-100)
     */
    pageSize?: number
    /**
     * Order by field (must be used with order_direction)
     */
    orderBy?: string
    /**
     * Order direction (must be used with order_by)
     */
    orderDirection?: Array<'asc' | 'desc'>
    /**
     * Filter by company id
     */
    companyId?: number
    /**
     * Filter by project id
     */
    projectId?: number
    /**
     * Filter by document date. Beginning of date range.
     */
    documentDateRangeStart?: string
    /**
     * Filter by document date. End of date range.
     */
    documentDateRangeEnd?: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/income/invoices',
      query: {
        page: page,
        page_size: pageSize,
        order_by: orderBy,
        order_direction: orderDirection,
        company_id: companyId,
        project_id: projectId,
        document_date_range_start: documentDateRangeStart,
        document_date_range_end: documentDateRangeEnd,
      },
    })
  }

  /**
   * Create an invoice
   * Cost in API Credits: 50
   * @returns any Invoice created
   * @throws ApiError
   */
  public postIncomeInvoices({
    requestBody,
  }: {
    requestBody?: {
      name: string
      description?: string | null
      flagged?: boolean | null
      document_date?: string | null
      supply_date?: string | null
      customer?: {
        id?: number
        contact_person?: {
          id?: number
        }
        project?: {
          id?: number
        }
      }
      custom_template?: {
        id?: number
      }
      billing?: {
        company?: string | null
        department?: string | null
        contact_person?: string | null
        street?: string | null
        zip?: string | null
        city?: string | null
        country?: string | null
        ust_idnr?: string | null
        email?: string | null
      } | null
      payment_term: {
        id?: number
      }
      line_items: Array<{
        proposition?: {
          id?: number
        }
        name?: string
        description?: string
        quantity?: number
        unit?: string
        vat_rate?: string
        price?: number
        start_new_item_group?: boolean | null
      }> | null
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/invoices',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Invoice could not be created`,
      },
    })
  }

  /**
   * Retrieves an invoice
   * Cost in API Credits: 1
   * @returns any Show invoice
   * @throws ApiError
   */
  public getIncomeInvoices1({
    id,
  }: {
    /**
     * The id of the invoice
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/income/invoices/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified invoice was not found`,
      },
    })
  }

  /**
   * Update an invoice
   * Cost in API Credits: 1
   * @returns any Invoice updated
   * @throws ApiError
   */
  public putIncomeInvoices({
    id,
    requestBody,
  }: {
    /**
     * The id of the invoice
     */
    id: string
    requestBody?: {
      name?: string | null
      description?: string | null
      flagged?: boolean | null
      document_date?: string | null
      supply_date?: string | null
      customer?: {
        id?: number
        contact_person?: {
          id?: number
        }
        project?: {
          id?: number
        }
      } | null
      custom_template?: {
        id?: number
      }
      billing?: {
        company?: string | null
        department?: string | null
        contact_person?: string | null
        street?: string | null
        zip?: string | null
        city?: string | null
        country?: string | null
        ust_idnr?: string | null
        email?: string | null
      } | null
      payment_term?: {
        id?: number
      }
      line_items?: Array<{
        proposition?: {
          id?: number
        }
        name?: string
        description?: string
        quantity?: number
        unit?: string
        vat_rate?: string
        price?: number
        start_new_item_group?: boolean | null
      }> | null
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/income/invoices/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `The specified invoice was not found`,
        422: `The specified invoice cannot be edited anymore`,
      },
    })
  }

  /**
   * Delete an invoice
   * Cost in API Credits: 1
   * @returns void
   * @throws ApiError
   */
  public deleteIncomeInvoices({
    id,
  }: {
    /**
     * The id of the invoice
     */
    id: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/income/invoices/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified invoice was not found`,
      },
    })
  }

  /**
   * Archive an invoice
   * Cost in API Credits: 1
   * @returns any Invoice archived
   * @throws ApiError
   */
  public postIncomeInvoicesArchive({
    id,
  }: {
    /**
     * The id of the invoice
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/invoices/{id}/archive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Unarchive an invoice
   * Cost in API Credits: 1
   * @returns any Invoice unarchived
   * @throws ApiError
   */
  public postIncomeInvoicesUnarchive({
    id,
  }: {
    /**
     * The id of the invoice
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/invoices/{id}/unarchive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Cancel an invoice
   * Cost in API Credits: 1
   * @returns any Invoice canceled
   * @throws ApiError
   */
  public postIncomeInvoicesCancel({
    id,
  }: {
    /**
     * The id of the invoice
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/invoices/{id}/cancel',
      path: {
        id: id,
      },
      errors: {
        422: `The specified invoice cannot be canceled`,
      },
    })
  }

  /**
   * Deliver an invoice
   * Cost in API Credits: 1
   * @returns any Delivery successful
   * @throws ApiError
   */
  public postIncomeInvoicesDeliver({
    id,
    requestBody,
  }: {
    /**
     * The id of the invoice
     */
    id: string
    requestBody?: {
      send_via: 'email' | 'pdf' | null
      email?: {
        recipient: string
        subject: string
        body: string
      }
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/invoices/{id}/deliver',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Invalid templates`,
      },
    })
  }

  /**
   * Retrieves an invoice as a PDF
   * @returns any Return pdf
   * @throws ApiError
   */
  public getIncomeInvoicesPdf({
    id,
  }: {
    /**
     * The id of the invoice
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/income/invoices/{id}/pdf',
      path: {
        id: id,
      },
    })
  }
}
