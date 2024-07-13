const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Faucet",function () {

  async function deployContract() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    let withdrawAmount = ethers.parseUnits("4.5", "gwei");
    
  
    const [owner] = await ethers.getSigners();

    // console.log('Signer 1 address: ', owner.address);

    return { faucet, owner, withdrawAmount };
    
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContract);
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above 1 EHT at a time', async function () {
    const { faucet, withdrawAmount } = await loadFixture(deployContract);
    
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;

    
    
  });
})