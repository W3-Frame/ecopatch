"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (projectData: any) => void;
  isLoading?: boolean;
}

interface ProjectFormData {
  name: string;
  description: string;
  location: string;
  area: string;
  patches: string;
  thumbnail?: File;
}

export const ProjectCreationModal = ({ isOpen, onClose, onConfirm, isLoading = false }: ProjectCreationModalProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    location: "",
    area: "",
    patches: "",
    thumbnail: undefined,
  });

  const [selectedFile, setSelectedFile] = useState<string>("No file chosen");

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file,
      }));
      setSelectedFile(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.location || !formData.area || !formData.patches) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await onConfirm(formData);
      toast.success("Project created successfully! 🎉");

      // Reset form
      setFormData({
        name: "",
        description: "",
        location: "",
        area: "",
        patches: "",
        thumbnail: undefined,
      });
      setSelectedFile("No file chosen");
      onClose();
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-red-500 hover:text-red-600"
            disabled={isLoading}
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Projects name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your projects name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              required
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe project"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
              required
            />
            <div className="text-right text-xs text-gray-400 mt-1">{formData.description.length}/500</div>
          </div>

          {/* Location (Town) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localisation (Town )</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Project town"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              required
            />
          </div>

          {/* Project Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="Project area"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              required
            />
          </div>

          {/* Number of Patches */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Patches</label>
            <input
              type="number"
              name="patches"
              value={formData.patches}
              onChange={handleInputChange}
              placeholder="Total of patches"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              required
            />
          </div>

          {/* Project Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project thumbnail</label>
            <div className="flex items-center gap-4">
              <label className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                <span className="text-sm font-medium text-gray-700">CHOOSE A FILE</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              <span className="text-sm text-gray-600">{selectedFile}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6"
          >
            {isLoading ? "Creating..." : "Save Project"}
          </button>
        </form>
      </div>
    </div>
  );
};
