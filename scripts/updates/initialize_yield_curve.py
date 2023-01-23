import asyncio
import os
import time

from empiric.core.client import EmpiricClient
from empiric.core.logger import get_stream_logger
from empiric.core.utils import str_to_felt

logger = get_stream_logger()

on_keys = ["AAVE-ON-BORROW"]
spot_future_keys = {
    "BTC/USD": {
        "BTC/USD-20220930": 1664506800,
        "BTC/USD-20221230": 1672369200,
    }
}
yield_curve_address = 0x06DC5481AAA92AC4C00E33465BB327814261C4B36322A6858C693F4E659962EC


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_client = EmpiricClient(
        account_private_key=admin_private_key,
    )
    for on_key in on_keys:
        result = await admin_client.send_transaction(
            yield_curve_address, "add_on_key", [str_to_felt(on_key), 1]
        )
        logger.info(f"Registered overnight rate key {on_key} with tx: {result}")
        # TODO (rlkelly): let's avoid this
        time.sleep(1)  # sleep for nonce

    result = await admin_client.send_transaction(
        yield_curve_address, "set_future_spot_empiric_source_key", [str_to_felt("FTX")]
    )
    logger.info(f"Set future/spot empiric source-key with tx: {result}")
    # TODO (rlkelly): let's avoid this
    time.sleep(1)  # sleep for nonce

    for spot_key, future_keys in spot_future_keys.items():
        result = await admin_client.send_transaction(
            yield_curve_address, "add_spot_key", [str_to_felt(spot_key), 1]
        )
        logger.info(f"Added spot key {spot_key} with tx: {result}")
        # TODO (rlkelly): let's avoid this
        time.sleep(1)  # sleep for nonce
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
            # TODO (rlkelly): let's avoid this
            time.sleep(1)  # sleep for nonce
            logger.info(f"Added future key {future_key} with tx: {result}")


if __name__ == "__main__":
    asyncio.run(main())
