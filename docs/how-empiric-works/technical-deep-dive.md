# Technical Deep Dive

### Architecture

The Empiric Oracle consists of three smart contracts, that each play a role in making the oracle easy to use and robust.

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption><p>Architecture overview for Empiric Network smart contracts</p></figcaption></figure>

The first is the Publisher Registry, which is the most static. This is designed to be updated extremely infrequently because its state should be permanent (each publisher and their address). This is currently an ownable contract but will become permissionless as Empiric decentralizes.

The second is the Oracle implementation and its proxy, which are also designed to be updated only as frequently as absolutely necessary. This is the contract which protocols use, and the one to which publishers publish. In the background, it coordinates the Publisher Registry and the Oracle contract implementation(s). The implementation contains the logic for storing and aggregating specific key/value data streams.

### Deployed Contracts

On Starknet Alpha-Goerli (testnet), the contracts are currently deployed at the following addresses:

| Contract           | Starkscan                                                                                                        | Address                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Publisher Registry | [Link](https://testnet.starkscan.co/contract/0x06debea885f954b1090a8b2194b940cceb585d35cd3e8a5ab1874a9360c8c1b8) | 0x6debea885f954b1090a8b2194b940cceb585d35cd3e8a5ab1874a9360c8c1b8 |
| Oracle (Proxy)     | [Link](https://testnet.starkscan.co/contract/0x40749e84da5270ee2ccf3c290b985c678b86f0e97f60910bb027ed97f6b101f)  | 0x40749e84da5270ee2ccf3c290b985c678b86f0e97f60910bb027ed97f6b101f |
