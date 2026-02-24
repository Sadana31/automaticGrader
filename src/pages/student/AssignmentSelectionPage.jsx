import React, { useEffect, useState } from "react";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchAssignments } from "../../services/studentService";

export default function AssignmentSelectionPage() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      const data = await fetchAssignments();
      setAssignments(data);
      setLoading(false);
    };

    loadAssignments();
  }, []);

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

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-bold">
          Loading assignments...
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-bold italic">
          No assignments available for your class.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wide bg-green-100 text-green-700">
                  {assignment.status}
                </span>

                <span className="text-xs font-bold text-gray-400">
                  {assignment.className}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-6">
                {assignment.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                Due: {assignment.dueDate || "No deadline"}
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/student/upload/form?assignment=${assignment.id}`
                  )
                }
                className="flex items-center gap-2 text-[#0F4C81] font-bold hover:underline"
              >
                Submit Now <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}