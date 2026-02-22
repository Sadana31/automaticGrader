import React from "react";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssignmentSelectionPage() {
  const navigate = useNavigate();

  const assignments = [
    {
      id: 1,
      title: "Impact of IoT on Smart Energy",
      subject: "Smart Systems",
      dueDate: "March 10, 2026",
      status: "Open",
    },
    {
      id: 2,
      title: "AI Ethics & Responsible Systems",
      subject: "Artificial Intelligence",
      dueDate: "March 18, 2026",
      status: "Open",
    },
    {
      id: 3,
      title: "Signal Processing Lab Report",
      subject: "ECE Lab",
      dueDate: "March 25, 2026",
      status: "Closed",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Available Assignments
        </h2>
        <p className="text-gray-500 font-medium mt-1">
          Select an assignment to submit your document.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className={`bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md ${
              assignment.status === "Closed" ? "opacity-60" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wide ${
                  assignment.status === "Open"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {assignment.status}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {assignment.subject}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-6">
              {assignment.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Due: {assignment.dueDate}
            </div>
            {assignment.status === "Open" ? (
              <button
                onClick={() =>
                  navigate(`/student/upload/form?assignment=${assignment.id}`)
                }
                className="flex items-center gap-2 text-[#0F4C81] font-bold hover:underline"
              >
                Submit Now <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : (
              <p className="text-sm font-bold text-gray-500 italic">
                Submission Closed
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
