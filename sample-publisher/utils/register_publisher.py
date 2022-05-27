import asyncio
import os

from pontis.admin.client import PontisAdminClient

publishers = [
    f"equilibrium-{source}"
    for source in [
        "coinapi",
        "coinmarketcap",
        "coingecko",
        "coinbase",
        "gemini",
        "binance",
        "ftx",
    ]
]
publisher_address = 0x0315E364B162653E5C7B23EFD34F8DA27BA9C069B68E3042B7D76CE1DF890313


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
