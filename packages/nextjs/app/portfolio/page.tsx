"use client";

import { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon as LeafIcon } from "@heroicons/react/24/outline";

// Mock user portfolio data based on My Portfolio design
const mockPortfolioData = {
  totalCO2Offset: 2.4,
  vcuGenerated: 2450,
  patchesOwned: 4,
  portfolioValue: 5,
  // Growth percentages
  co2Growth: "+12% Up from last month",
  vcuGrowth: "+15% Up from last month",
  patchesGrowth: "+50% Up from last month",
  portfolioGrowth: "+19% Up from last day",
};

// My patches data
const myPatches = [
  {
    id: "1",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
  {
    id: "2",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
  {
    id: "3",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
  {
    id: "4",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
  {
    id: "5",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
];

// Transaction history
const transactionHistory = [
  {
    id: "1",
    type: "patch",
    name: "Kouzai Patch #001",
    date: "15/03/2024",
    amount: "1.1 ETH",
    status: "confirmed",
  },
  {
    id: "2",
    type: "patch",
    name: "Kouzai Patch #001",
    date: "15/03/2024",
    amount: "1.1 ETH",
    status: "confirmed",
  },
  {
    id: "3",
    type: "patch",
    name: "Kouzai Patch #001",
    date: "15/03/2024",
    amount: "1.1 ETH",
    status: "confirmed",
  },
  {
    id: "4",
    type: "patch",
    name: "Kouzai Patch #001",
    date: "15/03/2024",
    amount: "1.1 ETH",
    status: "confirmed",
  },
  {
    id: "5",
    type: "patch",
    name: "Kouzai Patch #001",
    date: "15/03/2024",
    amount: "1.1 ETH",
    status: "confirmed",
  },
];

export default function PortfolioPage() {
  const { isConnected } = useAccount();
  const [selectedPatch, setSelectedPatch] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card w-96 bg-white shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-2xl font-bold text-gray-800">Connect Your Wallet</h2>
            <p className="text-gray-600 my-4">Please connect your wallet to view your portfolio</p>
          </div>
        </div>
      </div>
    );
  }

  const handleProjectClick = (projectId: string) => {
    window.location.href = `/project/${projectId}`;
  };

  const handlePatchAction = (action: string, patchId: string) => {
    console.log(`${action} patch ${patchId}`);
    // TODO: Implement patch management actions
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
            <p className="text-gray-600">Manage your investments and track your performance</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <LeafIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Tons CO₂ Offset</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{mockPortfolioData.totalCO2Offset}</p>
              <p className="text-sm text-green-600">{mockPortfolioData.co2Growth}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">VCU Generated</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {mockPortfolioData.vcuGenerated.toLocaleString()}{" "}
                <span className="text-lg font-normal text-gray-600">VCU</span>
              </p>
              <p className="text-sm text-green-600">{mockPortfolioData.vcuGrowth}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Patches owned</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {mockPortfolioData.patchesOwned.toString().padStart(2, "0")}
              </p>
              <p className="text-sm text-green-600">{mockPortfolioData.patchesGrowth}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Portfolio value</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {mockPortfolioData.portfolioValue} <span className="text-lg font-normal text-gray-600">ETH</span>
              </p>
              <p className="text-sm text-green-600">{mockPortfolioData.portfolioGrowth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Patches Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Patches</h2>
        </div>

        {/* Patches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {myPatches.map(patch => (
            <div
              key={patch.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleProjectClick(patch.id)}
            >
              <div className="relative h-48">
                <Image src={patch.image} alt={patch.name} className="object-cover" fill />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white">
                    <HeartIcon className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <div className="relative">
                    <button
                      className="p-2 bg-white/90 rounded-full hover:bg-white"
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedPatch(selectedPatch === patch.id ? null : patch.id);
                      }}
                    >
                      <EllipsisVerticalIcon className="h-4 w-4 text-gray-600" />
                    </button>
                    {selectedPatch === patch.id && (
                      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          onClick={e => {
                            e.stopPropagation();
                            handlePatchAction("edit", patch.id);
                            setSelectedPatch(null);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          onClick={e => {
                            e.stopPropagation();
                            handlePatchAction("delete", patch.id);
                            setSelectedPatch(null);
                          }}
                        >
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">{patch.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LeafIcon className="h-4 w-4" />
                    <span>{patch.carbonCredits.toLocaleString()} VCU total</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                    <span>{patch.yearlyVCU.toLocaleString()} VCU this year</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>{patch.profitsGenerated.toLocaleString()} $ profits generated</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My History Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900">My History</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {transactionHistory.map(transaction => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.name}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{transaction.amount}</p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
