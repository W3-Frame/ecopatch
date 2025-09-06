import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMarketplace: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("EcoPatchMarketplace", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const marketplace = await hre.ethers.getContract("EcoPatchMarketplace", deployer);
  console.log("✅ EcoPatchMarketplace deployed at:", await marketplace.getAddress());
};

export default deployMarketplace;

deployMarketplace.tags = ["EcoPatchMarketplace"];
