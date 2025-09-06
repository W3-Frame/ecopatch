"use client";

import { useState } from "react";
import { ArrowDownTrayIcon, CalendarIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";

const mockReports = [
  {
    id: "1",
    title: "Monthly Environmental Impact Report",
    description: "Detailed analysis of carbon credits generated and environmental benefits",
    date: "March 2024",
    type: "Environmental Impact",
    status: "Published",
    downloads: 1250,
  },
  {
    id: "2",
    title: "Q1 2024 Portfolio Performance",
    description: "Financial performance and ROI analysis of your investments",
    date: "March 2024",
    type: "Financial",
    status: "Draft",
    downloads: 0,
  },
  {
    id: "3",
    title: "Carbon Credit Verification Report",
    description: "Third-party verification of carbon credits earned from projects",
    date: "February 2024",
    type: "Verification",
    status: "Published",
    downloads: 890,
  },
  {
    id: "4",
    title: "Project Impact Analysis",
    description: "Comprehensive analysis of restoration project outcomes",
    date: "February 2024",
    type: "Project Analysis",
    status: "Published",
    downloads: 650,
  },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("all");

  const filteredReports =
    selectedType === "all"
      ? mockReports
      : mockReports.filter(report => report.type.toLowerCase().includes(selectedType.toLowerCase()));

  const getStatusBadge = (status: string) => {
    if (status === "Published") {
      return <span className="badge badge-success badge-sm">Published</span>;
    }
    return <span className="badge badge-warning badge-sm">Draft</span>;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "Environmental Impact": "bg-green-100 text-green-800",
      Financial: "bg-blue-100 text-blue-800",
      Verification: "bg-purple-100 text-purple-800",
      "Project Analysis": "bg-orange-100 text-orange-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and download detailed reports about your environmental investments</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="btn btn-primary gap-2">
          <DocumentChartBarIcon className="h-5 w-5" />
          Generate New Report
        </button>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-outline gap-2">
            <span>Filter by Type</span>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a onClick={() => setSelectedType("all")}>All Reports</a>
            </li>
            <li>
              <a onClick={() => setSelectedType("environmental")}>Environmental Impact</a>
            </li>
            <li>
              <a onClick={() => setSelectedType("financial")}>Financial</a>
            </li>
            <li>
              <a onClick={() => setSelectedType("verification")}>Verification</a>
            </li>
            <li>
              <a onClick={() => setSelectedType("project")}>Project Analysis</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">{mockReports.length}</div>
          <div className="text-sm text-gray-600">Total Reports</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {mockReports.filter(r => r.status === "Published").length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {mockReports.reduce((sum, report) => sum + report.downloads, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Downloads</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">2.4 tons</div>
          <div className="text-sm text-gray-600">CO₂ Offset Verified</div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
        </div>
        <div className="p-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <DocumentChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600">Try adjusting your filters or generate a new report</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReports.map(report => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                    </div>
                    <DocumentChartBarIcon className="h-8 w-8 text-gray-400 ml-4 flex-shrink-0" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                    {getStatusBadge(report.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {report.date}
                      {report.downloads > 0 && <span className="ml-4">{report.downloads} downloads</span>}
                    </div>

                    {report.status === "Published" && (
                      <button className="btn btn-sm btn-outline gap-2">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
