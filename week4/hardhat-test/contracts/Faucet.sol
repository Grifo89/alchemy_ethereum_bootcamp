// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.21;

contract Faucet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function withdraw(uint256 _amount) public payable {
        require(_amount <= 100000000000000000, "Amount too large");
        (bool sent,) = payable(msg.sender).call{value: _amount}("");
    }

    // function withdraw(uint256 _amount) public payable {
    //     // users can only withdraw .1 ETH at a time, feel free to change this!
    //     require(_amount <= 100000000000000000);
    //     (bool sent,) = payable(msg.sender).call{value: _amount}("");
    //     require(sent, "Failed to send Ether");
    // }

    function withdrawAll() public onlyOwner {
        (bool sent,) = owner.call{value: address(this).balance}("");

        require(sent, "Failed to send Ether");
    }

    function destroyFaucet() public onlyOwner {
        selfdestruct(owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
}
