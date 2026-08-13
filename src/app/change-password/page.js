import AppNavbar from "@/components/layout/AppNavbar";

import {
  ChangePasswordHeader,
  ChangePasswordForm,
} from "@/components/change-password";

export default function ChangePasswordPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Shared authenticated navbar */}
      <AppNavbar />

      <div className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
        <ChangePasswordHeader />

        <div className="mt-8">
          <ChangePasswordForm />
        </div>

        {/* Security note */}
        <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <ShieldIcon />

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Keep your account secure
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                Never share your password with anyone. BuildStack will never
                ask you to share your password through email or messages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShieldIcon() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5 text-neutral-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l7 4v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V7l7-4z"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.5 12l1.7 1.7 3.5-3.5"
        />
      </svg>
    </div>
  );
}