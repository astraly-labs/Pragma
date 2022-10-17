// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/Math.sol";

contract EntryUtils {
    function swap(
        uint256[] memory array,
        uint256 i,
        uint256 j
    ) internal pure {
        (array[i], array[j]) = (array[j], array[i]);
    }

    function sort(
        uint256[] memory array,
        uint256 begin,
        uint256 end
    ) internal pure {
        if (begin < end) {
            uint256 j = begin;
            uint256 pivot = array[j];
            for (uint256 i = begin + 1; i < end; ++i) {
                if (array[i] < pivot) {
                    swap(array, i, ++j);
                }
            }
            swap(array, begin, j);
            sort(array, begin, j);
            sort(array, j + 1, end);
        }
    }

    function median(uint256[] memory array, uint256 length)
        internal
        pure
        returns (uint256)
    {
        sort(array, 0, length);
        return
            length % 2 == 0
                ? Math.average(array[length / 2 - 1], array[length / 2])
                : array[length / 2];
    }
}
