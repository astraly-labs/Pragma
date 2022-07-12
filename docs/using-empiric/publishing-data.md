# Publishing Data

### Registering

Currently, publisher registration is permissioned while we create a robust ecosystem of publishers that will enable the transition to being a completely open network. During that initial phase, publishers send their publisher ID and account contract address to Pontis. They should also publish those online so that third parties can verify their account contract address with them directly.

### Technical Integration

Empiric makes publishing data easy because there is no off-chain infrastructure, so publishing only requires signing and timestamping data before sending it on-chain. All of this can be done with a simple, stateless node that costs a few dollars a month to run.

We provide both a Docker base image and a Python SDK to simplify the process of setting up a publisher, which usually takes an hour to half a day.

The initial publishing frequency for the oracle is every 5 minutes on Starknet Alpha-Goerli testnet, we expect to move to single-digit seconds as the network matures and value secured grows.

#### Docker Image

In this setup, the `fetch-and-publish.py` script would fetch data (your custom logic) and then use the Pontis SDK to publish that data. See this example \[TODO ADD LINK]. The base image is available on [Dockerhub](https://hub.docker.com/repository/docker/42labs/empiric-publisher) and comes with the Python and all requirements (including the empiric-network Python package) installed.

```docker
FROM 42labs/empiric-publisher:0.7.0

COPY fetch-and-publish.py ./fetch-and-publish.py
CMD python fetch-and-publish.py
```

#### Using the Empiric Network Python SDK

```python
import os

from empiric.core.entry import construct_entry
from empiric.core.utils import currency_pair_to_key
from empiric.publisher.client import PontisPublisherClient

publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))

client = PontisPublisherClient(publisher_private_key, publisher_address)
entry = construct_entry(
	key=currency_pair_to_key("ETH", "USD"),
	value=10, # shifted 10 ** decimals; see get_decimals above
	timestamp=1653265959,
	publisher="gemini",
)
await client.publish(entry)
```
