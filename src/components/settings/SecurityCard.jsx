import { Lock, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui";

export default function SecurityCard() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
          <ShieldCheck className="h-5 w-5 text-neutral-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Security
          </h2>

          <p className="text-sm text-neutral-500">
            Manage your password and account security.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-neutral-200 p-4">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-neutral-500" />

          <div>
            <p className="text-sm font-medium text-neutral-900">
              Password
            </p>

            <p className="text-sm text-neutral-500">
              Last changed recently
            </p>
          </div>
        </div>

        <Button variant="secondary">
          Change Password
        </Button>
      </div>
    </section>
  );
}