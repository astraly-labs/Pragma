pragma solidity ^0.8.9;


import "./interfaces/IOracle.sol";

contract SummaryStats is IOracle {
    IOracle public oracle;
    function calculateVolatility (
        bytes32 key, 
        bytes32 startTick, 
        bytes32 endTick,
        bytes32 numSamples
    ) public view returns (
        uint256 
    )
    {
        require(
            numSamples <200, 
            "Num_samples is too large. Must be <=200"
        );
        uint256 latestCheckpointIndex= oracle.getLastCheckpointIndex(key);
        (uint256 startCp, uint256 startIndex) = oracle.getLastSpotCheckpointBefore(key,startTick);
        uint256 endIndex;
        if (endTick==0){
            endIndex = latestCheckpointIndex;
        } else {
            (,uint256 endIdx) = oracle.getLastSpotCheckpointBefore(key,endTick);
            endIndex = endIdx;
        }

        require(
            endIndex != numSamples,
            "Not enough data"
        );
        uint256 skipFrequency = (endIndex-startIndex)/ numSamples;
        if (skipFrequency ==0) {
            skipFrequency = 1;
        }
        if (r*2>=numSamples){
            skipFrequency=skipFrequency+1;
        }
        uint256 totalSamples = (endIndex-startIndex)/skipFrequency;
        TickElem[] memory tickElems;
        tickElems = _make_array(key,endIndex,startIndex,skipFrequency);
        uint256 volatility = volatility(tickElems);
        return volatility;


    }
     
    function _make_array(
        bytes32 key,
        uint256 endIndex,
        uint256 startIndex,
        uint256 skipFrequency
    ) internal view returns (TickElem[] memory) {
        TickElem[] memory tickElems;
        uint256 totalSamples = (endIndex-startIndex)/skipFrequency;
        tickElems = new TickElem[](totalSamples);
        uint256 j = 0;
        for (uint256 i = startIndex; i < endIndex; i=i+skipFrequency) {
            (uint256 tick, uint256 value) = oracle.getSpotCheckpoint(key, i);
            tickElems[j] = TickElem(tick, value);
            j++;
        }
        return tickElems;
    }
}