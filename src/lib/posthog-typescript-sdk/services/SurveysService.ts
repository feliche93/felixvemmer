/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { PaginatedSurveyList } from '../models/PaginatedSurveyList'
import type { PatchedSurveySerializerCreateUpdateOnly } from '../models/PatchedSurveySerializerCreateUpdateOnly'
import type { Survey } from '../models/Survey'
import type { SurveySerializerCreateUpdateOnly } from '../models/SurveySerializerCreateUpdateOnly'
export class SurveysService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedSurveyList
   * @throws ApiError
   */
  public surveysList({
    projectId,
    limit,
    offset,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
  }): CancelablePromise<PaginatedSurveyList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/surveys/',
      path: {
        project_id: projectId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    })
  }
  /**
   * @returns SurveySerializerCreateUpdateOnly
   * @throws ApiError
   */
  public surveysCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: SurveySerializerCreateUpdateOnly
  }): CancelablePromise<SurveySerializerCreateUpdateOnly> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/surveys/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns Survey
   * @throws ApiError
   */
  public surveysRetrieve({
    id,
    projectId,
  }: {
    /**
     * A UUID string identifying this survey.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Survey> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/surveys/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns Survey
   * @throws ApiError
   */
  public surveysUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A UUID string identifying this survey.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody: Survey
  }): CancelablePromise<Survey> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/surveys/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns SurveySerializerCreateUpdateOnly
   * @throws ApiError
   */
  public surveysPartialUpdate({
    id,
    projectId,
    requestBody,
  }: {
    /**
     * A UUID string identifying this survey.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: PatchedSurveySerializerCreateUpdateOnly
  }): CancelablePromise<SurveySerializerCreateUpdateOnly> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/surveys/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public surveysDestroy({
    id,
    projectId,
  }: {
    /**
     * A UUID string identifying this survey.
     */
    id: string
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/surveys/{id}/',
      path: {
        id: id,
        project_id: projectId,
      },
    })
  }
  /**
   * @returns Survey
   * @throws ApiError
   */
  public surveysResponsesCountRetrieve({
    projectId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
  }): CancelablePromise<Survey> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/surveys/responses_count/',
      path: {
        project_id: projectId,
      },
    })
  }
}
