# This file was auto-generated by Fern from our API Definition.

import enum
import typing

T_Result = typing.TypeVar("T_Result")


class GetTrackerTimeEntriesRequestBillingState(str, enum.Enum):
    BILLED = "billed"
    UNBILLED = "unbilled"
    BILLABLE = "billable"
    UNBILLABLE = "unbillable"
    ARCHIVED = "archived"

    def visit(
        self,
        billed: typing.Callable[[], T_Result],
        unbilled: typing.Callable[[], T_Result],
        billable: typing.Callable[[], T_Result],
        unbillable: typing.Callable[[], T_Result],
        archived: typing.Callable[[], T_Result],
    ) -> T_Result:
        if self is GetTrackerTimeEntriesRequestBillingState.BILLED:
            return billed()
        if self is GetTrackerTimeEntriesRequestBillingState.UNBILLED:
            return unbilled()
        if self is GetTrackerTimeEntriesRequestBillingState.BILLABLE:
            return billable()
        if self is GetTrackerTimeEntriesRequestBillingState.UNBILLABLE:
            return unbillable()
        if self is GetTrackerTimeEntriesRequestBillingState.ARCHIVED:
            return archived()