import logging
from typing import List

from empiric.core.contract import Contract
from empiric.core.entry import Entry
from empiric.core.types import AggregationMode
from empiric.core.utils import str_to_felt
from starknet_py.contract import InvokeResult
from starknet_py.net.client import Client

logger = logging.getLogger(__name__)


class OracleMixin:
    oracle: Contract
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
        estimate_fee: bool = False
    ) -> InvokeResult:
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        prepared_call = self.oracle.publish_entry.prepare(
            {
                "pair_id": pair_id,
                "value": value,
                "timestamp": timestamp,
                "source": source,
                "publisher": publisher,
            },
        )

        max_fee_to_use = max_fee
        if estimate_fee == True:
            fee =  await prepared_call.estimate_fee()
            logger.info("estimated overall fee :", fee.overall_fee)
            logger.info("estimated gas usage :", fee.gas_usage)
            logger.info("estimated gas price :", fee.gas_price)
            max_fee_to_use = int(fee.overall_fee * 1.1) 

        invocation = await prepared_call.invoke(
            max_fee= max_fee_to_use,
        )

        return invocation

    async def publish_many(
        self, entries: List[Entry], pagination=0, max_fee=int(1e16), estimate_fee: bool = False
    ) -> InvokeResult:
        if len(entries) == 0:
            logger.warn("Skipping publishing as entries array is empty")
            return
        max_fee_to_use = max_fee
        if pagination:
            ix = 0
            while ix < len(entries):

                prepared_call = self.oracle.publish_entries.prepare(
                    Entry.serialize_entries(entries[ix : ix + pagination]),
                )

                if estimate_fee == True:
                    fee =  await prepared_call.estimate_fee()
                    logger.info("estimated overall fee :", fee.overall_fee, " for page", ix)
                    logger.info("estimated gas usage :", fee.gas_usage, " for page", ix)
                    logger.info("estimated gas price :", fee.gas_price, " for page", ix)
                    max_fee_to_use = int(fee.overall_fee * 1.1) 

                invocation = await prepared_call.invoke(
                    max_fee= max_fee_to_use,
                )

                ix += pagination
        else:
            prepared_call = self.oracle.publish_entries.prepare(
                    Entry.serialize_entries(entries)
                )
            if estimate_fee == True:
                fee =  await prepared_call.estimate_fee()
                logger.info("estimated overall fee :", fee.overall_fee, )
                logger.info("estimated gas usage :", fee.gas_usage, )
                logger.info("estimated gas price :", fee.gas_price, )
                max_fee_to_use = int(fee.overall_fee * 1.1) 
    
            invocation = await prepared_call.invoke(
                    max_fee= max_fee_to_use,
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
