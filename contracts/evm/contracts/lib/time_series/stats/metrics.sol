pragma solidity ^0.8.9;


import "../../../interfaces/ISummaryStats.sol";

import { UD60x18, toUD60x18,ln, sqrt, fromUD60x18 , pow, div, ZERO} from "@prb/math/src/UD60x18.sol";
contract Metrics { 
    
    function volatility (
        ISummaryStats.TickElem[] memory tickElems
    ) public pure returns (
        uint256 
    )
    {
        uint256 totalSamples = tickElems.length;
        UD60x18 totalSample_conv = toUD60x18(totalSamples-1);
        UD60x18 sum = ZERO;
        for (uint256 i = 1; i < totalSamples; i++) {
            UD60x18 num_conv = toUD60x18(tickElems[i].value/tickElems[i-1].value);
            UD60x18 denom_conv = toUD60x18((tickElems[i].tick - tickElems[i-1].tick) /(3600 * 24 * 365));
            UD60x18 numerator = pow(ln(num_conv),toUD60x18(2));
            UD60x18 result = div(numerator,denom_conv);
            sum = sum.add(result);
        }
        
        return fromUD60x18(sqrt(div(sum,totalSample_conv)));
}
}