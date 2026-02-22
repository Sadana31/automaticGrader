import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchCurrentStudent = async () => {
  return {
    name: "Sample Student Name",
    role: "Student",
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