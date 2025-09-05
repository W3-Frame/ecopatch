"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BeakerIcon,
  CalendarIcon,
  ChartBarIcon,
  FireIcon,
  GlobeAltIcon,
  PlusIcon,
  SparklesIcon,
  TrophyIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { NFTCard } from "~~/components/ecopatch";
import { Address } from "~~/components/scaffold-eth";
import { useEcoPatchTransactions, useMockCarbonCredits, useUserNFTs } from "~~/hooks/ecopatch";

const Dashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [activeTab, setActiveTab] = useState("overview");

  const { userNFTs, totalValue, isLoading: nftsLoading } = useUserNFTs(connectedAddress);
  const {
    carbonCredits,
    totalCredits,
    monthlyEarnings,
    isLoading: creditsLoading,
  } = useMockCarbonCredits(connectedAddress);
  const { claimCarbonCredits, isLoading: transactionLoading } = useEcoPatchTransactions();

  const handleClaimCredits = async () => {
    if (carbonCredits.length === 0) return;

    const nftIds = carbonCredits.map(credit => credit.nftId);
    await claimCarbonCredits(nftIds);
  };

  if (!connectedAddress) {
    return (
      <div className="min-h-screen bg-base-200/30 flex items-center justify-center">
        <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-4">
          <div className="mb-6">
            <WalletIcon className="h-20 w-20 mx-auto mb-4 text-primary/50" />
            <h2 className="text-3xl font-bold text-primary mb-3">Connect Your Wallet</h2>
            <p className="text-base-content/70 leading-relaxed">
              Please connect your wallet to access your personalized dashboard and manage your EcoPatch investments.
            </p>
          </div>
          <div className="space-y-3">
            <Link href="/marketplace" className="btn btn-primary w-full shadow-lg">
              <SparklesIcon className="h-5 w-5 mr-2" />
              Explore Marketplace
            </Link>
            <Link href="/" className="btn btn-ghost w-full">
              Learn More About EcoPatch
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isLoading = nftsLoading || creditsLoading;

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrophyIcon className="h-8 w-8 text-primary" />
            <h1 className="text-5xl font-bold text-primary">My Dashboard</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-base-content/70">
            <span>Connected as:</span>
            <Address address={connectedAddress} />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <GlobeAltIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="badge badge-primary badge-sm">Portfolio</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">{userNFTs.length}</div>
            <div className="text-sm text-base-content/70">Ecological Patches Owned</div>
            <div className="mt-3 text-xs text-success flex items-center">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
              +2 this month
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-success/10 rounded-xl">
                <BanknotesIcon className="h-6 w-6 text-success" />
              </div>
              <div className="badge badge-success badge-sm">Value</div>
            </div>
            <div className="text-3xl font-bold text-success mb-1">{totalValue.toFixed(3)} ETH</div>
            <div className="text-sm text-base-content/70">Portfolio Market Value</div>
            <div className="mt-3 text-xs text-success flex items-center">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
              +12.5% growth
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-warning/10 rounded-xl">
                <BeakerIcon className="h-6 w-6 text-warning" />
              </div>
              <div className="badge badge-warning badge-sm">Credits</div>
            </div>
            <div className="text-3xl font-bold text-warning mb-1">{totalCredits.toFixed(2)}</div>
            <div className="text-sm text-base-content/70">Total CO₂ Credits Earned</div>
            <div className="mt-3 text-xs text-warning flex items-center">
              <SparklesIcon className="h-3 w-3 mr-1" />
              Verified carbon
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-info/10 rounded-xl">
                <FireIcon className="h-6 w-6 text-info" />
              </div>
              <div className="badge badge-info badge-sm">Monthly</div>
            </div>
            <div className="text-3xl font-bold text-info mb-1">{monthlyEarnings.toFixed(2)}</div>
            <div className="text-sm text-base-content/70">CO₂ Credits per Month</div>
            <div className="mt-3 text-xs text-info flex items-center">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Passive income
            </div>
          </div>
        </div>

        {/* Modern Tabs */}
        <div className="glass-card rounded-2xl p-2 mb-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${
                activeTab === "overview"
                  ? "bg-primary text-white shadow-lg"
                  : "text-base-content/70 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("nfts")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${
                activeTab === "nfts"
                  ? "bg-primary text-white shadow-lg"
                  : "text-base-content/70 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <GlobeAltIcon className="h-5 w-5" />
              <span>My NFTs ({userNFTs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("carbon")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${
                activeTab === "carbon"
                  ? "bg-primary text-white shadow-lg"
                  : "text-base-content/70 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <BeakerIcon className="h-5 w-5" />
              <span>Carbon Credits</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-card rounded-2xl p-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {userNFTs.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="mb-6">
                        <SparklesIcon className="h-20 w-20 mx-auto mb-4 text-primary/50" />
                        <h3 className="text-2xl font-semibold text-primary mb-3">Start Your Journey</h3>
                        <p className="text-base-content/70 leading-relaxed max-w-md mx-auto">
                          Purchase your first ecological patch NFT and begin earning carbon credits while supporting
                          African communities.
                        </p>
                      </div>
                      <Link href="/marketplace" className="btn btn-primary shadow-lg">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Explore Marketplace
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Recent Activity */}
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          {carbonCredits.slice(0, 3).map((credit, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                              <div className="flex items-center">
                                <TrophyIcon className="h-5 w-5 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">{credit.nftName}</p>
                                  <p className="text-sm text-green-600">+{credit.monthlyCredits} CO₂ credits</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">{credit.lastDistribution.toLocaleDateString()}</p>
                                <p className="text-sm font-medium text-green-700">{credit.estimatedValue}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Portfolio Performance */}
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Portfolio Performance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-green-800">+12.5%</p>
                            <p className="text-sm text-green-600">This Month</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-green-800">+24.8%</p>
                            <p className="text-sm text-green-600">This Quarter</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-green-800">+38.2%</p>
                            <p className="text-sm text-green-600">All Time</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* NFTs Tab */}
              {activeTab === "nfts" && (
                <div>
                  {userNFTs.length === 0 ? (
                    <div className="text-center py-12">
                      <ChartBarIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No NFTs in Portfolio</h3>
                      <p className="text-gray-600 mb-6">
                        Your NFT collection will appear here once you make your first purchase.
                      </p>
                      <Link
                        href="/marketplace"
                        className="btn btn-primary bg-green-600 hover:bg-green-700 border-green-600"
                      >
                        Start Investing
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userNFTs.map(nft => (
                        <NFTCard key={nft.id} nft={nft} showBuyButton={false} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Carbon Credits Tab */}
              {activeTab === "carbon" && (
                <div className="space-y-6">
                  {/* Carbon Credits Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-green-800">Carbon Credits Portfolio</h3>
                    {carbonCredits.length > 0 && (
                      <button
                        onClick={handleClaimCredits}
                        className="btn btn-primary bg-green-600 hover:bg-green-700 border-green-600"
                        disabled={transactionLoading}
                      >
                        {transactionLoading ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Claiming...
                          </>
                        ) : (
                          <>
                            <BeakerIcon className="h-5 w-5 mr-2" />
                            Claim All Credits
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {carbonCredits.length === 0 ? (
                    <div className="text-center py-12">
                      <BeakerIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Carbon Credits Yet</h3>
                      <p className="text-gray-600 mb-6">
                        Carbon credits will be generated from your NFT land patches and appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {carbonCredits.map((credit, index) => (
                        <div key={index} className="border border-green-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-green-800">{credit.nftName}</h4>
                              <p className="text-sm text-gray-600">NFT #{credit.nftId}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-700">
                                {credit.totalCredits.toFixed(2)} CO₂ credits
                              </p>
                              <p className="text-sm text-gray-500">≈ {credit.estimatedValue}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <p className="text-sm text-green-600">Monthly Generation</p>
                              <p className="font-semibold text-green-800">{credit.monthlyCredits} CO₂/month</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <p className="text-sm text-green-600">Next Distribution</p>
                              <p className="font-semibold text-green-800 flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {credit.nextDistribution.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
