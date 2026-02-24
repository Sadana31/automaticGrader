import React, { useState } from "react";
import {
  UploadCloud,
  CheckCircle,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { submitAssignment } from "../../services/studentService";

export default function UploadPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignment");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Descriptive Essay");
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!assignmentId) {
      alert("Invalid assignment.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a document title.");
      return;
    }
    setIsUploading(true);
    try {
      await submitAssignment({
        assignmentId,
        title,
        type,
      });
      navigate("/student/history");
    } catch (err) {
      alert(err.message);
    }
    setIsUploading(false);
  };

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
                Supports PDF, DOCX (Max 20MB)
              </p>
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={!!file}
          />
        </div>
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