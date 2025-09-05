"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, CogIcon, HomeIcon, ShoppingBagIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
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
    icon: <CogIcon className="h-4 w-4" />,
  },
  {
    label: "Debug",
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
              className={`${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                  : "text-base-content/70 hover:text-primary hover:bg-primary/5"
              } flex items-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-sm`}
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
 * Modern EcoPatch Header with refined branding
 */
export const Header = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  return (
    <header className="sticky lg:static top-0 navbar bg-base-100/95 backdrop-blur-md min-h-0 shrink-0 justify-between z-20 shadow-sm border-b border-primary/10 px-4 lg:px-8">
      <div className="navbar-start w-auto lg:w-1/2">
        {/* Mobile Menu */}
        <details className="dropdown" ref={burgerMenuRef}>
          <summary className="btn btn-ghost lg:hidden p-2 hover:bg-primary/5">
            <Bars3Icon className="h-5 w-5" />
          </summary>
          <ul
            className="menu dropdown-content mt-3 p-3 shadow-xl bg-base-100 rounded-2xl border border-primary/10 w-64"
            onClick={() => {
              burgerMenuRef?.current?.removeAttribute("open");
            }}
          >
            <HeaderMenuLinks />
          </ul>
        </details>

        {/* Logo */}
        <Link href="/" className="hidden lg:flex items-center gap-3 mr-8 group">
          <div className="relative">
            <div className="flex w-12 h-12 bg-gradient-to-br from-primary to-primary-focus rounded-2xl items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-xs">🌱</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-primary tracking-tight">EcoPatch</span>
            <span className="text-xs text-base-content/60 font-medium">Regenerative Finance Platform</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <HeaderMenuLinks />
          </ul>
        </nav>
      </div>

      {/* Actions */}
      <div className="navbar-end flex items-center gap-3">
        <RainbowKitCustomConnectButton />
        {isLocalNetwork && <FaucetButton />}
      </div>
    </header>
  );
};
