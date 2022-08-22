import asyncio
import time
from collections import namedtuple

from empiric.core.client import EmpiricClient
from empiric.core.config import BaseConfig
from empiric.core.logger import get_stream_logger
from empiric.core.utils import str_to_felt

logger = get_stream_logger()

YieldPoint = namedtuple(
    "YieldPoint", ["expiry_timestamp", "capture_timestamp", "rate", "source"]
)
TIME_TOLERANCE = 10  # seconds


def calculate_on_yield_point(
    on_value, last_updated_timestamp, on_decimals, output_decimals
):
    output_value = int(on_value * (10 ** (output_decimals - on_decimals)))
    return YieldPoint(
        expiry_timestamp=last_updated_timestamp,
        capture_timestamp=last_updated_timestamp,
        rate=output_value,
        source=str_to_felt("on"),
    )


def calculate_future_spot_yield_point(
    future_value,
    future_last_updated_timestamp,
    future_expiry_timestamp,
    spot_value,
    spot_last_updated_timestamp,
    spot_decimals,
    future_decimals,
    output_decimals,
    current_timestamp=None,
):

    if (
        abs(spot_last_updated_timestamp - future_last_updated_timestamp)
        > TIME_TOLERANCE
    ):
        return

    if current_timestamp is None:
        current_timestamp = int(time.time())
    seconds_to_expiry = future_expiry_timestamp - current_timestamp
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

    return YieldPoint(
        expiry_timestamp=future_expiry_timestamp,
        capture_timestamp=future_last_updated_timestamp,
        rate=output_value,
        source=str_to_felt("future/spot"),
    )


async def get_yield_points(output_decimals):
    client = EmpiricClient()

    yield_points = []

    on_keys = ["aave-on-borrow"]
    spot_keys = ["btc/usd"]
    future_keys = ["btc/usd-20220624", "btc/usd-20220930"]
    future_status = {"btc/usd-20220930": 1664506800, "btc/usd-20221230": 1672369200}

    for on_key in on_keys:
        # fetch data from oracle
        on_value, on_decimals, last_updated_timestamp, _ = await client.get_value(
            on_key, BaseConfig.DEFAULT_AGGREGATION_MODE
        )

        yield_points.append(
            calculate_on_yield_point(
                on_value, last_updated_timestamp, on_decimals, output_decimals
            )
        )

    for spot_key in spot_keys:
        (
            spot_value,
            spot_decimals,
            spot_last_updated_timestamp,
            _,
        ) = await client.get_value(spot_key, BaseConfig.DEFAULT_AGGREGATION_MODE)

        for future_key in future_keys:
            (
                future_value,
                future_decimals,
                future_last_updated_timestamp,
                _,
            ) = await client.get_value(future_key, BaseConfig.DEFAULT_AGGREGATION_MODE)

            future_spot_yield_point = calculate_future_spot_yield_point(
                future_value,
                future_last_updated_timestamp,
                future_status[future_key],
                spot_value,
                spot_last_updated_timestamp,
                spot_decimals,
                future_decimals,
                output_decimals,
            )
            if future_spot_yield_point is not None:
                yield_points.append(future_spot_yield_point)

    for point in yield_points:
        logger.info(f"source: {point.source}")
        logger.info(f"time to expiry: {point.expiry_timestamp - int(time.time())}")
        logger.info(f"value in percent: {point.rate/(10**(output_decimals + 2))}")


if __name__ == "__main__":
    asyncio.run(get_yield_points(10))
