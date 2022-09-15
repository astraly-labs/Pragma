import logging
from typing import List

from empiric.core_.contract import Contract
from empiric.core_.entry import Entry
from empiric.core_.types import AggregationMode
from empiric.core_.utils import str_to_felt
from starknet_py.contract import InvokeResult
from starknet_py.net.client import Client

logger = logging.getLogger(__name__)


class OracleMixin:
    publisher_registry: Contract
    client: Client

    async def publish_entry(
        self,
        pair_id: int,
        value: int,
        timestamp: int,
        source: int,
        publisher: int,
        volume: int = 0,
        max_fee: int = int(1e16),
    ) -> InvokeResult:
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        invocation = await self.oracle.publish_entry.invoke(
            {
                "pair_id": pair_id,
                "value": value,
                "timestamp": timestamp,
                "source": source,
                "publisher": publisher,
            },
            max_fee=max_fee,
        )
        return invocation

    async def publish_many(
        self, entries: List[Entry], pagination=0, max_fee=int(1e16)
    ) -> InvokeResult:
        if len(entries) == 0:
            logger.warn("Skipping publishing as entries array is empty")
            return

        if pagination:
            ix = 0
            while ix < len(entries):
                invocation = await self.oracle.publish_entries.invoke(
                    Entry.serialize_entries(entries[ix : ix + pagination]),
                    max_fee=max_fee,
                )
                ix += pagination
        else:
            invocation = await self.oracle.publish_entries.invoke(
                Entry.serialize_entries(entries), max_fee=max_fee
            )

        logger.info(
            f"Sent {len(entries)} updated entries with transaction {invocation.hash}"
        )

        return invocation

    async def get_entries(self, pair_id, sources=[]) -> List[Entry]:
        if isinstance(pair_id, str):
            pair_id = str_to_felt(pair_id)
        elif not isinstance(pair_id, int):
            raise TypeError(
                "Pair ID must be string (will be converted to felt) or integer"
            )
        response = await self.oracle.get_entries.call(pair_id, sources)

        return [Entry.from_dict(entry) for entry in response.entries]

    async def get_value(
        self,
        pair_id,
        aggregation_mode: AggregationMode = AggregationMode.MEDIAN,
        sources=None,
    ) -> Entry:
        if isinstance(pair_id, str):
            pair_id = str_to_felt(pair_id)
        elif not isinstance(pair_id, int):
            raise TypeError(
                "Pair ID must be string (will be converted to felt) or integer"
            )
        if sources is None:
            response = await self.oracle.get_value.call(
                pair_id,
                aggregation_mode.value,
            )
        else:
            response = await self.oracle.get_value_for_sources.call(
                pair_id, aggregation_mode.value, sources
            )

        return (
            response.value,
            response.decimals,
            response.last_updated_timestamp,
            response.num_sources_aggregated,
        )