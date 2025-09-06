"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  ArrowPathIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon as LeafIcon } from "@heroicons/react/24/outline";
import { ProjectCreationModal } from "~~/components/ecopatch/ProjectCreationModal";
import { useUserRole } from "~~/hooks/useUserRole";

// Mock data for existing projects
const mockProjects = [
  {
    id: "1",
    name: "Amazon Rainforest Restoration",
    location: "Congo Basin",
    totalPatches: 100,
    sold: 35,
    pricePerPatch: "0.085",
    carbonCreditsDistributed: 12500,
    isActive: true,
  },
  {
    id: "2",
    name: "Mangrove Restoration Program",
    location: "Indonesia",
    totalPatches: 150,
    sold: 61,
    pricePerPatch: "0.065",
    carbonCreditsDistributed: 8900,
    isActive: true,
  },
  {
    id: "3",
    name: "Sahel Green Belt Initiative",
    location: "West Africa",
    totalPatches: 200,
    sold: 58,
    pricePerPatch: "0.075",
    carbonCreditsDistributed: 7500,
    isActive: true,
  },
];

const mockStats = {
  totalProjects: 8,
  activeProjects: 6,
  totalRevenue: "24.5",
  totalUsers: 1247,
  carbonCreditsIssued: 145000,
  averagePrice: "0.073",
};

export default function AdminPage() {
  const { isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState(isAdmin ? "overview" : "create");
  const [isCreating, setIsCreating] = useState(false);
  const [distributionAmount, setDistributionAmount] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleDistributeCredits = async () => {
    if (!selectedProject || !distributionAmount) {
      toast.error("Please select a project and enter an amount");
      return;
    }

    try {
      // TODO: Implement actual smart contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction

      toast.success(`${distributionAmount} carbon credits distributed! 🌿`);
      setDistributionAmount("");
      setSelectedProject("");
    } catch (error) {
      toast.error("Failed to distribute credits");
      console.error(error);
    }
  };

  const handleProjectCreation = async (projectData: any) => {
    setIsCreating(true);
    try {
      // TODO: Implement actual smart contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("New project data:", projectData);
      toast.success("Project created successfully! 🎉");
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
      throw error; // Re-throw to let modal handle the error
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-secondary-focus text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                {isAdmin ? <Cog6ToothIcon className="h-8 w-8" /> : <PlusIcon className="h-8 w-8" />}
                {isAdmin ? "Admin Dashboard" : "Project Creation"}
              </h1>
              <p className="text-white/80 mt-2">
                {isAdmin
                  ? "Manage projects, users, and carbon credits"
                  : "Create and manage your environmental projects"}
              </p>
            </div>
            {isAdmin && (
              <div className="badge badge-warning gap-2 p-4">
                <div className="w-2 h-2 bg-warning-content rounded-full animate-pulse"></div>
                Admin Mode Active
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Overview - Admin Only */}
      {isAdmin && (
        <div className="container mx-auto px-4 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold">{mockStats.totalProjects}</p>
                    <p className="text-xs text-success">+2 this month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <CurrencyDollarIcon className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">{mockStats.totalRevenue} ETH</p>
                    <p className="text-xs text-success">+15% from last month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-8 w-8 text-info" />
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-success">+89 this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="tabs tabs-boxed mb-8">
          {isAdmin && (
            <a
              className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </a>
          )}
          <a className={`tab ${activeTab === "create" ? "tab-active" : ""}`} onClick={() => setActiveTab("create")}>
            Create Project
          </a>
          {isAdmin && (
            <>
              <a
                className={`tab ${activeTab === "distribute" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("distribute")}
              >
                Distribute Credits
              </a>
              <a
                className={`tab ${activeTab === "settings" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </a>
            </>
          )}
        </div>

        {/* Overview Tab - Admin Only */}
        {activeTab === "overview" && isAdmin && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Projects</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Total Patches</th>
                    <th>Sold</th>
                    <th>Price (ETH)</th>
                    <th>Credits Distributed</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProjects.map(project => (
                    <tr key={project.id}>
                      <td className="font-semibold">{project.name}</td>
                      <td>{project.location}</td>
                      <td>{project.totalPatches}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <progress
                            className="progress progress-success w-20"
                            value={project.sold}
                            max={project.totalPatches}
                          ></progress>
                          <span className="text-sm">{project.sold}</span>
                        </div>
                      </td>
                      <td>{project.pricePerPatch}</td>
                      <td>{project.carbonCreditsDistributed.toLocaleString()} VCU</td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-ghost">
                          <Cog6ToothIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Project Tab */}
        {activeTab === "create" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Project</h2>
              <p className="text-gray-600 mb-8">Create a new environmental restoration project for the marketplace.</p>
              <button onClick={() => setIsProjectModalOpen(true)} className="btn btn-primary btn-lg gap-2">
                <PlusIcon className="h-5 w-5" />
                Create New Project
              </button>
            </div>
          </div>
        )}

        {/* Distribute Credits Tab - Admin Only */}
        {activeTab === "distribute" && isAdmin && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Distribute Carbon Credits</h2>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start gap-3 mb-6">
                  <LeafIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-800">Carbon Credit Distribution</p>
                    <p className="text-sm text-blue-700">
                      Distribute carbon credits to all NFT holders of a project proportionally.
                    </p>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Select Project</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedProject}
                    onChange={e => setSelectedProject(e.target.value)}
                  >
                    <option value="">Choose a project...</option>
                    {mockProjects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name} ({project.sold} holders)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Amount per NFT (VCU)</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="100"
                    value={distributionAmount}
                    onChange={e => setDistributionAmount(e.target.value)}
                  />
                  <label className="label">
                    <span className="label-text-alt">Each NFT holder will receive this amount</span>
                  </label>
                </div>

                {selectedProject && distributionAmount && (
                  <div className="bg-base-200 p-4 rounded-lg mt-4">
                    <p className="text-sm">
                      <strong>Total Distribution:</strong>{" "}
                      {(
                        parseInt(distributionAmount) * mockProjects.find(p => p.id === selectedProject)!.sold
                      ).toLocaleString()}{" "}
                      VCU
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Recipients:</strong> {mockProjects.find(p => p.id === selectedProject)!.sold} NFT holders
                    </p>
                  </div>
                )}

                <button
                  className="btn btn-success w-full mt-6"
                  onClick={handleDistributeCredits}
                  disabled={!selectedProject || !distributionAmount}
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Distribute Credits
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab - Admin Only */}
        {activeTab === "settings" && isAdmin && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Platform Settings</h2>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Fee Configuration</h3>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Platform Fee (%)</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="2.5"
                    defaultValue="2.5"
                    step="0.1"
                    min="0"
                    max="10"
                  />
                  <label className="label">
                    <span className="label-text-alt">Current: 2.5% on all transactions</span>
                  </label>
                </div>

                <div className="divider"></div>

                <h3 className="card-title mb-4">Contract Management</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Pause All Trading</p>
                      <p className="text-sm text-gray-600">Emergency stop for all marketplace activities</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-error" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Maintenance Mode</p>
                      <p className="text-sm text-gray-600">Show maintenance message to users</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-warning" />
                  </div>
                </div>

                <button className="btn btn-primary w-full mt-6">Save Settings</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Creation Modal */}
      <ProjectCreationModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onConfirm={handleProjectCreation}
        isLoading={isCreating}
      />
    </div>
  );
}
