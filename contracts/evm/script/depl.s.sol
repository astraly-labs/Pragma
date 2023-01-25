pragma solidity ^0.8.9;

import "../lib/forge-std/src/Script.sol";
import "../contracts/oracle.sol";
import "../contracts/publisherRegistry.sol";
import "../contracts/EntryUtils.sol";


contract depl is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        CurrencyManager currencyManager = new CurrencyManager();
        Oracle oracle = new Oracle();
        PublisherRegistry publisherRegistry = new PublisherRegistry();
        EntryUtils entryUtils = new EntryUtils();


        vm.stopBroadcast();
}


}

// Path: contracts/evm/script/depl.s.sol
// Compare this snippet from contracts/evm/contracts/EntryUtils.sol:   
// pragma solidity ^0.8.9;