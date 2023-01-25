# Empiric EVM Implementation

Try running some of the following tasks :

```shell
yarn

HARDHAT :
    yarn build:unit
    yarn test
    npx hardhat help
    npx hardhat test
    REPORT_GAS=true npx hardhat test
    npx hardhat node
    npx hardhat run scripts/deploy.ts
FOUNDRY :
    forge build
    forge test
```

To deploy on the Consensus ZkEVM goerli testnet, run the following command after completing the .env file:

```shell
    forge script script/depl.s.sol:depl --rpc-url $ConsensysZKevm_GOERLI_RPC_URL --broadcast --verify -vvvv
```
