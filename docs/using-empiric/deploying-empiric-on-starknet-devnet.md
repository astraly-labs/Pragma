# Deploying Empiric on Starknet Devnet using the empiric cli



Commands below will install the devnet, create accounts and deploy empiric contracts on the local devnet at http://127.0.0.1:5050. 
All the configurations are stored in cli-config.ini including the addresses for the contracts, private key and public user address.

```
pip install -e empiric-package
python -m empiric.cli devnet
python -m empiric.cli quickstart -f
python -m empiric.cli contracts deploy
```


Next step is to register a publisher which can publish the entries. Yopu can register self or another publisher by providing the private key

```
python -m empiric.cli contracts publisher-registry register-self empiric
```

Now to publish some entries

```
python -m empiric.cli contracts oracle publish-entry btc/usd,19155999999999998951424,now,cex,empiric
```

Reading the above publishes values

```
python -m empiric.cli contracts oracle get-value btc/usd
```

Output should look something like

```
publishers: Result(value=19155999999999998951424, decimals=0, last_updated_timestamp=1663855633, num_sources_aggregated=1)
```
