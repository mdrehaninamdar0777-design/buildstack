import Link from "next/link";
import {
  Zap,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function LearnQuickStart() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">

      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 fill-current text-neutral-900" />

        <h3 className="text-sm font-semibold text-neutral-900">
          Quick Start
        </h3>
      </div>

      <p className="mt-3 text-xs leading-5 text-neutral-500">
        Pick up where you left off and keep your streak alive.
      </p>

      <Link
        href="/learn/roadmaps"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-xs font-semibold text-white transition hover:bg-neutral-800"
      >
        Continue Learning
        <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="mt-4 rounded-lg border border-neutral-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />

            <span className="text-xl font-semibold text-neutral-900">
              12
            </span>
          </div>

          <ArrowRight className="h-4 w-4 text-neutral-500" />
        </div>

        <p className="mt-1 text-xs text-neutral-500">
          Day Streak
        </p>
      </div>

      <Link
        href="/dashboard"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-3 text-xs font-medium text-neutral-800 transition hover:bg-neutral-50"
      >
        View Progress
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}