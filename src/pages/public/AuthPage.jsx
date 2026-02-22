import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen, Mail, Lock, User, ShieldCheck } from "lucide-react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isTeacher = role === "teacher";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const storedRole = docSnap.data()?.role;
        if (storedRole !== role) {
          alert("No user with such a role.");
          await auth.signOut();
          return;
        }
        if (storedRole === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/student");
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          role: role,
        });
        if (role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/student");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isTeacher ? "bg-[#F0FDF4]" : "bg-[#F8FAFC]"
      }`}
    >
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[550px] border border-gray-100">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {isLogin
                ? isTeacher
                  ? "Teacher Portal"
                  : "Welcome Back!"
                : isTeacher
                  ? "Faculty Registration"
                  : "Create an Account"}
            </h1>

            <p className="text-gray-500 font-medium">
              {isTeacher
                ? "Access your classes and AI evaluation tools."
                : "Login to view your essay evaluations."}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.edu"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-4 text-lg rounded-2xl font-bold transition ${
                isTeacher
                  ? "bg-[#065F46] text-white hover:bg-[#044D39]"
                  : "bg-[#0F4C81] text-white hover:bg-[#082F53]"
              }`}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={`font-bold hover:underline ${
                isTeacher ? "text-[#065F46]" : "text-[#0F4C81]"
              }`}
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>

        <div
          className={`w-full md:w-1/2 p-12 text-white hidden md:flex flex-col justify-between relative overflow-hidden ${
            isTeacher
              ? "bg-gradient-to-br from-[#065F46] via-[#047857] to-[#064E3B]"
              : "bg-gradient-to-br from-[#0F4C81] via-[#1A365D] to-[#0A2240]"
          }`}
        >
          <div className="flex items-center gap-3">
            {isTeacher ? (
              <ShieldCheck className="w-8 h-8 text-[#D1FAE5]" />
            ) : (
              <BookOpen className="w-8 h-8 text-[#FFBE98]" />
            )}
            <span className="text-xl font-bold tracking-widest uppercase">
              Nexus Evaluator
            </span>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              {isTeacher
                ? "Streamline Evaluations with Precision."
                : "Master your writing & research."}
            </h2>
            <p className="opacity-90">
              {isTeacher
                ? "Automate grading benchmarks, manage multi-class submissions, and provide instant AI-driven feedback to your scholars."
                : "Submit essays, receive highly detailed, structured feedback, and track your analytical progress seamlessly."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
