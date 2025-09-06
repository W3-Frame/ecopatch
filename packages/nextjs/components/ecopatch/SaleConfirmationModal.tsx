"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";

interface SaleConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  project: {
    id: string;
    name: string;
    image: string;
    price?: string;
  };
  isLoading?: boolean;
}

export const SaleConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  project,
  isLoading = false,
}: SaleConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleSellConfirm = async () => {
    try {
      await onConfirm();
      toast.success("Sale completed successfully! 🎉");
      onClose();
    } catch (error) {
      toast.error("Sale failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Sale Confirmation</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <span className="text-gray-500 text-xl">✕</span>
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 mb-3 pb-2 border-b border-gray-100">
          <div className="col-span-2">Item</div>
          <div className="col-span-6">Name</div>
          <div className="col-span-4 text-right">Price</div>
        </div>

        {/* Item Row */}
        <div className="grid grid-cols-12 gap-4 items-center mb-6">
          <div className="col-span-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
              <Image src={project.image} alt={project.name} className="object-cover" fill />
            </div>
          </div>
          <div className="col-span-6">
            <p className="font-semibold text-gray-900">{project.name}</p>
          </div>
          <div className="col-span-4 text-right">
            <p className="font-bold text-gray-900">{project.price || "0.031 ETH"}</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSellConfirm}
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isLoading ? "Processing..." : "Sell Now"}
        </button>
      </div>
    </div>
  );
};
