"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  /** The currently signed-in Firebase user, or null when signed out. */
  const [user, setUser] = useState(null);

  /**
   * true while Firebase is resolving the initial auth state on mount.
   * Components should render a skeleton / spinner while this is true.
   */
  const [loading, setLoading] = useState(true);

  /** Last authentication error, or null when none. */
  const [error, setError] = useState(null);

  // ── Auth state listener ────────────────────────────────────────────────────

  useEffect(() => {
    // If client credentials are not configured, avoid attaching Firebase auth listeners
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setLoading(false);
      return;
    }

    // onAuthStateChanged returns an unsubscribe function — call it on cleanup
    // to prevent state updates on unmounted components and memory leaks.
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      },
      (authError) => {
        console.error("[AuthContext] onAuthStateChanged error:", authError.code);
        setError(authError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ── Helper: clear error before each auth attempt ────────────────────────────

  const clearError = useCallback(() => setError(null), []);

  // ── Auth methods ───────────────────────────────────────────────────────────

  /**
   * Sign in with email and password.
   * Throws a Firebase AuthError on failure — callers handle it.
   */
  const loginWithEmail = useCallback(async (email, password) => {
    clearError();
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return credential;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [clearError]);

  /**
   * Create a new account with email and password.
   * Throws a Firebase AuthError on failure — callers handle it.
   */
  const signupWithEmail = useCallback(async (email, password) => {
    clearError();
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      return credential;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [clearError]);

  /**
   * Sign in with Google via popup.
   * Throws a Firebase AuthError on failure — callers handle it.
   */
  const loginWithGoogle = useCallback(async () => {
    clearError();
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      return credential;
    } catch (err) {
      // Ignore popup-closed-by-user events — not a real error from the user's perspective
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError(err);
      }
      throw err;
    }
  }, [clearError]);

  /**
   * Sign in with GitHub via popup.
   * Throws a Firebase AuthError on failure — callers handle it.
   */
  const loginWithGithub = useCallback(async () => {
    clearError();
    try {
      const credential = await signInWithPopup(auth, githubProvider);
      return credential;
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError(err);
      }
      throw err;
    }
  }, [clearError]);

  /**
   * Sign out the current user.
   * Throws a Firebase AuthError on failure — callers handle it.
   */
  const logout = useCallback(async () => {
    clearError();
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [clearError]);

  /**
   * Send a password reset email to the given address.
   * Throws a Firebase AuthError on failure — callers handle it.
   */
  const resetPassword = useCallback(async (email) => {
    clearError();
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [clearError]);

  /**
   * Returns a fresh Firebase ID token for the current user.
   * Use this to populate the Authorization header on protected API calls.
   * Returns null when no user is signed in.
   *
   * @param {boolean} [forceRefresh=false] — force a token refresh even if
   *   the current token is still valid.
   */
  const getIdToken = useCallback(
    async (forceRefresh = false) => {
      if (!auth.currentUser) return null;
      try {
        return await auth.currentUser.getIdToken(forceRefresh);
      } catch (err) {
        console.error("[AuthContext] Failed to get ID token:", err.code);
        return null;
      }
    },
    []
  );

  // ── Context value ──────────────────────────────────────────────────────────

  const value = {
    user,
    loading,
    error,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithGithub,
    logout,
    resetPassword,
    getIdToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * useAuth — access the authentication context from any Client Component.
 *
 * @throws {Error} if used outside of <AuthProvider>.
 *
 * @example
 * const { user, loading, loginWithEmail } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

export default AuthContext;
