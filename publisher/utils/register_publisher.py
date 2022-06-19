import asyncio
import os

from pontis.admin.client import PontisAdminClient

publishers = [
    f"equilibrium-{source}"
    for source in [
        "coinmarketcap",
        "coingecko",
        "coinbase",
        "gemini",
        "binance",
        "ftx",
        "cex",
        "bitstamp",
    ]
]
publishers = ["cmt"]
publisher_address = 0x02FE2CA4C677AF0FF601A5AA37F799701C3ECD6F5D04F2EE072CB4C37FDFCDEF


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
