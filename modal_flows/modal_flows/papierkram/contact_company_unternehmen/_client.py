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
from .get_contact_companies_request_order_direction_item import GetContactCompaniesRequestOrderDirectionItem
from .post_contact_companies_request_people_item import PostContactCompaniesRequestPeopleItem

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class ContactCompanyUnternehmenClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def list_all_companies(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetContactCompaniesRequestOrderDirectionItem, typing.List[GetContactCompaniesRequestOrderDirectionItem]
            ]
        ] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetContactCompaniesRequestOrderDirectionItem, typing.List[GetContactCompaniesRequestOrderDirectionItem]]]. Order direction (must be used with order_by)
        ---
        from feliche-93 import GetContactCompaniesRequestOrderDirectionItem
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_unternehmen.list_all_companies(order_direction=GetContactCompaniesRequestOrderDirectionItem.ASC, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "contact/companies"),
            params=remove_none_from_dict(
                {"page": page, "page_size": page_size, "order_by": order_by, "order_direction": order_direction}
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

    def create_a_company(
        self,
        *,
        name: str,
        contact_type: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        website: typing.Optional[str] = OMIT,
        twitter: typing.Optional[str] = OMIT,
        ust_idnr: typing.Optional[str] = OMIT,
        delivery_method: typing.Optional[str] = OMIT,
        postal_street: typing.Optional[str] = OMIT,
        postal_zip: typing.Optional[str] = OMIT,
        postal_city: typing.Optional[str] = OMIT,
        postal_country: typing.Optional[str] = OMIT,
        physical_street: typing.Optional[str] = OMIT,
        physical_zip: typing.Optional[str] = OMIT,
        physical_city: typing.Optional[str] = OMIT,
        physical_country: typing.Optional[str] = OMIT,
        bank_account_no: typing.Optional[str] = OMIT,
        bank_blz: typing.Optional[str] = OMIT,
        bank_institute: typing.Optional[str] = OMIT,
        bank_bic: typing.Optional[str] = OMIT,
        bank_iban: typing.Optional[str] = OMIT,
        notes: typing.Optional[str] = OMIT,
        color: typing.Optional[str] = OMIT,
        people: typing.Optional[typing.List[PostContactCompaniesRequestPeopleItem]] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - name: str.

            - contact_type: typing.Optional[str].

            - phone: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - website: typing.Optional[str].

            - twitter: typing.Optional[str].

            - ust_idnr: typing.Optional[str].

            - delivery_method: typing.Optional[str].

            - postal_street: typing.Optional[str].

            - postal_zip: typing.Optional[str].

            - postal_city: typing.Optional[str].

            - postal_country: typing.Optional[str].

            - physical_street: typing.Optional[str].

            - physical_zip: typing.Optional[str].

            - physical_city: typing.Optional[str].

            - physical_country: typing.Optional[str].

            - bank_account_no: typing.Optional[str].

            - bank_blz: typing.Optional[str].

            - bank_institute: typing.Optional[str].

            - bank_bic: typing.Optional[str].

            - bank_iban: typing.Optional[str].

            - notes: typing.Optional[str].

            - color: typing.Optional[str].

            - people: typing.Optional[typing.List[PostContactCompaniesRequestPeopleItem]].
        """
        _request: typing.Dict[str, typing.Any] = {"name": name}
        if contact_type is not OMIT:
            _request["contact_type"] = contact_type
        if phone is not OMIT:
            _request["phone"] = phone
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if website is not OMIT:
            _request["website"] = website
        if twitter is not OMIT:
            _request["twitter"] = twitter
        if ust_idnr is not OMIT:
            _request["ust_idnr"] = ust_idnr
        if delivery_method is not OMIT:
            _request["delivery_method"] = delivery_method
        if postal_street is not OMIT:
            _request["postal_street"] = postal_street
        if postal_zip is not OMIT:
            _request["postal_zip"] = postal_zip
        if postal_city is not OMIT:
            _request["postal_city"] = postal_city
        if postal_country is not OMIT:
            _request["postal_country"] = postal_country
        if physical_street is not OMIT:
            _request["physical_street"] = physical_street
        if physical_zip is not OMIT:
            _request["physical_zip"] = physical_zip
        if physical_city is not OMIT:
            _request["physical_city"] = physical_city
        if physical_country is not OMIT:
            _request["physical_country"] = physical_country
        if bank_account_no is not OMIT:
            _request["bank_account_no"] = bank_account_no
        if bank_blz is not OMIT:
            _request["bank_blz"] = bank_blz
        if bank_institute is not OMIT:
            _request["bank_institute"] = bank_institute
        if bank_bic is not OMIT:
            _request["bank_bic"] = bank_bic
        if bank_iban is not OMIT:
            _request["bank_iban"] = bank_iban
        if notes is not OMIT:
            _request["notes"] = notes
        if color is not OMIT:
            _request["color"] = color
        if people is not OMIT:
            _request["people"] = people
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "contact/companies"),
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

    def retrieves_a_company(self, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: int. The id of the company
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_unternehmen.retrieves_a_company(id=1, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}"),
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

    def update_a_company(
        self,
        id: int,
        *,
        name: typing.Optional[str] = OMIT,
        contact_type: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        website: typing.Optional[str] = OMIT,
        twitter: typing.Optional[str] = OMIT,
        ust_idnr: typing.Optional[str] = OMIT,
        delivery_method: typing.Optional[str] = OMIT,
        postal_street: typing.Optional[str] = OMIT,
        postal_zip: typing.Optional[str] = OMIT,
        postal_city: typing.Optional[str] = OMIT,
        postal_country: typing.Optional[str] = OMIT,
        physical_street: typing.Optional[str] = OMIT,
        physical_zip: typing.Optional[str] = OMIT,
        physical_city: typing.Optional[str] = OMIT,
        physical_country: typing.Optional[str] = OMIT,
        bank_account_no: typing.Optional[str] = OMIT,
        bank_blz: typing.Optional[str] = OMIT,
        bank_institute: typing.Optional[str] = OMIT,
        bank_bic: typing.Optional[str] = OMIT,
        bank_iban: typing.Optional[str] = OMIT,
        notes: typing.Optional[str] = OMIT,
        color: typing.Optional[str] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: int. The id of the company

            - name: typing.Optional[str].

            - contact_type: typing.Optional[str].

            - phone: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - website: typing.Optional[str].

            - twitter: typing.Optional[str].

            - ust_idnr: typing.Optional[str].

            - delivery_method: typing.Optional[str].

            - postal_street: typing.Optional[str].

            - postal_zip: typing.Optional[str].

            - postal_city: typing.Optional[str].

            - postal_country: typing.Optional[str].

            - physical_street: typing.Optional[str].

            - physical_zip: typing.Optional[str].

            - physical_city: typing.Optional[str].

            - physical_country: typing.Optional[str].

            - bank_account_no: typing.Optional[str].

            - bank_blz: typing.Optional[str].

            - bank_institute: typing.Optional[str].

            - bank_bic: typing.Optional[str].

            - bank_iban: typing.Optional[str].

            - notes: typing.Optional[str].

            - color: typing.Optional[str].
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_unternehmen.update_a_company(id=1, )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if name is not OMIT:
            _request["name"] = name
        if contact_type is not OMIT:
            _request["contact_type"] = contact_type
        if phone is not OMIT:
            _request["phone"] = phone
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if website is not OMIT:
            _request["website"] = website
        if twitter is not OMIT:
            _request["twitter"] = twitter
        if ust_idnr is not OMIT:
            _request["ust_idnr"] = ust_idnr
        if delivery_method is not OMIT:
            _request["delivery_method"] = delivery_method
        if postal_street is not OMIT:
            _request["postal_street"] = postal_street
        if postal_zip is not OMIT:
            _request["postal_zip"] = postal_zip
        if postal_city is not OMIT:
            _request["postal_city"] = postal_city
        if postal_country is not OMIT:
            _request["postal_country"] = postal_country
        if physical_street is not OMIT:
            _request["physical_street"] = physical_street
        if physical_zip is not OMIT:
            _request["physical_zip"] = physical_zip
        if physical_city is not OMIT:
            _request["physical_city"] = physical_city
        if physical_country is not OMIT:
            _request["physical_country"] = physical_country
        if bank_account_no is not OMIT:
            _request["bank_account_no"] = bank_account_no
        if bank_blz is not OMIT:
            _request["bank_blz"] = bank_blz
        if bank_institute is not OMIT:
            _request["bank_institute"] = bank_institute
        if bank_bic is not OMIT:
            _request["bank_bic"] = bank_bic
        if bank_iban is not OMIT:
            _request["bank_iban"] = bank_iban
        if notes is not OMIT:
            _request["notes"] = notes
        if color is not OMIT:
            _request["color"] = color
        _response = self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}"),
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

    def delete_a_company(self, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: int. The id of the company
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_unternehmen.delete_a_company(id=1, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}"),
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

    def archive_a_company(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the company
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_unternehmen.archive_a_company(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}/archive"),
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

    def unarchive_a_company(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the company
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_unternehmen.unarchive_a_company(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}/unarchive"),
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


class AsyncContactCompanyUnternehmenClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def list_all_companies(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetContactCompaniesRequestOrderDirectionItem, typing.List[GetContactCompaniesRequestOrderDirectionItem]
            ]
        ] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetContactCompaniesRequestOrderDirectionItem, typing.List[GetContactCompaniesRequestOrderDirectionItem]]]. Order direction (must be used with order_by)
        ---
        from feliche-93 import GetContactCompaniesRequestOrderDirectionItem
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_unternehmen.list_all_companies(order_direction=GetContactCompaniesRequestOrderDirectionItem.ASC, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "contact/companies"),
            params=remove_none_from_dict(
                {"page": page, "page_size": page_size, "order_by": order_by, "order_direction": order_direction}
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

    async def create_a_company(
        self,
        *,
        name: str,
        contact_type: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        website: typing.Optional[str] = OMIT,
        twitter: typing.Optional[str] = OMIT,
        ust_idnr: typing.Optional[str] = OMIT,
        delivery_method: typing.Optional[str] = OMIT,
        postal_street: typing.Optional[str] = OMIT,
        postal_zip: typing.Optional[str] = OMIT,
        postal_city: typing.Optional[str] = OMIT,
        postal_country: typing.Optional[str] = OMIT,
        physical_street: typing.Optional[str] = OMIT,
        physical_zip: typing.Optional[str] = OMIT,
        physical_city: typing.Optional[str] = OMIT,
        physical_country: typing.Optional[str] = OMIT,
        bank_account_no: typing.Optional[str] = OMIT,
        bank_blz: typing.Optional[str] = OMIT,
        bank_institute: typing.Optional[str] = OMIT,
        bank_bic: typing.Optional[str] = OMIT,
        bank_iban: typing.Optional[str] = OMIT,
        notes: typing.Optional[str] = OMIT,
        color: typing.Optional[str] = OMIT,
        people: typing.Optional[typing.List[PostContactCompaniesRequestPeopleItem]] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - name: str.

            - contact_type: typing.Optional[str].

            - phone: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - website: typing.Optional[str].

            - twitter: typing.Optional[str].

            - ust_idnr: typing.Optional[str].

            - delivery_method: typing.Optional[str].

            - postal_street: typing.Optional[str].

            - postal_zip: typing.Optional[str].

            - postal_city: typing.Optional[str].

            - postal_country: typing.Optional[str].

            - physical_street: typing.Optional[str].

            - physical_zip: typing.Optional[str].

            - physical_city: typing.Optional[str].

            - physical_country: typing.Optional[str].

            - bank_account_no: typing.Optional[str].

            - bank_blz: typing.Optional[str].

            - bank_institute: typing.Optional[str].

            - bank_bic: typing.Optional[str].

            - bank_iban: typing.Optional[str].

            - notes: typing.Optional[str].

            - color: typing.Optional[str].

            - people: typing.Optional[typing.List[PostContactCompaniesRequestPeopleItem]].
        """
        _request: typing.Dict[str, typing.Any] = {"name": name}
        if contact_type is not OMIT:
            _request["contact_type"] = contact_type
        if phone is not OMIT:
            _request["phone"] = phone
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if website is not OMIT:
            _request["website"] = website
        if twitter is not OMIT:
            _request["twitter"] = twitter
        if ust_idnr is not OMIT:
            _request["ust_idnr"] = ust_idnr
        if delivery_method is not OMIT:
            _request["delivery_method"] = delivery_method
        if postal_street is not OMIT:
            _request["postal_street"] = postal_street
        if postal_zip is not OMIT:
            _request["postal_zip"] = postal_zip
        if postal_city is not OMIT:
            _request["postal_city"] = postal_city
        if postal_country is not OMIT:
            _request["postal_country"] = postal_country
        if physical_street is not OMIT:
            _request["physical_street"] = physical_street
        if physical_zip is not OMIT:
            _request["physical_zip"] = physical_zip
        if physical_city is not OMIT:
            _request["physical_city"] = physical_city
        if physical_country is not OMIT:
            _request["physical_country"] = physical_country
        if bank_account_no is not OMIT:
            _request["bank_account_no"] = bank_account_no
        if bank_blz is not OMIT:
            _request["bank_blz"] = bank_blz
        if bank_institute is not OMIT:
            _request["bank_institute"] = bank_institute
        if bank_bic is not OMIT:
            _request["bank_bic"] = bank_bic
        if bank_iban is not OMIT:
            _request["bank_iban"] = bank_iban
        if notes is not OMIT:
            _request["notes"] = notes
        if color is not OMIT:
            _request["color"] = color
        if people is not OMIT:
            _request["people"] = people
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "contact/companies"),
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

    async def retrieves_a_company(self, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: int. The id of the company
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_unternehmen.retrieves_a_company(id=1, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}"),
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

    async def update_a_company(
        self,
        id: int,
        *,
        name: typing.Optional[str] = OMIT,
        contact_type: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        website: typing.Optional[str] = OMIT,
        twitter: typing.Optional[str] = OMIT,
        ust_idnr: typing.Optional[str] = OMIT,
        delivery_method: typing.Optional[str] = OMIT,
        postal_street: typing.Optional[str] = OMIT,
        postal_zip: typing.Optional[str] = OMIT,
        postal_city: typing.Optional[str] = OMIT,
        postal_country: typing.Optional[str] = OMIT,
        physical_street: typing.Optional[str] = OMIT,
        physical_zip: typing.Optional[str] = OMIT,
        physical_city: typing.Optional[str] = OMIT,
        physical_country: typing.Optional[str] = OMIT,
        bank_account_no: typing.Optional[str] = OMIT,
        bank_blz: typing.Optional[str] = OMIT,
        bank_institute: typing.Optional[str] = OMIT,
        bank_bic: typing.Optional[str] = OMIT,
        bank_iban: typing.Optional[str] = OMIT,
        notes: typing.Optional[str] = OMIT,
        color: typing.Optional[str] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: int. The id of the company

            - name: typing.Optional[str].

            - contact_type: typing.Optional[str].

            - phone: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - website: typing.Optional[str].

            - twitter: typing.Optional[str].

            - ust_idnr: typing.Optional[str].

            - delivery_method: typing.Optional[str].

            - postal_street: typing.Optional[str].

            - postal_zip: typing.Optional[str].

            - postal_city: typing.Optional[str].

            - postal_country: typing.Optional[str].

            - physical_street: typing.Optional[str].

            - physical_zip: typing.Optional[str].

            - physical_city: typing.Optional[str].

            - physical_country: typing.Optional[str].

            - bank_account_no: typing.Optional[str].

            - bank_blz: typing.Optional[str].

            - bank_institute: typing.Optional[str].

            - bank_bic: typing.Optional[str].

            - bank_iban: typing.Optional[str].

            - notes: typing.Optional[str].

            - color: typing.Optional[str].
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_unternehmen.update_a_company(id=1, )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if name is not OMIT:
            _request["name"] = name
        if contact_type is not OMIT:
            _request["contact_type"] = contact_type
        if phone is not OMIT:
            _request["phone"] = phone
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if website is not OMIT:
            _request["website"] = website
        if twitter is not OMIT:
            _request["twitter"] = twitter
        if ust_idnr is not OMIT:
            _request["ust_idnr"] = ust_idnr
        if delivery_method is not OMIT:
            _request["delivery_method"] = delivery_method
        if postal_street is not OMIT:
            _request["postal_street"] = postal_street
        if postal_zip is not OMIT:
            _request["postal_zip"] = postal_zip
        if postal_city is not OMIT:
            _request["postal_city"] = postal_city
        if postal_country is not OMIT:
            _request["postal_country"] = postal_country
        if physical_street is not OMIT:
            _request["physical_street"] = physical_street
        if physical_zip is not OMIT:
            _request["physical_zip"] = physical_zip
        if physical_city is not OMIT:
            _request["physical_city"] = physical_city
        if physical_country is not OMIT:
            _request["physical_country"] = physical_country
        if bank_account_no is not OMIT:
            _request["bank_account_no"] = bank_account_no
        if bank_blz is not OMIT:
            _request["bank_blz"] = bank_blz
        if bank_institute is not OMIT:
            _request["bank_institute"] = bank_institute
        if bank_bic is not OMIT:
            _request["bank_bic"] = bank_bic
        if bank_iban is not OMIT:
            _request["bank_iban"] = bank_iban
        if notes is not OMIT:
            _request["notes"] = notes
        if color is not OMIT:
            _request["color"] = color
        _response = await self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}"),
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

    async def delete_a_company(self, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: int. The id of the company
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_unternehmen.delete_a_company(id=1, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}"),
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

    async def archive_a_company(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the company
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_unternehmen.archive_a_company(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}/archive"),
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

    async def unarchive_a_company(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the company
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_unternehmen.unarchive_a_company(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{id}/unarchive"),
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
