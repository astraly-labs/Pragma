import logging
from typing import List, Optional

from empiric.core.base_client import EmpiricAccountClient, EmpiricBaseClient
from empiric.core.config import get_config
from empiric.core.entry import Entry
from empiric.core.types import ADDRESS, HEX_STR, TESTNET, Network

logger = logging.getLogger(__name__)


class EmpiricPublisherClient(EmpiricBaseClient):
    publisher: Optional[ADDRESS]
    publisher_registry_address: ADDRESS
    account_client: EmpiricAccountClient

    def __init__(
        self,
        publisher_private_key,
        publisher_address,
        publisher: Optional[ADDRESS] = None,
        publisher_registry_address: Optional[ADDRESS] = None,
        network: Network = TESTNET,
        oracle_controller_address: Optional[ADDRESS] = None,
    ):
        raw_config = get_config(network)
        self.publisher_registry_address = (
            publisher_registry_address
            if publisher_registry_address is not None
            else raw_config.PUBLISHER_REGISTRY_ADDRESS
        )
        self.publisher = publisher
        super().__init__(
            publisher_private_key,
            publisher_address,
            network,
            oracle_controller_address,
        )
        # Override default account_client with one that uses timestamp for nonce
        self.account_client = EmpiricAccountClient(
            self.account_contract_address, self.client, self.signer
        )

    async def _fetch_contracts(self):
        await self._fetch_base_contracts()

    async def update_publisher_address(self, new_address, publisher=None) -> HEX_STR:
        publisher = publisher or self.publisher
        if publisher is None:
            raise ValueError(
                "No publisher provided at method call or instantiation, but need publisher ID to update address"
            )

        result = await self.send_transaction(
            self.publisher_registry_address,
            "update_publisher_address",
            [publisher, new_address],
        )
        logger.info(f"Updated publisher address with transaction {result}")

        return result

    async def publish(self, entry: Entry) -> HEX_STR:
        result = await self.send_transaction(
            self.oracle_controller_address,
            "publish_entry",
            entry.serialize(),
        )
        logger.info(f"Updated entry with transaction {result}")

        return result

    async def publish_many(self, entries: List[Entry]) -> HEX_STR:
        if len(entries) == 0:
            logger.warn("Skipping publishing as entries array is empty")
            return

        result = await self.send_transaction(
            self.oracle_controller_address,
            "publish_entries",
            Entry.serialize_entries(entries),
        )

        logger.info(
            f"Successfully sent {len(entries)} updated entries with transaction {result}"
        )

        return result
