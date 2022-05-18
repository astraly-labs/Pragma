from pontis.core.utils import (
    str_to_felt,
)
from pontis.core.const import (
    ADMIN_ADDRESS,
    NETWORK,
    ORACLE_PROXY_ADDRESS,
    PUBLISHER_REGISTRY_ADDRESS,
)
from starknet_py.contract import Contract
from starknet_py.net import Client
from starkware.crypto.signature.signature import private_to_stark_key
from nile.signer import Signer

MAX_FEE = 0


class PontisAdminClient:
    def __init__(
        self,
        admin_private_key,
        network=None,
        admin_address=None,
        oracle_proxy_address=None,
        publisher_registry_address=None,
        max_fee=None,
    ):
        if network is None:
            network = NETWORK
        if admin_address is None:
            admin_address = ADMIN_ADDRESS
        if oracle_proxy_address is None:
            oracle_proxy_address = ORACLE_PROXY_ADDRESS
        if publisher_registry_address is None:
            publisher_registry_address = PUBLISHER_REGISTRY_ADDRESS

        assert type(admin_private_key) == int, "Admin private key must be integer"
        self.admin_private_key = admin_private_key
        self.signer = Signer(self.admin_private_key)

        self.network = network

        self.admin_address = admin_address
        self.admin_contract = None
        self.oracle_proxy_address = oracle_proxy_address
        self.oracle_proxy_contract = None
        self.publisher_registry_address = publisher_registry_address
        self.publisher_registry_contract = None

        self.max_fee = MAX_FEE if max_fee is None else max_fee

    async def fetch_contracts(self):
        if self.admin_contract is None:
            self.admin_contract = await Contract.from_address(
                self.admin_address, Client(self.network)
            )

        if self.oracle_proxy_contract is None:
            self.oracle_proxy_contract = await Contract.from_address(
                self.oracle_proxy_address, Client(self.network)
            )

        if self.publisher_registry_contract is None:
            self.publisher_registry_contract = await Contract.from_address(
                self.publisher_registry_address, Client(self.network)
            )

    async def send_transaction(self, to, selector_name, calldata):
        return await self.send_transactions([(to, selector_name, calldata)])

    async def send_transactions(self, calls):
        await self.fetch_contracts()

        execution_info = await self.admin_contract.get_nonce().call()
        (nonce,) = execution_info.result

        build_calls = []
        for call in calls:
            build_call = list(call)
            build_call[0] = hex(build_call[0])
            build_calls.append(build_call)

        (call_array, calldata, sig_r, sig_s) = self.signer.sign_transaction(
            hex(self.admin_contract.contract_address), build_calls, nonce, self.max_fee
        )
        return await self.admin_contract.__execute__(
            call_array, calldata, nonce
        ).invoke(signature=[sig_r, sig_s])

    async def get_primary_oracle_implementation_address(self):
        await self.fetch_contracts()

        result = await self.oracle_proxy_contract.functions[
            "get_primary_oracle_implementation_address"
        ].call()

        return result.primary_oracle_implementation_address

    async def get_publisher_public_key(self, publisher):
        await self.fetch_contracts()

        result = await self.publisher_registry_contract.functions[
            "get_publisher_public_key"
        ].call(publisher)

        return result.publisher_public_key

    async def register_publisher_if_not_registered(
        self, publisher_public_key, publisher
    ):
        if type(publisher) == str:
            publisher = str_to_felt(publisher)
        elif type(publisher) == int:
            publisher = publisher
        else:
            raise AssertionError(
                "Publisher ID must be string (will be converted to felt) or integer"
            )

        existing_publisher_public_key = self.get_publisher_public_key(publisher)

        if existing_publisher_public_key == 0:
            result = await self.send_transaction(
                self.publisher_registry_contract.contract_address,
                "register_publisher",
                [publisher_public_key, publisher],
            )
            print(f"Registered publisher with transaction {result}")

        else:
            print(
                f"Skipping registering {publisher}; already registered with key {existing_publisher_public_key}"
            )

        return result

    async def add_oracle_implementation(self, oracle_implementation_address):
        result = await self.send_transaction(
            self.publisher_registry_contract.contract_address,
            "add_oracle_implementation_address",
            [oracle_implementation_address],
        )

        print(f"Added oracle implementation contract with transaction {result}")

        return result

    async def set_primary_oracle(self, primary_oracle_implementation_address):
        result = await self.send_transaction(
            self.publisher_registry_contract.contract_address,
            "set_primary_oracle",
            [primary_oracle_implementation_address],
        )

        print(f"Set oracle implementation to primary with transaction {result}")

        return result

    async def update_oracle_implementation_active_status(
        self, oracle_implementation_address, is_active
    ):
        result = await self.send_transaction(
            self.publisher_registry_contract.contract_address,
            "update_oracle_implementation_active_status",
            [oracle_implementation_address, is_active],
        )

        print(f"Set active status on oracle implementation with transaction {result}")

        return result

    async def update_publisher_registry_address(self, new_publisher_registry_address):
        result = await self.send_transaction(
            self.publisher_registry_contract.contract_address,
            "update_publisher_registry_address",
            [new_publisher_registry_address],
        )

        print(f"Updated publisher registry address with transaction {result}")

        return result
