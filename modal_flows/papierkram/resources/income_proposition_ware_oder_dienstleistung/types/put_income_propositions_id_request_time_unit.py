# This file was auto-generated by Fern from our API Definition.

import enum
import typing

T_Result = typing.TypeVar("T_Result")


class PutIncomePropositionsIdRequestTimeUnit(str, enum.Enum):
    HOUR = "hour"
    DAY = "day"

    def visit(self, hour: typing.Callable[[], T_Result], day: typing.Callable[[], T_Result]) -> T_Result:
        if self is PutIncomePropositionsIdRequestTimeUnit.HOUR:
            return hour()
        if self is PutIncomePropositionsIdRequestTimeUnit.DAY:
            return day()
