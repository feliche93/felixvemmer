# This file was auto-generated by Fern from our API Definition.

import datetime as dt
import typing

from ..core.datetime_utils import serialize_datetime
from .put_expense_vouchers_id_request_line_items_item_billing import PutExpenseVouchersIdRequestLineItemsItemBilling
from .put_expense_vouchers_id_request_line_items_item_depreciation import (
    PutExpenseVouchersIdRequestLineItemsItemDepreciation,
)

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore


class PutExpenseVouchersIdRequestLineItemsItem(pydantic.BaseModel):
    amount: typing.Optional[float]
    name: typing.Optional[str]
    vat_rate: str
    category: typing.Optional[str]
    billing: typing.Optional[PutExpenseVouchersIdRequestLineItemsItemBilling]
    depreciation: typing.Optional[PutExpenseVouchersIdRequestLineItemsItemDepreciation]

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().dict(**kwargs_with_defaults)

    class Config:
        frozen = True
        smart_union = True
        json_encoders = {dt.datetime: serialize_datetime}
