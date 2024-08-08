const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RandomHouseAssignment", function () {
  let randomHouseAssignment;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    const RandomHouseAssignment = await ethers.getContractFactory(
      "RandomHouseAssignment"
    );
    randomHouseAssignment = await RandomHouseAssignment.deploy(); // Make sure the constructor is called with the correct number of arguments

    [owner, user1, user2] = await ethers.getSigners();
  });

  it("should assign a random house to a user", async function () {
    await randomHouseAssignment.assignHouse(user1.address);
    const house = await randomHouseAssignment.houses(user1.address);
    expect(house).to.be.oneOf([
      "Gryffindor",
      "Slytherin",
      "Ravenclaw",
      "Hufflepuff",
    ]);
  });

  // Add more tests for the RandomHouseAssignment contract
});
