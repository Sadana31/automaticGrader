import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import AuthPage from "../pages/public/AuthPage";

import StudentLayout from "../pages/student/StudentLayout";
import StudentDashboard from "../pages/student/Dashboard";
import UploadPage from "../pages/student/UploadPage";
import EvaluationsPage from "../pages/student/EvaluationsPage";
import HistoryPage from "../pages/student/HistoryPage";
import StudentProfilePage from "../pages/student/ProfilePage";
import AssignmentSelectionPage from "../pages/student/AssignmentSelectionPage";

import TeacherLayout from "../pages/teacher/TeacherLayout";
import TeacherDashboard from "../pages/teacher/Dashboard";
import CreateAssignment from "../pages/teacher/CreateAssignment";
import Submissions from "../pages/teacher/Submissions";
import ReviewEssay from "../pages/teacher/ReviewEssay";
import TeacherProfilePage from "../pages/teacher/ProfilePage";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFoundPage from "../pages/public/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />

      <Route
        path="/student/*"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="upload" element={<AssignmentSelectionPage />} />
        <Route path="upload/form" element={<UploadPage />} />
        <Route path="evaluations" element={<EvaluationsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="create" element={<CreateAssignment />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="review/:id" element={<ReviewEssay />} />
        <Route path="profile" element={<TeacherProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
