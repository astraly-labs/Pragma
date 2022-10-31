# Update the hardhat.config.ts to add the desired network:

Comment Out the zksync specific commands:
```
// import "@matterlabs/hardhat-zksync-deploy";
// import "@matterlabs/hardhat-zksync-solc";
```

Then update the network to the desired network:
```
  // zksolc: {
  //  ...
  // },
  // zkSyncDeploy: {
  //  ...  
  // },
  networks: {
    rinkeby: {
      url: "https://...",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
```

*BE SURE TO NOT CHECK IN THE PRIVATE KEY*

Then update the `PUBLISHER_ADDRESS` in deployPublisherRegistry.ts and run:
```
PRIVATE_KEY=<PRIVATE_KEY> npx hardhat run ./scripts/deployPublisherRegistry.ts --network <NETWORK>
```

This will log the publisher_registry address.  Update the deployOracle.ts and run:
```
PUBLISHER_REGISTRY_ADDRESS=<ADDRESS> PRIVATE_KEY=<PRIVATE_KEY> npx hardhat run ./scripts/deployOracle.ts --network <NETWORK>
```
