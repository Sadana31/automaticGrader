import React, { useState } from "react";
import { Search, ArrowUpRight, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Submissions() {
  const navigate = useNavigate();

  const classes = ["CSE-A", "CSE-B", "ECE-A"];

  const assignments = {
    "CSE-A": [
      { id: 1, title: "IoT Energy Management", date: "Feb 01, 2026", status: "Active" },
      { id: 2, title: "Smart Grid Security", date: "Feb 15, 2026", status: "Active" },
    ],
    "CSE-B": [
      { id: 3, title: "AI Ethics Foundations", date: "Mar 01, 2026", status: "Draft" },
    ],
    "ECE-A": [
      { id: 4, title: "Signal Processing Lab", date: "Feb 20, 2026", status: "Active" },
    ],
  };

  const submissions = [
    {
      id: 1,
      name: "Anand",
      roll: "21CSE001",
      file: "IoT_Energy_Analysis.pdf",
      finalGrade: 85,
    },
    {
      id: 2,
      name: "Riya",
      roll: "21CSE002",
      file: "SmartGrid_Report.docx",
      finalGrade: 78,
    },
  ];

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

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
              className="p-3 px-6 rounded-2xl border border-gray-200 bg-white font-bold text-[#065F46] outline-none shadow-sm"
            >
              <option value="">Filter by Class</option>
              {classes.map((cls) => (
                <option key={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {selectedClass ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments[selectedClass]?.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAssignment(a)}
                  className="text-left bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#065F46]/30 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-green-50 text-green-700 rounded-lg">
                      {a.status}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {a.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-6 leading-tight">
                    {a.title}
                  </h3>

                  <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                    View Submissions
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
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
              className="px-6 py-2.5 rounded-2xl border border-gray-200 font-semibold hover:bg-gray-50"
            >
              Back
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-5 text-xs uppercase tracking-widest text-gray-500">
                    Student
                  </th>
                  <th className="p-5 text-xs uppercase tracking-widest text-gray-500">
                    Submission
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
                    <td className="p-5">
                      <p className="font-extrabold">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.roll}</p>
                    </td>

                    <td className="p-5 font-semibold text-[#065F46] flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {s.file}
                    </td>

                    <td className="p-5 font-black text-2xl text-[#065F46]">
                      {s.finalGrade}
                    </td>

                    <td className="p-5 text-center">
                      <button
                        onClick={() => navigate(`../review/${s.id}`)}
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
        </>
      )}
    </div>
  );
}