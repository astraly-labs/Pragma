---
id: supported-assets
title: Supported Assets
sidebar_position: 2
---

---

Pragma supports specific pairs that are listed and traded by our data partners. We also support a broader concept of currencies (each pair is a price of the quote currency in terms of the base currency). For pairs not listed, their price can be deduced by "hoping" using pairs that are listed, e.g. we can combine ETH/USD and BTC/USD to get a ETH/BTC feed.

## Asset Pairs

The following asset pairs are officially supported by Pragma. More are added every week, so just reach out on [Twitter](https://twitter.com/PragmaOracle) or [Discord](https://discord.com/invite/N7sM7VzfJB) if you have a specific one you need.

The `pair_id` is calculated by utf-8 encoding the uppercased string (e.g. `str_to_felt("BTC/USD")`) and used to refer to specific feeds on-chain.

### Spot

| Ticker    | Pair Id                | Decimals | Mainnet |
| --------- | ---------------------- | -------- | ------- |
| BTC/USD   | 18669995996566340      | 8        | ✅      |
| ETH/USD   | 19514442401534788      | 8        | ✅      |
| WBTC/USD  | 6287680677296296772    | 8        | ✖️      |
| WBTC/BTC  | 6287680677295051843    | 8        | ✖️      |
| BTC/EUR   | 18669995995518290      | 8        | ✖️      |
| SOL/USD   | 23449611697214276      | 8        | ✖️      |
| AVAX/USD  | 4708022307469480772    | 8        | ✖️      |
| DOGE/USD  | 4922231280211678020    | 8        | ✖️      |
| SHIB/USD  | 6001127052081976132    | 8        | ✖️      |
| BNB/USD   | 18663394631832388      | 8        | ✖️      |
| ADA/USD   | 18370920243876676      | 8        | ✖️      |
| XRP/USD   | 24860302295520068      | 8        | ✖️      |
| MATIC/USD | 1425106761739050242884 | 8        | ✖️      |

### Stablecoins

| Ticker   | Pair Id             | Decimals | Mainnet |
| -------- | ------------------- | -------- | ------- |
| USDT/USD | 6148333044652921668 | 8        | ✅      |
| DAI/USD  | 19212080998863684   | 8        | ✅      |
| USDC/USD | 6148332971638477636 | 8        | ✅      |
| TUSD/USD | 6076854824523354948 | 8        | ✖️      |
| BUSD/USD | 4779818131840652100 | 8        | ✖️      |

### Experimental Spots (Testnet only)

These assets are available as feeds on Pragma but due to limited data sources and liquidity, we cannot guarantee their accuracy and advise to only use them for experimental use cases.

| Ticker   | Pair Id             | Decimals |
| -------- | ------------------- | -------- |
| ETH/MXN  | 19514442401011790   | 8        |
| TEMP/USD | 6072344679365825348 | 8        |

## Currencies & Rebasing

If you want the price of one asset that Pragma lists in the price of another asset also listed (e.g. the price of BTC/ETH), you can simply get the result by calling the `get_spot_with_USD_hop` or `get_spot_with_hops` endpoint. In that case, the result will have as many decimals as the base asset you are requesting, e.g. for BTC/ETH it would be 18 decimals because the base unit of ETH is wei where 10^18 wei = 1 ETH.

### Abstract Currencies

Abstract currencies are not tracking a specific token but rather a broader concept or fiat currency. E.g. there is a difference between the ETH/USD price in the abstract and the ETH/USDC price that can be had in a specific AMM pool.

| Currency | Currency Id | Decimals | Mainnet |
| -------- | ----------- | -------- | ------- |
| USD      | 5591876     | 8        | ✅      |
| BTC      | 4346947     | 8        | ✖️      |
| EUR      | 4543826     | 8        | ✖️      |

### Concrete Currencies

These are specific tokens that exist as on-chain representations.

| Currency | Currency Id  | Decimals | Starknet address Mainnet                                           | Ethereum address Mainnet                   | Starknet address Testnet                                           |
| -------- | ------------ | -------- | ------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------ |
| BTC      | 4346947      | 8        | 0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac | 0x2260fac5e5542a773aa44fbcfedf7c193bc2c599 | 0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56  |
| ETH      | 4543560      | 18       | 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7 | 0x0000000000000000000000000000000000000000 | 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7 |
| USDC     | 1431520323   | 6        | 0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8 | 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 | 0x001d5b64feabc8ac7c839753994f469704c6fabdd45c8fe6d26ed57b5eb79057 |
| USDT     | 1431520340   | 6        | 0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8 | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0x386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a  |
| DAI      | 4473161      | 18       | 0x001108cdbe5d82737b9057590adaf97d34e74b5452f0628161d237746b6fe69e | 0x6B175474E89094C44Da98b954EedeAC495271d0F | 0x0278f24c3e74cbf7a375ec099df306289beb0605a346277d200b791a7f811a19 |
| SOL      | 5459788      | 9        | N/A                                                                | 0xd31a59c85ae9d8edefec411d448f90841571b89c | N/A                                                                |
| SHIB     | 1397246274   | 18       | N/A                                                                | 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE | N/A                                                                |
| BNB      | 4345410      | 18       | N/A                                                                | 0xB8c77482e45F1F44dE1745F52C74426C631bDD52 | N/A                                                                |
| MATIC    | 331808524611 | 18       | N/A                                                                | 0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0 | N/A                                                                |
| TUSD     | 1414878020   | 18       | N/A                                                                | 0x0000000000085d4780B73119b644AE5ecd22b376 | N/A                                                                |
| AVAX     | 1096171864   | 9        | N/A                                                                | N/A                                        | N/A                                                                |
| DOGE     | 1146046277   | 8        | N/A                                                                | N/A                                        | N/A                                                                |
| ADA      | 4277313      | 6        | N/A                                                                | N/A                                        | N/A                                                                |
| XRP      | 5788240      | 6        | N/A                                                                | N/A                                        | N/A                                                                |
| BUSD     | 1112888132   | 18       | N/A                                                                | N/A                                        | N/A                                                                |
