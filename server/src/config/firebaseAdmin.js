import admin from "firebase-admin";

/**
 * Initializes Firebase Admin SDK using server-side environment variables.
 * Ensures single initialization and properly formats multi-line private keys.
 */
let isInitialized = false;

export function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    isInitialized = true;
    return admin;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn(
      "[Firebase Admin Warning] Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY. Firebase Admin SDK initialization skipped."
    );
    return null;
  }

  // Handle escaped newline characters in .env string
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    isInitialized = true;
    console.log(`[Firebase Admin] Initialized successfully for project: ${projectId}`);
    return admin;
  } catch (error) {
    console.error(`[Firebase Admin Error] Initialization failed: ${error.message}`);
    return null;
  }
}

export function isFirebaseAdminReady() {
  return admin.apps.length > 0;
}

export default admin;
