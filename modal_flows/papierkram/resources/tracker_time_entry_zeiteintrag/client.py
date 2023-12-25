# This file was auto-generated by Fern from our API Definition.

import datetime as dt
import typing
import urllib.parse
from json.decoder import JSONDecodeError

from ...core.api_error import ApiError
from ...core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from ...core.datetime_utils import serialize_datetime
from ...core.jsonable_encoder import jsonable_encoder
from ...core.remove_none_from_dict import remove_none_from_dict
from ...errors.bad_request_error import BadRequestError
from ...errors.not_found_error import NotFoundError
from ...errors.unprocessable_entity_error import UnprocessableEntityError
from .types.get_tracker_time_entries_request_billing_state import GetTrackerTimeEntriesRequestBillingState
from .types.get_tracker_time_entries_request_order_direction_item import GetTrackerTimeEntriesRequestOrderDirectionItem
from .types.post_tracker_time_entries_request_task import PostTrackerTimeEntriesRequestTask
from .types.post_tracker_time_entries_request_user import PostTrackerTimeEntriesRequestUser
from .types.put_tracker_time_entries_id_request_task import PutTrackerTimeEntriesIdRequestTask
from .types.put_tracker_time_entries_id_request_user import PutTrackerTimeEntriesIdRequestUser

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class TrackerTimeEntryZeiteintragClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def list_all_time_entries(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetTrackerTimeEntriesRequestOrderDirectionItem,
                typing.List[GetTrackerTimeEntriesRequestOrderDirectionItem],
            ]
        ] = None,
        project_id: typing.Optional[int] = None,
        task_id: typing.Optional[int] = None,
        invoice_id: typing.Optional[int] = None,
        user_id: typing.Optional[int] = None,
        billing_state: typing.Optional[GetTrackerTimeEntriesRequestBillingState] = None,
        start_time_range_start: typing.Optional[dt.datetime] = None,
        start_time_range_end: typing.Optional[dt.datetime] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetTrackerTimeEntriesRequestOrderDirectionItem, typing.List[GetTrackerTimeEntriesRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - project_id: typing.Optional[int]. Filter by project id

            - task_id: typing.Optional[int]. Filter by task id

            - invoice_id: typing.Optional[int]. Filter by invoice id

            - user_id: typing.Optional[int]. Filter by user id

            - billing_state: typing.Optional[GetTrackerTimeEntriesRequestBillingState]. Filter by billing state

            - start_time_range_start: typing.Optional[dt.datetime]. Filter by start time. Beginning of date range. As defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z

            - start_time_range_end: typing.Optional[dt.datetime]. Filter by start time. End of date range. As defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z
        ---
        from feliche-93 import (GetTrackerTimeEntriesRequestBillingState,
                                GetTrackerTimeEntriesRequestOrderDirectionItem)
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_time_entry_zeiteintrag.list_all_time_entries(order_direction=GetTrackerTimeEntriesRequestOrderDirectionItem.ASC, billing_state=GetTrackerTimeEntriesRequestBillingState.BILLED, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/time_entries"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "project_id": project_id,
                    "task_id": task_id,
                    "invoice_id": invoice_id,
                    "user_id": user_id,
                    "billing_state": billing_state,
                    "start_time_range_start": serialize_datetime(start_time_range_start)
                    if start_time_range_start is not None
                    else None,
                    "start_time_range_end": serialize_datetime(start_time_range_end)
                    if start_time_range_end is not None
                    else None,
                }
            ),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 400:
            raise BadRequestError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def create_a_time_entry(
        self,
        *,
        entry_date: str,
        started_at_time: str,
        ended_at_time: str,
        comments: typing.Optional[str] = OMIT,
        billable_duration: typing.Optional[int] = OMIT,
        unbillable: typing.Optional[bool] = OMIT,
        task: PostTrackerTimeEntriesRequestTask,
        user: PostTrackerTimeEntriesRequestUser,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - entry_date: str.

            - started_at_time: str.

            - ended_at_time: str.

            - comments: typing.Optional[str].

            - billable_duration: typing.Optional[int].

            - unbillable: typing.Optional[bool].

            - task: PostTrackerTimeEntriesRequestTask.

            - user: PostTrackerTimeEntriesRequestUser.
        """
        _request: typing.Dict[str, typing.Any] = {
            "entry_date": entry_date,
            "started_at_time": started_at_time,
            "ended_at_time": ended_at_time,
            "task": task,
            "user": user,
        }
        if comments is not OMIT:
            _request["comments"] = comments
        if billable_duration is not OMIT:
            _request["billable_duration"] = billable_duration
        if unbillable is not OMIT:
            _request["unbillable"] = unbillable
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/time_entries"),
            json=jsonable_encoder(_request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 422:
            raise UnprocessableEntityError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def retrieves_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_time_entry_zeiteintrag.retrieves_a_time_entry(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 404:
            raise NotFoundError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def update_a_time_entry(
        self,
        id: str,
        *,
        entry_date: typing.Optional[str] = OMIT,
        started_at_time: typing.Optional[str] = OMIT,
        ended_at_time: typing.Optional[str] = OMIT,
        comments: typing.Optional[str] = OMIT,
        billable_duration: typing.Optional[int] = OMIT,
        unbillable: typing.Optional[bool] = OMIT,
        task: typing.Optional[PutTrackerTimeEntriesIdRequestTask] = OMIT,
        user: typing.Optional[PutTrackerTimeEntriesIdRequestUser] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry

            - entry_date: typing.Optional[str].

            - started_at_time: typing.Optional[str].

            - ended_at_time: typing.Optional[str].

            - comments: typing.Optional[str].

            - billable_duration: typing.Optional[int].

            - unbillable: typing.Optional[bool].

            - task: typing.Optional[PutTrackerTimeEntriesIdRequestTask].

            - user: typing.Optional[PutTrackerTimeEntriesIdRequestUser].
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_time_entry_zeiteintrag.update_a_time_entry(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if entry_date is not OMIT:
            _request["entry_date"] = entry_date
        if started_at_time is not OMIT:
            _request["started_at_time"] = started_at_time
        if ended_at_time is not OMIT:
            _request["ended_at_time"] = ended_at_time
        if comments is not OMIT:
            _request["comments"] = comments
        if billable_duration is not OMIT:
            _request["billable_duration"] = billable_duration
        if unbillable is not OMIT:
            _request["unbillable"] = unbillable
        if task is not OMIT:
            _request["task"] = task
        if user is not OMIT:
            _request["user"] = user
        _response = self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}"),
            json=jsonable_encoder(_request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 404:
            raise NotFoundError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        if _response.status_code == 422:
            raise UnprocessableEntityError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def delete_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_time_entry_zeiteintrag.delete_a_time_entry(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 404:
            raise NotFoundError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def archive_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_time_entry_zeiteintrag.archive_a_time_entry(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}/archive"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def unarchive_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_time_entry_zeiteintrag.unarchive_a_time_entry(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}/unarchive"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)


class AsyncTrackerTimeEntryZeiteintragClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def list_all_time_entries(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetTrackerTimeEntriesRequestOrderDirectionItem,
                typing.List[GetTrackerTimeEntriesRequestOrderDirectionItem],
            ]
        ] = None,
        project_id: typing.Optional[int] = None,
        task_id: typing.Optional[int] = None,
        invoice_id: typing.Optional[int] = None,
        user_id: typing.Optional[int] = None,
        billing_state: typing.Optional[GetTrackerTimeEntriesRequestBillingState] = None,
        start_time_range_start: typing.Optional[dt.datetime] = None,
        start_time_range_end: typing.Optional[dt.datetime] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetTrackerTimeEntriesRequestOrderDirectionItem, typing.List[GetTrackerTimeEntriesRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - project_id: typing.Optional[int]. Filter by project id

            - task_id: typing.Optional[int]. Filter by task id

            - invoice_id: typing.Optional[int]. Filter by invoice id

            - user_id: typing.Optional[int]. Filter by user id

            - billing_state: typing.Optional[GetTrackerTimeEntriesRequestBillingState]. Filter by billing state

            - start_time_range_start: typing.Optional[dt.datetime]. Filter by start time. Beginning of date range. As defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z

            - start_time_range_end: typing.Optional[dt.datetime]. Filter by start time. End of date range. As defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z
        ---
        from feliche-93 import (GetTrackerTimeEntriesRequestBillingState,
                                GetTrackerTimeEntriesRequestOrderDirectionItem)
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_time_entry_zeiteintrag.list_all_time_entries(order_direction=GetTrackerTimeEntriesRequestOrderDirectionItem.ASC, billing_state=GetTrackerTimeEntriesRequestBillingState.BILLED, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/time_entries"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "project_id": project_id,
                    "task_id": task_id,
                    "invoice_id": invoice_id,
                    "user_id": user_id,
                    "billing_state": billing_state,
                    "start_time_range_start": serialize_datetime(start_time_range_start)
                    if start_time_range_start is not None
                    else None,
                    "start_time_range_end": serialize_datetime(start_time_range_end)
                    if start_time_range_end is not None
                    else None,
                }
            ),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 400:
            raise BadRequestError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def create_a_time_entry(
        self,
        *,
        entry_date: str,
        started_at_time: str,
        ended_at_time: str,
        comments: typing.Optional[str] = OMIT,
        billable_duration: typing.Optional[int] = OMIT,
        unbillable: typing.Optional[bool] = OMIT,
        task: PostTrackerTimeEntriesRequestTask,
        user: PostTrackerTimeEntriesRequestUser,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - entry_date: str.

            - started_at_time: str.

            - ended_at_time: str.

            - comments: typing.Optional[str].

            - billable_duration: typing.Optional[int].

            - unbillable: typing.Optional[bool].

            - task: PostTrackerTimeEntriesRequestTask.

            - user: PostTrackerTimeEntriesRequestUser.
        """
        _request: typing.Dict[str, typing.Any] = {
            "entry_date": entry_date,
            "started_at_time": started_at_time,
            "ended_at_time": ended_at_time,
            "task": task,
            "user": user,
        }
        if comments is not OMIT:
            _request["comments"] = comments
        if billable_duration is not OMIT:
            _request["billable_duration"] = billable_duration
        if unbillable is not OMIT:
            _request["unbillable"] = unbillable
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/time_entries"),
            json=jsonable_encoder(_request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 422:
            raise UnprocessableEntityError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def retrieves_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_time_entry_zeiteintrag.retrieves_a_time_entry(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 404:
            raise NotFoundError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def update_a_time_entry(
        self,
        id: str,
        *,
        entry_date: typing.Optional[str] = OMIT,
        started_at_time: typing.Optional[str] = OMIT,
        ended_at_time: typing.Optional[str] = OMIT,
        comments: typing.Optional[str] = OMIT,
        billable_duration: typing.Optional[int] = OMIT,
        unbillable: typing.Optional[bool] = OMIT,
        task: typing.Optional[PutTrackerTimeEntriesIdRequestTask] = OMIT,
        user: typing.Optional[PutTrackerTimeEntriesIdRequestUser] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry

            - entry_date: typing.Optional[str].

            - started_at_time: typing.Optional[str].

            - ended_at_time: typing.Optional[str].

            - comments: typing.Optional[str].

            - billable_duration: typing.Optional[int].

            - unbillable: typing.Optional[bool].

            - task: typing.Optional[PutTrackerTimeEntriesIdRequestTask].

            - user: typing.Optional[PutTrackerTimeEntriesIdRequestUser].
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_time_entry_zeiteintrag.update_a_time_entry(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if entry_date is not OMIT:
            _request["entry_date"] = entry_date
        if started_at_time is not OMIT:
            _request["started_at_time"] = started_at_time
        if ended_at_time is not OMIT:
            _request["ended_at_time"] = ended_at_time
        if comments is not OMIT:
            _request["comments"] = comments
        if billable_duration is not OMIT:
            _request["billable_duration"] = billable_duration
        if unbillable is not OMIT:
            _request["unbillable"] = unbillable
        if task is not OMIT:
            _request["task"] = task
        if user is not OMIT:
            _request["user"] = user
        _response = await self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}"),
            json=jsonable_encoder(_request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 404:
            raise NotFoundError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        if _response.status_code == 422:
            raise UnprocessableEntityError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def delete_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_time_entry_zeiteintrag.delete_a_time_entry(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        if _response.status_code == 404:
            raise NotFoundError(pydantic.parse_obj_as(typing.Any, _response.json()))  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def archive_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_time_entry_zeiteintrag.archive_a_time_entry(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}/archive"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def unarchive_a_time_entry(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the time entry
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_time_entry_zeiteintrag.unarchive_a_time_entry(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/time_entries/{id}/unarchive"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)
