/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions'
import { BaseHttpRequest } from './BaseHttpRequest'
import type { CancelablePromise } from './CancelablePromise'
import { request as __request } from './request'

export class FetchHttpRequest extends BaseHttpRequest {
  /**
   * Request method
   * @param options The request options from the service
   * @returns CancelablePromise<T>
   * @throws ApiError
   */
  public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    return __request(this.config, options)
  }
}
