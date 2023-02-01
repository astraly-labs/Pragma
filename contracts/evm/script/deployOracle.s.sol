pragma solidity ^0.8.9;

import "../lib/forge-std/src/Script.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../contracts/Proxy.sol";
import "../contracts/oracle.sol";
import "../contracts/publisherRegistry.sol";
import "../contracts/EntryUtils.sol";
import "../contracts/CurrencyManager.sol";
import "../contracts/Admin.sol";
import "../contracts/interfaces/ICurrencyManager.sol";
import "../contracts/interfaces/IOracle.sol";
import "../contracts/interfaces/IPublisherRegistry.sol";







contract deployOracle is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address[] memory contractAddresses;
        TransparentUpgradeableProxy proxy;
        CurrencyManager currencyManager;




        vm.startBroadcast(deployerPrivateKey);

        // Deploy the ICurrencyManager contract
        contractAddresses.push(new ICurrencyManager().address);
        // Deploy the CurrencyManager contract
        currencyManager = new CurrencyManager(contractAddresses[0]);
        contractAddresses.push(currencyManager.address);

        currencyManager.addCurrencyData("USD", 6, false, address(0));
        currencyManager.addCurrencyData(
                "BTC",
                18,
                true,
                0x5FfD3916dCcC058aDAD868cbd4bbc58d090Ef8D2
        );
        currencyManager.addCurrencyData(
                "WETH",
                18,
                true,
                0x2C1b868d6596a18e32E61B901E4060C872647b6C
        );
        currencyManager.addCurrencyData(
                "csUSDC",
                6,
                true,
                0x942a59F3398Cfbf2CdB2256246F5Ed10f78C7995
        );       
         currencyManager.addCurrencyData(
                "USDT",
                18,
                true,
                0xB57ffafc2E5A45A92f14A3aaa254B8Fa68C7F9c6
        );     
         currencyManager.addCurrencyData(
                "DAI",
                18,
                true,
                0x04b0043030840b082a1058d14261E0f53624ca32
        ); 
               
        currencyManager.addPairData("WETH/USD", "WETH", "USD");
        currencyManager.addPairData("BTC/USD", "BTC", "USD");
        currencyManager.addPairData("csUSDC/USD", "csUSDC", "USD");
        currencyManager.addPairData("USDT/USD", "USDT", "USD");
        currencyManager.addPairData("DAI/USD", "DAI", "USD");

 


          



        // Deploy the EntryUtils contract
        contractAddresses.push(new EntryUtils().address);
        // Deploy the IPublisherRegistry contract
        address IPublisherRegistryAddress = new IPublisherRegistry().address;
        contractAddresses.push(IPublisherRegistryAddress);

        // Deploy the PublisherRegistry contract
        contractAddresses.push(new PublisherRegistry(IPublisherRegistryAddress).address);

        PublisherRegistry.addPublisher("EMPIRIC","0xC945cf53d9Ab754a3F5EE20030C78FE5D8Ce0010");
        PublisherRegistry.addSourcesForPublisher("EMPIRIC",["CEX", "BITSTAMP", "COINBASE", "ASCENDEX"]);
        // Deploy the IOracle contract
        address IOracleAddress = new IOracle().address;
        contractAddresses.push(IOracleAddress);
        
        // Deploy the Oracle contract
        contractAddresses.push(new Oracle(IOracleAddress).address);

        //initialise the oracle contract
        Oracle.initialize(contractAddresses[4], currencyManager.currencies, currencyManager.pairs);

       
        // Deploy the Admin contract
        //contractAddresses.push(new Admin(contractAddresses[0], contractAddresses[1], contractAddresses[2], contractAddresses[3], contractAddresses[4], contractAddresses[5], contractAddresses[6]).address);

        // Deploy the Upgradeable proxy contract and set the Admin contract as its implementation
        //proxy = new Upgradeable(new Admin(contractAddresses[0], contractAddresses[1], contractAddresses[2], contractAddresses[3], contractAddresses[4], contractAddresses[5], contractAddresses[6], contractAddresses[7]).address);


        
        vm.stopBroadcast();
}


}



