"use client";

import Image from "next/image";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nft: {
    name: string;
    image: string;
    price: bigint;
    location: string;
    carbonCredits: number;
  };
  isLoading?: boolean;
}

export const PurchaseModal = ({ isOpen, onClose, onConfirm, nft, isLoading = false }: PurchaseModalProps) => {
  const { address } = useAccount();
  const priceInEth = formatEther(nft.price);

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
          disabled={isLoading}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h3 className="font-bold text-2xl text-gray-800 mb-4">Confirm Purchase</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
            <Image
              src={nft.image}
              alt={nft.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-lg text-gray-800">{nft.name}</h4>
              <p className="text-sm text-gray-600">{nft.location}</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Price:</span>
                <span className="font-bold text-xl text-primary">{priceInEth} ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Carbon Credits:</span>
                <span className="font-semibold text-success">{nft.carbonCredits} VCU/year</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Wallet:</strong> {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start gap-3">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                By purchasing this patch, you&apos;ll contribute to environmental restoration and earn carbon credits.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            onClick={onConfirm}
            disabled={isLoading || !address}
          >
            {isLoading ? "Processing..." : `Confirm Purchase (${priceInEth} ETH)`}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose} disabled={isLoading}>
          close
        </button>
      </form>
    </dialog>
  );
};
