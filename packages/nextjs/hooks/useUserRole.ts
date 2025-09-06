import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export type UserRole = "admin" | "user";

// Mock admin addresses - in a real app, this would come from a smart contract or backend
const ADMIN_ADDRESSES = [
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Hardhat account #1
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Hardhat account #0 (deployer)
  // Ajoutez votre adresse ici si nécessaire
];

export const useUserRole = (): { role: UserRole; isAdmin: boolean; isUser: boolean } => {
  const { address } = useAccount();
  const [role, setRole] = useState<UserRole>("user");

  useEffect(() => {
    if (address && ADMIN_ADDRESSES.includes(address)) {
      setRole("admin");
    } else {
      setRole("user");
    }
  }, [address]);

  return {
    role,
    isAdmin: role === "admin",
    isUser: role === "user",
  };
};
