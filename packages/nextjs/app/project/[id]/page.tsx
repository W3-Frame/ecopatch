"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import {
  ArrowLeftIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon as LeafIcon } from "@heroicons/react/24/outline";
import { PurchaseModal } from "~~/components/ecopatch/PurchaseModal";
import { SaleConfirmationModal } from "~~/components/ecopatch/SaleConfirmationModal";

// Mock data for projects - will be replaced with smart contract data
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
    createdOn: "Aug 12, 2025, 08:40 AM",
    city: "Libreville",
    description:
      "Restoring Congo Basin rainforest by planting native trees, protecting wildlife habitats, capturing carbon, and supporting sustainable livelihoods for surrounding communities.",
    yearlyVCU: 5700,
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
      "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?q=80&w=2070",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2074",
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2071",
      "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?q=80&w=2070",
    ],
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
    createdOn: "Jul 28, 2025, 14:20 PM",
    city: "Jakarta",
    description:
      "This program restores mangroves, protecting coasts, storing carbon, reducing erosion, supporting biodiversity, and improving livelihoods for local coastal communities.",
    yearlyVCU: 4200,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
      "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?q=80&w=2070",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2074",
    ],
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const { isConnected } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const project = mockProjects.find(p => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Project not found</h1>
          <Link href="/marketplace" className="btn btn-primary mt-4">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handleSellClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    setIsSaleModalOpen(true);
  };

  const handlePurchaseConfirm = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual smart contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction

      toast.success(`Purchase of ${quantity} patch(es) successful! 🎉`);
      setIsPurchaseModalOpen(false);
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaleConfirm = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual smart contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction

      toast.success("Sale completed successfully! 🎉");
      setIsSaleModalOpen(false);
    } catch (error) {
      toast.error("Sale failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const priceInEth = formatEther(project.price);
  const totalPrice = parseFloat(priceInEth) * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/marketplace" className="btn btn-ghost gap-2">
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <button className="btn btn-ghost btn-circle">
                <ShareIcon className="h-5 w-5" />
              </button>
              <button className="btn btn-ghost btn-circle">
                <HeartIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Main Image */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={project.images[selectedImageIndex]}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm">Created on {project.createdOn}</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.city}
                </div>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <ShareIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

            {/* Stats Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <LeafIcon className="h-5 w-5" />
                <span className="font-semibold text-gray-900">{project.carbonCredits.toLocaleString()} VCU total</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <ArrowTrendingUpIcon className="h-5 w-5" />
                <span className="font-semibold text-gray-900">{project.yearlyVCU.toLocaleString()} VCU this year</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <CurrencyDollarIcon className="h-5 w-5" />
                <span className="font-semibold text-gray-900">
                  {project.profitsGenerated.toLocaleString()} $ profits generated
                </span>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <button
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-lg font-semibold hover:bg-gray-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-lg font-semibold hover:bg-gray-50"
                  onClick={() => setQuantity(Math.min(project.availableSupply, quantity + 1))}
                  disabled={quantity >= project.availableSupply}
                >
                  +
                </button>
              </div>

              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                onClick={handleSellClick}
                disabled={project.availableSupply === 0}
              >
                {project.availableSupply === 0 ? "Sold Out" : "Sell Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Thumbnail Gallery */}
        <div className="mt-8">
          <div className="flex gap-3 overflow-x-auto pb-4">
            {project.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors hover:opacity-75 ${
                  selectedImageIndex === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <Image src={img} alt={`${project.name} ${index + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onConfirm={handlePurchaseConfirm}
        nft={{
          ...project,
          price: parseEther(totalPrice.toString()),
        }}
        isLoading={isLoading}
      />

      {/* Sale Confirmation Modal */}
      <SaleConfirmationModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        onConfirm={handleSaleConfirm}
        project={{
          id: project.id,
          name: project.name,
          image: project.image,
          price: "0.031 ETH",
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
