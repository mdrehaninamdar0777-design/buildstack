import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function RecentActivityCard({
  title = "Recent Activity",
  activities = [],
  viewAllHref = "/dashboard/activity",
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
          <ChevronRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Activities */}
      {activities.length > 0 ? (
        <div className="space-y-5">
          {activities.map(
            ({
              id,
              title,
              description,
              time,
            }) => (
              <article
                key={id}
                className="flex gap-4"
              >
                <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-600" />

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-neutral-900">
                    {title}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {description}
                  </p>

                  <time className="mt-2 block text-xs text-neutral-400">
                    {time}
                  </time>
                </div>
              </article>
            )
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10">
          <p className="text-sm text-neutral-500">
            No recent activity found.
          </p>
        </div>
      )}
    </Card>
  );
}