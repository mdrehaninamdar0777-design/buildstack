import AppNavbar from "@/components/layout/AppNavbar";
import { ProfileLayout } from "@/components/profile";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Shared authenticated navbar */}
      <AppNavbar />

      {/* Profile content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ProfileLayout />
      </div>
    </main>
  );
}