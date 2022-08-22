# Supported Assets

The following assets are officially supported by Empiric. More are added every week, so just reach out on [Twitter](https://twitter.com/EmpiricNetwork) if you have a specific one you need.

The key is calculated by utf-8 encoding the lowercased string (e.g. `str_to_felt("btc/usd")`) and used to refer to specific feeds on-chain (each oracle function takes a `key` argument).

### Spot Assets

| Ticker    | Key                    | Decimals |
| --------- | ---------------------- | -------- |
| BTC/USD   | 27712517064455012      | 18       |
| BTC/EUR   | 27712517063406962      | 18       |
| ETH/USD   | 28556963469423460      | 18       |
| SOL/USD,  | 32492132765102948      | 18       |
| AVAX/USD  | 7022907837751063396    | 18       |
| DOGE/USD  | 7237116810493260644    | 18       |
| SHIB/USD  | 8316012582363558756    | 18       |
| BNB/USD   | 27705915699721060      | 18       |
| ADA/USD   | 27413441311765348      | 18       |
| XRP/USD   | 33902823363408740      | 18       |
| MATIC/USD | 2017717457628037477220 | 18       |

### **Stablecoins**

| Ticker   | Key                 | Decimals |
| -------- | ------------------- | -------- |
| USDT/USD | 8463218574934504292 | 18       |
| DAI/USD  | 28254602066752356   | 18       |
| USDC/USD | 8463218501920060260 | 18       |
| TUSD/USD | 8391740354804937572 | 18       |
| BUSD/USD | 7094703662122234724 | 18       |

### Quarterly Futures

* BTC/USD
  * See [FTX.com](https://help.ftx.com/hc/en-us/articles/360024780791-What-Are-Futures-) for all futures available
  * E.g. BTC/USD-20221230, key: 130868661741135440923999738525381702448
* ETH/USD
  * See [FTX.com](https://help.ftx.com/hc/en-us/articles/360024780791-What-Are-Futures-) for all futures available
  * E.g. ETH/USD-20221230, key: 134856447140538206801063279442479166256

### **Experimental Spot Assets**

These assets are available as feeds on Empiric but due to limited data sources and liquidity, we cannot guarantee their accuracy.

| Ticker   | Key                 | Decimals |
| -------- | ------------------- | -------- |
| ETH/MXN  | 28556963468900462   | 18       |
| TEMP/USD | 8387230209647407972 | 18       |

****
