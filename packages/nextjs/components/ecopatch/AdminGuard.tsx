"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";

interface AdminGuardProps {
  children: React.ReactNode;
  adminAddress?: string;
}

const DEFAULT_ADMIN = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Default Hardhat account #0

export const AdminGuard = ({ children, adminAddress = DEFAULT_ADMIN }: AdminGuardProps) => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      if (address.toLowerCase() !== adminAddress.toLowerCase()) {
        toast.error("Access denied: Admin only area");
        router.push("/marketplace");
      }
    }
  }, [address, isConnected, adminAddress, router]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-2xl font-bold text-gray-800">Admin Access Required</h2>
            <p className="text-gray-600 my-4">Please connect your admin wallet to continue</p>
            <div className="divider"></div>
            <p className="text-xs text-gray-500">
              Admin wallet: {adminAddress.slice(0, 6)}...{adminAddress.slice(-4)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (address?.toLowerCase() !== adminAddress.toLowerCase()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-2xl font-bold text-error">Access Denied</h2>
            <p className="text-gray-600 my-4">This area is restricted to administrators only</p>
            <button className="btn btn-primary" onClick={() => router.push("/marketplace")}>
              Go to Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
