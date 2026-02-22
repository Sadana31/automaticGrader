import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();

  const [essays] = useState([
    {
      id: 1,
      title: "Impact of IoT on Smart Energy",
      type: "Research Draft",
      date: "Feb 18, 2026",
      status: "Evaluated",
      score: 87,
    },
    {
      id: 2,
      title: "Smart Grid Security Analysis",
      type: "Descriptive Essay",
      date: "Feb 22, 2026",
      status: "Pending",
      score: "--",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Evaluated":
        return (
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#E6F4EA] text-[#009B77]">
            <CheckCircle className="w-3.5 h-3.5" /> Evaluated
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FFF3E0] text-[#E65100]">
            <Clock className="w-3.5 h-3.5" /> Under Review
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto animation-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Submission History
          </h2>
          <p className="text-gray-500 font-medium mt-1">
            Track all your past drafts and final submissions.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-[#E2E8F0]">
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Document Details
                </th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Date
                </th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Status
                </th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Score
                </th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {essays.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F0F4F8] p-3 rounded-2xl text-[#0F4C81] group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>

                      <div>
                        <p className="font-extrabold text-gray-900 text-[15px]">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">
                          {item.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-sm text-gray-600 font-bold">
                    {item.date}
                  </td>

                  <td className="p-5">
                    {getStatusBadge(item.status)}
                  </td>

                  <td className="p-5 font-black text-gray-900 text-lg">
                    {item.score}
                  </td>

                  <td className="p-5">
                    {item.status === "Evaluated" ? (
                      <button
                        onClick={() => navigate("/student/evaluations")}
                        className="flex items-center gap-1 text-[#0F4C81] hover:text-[#082F53] text-sm font-bold hover:underline"
                      >
                        Detailed Review
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm font-bold italic">
                        Awaiting
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}