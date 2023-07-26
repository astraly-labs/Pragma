---
id: overview
title: Overview
sidebar_position: 1
---

---

## Data From Many Highly Liquid Market Makers & Exchanges

The journey of an individual data point (e.g. the instantaneous price on a specific exchange) in Pragma begins with one of our sources - entities that have high quality, proprietary data.
These sources sign and timestamp that data, then submit it to the underlying zk-rollup network, just like any other transaction. This makes Pragma more robust because there is no off-chain infrastructure that data has to flow through. It also makes Pragma more transparent because anyone can see exactly what each data publisher reported.

## Flexible, Verifiable & Transparent Price Feeds

Once that data is on-chain, we can then aggregate it into price feeds. Because this functionality is entirely on-chain, these feeds are transparent and verifiable: anyone can see exactly how the different data points were combined into the final answer, unlike most existing oracles that operate as off-chain black boxes.
Additionally, the Pragma oracle is able to flexibly aggregate those data points in many different ways, allowing protocols to use the flavor of price feed that works best for them. For instance, for their liquidation logic, protocols might want to use a time-weighted average (TWAP) that has higher robustness and stability but is more of a lagging indicator, while they might want to use the median for showing prices in their UI. We are working on building out different aggregation strategies and would love to hear from you on Twitter if you have a specific algorithm in mind.

## Composable Data: Computational Feeds

But Pragma's functionality goes far beyond price feeds. As DeFi matures, important protocols will evolve to run on more advanced computational feeds, as TradFi already does today. Pragma was built to create these computational feeds in a secure and verifiable manner, to unlock the next generation of sophisticated protocols.
Our first computational feed is an entirely on-chain, verifiable and transparent yield curve oracle. Our smart contract bootstraps a crypto-native yield curve using Pragma's verified data building blocks such as inputs. This feed is already being used by CurveZero for their money market protocol.
Our second computational feed is a market volatility feed based off of realized and implied volatility data derived from raw market data using verifiable computation. This feed is being integrated into vaults to ensure that trades are only executed during times of market stability and into leading lending/borrowing protocols to increase capital efficiency.
