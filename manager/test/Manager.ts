import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Manager", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Manager = await ethers.getContractFactory("Manager");
    const manager = await Manager.deploy();

    return { manager, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy ok", async function () {
      const { manager, owner } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await manager.nonce(owner)).to.equal(0);
    });
  });

  describe("log", async function () {
    const { manager, owner } = await loadFixture(deployOneYearLockFixture);
    const response = await manager.log([owner, owner]);
    console.log(response.data);
    expect(response).to.be.ok;
    expect(await manager.nonce(owner)).to.equal(1);
  });
});
