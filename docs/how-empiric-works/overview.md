# Overview

### 1. Data From Many Highly Liquid Market Makers & Exchanges

The journey of an individual data point (e.g. the instantaneous price on a specific exchange) in Empiric begins with one of our sources - entities that have high quality, proprietary data. For financial data, this includes Alameda Research, CMT, Flow Traders, Gemini, Jane Street [and more](https://empiric.network/publishers).

These sources sign and timestamp that data, then submit it to the underlying zk-rollup network, just like any other transaction. This makes Empiric more robust because there is no off-chain infrastructure that data has to flow through. It also makes Empiric more transparent because anyone can see exactly what each data publisher reported.

### 2a. Flexible, Verifiable & Transparent Price Feeds

Once that data is on-chain, we can then aggregate it into price feeds. Because this functionality is entirely on-chain, these feeds are transparent and verifiable: anyone can see exactly how the different data points were combined into the final answer, unlike most existing oracles that operate as off-chain black boxes.

Additionally, the Empiric oracle is able to flexibly aggregate those data points in many different ways, allowing protocols to use the flavor of price feed that works best for them. For instance, for their liquidation logic, protocols might want to use a time-weighted average (TWAP) that has higher robustness and stability but is more of a lagging indicator, while they might want to use the median for showing prices in their UI. We are working on building out different aggregation strategies and would love to hear from you on [Twitter](https://twitter.com/EmpiricNetwork) if you have a specific algorithm in mind.

### 2b. Composable Data: Computational Feeds

But Empiric's functionality goes far beyond price feeds. As DeFi matures, we believe important protocols will evolve to run on more advanced computational feeds, as TradFi already does today. Empiric was built to create these computational feeds in a secure and verifiable manner, to unlock the next generation of sophisticated protocols.

Our first computational feed is an entirely on-chain, verifiable and transparent yield curve oracle. Our smart contract bootstraps a crypto-native yield curve using Empiric's verified data building blocks such as inputs. This feed is already being used by CurveZero for their money market protocol.

Our second computational feed is a market condition oracle that uses volatility, spread across sources and a number of other factors to derive an entirely on-chain, verifiable and transparent measure of market sentiment. This feed is being integrated into vaults to ensure that trades are only executed during times of market stability.&#x20;

### Technical Components

The Empiric Network is composed of a few different technical components.

First, there are the smart contracts that verify data is submitted and store it on-chain to make it available to smart contracts. These smart contracts also contain the logic for filtering and aggregating data.

Second, there is the Python package, which includes general utils (such as felt to string conversion), as well as functionality to make posting data on-chain easier and to query on-chain data feeds from off-chain.

Third, there is the Docker image which comes with all the packages and constants (e.g. contract address) installed so that publishing data is a one-line integration.

Fourth, there is the frontend which provides more information about Empiric Network and displays data from our feeds in an easy-to-use UI.

Finally, there is supporting code such as our tests, CI/CD and deployment logic that helps us ship high quality code as fast and securely as possible.
