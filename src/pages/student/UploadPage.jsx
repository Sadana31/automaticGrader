import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  CheckCircle,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { submitAssignment, fetchAssignmentById } from "../../services/studentService";
import { supabase } from "../../services/supabase";

export default function UploadPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignment");
  const [assignment, setAssignment] = useState(null);
  const [loadingAssignment, setLoadingAssignment] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Descriptive Essay");
  const [error, setError] = useState(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];

      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const validateFile = (selectedFile) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF or Word documents are allowed.");
      return false;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB.");
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    if (isUploading) return;
    if (!assignmentId) {
      setError("No assignment selected. Please go back and choose an assignment.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a title for your submission.");
      return;
    }
    if (!file) {
      setError("Please upload a file.");
      return;
    }
    setIsUploading(true);
    try {
      await submitAssignment({
        assignmentId,
        title,
        type,
        file,
      });
      navigate("/student/history");
    } catch (err) {
      setError(err.message || "Failed to submit assignment. Please try again.");
    }
    setIsUploading(false);
  };

  const handleDownload = async () => {
    if (!assignment?.filePath) return;

    const { data, error } = await supabase.storage
      .from("assignments")
      .createSignedUrl(assignment.filePath, 60);

    if (error) {
      console.error(error);
      return;
    }

    window.open(data.signedUrl, "_blank");
  };

  useEffect(() => {
    const loadAssignment = async () => {
      if (!assignmentId) {
        setLoadingAssignment(false);
        return;
      }

      const data = await fetchAssignmentById(assignmentId);
      setAssignment(data);
      setLoadingAssignment(false);
    };

    loadAssignment();
  }, [assignmentId]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Submit Document
        </h2>
        <p className="text-gray-500 font-medium mt-1">
          Upload your essay, report, or draft for AI-powered evaluation.
        </p>
      </div>
      {loadingAssignment ? (
        <div className="text-center py-10 text-gray-500 font-semibold">
          Loading assignment details...
        </div>
      ) : assignment ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-extrabold text-[#0F4C81]">
              {assignment.title}
            </h3>

            <span className="text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wide bg-green-100 text-green-700">
              {assignment.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium text-gray-700">
            <div>
              <span className="font-bold text-gray-900">Class:</span>{" "}
              {assignment.className}
            </div>
            <div>
              <span className="font-bold text-gray-900">Max Score:</span>{" "}
              {assignment.maxScore}
            </div>
            <div>
              <span className="font-bold text-gray-900">Created:</span>{" "}
              {assignment.createdAt?.toDate
                ? assignment.createdAt.toDate().toLocaleDateString()
                : "N/A"}
            </div>
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-1">Instructions</p>
            <p className="text-gray-600 whitespace-pre-line">
              {assignment.instructions}
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-1">Grading Rubric</p>
            <p className="text-gray-600 whitespace-pre-line">
              {assignment.rubric}
            </p>
          </div>

          {assignment.fileUrl && (
            <div className="pt-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-[#0F4C81] text-white px-4 py-2 rounded-xl font-bold hover:shadow-md transition-all"
              >
                Download Assignment File
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl font-semibold">
          Assignment not found.
        </div>
      )}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-8">
        {assignmentId && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
            <p className="text-sm font-bold text-[#0F4C81]">
              Submitting for Assignment ID: {assignmentId}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Submission Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium"
            >
              <option>Descriptive Essay</option>
              <option>Research Draft</option>
              <option>Lab Report</option>
              <option>Literature Review</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Impact of IoT on Smart Energy"
              className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium"
            />
          </div>
        </div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Upload File
        </label>
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${
            isDragging
              ? "border-[#0F4C81] bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          } ${file ? "border-green-500 bg-green-50" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-lg font-bold text-gray-900">
                {file.name}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                onClick={() => setFile(null)}
                className="mt-4 inline-flex items-center gap-1 text-sm text-red-500 font-bold hover:underline"
              >
                <X className="w-4 h-4" />
                Remove File
              </button>
            </div>
          ) : (
            <div className="text-center pointer-events-none">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-4 text-[#0F4C81]">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1">
                Drag & drop your document
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Supports PDF, DOCX (Max 5MB)
              </p>
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile && validateFile(selectedFile)) {
                setFile(selectedFile);
              }
            }}
            disabled={!!file}
          />
        </div>
        {error && (
          <div className="my-4 bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold">
            {error}
          </div>
        )}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`flex items-center gap-2 bg-[#0F4C81] text-white px-8 py-3 rounded-2xl font-bold transition-all ${
              isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
            }`}
          >
            {isUploading ? "Uploading securely..." : "Submit for Evaluation"}
            {!isUploading && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}