import asyncio
import os

from pontis.admin.client import PontisAdminClient

publishers = ["consensys-coingecko-1", "consensys-gemini-2", "consensys-binance-1"]
public_keys = [
    3137499385083936680350659315234667786597447024188768000173846565312105185370,
    3505163323185983417718774728120242643127602694451583995645020715064264727247,
    795579327929626373807373747402942694778223706977941506183336654975013234720,
]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    for public_key, publisher in zip(public_keys, publishers):
        await admin_client.register_publisher_if_not_registered(public_key, publisher)


if __name__ == "__main__":

    asyncio.run(main())
