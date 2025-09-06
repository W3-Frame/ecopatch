"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NFTCard } from "~~/components/ecopatch/NFTCard";
import { PurchaseModal } from "~~/components/ecopatch/PurchaseModal";

// Mock data - will be replaced with smart contract data
const mockProjects = [
  {
    id: "1",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    price: parseEther("0.085"),
    location: "Congo Basin",
    carbonCredits: 85000,
    profitsGenerated: 18000,
    totalSupply: 100,
    availableSupply: 65,
    description:
      "Restoring Congo Basin rainforest by planting native trees, protecting wildlife habitats, capturing carbon, and supporting sustainable livelihoods for surrounding communities.",
  },
  {
    id: "2",
    name: "Mangrove Restoration Program",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070",
    price: parseEther("0.065"),
    location: "Indonesia",
    carbonCredits: 65000,
    profitsGenerated: 12000,
    totalSupply: 150,
    availableSupply: 89,
    description:
      "This program restores mangroves, protecting coasts, storing carbon, reducing erosion, supporting biodiversity, and improving livelihoods for local coastal communities.",
  },
  {
    id: "3",
    name: "Sahel Green Belt Initiative",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?q=80&w=2070",
    price: parseEther("0.075"),
    location: "West Africa",
    carbonCredits: 75000,
    profitsGenerated: 15000,
    totalSupply: 200,
    availableSupply: 142,
    description:
      "Creating a green belt across the Sahel to combat desertification, restore degraded lands, and support sustainable agriculture.",
  },
  {
    id: "4",
    name: "Coral Reef Conservation",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2074",
    price: parseEther("0.095"),
    location: "Great Barrier Reef",
    carbonCredits: 95000,
    profitsGenerated: 22000,
    totalSupply: 80,
    availableSupply: 34,
    description:
      "Protecting and restoring coral reefs through innovative conservation techniques and community engagement.",
  },
  {
    id: "5",
    name: "Boreal Forest Protection",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2071",
    price: parseEther("0.072"),
    location: "Canada",
    carbonCredits: 72000,
    profitsGenerated: 14500,
    totalSupply: 120,
    availableSupply: 78,
    description: "Preserving vast boreal forests that serve as crucial carbon sinks and wildlife habitats.",
  },
  {
    id: "6",
    name: "Wetlands Restoration Project",
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?q=80&w=2070",
    price: parseEther("0.058"),
    location: "Louisiana, USA",
    carbonCredits: 58000,
    profitsGenerated: 9800,
    totalSupply: 90,
    availableSupply: 56,
    description:
      "Restoring critical wetland ecosystems to improve water quality, provide flood protection, and sequester carbon.",
  },
];

export default function MarketplacePage() {
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  useEffect(() => {
    let filtered = mockProjects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        project =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply availability filter
    if (selectedFilter === "available") {
      filtered = filtered.filter(project => project.availableSupply > 0);
    } else if (selectedFilter === "soldout") {
      filtered = filtered.filter(project => project.availableSupply === 0);
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedFilter]);

  const handleBuyClick = (nft: any) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    setSelectedNFT(nft);
    setIsPurchaseModalOpen(true);
  };

  const handlePurchaseConfirm = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual smart contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction

      toast.success("Purchase successful! 🎉");
      setIsPurchaseModalOpen(false);

      // Update available supply locally
      const updatedProjects = filteredProjects.map(p =>
        p.id === selectedNFT.id ? { ...p, availableSupply: p.availableSupply - 1 } : p,
      );
      setFilteredProjects(updatedProjects);
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">EcoPatch Marketplace</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Invest in environmental restoration projects and earn carbon credits while making a positive impact on our
            planet.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-base-100 rounded-lg shadow-lg p-6 -mt-16 relative z-20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects by name or location..."
                  className="input input-bordered w-full pl-12"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline gap-2">
                <FunnelIcon className="h-5 w-5" />
                Filter
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a onClick={() => setSelectedFilter("all")} className={selectedFilter === "all" ? "active" : ""}>
                    All Projects
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSelectedFilter("available")}
                    className={selectedFilter === "available" ? "active" : ""}
                  >
                    Available Only
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSelectedFilter("soldout")}
                    className={selectedFilter === "soldout" ? "active" : ""}
                  >
                    Sold Out
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredProjects.length} of {mockProjects.length} projects
            </div>
            <div className="flex gap-2">
              <div className="badge badge-success gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Live Market
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="container mx-auto px-4 pb-16">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500">No projects found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <NFTCard key={project.id} {...project} onBuyClick={() => handleBuyClick(project)} />
            ))}
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {selectedNFT && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          onConfirm={handlePurchaseConfirm}
          nft={selectedNFT}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
