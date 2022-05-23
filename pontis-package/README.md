# Pontis Oracle

## About

For more information, see the project's repository [here](https://github.com/42labs/Pontis).

## Usage

### Publishing a Price Feed

First, please register with the Pontis team. Currently being a data publisher is permissioned, while we build out the safeguards that will allow us to enable anyone to be a data publisher in the future. Reach out to @JonasNelle on Telegram to inquire about becoming a data publisher.

Once you have chosen your publisher_id and have a public/private key pair that is registered, you can start publishing prices!

Simply install this package and run:

```
from pontis.publisher.client import PontisPublisherClient

client = PontisPublisherClient(oracle_controller_address, private_key, publisher)
client.publish(key, value, timestamp)
```