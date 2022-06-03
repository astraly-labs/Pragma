import asyncio
import time
from pontis.admin.client import PontisAdminClient
from pontis.core.utils import felt_to_str
from pontis.publisher.client import PontisPublisherClient
import requests

# Inputs
# [Optional]: Publisher names; if empty, query for all
# [Optional]: Balance threshold; if empty, default to 0.1

# Behavior
# Ping betteruptime if all is good, do not ping if all is bad


async def main(publishers=None, threshold_wei=None):
    # Set admin private key to None because we aren't using protected invokes
    client = PontisAdminClient(1)

    if publishers is None:
        publishers = await client.get_all_publishers()

    if threshold_wei is None:
        threshold_wei = 0.1 * 10**18

    all_above_threshold = True

    for publisher in publishers:
        # Get address
        address = await client.get_publisher_address(publisher)

        # Set publisher private key to None because we aren't using protected invokes
        publisher_client = PontisPublisherClient(1, address)
        # Query balance of contract
        balance = await publisher_client.get_eth_balance()

        if balance < threshold_wei:
            print(
                f"Warning: Balance below threshold! Publisher: {felt_to_str(publisher)}, address: {address}, balance: {balance}"
            )
            all_above_threshold = False

    if all_above_threshold:
        # Ping betteruptime
        requests.get(
            "https://betteruptime.com/api/v1/heartbeat/zqdgL5skHfT2AMZTCcuKAbEJ"
        )
    else:
        print(time.time())


if __name__ == "__main__":
    asyncio.run(main())
