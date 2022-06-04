import asyncio
import datetime

import requests
from pontis.admin.client import PontisAdminClient
from pontis.core.utils import felt_to_str
from pontis.publisher.client import PontisPublisherClient

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
    addresses = {
        1969689300318551773111895249684342317364263860557875973397862221206369869737
    }  # CMT mis-registered the first time so ignore that publisher (they use cmt not cmtd today)

    for publisher in publishers:
        # Get address
        address = await client.get_publisher_address(publisher)
        if address in addresses:
            # Already checked this address (different publishers can share the same address)
            continue

        addresses.add(address)

        # Set publisher private key to None because we aren't using protected invokes
        publisher_client = PontisPublisherClient(1, address)
        # Query balance of contract
        balance = await publisher_client.get_eth_balance()

        if balance < threshold_wei:
            print(
                f"\nWarning: Balance below threshold! Publisher: {felt_to_str(publisher)}, address: {address}, balance in ETH: {balance/(10**18)}\n"
            )
            all_above_threshold = False
        else:
            print(
                f"Balance above threshold for publisher: {felt_to_str(publisher)}, address: {address}, balance in ETH: {balance/(10**18)}"
            )

    if all_above_threshold:
        # Ping betteruptime
        requests.get(
            "https://betteruptime.com/api/v1/heartbeat/zqdgL5skHfT2AMZTCcuKAbEJ"
        )
    else:
        print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))


if __name__ == "__main__":
    asyncio.run(main())
