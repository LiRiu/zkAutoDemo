// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Manager {
    uint256 public total_nonce;
    mapping (address => uint) public nonce;
    
    constructor() {
        total_nonce = 0;
    }
    
    function log(address[] memory owners) public {
        require(owners.length > 0, "no owners");

        for(uint i = 0; i < owners.length;) {
            nonce[owners[i]] = nonce[owners[i]] + 1;
            total_nonce += 1;

            unchecked {
                ++i;
            }
        }
    }
}
