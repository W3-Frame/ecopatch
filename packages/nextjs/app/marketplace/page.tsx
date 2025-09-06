"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Home;
