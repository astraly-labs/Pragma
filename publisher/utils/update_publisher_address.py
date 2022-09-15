import asyncio
import os

from empiric.publisher.client import EmpiricPublisherClient


async def main():
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    old_publisher_address = (
        2885948362156884910017225078393335267371301698754605063165748466266191873667
    )
    new_publisher_address = (
        2997231508090948287810421563528272582753036618878708141844804758659373413510
    )
    publisher_client = EmpiricPublisherClient(
        account_private_key=publisher_private_key,
        account_addresss=old_publisher_address,
    )
    await publisher_client.update_publisher_address(
        new_publisher_address, publisher=publisher
    )


if __name__ == "__main__":

    asyncio.run(main())
