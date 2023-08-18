import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = require("/ie-teacher-doi-firebase-adminsdk-i7sw9-5d2f6f09b9.json");
export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount),
  });

export const auth = getAuth();