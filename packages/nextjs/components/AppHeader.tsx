"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { MagnifyingGlassIcon, WalletIcon } from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";

export default function AppHeader() {
  const { address, isConnected } = useAccount();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock balance - would come from wagmi hook in real app
  const balance = "4.2";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-emerald-800 rounded-lg flex items-center justify-center">
            <GlobeEuropeAfricaIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ECOPATCH</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, patches"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Right Side - Balance & Profile */}
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              {/* Balance */}
              <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg border border-emerald-200">
                <WalletIcon className="h-4 w-4" />
                <span className="font-semibold">{balance} ETH</span>
              </div>

              {/* Profile Avatar */}
              <div className="relative">
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors">
                  <span className="text-gray-600 font-semibold text-sm">
                    {address ? address.slice(2, 4).toUpperCase() : "U"}
                  </span>
                </div>
                {/* Notification dot - would be dynamic */}
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-white"></div>
              </div>
            </>
          ) : (
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
