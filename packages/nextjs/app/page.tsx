"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BeakerIcon, ChartBarIcon, GlobeAltIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        {/* Hero Section */}
        <div className="px-5 max-w-4xl text-center">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2 text-green-700">Welcome to</span>
            <span className="block text-5xl font-bold text-green-800 mb-4">EcoPatch</span>
            <span className="block text-xl text-gray-600 max-w-2xl mx-auto">
              Invest in the land. Grow the future. 🌱
            </span>
          </h1>

          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Regenerative Finance platform that enables ecological restoration in Africa through
            <span className="font-semibold text-green-700"> NFT land patches</span>. Each patch generates{" "}
            <span className="font-semibold text-green-700">carbon credits</span> redistributed to holders while
            supporting local communities.
          </p>

          {connectedAddress && (
            <div className="flex justify-center items-center space-x-2 flex-col mb-8">
              <p className="text-sm font-medium text-gray-600">Connected Wallet:</p>
              <Address address={connectedAddress} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/marketplace"
              className="btn btn-primary btn-lg bg-green-600 hover:bg-green-700 border-green-600"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              Explore Marketplace
            </Link>
            <Link
              href="/dashboard"
              className="btn btn-outline btn-lg border-green-600 text-green-700 hover:bg-green-600"
            >
              <ChartBarIcon className="h-5 w-5" />
              My Dashboard
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grow bg-green-50 w-full mt-16 px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">How EcoPatch Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col bg-white px-8 py-8 text-center items-center rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <GlobeAltIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">Tokenized Zones</h3>
                <p className="text-gray-600">
                  Ecological restoration projects are fractionalized into NFTs representing land patches. Each NFT
                  represents ownership of a specific area.
                </p>
              </div>

              <div className="flex flex-col bg-white px-8 py-8 text-center items-center rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BeakerIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">Carbon Credits</h3>
                <p className="text-gray-600">
                  As the land is restored and trees grow, carbon credits are generated and redistributed proportionally
                  to NFT holders.
                </p>
              </div>

              <div className="flex flex-col bg-white px-8 py-8 text-center items-center rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBagIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">Trade & Earn</h3>
                <p className="text-gray-600">
                  Buy, sell, and trade land patch NFTs on our marketplace while earning passive income from carbon
                  credit distributions.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/marketplace"
                className="btn btn-primary btn-lg bg-green-600 hover:bg-green-700 border-green-600"
              >
                Start Investing in Nature
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
