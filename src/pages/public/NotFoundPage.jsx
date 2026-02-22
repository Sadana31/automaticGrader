import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        404 — Page Not Found
      </h1>

      <p className="text-gray-500 font-medium mb-8">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="bg-[#0F4C81] text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all"
      >
        Go Back
      </button>
    </div>
  );
}