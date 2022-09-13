# Publishing Data

Empiric makes publishing data easy because there is no off-chain infrastructure, so publishing only requires signing and timestamping data before sending it on-chain. All of this can be done with a simple, stateless node that costs a few dollars a month to run.&#x20;

Here is the step-by-step breakdown:

### 1. Clone the Empiric Network [GitHub repo](https://github.com/42labs/Empiric).

### 2. Install the dependencies (see [instructions](https://github.com/42labs/Empiric#setup)).

### 3. Generate your public-private key pair

Run the following code to generate keys on the STARK curve (save these someplace secure and safe):

```
from starkware.crypto.signature.signature import (
    get_random_private_key,
    private_to_stark_key,
)
private_key = get_random_private_key()
public_key = private_to_stark_key(private_key)

print(f'Private Key: {private_key}')
print(f'Public Key: {public_key}')
```

### 4. Deploy the Empiric account contract on StarkNet

Use the following commands to compile and deploy the account contract. Make sure to replace `PUBLIC_KEY_FROM_STEP_3` in the second command with your \*public\* key from step 3.

```
starknet-compile --account_contract contracts/src/account/Account.cairo --abi contracts/build/Account_abi.json --output contracts/build/Account.json --cairo_path contracts/src:contracts/lib
starknet deploy --contract contracts/build/Account.json --inputs <PUBLIC_KEY_FROM_STEP_3> --no_wallet --network alpha-goerli
```

### 5. Register your account contract address with Empiric

Currently, publisher registration is permissioned while we create a robust ecosystem of publishers that will enable the transition to being a completely open network. During that initial phase, publishers send their publisher ID (the felt-encoded lowercased string, e.g. `str_to_felt("gemini")=113685324983913`) and account contract address to the Empiric team. They should also publish those online so that third parties can verify their account contract address with them directly.

### 6. Set up the data fetching logic

Anyone can publish data to the Empiric Network's smart contracts by calling the Empiric smart contract via their account contract on StarkNet.

To simplify the process of setting up a publisher, we provide a Docker base image and a Python SDK which can make it easier to get started. The process usually takes an hour to half a day.

The initial publishing frequency for the oracle is every 3 minutes on Starknet Alpha-Goerli testnet, we expect to move to single-digit seconds as the network matures and value secured grows.

#### Docker Image

In this setup, the `fetch-and-publish.py` script would fetch data (your custom logic) and then use the Empiric SDK to publish that data. See this [example](https://github.com/42labs/Empiric/blob/master/publisher/sample-publisher/coinbase/fetch-and-publish.py) -- Note the `.env` file which is passed to Docker at build time, with `PUBLISHER` and `PUBLISHER_ADDRESS` variables set, as well as a `PUBLISHER_PRIVATE_KEY` variable (which is not in the repository for obvious reasons).

The base image is available on [Dockerhub](https://hub.docker.com/repository/docker/42labs/empiric-publisher) and comes with the Python and all requirements (including the empiric-network Python package) installed.

```docker
FROM 42labs/empiric-publisher:0.8.1

COPY fetch-and-publish.py ./fetch-and-publish.py
CMD python fetch-and-publish.py
```

#### Using the Empiric Network Python SDK

See a full sample script [here](https://github.com/42labs/Empiric/blob/master/publisher/sample-publisher/coinbase/fetch-and-publish.py), or copy paste the minimal code below to get started.

```python
import asyncio
import os
import time

from dotenv import load_dotenv
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_key
from empiric.publisher.client import EmpiricPublisherClient


async def main():
    # load environment variables from .env
    load_dotenv()

    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))

    client = EmpiricPublisherClient(publisher_private_key, publisher_address)
    entry = Entry(
        key=currency_pair_to_key("TEST", "USD"),
        value=10,  # shifted 10 ** decimals; see get_decimals above
        timestamp=int(time.time()),  # UNIX format, in seconds since epoch
        source="gemini",
        publisher="<your name here>",
    )

    await client.publish(entry)


if __name__ == "__main__":
    asyncio.run(main())
```
