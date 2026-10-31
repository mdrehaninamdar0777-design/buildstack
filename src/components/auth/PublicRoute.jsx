"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Route protection wrapper for guest-only pages (e.g. /login, /signup).
 *
 * Requirements:
 * - Redirects already-authenticated users to `/home`.
 * - Prevents rendering guest forms until auth loading has settled.
 */
export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return children;
}
