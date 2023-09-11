import asyncio
import logging
import os
import time
from typing import List

from pragma.core.entry import SpotEntry, FutureEntry
from pragma.core.utils import currency_pair_to_pair_id, log_entry
from pragma.core.assets import PRAGMA_ALL_ASSETS, PragmaAsset
from pragma.publisher.client import PragmaPublisherClient

logger = logging.getLogger(__name__)

# You can fetch your data using any strategy or libraries you want

def fetch_entries(assets: List[PragmaAsset], *args, **kwargs) -> List[SpotEntry]:
    entries = []
    
    for asset in assets:
        if asset["type"] == 'ONCHAIN':
          continue
        
        if asset["type"] == "SPOT":
          entries.append(
              SpotEntry(
                  timestamp=int(time.time()),
                  source="MY_SOURCE",
                  publisher="MY_PUBLISHER",
                  pair_id=currency_pair_to_pair_id(*asset["pair"]),
                  price=10 * 10 ** asset["decimals"], # shifted 10 ** decimals
                  volume=0,
              )
          )
        if asset["type"] == "FUTURE":
          entries.append(
              FutureEntry(
                  timestamp=int(time.time()),
                  source="MY_SOURCE",
                  publisher="MY_PUBLISHER",
                  pair_id=currency_pair_to_pair_id(*asset["pair"]),
                  price=10 * 10 ** asset["decimals"], # shifted 10 ** decimals
                  expiry_timestamp=1693275381, # Set to 0 for perpetual contracts
                  volume=0,
              )
          )

    return entries

async def publish_all(assets):
    # We get the private key and address of the account deployed in step 1.
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)

    publisher_client = PragmaPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
        network=os.environ['NETWORK'] # ENV var set to `testnet | mainnet`
    )

    # Use your own custom logic
    _entries = fetch_entries(assets)
    await publisher_client.publish_many(_entries)

    logger.info("Publishing the following entries:")
    for entry in _entries:
        log_entry(entry, logger=logger)

if __name__ == "__main__":
    asyncio.run(publish_all(PRAGMA_ALL_ASSETS))
