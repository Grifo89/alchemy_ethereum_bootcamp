// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

contract ModifyVariable {
    uint256 public x;

    constructor(uint256 _x) {
        x = _x;
    }

    function modifyToLeet() public {
        x = 1337;
    }
}
