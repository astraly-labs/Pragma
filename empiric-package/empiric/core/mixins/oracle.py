import collections
import logging
from typing import List, Optional

from empiric.core.contract import Contract
from empiric.core.entry import FutureEntry, SpotEntry
from empiric.core.types import AggregationMode
from empiric.core.utils import str_to_felt
from starknet_py.contract import InvokeResult
from starknet_py.net.client import Client

logger = logging.getLogger(__name__)

OracleResponse = collections.namedtuple(
    "OracleResponse",
    ["price", "decimals", "last_updated_timestamp", "num_sources_aggregated"],
)


class OracleMixin:
    publisher_registry: Contract
    client: Client

    async def publish_spot_entry(
        self,
        pair_id: int,
        value: int,
        timestamp: int,
        source: int,
        publisher: int,
        volume: int = 0,
        max_fee: int = int(1e18),
    ) -> InvokeResult:
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        invocation = await self.oracle.publish_spot_entry.invoke(
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
        self,
        entries: List[SpotEntry],
        pagination: Optional[int] = 80,
        max_fee=int(1e18),
    ) -> List[InvokeResult]:
        if len(entries) == 0:
            logger.warning("Skipping publishing as entries array is empty")
            return

        invocations = []
        serialized_spot_entries = SpotEntry.serialize_entries(entries)
        if pagination:
            ix = 0
            while ix < len(serialized_spot_entries):
                entries_subset = serialized_spot_entries[ix : ix + pagination]
                invocation = await self.oracle.publish_spot_entries.invoke(
                    entries_subset,
                    callback=self.track_nonce,
                    max_fee=max_fee,
                )
                ix += pagination
                invocations.append(invocation)
                logger.debug(str(invocation))
                logger.info(
                    f"Sent {len(entries_subset)} updated spot entries with transaction {hex(invocation.hash)}"
                )
        else:
            invocation = await self.oracle.publish_spot_entries.invoke(
                serialized_spot_entries, max_fee=max_fee
            )
            invocations.append(invocation)
            logger.debug(str(invocation))
            logger.info(
                f"Sent {len(serialized_spot_entries)} updated spot entries with transaction {hex(invocation.hash)}"
            )

        serialized_future_entries = FutureEntry.serialize_entries(entries)
        if pagination:
            ix = 0
            while ix < len(serialized_future_entries):
                entries_subset = serialized_future_entries[ix : ix + pagination]
                invocation = await self.oracle.publish_future_entries.invoke(
                    entries_subset,
                    callback=self.track_nonce,
                    max_fee=max_fee,
                )
                ix += pagination
                invocations.append(invocation)
                logger.debug(str(invocation))
                logger.info(
                    f"Sent {len(entries_subset)} updated future entries with transaction {hex(invocation.hash)}"
                )
        else:
            invocation = await self.oracle.publish_future_entries.invoke(
                serialized_future_entries, max_fee=max_fee
            )
            invocations.append(invocation)
            logger.debug(str(invocation))
            logger.info(
                f"Sent {len(serialized_future_entries)} updated future entries with transaction {hex(invocation.hash)}"
            )

        return invocations

    async def get_entries(self, pair_id, sources=[]) -> List[SpotEntry]:
        if isinstance(pair_id, str):
            pair_id = str_to_felt(pair_id)
        elif not isinstance(pair_id, int):
            raise TypeError(
                "Pair ID must be string (will be converted to felt) or integer"
            )
        response = await self.oracle.get_spot_entries.call(pair_id, sources)

        return [SpotEntry.from_dict(entry) for entry in response.entries]

    async def get_spot(
        self,
        pair_id,
        aggregation_mode: AggregationMode = AggregationMode.MEDIAN,
        sources=None,
    ) -> OracleResponse:
        if isinstance(pair_id, str):
            pair_id = str_to_felt(pair_id)
        elif not isinstance(pair_id, int):
            raise TypeError(
                "Pair ID must be string (will be converted to felt) or integer"
            )
        if sources is None:
            response = await self.oracle.get_spot.call(
                pair_id,
                aggregation_mode.value,
            )
        else:
            response = await self.oracle.get_spot_for_sources.call(
                pair_id, aggregation_mode.value, sources
            )

        return OracleResponse(
            response.price,
            response.decimals,
            response.last_updated_timestamp,
            response.num_sources_aggregated,
        )

    async def get_future(
        self,
        pair_id,
        expiry_timestamp,
        aggregation_mode: AggregationMode = AggregationMode.MEDIAN,
        # TODO Add sources on the oracle contract and then in the client here
        # sources=None,
    ) -> OracleResponse:
        if isinstance(pair_id, str):
            pair_id = str_to_felt(pair_id)
        elif not isinstance(pair_id, int):
            raise TypeError(
                "Pair ID must be string (will be converted to felt) or integer"
            )

        response = await self.oracle.get_future.call(
            pair_id,
            expiry_timestamp,
            aggregation_mode.value,
        )

        return OracleResponse(
            response.price,
            response.decimals,
            response.last_updated_timestamp,
            response.num_sources_aggregated,
        )

    async def get_spot_decimals(self, pair_id) -> int:
        if isinstance(pair_id, str):
            pair_id = str_to_felt(pair_id)
        elif not isinstance(pair_id, int):
            raise TypeError(
                "Pair ID must be string (will be converted to felt) or integer"
            )

        response = await self.oracle.get_spot_decimals.call(
            pair_id,
        )

        return response

    async def set_checkpoint(
        self,
        pair_id: int,
        aggregation_mode: int = str_to_felt("MEDIAN"),
        max_fee=int(1e16),
    ) -> InvokeResult:
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        invocation = await self.oracle.set_checkpoint.invoke(
            pair_id,
            aggregation_mode,
            callback=self.track_nonce,
            max_fee=max_fee,
        )
        return invocation

    async def set_checkpoints(
        self,
        pair_ids: List[int],
        aggregation_mode: int = str_to_felt("MEDIAN"),
        max_fee=int(1e18),
    ) -> InvokeResult:
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        invocation = await self.oracle.set_checkpoints.invoke(
            pair_ids,
            aggregation_mode,
            callback=self.track_nonce,
            max_fee=max_fee,
        )
        return invocation
