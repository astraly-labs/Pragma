import asyncio
import os
from pontis.admin.client import PontisAdminClient

from pontis.core.const import NETWORK, ORACLE_PROXY_ADDRESS, PUBLISHER_REGISTRY_ADDRESS

publisher = "randomfeedooooor"
PUBLISHER_PUBLIC_KEY = (
    2572892080975153183919763551985742086696653280963444831903803487009075446703
)


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        ORACLE_PROXY_ADDRESS,
        PUBLISHER_REGISTRY_ADDRESS,
        admin_private_key,
        network=NETWORK,
    )
    result = await admin_client.register_publisher_if_not_registered(
        PUBLISHER_PUBLIC_KEY, publisher
    )
    print(f"Registered publisher with transaction {result}")


if __name__ == "__main__":

    asyncio.run(main())
