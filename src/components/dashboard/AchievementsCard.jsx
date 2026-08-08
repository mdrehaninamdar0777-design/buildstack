import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function AchievementsCard({
  achievements = [],
  title = "Achievements",
  viewAllHref = "/dashboard/achievements",
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

      {/* Content */}
      {achievements.length > 0 ? (
        <div className="space-y-5">
          {achievements.map(
            ({
              id,
              icon: Icon,
              iconClassName,
              iconContainerClassName,
              title,
              description,
              earnedAt,
            }) => (
              <article
                key={id}
                className="flex items-start gap-4"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    iconContainerClassName
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      iconClassName
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-neutral-900">
                    {title}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {description}
                  </p>

                  <time className="mt-2 block text-xs text-neutral-400">
                    {earnedAt}
                  </time>
                </div>
              </article>
            )
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10">
          <p className="text-sm text-neutral-500">
            No achievements yet.
          </p>
        </div>
      )}
    </Card>
  );
}