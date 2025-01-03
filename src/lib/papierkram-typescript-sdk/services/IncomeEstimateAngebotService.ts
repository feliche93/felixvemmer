/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class IncomeEstimateAngebotService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List all estimates
   * Cost in API Credits: 1
   * @returns any List of estimates
   * @throws ApiError
   */
  public getIncomeEstimates({
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
      url: '/income/estimates',
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
   * Create an estimate
   * Cost in API Credits: 50
   * @returns any Estimate created
   * @throws ApiError
   */
  public postIncomeEstimates({
    requestBody,
  }: {
    requestBody?: {
      name: string
      description?: string | null
      flagged?: boolean | null
      document_date?: string | null
      sent_on?: string | null
      sent_to?: string | null
      inbound_address?: string | null
      greetings_text?: string | null
      thanks_text?: string | null
      reminder_date?: string | null
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
      url: '/income/estimates',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Estimate could not be created`,
      },
    })
  }

  /**
   * Retrieves an estimate
   * Cost in API Credits: 1
   * @returns any Show estimate
   * @throws ApiError
   */
  public getIncomeEstimates1({
    id,
  }: {
    /**
     * The id of the estimate
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/income/estimates/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified estimate was not found`,
      },
    })
  }

  /**
   * Update an estimate
   * Cost in API Credits: 1
   * @returns any Estimate updated
   * @throws ApiError
   */
  public putIncomeEstimates({
    id,
    requestBody,
  }: {
    /**
     * The id of the estimate
     */
    id: string
    requestBody?: {
      name?: string | null
      description?: string | null
      flagged?: boolean | null
      document_date?: string | null
      sent_on?: string | null
      sent_to?: string | null
      inbound_address?: string | null
      greetings_text?: string | null
      thanks_text?: string | null
      reminder_date?: string | null
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
      url: '/income/estimates/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `The specified estimate was not found`,
        422: `The specified estimate cannot be edited anymore`,
      },
    })
  }

  /**
   * Delete an estimate
   * Cost in API Credits: 1
   * @returns void
   * @throws ApiError
   */
  public deleteIncomeEstimates({
    id,
  }: {
    /**
     * The id of the estimate
     */
    id: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/income/estimates/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified estimate was not found`,
      },
    })
  }

  /**
   * Archive an estimate
   * Cost in API Credits: 1
   * @returns any Estimate archived
   * @throws ApiError
   */
  public postIncomeEstimatesArchive({
    id,
  }: {
    /**
     * The id of the estimate
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/estimates/{id}/archive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Unarchive an estimate
   * Cost in API Credits: 1
   * @returns any Estimate unarchived
   * @throws ApiError
   */
  public postIncomeEstimatesUnarchive({
    id,
  }: {
    /**
     * The id of the estimate
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/estimates/{id}/unarchive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Cancel an estimate
   * Cost in API Credits: 1
   * @returns any Estimate canceled
   * @throws ApiError
   */
  public postIncomeEstimatesCancel({
    id,
  }: {
    /**
     * The id of the estimate
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/income/estimates/{id}/cancel',
      path: {
        id: id,
      },
      errors: {
        422: `The specified estimate cannot be canceled`,
      },
    })
  }

  /**
   * Deliver an estimate
   * Cost in API Credits: 1
   * @returns any Delivery successful
   * @throws ApiError
   */
  public postIncomeEstimatesDeliver({
    id,
    requestBody,
  }: {
    /**
     * The id of the estimate
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
      url: '/income/estimates/{id}/deliver',
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
   * Retrieves an estimate as a PDF
   * @returns any Return pdf
   * @throws ApiError
   */
  public getIncomeEstimatesPdf({
    id,
  }: {
    /**
     * The id of the estimate
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/income/estimates/{id}/pdf',
      path: {
        id: id,
      },
    })
  }
}
