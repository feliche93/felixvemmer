/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class InfoService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Some static information required for other api methods
   * Cost in API Credits: 1
   * @returns any Show some info
   * @throws ApiError
   */
  public getInfo(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/info',
    })
  }
}
