from pontis.core.utils import (
    admin_hash_and_sign_with_nonce,
    sign_publisher_registration,
    str_to_felt,
)
from starknet_py.contract import Contract
from starknet_py.net import Client
from starkware.crypto.signature.signature import private_to_stark_key

MAX_FEE = 0


class PontisAdminClient:
    def __init__(
        self,
        oracle_proxy_address,
        publisher_registry_address,
        admin_private_key,
        network=None,
        max_fee=None,
    ):

        self.network = "mainnet" if network is None else network
        self.max_fee = MAX_FEE if max_fee is None else max_fee

        self.oracle_proxy_address = oracle_proxy_address
        self.oracle_proxy_contract = None
        self.publisher_registry_address = publisher_registry_address
        self.publisher_registry_contract = None

        assert type(admin_private_key) == int, "Admin private key must be integer"
        self.admin_private_key = admin_private_key
        self.publisher_public_key = private_to_stark_key(self.admin_private_key)

    async def get_nonce(self):
        result = await self.oracle_proxy_contract.functions["get_nonce"].call()
        nonce = result.nonce
        return nonce

    async def get_primary_oracle_implementation_address(self):
        result = await self.oracle_proxy_contract.functions[
            "get_primary_oracle_implementation_address"
        ].call()
        primary_oracle_implementation_address = (
            result.primary_oracle_implementation_address
        )
        return primary_oracle_implementation_address

    async def fetch_contracts(self):
        if self.oracle_proxy_contract is None:
            self.oracle_proxy_contract = await Contract.from_address(
                self.oracle_proxy_address, Client(self.network)
            )

        if self.publisher_registry_contract is None:
            self.publisher_registry_contract = await Contract.from_address(
                self.publisher_registry_address, Client(self.network)
            )

    async def register_publisher_if_not_registered(
        self, publisher_public_key, publisher
    ):
        await self.fetch_contracts()

        if type(publisher) == str:
            publisher = str_to_felt(publisher)
        elif type(publisher) == int:
            publisher = publisher
        else:
            raise AssertionError(
                "Publisher ID must be string (will be converted to felt) or integer"
            )

        result = await self.publisher_registry_contract.functions[
            "get_publisher_public_key"
        ].call(publisher)

        if result.publisher_public_key == 0:
            signature_r, signature_s = sign_publisher_registration(
                publisher_public_key,
                publisher,
                self.admin_private_key,
            )
            result = await self.publisher_registry_contract.functions[
                "register_publisher"
            ].invoke(
                publisher_public_key,
                publisher,
                signature_r,
                signature_s,
                max_fee=self.max_fee,
            )
            print(f"Registered publisher with transaction {result}")

            return result

    async def add_oracle_implementation(self, oracle_implementation_address):
        await self.fetch_contracts()

        nonce = await self.get_nonce()

        (
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
        ) = admin_hash_and_sign_with_nonce(
            oracle_implementation_address, nonce, self.admin_private_key
        )

        result = await self.oracle_proxy_contract.functions[
            "add_oracle_implementation_address"
        ].invoke(
            oracle_implementation_address,
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
            max_fee=self.max_fee,
        )
        print(f"Added oracle implementation contract with transaction {result}")

        return result

    async def set_primary_oracle(self, primary_oracle_implementation_address):
        await self.fetch_contracts()

        nonce = await self.get_nonce()

        (
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
        ) = admin_hash_and_sign_with_nonce(
            primary_oracle_implementation_address, nonce, self.admin_private_key
        )

        result = await self.oracle_proxy_contract.functions[
            "set_primary_oracle"
        ].invoke(
            primary_oracle_implementation_address,
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
            max_fee=self.max_fee,
        )

        print(f"Set oracle implementation to primary with transaction {result}")

        return result

    async def update_oracle_implementation_active_status(self, oracle_implementation_address, is_active):
        await self.fetch_contracts()

        nonce = await self.get_nonce()

        (
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
        ) = admin_hash_and_sign_with_nonce(
            [oracle_implementation_address, is_active], nonce, self.admin_private_key
        )

        result = await self.oracle_proxy_contract.functions[
            "update_oracle_implementation_active_status"
        ].invoke(
            oracle_implementation_address,
            is_active,
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
            max_fee=self.max_fee,
        )

        print(f"Set active status on oracle implementation with transaction {result}")

        return result

    async def update_publisher_registry_address(self, new_publisher_registry_address):
        await self.fetch_contracts()

        nonce = await self.get_nonce()

        (signature_r, signature_s,) = admin_hash_and_sign_with_nonce(
            new_publisher_registry_address, nonce, self.admin_private_key
        )

        result = await self.oracle_proxy_contract.functions[
            "update_publisher_registry_address"
        ].invoke(
            new_publisher_registry_address,
            signature_r,
            signature_s,
            max_fee=self.max_fee,
        )

        print(f"Updated publisher registry address with transaction {result}")

        return result
