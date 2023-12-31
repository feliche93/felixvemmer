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
from .get_income_estimates_request_order_direction_item import GetIncomeEstimatesRequestOrderDirectionItem
from .post_income_estimates_id_deliver_request_email import PostIncomeEstimatesIdDeliverRequestEmail
from .post_income_estimates_request_billing import PostIncomeEstimatesRequestBilling
from .post_income_estimates_request_custom_template import PostIncomeEstimatesRequestCustomTemplate
from .post_income_estimates_request_customer import PostIncomeEstimatesRequestCustomer
from .post_income_estimates_request_line_items_item import PostIncomeEstimatesRequestLineItemsItem
from .put_income_estimates_id_request_billing import PutIncomeEstimatesIdRequestBilling
from .put_income_estimates_id_request_custom_template import PutIncomeEstimatesIdRequestCustomTemplate
from .put_income_estimates_id_request_customer import PutIncomeEstimatesIdRequestCustomer
from .put_income_estimates_id_request_line_items_item import PutIncomeEstimatesIdRequestLineItemsItem

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class IncomeEstimateAngebotClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def list_all_estimates(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetIncomeEstimatesRequestOrderDirectionItem, typing.List[GetIncomeEstimatesRequestOrderDirectionItem]
            ]
        ] = None,
        company_id: typing.Optional[int] = None,
        project_id: typing.Optional[int] = None,
        document_date_range_start: typing.Optional[str] = None,
        document_date_range_end: typing.Optional[str] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetIncomeEstimatesRequestOrderDirectionItem, typing.List[GetIncomeEstimatesRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - company_id: typing.Optional[int]. Filter by company id

            - project_id: typing.Optional[int]. Filter by project id

            - document_date_range_start: typing.Optional[str]. Filter by document date. Beginning of date range.

            - document_date_range_end: typing.Optional[str]. Filter by document date. End of date range.
        ---
        from feliche-93 import GetIncomeEstimatesRequestOrderDirectionItem
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.list_all_estimates(order_direction=GetIncomeEstimatesRequestOrderDirectionItem.ASC, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "income/estimates"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "company_id": company_id,
                    "project_id": project_id,
                    "document_date_range_start": document_date_range_start,
                    "document_date_range_end": document_date_range_end,
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

    def create_an_estimate(
        self,
        *,
        name: str,
        description: typing.Optional[str] = OMIT,
        flagged: typing.Optional[bool] = OMIT,
        document_date: typing.Optional[str] = OMIT,
        sent_on: typing.Optional[str] = OMIT,
        sent_to: typing.Optional[str] = OMIT,
        inbound_address: typing.Optional[str] = OMIT,
        greetings_text: typing.Optional[str] = OMIT,
        thanks_text: typing.Optional[str] = OMIT,
        reminder_date: typing.Optional[str] = OMIT,
        customer: typing.Optional[PostIncomeEstimatesRequestCustomer] = OMIT,
        custom_template: typing.Optional[PostIncomeEstimatesRequestCustomTemplate] = OMIT,
        billing: typing.Optional[PostIncomeEstimatesRequestBilling] = OMIT,
        line_items: typing.Optional[typing.List[PostIncomeEstimatesRequestLineItemsItem]] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 50

        Parameters:
            - name: str.

            - description: typing.Optional[str].

            - flagged: typing.Optional[bool].

            - document_date: typing.Optional[str].

            - sent_on: typing.Optional[str].

            - sent_to: typing.Optional[str].

            - inbound_address: typing.Optional[str].

            - greetings_text: typing.Optional[str].

            - thanks_text: typing.Optional[str].

            - reminder_date: typing.Optional[str].

            - customer: typing.Optional[PostIncomeEstimatesRequestCustomer].

            - custom_template: typing.Optional[PostIncomeEstimatesRequestCustomTemplate].

            - billing: typing.Optional[PostIncomeEstimatesRequestBilling].

            - line_items: typing.Optional[typing.List[PostIncomeEstimatesRequestLineItemsItem]].
        """
        _request: typing.Dict[str, typing.Any] = {"name": name}
        if description is not OMIT:
            _request["description"] = description
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if document_date is not OMIT:
            _request["document_date"] = document_date
        if sent_on is not OMIT:
            _request["sent_on"] = sent_on
        if sent_to is not OMIT:
            _request["sent_to"] = sent_to
        if inbound_address is not OMIT:
            _request["inbound_address"] = inbound_address
        if greetings_text is not OMIT:
            _request["greetings_text"] = greetings_text
        if thanks_text is not OMIT:
            _request["thanks_text"] = thanks_text
        if reminder_date is not OMIT:
            _request["reminder_date"] = reminder_date
        if customer is not OMIT:
            _request["customer"] = customer
        if custom_template is not OMIT:
            _request["custom_template"] = custom_template
        if billing is not OMIT:
            _request["billing"] = billing
        if line_items is not OMIT:
            _request["line_items"] = line_items
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "income/estimates"),
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

    def retrieves_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.retrieves_an_estimate(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}"),
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

    def update_an_estimate(
        self,
        id: str,
        *,
        name: typing.Optional[str] = OMIT,
        description: typing.Optional[str] = OMIT,
        flagged: typing.Optional[bool] = OMIT,
        document_date: typing.Optional[str] = OMIT,
        sent_on: typing.Optional[str] = OMIT,
        sent_to: typing.Optional[str] = OMIT,
        inbound_address: typing.Optional[str] = OMIT,
        greetings_text: typing.Optional[str] = OMIT,
        thanks_text: typing.Optional[str] = OMIT,
        reminder_date: typing.Optional[str] = OMIT,
        customer: typing.Optional[PutIncomeEstimatesIdRequestCustomer] = OMIT,
        custom_template: typing.Optional[PutIncomeEstimatesIdRequestCustomTemplate] = OMIT,
        billing: typing.Optional[PutIncomeEstimatesIdRequestBilling] = OMIT,
        line_items: typing.Optional[typing.List[PutIncomeEstimatesIdRequestLineItemsItem]] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate

            - name: typing.Optional[str].

            - description: typing.Optional[str].

            - flagged: typing.Optional[bool].

            - document_date: typing.Optional[str].

            - sent_on: typing.Optional[str].

            - sent_to: typing.Optional[str].

            - inbound_address: typing.Optional[str].

            - greetings_text: typing.Optional[str].

            - thanks_text: typing.Optional[str].

            - reminder_date: typing.Optional[str].

            - customer: typing.Optional[PutIncomeEstimatesIdRequestCustomer].

            - custom_template: typing.Optional[PutIncomeEstimatesIdRequestCustomTemplate].

            - billing: typing.Optional[PutIncomeEstimatesIdRequestBilling].

            - line_items: typing.Optional[typing.List[PutIncomeEstimatesIdRequestLineItemsItem]].
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.update_an_estimate(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if name is not OMIT:
            _request["name"] = name
        if description is not OMIT:
            _request["description"] = description
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if document_date is not OMIT:
            _request["document_date"] = document_date
        if sent_on is not OMIT:
            _request["sent_on"] = sent_on
        if sent_to is not OMIT:
            _request["sent_to"] = sent_to
        if inbound_address is not OMIT:
            _request["inbound_address"] = inbound_address
        if greetings_text is not OMIT:
            _request["greetings_text"] = greetings_text
        if thanks_text is not OMIT:
            _request["thanks_text"] = thanks_text
        if reminder_date is not OMIT:
            _request["reminder_date"] = reminder_date
        if customer is not OMIT:
            _request["customer"] = customer
        if custom_template is not OMIT:
            _request["custom_template"] = custom_template
        if billing is not OMIT:
            _request["billing"] = billing
        if line_items is not OMIT:
            _request["line_items"] = line_items
        _response = self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}"),
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

    def delete_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.delete_an_estimate(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}"),
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

    def archive_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.archive_an_estimate(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/archive"),
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

    def unarchive_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.unarchive_an_estimate(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/unarchive"),
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

    def cancel_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.cancel_an_estimate(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/cancel"),
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

    def deliver_an_estimate(
        self,
        id: str,
        *,
        send_via: typing.Optional[str] = OMIT,
        email: typing.Optional[PostIncomeEstimatesIdDeliverRequestEmail] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate

            - send_via: typing.Optional[str].

            - email: typing.Optional[PostIncomeEstimatesIdDeliverRequestEmail].
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.deliver_an_estimate(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if send_via is not OMIT:
            _request["send_via"] = send_via
        if email is not OMIT:
            _request["email"] = email
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/deliver"),
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

    def retrieves_an_estimate_as_a_pdf(self, id: str) -> None:
        """
        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.income_estimate_angebot.retrieves_an_estimate_as_a_pdf(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/pdf"),
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


class AsyncIncomeEstimateAngebotClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def list_all_estimates(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetIncomeEstimatesRequestOrderDirectionItem, typing.List[GetIncomeEstimatesRequestOrderDirectionItem]
            ]
        ] = None,
        company_id: typing.Optional[int] = None,
        project_id: typing.Optional[int] = None,
        document_date_range_start: typing.Optional[str] = None,
        document_date_range_end: typing.Optional[str] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetIncomeEstimatesRequestOrderDirectionItem, typing.List[GetIncomeEstimatesRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - company_id: typing.Optional[int]. Filter by company id

            - project_id: typing.Optional[int]. Filter by project id

            - document_date_range_start: typing.Optional[str]. Filter by document date. Beginning of date range.

            - document_date_range_end: typing.Optional[str]. Filter by document date. End of date range.
        ---
        from feliche-93 import GetIncomeEstimatesRequestOrderDirectionItem
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.list_all_estimates(order_direction=GetIncomeEstimatesRequestOrderDirectionItem.ASC, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "income/estimates"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "company_id": company_id,
                    "project_id": project_id,
                    "document_date_range_start": document_date_range_start,
                    "document_date_range_end": document_date_range_end,
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

    async def create_an_estimate(
        self,
        *,
        name: str,
        description: typing.Optional[str] = OMIT,
        flagged: typing.Optional[bool] = OMIT,
        document_date: typing.Optional[str] = OMIT,
        sent_on: typing.Optional[str] = OMIT,
        sent_to: typing.Optional[str] = OMIT,
        inbound_address: typing.Optional[str] = OMIT,
        greetings_text: typing.Optional[str] = OMIT,
        thanks_text: typing.Optional[str] = OMIT,
        reminder_date: typing.Optional[str] = OMIT,
        customer: typing.Optional[PostIncomeEstimatesRequestCustomer] = OMIT,
        custom_template: typing.Optional[PostIncomeEstimatesRequestCustomTemplate] = OMIT,
        billing: typing.Optional[PostIncomeEstimatesRequestBilling] = OMIT,
        line_items: typing.Optional[typing.List[PostIncomeEstimatesRequestLineItemsItem]] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 50

        Parameters:
            - name: str.

            - description: typing.Optional[str].

            - flagged: typing.Optional[bool].

            - document_date: typing.Optional[str].

            - sent_on: typing.Optional[str].

            - sent_to: typing.Optional[str].

            - inbound_address: typing.Optional[str].

            - greetings_text: typing.Optional[str].

            - thanks_text: typing.Optional[str].

            - reminder_date: typing.Optional[str].

            - customer: typing.Optional[PostIncomeEstimatesRequestCustomer].

            - custom_template: typing.Optional[PostIncomeEstimatesRequestCustomTemplate].

            - billing: typing.Optional[PostIncomeEstimatesRequestBilling].

            - line_items: typing.Optional[typing.List[PostIncomeEstimatesRequestLineItemsItem]].
        """
        _request: typing.Dict[str, typing.Any] = {"name": name}
        if description is not OMIT:
            _request["description"] = description
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if document_date is not OMIT:
            _request["document_date"] = document_date
        if sent_on is not OMIT:
            _request["sent_on"] = sent_on
        if sent_to is not OMIT:
            _request["sent_to"] = sent_to
        if inbound_address is not OMIT:
            _request["inbound_address"] = inbound_address
        if greetings_text is not OMIT:
            _request["greetings_text"] = greetings_text
        if thanks_text is not OMIT:
            _request["thanks_text"] = thanks_text
        if reminder_date is not OMIT:
            _request["reminder_date"] = reminder_date
        if customer is not OMIT:
            _request["customer"] = customer
        if custom_template is not OMIT:
            _request["custom_template"] = custom_template
        if billing is not OMIT:
            _request["billing"] = billing
        if line_items is not OMIT:
            _request["line_items"] = line_items
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "income/estimates"),
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

    async def retrieves_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.retrieves_an_estimate(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}"),
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

    async def update_an_estimate(
        self,
        id: str,
        *,
        name: typing.Optional[str] = OMIT,
        description: typing.Optional[str] = OMIT,
        flagged: typing.Optional[bool] = OMIT,
        document_date: typing.Optional[str] = OMIT,
        sent_on: typing.Optional[str] = OMIT,
        sent_to: typing.Optional[str] = OMIT,
        inbound_address: typing.Optional[str] = OMIT,
        greetings_text: typing.Optional[str] = OMIT,
        thanks_text: typing.Optional[str] = OMIT,
        reminder_date: typing.Optional[str] = OMIT,
        customer: typing.Optional[PutIncomeEstimatesIdRequestCustomer] = OMIT,
        custom_template: typing.Optional[PutIncomeEstimatesIdRequestCustomTemplate] = OMIT,
        billing: typing.Optional[PutIncomeEstimatesIdRequestBilling] = OMIT,
        line_items: typing.Optional[typing.List[PutIncomeEstimatesIdRequestLineItemsItem]] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate

            - name: typing.Optional[str].

            - description: typing.Optional[str].

            - flagged: typing.Optional[bool].

            - document_date: typing.Optional[str].

            - sent_on: typing.Optional[str].

            - sent_to: typing.Optional[str].

            - inbound_address: typing.Optional[str].

            - greetings_text: typing.Optional[str].

            - thanks_text: typing.Optional[str].

            - reminder_date: typing.Optional[str].

            - customer: typing.Optional[PutIncomeEstimatesIdRequestCustomer].

            - custom_template: typing.Optional[PutIncomeEstimatesIdRequestCustomTemplate].

            - billing: typing.Optional[PutIncomeEstimatesIdRequestBilling].

            - line_items: typing.Optional[typing.List[PutIncomeEstimatesIdRequestLineItemsItem]].
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.update_an_estimate(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if name is not OMIT:
            _request["name"] = name
        if description is not OMIT:
            _request["description"] = description
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if document_date is not OMIT:
            _request["document_date"] = document_date
        if sent_on is not OMIT:
            _request["sent_on"] = sent_on
        if sent_to is not OMIT:
            _request["sent_to"] = sent_to
        if inbound_address is not OMIT:
            _request["inbound_address"] = inbound_address
        if greetings_text is not OMIT:
            _request["greetings_text"] = greetings_text
        if thanks_text is not OMIT:
            _request["thanks_text"] = thanks_text
        if reminder_date is not OMIT:
            _request["reminder_date"] = reminder_date
        if customer is not OMIT:
            _request["customer"] = customer
        if custom_template is not OMIT:
            _request["custom_template"] = custom_template
        if billing is not OMIT:
            _request["billing"] = billing
        if line_items is not OMIT:
            _request["line_items"] = line_items
        _response = await self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}"),
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

    async def delete_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.delete_an_estimate(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}"),
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

    async def archive_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.archive_an_estimate(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/archive"),
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

    async def unarchive_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.unarchive_an_estimate(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/unarchive"),
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

    async def cancel_an_estimate(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.cancel_an_estimate(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/cancel"),
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

    async def deliver_an_estimate(
        self,
        id: str,
        *,
        send_via: typing.Optional[str] = OMIT,
        email: typing.Optional[PostIncomeEstimatesIdDeliverRequestEmail] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the estimate

            - send_via: typing.Optional[str].

            - email: typing.Optional[PostIncomeEstimatesIdDeliverRequestEmail].
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.deliver_an_estimate(id="id", )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if send_via is not OMIT:
            _request["send_via"] = send_via
        if email is not OMIT:
            _request["email"] = email
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/deliver"),
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

    async def retrieves_an_estimate_as_a_pdf(self, id: str) -> None:
        """
        Parameters:
            - id: str. The id of the estimate
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.income_estimate_angebot.retrieves_an_estimate_as_a_pdf(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"income/estimates/{id}/pdf"),
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
