import Link from "next/link";
import { ChevronRight, Trophy, Award, Zap, Flame, Shield, CheckCircle } from "lucide-react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  Trophy,
  Award,
  Zap,
  Flame,
  Shield,
  CheckCircle,
};

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
          {achievements.map((ach) => {
            const RawIcon = ach.icon;
            const ResolvedIcon =
              typeof RawIcon === "function"
                ? RawIcon
                : typeof RawIcon === "string" && ICON_MAP[RawIcon]
                ? ICON_MAP[RawIcon]
                : Trophy;

            return (
              <article
                key={ach.id || ach._id || ach.title}
                className="flex items-start gap-4"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600",
                    ach.iconContainerClassName
                  )}
                >
                  <ResolvedIcon
                    className={cn(
                      "h-5 w-5",
                      ach.iconClassName
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-neutral-900">
                    {ach.title}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {ach.description}
                  </p>

                  <time className="mt-2 block text-xs text-neutral-400">
                    {ach.earnedAt || "Recently Earned"}
                  </time>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10 text-center">
          <p className="text-sm font-medium text-neutral-600">
            No achievements yet.
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Complete roadmaps, milestones, and learning streaks to unlock badges.
          </p>
        </div>
      )}
    </Card>
  );
}