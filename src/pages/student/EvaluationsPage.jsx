import React, { useState, useEffect } from "react";
import {
  FileText,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Target,
  MessageSquareWarning,
  CheckCircle,
} from "lucide-react";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import {
  fetchStudentSubmissions,
  fetchEvaluation,
  raiseQuery,
} from "../../services/studentService";

export default function EvaluationsPage() {
  const [issueCount, setIssueCount] = useState(1);

  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvaluations = async () => {
      setLoading(true);

      const submissions = await fetchStudentSubmissions();

      const evaluated = await Promise.all(
        submissions.map(async (sub) => {
          const evalData = await fetchEvaluation(sub.id);

          if (!evalData) return null;

          return {
            id: sub.id,
            title: sub.title,
            type: sub.type,
            date: new Date(
              evalData.createdAt?.seconds * 1000
            ).toLocaleDateString(),
            score: evalData.finalGrade || evalData.score || 0,
            status: "Evaluated",
            metrics: evalData.metrics || {
              research: 0,
              structure: 0,
              grammar: 0,
            },
            feedback: evalData.feedback || {
              strengths: [],
              weaknesses: [],
              improvements: [],
              remarks: "",
            },
            issue: {
              raised: false,
              status: null,
              text: "",
            },
          };
        })
      );

      setEssays(evaluated.filter(Boolean));
      setLoading(false);
    };

    loadEvaluations();
  }, []);

  const [selectedId, setSelectedId] = useState(
    essays.find((e) => e.status === "Evaluated")?.id || null,
  );

  const [issueText, setIssueText] = useState("");

  const essay = essays.find((e) => e.id === selectedId);
  const evaluatedEssays = essays.filter((e) => e.status === "Evaluated");

  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-gray-500">
        Loading evaluations...
      </div>
    );
  }

  if (evaluatedEssays.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Evaluations Yet
        </h2>
        <p className="text-gray-500 font-medium">
          Your submitted documents are currently under review.
        </p>
      </div>
    );
  }

  const updateEssay = (updatedEssay) => {
    setEssays((prev) =>
      prev.map((e) => (e.id === updatedEssay.id ? updatedEssay : e)),
    );
  };

  const handleRaiseIssue = async () => {
    if (!issueText.trim() || issueCount >= 5) return;

    try {
      await raiseQuery(essay.id, issueText);

      setIssueCount((prev) => prev + 1);

      const updatedEssay = {
        ...essay,
        issue: {
          raised: true,
          status: "pending",
          text: issueText,
        },
      };

      updateEssay(updatedEssay);
      setIssueText("");
    } catch (err) {
      alert("Failed to raise query.");
    }
  };

  const handleResolveIssue = () => {
    const updatedEssay = {
      ...essay,
      issue: {
        ...essay.issue,
        status: "closed",
      },
    };

    updateEssay(updatedEssay);
  };

  return (
    <div className="max-w-6xl mx-auto animation-fade-in flex flex-col xl:flex-row gap-8">
      <div className="w-full xl:w-1/3 flex flex-col gap-4 stagger-1">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
          Evaluations
        </h2>

        {evaluatedEssays.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`text-left p-5 rounded-[1.5rem] transition-all duration-300 border ${
              selectedId === item.id
                ? "bg-[#0F4C81] text-white border-[#0F4C81] shadow-lg shadow-blue-900/20 translate-x-2"
                : "bg-white text-gray-700 border-gray-200 hover:border-[#0F4C81]/30 hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide ${
                  selectedId === item.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.type}
              </span>
              <span
                className={`text-sm font-bold ${
                  selectedId === item.id ? "text-blue-200" : "text-gray-400"
                }`}
              >
                {item.date}
              </span>
            </div>

            <h3 className="font-bold text-lg leading-tight mb-3">
              {item.title}
            </h3>

            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-black ${
                  selectedId === item.id ? "text-[#FFBE98]" : "text-[#0F4C81]"
                }`}
              >
                {item.score}
              </span>
              <span
                className={`text-sm font-medium ${
                  selectedId === item.id ? "text-blue-200" : "text-gray-500"
                }`}
              >
                / 100
              </span>
            </div>
          </button>
        ))}
      </div>

      {essay && (
        <div className="w-full xl:w-2/3 space-y-6 stagger-2">
          <div className="bg-white rounded-[2rem] p-8 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0F4F8] opacity-50 rounded-bl-full -z-10"></div>

            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2 pr-20">
              {essay.title}
            </h2>

            <p className="text-gray-500 font-medium mb-8">
              Evaluated on {essay.date}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full border-8 border-[#0F4C81] flex items-center justify-center bg-[#F8FAFC]">
                  <span className="text-4xl font-black text-[#0F4C81]">
                    {essay.score}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Final Score
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    Excellent Work
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <ProgressBar
                  label="Research & Depth"
                  value={essay.metrics.research}
                  colorClass="bg-[#0F4C81]"
                />
                <ProgressBar
                  label="Structure & Flow"
                  value={essay.metrics.structure}
                  colorClass="bg-[#009B77]"
                />
                <ProgressBar
                  label="Clarity & Grammar"
                  value={essay.metrics.grammar}
                  colorClass="bg-[#E65100]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-[#009B77]">
                <ThumbsUp className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-gray-900">
                  Strong Points
                </h3>
              </div>
              <ul className="space-y-3">
                {essay.feedback.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm font-medium text-gray-600"
                  >
                    <span className="text-[#009B77] font-bold">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-red-500">
                <ThumbsDown className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-gray-900">
                  Weak Points
                </h3>
              </div>
              <ul className="space-y-3">
                {essay.feedback.weaknesses.map((w, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm font-medium text-gray-600"
                  >
                    <span className="text-red-500 font-bold">•</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F0F4F8] to-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-[#0F4C81]">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-gray-900">
                  Areas for Improvement
                </h3>
              </div>
              <ul className="space-y-2">
                {essay.feedback.improvements.map((imp, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm font-medium text-gray-700 bg-white p-3 rounded-xl border border-gray-100"
                  >
                    <Target className="w-5 h-5 text-[#FFBE98]" />
                    {imp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
                Teacher's Remark
              </h3>
              <p className="text-gray-800 font-medium italic">
                "{essay.feedback.remarks}"
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm mt-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareWarning className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-extrabold text-gray-900">
                Evaluation Query
              </h3>
              <span className="ml-auto text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl">
                Queries Used: {issueCount} / 5
              </span>
            </div>

            {!essay.issue.raised && (
              <>
                <p className="text-sm font-medium text-gray-500 mb-4">
                  If you feel any part of this evaluation is incorrect or needs
                  clarification, you can raise an issue.
                </p>

                {issueCount < 5 ? (
                  <>
                    <textarea
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="Explain your concern clearly..."
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 mb-4 min-h-[100px]"
                    />
                    <Button onClick={handleRaiseIssue}>Submit Query</Button>
                  </>
                ) : (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                    You have reached the maximum limit of 5 evaluation queries.
                  </div>
                )}
              </>
            )}

            {essay.issue.raised && essay.issue.status === "pending" && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-800 rounded-lg uppercase">
                  Pending Review
                </span>

                <p className="text-sm font-bold text-gray-700 mt-3">
                  Your Query:
                </p>
                <p className="text-sm text-gray-600 italic">
                  "{essay.issue.text}"
                </p>
              </div>
            )}

            {essay.issue.raised && essay.issue.status === "closed" && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <CheckCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-600">
                  This query has been resolved and closed.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
