import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { auth } from "../../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function StudentProfilePage() {
  const [formData, setFormData] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return;
      const data = snap.data();
      setFormData({
        name: data.name || "",
        email: user.email || "",
        phone: data.phone || "",
        role: data.role || "Student",
        bio: data.bio || "",
        college: data.college || "",
      });
    };
    loadProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    try {
      setIsSaving(true);

      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        college: formData.college,
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!formData) {
    return (
      <div className="text-center py-20 font-bold text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Author Profile
        </h2>
        <p className="text-gray-500 font-medium mt-1">
          Manage your personal information and academic bio.
        </p>
      </div>
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-8 relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full bg-[#0F4C81] text-white p-2.5 text-center text-sm font-bold transition-all duration-300 z-10 ${
            showSuccess ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          Profile updated successfully!
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start border-b border-gray-100 pb-8 mt-4">
          <div className="w-24 h-24 bg-blue-100 text-[#0F4C81] rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-inner border-2 border-white">
            {formData.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="text-center md:text-left mt-2">
            <h3 className="text-2xl font-extrabold text-gray-900">
              {formData.name}
            </h3>
            <p className="text-gray-500 font-medium mt-1">
              {formData.role} • {formData.college}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium"
                required
              />
            </div>
            <div>
              <label className="flex text-sm font-bold text-gray-700 mb-2 items-center justify-between">
                <span>Email Address</span>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Academic Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium"
              >
                <option>Undergraduate Student</option>
                <option>Postgraduate Student</option>
                <option>Research Scholar</option>
                <option>Teaching Assistant</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Academic Bio / Focus Areas
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0F4C81] outline-none transition-all font-medium min-h-[100px]"
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className={`bg-[#0F4C81] text-white px-8 py-3 rounded-2xl font-bold transition-all ${
                isSaving ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
              }`}
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}