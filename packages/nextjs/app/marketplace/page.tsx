"use client";

import React, { useMemo, useState } from "react";
import type { NextPage } from "next";
import {
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  FunnelIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  Squares2X2Icon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { EcoPatchNFT, NFTCard } from "~~/components/ecopatch";
import { useEcoPatchCollections, useEcoPatchTransactions } from "~~/hooks/ecopatch";

const Marketplace: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const { mockNFTs, isLoading } = useEcoPatchCollections();
  const { buyNFT, isLoading: transactionLoading } = useEcoPatchTransactions();

  // Filter and sort NFTs
  const filteredNFTs = useMemo(() => {
    let filtered = mockNFTs;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        nft =>
          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nft.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    switch (selectedFilter) {
      case "for-sale":
        filtered = filtered.filter(nft => nft.isForSale);
        break;
      case "high-impact":
        filtered = filtered.filter(nft => parseFloat(nft.co2Impact) >= 3.0);
        break;
      case "large-area":
        filtered = filtered.filter(nft => parseFloat(nft.area) >= 0.7);
        break;
      default:
        break;
    }

    // Sort NFTs
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "impact-high":
        filtered.sort((a, b) => parseFloat(b.co2Impact) - parseFloat(a.co2Impact));
        break;
      case "area-large":
        filtered.sort((a, b) => parseFloat(b.area) - parseFloat(a.area));
        break;
      default:
        break;
    }

    return filtered;
  }, [mockNFTs, searchQuery, selectedFilter, sortBy]);

  const handleBuyNFT = async (nft: EcoPatchNFT) => {
    await buyNFT(nft);
  };

  const marketplaceStats = useMemo(() => {
    const totalProjects = mockNFTs.length;
    const forSaleCount = mockNFTs.filter(nft => nft.isForSale).length;
    const totalValue = mockNFTs.reduce((sum, nft) => sum + parseFloat(nft.price), 0);
    const avgPrice = totalValue / totalProjects;

    return {
      totalProjects,
      forSaleCount,
      totalValue: totalValue.toFixed(2),
      avgPrice: avgPrice.toFixed(3),
    };
  }, [mockNFTs]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <SparklesIcon className="h-8 w-8 text-primary" />
            <h1 className="text-5xl font-bold text-primary">EcoPatch Marketplace</h1>
            <SparklesIcon className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Discover and invest in ecological restoration projects across Africa. Each NFT represents a land patch
            generating carbon credits for holders while supporting local communities. 🌱
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-primary">
                <ChartBarIcon className="h-6 w-6" />
              </div>
              <div className="badge badge-primary badge-sm">Active</div>
            </div>
            <div className="stat-value text-2xl font-bold text-primary">{marketplaceStats.totalProjects}</div>
            <div className="text-sm text-base-content/70">Total Projects</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-success">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <div className="badge badge-success badge-sm">Available</div>
            </div>
            <div className="stat-value text-2xl font-bold text-success">{marketplaceStats.forSaleCount}</div>
            <div className="text-sm text-base-content/70">For Sale</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-warning">
                <TrophyIcon className="h-6 w-6" />
              </div>
              <div className="badge badge-warning badge-sm">Market</div>
            </div>
            <div className="stat-value text-2xl font-bold text-warning">{marketplaceStats.totalValue}</div>
            <div className="text-sm text-base-content/70">Total Value (ETH)</div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-info">
                <ChartBarIcon className="h-6 w-6" />
              </div>
              <div className="badge badge-info badge-sm">Average</div>
            </div>
            <div className="stat-value text-2xl font-bold text-info">{marketplaceStats.avgPrice}</div>
            <div className="text-sm text-base-content/70">Avg. Price (ETH)</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Search ecological projects by name or location..."
                  className="input input-bordered w-full pl-12 pr-4 bg-base-100 border-primary/20 focus:border-primary h-12 text-base"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              {/* Filter Button */}
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-outline border-primary/20 hover:border-primary h-12 px-4"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                {showFilters && (
                  <ul className="dropdown-content z-[1] menu p-4 shadow-xl bg-base-100 rounded-2xl w-80 mt-2 border border-primary/10">
                    <li className="mb-3">
                      <div className="font-semibold text-primary mb-2">Category Filter</div>
                      <select
                        className="select select-bordered w-full bg-base-100 border-primary/20 focus:border-primary"
                        value={selectedFilter}
                        onChange={e => setSelectedFilter(e.target.value)}
                      >
                        <option value="all">All Projects</option>
                        <option value="for-sale">Available for Sale</option>
                        <option value="high-impact">High Impact (3+ t CO₂)</option>
                        <option value="large-area">Large Area (0.7+ ha)</option>
                      </select>
                    </li>
                    <li>
                      <div className="font-semibold text-primary mb-2">Sort By</div>
                      <select
                        className="select select-bordered w-full bg-base-100 border-primary/20 focus:border-primary"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                      >
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="impact-high">Impact: High to Low</option>
                        <option value="area-large">Area: Large to Small</option>
                      </select>
                    </li>
                  </ul>
                )}
              </div>

              {/* View Toggle */}
              <div className="join">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`btn join-item h-12 ${viewMode === "grid" ? "btn-primary" : "btn-outline border-primary/20"}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`btn join-item h-12 ${viewMode === "list" ? "btn-primary" : "btn-outline border-primary/20"}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center justify-between">
              <p className="text-base-content/70">
                Showing <span className="font-semibold text-primary">{filteredNFTs.length}</span> of{" "}
                <span className="font-semibold">{mockNFTs.length}</span> ecological projects
              </p>
              {(searchQuery || selectedFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* NFT Collection */}
        {filteredNFTs.length > 0 ? (
          <div
            className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}`}
          >
            {filteredNFTs.map(nft => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onBuy={handleBuyNFT}
                showBuyButton={true}
                showFavorite={true}
                className={`${transactionLoading ? "opacity-50 pointer-events-none" : ""} ${
                  viewMode === "list" ? "flex-row" : ""
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
              <FunnelIcon className="h-16 w-16 mx-auto mb-6 text-primary/50" />
              <h3 className="text-2xl font-semibold text-primary mb-2">No projects found</h3>
              <p className="text-base-content/70 mb-6">
                We couldn&apos;t find any ecological projects matching your criteria. Try adjusting your search or
                filter settings.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="btn btn-primary shadow-lg"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                Show All Projects
              </button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {transactionLoading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-card rounded-2xl p-8 text-center max-w-sm mx-4">
              <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
              <h3 className="text-lg font-semibold text-primary mb-2">Processing Transaction</h3>
              <p className="text-base-content/70">Please wait while we process your NFT purchase...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
