import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  UploadCloud,
  FileSearch,
  History,
  UserCog,
  LogOut,
} from "lucide-react";
import { fetchCurrentStudent } from "../../services/studentService";

export default function StudentLayout() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const data = await fetchCurrentStudent();
      setStudent(data);
    };
    fetchStudent();
  }, []);

  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 mb-2 font-bold ${
          isActive
            ? "bg-[#0F4C81] text-white shadow-lg shadow-blue-900/20 translate-x-1"
            : "text-gray-500 hover:bg-[#F0F4F8] hover:text-[#0F4C81]"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] max-h-screen">
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col p-5 shadow-sm">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="bg-[#0F4C81] p-2.5 rounded-2xl shadow-md">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 uppercase">
            Student
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem
            to="/student/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
          />
          <NavItem
            to="/student/upload"
            icon={UploadCloud}
            label="Submit Document"
          />
          <NavItem
            to="/student/evaluations"
            icon={FileSearch}
            label="Detailed Reviews"
          />
          <NavItem
            to="/student/history"
            icon={History}
            label="Submission History"
          />
          <NavItem
            to="/student/profile"
            icon={UserCog}
            label="Profile"
          />
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 mb-6 p-3 rounded-[1.5rem] bg-blue-50/50 border border-blue-100/50">
            <div className="w-12 h-12 rounded-[1.25rem] bg-white text-[#0F4C81] flex items-center justify-center font-black text-lg shadow-sm">
              {student?.name?.charAt(0) || "S"}
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900">
                {student?.name || "Loading..."}
              </p>
              <p className="text-xs text-[#0F4C81] font-bold">
                {student?.roll || "Student"}
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
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-50/60 to-transparent -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}