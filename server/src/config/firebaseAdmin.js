
import admin from "firebase-admin";

/**
 * Initializes Firebase Admin SDK using server-side environment variables.
 * Supports escaped newlines in private keys and prevents duplicate initialization.
 */
export function initializeFirebaseAdmin() {
  // Reuse an existing Firebase Admin app if already initialized.
  if (admin.apps.length > 0) {
    return admin;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !rawPrivateKey) {
    console.warn(
      "[Firebase Admin] Initialization skipped: required environment variables are missing."
    );
    return null;
  }

  // Convert literal "\n" sequences from .env into actual newline characters.
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n").trim();

  if (
    !privateKey.includes("-----BEGIN PRIVATE KEY-----") ||
    !privateKey.includes("-----END PRIVATE KEY-----")
  ) {
    console.error(
      "[Firebase Admin] Initialization failed: private key format is invalid."
    );
    return null;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    console.log(
      `[Firebase Admin] Initialized successfully for project: ${projectId}`
    );

    return admin;
  } catch {
    // Do not log credentials or raw configuration details.
    console.error(
      "[Firebase Admin] Initialization failed. Check the service-account credentials and private-key formatting."
    );

    return null;
  }
}

/**
 * Returns whether Firebase Admin has been initialized.
 */
export function isFirebaseAdminReady() {
  return admin.apps.length > 0;
}

export default admin;
