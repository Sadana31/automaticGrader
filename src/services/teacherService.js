// services/teacherService.js

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";

export const fetchCurrentTeacher = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  return {
    id: user.uid,
    ...docSnap.data(),
  };
};

export const createAssignment = async ({
  className,
  maxScore,
  title,
  instructions,
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  await addDoc(collection(db, "assignments"), {
    className,
    maxScore: Number(maxScore),
    title,
    instructions,
    teacherId: user.uid,
    status: "open",
    createdAt: serverTimestamp(),
  });
};

export const fetchTeacherSubmissions = async () => {
  const user = auth.currentUser;

  const q = query(
    collection(db, "submissions"),
    where("teacherId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const evaluateSubmission = async (
  submissionId,
  evaluationData
) => {
  await addDoc(collection(db, "evaluations"), {
    submissionId,
    ...evaluationData,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "submissions", submissionId), {
    status: "evaluated",
    evaluatedAt: serverTimestamp(),
  });
};

export const respondToQuery = async (queryId, responseText) => {
  await updateDoc(doc(db, "queries", queryId), {
    status: "closed",
    response: responseText,
  });
};

export const fetchSubmissionById = async (submissionId) => {
  const docRef = doc(db, "submissions", submissionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const fetchEvaluationBySubmission = async (submissionId) => {
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

export const updateFinalGrade = async (evaluationId, finalGrade) => {
  const evalRef = doc(db, "evaluations", evaluationId);

  await updateDoc(evalRef, {
    finalGrade: Number(finalGrade),
  });
};

export const fetchTeacherAssignments = async (className) => {
  const user = auth.currentUser;
  if (!user) return [];

  let q = query(
    collection(db, "assignments"),
    where("teacherId", "==", user.uid)
  );

  if (className) {
    q = query(
      collection(db, "assignments"),
      where("teacherId", "==", user.uid),
      where("className", "==", className)
    );
  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchSubmissionsByAssignment = async (assignmentId) => {
  const q = query(
    collection(db, "submissions"),
    where("assignmentId", "==", assignmentId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};