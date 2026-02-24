import React from "react";
import {
  PlusCircle,
  FileText,
  BarChart3,
  Settings2,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CLASSES = ["CSE-A", "CSE-B", "ECE-A"];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Faculty Dashboard
          </h2>
          <p className="text-gray-500 font-medium">
            Manage your classes and evaluation metrics.
          </p>
        </div>

        <button
          onClick={() => navigate("../create")}
          className="bg-[#065F46] text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-semibold hover:bg-[#044D39] transition-all shadow-md"
        >
          <PlusCircle className="w-5 h-5" />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("../submissions")}
            className="group p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all text-left shadow-sm"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">
              View Submissions
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              Review student drafts and papers.
            </p>
          </button>

          <button
            onClick={() => navigate("../submissions")}
            className="group p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all text-left shadow-sm"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">
              Performance Reports
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              Analyze class-wide scoring metrics.
            </p>
          </button>

          <button
            onClick={() => navigate("../submissions")}
            className="group p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all text-left shadow-sm"
          >
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Settings2 />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">
              Manual Overwrite
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              Adjust AI-generated scores manually.
            </p>
          </button>

          <button
            onClick={() => navigate("../create")}
            className="group p-6 bg-[#065F46] rounded-3xl text-white transition-all text-left shadow-lg shadow-green-100"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PlusCircle />
            </div>
            <h3 className="font-bold text-lg">
              New Assignment
            </h3>
            <p className="text-xs text-green-100 mt-1 font-medium">
              Deploy new rubrics and handouts.
            </p>
          </button>
        </div>

        {/* <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-600" />
            Quick Access
          </h3>

          <div className="space-y-3">
            {CLASSES.map((cls) => (
              <button
                key={cls}
                onClick={() =>
                  navigate(`../submissions?class=${cls}`)
                }
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-green-50 text-[#065F46] font-bold hover:bg-green-100 transition-all border border-green-200/50 group"
              >
                {cls}
                <ChevronRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}