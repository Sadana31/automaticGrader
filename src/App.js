import React, { useState, useEffect } from 'react';
import { 
  BookOpen, UploadCloud, FileText, History, 
  LogOut, User, CheckCircle, Clock, AlertCircle, 
  ChevronRight, Mail, Lock, Sparkles, UserCog, 
  ShieldCheck, Target, TrendingUp, MessageSquareWarning,
  ThumbsUp, ThumbsDown, ArrowUpRight
} from 'lucide-react';

// --- MOCK DATA ---
const initialEssays = [
  { 
    id: 1, 
    title: "Causal-Fuzzy Neural Operators in Smart Energy", 
    type: "Research Draft", 
    date: "Feb 18, 2026", 
    status: "Evaluated", 
    score: 85,
    metrics: { research: 92, structure: 75, clarity: 88, grammar: 85 },
    feedback: {
      strengths: ["Excellent theoretical integration of causal-fuzzy logic.", "Strong initial literature review."],
      weaknesses: ["Transitions between Sections 2 and 3 are abrupt.", "Conclusion lacks a forward-looking impact statement."],
      improvements: ["Use clearer signposting sentences when moving between complex topics.", "Expand the conclusion to include real-world IoT applications."],
      remarks: "Great first draft, Anand. The technical depth is impressive. Focus on the flow for the final submission."
    },
    issue: { raised: false, status: null, text: "", response: "" }
  },
  { 
    id: 2, 
    title: "Arduino Line Follower: Sensor Calibration Report", 
    type: "Lab Report", 
    date: "Feb 10, 2026", 
    status: "Evaluated", 
    score: 72,
    metrics: { research: 70, structure: 85, clarity: 75, grammar: 60 },
    feedback: {
      strengths: ["Clear step-by-step methodology.", "Good use of diagrams for circuit mapping."],
      weaknesses: ["Formatting of data tables is inconsistent.", "Several grammatical errors in the abstract."],
      improvements: ["Proofread the abstract thoroughly.", "Standardize the table formats using APA guidelines."],
      remarks: "The practical implementation was good, but the documentation needs a lot of polish."
    },
    issue: { 
      raised: true, 
      status: "resolved", 
      text: "I believe the formatting points were deducted unfairly as the template provided was broken.", 
      response: "Reviewed. The template issue was noted. I have adjusted your score by +5 points. Please verify." 
    }
  },
  { 
    id: 3, 
    title: "Spanish Cultural Impact Essay", 
    type: "Descriptive Essay", 
    date: "Feb 20, 2026", 
    status: "Pending", 
    score: "-",
    metrics: null,
    feedback: null,
    issue: { raised: false, status: null, text: "", response: "" }
  }
];

// --- COMPONENTS ---
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-[#0F4C81] text-white hover:bg-[#082F53] hover:shadow-[0_8px_20px_rgba(15,76,129,0.25)] hover:-translate-y-0.5",
    secondary: "bg-white text-gray-800 border border-[#E2E8F0] hover:bg-gray-50 hover:shadow-sm hover:-translate-y-0.5",
    outline: "border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-[#F0F4F8]",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    success: "bg-[#E6F4EA] text-[#009B77] border border-[#009B77]/20 hover:bg-[#D1EBD8]",
    ghost: "text-[#64748B] hover:text-[#0F4C81] hover:bg-[#F0F4F8]"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const ProgressBar = ({ label, value, colorClass }) => (
  <div className="mb-4">
    <div className="flex justify-between items-end mb-1.5">
      <span className="text-sm font-bold text-gray-700">{label}</span>
      <span className="text-sm font-bold text-gray-900">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div className={`h-2.5 rounded-full ${colorClass} transition-all duration-1000 ease-out`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

// 1. AUTHENTICATION PAGE
const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Simulate sending an email
    setTimeout(() => {
      setResetSent(true);
    }, 800);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setResetSent(false);
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          
          {isForgotPassword ? (
            /* --- FORGOT PASSWORD FLOW --- */
            resetSent ? (
              <div className="text-center animation-fade-in">
                <div className="w-20 h-20 bg-[#E6F4EA] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#009B77]" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Check your inbox</h2>
                <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                  We've sent password reset instructions to <br/>
                  <span className="text-[#0F4C81] font-bold">{emailInput || 'your email address'}</span>.
                </p>
                <Button onClick={handleBackToLogin} className="w-full py-4 text-lg">
                  Return to Login
                </Button>
              </div>
            ) : (
              <div className="animation-fade-in">
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Reset Password</h2>
                  <p className="text-gray-500 font-medium">
                    Enter your registered email and we'll send you instructions to reset your password.
                  </p>
                </div>
                <form className="space-y-5" onSubmit={handleResetPassword}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C81] transition-colors" />
                      <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="student@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full py-4 text-lg mt-4 shadow-md">
                    Send Reset Link
                  </Button>
                </form>
                <p className="mt-8 text-center text-gray-500 font-medium">
                  Remember your password?{' '}
                  <button onClick={handleBackToLogin} className="text-[#0F4C81] font-bold hover:underline transition-all">
                    Log in
                  </button>
                </p>
              </div>
            )
          ) : (
            /* --- STANDARD LOGIN/SIGNUP FLOW --- */
            <div className="animation-fade-in">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  {isLogin ? 'Welcome Back!' : 'Create an Account'}
                </h1>
                <p className="text-gray-500 font-medium">
                  {isLogin ? 'Login to view your essay evaluations.' : 'Sign up to submit essays and track detailed feedback.'}
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(emailInput || 'anand.research@vit.edu'); }}>
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C81] transition-colors" />
                      <input type="text" placeholder="Anand" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium" required />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C81] transition-colors" />
                    <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="student@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C81] transition-colors" />
                    <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium" required />
                  </div>
                </div>
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-sm text-[#0F4C81] font-bold hover:underline transition-all">
                      Forgot password?
                    </button>
                  </div>
                )}
                
                <Button type="submit" className="w-full py-4 text-lg mt-4 shadow-md">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
              </form>

              <p className="mt-8 text-center text-gray-500 font-medium">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-[#0F4C81] font-bold hover:underline transition-all">
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0F4C81] via-[#1A365D] to-[#0A2240] p-12 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#FFBE98] opacity-10 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <BookOpen className="w-8 h-8 text-[#FFBE98]" />
            <span className="text-xl font-bold tracking-widest uppercase">Nexus Evaluator</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-extrabold mb-6 leading-[1.15] tracking-tight">
              Master your writing & research.
            </h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed opacity-90">
              Submit essays, receive highly detailed, structured feedback, and track your analytical progress seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. UPLOAD PAGE
const UploadPage = ({ setView }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    if(!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setFile(null);
      setView('history');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto animation-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Submit Document</h2>
        <p className="text-gray-500 font-medium mt-1">Upload your essay, report, or draft for evaluation.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-[#E2E8F0] p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Submission Type</label>
            <select className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium">
              <option>Descriptive Essay</option>
              <option>Research Draft</option>
              <option>Lab Report</option>
              <option>Literature Review</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Document Title</label>
            <input type="text" placeholder="e.g., Impact of IoT on Smart Energy" className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium" />
          </div>
        </div>

        <label className="block text-sm font-bold text-gray-700 mb-2">Upload File</label>
        <div 
          className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${isDragging ? 'border-[#0F4C81] bg-[#F0F4F8]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} ${file ? 'border-[#009B77] bg-[#E6F4EA]' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#009B77] mx-auto mb-3" />
              <p className="text-lg font-bold text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <button onClick={() => setFile(null)} className="mt-4 text-sm text-red-500 font-bold hover:underline z-10 relative">Remove file</button>
            </div>
          ) : (
            <div className="text-center pointer-events-none">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-4 text-[#0F4C81]">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1">Drag & drop your document</p>
              <p className="text-sm text-gray-500 font-medium">Supports PDF, DOCX (Max 20MB)</p>
            </div>
          )}
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} disabled={!!file} />
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleUpload} disabled={!file || isUploading} className={(!file || isUploading) ? 'opacity-50 cursor-not-allowed' : ''}>
            {isUploading ? 'Uploading securely...' : 'Submit for Evaluation'}
            {!isUploading && <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

// 3. DETAILED EVALUATIONS PAGE
const EvaluationsPage = ({ essays, onUpdateEssay, issueCount, setIssueCount }) => {
  const [selectedId, setSelectedId] = useState(essays.find(e => e.status === "Evaluated")?.id || null);
  const [issueText, setIssueText] = useState("");
  
  const essay = essays.find(e => e.id === selectedId);
  const evaluatedEssays = essays.filter(e => e.status === "Evaluated");

  if (evaluatedEssays.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Evaluations Yet</h2>
        <p className="text-gray-500 font-medium">Your submitted documents are currently under review.</p>
      </div>
    );
  }

  const handleRaiseIssue = () => {
    if(!issueText.trim() || issueCount >= 5) return;
    const updatedEssay = {
      ...essay,
      issue: { raised: true, status: "pending", text: issueText, response: "" }
    };
    onUpdateEssay(updatedEssay);
    setIssueCount(prev => prev + 1);
    setIssueText("");
  };

  const handleResolveIssue = () => {
    const updatedEssay = {
      ...essay,
      issue: { ...essay.issue, status: "closed" }
    };
    onUpdateEssay(updatedEssay);
  };

  return (
    <div className="max-w-6xl mx-auto animation-fade-in flex flex-col xl:flex-row gap-8">
      
      {/* Sidebar Selector */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4 stagger-1">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Evaluations</h2>
        {evaluatedEssays.map(item => (
          <button 
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`text-left p-5 rounded-[1.5rem] transition-all duration-300 border ${selectedId === item.id ? 'bg-[#0F4C81] text-white border-[#0F4C81] shadow-lg shadow-blue-900/20 translate-x-2' : 'bg-white text-gray-700 border-gray-200 hover:border-[#0F4C81]/30 hover:bg-gray-50'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide ${selectedId === item.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {item.type}
              </span>
              <span className={`text-sm font-bold ${selectedId === item.id ? 'text-blue-200' : 'text-gray-400'}`}>{item.date}</span>
            </div>
            <h3 className="font-bold text-lg leading-tight mb-3">{item.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-black ${selectedId === item.id ? 'text-[#FFBE98]' : 'text-[#0F4C81]'}`}>{item.score}</span>
              <span className={`text-sm font-medium ${selectedId === item.id ? 'text-blue-200' : 'text-gray-500'}`}>/ 100</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Detail View */}
      {essay && (
        <div className="w-full xl:w-2/3 space-y-6 stagger-2">
          
          {/* Header & Score */}
          <div className="bg-white rounded-[2rem] p-8 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0F4F8] opacity-50 rounded-bl-full -z-10"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2 pr-20">{essay.title}</h2>
            <p className="text-gray-500 font-medium mb-8">Evaluated on {essay.date}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full border-8 border-[#0F4C81] flex items-center justify-center bg-[#F8FAFC]">
                  <span className="text-4xl font-black text-[#0F4C81]">{essay.score}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Final Score</p>
                  <p className="text-lg font-bold text-gray-900">Excellent Work</p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <ProgressBar label="Research & Depth" value={essay.metrics.research} colorClass="bg-[#0F4C81]" />
                <ProgressBar label="Structure & Flow" value={essay.metrics.structure} colorClass="bg-[#009B77]" />
                <ProgressBar label="Clarity & Grammar" value={essay.metrics.grammar} colorClass="bg-[#E65100]" />
              </div>
            </div>
          </div>

          {/* Detailed Feedback Rubric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-[#009B77]">
                <ThumbsUp className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-gray-900">Strong Points</h3>
              </div>
              <ul className="space-y-3">
                {essay.feedback.strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-gray-600 leading-relaxed">
                    <span className="text-[#009B77] font-bold">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-red-500">
                <ThumbsDown className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-gray-900">Weak Points</h3>
              </div>
              <ul className="space-y-3">
                {essay.feedback.weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-gray-600 leading-relaxed">
                    <span className="text-red-500 font-bold">•</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Improvements & Remarks */}
          <div className="bg-gradient-to-br from-[#F0F4F8] to-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-[#0F4C81]">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-gray-900">Areas for Improvement</h3>
              </div>
              <ul className="space-y-2">
                {essay.feedback.improvements.map((imp, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-gray-700 leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                    <Target className="w-5 h-5 text-[#FFBE98] flex-shrink-0" /> {imp}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Teacher's Remark</h3>
              <p className="text-gray-800 font-medium italic">"{essay.feedback.remarks}"</p>
            </div>
          </div>

          {/* DISPUTE / ISSUE RESOLUTION SECTION */}
          <div className="bg-white rounded-[2rem] p-7 border border-[#E2E8F0] shadow-sm mt-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareWarning className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-extrabold text-gray-900">Evaluation Query</h3>
              <span className="ml-auto text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl">
                Queries Used: {issueCount} / 5
              </span>
            </div>
            
            {!essay.issue.raised && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-4">If you feel any part of this evaluation is incorrect or needs clarification, you can raise an issue with the evaluator.</p>
                {issueCount < 5 ? (
                  <>
                    <textarea 
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="Explain your concern clearly..."
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all font-medium text-sm min-h-[100px] mb-4"
                    ></textarea>
                    <Button onClick={handleRaiseIssue} className="bg-amber-500 hover:bg-amber-600 text-white">
                      Submit Query
                    </Button>
                  </>
                ) : (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                    You have reached the maximum limit of 5 evaluation queries. You cannot raise further issues.
                  </div>
                )}
              </div>
            )}

            {essay.issue.raised && essay.issue.status === "pending" && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-800 rounded-lg uppercase tracking-wide">Pending Review</span>
                </div>
                <p className="text-sm font-bold text-gray-700 mt-2 mb-1">Your Query:</p>
                <p className="text-sm font-medium text-gray-600 italic">"{essay.issue.text}"</p>
                <p className="text-xs font-bold text-gray-400 mt-4 uppercase">The evaluator has been notified.</p>
              </div>
            )}

            {essay.issue.raised && essay.issue.status === "resolved" && (
              <div className="bg-[#F0F4F8] border border-blue-100 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold px-3 py-1 bg-blue-200 text-blue-800 rounded-lg uppercase tracking-wide">Response Received</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Your Query:</p>
                    <p className="text-sm font-medium text-gray-600 italic">"{essay.issue.text}"</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-[#0F4C81] uppercase mb-1">Evaluator's Reply:</p>
                    <p className="text-sm font-medium text-gray-800">"{essay.issue.response}"</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleResolveIssue} variant="success">
                    <CheckCircle className="w-4 h-4" /> I am satisfied, close issue
                  </Button>
                </div>
              </div>
            )}

            {essay.issue.raised && essay.issue.status === "closed" && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <CheckCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-600">This query has been resolved and closed.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 4. SUBMISSION HISTORY PAGE
const HistoryPage = ({ essays, setView }) => {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Evaluated': return <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#E6F4EA] text-[#009B77]"><CheckCircle className="w-3.5 h-3.5"/> Evaluated</span>;
      case 'Pending': return <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FFF3E0] text-[#E65100]"><Clock className="w-3.5 h-3.5"/> Under Review</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto animation-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Submission History</h2>
          <p className="text-gray-500 font-medium mt-1">Track all your past drafts and final submissions.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-[#E2E8F0]">
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Document Details</th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Date</th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Status</th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Score</th>
                <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody>
              {essays.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F0F4F8] p-3 rounded-2xl text-[#0F4C81] group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900 text-[15px]">{item.title}</p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">{item.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-gray-600 font-bold">{item.date}</td>
                  <td className="p-5">{getStatusBadge(item.status)}</td>
                  <td className="p-5 font-black text-gray-900 text-lg">{item.score}</td>
                  <td className="p-5">
                    {item.status === 'Evaluated' ? (
                      <button onClick={() => setView('evaluations')} className="flex items-center gap-1 text-[#0F4C81] hover:text-[#082F53] text-sm font-bold hover:underline">
                        Detailed Review <ArrowUpRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm font-bold italic">Awaiting</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 5. PROFILE PAGE
const ProfilePage = ({ userEmail, userRole, setUserRole }) => {
  const [formData, setFormData] = useState({
    name: 'Anand',
    email: userEmail || 'anand.research@vit.edu',
    phone: '+91 98765 43210',
    role: userRole || 'Research Scholar',
    bio: 'Focusing on Causal-Fuzzy logic, IoT, and Smart Energy forecasting.'
  });
  
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showProfileSuccess, setShowProfileSuccess] = useState(false);

  const handleProfileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      setUserRole(formData.role);
      setShowProfileSuccess(true);
      setTimeout(() => setShowProfileSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto animation-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Author Profile</h2>
        <p className="text-gray-500 font-medium mt-1">Manage your personal information and academic bio.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-[#E2E8F0] p-6 md:p-8 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full bg-[#009B77] text-white p-2.5 text-center text-sm font-bold transition-all duration-300 z-10 ${showProfileSuccess ? 'translate-y-0' : '-translate-y-full'}`}>
          Profile updated successfully!
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start border-b border-gray-100 pb-8 mt-4">
          <div className="w-24 h-24 bg-[#E1EAF2] text-[#0F4C81] rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-inner border-2 border-white">
            {formData.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="text-center md:text-left mt-2">
            <h3 className="text-2xl font-extrabold text-gray-900">{formData.name}</h3>
            <p className="text-gray-500 font-medium mt-1">{userRole} • VIT Chennai</p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleProfileChange} className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                <span>Email Address</span>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              </label>
              <input type="email" value={formData.email} disabled className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Academic Role</label>
              <select name="role" value={formData.role} onChange={handleProfileChange} className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium">
                <option value="Undergraduate Student">Undergraduate Student</option>
                <option value="Postgraduate Student">Postgraduate Student</option>
                <option value="Research Scholar">Research Scholar</option>
                <option value="Teaching Assistant">Teaching Assistant</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleProfileChange} className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Academic Bio / Focus Areas</label>
              <textarea name="bio" value={formData.bio} onChange={handleProfileChange} className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium min-h-[100px]" required></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSavingProfile} className={isSavingProfile ? 'opacity-70 cursor-not-allowed' : ''}>
              {isSavingProfile ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('Research Scholar');
  const [issueCount, setIssueCount] = useState(1); // Starting at 1 because mock data ID 2 has a resolved issue
  const [currentView, setCurrentView] = useState('upload');
  const [essays, setEssays] = useState(initialEssays);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background-color: #F8FAFC; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      .animation-fade-in { animation: smoothFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .stagger-1 { animation-delay: 0.1s; opacity: 0; animation: smoothFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s; }
      .stagger-2 { animation-delay: 0.2s; opacity: 0; animation: smoothFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s; }
      @keyframes smoothFade { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleUpdateEssay = (updatedEssay) => {
    setEssays(essays.map(e => e.id === updatedEssay.id ? updatedEssay : e));
  };

  if (!isAuthenticated) return <AuthPage onLogin={(email) => { setUserEmail(email); setIsAuthenticated(true); }} />;

  const renderView = () => {
    switch(currentView) {
      case 'upload': return <UploadPage setView={setCurrentView} />;
      case 'evaluations': return <EvaluationsPage essays={essays} onUpdateEssay={handleUpdateEssay} issueCount={issueCount} setIssueCount={setIssueCount} />;
      case 'history': return <HistoryPage essays={essays} setView={setCurrentView} />;
      case 'profile': return <ProfilePage userEmail={userEmail} userRole={userRole} setUserRole={setUserRole} />;
      default: return <UploadPage setView={setCurrentView} />;
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setCurrentView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 mb-2 font-bold ${
        currentView === id 
          ? 'bg-[#0F4C81] text-white shadow-[0_8px_20px_rgba(15,76,129,0.25)] translate-x-1' 
          : 'text-gray-500 hover:bg-[#F0F4F8] hover:text-[#0F4C81]'
      }`}
    >
      <Icon className={`w-5 h-5 ${currentView === id ? 'text-[#FFBE98]' : ''}`} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      <aside className="w-full md:w-[280px] bg-white border-r border-[#E2E8F0] flex flex-col md:min-h-screen p-5 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="bg-[#0F4C81] p-2.5 rounded-2xl shadow-md">
            <BookOpen className="w-6 h-6 text-[#FFBE98]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 uppercase">Evaluator</span>
        </div>

        <nav className="flex-1 flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2 md:gap-0">
          <NavItem id="upload" icon={UploadCloud} label="Submit Document" />
          <NavItem id="evaluations" icon={Target} label="Detailed Reviews" />
          <NavItem id="history" icon={History} label="Submission History" />
          <NavItem id="profile" icon={UserCog} label="Author Profile" />
        </nav>

        <div className="mt-auto hidden md:block pt-8 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-3 px-2 mb-6 p-3 rounded-[1.5rem] hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
            <div className="w-12 h-12 rounded-[1.25rem] bg-[#E1EAF2] flex items-center justify-center text-[#0F4C81] font-black text-lg shadow-inner border border-white">
              AN
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900">Anand</p>
              <p className="text-xs text-gray-500 font-bold truncate max-w-[120px]">{userRole}</p>
            </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[#C62828] hover:bg-[#FFEBEE] transition-colors font-bold">
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#E1EAF2]/40 to-transparent -z-10 pointer-events-none"></div>
        <div className="md:hidden flex justify-end mb-6">
           <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm text-[#C62828] bg-[#FFEBEE] px-4 py-2 rounded-xl font-bold">
             <LogOut className="w-4 h-4" /> Logout
           </button>
        </div>
        <div className="pb-20 md:pb-0">
          {renderView()}
        </div>
      </main>
    </div>
  );
}