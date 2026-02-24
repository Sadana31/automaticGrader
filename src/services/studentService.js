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
import { db, auth, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    where("status", "==", "open")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const submitAssignment = async ({
  assignmentId,
  title,
  type,
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  if (!assignmentId) throw new Error("Invalid assignment");

  await addDoc(collection(db, "submissions"), {
    assignmentId,
    studentId: user.uid,
    title: title || "Untitled Submission",
    type,
    status: "pending",
    createdAt: serverTimestamp(),
  });
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