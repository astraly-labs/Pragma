import logging
from typing import Optional

from empiric.core.base_client import EmpiricAccountClient, EmpiricBaseClient
from empiric.core.config import CONFIG, IConfig
from empiric.core.errors import InvalidNetworkError
from empiric.core.types import ADDRESS, TESTNET, Network
from empiric.core.utils import str_to_felt
from starknet_py.contract import Contract
from starknet_py.net.gateway_client import GatewayClient

logger = logging.getLogger(__name__)


class EmpiricAdminClient(EmpiricBaseClient):
    config: IConfig

    def __init__(
        self,
        admin_private_key,
        network: Network = TESTNET,
        admin_address: Optional[ADDRESS] = None,
        oracle_controller_address: Optional[ADDRESS] = None,
        publisher_registry_address: Optional[ADDRESS] = None,
    ):
        config = CONFIG.get(network)
        if config is None:
            raise InvalidNetworkError(f"Invalid Network name: {network}")

        super().__init__(
            admin_private_key,
            admin_address or config.ADMIN_ADDRESS,
            network,
            oracle_controller_address,
        )

        # TODO(rlkelly): I don't love this, need to think of a better way to manage config attributes
        self.config.ORACLE_CONTROLLER_ADDRESS = (
            oracle_controller_address or self.config.ORACLE_CONTROLLER_ADDRESS
        )
        self.config.PUBLISHER_REGISTRY_ADDRESS = (
            publisher_registry_address or self.config.PUBLISHER_REGISTRY_ADDRESS
        )

        self.publisher_registry_contract = None

        # Override default account_client with one that uses timestamp for nonce
        self.account_client = EmpiricAccountClient(
            self.account_contract_address, self.client, self.signer
        )

    async def _fetch_contracts(self):
        await self._fetch_base_contracts()

        if self.publisher_registry_contract is None:
            self.publisher_registry_contract = await Contract.from_address(
                self.config.PUBLISHER_REGISTRY_ADDRESS,
                GatewayClient(self.config.NETWORK, self.config.CHAIN_ID),
            )

    async def get_primary_oracle_implementation_address(self):
        await self._fetch_contracts()

        result = await self.oracle_controller_contract.functions[
            "get_primary_oracle_implementation_address"
        ].call()

        return result.primary_oracle_implementation_address

    async def get_all_publishers(self):
        await self._fetch_contracts()

        result = await self.publisher_registry_contract.functions[
            "get_all_publishers"
        ].call()

        return result.publishers

    async def get_publisher_address(self, publisher):
        await self._fetch_contracts()

        result = await self.publisher_registry_contract.functions[
            "get_publisher_address"
        ].call(publisher)

        return result.publisher_address

    async def register_publisher_if_not_registered(self, publisher, publisher_address):
        if type(publisher) == str:
            publisher = str_to_felt(publisher)
        elif type(publisher) == int:
            publisher = publisher
        else:
            raise AssertionError(
                "Publisher ID must be string (will be converted to felt) or integer"
            )

        existing_publisher_address = await self.get_publisher_address(publisher)

        if existing_publisher_address == 0:
            result = await self.send_transaction(
                self.config.PUBLISHER_REGISTRY_ADDRESS,
                "register_publisher",
                [publisher, publisher_address],
            )
            logger.info(f"Registered publisher with transaction {result}")

            return result

        else:
            logger.debug(
                f"Skipping registering {publisher}; already registered with address {existing_publisher_address}"
            )

        return

    async def add_oracle_implementation(self, oracle_implementation_address):
        result = await self.send_transaction(
            self.config.ORACLE_CONTROLLER_ADDRESS,
            "add_oracle_implementation_address",
            [oracle_implementation_address],
        )

        logger.info(f"Added oracle implementation contract with transaction {result}")

        return result

    async def set_primary_oracle_implementation_address(
        self, primary_oracle_implementation_address
    ):
        result = await self.send_transaction(
            self.config.ORACLE_CONTROLLER_ADDRESS,
            "set_primary_oracle_implementation_address",
            [primary_oracle_implementation_address],
        )

        logger.info(f"Set oracle implementation to primary with transaction {result}")

        return result

    async def update_oracle_implementation_active_status(
        self, oracle_implementation_address, is_active
    ):
        result = await self.send_transaction(
            self.config.ORACLE_CONTROLLER_ADDRESS,
            "update_oracle_implementation_active_status",
            [oracle_implementation_address, is_active],
        )

        logger.info(
            f"Set active status on oracle implementation with transaction {result}"
        )

        return result

    async def update_publisher_registry_address(self, new_publisher_registry_address):
        result = await self.send_transaction(
            self.config.ORACLE_CONTROLLER_ADDRESS,
            "update_publisher_registry_address",
            [new_publisher_registry_address],
        )
        self.config.update(
            PUBLISHER_REGISTRY_ADDRESS=new_publisher_registry_address,
        )

        logger.info(f"Updated publisher registry address with transaction {result}")

        return result
