/**
 * useUserProfile
 *
 * Provides two layers of profile data:
 *
 * 1. Firebase layer  — name, email, photoURL derived from the Firebase auth
 *    token. Available instantly after sign-in, used for avatar and greeting.
 *
 * 2. MongoDB layer   — full profile document (bio, role, location, skills,
 *    links) fetched from GET /api/users/me. Populated after the first API
 *    call and can be explicitly refreshed via refreshProfile().
 *
 * This is the single source of truth consumed by Navbar, Home page, Profile
 * page, Settings, and Edit Profile forms.
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentUserProfile } from "@/lib/api";

/**
 * @typedef {Object} DbProfile
 * @property {string}   name
 * @property {string}   role
 * @property {string}   bio
 * @property {string}   location
 * @property {string}   avatar
 * @property {string[]} skills
 * @property {Array}    links
 */

/**
 * @returns {{
 *   user: import("firebase/auth").User | null,
 *   loading: boolean,
 *   displayName: string,
 *   firstName: string,
 *   email: string,
 *   photoURL: string | null,
 *   initials: string,
 *   greeting: string,
 *   dbProfile: DbProfile | null,
 *   dbLoading: boolean,
 *   refreshProfile: () => Promise<void>,
 * }}
 */
export function useUserProfile() {
  const { user, loading } = useAuth();

  // ── MongoDB profile state ─────────────────────────────────────────────────
  const [dbProfile, setDbProfile] = useState(null);
  const [dbLoading, setDbLoading] = useState(false);

  /**
   * Fetch the user's MongoDB profile from the backend.
   * Safe to call from anywhere — silently does nothing when no user is signed in.
   */
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    setDbLoading(true);
    try {
      const result = await getCurrentUserProfile();
      if (result?.success && result.user) {
        setDbProfile(result.user);
      }
    } catch (err) {
      // Non-fatal: backend may be unreachable during local dev
      console.warn("[useUserProfile] Could not fetch DB profile:", err?.message);
    } finally {
      setDbLoading(false);
    }
  }, [user]);

  // Fetch on mount and whenever the authenticated user changes
  useEffect(() => {
    let isCancelled = false;
    if (!loading && user) {
      getCurrentUserProfile()
        .then((result) => {
          if (!isCancelled && result?.success && result.user) {
            setDbProfile(result.user);
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            console.warn("[useUserProfile] Could not fetch DB profile:", err?.message);
          }
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [user, loading]);

  // ── Firebase-derived display values ──────────────────────────────────────
  return useMemo(() => {
    const activeDbProfile = user ? dbProfile : null;

    // Prefer the MongoDB name if it exists and is non-empty, then fall back
    // to Firebase displayName and finally to the email prefix.
    const displayName =
      (activeDbProfile?.name && activeDbProfile.name.trim()) ||
      user?.displayName ||
      user?.email?.split("@")[0] ||
      "Developer";

    const firstName = displayName.split(" ")[0];
    const email = user?.email || "";
    const photoURL = user?.photoURL || null;

    const nameParts = displayName.trim().split(/\s+/);
    const initials = nameParts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("");

    const hour = new Date().getHours();
    const timeGreeting =
      hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
    const greeting = `${timeGreeting}, ${firstName}!`;

    return {
      user,
      loading,
      displayName,
      firstName,
      email,
      photoURL,
      initials,
      greeting,
      dbProfile: activeDbProfile,
      dbLoading,
      refreshProfile,
    };
  }, [user, loading, dbProfile, dbLoading, refreshProfile]);
}

export default useUserProfile;
