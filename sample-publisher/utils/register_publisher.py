import asyncio
import os

from pontis.admin.client import PontisAdminClient

publishers = [
    f"argent-{source}"
    for source in ["binance", "bitstamp", "cex", "coingecko", "gemini"]
]
publisher_address = 0x5E54EDB59E1B1E398F9647E617276F6DA0EB9DDFC0C02723269B9BAA2489DCE


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    for publisher in publishers:
        await admin_client.register_publisher_if_not_registered(
            publisher, publisher_address
        )


if __name__ == "__main__":

    asyncio.run(main())
