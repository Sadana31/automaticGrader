// services/studentService.js

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { supabase } from "./supabase";

export const fetchCurrentStudent = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;
  console.log("Fetched student data:", docSnap.data());
  return { id: user.uid, ...docSnap.data() };
};

export const fetchAssignments = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const userSnap = await getDoc(doc(db, "users", user.uid));
  const studentData = userSnap.data();

  const q = query(
    collection(db, "assignments"),
    where("className", "==", studentData.className || "CSE-A"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchAssignmentById = async (assignmentId) => {
  const docRef = doc(db, "assignments", assignmentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const submitAssignment = async ({
  assignmentId,
  title,
  type,
  file,
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  if (!file) throw new Error("Please upload a document");

  if (
    file.type !== "application/pdf" &&
    file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
    file.type !== "application/msword"
  ) {
    throw new Error("Only PDF or Word documents are allowed");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File must be under 5MB");
  }

  let filePath = `student-${user.uid}/${Date.now()}-${file.name}`;

  try {
    const { error } = await supabase.storage
      .from("submissions")
      .upload(filePath, file, { upsert: false });

    if (error) throw error;

    await addDoc(collection(db, "submissions"), {
      assignmentId,
      studentId: user.uid,
      title,
      type,
      filePath,
      status: "Pending",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    await supabase.storage.from("submissions").remove([filePath]);
    throw err;
  }
};

export const fetchStudentSubmissions = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "submissions"),
    where("studentId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchEvaluation = async (submissionId) => {
  const q = query(
    collection(db, "evaluations"),
    where("submissionId", "==", submissionId)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
};

export const raiseQuery = async (submissionId, text) => {
  const user = auth.currentUser;

  await addDoc(collection(db, "queries"), {
    submissionId,
    studentId: user.uid,
    text,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};