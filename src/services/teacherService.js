import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchCurrentTeacher = async () => {
  return {
    name: "Sample Teacher Name",
    role: "Faculty Admin",
  };
  try {
    const user = auth.currentUser;

    if (!user) return null;

    const teacherRef = doc(db, "teachers", user.uid);
    const teacherSnap = await getDoc(teacherRef);

    if (teacherSnap.exists()) {
      return teacherSnap.data();
    } else {
      return "Sample Teacher Name";
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};