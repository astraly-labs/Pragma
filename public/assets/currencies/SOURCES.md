# Token artwork sources

Logos identify their respective tokens. Artwork belongs to the respective projects.
These local copies were retrieved on 15 September 2026; displaying an explorer
does not require requests to external image hosts.

Starknet identities were checked against the [AVNU token directory](https://docs.avnu.fi/api/tokens/get-tokens).
uniBTC was checked against Bedrock through its CoinGecko listing.

| Token     | Local file    | Artwork source                                                                                                        | Token metadata                                               |
| --------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| DASH      | dash.png      | [Source](https://coin-images.coingecko.com/coins/images/19/large/dash-logo.png?1696501423)                            | [Metadata](https://www.coingecko.com/en/coins/dash)          |
| DOG       | dog.png       | [Source](https://assets.coingecko.com/coins/images/37352/standard/DOGGOTOTHEMOON.png)                                 | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| EKUBO     | ekubo.png     | [Source](https://assets.coingecko.com/coins/images/37715/standard/135474885.png)                                      | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| LBTC      | lbtc.png      | [Source](https://assets.coingecko.com/coins/images/39969/standard/LBTC_Logo.png)                                      | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| MORPHO    | morpho.png    | [Source](https://coin-images.coingecko.com/coins/images/29837/large/Morpho-token-icon.png?1726771230)                 | [Metadata](https://www.coingecko.com/en/coins/morpho)        |
| MRE7BTC   | mre7btc.svg   | [Source](https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/3a62ecee-1e58-45d3-9862-3ce90dff1900/logo)                  | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| MRE7YIELD | mre7yield.svg | [Source](https://midas.app/assets/mre7-BcOOHm7i.svg)                                                                  | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| PAXG      | paxg.png      | [Source](https://coin-images.coingecko.com/coins/images/9519/large/asset-paxg.png?1785284785)                         | [Metadata](https://www.coingecko.com/en/coins/pax-gold)      |
| SUSN      | susn.svg      | [Source](https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/dc424e27-4538-4126-8df6-eb7b432853bf.svg) | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| UNIBTC    | unibtc.png    | [Source](https://coin-images.coingecko.com/coins/images/39599/large/uniBTC_200px.png?1723064455)                      | [Metadata](https://www.coingecko.com/en/coins/universal-btc) |
| USN       | usn.svg       | [Source](https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/31cf1a6e-1b01-4db8-abf6-e52651b1fd05.svg) | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| XAUT      | xaut.png      | [Source](https://coin-images.coingecko.com/coins/images/10481/large/logo.png?1774627372)                              | [Metadata](https://www.coingecko.com/en/coins/tether-gold)   |
| XMR       | xmr.png       | [Source](https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png?1696501460)                          | [Metadata](https://www.coingecko.com/en/coins/monero)        |
| XSTRK     | xstrk.svg     | [Source](https://dashboard.endur.fi/endur-fi.svg)                                                                     | [Metadata](https://starknet.api.avnu.fi/v1/starknet/tokens)  |
| ZEC       | zec.png       | [Source](https://coin-images.coingecko.com/coins/images/486/large/Brandmark-Yellow_%281%29.png?1785810558)            | [Metadata](https://www.coingecko.com/en/coins/zcash)         |

Existing SVG artwork is retained. `TRX` uses the existing `tron.svg`.
Add new assets to `utils/mappings.ts` so lists, asset details and publisher feeds
use the same artwork on Starknet and Miden. Unknown symbols use the existing
letter avatar.
