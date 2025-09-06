"use client";

import { useState } from "react";
import Image from "next/image";
import { parseEther } from "viem";
import { CurrencyDollarIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (price: bigint) => void;
  nft: {
    name: string;
    image: string;
    originalPrice: bigint;
    location: string;
    carbonCredits: number;
  };
  isLoading?: boolean;
}

export const SellModal = ({ isOpen, onClose, onConfirm, nft, isLoading = false }: SellModalProps) => {
  const [sellPrice, setSellPrice] = useState("");
  const [error, setError] = useState("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSellPrice(value);

    if (value && isNaN(parseFloat(value))) {
      setError("Please enter a valid number");
    } else if (parseFloat(value) <= 0) {
      setError("Price must be greater than 0");
    } else {
      setError("");
    }
  };

  const handleConfirm = () => {
    if (!sellPrice || parseFloat(sellPrice) <= 0) {
      setError("Please enter a valid price");
      return;
    }

    try {
      const priceInWei = parseEther(sellPrice);
      onConfirm(priceInWei);
    } catch {
      setError("Invalid price format");
    }
  };

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

        <h3 className="font-bold text-2xl text-gray-800 mb-4">List Patch for Sale</h3>

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
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Carbon Credits:</span>
                <span className="font-semibold text-success">{nft.carbonCredits} VCU/year</span>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Set Your Selling Price (ETH)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="0.00"
                  className={`input input-bordered w-full pr-12 ${error ? "input-error" : ""}`}
                  value={sellPrice}
                  onChange={handlePriceChange}
                  disabled={isLoading}
                />
                <span className="absolute right-3 top-3.5 text-gray-500">ETH</span>
              </div>
              {error && (
                <label className="label">
                  <span className="label-text-alt text-error">{error}</span>
                </label>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
              <CurrencyDollarIcon className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">A 2.5% platform fee will be deducted from the sale price.</p>
            </div>

            {sellPrice && !error && (
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>You will receive:</strong> {(parseFloat(sellPrice) * 0.975).toFixed(4)} ETH
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Platform fee: {(parseFloat(sellPrice) * 0.025).toFixed(4)} ETH
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            className={`btn btn-error ${isLoading ? "loading" : ""}`}
            onClick={handleConfirm}
            disabled={isLoading || !sellPrice || !!error}
          >
            {isLoading ? "Processing..." : "List for Sale"}
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
