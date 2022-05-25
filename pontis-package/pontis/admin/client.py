from pontis.core.base_client import PontisBaseClient
from pontis.core.const import (
    ADMIN_ADDRESS,
    ORACLE_CONTROLLER_ADDRESS,
    PUBLISHER_REGISTRY_ADDRESS,
)
from pontis.core.utils import str_to_felt
from starknet_py.contract import Contract
from starknet_py.net import Client

MAX_FEE = 0
ADMIN_DEFAULT_N_RETRIES = 1


class PontisAdminClient(PontisBaseClient):
    def __init__(
        self,
        admin_private_key,
        admin_address=None,
        network=None,
        oracle_controller_address=None,
        publisher_registry_address=None,
        max_fee=None,
    ):
        if admin_address is None:
            admin_address = ADMIN_ADDRESS
        if publisher_registry_address is None:
            publisher_registry_address = PUBLISHER_REGISTRY_ADDRESS

        self.publisher_registry_address = publisher_registry_address
        self.publisher_registry_contract = None

        n_retries = ADMIN_DEFAULT_N_RETRIES
        super().__init__(
            admin_private_key,
            admin_address,
            network,
            oracle_controller_address,
            n_retries,
        )

    async def _fetch_contracts(self):
        await self._fetch_base_contracts()

        if self.publisher_registry_contract is None:
            self.publisher_registry_contract = await Contract.from_address(
                self.publisher_registry_address, Client(self.network)
            )

    async def get_primary_oracle_implementation_address(self):
        await self._fetch_contracts()

        result = await self.oracle_controller_contract.functions[
            "get_primary_oracle_implementation_address"
        ].call()

        return result.primary_oracle_implementation_address

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
                PUBLISHER_REGISTRY_ADDRESS,
                "register_publisher",
                [publisher, publisher_address],
            )
            print(f"Registered publisher with transaction {result}")

            return result

        else:
            print(
                f"Skipping registering {publisher}; already registered with address {existing_publisher_address}"
            )

        return

    async def add_oracle_implementation(self, oracle_implementation_address):
        result = await self.send_transaction(
            ORACLE_CONTROLLER_ADDRESS,
            "add_oracle_implementation_address",
            [oracle_implementation_address],
        )

        print(f"Added oracle implementation contract with transaction {result}")

        return result

    async def set_primary_oracle_implementation_address(
        self, primary_oracle_implementation_address
    ):
        result = await self.send_transaction(
            ORACLE_CONTROLLER_ADDRESS,
            "set_primary_oracle_implementation_address",
            [primary_oracle_implementation_address],
        )

        print(f"Set oracle implementation to primary with transaction {result}")

        return result

    async def update_oracle_implementation_active_status(
        self, oracle_implementation_address, is_active
    ):
        result = await self.send_transaction(
            ORACLE_CONTROLLER_ADDRESS,
            "update_oracle_implementation_active_status",
            [oracle_implementation_address, is_active],
        )

        print(f"Set active status on oracle implementation with transaction {result}")

        return result

    async def update_publisher_registry_address(self, new_publisher_registry_address):
        result = await self.send_transaction(
            ORACLE_CONTROLLER_ADDRESS,
            "update_publisher_registry_address",
            [new_publisher_registry_address],
        )

        print(f"Updated publisher registry address with transaction {result}")

        return result
