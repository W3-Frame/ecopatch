import { useState } from "react";
import { EcoPatchNFT } from "~~/components/ecopatch";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const useEcoPatchTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);

  // SE2NFT contract interactions
  const { writeContractAsync: writeSE2NFT } = useScaffoldWriteContract({
    contractName: "SE2NFT",
  });

  // CollectionFactory contract interactions
  const { writeContractAsync: writeCollectionFactory } = useScaffoldWriteContract({
    contractName: "CollectionFactory",
  });

  const buyNFT = async (nft: EcoPatchNFT) => {
    if (!nft.isForSale) {
      notification.error("This NFT is not for sale");
      return false;
    }

    try {
      setIsLoading(true);
      notification.info("Initiating NFT purchase...");

      // For demo purposes, we'll mint a new NFT to the buyer
      // In a real marketplace, this would involve transferFrom and payment handling
      await writeSE2NFT({
        functionName: "mintItem",
        args: [nft.owner as `0x${string}`], // In real app, this would be the buyer's address
      });

      notification.success(`Successfully purchased ${nft.name}!`);
      return true;
    } catch (error) {
      console.error("Buy NFT error:", error);
      notification.error("Failed to purchase NFT. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sellNFT = async (nft: EcoPatchNFT, price: string) => {
    try {
      setIsLoading(true);
      notification.info("Listing NFT for sale...");

      // For demo purposes, we'll show a success message
      // In a real marketplace, this would involve approve and listing mechanisms
      notification.success(`Successfully listed ${nft.name} for ${price} ETH!`);
      return true;
    } catch (error) {
      console.error("Sell NFT error:", error);
      notification.error("Failed to list NFT for sale. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const transferNFT = async (nft: EcoPatchNFT) => {
    try {
      setIsLoading(true);
      notification.info("Transferring NFT...");

      // For demo purposes - in real app, this would call safeTransferFrom
      notification.success(`Successfully transferred ${nft.name}!`);
      return true;
    } catch (error) {
      console.error("Transfer NFT error:", error);
      notification.error("Failed to transfer NFT. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (name: string, symbol: string, baseURI: string, supply: number) => {
    try {
      setIsLoading(true);
      notification.info("Creating new ecological project...");

      await writeCollectionFactory({
        functionName: "createCollection",
        args: [name, symbol, baseURI, BigInt(supply)],
      });

      notification.success(`Successfully created project: ${name}!`);
      return true;
    } catch (error) {
      console.error("Create project error:", error);
      notification.error("Failed to create project. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const claimCarbonCredits = async (nftIds: number[]) => {
    try {
      setIsLoading(true);
      notification.info("Claiming carbon credits...");

      // For demo purposes - simulate claiming process
      await new Promise(resolve => setTimeout(resolve, 2000));

      notification.success(`Successfully claimed carbon credits for ${nftIds.length} NFTs!`);
      return true;
    } catch (error) {
      console.error("Claim carbon credits error:", error);
      notification.error("Failed to claim carbon credits. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    buyNFT,
    sellNFT,
    transferNFT,
    createProject,
    claimCarbonCredits,
    isLoading,
  };
};
