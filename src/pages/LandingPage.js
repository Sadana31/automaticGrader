import React from 'react';
import { BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

const LandingPage = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-[#F0FDF4] flex flex-col items-center justify-center p-6">
      
      {/* Brand Header Section */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="bg-[black] p-3 rounded-2xl shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-blue-900 uppercase">
            Nexus<span className="text-[#065F46]">Evaluator</span>
          </h1>
        </div>
        <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">
          Next-Generation Academic Analysis & Grading
        </p>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Teacher Choice Card */}
        <button 
          onClick={() => onSelectRole('teacher')}
          className="group bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-2 border-transparent hover:border-emerald-500 transition-all text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200 text-white group-hover:scale-110 transition-transform">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Faculty Portal</h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            Create assignments, upload AI rubrics, and manage student performance reports.
          </p>
          <div className="mt-8 px-8 py-3 bg-emerald-50 text-emerald-700 rounded-full font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors uppercase text-sm tracking-wider">
            Enter as Teacher
          </div>
        </button>

        {/* Student Choice Card */}
        <button 
          onClick={() => onSelectRole('student')}
          className="group bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-2 border-transparent hover:border-[#0F4C81] transition-all text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-[#0F4C81] rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 text-white group-hover:scale-110 transition-transform">
            <GraduationCap size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Student Portal</h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            Submit your research drafts, view detailed AI reviews, and track your writing metrics.
          </p>
          <div className="mt-8 px-8 py-3 bg-blue-50 text-[#0F4C81] rounded-full font-bold group-hover:bg-[#0F4C81] group-hover:text-white transition-colors uppercase text-sm tracking-wider">
            Enter as Student
          </div>
        </button>

      </div>

      {/* Footer Branding */}
      <div className="mt-20 text-gray-400 font-semibold text-sm">
        &copy; 2026 NexusEvaluator Labs • Intelligent Research Calibration
      </div>
    </div>
  );
};

export default LandingPage;