"use client";

/**
 * AuthProvider wrapper.
 *
 * A thin Client Component whose only job is to hold the "use client" boundary
 * so that src/app/layout.js can remain a Server Component (which lets it
 * export `metadata`, use server-only imports, etc.).
 *
 * Import and render <Providers> in layout.js instead of importing AuthProvider
 * directly, which would make the entire layout a Client Component.
 */

import { AuthProvider } from "@/contexts/AuthContext";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
