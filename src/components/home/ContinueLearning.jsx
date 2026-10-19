import Link from "next/link";
import { TechIcon } from "@/components/shared";
import { Sparkles, ArrowRight, Clock3, Calendar } from "lucide-react";
import { homeData } from "./home.data";

export default function ContinueLearning() {
  const { continueLearning } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs lg:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[140px_1fr_auto_240px]">

        {/* Tech Logo Icon */}
        <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 p-5 shadow-2xs">
          <TechIcon
            name={continueLearning.currentModule || "React"}
            className="h-full w-full"
          />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-50 text-amber-500">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Continue Learning
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            {continueLearning.title}
          </h2>

          <p className="mt-2 text-sm text-neutral-600">
            Current Module:{" "}
            <span className="font-semibold text-neutral-900">
              {continueLearning.currentModule}
            </span>
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{ width: `${continueLearning.progress}%` }}
              />
            </div>

            <span className="text-base font-bold text-neutral-900">
              {continueLearning.progress}%
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-6 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-neutral-400" />
              <div>
                <span className="text-neutral-400">Estimated Left: </span>
                <span className="font-semibold text-neutral-900">
                  {continueLearning.estimatedTime}
                </span>
              </div>
            </div>

            <div className="h-4 w-px bg-neutral-200" />

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-neutral-400" />
              <div>
                <span className="text-neutral-400">Last Session: </span>
                <span className="font-semibold text-neutral-900">
                  {continueLearning.lastSession}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          href="/learn/roadmaps/frontend-developer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <span>Resume Learning</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* Current Module Overview Card */}
        <div className="hidden rounded-xl border border-neutral-100 bg-neutral-50 p-4 lg:block">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-neutral-200 p-1">
              <TechIcon name="React" className="h-full w-full" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">Active Skill</p>
              <p className="text-[11px] text-neutral-500">React Core & Hooks</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-white p-2.5 border border-neutral-200 text-[11px] text-neutral-600">
            Next: Component Lifecycle & State Management
          </div>
        </div>

      </div>
    </section>
  );
}