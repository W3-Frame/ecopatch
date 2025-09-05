"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EcoPatchNFT } from "./NFTCard";
import { useAccount } from "wagmi";
import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Address } from "~~/components/scaffold-eth";

interface NFTDetailProps {
  nft: EcoPatchNFT;
  onBuy?: (nft: EcoPatchNFT) => void;
  onSell?: (nft: EcoPatchNFT) => void;
  className?: string;
}

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft, onBuy, onSell, className = "" }) => {
  const { address: connectedAddress } = useAccount();
  const [showCarbonHistory, setShowCarbonHistory] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const isOwner = nft.owner?.toLowerCase() === connectedAddress?.toLowerCase();

  const getPlaceholderImages = (id: number) => {
    const imageSets = [
      [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=left",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=right",
      ],
      [
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&crop=left",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&crop=right",
      ],
      [
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop&crop=left",
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop&crop=right",
      ],
      [
        "https://images.unsplash.com/photo-1574263867128-1e4f06611ac6?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1574263867128-1e4f06611ac6?w=800&h=600&fit=crop&crop=left",
        "https://images.unsplash.com/photo-1574263867128-1e4f06611ac6?w=800&h=600&fit=crop&crop=right",
      ],
      [
        "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?w=800&h=600&fit=crop&crop=left",
        "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?w=800&h=600&fit=crop&crop=right",
      ],
    ];
    return imageSets[id % imageSets.length];
  };

  const images = nft.image ? [nft.image] : getPlaceholderImages(nft.id);

  // Mock carbon credit history
  const carbonHistory = [
    { month: "Jan 2024", credits: 0.15, value: "0.002 ETH" },
    { month: "Feb 2024", credits: 0.18, value: "0.0025 ETH" },
    { month: "Mar 2024", credits: 0.22, value: "0.003 ETH" },
    { month: "Apr 2024", credits: 0.25, value: "0.0035 ETH" },
  ];

  const totalCreditsEarned = carbonHistory.reduce((sum, record) => sum + record.credits, 0);

  const handleBuy = () => {
    if (onBuy) onBuy(nft);
  };

  const handleSell = () => {
    if (onSell) onSell(nft);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: nft.name,
          text: `Check out this EcoPatch NFT: ${nft.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">{nft.name}</h1>
          <div className="flex items-center gap-2">
            <div className="badge badge-outline">Token #{nft.tokenId}</div>
            {nft.isForSale && (
              <div className="badge badge-success gap-1 text-white">
                <SparklesIcon className="h-3 w-3" />
                For Sale
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggleFavorite}
            className="btn btn-circle btn-outline border-primary/20 hover:border-primary"
          >
            {isFavorited ? <HeartSolidIcon className="h-5 w-5 text-error" /> : <HeartIcon className="h-5 w-5" />}
          </button>
          <button onClick={handleShare} className="btn btn-circle btn-outline border-primary/20 hover:border-primary">
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Gallery - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={images[selectedImage]}
                alt={nft.name}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${index + 1}`}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Interactive Map */}
          <div className="bg-gradient-to-br from-primary/5 to-success/5 rounded-2xl p-6 border border-primary/10">
            <div className="text-center text-primary">
              <GlobeAltIcon className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Location Overview</h3>
              <p className="text-sm text-base-content/70 mb-2">{nft.location}</p>
              {nft.coordinates && <p className="text-xs text-base-content/50 font-mono">{nft.coordinates}</p>}
              <button className="btn btn-outline btn-sm mt-3">View on Map</button>
            </div>
          </div>
        </div>

        {/* Details Panel - 1/3 width on desktop */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Patch Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm text-base-content/70">Location</span>
                </div>
                <span className="font-medium">{nft.location}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center">
                  <BeakerIcon className="h-5 w-5 text-success mr-3" />
                  <span className="text-sm text-base-content/70">Area</span>
                </div>
                <span className="font-medium">{nft.area}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div className="flex items-center">
                  <SparklesIcon className="h-5 w-5 text-warning mr-3" />
                  <span className="text-sm text-base-content/70">CO₂ Impact</span>
                </div>
                <span className="font-medium text-success">{nft.co2Impact}</span>
              </div>
            </div>
          </div>

          {/* Owner & Price */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center text-base-content/70 mb-2">
                  <UserIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Current Owner</span>
                </div>
                <Address address={nft.owner} />
              </div>
            </div>

            {nft.isForSale && (
              <div className="mb-6 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-xl border border-success/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-success">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Current Price</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{nft.price}</p>
                    <p className="text-xs text-base-content/50">≈ $2,840 USD</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isOwner && nft.isForSale && (
                <button onClick={handleBuy} className="btn btn-primary w-full shadow-lg hover:shadow-xl">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                  Buy This Patch
                </button>
              )}

              {isOwner && (
                <button
                  onClick={handleSell}
                  className="btn btn-outline w-full border-primary hover:bg-primary hover:text-white"
                >
                  List for Sale
                </button>
              )}

              <button
                onClick={() => setShowCarbonHistory(!showCarbonHistory)}
                className="btn btn-ghost w-full hover:bg-primary/5"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                {showCarbonHistory ? "Hide" : "View"} Carbon History
              </button>
            </div>
          </div>

          {/* Carbon Credits History */}
          {showCarbonHistory && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-primary mb-4 flex items-center">
                <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
                Carbon Credits History
              </h3>
              <div className="space-y-3">
                {carbonHistory.map((record, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-success/5 rounded-lg border border-success/10"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-success" />
                      <span className="text-sm font-medium text-base-content">{record.month}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-success">{record.credits} CO₂</p>
                      <p className="text-xs text-base-content/50">{record.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-primary/10">
                <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                  <span className="font-semibold text-primary">Total Earned:</span>
                  <span className="font-bold text-success">{totalCreditsEarned.toFixed(2)} CO₂ credits</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
