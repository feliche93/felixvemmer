# This file was auto-generated by Fern from our API Definition.

import enum
import typing

T_Result = typing.TypeVar("T_Result")


class GetContactCompaniesRequestOrderDirectionItem(str, enum.Enum):
    ASC = "asc"
    DESC = "desc"

    def visit(self, asc: typing.Callable[[], T_Result], desc: typing.Callable[[], T_Result]) -> T_Result:
        if self is GetContactCompaniesRequestOrderDirectionItem.ASC:
            return asc()
        if self is GetContactCompaniesRequestOrderDirectionItem.DESC:
            return desc()
