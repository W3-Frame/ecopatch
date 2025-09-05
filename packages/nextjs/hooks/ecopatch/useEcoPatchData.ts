import { useMemo } from "react";
import { EcoPatchNFT } from "~~/components/ecopatch";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Mock data for demonstration - in a real app, this would come from IPFS/backend
const MOCK_PROJECTS = [
  {
    id: 1,
    tokenId: 1,
    name: "Sahel Restoration Zone A1",
    location: "Mali, West Africa",
    area: "0.5 hectares",
    co2Impact: "2.5t CO₂/year",
    price: "0.05 ETH",
    coordinates: "14.6928°N, 17.4467°W",
    isForSale: true,
    owner: "0x1234567890123456789012345678901234567890",
  },
  {
    id: 2,
    tokenId: 2,
    name: "Acacia Grove Project B2",
    location: "Senegal, West Africa",
    area: "0.3 hectares",
    co2Impact: "1.8t CO₂/year",
    price: "0.035 ETH",
    coordinates: "14.7167°N, 17.4677°W",
    isForSale: true,
    owner: "0x2345678901234567890123456789012345678901",
  },
  {
    id: 3,
    tokenId: 3,
    name: "Baobab Conservation C3",
    location: "Burkina Faso, West Africa",
    area: "0.7 hectares",
    co2Impact: "3.2t CO₂/year",
    price: "0.08 ETH",
    coordinates: "12.2383°N, 1.5616°W",
    isForSale: true,
    owner: "0x3456789012345678901234567890123456789012",
  },
  {
    id: 4,
    tokenId: 4,
    name: "Mangrove Restoration D4",
    location: "Guinea-Bissau, West Africa",
    area: "1.2 hectares",
    co2Impact: "5.1t CO₂/year",
    price: "0.12 ETH",
    coordinates: "11.8037°N, 15.1804°W",
    isForSale: false,
    owner: "0x4567890123456789012345678901234567890123",
  },
  {
    id: 5,
    tokenId: 5,
    name: "Desert Edge Reforestation E5",
    location: "Niger, West Africa",
    area: "0.4 hectares",
    co2Impact: "2.1t CO₂/year",
    price: "0.04 ETH",
    coordinates: "17.6078°N, 8.0817°E",
    isForSale: true,
    owner: "0x5678901234567890123456789012345678901234",
  },
  {
    id: 6,
    tokenId: 6,
    name: "Coastal Forest F6",
    location: "Ghana, West Africa",
    area: "0.9 hectares",
    co2Impact: "4.2t CO₂/year",
    price: "0.095 ETH",
    coordinates: "5.6037°N, 0.1870°W",
    isForSale: true,
    owner: "0x6789012345678901234567890123456789012345",
  },
];

export const useEcoPatchCollections = () => {
  // Get collections from CollectionFactory contract
  const { data: collections, isLoading: collectionsLoading } = useScaffoldReadContract({
    contractName: "CollectionFactory",
    functionName: "getCollections",
  });

  // Get total supply from SE2NFT contract
  const { data: totalSupply, isLoading: supplyLoading } = useScaffoldReadContract({
    contractName: "SE2NFT",
    functionName: "totalSupply",
  });

  const mockNFTs: EcoPatchNFT[] = useMemo(() => {
    return MOCK_PROJECTS;
  }, []);

  return {
    collections: collections || [],
    totalSupply: totalSupply ? Number(totalSupply) : 0,
    mockNFTs,
    isLoading: collectionsLoading || supplyLoading,
    error: null,
  };
};

export const useUserNFTs = (userAddress?: string) => {
  // Get user's NFT balance from SE2NFT contract - disable the hook when no address
  const { data: balance, isLoading: balanceLoading } = useScaffoldReadContract({
    contractName: "SE2NFT",
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : [undefined],
    query: {
      enabled: !!userAddress,
    },
  });

  // For demo purposes, filter mock data based on user address
  const userNFTs: EcoPatchNFT[] = useMemo(() => {
    if (!userAddress) return [];

    return MOCK_PROJECTS.filter(nft => nft.owner.toLowerCase() === userAddress.toLowerCase());
  }, [userAddress]);

  const totalValue = useMemo(() => {
    return userNFTs.reduce((sum, nft) => {
      const value = parseFloat(nft.price.replace(" ETH", ""));
      return sum + value;
    }, 0);
  }, [userNFTs]);

  return {
    userNFTs,
    balance: balance ? Number(balance) : 0,
    totalValue,
    isLoading: balanceLoading,
    error: null,
  };
};

export const useNFTById = (tokenId: number) => {
  // Get NFT owner from SE2NFT contract
  const { data: owner, isLoading: ownerLoading } = useScaffoldReadContract({
    contractName: "SE2NFT",
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
  });

  // Get NFT URI from SE2NFT contract
  const { data: tokenURI, isLoading: uriLoading } = useScaffoldReadContract({
    contractName: "SE2NFT",
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });

  const nft: EcoPatchNFT | null = useMemo(() => {
    const mockNFT = MOCK_PROJECTS.find(nft => nft.tokenId === tokenId);
    if (!mockNFT) return null;

    return {
      ...mockNFT,
      owner: (owner as string) || mockNFT.owner,
    };
  }, [tokenId, owner]);

  return {
    nft,
    tokenURI: tokenURI as string,
    isLoading: ownerLoading || uriLoading,
    error: nft ? null : "NFT not found",
  };
};

export const useMockCarbonCredits = (userAddress?: string) => {
  // Mock carbon credits data for demonstration
  const mockCredits = useMemo(() => {
    if (!userAddress) return [];

    const userNFTs = MOCK_PROJECTS.filter(nft => nft.owner.toLowerCase() === userAddress.toLowerCase());

    return userNFTs.map((nft, index) => ({
      nftId: nft.tokenId,
      nftName: nft.name,
      monthlyCredits: 0.15 + index * 0.05, // Mock monthly credits
      totalCredits: (0.15 + index * 0.05) * 4, // Mock 4 months
      lastDistribution: new Date(Date.now() - (30 - index * 5) * 24 * 60 * 60 * 1000),
      nextDistribution: new Date(Date.now() + index * 5 * 24 * 60 * 60 * 1000),
      estimatedValue: `0.00${2 + index}5 ETH`,
    }));
  }, [userAddress]);

  const totalCredits = useMemo(() => {
    return mockCredits.reduce((sum, credit) => sum + credit.totalCredits, 0);
  }, [mockCredits]);

  const monthlyEarnings = useMemo(() => {
    return mockCredits.reduce((sum, credit) => sum + credit.monthlyCredits, 0);
  }, [mockCredits]);

  return {
    carbonCredits: mockCredits,
    totalCredits,
    monthlyEarnings,
    isLoading: false,
    error: null,
  };
};
