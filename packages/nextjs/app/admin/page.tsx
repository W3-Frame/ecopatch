"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useEcoPatchCollections, useEcoPatchTransactions } from "~~/hooks/ecopatch";

const AdminDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state for creating new projects
  const [projectForm, setProjectForm] = useState({
    name: "",
    symbol: "",
    location: "",
    area: "",
    co2Impact: "",
    baseURI: "",
    supply: 10,
    description: "",
  });

  const { mockNFTs, totalSupply, isLoading } = useEcoPatchCollections();
  const { createProject, isLoading: transactionLoading } = useEcoPatchTransactions();

  const handleCreateProject = async () => {
    if (!projectForm.name || !projectForm.symbol) return;

    const success = await createProject(
      projectForm.name,
      projectForm.symbol,
      projectForm.baseURI || "https://ipfs.io/ipfs/",
      projectForm.supply,
    );

    if (success) {
      setShowCreateModal(false);
      setProjectForm({
        name: "",
        symbol: "",
        location: "",
        area: "",
        co2Impact: "",
        baseURI: "",
        supply: 10,
        description: "",
      });
    }
  };

  const adminStats = {
    totalProjects: mockNFTs.length,
    totalSupply: totalSupply,
    totalValue: mockNFTs.reduce((sum, nft) => sum + parseFloat(nft.price), 0).toFixed(2),
    activeProjects: mockNFTs.filter(nft => nft.isForSale).length,
  };

  if (!connectedAddress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <CurrencyDollarIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CogIcon className="h-8 w-8 text-primary" />
            <h1 className="text-5xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-base-content/70">
            <span>Administrator:</span>
            <Address address={connectedAddress} />
          </div>
        </div>

        {/* Quick Action */}
        <div className="flex justify-center mb-8">
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary shadow-lg">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Project
          </button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-green-50 rounded-xl p-6">
          <div className="stat-figure text-green-600">
            <GlobeAltIcon className="h-8 w-8" />
          </div>
          <div className="stat-title text-green-700">Total Projects</div>
          <div className="stat-value text-green-800">{adminStats.totalProjects}</div>
          <div className="stat-desc text-green-600">Ecological zones</div>
        </div>

        <div className="stat bg-green-50 rounded-xl p-6">
          <div className="stat-figure text-green-600">
            <ChartBarIcon className="h-8 w-8" />
          </div>
          <div className="stat-title text-green-700">Total NFTs</div>
          <div className="stat-value text-green-800">{adminStats.totalSupply}</div>
          <div className="stat-desc text-green-600">Minted land patches</div>
        </div>

        <div className="stat bg-green-50 rounded-xl p-6">
          <div className="stat-figure text-green-600">
            <CurrencyDollarIcon className="h-8 w-8" />
          </div>
          <div className="stat-title text-green-700">Total Value</div>
          <div className="stat-value text-green-800">{adminStats.totalValue} ETH</div>
          <div className="stat-desc text-green-600">Market capitalization</div>
        </div>

        <div className="stat bg-green-50 rounded-xl p-6">
          <div className="stat-figure text-green-600">
            <UsersIcon className="h-8 w-8" />
          </div>
          <div className="stat-title text-green-700">Active Projects</div>
          <div className="stat-value text-green-800">{adminStats.activeProjects}</div>
          <div className="stat-desc text-green-600">Available for purchase</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-lifted mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`tab tab-lg ${activeTab === "overview" ? "tab-active bg-white border-green-500" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`tab tab-lg ${activeTab === "projects" ? "tab-active bg-white border-green-500" : ""}`}
        >
          Projects ({adminStats.totalProjects})
        </button>
        <button
          onClick={() => setActiveTab("distribution")}
          className={`tab tab-lg ${activeTab === "distribution" ? "tab-active bg-white border-green-500" : ""}`}
        >
          Carbon Distribution
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="loading loading-spinner loading-lg text-green-600"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <PlusIcon className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-green-800">Sahel Restoration Zone A1</p>
                          <p className="text-sm text-green-600">New project created</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <BeakerIcon className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-blue-800">Carbon Credits Distributed</p>
                          <p className="text-sm text-blue-600">125.5 CO₂ credits to 42 holders</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center">
                        <ChartBarIcon className="h-5 w-5 text-purple-600 mr-3" />
                        <div>
                          <p className="font-medium text-purple-800">Monthly Report Generated</p>
                          <p className="text-sm text-purple-600">Impact assessment completed</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Platform Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-800">2,451</p>
                      <p className="text-sm text-green-600">Total CO₂ Credits Generated</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-800">89</p>
                      <p className="text-sm text-green-600">Active NFT Holders</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-800">12.5 ha</p>
                      <p className="text-sm text-green-600">Total Area Under Restoration</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Project Management</h3>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Location</th>
                        <th>Area</th>
                        <th>CO₂ Impact</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockNFTs.map(nft => (
                        <tr key={nft.id}>
                          <td>
                            <div className="font-bold text-green-800">{nft.name}</div>
                            <div className="text-sm text-gray-500">Token #{nft.tokenId}</div>
                          </td>
                          <td>{nft.location}</td>
                          <td>{nft.area}</td>
                          <td>{nft.co2Impact}</td>
                          <td className="font-semibold">{nft.price}</td>
                          <td>
                            <div className={`badge ${nft.isForSale ? "badge-success" : "badge-warning"}`}>
                              {nft.isForSale ? "For Sale" : "Sold"}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-ghost btn-xs">Edit</button>
                              <button className="btn btn-ghost btn-xs">View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Carbon Distribution Tab */}
            {activeTab === "distribution" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-green-800">Carbon Credit Distribution</h3>
                  <button className="btn btn-primary bg-green-600 hover:bg-green-700 border-green-600">
                    <BeakerIcon className="h-5 w-5 mr-2" />
                    Distribute Credits
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Next Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scheduled Date:</span>
                        <span className="font-medium">Dec 1, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Credits:</span>
                        <span className="font-medium">187.5 CO₂</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recipients:</span>
                        <span className="font-medium">42 NFT holders</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Last Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">Nov 1, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credits Distributed:</span>
                        <span className="font-medium">125.5 CO₂</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="badge badge-success">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Distribution History</h4>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Credits Distributed</th>
                          <th>Recipients</th>
                          <th>Total Value (ETH)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Nov 1, 2024</td>
                          <td>125.5 CO₂</td>
                          <td>42</td>
                          <td>0.157 ETH</td>
                          <td>
                            <span className="badge badge-success">Completed</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Oct 1, 2024</td>
                          <td>98.2 CO₂</td>
                          <td>38</td>
                          <td>0.123 ETH</td>
                          <td>
                            <span className="badge badge-success">Completed</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Sep 1, 2024</td>
                          <td>76.8 CO₂</td>
                          <td>35</td>
                          <td>0.096 ETH</td>
                          <td>
                            <span className="badge badge-success">Completed</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-white max-w-2xl">
            <h3 className="font-bold text-lg text-green-800 mb-6">Create New Ecological Project</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Project Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sahel Restoration Zone A1"
                    className="input input-bordered bg-white border-green-300 focus:border-green-500"
                    value={projectForm.name}
                    onChange={e => setProjectForm({ ...projectForm, name: e.target.value })}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Symbol</span>
                  </label>
                  <input
                    type="text"
                    placeholder="SRZA1"
                    className="input input-bordered bg-white border-green-300 focus:border-green-500"
                    value={projectForm.symbol}
                    onChange={e => setProjectForm({ ...projectForm, symbol: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Mali, West Africa"
                    className="input input-bordered bg-white border-green-300 focus:border-green-500"
                    value={projectForm.location}
                    onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Total Area</span>
                  </label>
                  <input
                    type="text"
                    placeholder="5.0 hectares"
                    className="input input-bordered bg-white border-green-300 focus:border-green-500"
                    value={projectForm.area}
                    onChange={e => setProjectForm({ ...projectForm, area: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">CO₂ Impact (annually)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="25.0t CO₂/year"
                    className="input input-bordered bg-white border-green-300 focus:border-green-500"
                    value={projectForm.co2Impact}
                    onChange={e => setProjectForm({ ...projectForm, co2Impact: e.target.value })}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">NFT Supply</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    className="input input-bordered bg-white border-green-300 focus:border-green-500"
                    value={projectForm.supply}
                    onChange={e => setProjectForm({ ...projectForm, supply: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Base URI (optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="https://ipfs.io/ipfs/..."
                  className="input input-bordered bg-white border-green-300 focus:border-green-500"
                  value={projectForm.baseURI}
                  onChange={e => setProjectForm({ ...projectForm, baseURI: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered bg-white border-green-300 focus:border-green-500"
                  rows={3}
                  placeholder="Describe the ecological restoration project..."
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setShowCreateModal(false)} className="btn btn-ghost" disabled={transactionLoading}>
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="btn btn-primary bg-green-600 hover:bg-green-700 border-green-600"
                disabled={!projectForm.name || !projectForm.symbol || transactionLoading}
              >
                {transactionLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
