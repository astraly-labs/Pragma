import asyncio
import os

from pontis.admin.client import PontisAdminClient
from pontis.core.utils import str_to_felt

on_keys = ["aave-on-borrow"]
spot_future_keys = {
    "btc/usd": {
        "btc/usd-20220624": 1656039600,
        "btc/usd-20220930": 1664506800,
        "btc/usd-20221230": 1672369200,
    }
}
yield_curve_address = 0x057C38EF78E34F6BCC883B7EBA124A12CE73E4AB8259A139B57B054ED1EADAE7


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    for on_key in on_keys:
        result = await admin_client.send_transaction(
            yield_curve_address, "add_on_key", [str_to_felt(on_key), 1]
        )
        print(f"Registered overnight rate key {on_key} with tx: {result}")

    result = await admin_client.send_transaction(
        yield_curve_address, "set_publisher_key", [str_to_felt("pontis-ftx")]
    )
    print(f"Set publisher key with tx: {result}")

    for spot_key, future_keys in spot_future_keys.items():
        result = await admin_client.send_transaction(
            yield_curve_address, "add_spot_key", [str_to_felt(spot_key), 1]
        )
        print(f"Added spot key {spot_key} with tx: {result}")
        for future_key, future_expiry_timestamp in future_keys.items():
            result = await admin_client.send_transaction(
                yield_curve_address,
                "add_future_key",
                [
                    str_to_felt(spot_key),
                    str_to_felt(future_key),
                    1,
                    future_expiry_timestamp,
                ],
            )
            print(f"Added future key {future_key} with tx: {result}")


if __name__ == "__main__":
    asyncio.run(main())
