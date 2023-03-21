pragma solidity ^0.8.9;

interface ISummaryStats {
    enum AggregationMode {
        MEDIAN
    }
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
        
    function testing (
        bytes32 key
    ) external view returns (
        uint256 lastCheckpointIndex
    );
}