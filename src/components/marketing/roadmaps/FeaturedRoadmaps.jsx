import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RoadmapGrid from "./RoadmapGrid";
import { roadmapData } from "./roadmap.data";

export default function FeaturedRoadmaps() {
  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Heading with View All link */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Popular Learning Paths
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Explore popular roadmaps
            </h2>
          </div>

          <Link
            href="/learn/roadmaps"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition hover:text-neutral-600"
          >
            View All Roadmaps
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Roadmap Cards */}
        <div className="mt-12">
          <RoadmapGrid roadmaps={roadmapData} />
        </div>

      </div>
    </section>
  );
}