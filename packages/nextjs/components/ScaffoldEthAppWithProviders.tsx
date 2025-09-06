"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import AppHeader from "~~/components/AppHeader";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import Sidebar from "~~/components/Sidebar";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();
  const pathname = usePathname();

  // Pages qui utilisent l'ancien layout (avec Header)
  const legacyPages = ["/marketplace", "/", "/debug"];
  const isLegacyPage = legacyPages.some(page => pathname === page || (page === "/" && pathname === "/"));

  if (isLegacyPage) {
    return (
      <>
        <div className={`flex flex-col min-h-screen`}>
          <Header />
          <main className="relative flex flex-col flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </>
    );
  }

  // Nouveau layout avec sidebar pour dashboard, admin, etc.
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          <ProgressBar height="3px" color="#2299dd" />
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
