import React, { useState, useMemo, useEffect } from "react";
import {
  Home,
  User,
  PlusCircle,
  Edit,
  LogOut,
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  Calendar,
  FileText,
  ShieldCheck,
  Search,
  Target,
  UserCog,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  MessageSquareWarning,
  Lock,
  Mail,
  UploadCloud,
  BarChart3,
  Settings2
} from "lucide-react";

/* ================= MOCK DATA ================= */

const CLASSES = ["CSE-A", "CSE-B", "ECE-A"];

const ASSIGNMENTS = {
  "CSE-A": [
    { id: 1, title: "IoT Energy Management", date: "Feb 01, 2026", status: "Active" },
    { id: 2, title: "Smart Grid Security", date: "Feb 15, 2026", status: "Active" },
  ],
  "CSE-B": [{ id: 3, title: "AI Ethics Foundations", date: "Mar 01, 2026", status: "Draft" }],
  "ECE-A": [{ id: 4, title: "Signal Processing Lab", date: "Feb 20, 2026", status: "Active" }],
};

const SUBMISSIONS = [
  {
    roll: "21CSE001",
    name: "Anand",
    submission: "IoT_Energy_Analysis.pdf",
    aiGrade: 85,
    aiFeedback: "Strong technical depth. Improve transitions between sections. Expand conclusion with real-world implications.",
    finalGrade: 85,
  },
  {
    roll: "21CSE002",
    name: "Riya",
    submission: "SmartGrid_Report.docx",
    aiGrade: 78,
    aiFeedback: "Good structure overall. Minor grammar errors and formatting inconsistencies detected.",
    finalGrade: 78,
  },
];

/* ================= REUSABLE COMPONENTS ================= */

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-[#065F46] text-white hover:bg-[#044D39] hover:shadow-[0_8px_20px_rgba(6,95,70,0.25)] hover:-translate-y-0.5",
    secondary: "bg-white text-gray-800 border border-[#E2E8F0] hover:bg-green-50 hover:shadow-sm hover:-translate-y-0.5",
    outline: "border-2 border-[#065F46] text-[#065F46] hover:bg-green-50",
    success: "bg-[#E6F4EA] text-[#059669] border border-[#059669]/20 hover:bg-[#D1EBD8]",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

/* ================= LOGIN ================= */

function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[550px] border border-green-50">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight text-center md:text-left">
              {isLogin ? "Teacher Portal" : "Faculty Registration"}
            </h1>
            <p className="text-gray-500 font-medium text-center md:text-left">
              {isLogin 
                ? "Access your classes and AI evaluation tools." 
                : "Create your faculty account to start evaluating."}
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin("teacher"); }}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                  <input type="text" placeholder="Prof. Name" className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#065F46] outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Employee ID</label>
                  <input type="text" placeholder="VIT-2026" className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#065F46] outline-none transition-all font-medium" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">University Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#065F46]" />
                <input type="email" placeholder="professor@vit.edu" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#065F46] outline-none transition-all font-medium" />
              </div>
            </div>

            <div className={!isLogin ? "grid grid-cols-2 gap-3" : ""}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#065F46]" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#065F46] outline-none transition-all font-medium" />
                </div>
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#065F46] outline-none transition-all font-medium" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full py-4 text-lg mt-2">
              {isLogin ? "Sign In to Dashboard" : "Register Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-500 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-[#065F46] font-bold hover:underline transition-all">
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#065F46] via-[#047857] to-[#064E3B] p-12 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-3 relative z-10">
            <ShieldCheck className="w-8 h-8 text-[#D1FAE5]" />
            <span className="text-xl font-bold tracking-widest uppercase text-green-50">Nexus Faculty</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Streamline Evaluations with Precision.</h2>
            <p className="text-green-50 text-lg font-medium opacity-90 leading-relaxed">
              Automate grading benchmarks, manage multi-class submissions, and provide instant AI-driven feedback to your scholars.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN TEACHER APP ================= */

export default function App() {
  const [role, setRole] = useState(null);
  const [view, setView] = useState("home");
  const [mode, setMode] = useState("view");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #F8FAFC; }
      .animation-fade-in { animation: smoothFade 0.5s ease-out forwards; }
      @keyframes smoothFade { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }, []);

  if (!role) return <LoginPage onLogin={setRole} />;

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 mb-2 font-bold ${
        view === id 
          ? 'bg-[#065F46] text-white shadow-lg shadow-green-900/20 translate-x-1' 
          : 'text-gray-500 hover:bg-[#F0FDF4] hover:text-[#065F46]'
      }`}
    >
      <Icon className={`w-5 h-5 ${view === id ? 'text-[#D1FAE5]' : ''}`} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Section */}
      <aside className="w-full md:w-[280px] bg-white border-r border-gray-100 flex flex-col md:min-h-screen p-5 z-20 shadow-sm">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="bg-[#065F46] p-2.5 rounded-2xl shadow-md">
            <BookOpen className="w-6 h-6 text-[#D1FAE5]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 uppercase">Evaluator</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem id="home" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="create" icon={PlusCircle} label="Create New" />
          <NavItem id="select" icon={Target} label="Assignments" />
          <NavItem id="account" icon={UserCog} label="My Profile" />
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 mb-6 p-3 rounded-[1.5rem] bg-green-50/50 border border-green-100/50">
            <div className="w-12 h-12 rounded-[1.25rem] bg-white text-[#065F46] flex items-center justify-center font-black text-lg shadow-sm">AN</div>
            <div>
              <p className="text-sm font-extrabold text-gray-900">Prof. Anand</p>
              <p className="text-xs text-green-600 font-bold">Faculty Admin</p>
            </div>
          </div>
          <button onClick={() => setRole(null)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-600 hover:bg-red-50 transition-colors font-bold">
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-green-50/50 to-transparent -z-10"></div>
        
        <div className="max-w-6xl mx-auto animation-fade-in">
          {view === "home" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Faculty Dashboard</h2>
                  <p className="text-gray-500 font-medium">Manage your classes and evaluation metrics.</p>
                </div>
                <Button onClick={() => setView("create")}>
                  <PlusCircle className="w-5 h-5" /> Create Assignment
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => { setMode("view"); setView("select"); }} className="group p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all text-left shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileText /></div>
                    <h3 className="font-bold text-gray-900 text-lg">View Submissions</h3>
                    <p className="text-xs text-gray-400 mt-1 font-medium">Review student drafts and papers.</p>
                  </button>
                  <button onClick={() => { setMode("reports"); setView("select"); }} className="group p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all text-left shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><BarChart3 /></div>
                    <h3 className="font-bold text-gray-900 text-lg">Performance Reports</h3>
                    <p className="text-xs text-gray-400 mt-1 font-medium">Analyze class-wide scoring metrics.</p>
                  </button>
                  <button onClick={() => { setMode("overwrite"); setView("select"); }} className="group p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all text-left shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Settings2 /></div>
                    <h3 className="font-bold text-gray-900 text-lg">Manual Overwrite</h3>
                    <p className="text-xs text-gray-400 mt-1 font-medium">Adjust AI-generated scores manually.</p>
                  </button>
                  <button onClick={() => setView("create")} className="group p-6 bg-[#065F46] rounded-3xl text-white transition-all text-left shadow-lg shadow-green-100">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><PlusCircle /></div>
                    <h3 className="font-bold text-lg">New Assignment</h3>
                    <p className="text-xs text-green-100 mt-1 font-medium">Deploy new rubrics and handouts.</p>
                  </button>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-green-600" /> Quick Access
                  </h3>
                  <div className="space-y-3">
                    {CLASSES.map((cls) => (
                      <button
                        key={cls}
                        onClick={() => { setMode("view"); setSelectedClass(cls); setView("select"); }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-green-50 text-[#065F46] font-bold hover:bg-green-100 transition-all border border-green-200/50 group"
                      >
                        {cls}
                        <ChevronRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "create" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Assignment Creator</h2>
                <Button variant="secondary" onClick={() => setView('home')}>Back to Home</Button>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Target Class</label>
                    <select className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-bold text-[#065F46] outline-none focus:ring-2 focus:ring-[#065F46]">
                      {CLASSES.map(cls => <option key={cls}>{cls}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Max Score</label>
                    <input type="number" placeholder="100" defaultValue="100" className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-[#065F46]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Title</label>
                    <input className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-[#065F46]" placeholder="e.g., Causal-Fuzzy Operators Research" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Instructions</label>
                    <textarea className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-[#065F46] min-h-[140px]" placeholder="Add specific instructions for students..."></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-700">Handouts (Students)</label>
                    <div className="border-2 border-dashed border-emerald-100 rounded-3xl p-8 text-center bg-emerald-50/20 hover:bg-emerald-50/50 transition-colors cursor-pointer group">
                      <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Upload Materials</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-purple-700">Grading Rubric (AI)</label>
                    <div className="border-2 border-dashed border-purple-100 rounded-3xl p-8 text-center bg-purple-50/20 hover:bg-purple-50/50 transition-colors cursor-pointer group">
                      <Target className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Upload Benchmark</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="secondary" onClick={() => setView('home')}>Discard</Button>
                  <Button className="px-10">Deploy Assignment</Button>
                </div>
              </div>
            </div>
          )}

          {view === "select" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Select Assignment</h2>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="p-3 px-6 rounded-2xl border border-gray-200 bg-white font-bold text-[#065F46] outline-none shadow-sm"
                >
                  <option value="">Filter by Class</option>
                  {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>

              {selectedClass ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ASSIGNMENTS[selectedClass].map((a) => (
                    <button 
                      key={a.id} 
                      onClick={() => { setSelectedAssignment(a); setView("table"); }}
                      className="text-left bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#065F46]/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-green-50 text-green-700 rounded-lg">{a.status}</span>
                        <span className="text-xs font-bold text-gray-400">{a.date}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-6 leading-tight">{a.title}</h3>
                      <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                        View Submissions <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold italic">Select a class to view assignments.</p>
                </div>
              )}
            </div>
          )}

          {view === "table" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{selectedAssignment?.title}</h2>
                  <p className="text-green-600 font-bold text-sm uppercase tracking-widest">{selectedClass} Submissions</p>
                </div>
                <Button variant="secondary" onClick={() => setView('select')}>Back to Selection</Button>
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-green-50/50 border-b border-gray-100">
                        <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Student Info</th>
                        <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Submission</th>
                        <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">AI Feedback</th>
                        <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Final Grade</th>
                        {mode === "overwrite" && <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {SUBMISSIONS.map((s, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-green-50/20 transition-colors">
                          <td className="p-5">
                            <p className="font-extrabold text-gray-900">{s.name}</p>
                            <p className="text-xs text-gray-500 font-bold uppercase mt-1">{s.roll}</p>
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-2 text-green-600 font-bold hover:underline cursor-pointer">
                              <FileText className="w-4 h-4" /> {s.submission}
                            </div>
                          </td>
                          <td className="p-5">
                            <details className="group">
                              <summary className="text-sm font-bold text-[#065F46] cursor-pointer hover:bg-green-100 w-fit px-3 py-1 rounded-lg transition-colors list-none flex items-center gap-1">
                                View Analysis <ChevronRight className="w-4 h-4 group-open:rotate-90" />
                              </summary>
                              <div className="p-4 bg-green-50 rounded-2xl mt-2 text-xs font-medium text-green-900 border border-green-100">
                                {s.aiFeedback}
                              </div>
                            </details>
                          </td>
                          <td className="p-5">
                            <span className="text-2xl font-black text-[#065F46]">{s.finalGrade}</span>
                            <span className="text-sm text-gray-400 font-bold ml-1">/ 100</span>
                          </td>
                          {mode === "overwrite" && (
                            <td className="p-5">
                              <button className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors">
                                <Edit className="w-5 h-5" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {view === "account" && (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Faculty Profile Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                    <input className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-medium" defaultValue="Anand" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Employee ID</label>
                    <input className="w-full p-3.5 rounded-2xl border border-gray-100 bg-gray-100 text-gray-500 cursor-not-allowed" disabled defaultValue="VIT-2026-FAC-01" />
                  </div>
                </div>
                <Button className="w-full py-4">Save Profile Changes</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}