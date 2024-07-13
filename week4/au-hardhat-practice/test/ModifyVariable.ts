import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("TestModifyVariable", function () {
    it("should change x to 1337", async function () {
        const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

        // we then use the ContractFactory object to deploy an instance of the contract
        const contract = await ModifyVariable.deploy(10);

        // wait for contract to be deployed and validated!
        // await contract.deployed();

        // modify x from 10 to 1337 via this function!
        await contract.modifyToLeet();
        // getter for state variable x
        const newX = await contract.x();
        assert.equal(parseInt(newX.toString()), 1337);
    })

})