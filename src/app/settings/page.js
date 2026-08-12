import AppNavbar from "@/components/layout/AppNavbar";

import {
  AccountSettingsHeader,
  PersonalInformationCard,
  AccountPreferencesCard,
  SecurityCard,
  DangerZoneCard,
} from "@/components/settings";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Shared authenticated navbar */}
      <AppNavbar />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <AccountSettingsHeader />

        <div className="mt-8 space-y-6">
          <PersonalInformationCard />

          <AccountPreferencesCard />

          <SecurityCard />

          <DangerZoneCard />
        </div>
      </div>
    </main>
  );
}