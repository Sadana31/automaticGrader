import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { fetchCurrentTeacher } from "../../services/teacherService";
import { auth, db } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadTeacher = async () => {
      const data = await fetchCurrentTeacher();
      setTeacher(data);
      setLoading(false);
    };
    loadTeacher();
  }, []);

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!teacher) return;

    try {
      setSaving(true);
      const user = auth.currentUser;

      const teacherRef = doc(db, "users", user.uid);

      await updateDoc(teacherRef, {
        name: teacher.name,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-gray-500 font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
        Faculty Profile Settings
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              name="name"
              value={teacher?.name || ""}
              onChange={handleChange}
              className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-[#065F46]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Employee ID
            </label>
            <input
              value={teacher?.employeeId || "SAMPLE_EMPLOYEE_ID"}
              disabled
              className="w-full p-3.5 rounded-2xl border border-gray-100 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 bg-[#065F46] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#044D39] transition-all disabled:opacity-60"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Profile Changes"}
        </button>
      </div>
    </div>
  );
}