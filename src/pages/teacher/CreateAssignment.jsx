import React, { useState } from "react";
import { UploadCloud, Target, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CLASSES = ["CSE-A", "CSE-B", "ECE-A"];

export default function CreateAssignment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: CLASSES[0],
    maxScore: 100,
    title: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Assignment Data:", formData);
    navigate("../dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Assignment Creator
        </h2>

        <button
          onClick={() => navigate("../dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#065F46] font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Target Class
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-bold text-[#065F46] outline-none focus:ring-2 focus:ring-[#065F46]"
            >
              {CLASSES.map((cls) => (
                <option key={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Max Score
            </label>
            <input
              type="number"
              name="maxScore"
              value={formData.maxScore}
              onChange={handleChange}
              className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-[#065F46]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Causal-Fuzzy Operators Research"
            className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-[#065F46]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Add specific instructions for students..."
            className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-[#065F46] min-h-[140px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-emerald-700">
              Handouts (Students)
            </label>
            <div className="border-2 border-dashed border-emerald-100 rounded-3xl p-8 text-center bg-emerald-50/20 hover:bg-emerald-50/50 transition-colors cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                Upload Materials
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-purple-700">
              Grading Rubric (AI)
            </label>
            <div className="border-2 border-dashed border-purple-100 rounded-3xl p-8 text-center bg-purple-50/20 hover:bg-purple-50/50 transition-colors cursor-pointer group">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">
                Upload Benchmark
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button
            onClick={() => navigate("../dashboard")}
            className="px-6 py-2.5 rounded-2xl border border-gray-200 font-semibold hover:bg-gray-50 transition-all"
          >
            Discard
          </button>

          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 rounded-2xl bg-[#065F46] text-white font-semibold hover:bg-[#044D39] transition-all shadow-md"
          >
            Deploy Assignment
          </button>
        </div>
      </div>
    </div>
  );
}