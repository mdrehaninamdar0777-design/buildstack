import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui";

export default function DangerZoneCard() {
  return (
    <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Permanently delete your BuildStack account and all associated data.
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-6 rounded-xl border border-red-100 bg-red-50 p-4">
        <div className="flex items-center gap-3">
          <Trash2 className="h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm font-medium text-neutral-900">
              Delete Account
            </p>

            <p className="text-sm text-neutral-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          className="border-red-200 text-red-600 hover:bg-red-100"
        >
          Delete Account
        </Button>
      </div>
    </section>
  );
}