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
| Publisher Registry | [Link](https://testnet.starkscan.co/contract/0x5cb0afa98435de7da6da7fad3b40c9d17e747a57bca28feb1c41f05e391f54e) | 0x5cb0afa98435de7da6da7fad3b40c9d17e747a57bca28feb1c41f05e391f54e |
| Oracle (Proxy)     | [Link](https://testnet.starkscan.co/contract/0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093)  | 0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093 |
