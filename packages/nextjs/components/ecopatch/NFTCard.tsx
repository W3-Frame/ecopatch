"use client";

import Image from "next/image";
import { formatEther } from "viem";
import { CircleStackIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon as LeafIcon } from "@heroicons/react/24/outline";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  price: bigint;
  location: string;
  carbonCredits: number;
  profitsGenerated: number;
  totalSupply: number;
  availableSupply: number;
  onBuyClick: () => void;
  isSelling?: boolean;
  onSellClick?: () => void;
}

export const NFTCard = ({
  name,
  image,
  price,
  location,
  carbonCredits,
  profitsGenerated,
  totalSupply,
  availableSupply,
  onBuyClick,
  isSelling = false,
  onSellClick,
}: NFTCardProps) => {
  const priceInEth = formatEther(price);

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <figure className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {availableSupply > 0 && (
          <div className="absolute top-4 right-4 badge badge-primary gap-2">
            <CircleStackIcon className="h-4 w-4" />
            {availableSupply}/{totalSupply} available
          </div>
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title text-gray-800 font-bold">{name}</h2>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPinIcon className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-primary">
              <LeafIcon className="h-4 w-4" />
              <span className="text-xs font-semibold">VCU Total</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{carbonCredits.toLocaleString()}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-semibold">VCU This Year</span>
            <span className="text-lg font-bold text-gray-800">{(carbonCredits * 0.15).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between my-2">
          <div className="text-xs text-gray-500">
            <span className="font-semibold">{profitsGenerated.toLocaleString()} $</span> profits generated
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="card-actions justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Price</span>
            <span className="text-2xl font-bold text-primary">{priceInEth} ETH</span>
          </div>

          {isSelling ? (
            <button className="btn btn-error btn-md" onClick={onSellClick}>
              Sell Now
            </button>
          ) : (
            <button className="btn btn-primary btn-md" onClick={onBuyClick} disabled={availableSupply === 0}>
              {availableSupply === 0 ? "Sold Out" : "Buy Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
