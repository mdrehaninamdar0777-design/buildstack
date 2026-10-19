import Link from "next/link";
import { GitBranch, Play } from "lucide-react";

export default function RoadmapHeader() {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      {/* Left */}
      <div className="flex items-start gap-5">
        {/* Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
          <GitBranch className="h-8 w-8" strokeWidth={1.8} />
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-950">
            Roadmaps
          </h1>

          <p className="mt-2 text-base text-neutral-600">
            Choose a structured learning path and become job-ready.
          </p>
        </div>
      </div>

      {/* How Roadmaps Work */}
      <Link
        href="#"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
      >
        <Play className="h-4 w-4" strokeWidth={2} />
        How Roadmaps Work
      </Link>
    </div>
  );
}