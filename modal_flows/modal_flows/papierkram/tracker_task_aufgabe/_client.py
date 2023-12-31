# This file was auto-generated by Fern from our API Definition.

import typing
import urllib.parse
from json.decoder import JSONDecodeError

from ..core.api_error import ApiError
from ..core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from ..core.jsonable_encoder import jsonable_encoder
from ..core.remove_none_from_dict import remove_none_from_dict
from ..not_found_error import NotFoundError
from ..unprocessable_entity_error import UnprocessableEntityError
from .get_tracker_tasks_request_order_direction_item import GetTrackerTasksRequestOrderDirectionItem
from .post_tracker_tasks_request_project import PostTrackerTasksRequestProject
from .post_tracker_tasks_request_proposition import PostTrackerTasksRequestProposition
from .post_tracker_tasks_request_user import PostTrackerTasksRequestUser
from .put_tracker_tasks_id_request_project import PutTrackerTasksIdRequestProject
from .put_tracker_tasks_id_request_proposition import PutTrackerTasksIdRequestProposition
from .put_tracker_tasks_id_request_user import PutTrackerTasksIdRequestUser

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class TrackerTaskAufgabeClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def list_all_tasks(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetTrackerTasksRequestOrderDirectionItem, typing.List[GetTrackerTasksRequestOrderDirectionItem]
            ]
        ] = None,
        project_id: typing.Optional[int] = None,
        proposition_id: typing.Optional[int] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetTrackerTasksRequestOrderDirectionItem, typing.List[GetTrackerTasksRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - project_id: typing.Optional[int]. Filter by project id

            - proposition_id: typing.Optional[int]. Filter by proposition id
        ---
        from feliche-93 import GetTrackerTasksRequestOrderDirectionItem
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_task_aufgabe.list_all_tasks(order_direction=GetTrackerTasksRequestOrderDirectionItem.ASC, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/tasks"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "project_id": project_id,
                    "proposition_id": proposition_id,
                }
            ),
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

    def create_a_task(
        self,
        *,
        name: str,
        relative_costs: typing.Optional[str] = OMIT,
        complete: typing.Optional[str] = OMIT,
        deadline: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        project: PostTrackerTasksRequestProject,
        proposition: typing.Optional[PostTrackerTasksRequestProposition] = OMIT,
        user: typing.Optional[PostTrackerTasksRequestUser] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - name: str.

            - relative_costs: typing.Optional[str].

            - complete: typing.Optional[str].

            - deadline: typing.Optional[str].

            - flagged: typing.Optional[str].

            - project: PostTrackerTasksRequestProject.

            - proposition: typing.Optional[PostTrackerTasksRequestProposition].

            - user: typing.Optional[PostTrackerTasksRequestUser].
        """
        _request: typing.Dict[str, typing.Any] = {"name": name, "project": project}
        if relative_costs is not OMIT:
            _request["relative_costs"] = relative_costs
        if complete is not OMIT:
            _request["complete"] = complete
        if deadline is not OMIT:
            _request["deadline"] = deadline
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if proposition is not OMIT:
            _request["proposition"] = proposition
        if user is not OMIT:
            _request["user"] = user
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/tasks"),
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

    def retrieves_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_task_aufgabe.retrieves_a_task(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}"),
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

    def update_a_task(
        self,
        id: str,
        *,
        name: typing.Optional[str] = OMIT,
        relative_costs: typing.Optional[str] = OMIT,
        complete: typing.Optional[str] = OMIT,
        deadline: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        project: typing.Optional[PutTrackerTasksIdRequestProject] = OMIT,
        proposition: typing.Optional[PutTrackerTasksIdRequestProposition] = OMIT,
        user: typing.Optional[PutTrackerTasksIdRequestUser] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task

            - name: typing.Optional[str].

            - relative_costs: typing.Optional[str].

            - complete: typing.Optional[str].

            - deadline: typing.Optional[str].

            - flagged: typing.Optional[str].

            - project: typing.Optional[PutTrackerTasksIdRequestProject].

            - proposition: typing.Optional[PutTrackerTasksIdRequestProposition].

            - user: typing.Optional[PutTrackerTasksIdRequestUser].
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_task_aufgabe.update_a_task(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if name is not OMIT:
            _request["name"] = name
        if relative_costs is not OMIT:
            _request["relative_costs"] = relative_costs
        if complete is not OMIT:
            _request["complete"] = complete
        if deadline is not OMIT:
            _request["deadline"] = deadline
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if project is not OMIT:
            _request["project"] = project
        if proposition is not OMIT:
            _request["proposition"] = proposition
        if user is not OMIT:
            _request["user"] = user
        _response = self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}"),
            json=jsonable_encoder(_request),
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

    def delete_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_task_aufgabe.delete_a_task(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}"),
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

    def archive_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_task_aufgabe.archive_a_task(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}/archive"),
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

    def unarchive_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.tracker_task_aufgabe.unarchive_a_task(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}/unarchive"),
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


class AsyncTrackerTaskAufgabeClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def list_all_tasks(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetTrackerTasksRequestOrderDirectionItem, typing.List[GetTrackerTasksRequestOrderDirectionItem]
            ]
        ] = None,
        project_id: typing.Optional[int] = None,
        proposition_id: typing.Optional[int] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetTrackerTasksRequestOrderDirectionItem, typing.List[GetTrackerTasksRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - project_id: typing.Optional[int]. Filter by project id

            - proposition_id: typing.Optional[int]. Filter by proposition id
        ---
        from feliche-93 import GetTrackerTasksRequestOrderDirectionItem
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_task_aufgabe.list_all_tasks(order_direction=GetTrackerTasksRequestOrderDirectionItem.ASC, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/tasks"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "project_id": project_id,
                    "proposition_id": proposition_id,
                }
            ),
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

    async def create_a_task(
        self,
        *,
        name: str,
        relative_costs: typing.Optional[str] = OMIT,
        complete: typing.Optional[str] = OMIT,
        deadline: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        project: PostTrackerTasksRequestProject,
        proposition: typing.Optional[PostTrackerTasksRequestProposition] = OMIT,
        user: typing.Optional[PostTrackerTasksRequestUser] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - name: str.

            - relative_costs: typing.Optional[str].

            - complete: typing.Optional[str].

            - deadline: typing.Optional[str].

            - flagged: typing.Optional[str].

            - project: PostTrackerTasksRequestProject.

            - proposition: typing.Optional[PostTrackerTasksRequestProposition].

            - user: typing.Optional[PostTrackerTasksRequestUser].
        """
        _request: typing.Dict[str, typing.Any] = {"name": name, "project": project}
        if relative_costs is not OMIT:
            _request["relative_costs"] = relative_costs
        if complete is not OMIT:
            _request["complete"] = complete
        if deadline is not OMIT:
            _request["deadline"] = deadline
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if proposition is not OMIT:
            _request["proposition"] = proposition
        if user is not OMIT:
            _request["user"] = user
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "tracker/tasks"),
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

    async def retrieves_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_task_aufgabe.retrieves_a_task(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}"),
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

    async def update_a_task(
        self,
        id: str,
        *,
        name: typing.Optional[str] = OMIT,
        relative_costs: typing.Optional[str] = OMIT,
        complete: typing.Optional[str] = OMIT,
        deadline: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        project: typing.Optional[PutTrackerTasksIdRequestProject] = OMIT,
        proposition: typing.Optional[PutTrackerTasksIdRequestProposition] = OMIT,
        user: typing.Optional[PutTrackerTasksIdRequestUser] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task

            - name: typing.Optional[str].

            - relative_costs: typing.Optional[str].

            - complete: typing.Optional[str].

            - deadline: typing.Optional[str].

            - flagged: typing.Optional[str].

            - project: typing.Optional[PutTrackerTasksIdRequestProject].

            - proposition: typing.Optional[PutTrackerTasksIdRequestProposition].

            - user: typing.Optional[PutTrackerTasksIdRequestUser].
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_task_aufgabe.update_a_task(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if name is not OMIT:
            _request["name"] = name
        if relative_costs is not OMIT:
            _request["relative_costs"] = relative_costs
        if complete is not OMIT:
            _request["complete"] = complete
        if deadline is not OMIT:
            _request["deadline"] = deadline
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if project is not OMIT:
            _request["project"] = project
        if proposition is not OMIT:
            _request["proposition"] = proposition
        if user is not OMIT:
            _request["user"] = user
        _response = await self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}"),
            json=jsonable_encoder(_request),
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

    async def delete_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_task_aufgabe.delete_a_task(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}"),
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

    async def archive_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_task_aufgabe.archive_a_task(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}/archive"),
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

    async def unarchive_a_task(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the task
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.tracker_task_aufgabe.unarchive_a_task(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"tracker/tasks/{id}/unarchive"),
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
