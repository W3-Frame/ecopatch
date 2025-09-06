"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import {
  BellIcon,
  BugAntIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  adminOnly?: boolean;
};

const ADMIN_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export const MenuLinks = () => {
  const { address } = useAccount();
  const isAdmin = address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

  const links: HeaderMenuLink[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Marketplace",
      href: "/marketplace",
      icon: <ShoppingBagIcon className="h-4 w-4" />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <ChartBarIcon className="h-4 w-4" />,
    },
    ...(isAdmin
      ? [
          {
            label: "Admin",
            href: "/admin",
            icon: <Cog6ToothIcon className="h-4 w-4" />,
            adminOnly: true,
          },
        ]
      : []),
    {
      label: "Debug Contracts",
      href: "/debug",
      icon: <BugAntIcon className="h-4 w-4" />,
    },
  ];

  return links;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: <ShoppingBagIcon className="h-4 w-4" />,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <ChartBarIcon className="h-4 w-4" />,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: <Cog6ToothIcon className="h-4 w-4" />,
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header with search bar and modern design
 */
export const Header = () => {
  const { targetNetwork } = useTargetNetwork();
  const { address } = useAccount();
  const isLocalNetwork = targetNetwork.id === hardhat.id;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 z-20 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 relative">
              <Image src="/Logo_2.png" alt="EcoPatch Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">ECOPATCH</span>
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-lg mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, patches"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-gray-50 hover:bg-white transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Right Side - Balance + Notifications + Profile */}
          <div className="flex items-center gap-4">
            {/* Balance Display */}
            {address && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
                <span className="text-sm font-medium text-emerald-800">4.2 ETH</span>
              </div>
            )}

            {/* Notifications */}
            {address && (
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Connect Button / Profile */}
            <RainbowKitCustomConnectButton />

            {isLocalNetwork && <FaucetButton />}
          </div>
        </div>
      </div>
    </div>
  );
};
