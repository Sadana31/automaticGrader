import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

export default function ReviewEssay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const mockSubmissions = {
    1: {
      name: "Anand",
      roll: "21CSE001",
      aiGrade: 85,
      aiFeedback:
        "Strong technical depth. Improve transitions between sections and expand the conclusion with real-world implications.",
      finalGrade: 85,
    },
    2: {
      name: "Riya",
      roll: "21CSE002",
      aiGrade: 78,
      aiFeedback:
        "Good structure overall. Minor grammar errors and formatting inconsistencies detected.",
      finalGrade: 78,
    },
  };

  const submission = mockSubmissions[id];

  const [grade, setGrade] = useState(submission?.finalGrade || 0);

  if (!submission) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 font-bold">Submission not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Review Submission
        </h2>
        <p className="text-gray-500 font-semibold mt-1">
          {submission.name} • {submission.roll}
        </p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div>
          <p className="font-black text-[#065F46] uppercase text-xs tracking-widest mb-2">
            AI Evaluation
          </p>
          <p className="text-gray-700 leading-relaxed">
            {submission.aiFeedback}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">
            AI Suggested Grade
          </p>
          <p className="text-2xl font-black text-[#065F46]">
            {submission.aiGrade}
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="block font-bold text-gray-700 mb-2">
            Adjust Final Grade
          </label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="p-4 rounded-2xl border border-gray-200 bg-gray-50 font-bold text-xl outline-none focus:ring-2 focus:ring-[#065F46]"
          />
        </div>

        <button
          onClick={() => {
            alert("Grade updated!");
            navigate(-1);
          }}
          className="w-full py-4 bg-[#065F46] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#044D39]"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}