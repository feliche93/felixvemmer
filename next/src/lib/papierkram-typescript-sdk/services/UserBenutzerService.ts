/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class UserBenutzerService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List all users
   * Cost in API Credits: 1
   * @returns any List of users
   * @throws ApiError
   */
  public getUsers({
    page,
    pageSize,
    orderBy,
    orderDirection,
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
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/users',
      query: {
        page: page,
        page_size: pageSize,
        order_by: orderBy,
        order_direction: orderDirection,
      },
    })
  }

  /**
   * Retrieves a user
   * Cost in API Credits: 1
   * @returns any Show user
   * @throws ApiError
   */
  public getUsers1({
    id,
  }: {
    /**
     * The id of the user
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/users/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified user was not found`,
      },
    })
  }
}
