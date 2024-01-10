import { ethers } from "hardhat";

async function main() {
  const manager = await ethers.deployContract("Manager");

  await manager.waitForDeployment();

  console.log(
    `Manager deployed to ${manager.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
