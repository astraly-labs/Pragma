from pontis.core.entry import Entry
from pontis.core.utils import hash_entry, sign_publisher_registration, str_to_felt
from starknet_py.contract import Contract
from starknet_py.net import Client
from starkware.crypto.signature.signature import private_to_stark_key, sign

MAX_FEE = 0


class PontisPublisherClient:
    def __init__(
        self,
        oracle_address,
        publisher_private_key,
        publisher,
        network=None,
        max_fee=None,
    ):

        self.network = "mainnet" if network is None else network
        self.max_fee = MAX_FEE if max_fee is None else max_fee

        self.oracle_address = oracle_address
        self.oracle_contract = None

        assert (
            type(publisher_private_key) == int
        ), "Publisher private key must be integer"
        self.publisher_private_key = publisher_private_key
        self.publisher_public_key = private_to_stark_key(self.publisher_private_key)

        if type(publisher) == str:
            self.publisher = str_to_felt(publisher)
        elif type(publisher) == int:
            self.publisher = publisher
        else:
            raise AssertionError(
                "Publisher ID must be string (will be converted to felt) or integer"
            )

    def sign_publisher_registration(self, publisher_registration_private_key):
        (
            registration_signature_r,
            registration_signature_s,
        ) = sign_publisher_registration(
            self.publisher_public_key,
            self.publisher,
            publisher_registration_private_key,
        )
        return registration_signature_r, registration_signature_s

    async def fetch_oracle_contract(self):
        if self.oracle_contract is None:
            self.oracle_contract = await Contract.from_address(
                self.oracle_address, Client(self.network)
            )

    async def register_publisher_if_not_registered(
        self,
        registration_signature_r,
        registration_signature_s,
    ):
        await self.fetch_oracle_contract()

        result = await self.oracle_contract.functions["get_publisher_public_key"].call(
            self.publisher
        )

        if result.publisher_public_key == 0:
            signature_r, signature_s = sign(self.publisher, self.publisher_private_key)

            result = await self.oracle_contract.functions["register_publisher"].invoke(
                self.publisher_public_key,
                self.publisher,
                signature_r,
                signature_s,
                registration_signature_r,
                registration_signature_s,
                max_fee=MAX_FEE,
            )
            print(f"Registered publisher with transaction {result}")

    async def publish(self, key, value, timestamp):
        await self.fetch_oracle_contract()

        if type(key) == str:
            key = str_to_felt(key)

        entry = Entry(
            key=key, value=value, timestamp=timestamp, publisher=self.publisher
        )
        signature_r, signature_s = sign(hash_entry(entry), self.publisher_private_key)
        result = await self.oracle_contract.functions["submit_entry"].invoke(
            entry._asdict(), signature_r, signature_s, max_fee=self.max_fee
        )
        print(f"Updated entry with transaction {result}")

    @classmethod
    async def publish_many(
        cls, oracle_address, network, entries, publisher_private_keys, max_fee=None
    ):
        if len(entries) != len(publisher_private_keys):
            raise Exception(
                "publish_many received different length entries and publisher_private_keys lists"
            )

        if max_fee is None:
            max_fee = MAX_FEE

        signatures = [
            sign(hash_entry(entry), private_key)
            for entry, private_key in zip(entries, publisher_private_keys)
        ]
        signatures_r = [s[0] for s in signatures]
        signatures_s = [s[1] for s in signatures]

        oracle_contract = await Contract.from_address(oracle_address, Client(network))

        response = await oracle_contract.functions["submit_many_entries"].invoke(
            [entry._asdict() for entry in entries],
            signatures_r,
            signatures_s,
            max_fee=max_fee,
        )

        print(f"Successfully sent {len(entries)} updated entries")

        return response
