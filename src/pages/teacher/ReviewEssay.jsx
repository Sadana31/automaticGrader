import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import {
  fetchSubmissionById,
  fetchEvaluationBySubmission,
  updateFinalGrade,
} from "../../services/teacherService";
import { supabase } from "../../services/supabase";

export default function ReviewEssay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [grade, setGrade] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sub = await fetchSubmissionById(id);
        if (!sub) {
          setLoading(false);
          return;
        }

        const evalData = await fetchEvaluationBySubmission(id);

        setSubmission(sub);
        setEvaluation(evalData);
        setGrade(evalData?.finalGrade || evalData?.score || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 font-bold">Loading submission...</p>
      </div>
    );
  }

  if (!submission || !evaluation) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 font-bold">Submission not found.</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateFinalGrade(evaluation.id, grade);
      alert("Grade updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Error updating grade.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Review Submission
        </h2>
        <p className="text-gray-500 font-semibold mt-1">
          Student ID: {submission.studentId}
        </p>
      </div>

<div className="mt-4">
  <button
    onClick={async () => {
      const { data, error } = await supabase.storage
        .from("submissions")
        .createSignedUrl(submission.filePath, 300); 

      if (error) {
        console.error(error);
        alert("Failed to generate download link.");
        return;
      }

      window.open(data.signedUrl, "_blank");
    }}
    className="px-5 py-2 bg-[#0F4C81] text-white rounded-xl font-semibold hover:opacity-90 transition"
  >
    Download Submitted File
  </button>
</div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div>
          <p className="font-black text-[#065F46] uppercase text-xs tracking-widest mb-4">
            AI Evaluation
          </p>
          <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Summary</h4>
                <p className="text-gray-700 leading-relaxed">
                  {evaluation.evaluation_summary}
                </p>
              </div>

              {evaluation.strengths?.length > 0 && (
                <div>
                  <h4 className="font-bold text-green-600 mb-2">Strengths</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {evaluation.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.areas_for_improvement?.length > 0 && (
                <div>
                  <h4 className="font-bold text-red-500 mb-2">
                    Areas for Improvement
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {evaluation.areas_for_improvement.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.specific_revision_suggestions?.length > 0 && (
                <div>
                  <h4 className="font-bold text-blue-600 mb-2">
                    Revision Suggestions
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {evaluation.specific_revision_suggestions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
        </div>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">
            AI Suggested Grade
          </p>
          <p className="text-2xl font-black text-[#065F46]">
            {evaluation.score}
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
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 bg-[#065F46] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#044D39] disabled:opacity-60"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}