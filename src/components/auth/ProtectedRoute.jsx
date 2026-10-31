"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Route protection wrapper for authenticated pages.
 *
 * Requirements:
 * - Waits for Firebase Auth state to resolve before determining access.
 * - Redirects unauthenticated visitors to `/login`.
 * - Prevents rendering of protected children while unauthenticated or loading.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
          <p className="text-xs font-medium text-neutral-500">Loading BuildStack...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}
