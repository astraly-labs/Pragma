from pontis.core.entry import Entry
from pontis.core.utils import hash_entry, str_to_felt
from starknet_py.contract import Contract
from starknet_py.net import Client
from starkware.crypto.signature.signature import private_to_stark_key, sign

MAX_FEE = 0
DEFAULT_N_RETRIES = 3


class PontisPublisherClient:
    def __init__(
        self,
        oracle_proxy_address,
        publisher_private_key,
        publisher,
        network=None,
        max_fee=None,
        n_retries=None,
    ):

        self.network = "mainnet" if network is None else network
        self.max_fee = MAX_FEE if max_fee is None else max_fee
        self.n_retries = DEFAULT_N_RETRIES if n_retries is None else n_retries

        self.oracle_proxy_address = oracle_proxy_address
        self.oracle_proxy_contract = None

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

    async def fetch_oracle_proxy_contract(self):
        if self.oracle_proxy_contract is None:
            self.oracle_proxy_contract = await Contract.from_address(
                self.oracle_proxy_address,
                Client(self.network, n_retries=self.n_retries),
            )

    async def publish(self, key, value, timestamp):
        await self.fetch_oracle_proxy_contract()

        if type(key) == str:
            key = str_to_felt(key)

        entry = Entry(
            key=key, value=value, timestamp=timestamp, publisher=self.publisher
        )
        signature_r, signature_s = sign(hash_entry(entry), self.publisher_private_key)
        result = await self.oracle_proxy_contract.functions["submit_entry"].invoke(
            entry._asdict(), signature_r, signature_s, max_fee=self.max_fee
        )
        print(f"Updated entry with transaction {result}")

    @classmethod
    async def get_decimals(
        cls, oracle_proxy_address, network, key, max_fee=None, n_retries=None
    ):
        if max_fee is None:
            max_fee = MAX_FEE
        if n_retries is None:
            n_retries = DEFAULT_N_RETRIES

        oracle_proxy_contract = await Contract.from_address(
            oracle_proxy_address, Client(network, n_retries=n_retries)
        )

        if type(key) == str:
            key = str_to_felt(key)
        elif type(key) != int:
            raise AssertionError(
                "Key must be string (will be converted to felt) or integer"
            )

        response = await oracle_proxy_contract.functions["get_decimals"].call(
            key,
            max_fee=max_fee,
        )

        return response.decimals

    @classmethod
    async def publish_many(
        cls,
        oracle_proxy_address,
        network,
        entries,
        publisher_private_keys,
        max_fee=None,
        n_retries=None,
    ):
        if len(entries) != len(publisher_private_keys):
            raise Exception(
                "publish_many received different length entries and publisher_private_keys lists"
            )

        if max_fee is None:
            max_fee = MAX_FEE
        if n_retries is None:
            n_retries = DEFAULT_N_RETRIES

        signatures = [
            sign(hash_entry(entry), private_key)
            for entry, private_key in zip(entries, publisher_private_keys)
        ]
        signatures_r = [s[0] for s in signatures]
        signatures_s = [s[1] for s in signatures]

        oracle_proxy_contract = await Contract.from_address(
            oracle_proxy_address, Client(network, n_retries=n_retries)
        )

        response = await oracle_proxy_contract.functions["submit_many_entries"].invoke(
            [entry._asdict() for entry in entries],
            signatures_r,
            signatures_s,
            max_fee=max_fee,
        )

        print(f"Successfully sent {len(entries)} updated entries")

        return response
