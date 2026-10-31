"use client";

import AppNavbar from "@/components/layout/AppNavbar";
import { DashboardLayout } from "@/components/dashboard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-neutral-50">
        {/* Shared Logged-in Navbar */}
        <AppNavbar />

        {/* Dashboard */}
        <div className="mx-auto max-w-7xl px-6 py-8">
          <DashboardLayout mode="full" />
        </div>
      </main>
    </ProtectedRoute>
  );
}