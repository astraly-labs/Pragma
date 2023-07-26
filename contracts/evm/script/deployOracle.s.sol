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
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_LINEA");
        TransparentUpgradeableProxy proxy;
        Oracle oracle;
        PublisherRegistry publisherRegistry;
        ProxyAdmin admin;

        ICurrencyManager.Currency[]
            memory currencies = new ICurrencyManager.Currency[](6);
        currencies[0] = ICurrencyManager.Currency("USD", 6, true, address(0));
        currencies[1] = ICurrencyManager.Currency(
            "ETH",
            18,
            false,
            0x0000000000000000000000000000000000000000
        );
        currencies[2] = ICurrencyManager.Currency(
            "BTC",
            18,
            false,
            0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
        );
        currencies[3] = ICurrencyManager.Currency(
            "USDC",
            6,
            false,
            0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
        );
        currencies[4] = ICurrencyManager.Currency(
            "USDT",
            6,
            false,
            0xdAC17F958D2ee523a2206206994597C13D831ec7
        );
        currencies[5] = ICurrencyManager.Currency(
            "DAI",
            18,
            false,
            0x6B175474E89094C44Da98b954EedeAC495271d0F
        );

        ICurrencyManager.Pair[] memory pairs = new ICurrencyManager.Pair[](5);
        pairs[0] = ICurrencyManager.Pair("ETH/USD", "ETH", "USD");
        pairs[1] = ICurrencyManager.Pair("BTC/USD", "BTC", "USD");
        pairs[2] = ICurrencyManager.Pair("USDC/USD", "USDC", "USD");
        pairs[3] = ICurrencyManager.Pair("USDT/USD", "USDT", "USD");
        pairs[4] = ICurrencyManager.Pair("DAI/USD", "DAI", "USD");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Admin contract
        admin = new ProxyAdmin();

        // Deploy the PublisherRegistry contract
        publisherRegistry = new PublisherRegistry();

        // Deploy the Oracle contract
        oracle = new Oracle();

        // Deploy the Upgradeable proxy contract and set the Admin contract as its implementation
        proxy = new TransparentUpgradeableProxy(
            address(oracle),
            address(admin),
            abi.encodeWithSelector(
                oracle.initialize.selector,
                address(publisherRegistry),
                currencies,
                pairs
            )
        );

        // Add the EMPIRIC publisher
        publisherRegistry.addPublisher(
            "EMPIRIC",
            0xC945cf53d9Ab754a3F5EE20030C78FE5D8Ce0010 // CHANGE THIS WHEN DEPLOYING TO MAINNET
        );

        // Add the EMPIRIC sources
        bytes32[] memory sourcesArray = new bytes32[](6);
        sourcesArray[0] = (bytes32("CEX"));
        sourcesArray[1] = (bytes32("BITSTAMP"));
        sourcesArray[2] = (bytes32("ASCENDEX"));
        sourcesArray[3] = (bytes32("DEFILLAMA"));
        sourcesArray[4] = (bytes32("KAIKO"));
        sourcesArray[5] = (bytes32("COINBASE"));

        publisherRegistry.addSourcesForPublisher("EMPIRIC", sourcesArray);

        vm.stopBroadcast();
    }
}
