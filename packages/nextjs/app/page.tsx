"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  ArrowRightIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon as LeafIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  const stats = [
    { label: "Total Projects", value: "4,269", change: "+470 projects added last month" },
    { label: "VCU Generated", value: "271,700", change: "+59% Up from last month" },
    { label: "Total Users", value: "18,492", change: "+23% Up from last month" },
    { label: "Volume (24h)", value: "1.247 ETH", change: "+19% Up from last day" },
  ];

  const features = [
    {
      icon: <LeafIcon className="h-8 w-8" />,
      title: "Carbon Credits",
      description: "Earn verified carbon credits (VCU) from your environmental investments",
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: "Global Impact",
      description: "Support restoration projects across rainforests, mangroves, and coral reefs",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Blockchain Secured",
      description: "All transactions and ownership verified on the blockchain",
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: "Revenue Generation",
      description: "Generate passive income from carbon credit sales",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-200/50 to-base-200"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="badge badge-primary badge-lg p-4 gap-2">
              <SparklesIcon className="h-4 w-4" />
              <span className="font-semibold">ECOPATCH is built on Base</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            <span className="text-primary">EcoPatch</span> Marketplace
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Invest in environmental restoration projects. Own NFT patches of protected land. Earn carbon credits while
            making a real impact on our planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={() => router.push("/marketplace")} className="btn btn-primary btn-lg gap-2">
              Explore Marketplace
              <ArrowRightIcon className="h-5 w-5" />
            </button>
            <button onClick={() => router.push("/dashboard")} className="btn btn-outline btn-lg">
              View Dashboard
            </button>
          </div>

          {connectedAddress && (
            <div className="text-sm text-gray-600">
              Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-base-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600 font-semibold mt-1">{stat.label}</p>
                <p className="text-sm text-success mt-2">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-200 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose EcoPatch?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of investors making a difference through blockchain-powered environmental conservation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <div className="card-body items-center text-center">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="card-title text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary-focus text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your journey towards sustainable investing. Browse our curated selection of environmental restoration
            projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="btn btn-white btn-lg">
              Browse Projects
            </Link>
            <Link href="/admin" className="btn btn-outline btn-white btn-lg">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Create Project (Admin)
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Projects Preview */}
      <div className="bg-base-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">Discover our latest environmental restoration initiatives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="card bg-base-200 shadow-xl">
              <figure className="h-48 bg-gradient-to-br from-green-400 to-green-600"></figure>
              <div className="card-body">
                <h3 className="card-title">Amazon Rainforest</h3>
                <p className="text-gray-600">85,000 VCU total • 5,700 VCU this year</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">0.085 ETH</span>
                  <Link href="/marketplace" className="btn btn-sm btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <figure className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></figure>
              <div className="card-body">
                <h3 className="card-title">Coral Reef Conservation</h3>
                <p className="text-gray-600">95,000 VCU total • 6,200 VCU this year</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">0.095 ETH</span>
                  <Link href="/marketplace" className="btn btn-sm btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <figure className="h-48 bg-gradient-to-br from-amber-400 to-amber-600"></figure>
              <div className="card-body">
                <h3 className="card-title">Sahel Green Belt</h3>
                <p className="text-gray-600">75,000 VCU total • 5,100 VCU this year</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">0.075 ETH</span>
                  <Link href="/marketplace" className="btn btn-sm btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/marketplace" className="btn btn-primary btn-lg gap-2">
              View All Projects
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
