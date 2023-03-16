pragma solidity ^0.8.9;

interface ISummaryStats {
    struct TickElem { 
        uint256 tick;
        uint256 value;
    }

    function calculateVolatility(
        bytes32 key, 
        uint256 startTick, 
        uint256 endTick,
        uint256  numSamples
    ) external view returns (
        uint256);
        
}