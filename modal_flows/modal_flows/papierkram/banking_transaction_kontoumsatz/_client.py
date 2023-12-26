# This file was auto-generated by Fern from our API Definition.

import typing
import urllib.parse
from json.decoder import JSONDecodeError

from ..core.api_error import ApiError
from ..core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from ..core.remove_none_from_dict import remove_none_from_dict
from ..not_found_error import NotFoundError
from .get_banking_transactions_request_order_direction_item import GetBankingTransactionsRequestOrderDirectionItem

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore


class BankingTransactionKontoumsatzClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def list_all_banking_transactions(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetBankingTransactionsRequestOrderDirectionItem,
                typing.List[GetBankingTransactionsRequestOrderDirectionItem],
            ]
        ] = None,
        bank_connection_id: typing.Optional[int] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetBankingTransactionsRequestOrderDirectionItem, typing.List[GetBankingTransactionsRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - bank_connection_id: typing.Optional[int]. Filter by bank connection id
        ---
        from feliche-93 import GetBankingTransactionsRequestOrderDirectionItem
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.banking_transaction_kontoumsatz.list_all_banking_transactions(order_direction=GetBankingTransactionsRequestOrderDirectionItem.ASC, )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "banking/transactions"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "bank_connection_id": bank_connection_id,
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

    def retrieves_a_banking_transaction(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the transaction
        ---
        from feliche-93.client import PapierkramClient

        client = PapierkramClient(token="YOUR_TOKEN", )
        client.banking_transaction_kontoumsatz.retrieves_a_banking_transaction(id="id", )
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"banking/transactions/{id}"),
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


class AsyncBankingTransactionKontoumsatzClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def list_all_banking_transactions(
        self,
        *,
        page: typing.Optional[int] = None,
        page_size: typing.Optional[int] = None,
        order_by: typing.Optional[str] = None,
        order_direction: typing.Optional[
            typing.Union[
                GetBankingTransactionsRequestOrderDirectionItem,
                typing.List[GetBankingTransactionsRequestOrderDirectionItem],
            ]
        ] = None,
        bank_connection_id: typing.Optional[int] = None,
    ) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - page: typing.Optional[int]. Page number

            - page_size: typing.Optional[int]. Page size (1-100)

            - order_by: typing.Optional[str]. Order by field (must be used with order_direction)

            - order_direction: typing.Optional[typing.Union[GetBankingTransactionsRequestOrderDirectionItem, typing.List[GetBankingTransactionsRequestOrderDirectionItem]]]. Order direction (must be used with order_by)

            - bank_connection_id: typing.Optional[int]. Filter by bank connection id
        ---
        from feliche-93 import GetBankingTransactionsRequestOrderDirectionItem
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.banking_transaction_kontoumsatz.list_all_banking_transactions(order_direction=GetBankingTransactionsRequestOrderDirectionItem.ASC, )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "banking/transactions"),
            params=remove_none_from_dict(
                {
                    "page": page,
                    "page_size": page_size,
                    "order_by": order_by,
                    "order_direction": order_direction,
                    "bank_connection_id": bank_connection_id,
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

    async def retrieves_a_banking_transaction(self, id: str) -> None:
        """
        Cost in API Credits: 1

        Parameters:
            - id: str. The id of the transaction
        ---
        from feliche-93.client import AsyncPapierkramClient

        client = AsyncPapierkramClient(token="YOUR_TOKEN", )
        await client.banking_transaction_kontoumsatz.retrieves_a_banking_transaction(id="id", )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"banking/transactions/{id}"),
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