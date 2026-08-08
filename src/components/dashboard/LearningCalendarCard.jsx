import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";

const intensity = [
  "bg-neutral-100",
  "bg-green-100",
  "bg-green-200",
  "bg-green-400",
  "bg-green-600",
];

export default function LearningCalendarCard({
  data,
  title = "Learning Calendar",
  viewAllHref = "/learn",
}) {
  return (
    <Card className="p-6">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">
          {title}
        </h2>

        <Link
          href={viewAllHref}
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          View All
        </Link>
      </header>

      <div className="mb-6 flex items-center justify-center gap-4">
        <ChevronLeft className="h-5 w-5 text-neutral-500" />

        <span className="font-semibold text-neutral-900">
          {data.month}
        </span>

        <ChevronRight className="h-5 w-5 text-neutral-500" />
      </div>

      <div className="space-y-2">
        {data.weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="flex justify-center gap-2"
          >
            {week.map((value, dayIndex) => (
              <div
                key={dayIndex}
                className={`h-5 w-5 rounded ${intensity[value]}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 text-xs text-neutral-500">
        <span>Less</span>

        {intensity.map((color) => (
          <div
            key={color}
            className={`h-3 w-3 rounded ${color}`}
          />
        ))}

        <span>More</span>
      </div>
    </Card>
  );
}