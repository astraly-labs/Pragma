pragma solidity ^0.8.9;

interface ISummaryStats {
    struct TickElem { 
        uint256 tick;
        uint256 value;
    }

    function calculateVolatility(
        address oracleAddress, 
        bytes32 key, 
        bytes32 startTick, 
        bytes32 endTick,
        bytes32 numSamples
    ) external view returns (
        uint256);
        
}