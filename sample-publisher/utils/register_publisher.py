import asyncio
import os

from pontis.admin.client import PontisAdminClient
from pontis.core.const import NETWORK, ORACLE_PROXY_ADDRESS, PUBLISHER_REGISTRY_ADDRESS

publishers = [
    "equilibrium-coinapi",
    "equilibrium-coinmarketcap",
    "equilibrium-coingecko",
    "equilibrium-coinbase",
    "equilibrium-gemini",
    "equilibrium-binance",
    "equilibrium-ftx",
]
public_keys = [
    2566507126494796542605451803381697230725344055488322757914902566383134621575,
    3283641469472666526025665561565166558074498269216131199704327890701262816321,
    3582618483393532110335177406580927386697650138089818302343784722583084643216,
    1548289354911239189486920897318722822864347215566455346554204265013605853914,
    681511493590313009097377244335814170367011129609541087645597965801184266479,
    1661736665263976794785873744186000309611143237038693087211916432221111467598,
    450118970014786204353173045380392177350763746105007230613796367146853983404,
]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        ORACLE_PROXY_ADDRESS,
        PUBLISHER_REGISTRY_ADDRESS,
        admin_private_key,
        network=NETWORK,
    )
    for public_key, publisher in zip(public_keys, publishers):
        await admin_client.register_publisher_if_not_registered(public_key, publisher)


if __name__ == "__main__":

    asyncio.run(main())
