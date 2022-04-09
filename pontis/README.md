# Pontis Oracle

## About

For more information, see the project's repository at [].

## Usage

### Publishing a Price Feed

First, you need to register with the Pontis team, as in the first version being a data publisher is currently permissioned while we build out the safeguards that will allow us to enable anyone to be a data publisher in the future. Reach out to [] to inquire about becoming a data publisher.

Once you have chosen your publisher_id and have a public/private key pair that is registered, you can start publishing prices!

Simply install this package and run:

```
from pontis.publisher.client import PontisPublisherClient

client = PontisPublisherClient(oracle_address, private_key, publisher)
client.publish(timestamp, asset, price)
```