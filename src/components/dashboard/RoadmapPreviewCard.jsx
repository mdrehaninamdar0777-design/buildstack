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
            ({
              id,
              title,
              level,
              progress,
            }) => (
              <article
                key={id}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">
                      {title}
                    </h3>

                    <Badge className="mt-2">
                      {level}
                    </Badge>
                  </div>

                  <span className="text-sm font-medium text-neutral-500">
                    {progress}%
                  </span>
                </div>

                <ProgressBar value={progress} />
              </article>
            )
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10">
          <p className="text-sm text-neutral-500">
            No active roadmaps.
          </p>
        </div>
      )}
    </Card>
  );
}