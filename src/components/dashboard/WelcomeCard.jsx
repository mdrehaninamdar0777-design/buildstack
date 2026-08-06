import { MoreHorizontal } from "lucide-react";

export default function WelcomeCard() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            Good morning, Rehan 👋
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Keep learning, keep building.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
        >
          <MoreHorizontal className="h-5 w-5 text-neutral-400" />
        </button>

      </div>
    </Card>
  );
}