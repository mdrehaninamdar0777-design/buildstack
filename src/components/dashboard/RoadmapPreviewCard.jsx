import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, Badge, ProgressBar } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function RoadmapPreviewCard({
  title = "Active Roadmaps",
  roadmaps = [],
  viewAllHref = "/learn",
  className,
}) {
  return (
    <Card className={cn("p-6", className)}>
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">
          {title}
        </h2>

        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Content */}
      {roadmaps.length > 0 ? (
        <div className="space-y-6">
          {roadmaps.map(
            (roadmap) => {
              const rId = roadmap.roadmapId || roadmap.id;
              const rTitle = roadmap.title;
              const rLevel = roadmap.level || "Beginner";
              const rProgress = roadmap.progress || 0;

              return (
                <article
                  key={rId}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        href={`/learn/roadmaps/${rId}`}
                        className="font-medium text-neutral-900 hover:underline transition"
                      >
                        {rTitle}
                      </Link>

                      <Badge className="mt-2 block w-fit">
                        {rLevel}
                      </Badge>
                    </div>

                    <span className="text-sm font-medium text-neutral-500">
                      {rProgress}%
                    </span>
                  </div>

                  <ProgressBar value={rProgress} />
                </article>
              );
            }
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10 text-center">
          <p className="text-sm font-medium text-neutral-600">
            No active roadmaps enrolled yet.
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Choose a roadmap to begin structured learning.
          </p>
          <Link
            href="/learn"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-black px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
          >
            Explore Roadmaps
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </Card>
  );
}