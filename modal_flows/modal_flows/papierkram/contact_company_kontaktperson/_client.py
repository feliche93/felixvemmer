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
from .get_contact_companies_company_id_persons_request_order_direction_item import (
    GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem,
)

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class ContactCompanyKontaktpersonClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def list_all_persons(
        self,
        company_id: int,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem,
                typing.List[GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem],
            ]
        ] = None,
    ) -> None:
        """
        Cost in API Credits: 1
        
        Parameters:
            - company_id: int. The id of the company
            
            - page: typing.Optional[int]. Page number
            
            - page_size: typing.Optional[int]. Page size (1-100)
            
            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)
            
            - order_direction: typing.Optional[typing.Union[GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem, typing.List[GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem]]]. Order direction (must be used with order_by)
        ---
        from feliche-93 import \
            GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem
        from feliche-93.client import PapierkramClient
        
        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_kontaktperson.list_all_persons(company_id=1, order_direction=GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem.ASC, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons"),
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

    def create_a_person(
        self,
        company_id: int,
        *,
        title: typing.Optional[str] = OMIT,
        salutation: typing.Optional[str] = OMIT,
        first_name: str,
        last_name: str,
        position: typing.Optional[str] = OMIT,
        department: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        skype: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        mobile: typing.Optional[str] = OMIT,
        comment: typing.Optional[str] = OMIT,
        default: typing.Optional[str] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - company_id: int. The id of the company

            - title: typing.Optional[str].

            - salutation: typing.Optional[str].

            - first_name: str.

            - last_name: str.

            - position: typing.Optional[str].

            - department: typing.Optional[str].

            - phone: typing.Optional[str].

            - skype: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - flagged: typing.Optional[str].

            - mobile: typing.Optional[str].

            - comment: typing.Optional[str].

            - default: typing.Optional[str].
        """
        _request: typing.Dict[str, typing.Any] = {"first_name": first_name, "last_name": last_name}
        if title is not OMIT:
            _request["title"] = title
        if salutation is not OMIT:
            _request["salutation"] = salutation
        if position is not OMIT:
            _request["position"] = position
        if department is not OMIT:
            _request["department"] = department
        if phone is not OMIT:
            _request["phone"] = phone
        if skype is not OMIT:
            _request["skype"] = skype
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if mobile is not OMIT:
            _request["mobile"] = mobile
        if comment is not OMIT:
            _request["comment"] = comment
        if default is not OMIT:
            _request["default"] = default
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons"),
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

    def retrieves_a_person(self, company_id: int, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - company_id: int. The id of the company

            - id: int. The id of the person
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_kontaktperson.retrieves_a_person(company_id=1, id=1, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons/{id}"
            ),
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

    def update_a_person(
        self,
        company_id: int,
        id: int,
        *,
        title: typing.Optional[str] = OMIT,
        salutation: typing.Optional[str] = OMIT,
        first_name: typing.Optional[str] = OMIT,
        last_name: typing.Optional[str] = OMIT,
        position: typing.Optional[str] = OMIT,
        department: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        skype: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        mobile: typing.Optional[str] = OMIT,
        comment: typing.Optional[str] = OMIT,
        default: typing.Optional[str] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - company_id: int. The id of the company

            - id: int. The id of the person

            - title: typing.Optional[str].

            - salutation: typing.Optional[str].

            - first_name: typing.Optional[str].

            - last_name: typing.Optional[str].

            - position: typing.Optional[str].

            - department: typing.Optional[str].

            - phone: typing.Optional[str].

            - skype: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - flagged: typing.Optional[str].

            - mobile: typing.Optional[str].

            - comment: typing.Optional[str].

            - default: typing.Optional[str].
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_kontaktperson.update_a_person(company_id=1, id=1, )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if title is not OMIT:
            _request["title"] = title
        if salutation is not OMIT:
            _request["salutation"] = salutation
        if first_name is not OMIT:
            _request["first_name"] = first_name
        if last_name is not OMIT:
            _request["last_name"] = last_name
        if position is not OMIT:
            _request["position"] = position
        if department is not OMIT:
            _request["department"] = department
        if phone is not OMIT:
            _request["phone"] = phone
        if skype is not OMIT:
            _request["skype"] = skype
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if mobile is not OMIT:
            _request["mobile"] = mobile
        if comment is not OMIT:
            _request["comment"] = comment
        if default is not OMIT:
            _request["default"] = default
        _response = self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons/{id}"
            ),
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

    def delete_a_person(self, company_id: int, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - company_id: int. The id of the company

            - id: int. The id of the person
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.contact_company_kontaktperson.delete_a_person(company_id=1, id=1, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons/{id}"
            ),
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


class AsyncContactCompanyKontaktpersonClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def list_all_persons(
        self,
        company_id: int,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem,
                typing.List[GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem],
            ]
        ] = None,
    ) -> None:
        """
        Cost in API Credits: 1
        
        Parameters:
            - company_id: int. The id of the company
            
            - page: typing.Optional[int]. Page number
            
            - page_size: typing.Optional[int]. Page size (1-100)
            
            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)
            
            - order_direction: typing.Optional[typing.Union[GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem, typing.List[GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem]]]. Order direction (must be used with order_by)
        ---
        from feliche-93 import \
            GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem
        from feliche-93.client import AsyncPapierkramClient
        
        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_kontaktperson.list_all_persons(company_id=1, order_direction=GetContactCompaniesCompanyIdPersonsRequestOrderDirectionItem.ASC, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons"),
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

    async def create_a_person(
        self,
        company_id: int,
        *,
        title: typing.Optional[str] = OMIT,
        salutation: typing.Optional[str] = OMIT,
        first_name: str,
        last_name: str,
        position: typing.Optional[str] = OMIT,
        department: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        skype: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        mobile: typing.Optional[str] = OMIT,
        comment: typing.Optional[str] = OMIT,
        default: typing.Optional[str] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 10

        Parameters:
            - company_id: int. The id of the company

            - title: typing.Optional[str].

            - salutation: typing.Optional[str].

            - first_name: str.

            - last_name: str.

            - position: typing.Optional[str].

            - department: typing.Optional[str].

            - phone: typing.Optional[str].

            - skype: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - flagged: typing.Optional[str].

            - mobile: typing.Optional[str].

            - comment: typing.Optional[str].

            - default: typing.Optional[str].
        """
        _request: typing.Dict[str, typing.Any] = {"first_name": first_name, "last_name": last_name}
        if title is not OMIT:
            _request["title"] = title
        if salutation is not OMIT:
            _request["salutation"] = salutation
        if position is not OMIT:
            _request["position"] = position
        if department is not OMIT:
            _request["department"] = department
        if phone is not OMIT:
            _request["phone"] = phone
        if skype is not OMIT:
            _request["skype"] = skype
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if mobile is not OMIT:
            _request["mobile"] = mobile
        if comment is not OMIT:
            _request["comment"] = comment
        if default is not OMIT:
            _request["default"] = default
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons"),
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

    async def retrieves_a_person(self, company_id: int, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - company_id: int. The id of the company

            - id: int. The id of the person
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_kontaktperson.retrieves_a_person(company_id=1, id=1, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons/{id}"
            ),
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

    async def update_a_person(
        self,
        company_id: int,
        id: int,
        *,
        title: typing.Optional[str] = OMIT,
        salutation: typing.Optional[str] = OMIT,
        first_name: typing.Optional[str] = OMIT,
        last_name: typing.Optional[str] = OMIT,
        position: typing.Optional[str] = OMIT,
        department: typing.Optional[str] = OMIT,
        phone: typing.Optional[str] = OMIT,
        skype: typing.Optional[str] = OMIT,
        fax: typing.Optional[str] = OMIT,
        email: typing.Optional[str] = OMIT,
        flagged: typing.Optional[str] = OMIT,
        mobile: typing.Optional[str] = OMIT,
        comment: typing.Optional[str] = OMIT,
        default: typing.Optional[str] = OMIT,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - company_id: int. The id of the company

            - id: int. The id of the person

            - title: typing.Optional[str].

            - salutation: typing.Optional[str].

            - first_name: typing.Optional[str].

            - last_name: typing.Optional[str].

            - position: typing.Optional[str].

            - department: typing.Optional[str].

            - phone: typing.Optional[str].

            - skype: typing.Optional[str].

            - fax: typing.Optional[str].

            - email: typing.Optional[str].

            - flagged: typing.Optional[str].

            - mobile: typing.Optional[str].

            - comment: typing.Optional[str].

            - default: typing.Optional[str].
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_kontaktperson.update_a_person(company_id=1, id=1, )
        """
        _request: typing.Dict[str, typing.Any] = {}
        if title is not OMIT:
            _request["title"] = title
        if salutation is not OMIT:
            _request["salutation"] = salutation
        if first_name is not OMIT:
            _request["first_name"] = first_name
        if last_name is not OMIT:
            _request["last_name"] = last_name
        if position is not OMIT:
            _request["position"] = position
        if department is not OMIT:
            _request["department"] = department
        if phone is not OMIT:
            _request["phone"] = phone
        if skype is not OMIT:
            _request["skype"] = skype
        if fax is not OMIT:
            _request["fax"] = fax
        if email is not OMIT:
            _request["email"] = email
        if flagged is not OMIT:
            _request["flagged"] = flagged
        if mobile is not OMIT:
            _request["mobile"] = mobile
        if comment is not OMIT:
            _request["comment"] = comment
        if default is not OMIT:
            _request["default"] = default
        _response = await self._client_wrapper.httpx_client.request(
            "PUT",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons/{id}"
            ),
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

    async def delete_a_person(self, company_id: int, id: int) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - company_id: int. The id of the company

            - id: int. The id of the person
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.contact_company_kontaktperson.delete_a_person(company_id=1, id=1, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", f"contact/companies/{company_id}/persons/{id}"
            ),
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
