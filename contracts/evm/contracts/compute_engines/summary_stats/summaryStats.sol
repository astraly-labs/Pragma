pragma solidity ^0.8.9;


import "./interfaces/IOracle.sol";

contract SummaryStats is IOracle {
    IOracle public oracle;
    function calculateVolatility (
        address oracleAddress, 
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
        TickElem[] memory tickElems = new TickElem[](totalSamples);
        

    }
}