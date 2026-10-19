import Link from "next/link";
import { TechIcon } from "@/components/shared";
import { Map } from "lucide-react";
import { homeData } from "./home.data";

export default function RecommendedRoadmaps() {
  const { recommendedRoadmaps } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
            <Map className="h-4 w-4" />
          </div>

          <h2 className="text-lg font-bold tracking-tight text-neutral-900">
            Recommended Roadmaps
          </h2>
        </div>

        <Link
          href="/learn/roadmaps"
          className="text-xs font-semibold text-neutral-600 transition hover:text-black"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-neutral-100">
        {recommendedRoadmaps.map((roadmap) => (
          <div
            key={roadmap.title}
            className="px-4 py-3 first:pl-0 last:pr-0"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 p-2 shadow-2xs">
                <TechIcon name={roadmap.icon} className="h-full w-full" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-neutral-900">
                  {roadmap.title}
                </h3>

                <span className="mt-1.5 inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">
                  {roadmap.level}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-neutral-600">
              <span>{roadmap.duration}</span>
              <span className="font-semibold text-neutral-900">
                {roadmap.progress}%
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{ width: `${roadmap.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}