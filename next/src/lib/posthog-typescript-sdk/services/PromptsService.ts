/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
export class PromptsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create, read, update and delete prompt sequences state for a person.
   * @returns any No response body
   * @throws ApiError
   */
  public promptsMyPromptsPartialUpdate(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/prompts/my_prompts/',
    })
  }
}
