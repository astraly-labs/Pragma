pragma solidity ^0.8.9;

import "../lib/forge-std/src/Script.sol";
import "../contracts/Proxy.sol";
import "../contracts/Oracle.sol";
import "../contracts/PublisherRegistry.sol";
import "../contracts/CurrencyManager.sol";
import "../contracts/Admin.sol";
import "../contracts/interfaces/IOracle.sol";
import "../contracts/interfaces/IPublisherRegistry.sol";
import "../contracts/interfaces/ICurrencyManager.sol";

contract deployOracle is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        TransparentUpgradeableProxy proxy;
        CurrencyManager currencyManager;
        Oracle oracle;
        PublisherRegistry publisherRegistry;
        ProxyAdmin admin;

        ICurrencyManager.Currency[]
            memory currencies = new ICurrencyManager.Currency[](5);
        currencies[0] = ICurrencyManager.Currency("USD", 6, false, address(0));
        currencies[1] = ICurrencyManager.Currency(
            "BTC",
            18,
            true,
            0x5FfD3916dCcC058aDAD868cbd4bbc58d090Ef8D2
        );
        currencies[2] = ICurrencyManager.Currency(
            "WETH",
            18,
            true,
            0x2C1b868d6596a18e32E61B901E4060C872647b6C
        );
        currencies[3] = ICurrencyManager.Currency(
            "USDC",
            6,
            true,
            0x942a59F3398Cfbf2CdB2256246F5Ed10f78C7995
        );
        currencies[4] = ICurrencyManager.Currency(
            "USDT",
            18,
            true,
            0xB57ffafc2E5A45A92f14A3aaa254B8Fa68C7F9c6
        );

        ICurrencyManager.Pair[] memory pairs = new ICurrencyManager.Pair[](5);
        pairs[0] = ICurrencyManager.Pair("WETH/USD", "WETH", "USD");
        pairs[1] = ICurrencyManager.Pair("BTC/USD", "BTC", "USD");
        pairs[2] = ICurrencyManager.Pair("USDC/USD", "USDC", "USD");
        pairs[3] = ICurrencyManager.Pair("USDT/USD", "USDT", "USD");
        pairs[4] = ICurrencyManager.Pair("DAI/USD", "DAI", "USD");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the CurrencyManager contract
        currencyManager = new CurrencyManager();

        for (uint256 i = 0; i < currencies.length; i++) {
            currencyManager.addCurrency(currencies[i]);
        }

        for (uint256 i = 0; i < pairs.length; i++) {
            currencyManager.addPair(pairs[i]);
        }

        // Deploy the PublisherRegistry contract
        publisherRegistry = new PublisherRegistry();

        publisherRegistry.addPublisher(
            "EMPIRIC",
            0xC945cf53d9Ab754a3F5EE20030C78FE5D8Ce0010
        );

        bytes32[] memory sourcesArray = new bytes32[](4);
        sourcesArray[0] = (bytes32("CEX"));
        sourcesArray[1] = (bytes32("BITSTAMP"));
        sourcesArray[2] = (bytes32("GEMINI"));
        sourcesArray[3] = (bytes32("COINBASE"));

        publisherRegistry.addSourcesForPublisher("EMPIRIC", sourcesArray);

        // Deploy the Oracle contract
        oracle = new Oracle();

        //initialise the oracle contract

        oracle.initialize(address(publisherRegistry), currencies, pairs);

        // Deploy the Admin contract
        admin = new ProxyAdmin();

        // Deploy the Upgradeable proxy contract and set the Admin contract as its implementation

        proxy = new TransparentUpgradeableProxy(
            address(oracle),
            address(admin),
            ""
        );
        vm.stopBroadcast();
    }
}
