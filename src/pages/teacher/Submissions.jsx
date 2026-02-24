import React, { useEffect, useState } from "react";
import { Search, ArrowUpRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  fetchTeacherAssignments,
  fetchSubmissionsByAssignment,
  fetchEvaluationBySubmission,
} from "../../services/teacherService";

export default function Submissions() {
  const navigate = useNavigate();

  const classes = ["CSE-A", "CSE-B", "ECE-A"];

  const [selectedClass, setSelectedClass] = useState("CSE-A");
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAssignments = async () => {
      if (!selectedClass) return;

      setLoading(true);
      const data = await fetchTeacherAssignments(selectedClass);
      setAssignments(data);
      setLoading(false);
    };

    loadAssignments();
  }, [selectedClass]);

  useEffect(() => {
    const loadSubmissions = async () => {
      if (!selectedAssignment) return;

      setLoading(true);
      const subs = await fetchSubmissionsByAssignment(
        selectedAssignment.id
      );

      const enriched = await Promise.all(
        subs.map(async (s) => {
          const evalData = await fetchEvaluationBySubmission(s.id);
          return {
            ...s,
            finalGrade: evalData?.finalGrade || evalData?.score || "-",
          };
        })
      );

      setSubmissions(enriched);
      setLoading(false);
    };

    loadSubmissions();
  }, [selectedAssignment]);

  return (
    <div className="space-y-8">
      {!selectedAssignment ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Select Assignment
            </h2>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-3 px-6 rounded-2xl border border-gray-200 bg-white font-bold text-[#065F46]"
            >
              <option value="">Filter by Class</option>
              {classes.map((cls) => (
                <option key={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {selectedClass ? (
            loading ? (
              <p className="text-center py-20 text-gray-500 font-bold">
                Loading assignments...
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAssignment(a)}
                    className="text-left bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#065F46]/30 hover:shadow-md transition-all group"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {a.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-2">
                      Class: {selectedClass}
                    </p>
                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                      View Submissions
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-bold italic">
                Select a class to view assignments.
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {selectedAssignment.title}
              </h2>
              <p className="text-green-600 font-bold text-sm uppercase tracking-widest">
                {selectedClass} Submissions
              </p>
            </div>

            <button
              onClick={() => setSelectedAssignment(null)}
              className="px-6 py-2.5 rounded-2xl border border-gray-200 font-semibold"
            >
              Back
            </button>
          </div>

          {loading ? (
            <p className="text-center py-20 text-gray-500 font-bold">
              Loading submissions...
            </p>
          ) : (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-green-50">
                  <tr>
                    <th className="p-5 text-xs uppercase tracking-widest text-gray-500">
                      Student ID
                    </th>
                    <th className="p-5 text-xs uppercase tracking-widest text-gray-500">
                      File
                    </th>
                    <th className="p-5 text-xs uppercase tracking-widest text-gray-500">
                      Final Grade
                    </th>
                    <th className="p-5 text-xs uppercase tracking-widest text-gray-500 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {submissions.map((s) => (
                    <tr key={s.id} className="border-t hover:bg-green-50/30">
                      <td className="p-5 font-extrabold">
                        {s.studentId}
                      </td>

                      <td className="p-5 font-semibold text-[#065F46] flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {s.title}
                      </td>

                      <td className="p-5 font-black text-2xl text-[#065F46]">
                        {s.finalGrade}
                      </td>

                      <td className="p-5 text-center">
                        <button
                          onClick={() =>
                            navigate(`../review/${s.id}`)
                          }
                          className="text-[#065F46] font-bold hover:underline"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}