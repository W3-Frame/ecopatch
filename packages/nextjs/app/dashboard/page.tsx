"use client";

import { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon as LeafIcon } from "@heroicons/react/24/outline";
import { useUserRole } from "~~/hooks/useUserRole";

// Mock user data - will be replaced with smart contract data

// All Projects for dashboard - based on Home connected design
const allProjects = [
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
  {
    id: "6",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
  {
    id: "7",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
  {
    id: "8",
    name: "Amazon Rainforest Restoration",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    carbonCredits: 85000,
    yearlyVCU: 5700,
    profitsGenerated: 18000,
  },
];

// Featured projects for carousel
const featuredProjects = [
  {
    id: "1",
    name: "Congo Basin Reforestation",
    location: "Libreville",
    description:
      "Restoring Congo Basin rainforest by planting native trees, protecting wildlife habitats, capturing carbon, and supporting sustainable livelihoods for surrounding communities.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
    vcuTotal: 132500,
    vcuThisYear: 10000,
    availablePatches: "800 / 1,003",
    tradingVolume: "24,5 ETH",
  },
  {
    id: "2",
    name: "Mangrove Restoration Program",
    location: "Indonesia",
    description:
      "This program restores mangroves, protecting coasts, storing carbon, reducing erosion, supporting biodiversity, and improving livelihoods for local coastal communities.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070",
    vcuTotal: 95000,
    vcuThisYear: 7500,
    availablePatches: "245 / 400",
    tradingVolume: "18,2 ETH",
  },
  {
    id: "3",
    name: "Sahel Green Belt Initiative",
    location: "West Africa",
    description:
      "Creating a green belt across the Sahel to combat desertification, restore degraded lands, and support sustainable agriculture.",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?q=80&w=2070",
    vcuTotal: 75000,
    vcuThisYear: 6200,
    availablePatches: "156 / 250",
    tradingVolume: "15,7 ETH",
  },
];

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const { isAdmin } = useUserRole();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const handleProjectClick = (projectId: string) => {
    window.location.href = `/project/${projectId}`;
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-2xl font-bold text-gray-800">Connect Your Wallet</h2>
            <p className="text-gray-600 my-4">Please connect your wallet to view your dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Carousel Section */}
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url('${featuredProjects[currentSlide].image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>

        {/* Carousel Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div
            className="text-white max-w-2xl cursor-pointer"
            onClick={() => handleProjectClick(featuredProjects[currentSlide].id)}
          >
            <h2 className="text-4xl font-bold mb-2">{featuredProjects[currentSlide].name}</h2>
            <p className="text-lg mb-4">{featuredProjects[currentSlide].location}</p>
            <p className="text-gray-200 mb-6 text-sm leading-relaxed">{featuredProjects[currentSlide].description}</p>

            {/* Stats overlay */}
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-gray-300">VCU Verified Carbon Unit Statistics</p>
                <p className="font-semibold">
                  Since launch: {featuredProjects[currentSlide].vcuTotal.toLocaleString()} VCU
                </p>
                <p className="font-semibold">
                  This year: {featuredProjects[currentSlide].vcuThisYear.toLocaleString()} VCU
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section - Different for Admin vs User */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {isAdmin ? (
              <>
                {/* Admin Stats */}
                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <ChartBarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Total Projects</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">153,699</p>
                  <p className="text-sm text-green-600">+2.5% Up from last month</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <LeafIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Generated</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">10,000</p>
                  <p className="text-sm text-green-600">patches generated</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Sold / Sales</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">800 / 1,003</p>
                  <p className="text-sm text-green-600">patches sold vs total</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <CurrencyDollarIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Trading Vol</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">24.5</p>
                  <p className="text-sm text-green-600">ETH trading volume</p>
                </div>
              </>
            ) : (
              <>
                {/* User Stats */}
                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <ChartBarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Tons CO₂ Offset</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">2,4</p>
                  <p className="text-sm text-green-600">+2% Up from last month</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <LeafIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">VCU Generated</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">2,450</p>
                  <p className="text-sm text-green-600">+15% Up from last month</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Patches owned</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">04</p>
                  <p className="text-sm text-green-600">+50% Up from last month</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <CurrencyDollarIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Portfolio value</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">5</p>
                  <p className="text-sm text-green-600">ETH +19% Up from last day</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* All Projects Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative h-48">
                <Image src={project.image} alt={project.name} className="object-cover" fill />
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">{project.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LeafIcon className="h-4 w-4" />
                    <span>{project.carbonCredits.toLocaleString()} VCU total</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                    <span>{project.yearlyVCU.toLocaleString()} VCU this year</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>{project.profitsGenerated.toLocaleString()} $ profits generated</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
