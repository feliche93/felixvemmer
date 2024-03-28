/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import type { PaginatedSessionRecordingPlaylistList } from '../models/PaginatedSessionRecordingPlaylistList'
import type { PatchedSessionRecordingPlaylist } from '../models/PatchedSessionRecordingPlaylist'
import type { SessionRecordingPlaylist } from '../models/SessionRecordingPlaylist'
export class SessionRecordingPlaylistsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PaginatedSessionRecordingPlaylistList
   * @throws ApiError
   */
  public sessionRecordingPlaylistsList({
    projectId,
    createdBy,
    limit,
    offset,
    shortId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    createdBy?: number
    /**
     * Number of results to return per page.
     */
    limit?: number
    /**
     * The initial index from which to return the results.
     */
    offset?: number
    shortId?: string
  }): CancelablePromise<PaginatedSessionRecordingPlaylistList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/session_recording_playlists/',
      path: {
        project_id: projectId,
      },
      query: {
        created_by: createdBy,
        limit: limit,
        offset: offset,
        short_id: shortId,
      },
    })
  }
  /**
   * @returns SessionRecordingPlaylist
   * @throws ApiError
   */
  public sessionRecordingPlaylistsCreate({
    projectId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    requestBody?: SessionRecordingPlaylist
  }): CancelablePromise<SessionRecordingPlaylist> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/session_recording_playlists/',
      path: {
        project_id: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns SessionRecordingPlaylist
   * @throws ApiError
   */
  public sessionRecordingPlaylistsRetrieve({
    projectId,
    shortId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    shortId: string
  }): CancelablePromise<SessionRecordingPlaylist> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/session_recording_playlists/{short_id}/',
      path: {
        project_id: projectId,
        short_id: shortId,
      },
    })
  }
  /**
   * @returns SessionRecordingPlaylist
   * @throws ApiError
   */
  public sessionRecordingPlaylistsUpdate({
    projectId,
    shortId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    shortId: string
    requestBody?: SessionRecordingPlaylist
  }): CancelablePromise<SessionRecordingPlaylist> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/projects/{project_id}/session_recording_playlists/{short_id}/',
      path: {
        project_id: projectId,
        short_id: shortId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns SessionRecordingPlaylist
   * @throws ApiError
   */
  public sessionRecordingPlaylistsPartialUpdate({
    projectId,
    shortId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    shortId: string
    requestBody?: PatchedSessionRecordingPlaylist
  }): CancelablePromise<SessionRecordingPlaylist> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/projects/{project_id}/session_recording_playlists/{short_id}/',
      path: {
        project_id: projectId,
        short_id: shortId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
   * @returns void
   * @throws ApiError
   */
  public sessionRecordingPlaylistsDestroy({
    projectId,
    shortId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    shortId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/session_recording_playlists/{short_id}/',
      path: {
        project_id: projectId,
        short_id: shortId,
      },
      errors: {
        405: `No response body`,
      },
    })
  }
  /**
   * @returns SessionRecordingPlaylist
   * @throws ApiError
   */
  public sessionRecordingPlaylistsRecordingsRetrieve({
    projectId,
    shortId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    shortId: string
  }): CancelablePromise<SessionRecordingPlaylist> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/projects/{project_id}/session_recording_playlists/{short_id}/recordings/',
      path: {
        project_id: projectId,
        short_id: shortId,
      },
    })
  }
  /**
   * @returns SessionRecordingPlaylist
   * @throws ApiError
   */
  public sessionRecordingPlaylistsRecordingsCreate({
    projectId,
    sessionRecordingId,
    shortId,
    requestBody,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    sessionRecordingId: string
    shortId: string
    requestBody?: SessionRecordingPlaylist
  }): CancelablePromise<SessionRecordingPlaylist> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/projects/{project_id}/session_recording_playlists/{short_id}/recordings/{session_recording_id}/',
      path: {
        project_id: projectId,
        session_recording_id: sessionRecordingId,
        short_id: shortId,
      },
      body: requestBody,
      mediaType: 'application/json',
    })
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public sessionRecordingPlaylistsRecordingsDestroy({
    projectId,
    sessionRecordingId,
    shortId,
  }: {
    /**
     * Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.
     */
    projectId: string
    sessionRecordingId: string
    shortId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/projects/{project_id}/session_recording_playlists/{short_id}/recordings/{session_recording_id}/',
      path: {
        project_id: projectId,
        session_recording_id: sessionRecordingId,
        short_id: shortId,
      },
    })
  }
}
