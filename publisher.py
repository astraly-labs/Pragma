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
    COINAPI_PUBLISHER_PRIVATE_KEY = int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY"))
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


def get_entry_from_coinmarketcap_price(price_pair, decimals):
    COINMARKETCAP_KEY = os.environ.get("COINMARKETCAP_KEY")
    PRICE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    COINMARKETCAP_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")
    )
    COINMARKETCAP_PUBLISHER_PUBLIC_KEY = private_to_stark_key(
        COINMARKETCAP_PUBLISHER_PRIVATE_KEY
    )

    headers = {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
        "Accepts": "application/json",
    }

    parameters = {"symbol": price_pair[0], "convert": price_pair[1]}

    response = requests.get(PRICE_URL, headers=headers, params=parameters)
    response.raise_for_status()
    price = response.json()["data"][PRICE_PAIR[0]]["quote"][PRICE_PAIR[1]]["price"]
    timestamp = int(
        datetime.strptime(
            response.json()["data"][PRICE_PAIR[0]]["quote"][PRICE_PAIR[1]][
                "last_updated"
            ].split(".")[0],
            "%Y-%m-%dT%H:%M:%S",
        ).timestamp()
    )
    price_int = int(price * (10**decimals))

    entry = Entry(
        timestamp=timestamp,
        price=price_int,
        asset=str_to_felt("".join(price_pair)),
        publisher=str_to_felt("coinmarketcap"),
    )
    print(f"Submitting price {price} for {'/'.join(price_pair)}")
    return (
        entry,
        (COINMARKETCAP_PUBLISHER_PRIVATE_KEY, COINMARKETCAP_PUBLISHER_PUBLIC_KEY),
    )


def get_entry_from_coingecko_price(price_pair, decimals):
    if price_pair[0] == "ETH":
        PRICE_URL = "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
    else:
        raise Exception(
            f"Unknown price pair, do not know how to query coingecko for {price_pair[0]}"
        )
    COINGECKO_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY")
    )
    COINGECKO_PUBLISHER_PUBLIC_KEY = private_to_stark_key(
        COINGECKO_PUBLISHER_PRIVATE_KEY
    )

    headers = {
        "Accepts": "application/json",
    }

    response = requests.get(PRICE_URL, headers=headers)
    response.raise_for_status()
    price = response.json()["market_data"]["current_price"][price_pair[1].lower()]
    timestamp = int(
        datetime.strptime(
            response.json()["last_updated"].split(".")[0],
            "%Y-%m-%dT%H:%M:%S",
        ).timestamp()
    )
    price_int = int(price * (10**decimals))

    entry = Entry(
        timestamp=timestamp,
        price=price_int,
        asset=str_to_felt("".join(price_pair)),
        publisher=str_to_felt("coingecko"),
    )
    print(f"Submitting price {price} for {'/'.join(price_pair)}")
    return (entry, (COINGECKO_PUBLISHER_PRIVATE_KEY, COINGECKO_PUBLISHER_PUBLIC_KEY))


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


async def try_publish(publisher_entries):
    oracle_contract = await Contract.from_address(
        os.environ.get("ORACLE_ADDRESS"), Client("testnet")
    )

    for entry, (publisher_private_key, publisher_public_key) in publisher_entries:
        try:
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
        except Exception as e:
            print(f"Unable to update price for entry {entry}")
            print(e)


if __name__ == "__main__":
    DECIMALS = 10
    PRICE_PAIR = ["ETH", "USD"]

    coinapi_publisher_entry = get_entry_from_coinapi_price(PRICE_PAIR, DECIMALS)
    coinmarketcap_publisher_entry = get_entry_from_coinmarketcap_price(
        PRICE_PAIR, DECIMALS
    )
    coingecko_publisher_entry = get_entry_from_coingecko_price(PRICE_PAIR, DECIMALS)
    asyncio.run(
        try_publish(
            [
                coinapi_publisher_entry,
                coinmarketcap_publisher_entry,
                coingecko_publisher_entry,
            ]
        )
    )
