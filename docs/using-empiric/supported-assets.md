# Supported Assets

The following assets are officially supported by Empiric. More are added every week, so just reach out on [Twitter](https://twitter.com/EmpiricNetwork) if you have a specific one you need.&#x20;

The key is calculated by utf-8 encoding the lowercased string (e.g. `str_to_felt("btc/usd")`) and used to refer to specific feeds on-chain (each oracle function takes a `key` argument).

### **Spot assets**

* BTC/USD, key: 27712517064455012
* BTC/EUR, key: 27712517063406962
* ETH/USD, key: 28556963469423460
* ETH/MXN \[Experimental], key: 28556963468900462
* SOL/USD, key: 32492132765102948
* AVAX/USD, key: 7022907837751063396
* DOGE/USD, key: 7237116810493260644
* SHIB/USD, key: 8316012582363558756
* BNB/USD, key: 27705915699721060
* ADA/USD, key: 27413441311765348
* XRP/USD, key: 33902823363408740
* MATIC/USD, key: 2017717457628037477220
* AAVE/USD, key: 7017019871379944292
* TEMP/USD \[Experimental], key: 8387230209647407972

### **Stablecoins**

* USDT/USD, key: 8463218574934504292
* DAI/USD, key: 28254602066752356
* USDC/USD, key: 8463218501920060260
* TUSD/USD, key: 8391740354804937572
* BUSD/USD, key: 7094703662122234724

### Quarterly Futures

* BTC/USD
  * See [FTX.com](https://help.ftx.com/hc/en-us/articles/360024780791-What-Are-Futures-) for all futures available
  * E.g. BTC/USD-20221230, key: 130868661741135440923999738525381702448
* ETH/USD
  * See [FTX.com](https://help.ftx.com/hc/en-us/articles/360024780791-What-Are-Futures-) for all futures available
  * E.g. ETH/USD-20221230, key: 134856447140538206801063279442479166256
