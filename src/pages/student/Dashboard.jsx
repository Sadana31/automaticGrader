import React from "react";
import {
  UploadCloud,
  FileSearch,
  History,
  User,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Student Dashboard
        </h2>
        <p className="text-gray-500 font-medium mt-1">
          Overview of your submissions and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/student/upload")}
          className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#065F46]/30 hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>

          <h3 className="font-bold text-lg text-gray-900">Submit Document</h3>

          <p className="text-xs text-gray-400 mt-1 font-medium">
            Upload your essay or assignment for AI evaluation.
          </p>

          <div className="flex items-center gap-1 text-[#065F46] font-bold text-sm mt-4">
            Upload
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => navigate("/student/evaluations")}
          className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#065F46]/30 hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileSearch className="w-6 h-6" />
          </div>

          <h3 className="font-bold text-lg text-gray-900">Detailed Reviews</h3>

          <p className="text-xs text-gray-400 mt-1 font-medium">
            View AI-generated feedback and scoring insights.
          </p>

          <div className="flex items-center gap-1 text-[#065F46] font-bold text-sm mt-4">
            View
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => navigate("/student/history")}
          className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#065F46]/30 hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <History className="w-6 h-6" />
          </div>

          <h3 className="font-bold text-lg text-gray-900">
            Submission History
          </h3>

          <p className="text-xs text-gray-400 mt-1 font-medium">
            Track all your past submissions and grades.
          </p>

          <div className="flex items-center gap-1 text-[#065F46] font-bold text-sm mt-4">
            Explore
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => navigate("/student/profile")}
          className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#065F46]/30 hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <User className="w-6 h-6" />
          </div>

          <h3 className="font-bold text-lg text-gray-900">Author Profile</h3>

          <p className="text-xs text-gray-400 mt-1 font-medium">
            Manage your personal information and settings.
          </p>

          <div className="flex items-center gap-1 text-[#065F46] font-bold text-sm mt-4">
            Manage
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}
