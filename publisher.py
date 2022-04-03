import requests
import os
import asyncio
from datetime import datetime

from starknet_py.contract import Contract
from starknet_py.net import Client
from starkware.crypto.signature.signature import (
    private_to_stark_key,
    sign,
)

from tests.entry import Entry
from tests.utils import str_to_felt, hash_entry


def get_entry_from_coinapi_price(price_pair, decimals):
    COINAPI_KEY = os.environ.get("COINAPI_KEY")
    PRICE_URL = f"https://rest.coinapi.io/v1/exchangerate/{'/'.join(price_pair)}"
    COINAPI_PUBLISHER_PRIVATE_KEY = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    COINAPI_PUBLISHER_PUBLIC_KEY = private_to_stark_key(COINAPI_PUBLISHER_PRIVATE_KEY)

    headers = {"X-CoinAPI-Key": COINAPI_KEY}

    response = requests.get(PRICE_URL, headers=headers)
    response.raise_for_status()
    price = response.json()["rate"]
    timestamp = int(
        datetime.strptime(
            response.json()["time"].split(".")[0], "%Y-%m-%dT%H:%M:%S"
        ).timestamp()
    )
    price_int = int(price * (10**decimals))
    entry = Entry(
        timestamp=timestamp,
        price=price_int,
        asset=str_to_felt("".join(price_pair)),
        publisher=str_to_felt("coinapi"),
    )
    print(f"Submitting price {price} for {'/'.join(price_pair)}")
    return (entry, (COINAPI_PUBLISHER_PRIVATE_KEY, COINAPI_PUBLISHER_PUBLIC_KEY))


STARKNET_URL = f"https://{os.environ.get('STARKNET_NETWORK')}.starknet.io"
MAX_FEE = 0


async def register_publisher_if_not_registered(
    oracle_contract, publisher, publisher_private_key, publisher_public_key
):
    result = await oracle_contract.functions["get_publisher_public_key"].call(publisher)

    if result.publisher_public_key == 0:
        signature_r, signature_s = sign(publisher, publisher_private_key)

        result = await oracle_contract.functions["register_publisher"].invoke(
            publisher_public_key, publisher, signature_r, signature_s, max_fee=MAX_FEE
        )
        print(f"Registered publisher with transaction {result}")


async def publish(publisher_entries):
    oracle_contract = await Contract.from_address(
        os.environ.get("ORACLE_ADDRESS"), Client("testnet")
    )

    for entry, (publisher_private_key, publisher_public_key) in publisher_entries:
        await register_publisher_if_not_registered(
            oracle_contract,
            entry.publisher,
            publisher_private_key,
            publisher_public_key,
        )

        signature_r, signature_s = sign(hash_entry(entry), publisher_private_key)
        result = await oracle_contract.functions["submit_entry"].invoke(
            entry._asdict(), signature_r, signature_s, max_fee=MAX_FEE
        )
        print(f"Updated price with transaction {result}")


if __name__ == "__main__":
    DECIMALS = 10
    PRICE_PAIR = ["ETH", "USD"]

    coinapi_publisher_entry = get_entry_from_coinapi_price(PRICE_PAIR, DECIMALS)
    asyncio.run(publish([coinapi_publisher_entry]))
