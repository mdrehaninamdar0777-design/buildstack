import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import { TechIcon } from "@/components/shared";

export default function RecentActivityCard({
  title = "Recent Activity",
  activities = [],
  viewAllHref = "/dashboard",
  className,
}) {
  return (
    <Card className={cn("p-6", className)}>
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900">
          {title}
        </h2>

        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs font-semibold text-neutral-600 transition hover:text-black"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Activities */}
      {activities.length > 0 ? (
        <div className="divide-y divide-neutral-100">
          {activities.map((item, idx) => {
            const isNotes = item.type === "notes" || item.type === "note";
            const timeDisplay =
              item.time ||
              (item.createdAt
                ? new Date(item.createdAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })
                : "Recently");

            return (
              <article
                key={item.id || item._id || `${item.title}-${idx}`}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 p-2 shadow-2xs">
                    {isNotes ? (
                      <FileText className="h-5 w-5 text-neutral-700" />
                    ) : (
                      <TechIcon name={item.type || "Code2"} className="h-full w-full" />
                    )}
                  </div>

                  <p className="text-sm font-semibold text-neutral-900">
                    {item.title}
                  </p>
                </div>

                <time className="shrink-0 text-xs font-medium text-neutral-400">
                  {timeDisplay}
                </time>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10 text-center">
          <p className="text-sm font-medium text-neutral-600">
            No recent activity found.
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Completed lessons, roadmap enrollments, and quiz results will appear here.
          </p>
        </div>
      )}
    </Card>
  );
}