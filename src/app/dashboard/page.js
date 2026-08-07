import {
  DashboardHeader,
  DashboardLayout,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-50">

      <div className="mx-auto max-w-7xl px-6 py-8">

        <DashboardHeader />

        <div className="mt-8">
          <DashboardLayout mode="full" />
        </div>

      </div>

    </main>
  );
}