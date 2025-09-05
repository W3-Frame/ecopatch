"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BeakerIcon, CurrencyDollarIcon, MapPinIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

export interface EcoPatchNFT {
  id: number;
  tokenId: number;
  name: string;
  location: string;
  area: string; // e.g., "0.5 hectares"
  co2Impact: string; // e.g., "2t CO₂/year"
  price: string; // e.g., "0.05 ETH"
  image?: string;
  coordinates?: string; // GPS coordinates
  owner?: string;
  isForSale?: boolean;
}

interface NFTCardProps {
  nft: EcoPatchNFT;
  showBuyButton?: boolean;
  onBuy?: (nft: EcoPatchNFT) => void;
  className?: string;
  showFavorite?: boolean;
}

export const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  showBuyButton = true,
  onBuy,
  className = "",
  showFavorite = false,
}) => {
  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBuy) {
      onBuy(nft);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement favorite functionality
  };

  const getPlaceholderImage = (id: number) => {
    const images = [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1574263867128-1e4f06611ac6?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop&crop=center",
    ];
    return images[id % images.length];
  };

  return (
    <div className={`group relative ${className}`}>
      <Link href={`/nft/${nft.tokenId}`} className="block">
        <div className="card bg-base-100 glass-card overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
          <figure className="relative h-52 overflow-hidden">
            <Image
              src={nft.image || getPlaceholderImage(nft.id)}
              alt={nft.name}
              width={400}
              height={200}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Status Badge */}
            {nft.isForSale && (
              <div className="absolute top-3 left-3">
                <div className="badge badge-success gap-1 text-white font-medium shadow-lg">
                  <SparklesIcon className="h-3 w-3" />
                  For Sale
                </div>
              </div>
            )}

            {/* Favorite Button */}
            {showFavorite && (
              <button
                onClick={handleFavoriteClick}
                className="absolute top-3 right-3 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 border-none shadow-lg"
              >
                <HeartIcon className="h-4 w-4 text-error" />
              </button>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </figure>

          <div className="card-body p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="card-title text-lg font-bold text-base-content line-clamp-1">{nft.name}</h3>
                <div className="badge badge-outline badge-sm mt-1">Token #{nft.tokenId}</div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center text-sm text-base-content/70">
                <MapPinIcon className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <span className="truncate">{nft.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center bg-primary/5 rounded-lg p-2">
                  <BeakerIcon className="h-3 w-3 mr-1.5 text-primary" />
                  <span className="font-medium">{nft.area}</span>
                </div>
                <div className="flex items-center bg-success/10 rounded-lg p-2">
                  <span className="text-success font-medium">{nft.co2Impact}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="card-actions justify-between items-center pt-3 border-t border-base-content/10">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 mr-1 text-success" />
                <span className="text-xl font-bold text-success">{nft.price}</span>
              </div>

              {showBuyButton && nft.isForSale && (
                <button
                  onClick={handleBuyClick}
                  className="btn btn-primary btn-sm font-medium shadow-md hover:shadow-lg"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
