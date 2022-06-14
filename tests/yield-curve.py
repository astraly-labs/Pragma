import asyncio
from collections import namedtuple
import time
from pontis.core.client import PontisClient
from pontis.core.const import DEFAULT_AGGREGATION_MODE

from pontis.core.utils import str_to_felt, felt_to_str

YieldPoint = namedtuple(
    "YieldPoint", ["capture_timestamp", "expiry_timestamp", "rate", "source"]
)


async def get_yield_points(output_decimals):
    client = PontisClient()

    yield_points = []

    on_keys = ["aave-on-borrow"]
    spot_keys = ["btc/usd"]
    future_keys = ["btc/usd-20220624", "btc/usd-20220930"]
    future_status = {"btc/usd-20220624": 1656043200, "btc/usd-20220930": 1664510400}

    for on_key in on_keys:
        # fetch data from oracle
        on_decimals = await client.get_decimals(on_key)
        on_value, last_updated_timestamp = await client.get_value(
            on_key, DEFAULT_AGGREGATION_MODE
        )

        output_value = int(on_value * (10 ** (output_decimals - on_decimals)))

        yield_points.append(
            YieldPoint(
                last_updated_timestamp,
                last_updated_timestamp + 24 * 60 * 60,
                output_value,
                "on",
            )
        )

    for spot_key in spot_keys:
        spot_decimals = await client.get_decimals(spot_key)
        spot_value, spot_last_updated_timestamp = await client.get_value(
            spot_key, DEFAULT_AGGREGATION_MODE
        )

        for future_key in future_keys:
            future_decimals = await client.get_decimals(future_key)
            future_value, future_last_updated_timestamp = await client.get_value(
                future_key, DEFAULT_AGGREGATION_MODE
            )

            expiry_timestamp = future_status[future_key]
            seconds_to_expiry = expiry_timestamp - int(time.time())
            days_to_expiry = seconds_to_expiry / (24 * 60 * 60)

            output_value = max(
                0,
                int(
                    (
                        int(
                            future_value
                            * (10**spot_decimals)
                            * (10**output_decimals)
                            / ((10**future_decimals) * spot_value)
                        )
                        - 1 * (10**output_decimals)
                    )
                    * (365 / days_to_expiry)
                ),
            )

            yield_points.append(
                YieldPoint(
                    future_last_updated_timestamp,
                    expiry_timestamp,
                    output_value,
                    "future/spot",
                )
            )

    for point in yield_points:
        print(f"source: {point.source}")
        print(f"time to expiry: {point.expiry_timestamp - int(time.time())}")
        print(f"value in percent: {point.rate/(10**(output_decimals + 2))}")


if __name__ == "__main__":
    asyncio.run(get_yield_points(10))
