/**
 * Firebase Client SDK — Initialization
 *
 * Initializes the Firebase web app from NEXT_PUBLIC_ environment variables.
 * Exports the auth instance, Google provider, and GitHub provider for use
 * in AuthContext and any future authentication utilities.
 *
 * This file MUST NOT import or reference any Firebase Admin SDK.
 * Admin credentials live exclusively in server/ and are never exposed here.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

// ── Configuration ─────────────────────────────────────────────────────────────

const requiredKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
];

const missingKeys = requiredKeys.filter(
  (key) => !process.env[key]
);

if (missingKeys.length > 0) {
  // Report clearly which keys are missing without printing any values.
  console.warn(
    `[Firebase] Missing required environment variables: ${missingKeys.join(", ")}. ` +
    `Firebase will not be fully initialized until these are set in .env.local.`
  );
}

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyPlaceholderKeyForBuild",
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "buildstack-app.firebaseapp.com",
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "buildstack-app",
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "buildstack-app.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:000000000000",
};

// ── App Initialization — guarded against double-init in Next.js dev hot reload ─

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ── Exports ───────────────────────────────────────────────────────────────────

/**
 * Firebase Auth instance — use for all client-side authentication operations.
 */
export const auth = getAuth(app);

/**
 * Google OAuth 2.0 provider.
 * Requests the user's profile and email scopes by default.
 */
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

/**
 * GitHub OAuth provider.
 */
export const githubProvider = new GithubAuthProvider();

export default app;
