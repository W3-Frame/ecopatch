import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployNFTCollection: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const name = "EcopatchCollection";
  const symbol = "ECOC";
  const baseURI = "https://ipfs.io/ipfs/QmVHi3c4qkZcH3cJynzDXRm5n7dzc9R9TUtUcfnWQvhdcw";
  const supply = 4;
  const creator = deployer;

  await deploy("NFTCollection", {
    from: deployer,
    args: [name, symbol, baseURI, supply, creator],
    log: true,
    autoMine: true,
  });
};

export default deployNFTCollection;
deployNFTCollection.tags = ["NFTCollection"];
