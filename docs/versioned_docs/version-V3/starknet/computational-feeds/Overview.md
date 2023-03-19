---
id: what-are-computational-feeds
title: What are computational feeds
sidebar_position: 1
---

---

Pragma is an oracle fully on-chain. All the data that you consume through Pragma smart-contracts was aggregated from data that was pushed on-chain by reputable exchanges and market makers. This makes Pragma oracle transparent, and auditable, but also programmable. You can compose and program data with Cairo, in order to get the right computed data for your protocol.

Pragma has designed compute engines that use the same raw market data underlying our price feeds, but calculate different metrics to produce feeds of processed data. We call these new feeds computational feeds. Since computational feeds operate entirely on-chain, they don't introduce any new security assumptions.

The current Pragma Network proxy addresses are on Testnet:

| Feed                | Address                                                             | Explorer                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Realized Volatility | 0x00b63d77cbf599e72ab23f2746edd11 97ce45960910ea048b4898c4866d7f300 | [Starkscan](https://testnet.starkscan.co/contract/0x00b63d77cbf599e72ab23f2746edd1197ce45960910ea048b4898c4866d7f300#read-contract) [Voyager](https://goerli.voyager.online/contract/0x00b63d77cbf599e72ab23f2746edd1197ce45960910ea048b4898c4866d7f300#readContract) |
| Yield Curve         | 0x06dc5481aaa92ac4c00e33465bb3278 14261c4b36322a6858c693f4e659962ec | [Starkscan](https://testnet.starkscan.co/contract/0x06dc5481aaa92ac4c00e33465bb327814261c4b36322a6858c693f4e659962ec#read-contract) [Voyager](https://goerli.voyager.online/contract/0x06dc5481aaa92ac4c00e33465bb327814261c4b36322a6858c693f4e659962ec#readContract) |
