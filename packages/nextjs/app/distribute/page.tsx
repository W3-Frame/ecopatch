"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { ArrowPathIcon, ChartBarIcon, GlobeEuropeAfricaIcon, UsersIcon } from "@heroicons/react/24/outline";

const mockProjects = [
  {
    id: "1",
    name: "Amazon Rainforest Restoration",
    holders: 35,
    totalPatches: 100,
    lastDistribution: "2024-02-15",
    totalDistributed: 125000,
  },
  {
    id: "2",
    name: "Mangrove Restoration Program",
    holders: 61,
    totalPatches: 150,
    lastDistribution: "2024-02-20",
    totalDistributed: 89000,
  },
  {
    id: "3",
    name: "Sahel Green Belt Initiative",
    holders: 58,
    totalPatches: 200,
    lastDistribution: "2024-02-10",
    totalDistributed: 112000,
  },
];

export default function DistributePage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [distributionAmount, setDistributionAmount] = useState("");
  const [distributionType, setDistributionType] = useState("carbon");
  const [isLoading, setIsLoading] = useState(false);

  const handleDistribute = async () => {
    if (!selectedProject || !distributionAmount) {
      toast.error("Please select a project and enter an amount");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const project = mockProjects.find(p => p.id === selectedProject);
      const type = distributionType === "carbon" ? "VCU" : "ETH";

      toast.success(`${distributionAmount} ${type} distributed to ${project?.holders} holders! 🎉`);
      setDistributionAmount("");
      setSelectedProject("");
    } catch (error) {
      toast.error("Failed to distribute. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedProjectData = mockProjects.find(p => p.id === selectedProject);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Distribute Profits</h1>
        <p className="text-gray-600">Distribute carbon credits or financial profits to NFT holders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{mockProjects.length}</p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Holders</p>
              <p className="text-2xl font-bold text-gray-900">{mockProjects.reduce((sum, p) => sum + p.holders, 0)}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">VCU Distributed</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProjects.reduce((sum, p) => sum + p.totalDistributed, 0).toLocaleString()}
              </p>
            </div>
            <GlobeEuropeAfricaIcon className="h-8 w-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Distributions</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <ArrowPathIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribution Form */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">New Distribution</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="distributionType"
                      value="carbon"
                      checked={distributionType === "carbon"}
                      onChange={e => setDistributionType(e.target.value)}
                      className="radio radio-primary mr-2"
                    />
                    <span>Carbon Credits (VCU)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="distributionType"
                      value="profit"
                      checked={distributionType === "profit"}
                      onChange={e => setDistributionType(e.target.value)}
                      className="radio radio-primary mr-2"
                    />
                    <span>Financial Profits (ETH)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
                <select
                  className="select select-bordered w-full"
                  value={selectedProject}
                  onChange={e => setSelectedProject(e.target.value)}
                >
                  <option value="">Choose a project...</option>
                  {mockProjects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.holders} holders)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount per NFT ({distributionType === "carbon" ? "VCU" : "ETH"})
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder={distributionType === "carbon" ? "100" : "0.01"}
                  value={distributionAmount}
                  onChange={e => setDistributionAmount(e.target.value)}
                  step={distributionType === "carbon" ? "1" : "0.001"}
                />
                <p className="text-xs text-gray-500 mt-1">Each NFT holder will receive this amount</p>
              </div>

              {selectedProjectData && distributionAmount && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Distribution Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Project:</span>
                      <span>{selectedProjectData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recipients:</span>
                      <span>{selectedProjectData.holders} NFT holders</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Distribution:</span>
                      <span>
                        {(parseFloat(distributionAmount) * selectedProjectData.holders).toLocaleString()}{" "}
                        {distributionType === "carbon" ? "VCU" : "ETH"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                onClick={handleDistribute}
                disabled={isLoading || !selectedProject || !distributionAmount}
              >
                {isLoading ? "Processing..." : "Distribute Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Projects Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Project Overview</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockProjects.map(project => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <span className="text-sm text-gray-500">
                      {project.holders}/{project.totalPatches} holders
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Last Distribution:</span>
                      <div>{project.lastDistribution}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Distributed:</span>
                      <div>{project.totalDistributed.toLocaleString()} VCU</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(project.holders / project.totalPatches) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
