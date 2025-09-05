"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { NextPage } from "next";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { NFTDetail } from "~~/components/ecopatch";
import { useEcoPatchTransactions, useNFTById } from "~~/hooks/ecopatch";

const NFTDetailPage: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const [sellPrice, setSellPrice] = useState("");
  const [showSellModal, setShowSellModal] = useState(false);

  const tokenId = params.tokenId ? parseInt(params.tokenId as string) : 0;

  const { nft, isLoading, error } = useNFTById(tokenId);
  const { buyNFT, sellNFT, isLoading: transactionLoading } = useEcoPatchTransactions();

  const handleBuy = async () => {
    if (!nft) return;

    const success = await buyNFT(nft);
    if (success) {
      // In a real app, you'd refresh the data or update the state
      router.push("/dashboard");
    }
  };

  const handleSell = async () => {
    if (!nft || !sellPrice) return;

    const success = await sellNFT(nft, sellPrice);
    if (success) {
      setShowSellModal(false);
      setSellPrice("");
      // In a real app, you'd refresh the data or update the state
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="loading loading-spinner loading-lg text-green-600"></div>
        </div>
      </div>
    );
  }

  if (error || !nft) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ExclamationTriangleIcon className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">NFT Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The requested NFT could not be found."}</p>
          <Link href="/marketplace" className="btn btn-primary bg-green-600 hover:bg-green-700 border-green-600">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/marketplace" className="btn btn-ghost text-green-700 hover:bg-green-50">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Marketplace
        </Link>
      </div>

      {/* NFT Detail Component */}
      <NFTDetail nft={nft} onBuy={handleBuy} onSell={() => setShowSellModal(true)} />

      {/* Sell Modal */}
      {showSellModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg text-green-800 mb-4">List NFT for Sale</h3>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Selling Price (ETH)</span>
              </label>
              <input
                type="number"
                step="0.001"
                placeholder="0.05"
                className="input input-bordered w-full bg-white border-green-300 focus:border-green-500"
                value={sellPrice}
                onChange={e => setSellPrice(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">Current market price: {nft.price}</span>
              </label>
            </div>

            <div className="alert alert-info mb-4">
              <div className="text-sm">
                <p className="font-semibold mb-1">Listing Fee: 2.5%</p>
                <p>
                  You&apos;ll receive {sellPrice ? (parseFloat(sellPrice) * 0.975).toFixed(3) : "0.000"} ETH after fees
                </p>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setShowSellModal(false)} className="btn btn-ghost" disabled={transactionLoading}>
                Cancel
              </button>
              <button
                onClick={handleSell}
                className="btn btn-primary bg-green-600 hover:bg-green-700 border-green-600"
                disabled={!sellPrice || parseFloat(sellPrice) <= 0 || transactionLoading}
              >
                {transactionLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Listing...
                  </>
                ) : (
                  "List for Sale"
                )}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowSellModal(false)}></div>
        </div>
      )}

      {/* Transaction Loading Overlay */}
      {transactionLoading && !showSellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="loading loading-spinner loading-lg text-green-600 mb-4"></div>
            <p className="text-green-800">Processing transaction...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTDetailPage;
