import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCollectionFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("CollectionFactory", {
    from: deployer,
    log: true,
    autoMine: true, // speed up deployment on local networks
  });
};

export default deployCollectionFactory;
deployCollectionFactory.tags = ["CollectionFactory"];
