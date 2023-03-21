pragma solidity ^0.8.9;


import "../../../interfaces/ISummaryStats.sol";

import { UD60x18, ud,ln, sqrt , pow, div, ZERO, convert,mul} from "@prb/math/src/UD60x18.sol";
contract Metrics { 
    
    function volatility (
        ISummaryStats.TickElem[] memory tickElems
    ) public pure returns (
        uint256 
    )
    {
        uint256 totalSamples = tickElems.length;
        UD60x18 totalSample_conv = convert(totalSamples - 1);
        UD60x18 sum = ZERO;
        for (uint256 i = 1; i < totalSamples; i++) {
            UD60x18 num_conv = convert((tickElems[i].value*(10**8))/tickElems[i-1].value);
            UD60x18 denom_conv = convert(tickElems[i].tick - tickElems[i-1].tick);
            UD60x18 numerator = pow(ln(num_conv),convert(2));
            UD60x18 new_numerator = mul(numerator,convert(3600 * 24 * 365 * 10**8));  //factor 10**8 for better precision
            UD60x18 result = div(new_numerator,denom_conv);
            sum = sum.add(result);
        }
        return convert(sqrt(div(sum,totalSample_conv)));
        
}
}