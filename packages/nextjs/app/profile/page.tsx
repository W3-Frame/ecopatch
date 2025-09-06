"use client";

import { useAccount } from "wagmi";
import { CalendarIcon, GlobeEuropeAfricaIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();

  const profileData = {
    name: "UCHIHA Madara",
    email: "bossmadara@example.com",
    memberSince: "March 2024",
    vcuGenerated: 2450,
    patchesOwned: 5,
    totalInvested: 2.2,
    location: "Tokyo, Japan",
  };

  if (!isConnected) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center min-h-96">
          <UserIcon className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal information and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
                  <p className="text-gray-600">{profileData.email}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Member since: {profileData.memberSince}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={profileData.name}
                    className="input input-bordered w-full"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={profileData.email}
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue={profileData.location}
                      className="input input-bordered w-full pl-10"
                      placeholder="Enter your location"
                    />
                    <MapPinIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    value={address || "Not connected"}
                    className="input input-bordered w-full"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{profileData.vcuGenerated.toLocaleString()}</div>
                <div className="text-sm text-gray-600">VCU Generated</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{profileData.patchesOwned}</div>
                <div className="text-sm text-gray-600">Patches Owned</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{profileData.totalInvested} ETH</div>
                <div className="text-sm text-gray-600">Total Invested</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Environmental Impact</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <GlobeEuropeAfricaIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">2.4 tons CO₂</div>
                  <div className="text-sm text-gray-600">Carbon offset this year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
