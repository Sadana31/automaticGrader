import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  PlusCircle,
  Target,
  UserCog,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchCurrentTeacher } from "../../services/teacherService";

export default function TeacherLayout() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      const currentTeacher = await fetchCurrentTeacher();
      setTeacher(currentTeacher);
    };
    fetchTeacher();
  }, []);

  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 mb-2 font-bold ${
          isActive
            ? "bg-[#065F46] text-white shadow-lg shadow-green-900/20 translate-x-1"
            : "text-gray-500 hover:bg-[#F0FDF4] hover:text-[#065F46]"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] max-h-screen">
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col p-5 shadow-sm">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="bg-[#065F46] p-2.5 rounded-2xl shadow-md">
            <BookOpen className="w-6 h-6 text-[#D1FAE5]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 uppercase">
            Evaluator
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem to="/teacher/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/teacher/create" icon={PlusCircle} label="Create New" />
          <NavItem to="/teacher/submissions" icon={Target} label="Assignments" />
          <NavItem to="/teacher/profile" icon={UserCog} label="My Profile" />
        </nav>

        {/* Profile Section */}
        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 mb-6 p-3 rounded-[1.5rem] bg-green-50/50 border border-green-100/50">
            <div className="w-12 h-12 rounded-[1.25rem] bg-white text-[#065F46] flex items-center justify-center font-black text-lg shadow-sm">
              AN
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900">
                {teacher?.name || "Loading..."}
              </p>
              <p className="text-xs text-green-600 font-bold">
                {teacher?.role || "Faculty"}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-600 hover:bg-red-50 transition-colors font-bold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 relative overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-green-50/50 to-transparent -z-10"></div>
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}