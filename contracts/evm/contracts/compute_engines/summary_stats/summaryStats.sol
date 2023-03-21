pragma solidity ^0.8.9;


import "../../interfaces/IOracle.sol";
import "../../interfaces/ISummaryStats.sol";
import "../../utils/time_series/stats/Metrics.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract SummaryStats is ISummaryStats, Metrics{
    IOracle public oracle;

    constructor(
        address _oracle
    ) {
        oracle= IOracle(_oracle);
    }

    function calculateVolatility (
        bytes32 key, 
        uint256 startTick, 
        uint256 endTick,
        uint256  numSamples
    ) public view returns (
        uint256 
    )
    {
        require(
            numSamples <200, 
            "Num_samples is too large. Must be <=200"
        );
        uint256 latestCheckpointIndex= oracle.getLastCheckpointIndex(key);
        (IOracle.Checkpoint memory startCp, uint256 startIndex) = oracle.getLastSpotCheckpointBefore(key,startTick);
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
        uint256 r = (endIndex-startIndex)%numSamples;
        if (r*2>=numSamples){
            skipFrequency=skipFrequency+1;
        }
        TickElem[] memory tickElems;
        tickElems = _make_array(key,endIndex,startIndex,skipFrequency);
        require (tickElems.length>1,"Not enough data"); 
        uint256 rea_volatility = volatility(tickElems);
        return rea_volatility;

    }

    function testing (bytes32 key) public view returns (uint256 lastCheckpointIndex
     ) {
        uint256 latestCheckpointIndex = oracle.getLastCheckpointIndex(key);
        return latestCheckpointIndex;
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
            IOracle.Checkpoint memory cp = oracle.getSpotCheckpoint(key, i);
            tickElems[j] = TickElem(cp.timestamp, cp.value);
            j++;
        }
        return tickElems;
    }

}