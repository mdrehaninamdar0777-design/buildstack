import admin from "../config/firebaseAdmin.js";

/**
 * Express middleware — verifies a Firebase ID token supplied as
 * `Authorization: Bearer <token>`.
 *
 * On success:  attaches `req.user` (the verified decoded token) and calls next().
 * On failure:  responds with HTTP 401 without exposing internal details.
 * On error:    passes unexpected errors to the centralized error handler.
 */
export async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // 1. Header must be present and in "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: missing or malformed Authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: token is empty",
      });
    }

    // 2. Firebase Admin must be initialized before token verification
    if (admin.apps.length === 0) {
      // Firebase Admin was not initialized (missing credentials at startup).
      // We cannot verify tokens — treat as an auth failure, not a 500.
      console.error(
        "[Auth Middleware] Firebase Admin is not initialized. Cannot verify token."
      );
      return res.status(401).json({
        success: false,
        message: "Unauthorized: authentication service unavailable",
      });
    }

    // 3. Verify the token's signature and expiry with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);

    // 4. Attach only the verified identity to the request — never the raw token
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      name: decodedToken.name || null,
      picture: decodedToken.picture || null,
      emailVerified: decodedToken.email_verified || false,
    };

    return next();
  } catch (err) {
    // Firebase throws well-known auth errors with a `code` property
    const knownAuthErrors = [
      "auth/id-token-expired",
      "auth/id-token-revoked",
      "auth/invalid-id-token",
      "auth/argument-error",
    ];

    if (err.code && knownAuthErrors.includes(err.code)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: invalid or expired token",
      });
    }

    // Unexpected error — forward to centralized error handler without leaking details
    return next(err);
  }
}
