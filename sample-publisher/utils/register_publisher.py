import asyncio
import os

from pontis.admin.client import PontisAdminClient
from pontis.core.const import NETWORK, ORACLE_PROXY_ADDRESS, PUBLISHER_REGISTRY_ADDRESS

publishers = [
    "nethermind-binance",
    "nethermind-bitstamp",
    "nethermind-cex",
    "nethermind-coingecko",
    "nethermind-cryptowatch",
    "nethermind-gemini",
]
public_keys = [
    "1922681244446002762207332881962407595622938890360886182401946375964641547245",
    "3293243471935543119162911919689308263937870768753825231522980820609180904492",
    "1038180609822229071168671001966215423380165843851945895425555937416862557138",
    "2443969071045099522073924267752350163483830429647815271874018074182877206495",
    "899272618053993235189940565789819167561899150232681791577738046635745004837",
    "2655333468024049878050125635434244197570706816225835400618774255965690132075",
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
        result = await admin_client.register_publisher_if_not_registered(
            public_key, publisher
        )
        print(f"Registered publisher with transaction {result}")


if __name__ == "__main__":

    asyncio.run(main())
