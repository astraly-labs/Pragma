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

MAX_FEE = 0
DECIMALS = 10
PRICE_PAIR = ["ETH", "USD"]
PRICE_URL = f"https://rest.coinapi.io/v1/exchangerate/{'/'.join(PRICE_PAIR)}"
PUBLISHER = str_to_felt("coinapi")
STARKNET_URL = f"https://{os.environ.get('STARKNET_NETWORK')}.starknet.io"
COINAPI_KEY = os.environ.get("COINAPI_KEY")
PUBLISHER_PRIVATE_KEY = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
PUBLISHER_PUBLIC_KEY = private_to_stark_key(PUBLISHER_PRIVATE_KEY)

headers = {"X-CoinAPI-Key": COINAPI_KEY}
response = requests.get(PRICE_URL, headers=headers)
response.raise_for_status()
price = response.json()["rate"]
timestamp = int(
    datetime.strptime(
        response.json()["time"].split(".")[0], "%Y-%m-%dT%H:%M:%S"
    ).timestamp()
)
price_int = int(price * (10**DECIMALS))
entry = Entry(
    timestamp=timestamp,
    price=price_int,
    asset=str_to_felt("".join(PRICE_PAIR)),
    publisher=PUBLISHER,
)
print(f"Submitting price {price} for {'/'.join(PRICE_PAIR)}")


async def register_publisher_if_not_registered(oracle_contract):
    result = await oracle_contract.functions["get_publisher_key"].call(PUBLISHER)

    if result.publisher_key == 0:
        signature_r, signature_s = sign(PUBLISHER, PUBLISHER_PRIVATE_KEY)

        result = await oracle_contract.functions["register_publisher"].invoke(
            PUBLISHER_PUBLIC_KEY, PUBLISHER, signature_r, signature_s, max_fee=MAX_FEE
        )
        print(f"Registered publisher with transaction {result}")


async def publish():
    oracle_contract = await Contract.from_address(
        os.environ.get("ORACLE_ADDRESS"), Client("testnet")
    )

    await register_publisher_if_not_registered(oracle_contract)

    signature_r, signature_s = sign(hash_entry(entry), PUBLISHER_PRIVATE_KEY)
    result = await oracle_contract.functions["update_price"].invoke(
        entry._asdict(), signature_r, signature_s, max_fee=MAX_FEE
    )
    print(f"Updated price with transaction {result}")


asyncio.run(publish())
