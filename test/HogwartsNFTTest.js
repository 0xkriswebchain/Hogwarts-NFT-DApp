const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HogwartsNFT", function () {
  let hogwartsNFT;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    const HogwartsNFT = await ethers.getContractFactory("HogwartsNFT");
    hogwartsNFT = await HogwartsNFT.deploy("Hogwarts NFT", "HNFT");

    [owner, user1, user2] = await ethers.getSigners();
  });

  it("should have a name and symbol", async function () {
    expect(await hogwartsNFT.name()).to.equal("Hogwarts NFT");
    expect(await hogwartsNFT.symbol()).to.equal("HNFT");
  });

  it("should allow minting of a new NFT", async function () {
    await hogwartsNFT.mint(user1.address, "Wizarding World");
    expect(await hogwartsNFT.balanceOf(user1.address)).to.equal(1);
    expect(await hogwartsNFT.ownerOf(0)).to.equal(user1.address);
  });

  it("should not allow minting of a new NFT by a non-owner", async function () {
    await expect(
      hogwartsNFT.connect(user2).mint(user2.address, "Wizarding World")
    ).to.be.revertedWith("Only the owner can mint new NFTs");
  });

  it("should allow transfer of an NFT", async function () {
    await hogwartsNFT.mint(user1.address, "Wizarding World");
    await hogwartsNFT.transferFrom(user1.address, user2.address, 0);
    expect(await hogwartsNFT.balanceOf(user2.address)).to.equal(1);
    expect(await hogwartsNFT.ownerOf(0)).to.equal(user2.address);
  });

  it("should not allow transfer of an NFT by a non-owner", async function () {
    await hogwartsNFT.mint(user1.address, "Wizarding World");
    await expect(
      hogwartsNFT.connect(user2).transferFrom(user1.address, user2.address, 0)
    ).to.be.revertedWith("Only the owner can transfer NFTs");
  });
});
