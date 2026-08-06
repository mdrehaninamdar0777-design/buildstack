import { Flame, CircleDashed } from "lucide-react";

export default function ProgressCards() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <article className="rounded-2xl border border-neutral-200 bg-white p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Flame className="h-6 w-6 text-orange-500" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-neutral-900">
              12
            </h3>

            <p className="text-sm text-neutral-500">
              Day Streak
            </p>
          </div>

        </div>

      </article>

      <article className="rounded-2xl border border-neutral-200 bg-white p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CircleDashed className="h-6 w-6 text-green-600" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-neutral-900">
              68%
            </h3>

            <p className="text-sm text-neutral-500">
              Total Progress
            </p>
          </div>

        </div>

      </article>

    </div>
  );
}