"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardStats } from "@/lib/api";

/**
 * useDashboardData
 *
 * Dedicated hook for fetching the authenticated user's real-time
 * dashboard statistics from GET /api/users/me/dashboard.
 *
 * Handles auth readiness, loading, error, and explicit refresh.
 */
export function useDashboardData(enabled = true) {
  const { user, loading: authLoading } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshDashboard = useCallback(async () => {
    if (!user || !enabled) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboardStats();
      if (res?.success && res.dashboard) {
        setDashboard(res.dashboard);
      }
    } catch (err) {
      console.warn("[useDashboardData] Could not fetch dashboard stats:", err?.message);
      setError(err?.message || "Failed to load dashboard data from server.");
    } finally {
      setLoading(false);
    }
  }, [user, enabled]);

  useEffect(() => {
    let isCancelled = false;

    if (!authLoading && user && enabled) {
      getDashboardStats()
        .then((res) => {
          if (!isCancelled && res?.success && res.dashboard) {
            setDashboard(res.dashboard);
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            console.warn("[useDashboardData] Could not fetch dashboard stats:", err?.message);
            setError(err?.message || "Failed to load dashboard data.");
          }
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [user, authLoading, enabled]);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard,
  };
}

export default useDashboardData;
