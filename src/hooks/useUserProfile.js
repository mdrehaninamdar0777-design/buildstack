/**
 * useUserProfile
 *
 * Derives display-ready profile values from the currently authenticated
 * Firebase user. This is the single source of truth for name, email,
 * avatar, and initials across Navbar, Profile page, Settings, and Home.
 *
 * All values fall back gracefully when the user has no displayName, no
 * photoURL, or is not yet signed in.
 */

"use client";

import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Returns profile display values derived from the Firebase user object.
 *
 * @returns {{
 *   user: import("firebase/auth").User | null,
 *   loading: boolean,
 *   displayName: string,
 *   firstName: string,
 *   email: string,
 *   photoURL: string | null,
 *   initials: string,
 *   greeting: string,
 * }}
 */
export function useUserProfile() {
  const { user, loading } = useAuth();

  return useMemo(() => {
    const displayName =
      user?.displayName || user?.email?.split("@")[0] || "Developer";

    // First name only (for greeting)
    const firstName = displayName.split(" ")[0];

    const email = user?.email || "";
    const photoURL = user?.photoURL || null;

    // Up to two initials, e.g. "Rehan Inamdar" → "RI", "Rehan" → "R"
    const nameParts = displayName.trim().split(/\s+/);
    const initials = nameParts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("");

    // Time-aware greeting
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
    };
  }, [user, loading]);
}

export default useUserProfile;
