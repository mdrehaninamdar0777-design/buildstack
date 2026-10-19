"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const rowLabels = ["Apr 28", "May 5", "May 12", "May 19", "May 26"];

const intensity = [
  "bg-neutral-100",
  "bg-emerald-100",
  "bg-emerald-300",
  "bg-emerald-500",
  "bg-emerald-700",
];

export default function LearningCalendarCard({
  data,
  title = "Learning Calendar",
  viewAllHref = "/dashboard",
}) {
  const [currentMonth, setCurrentMonth] = useState(data?.month || "May 2025");

  return (
    <Card className="p-6">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900">{title}</h2>

        <Link
          href={viewAllHref}
          className="text-xs font-semibold text-neutral-600 transition hover:text-black"
        >
          View all
        </Link>
      </header>

      {/* Month Navigator */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentMonth("Apr 2025")}
          className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-black"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-sm font-bold text-neutral-900">{currentMonth}</span>

        <button
          type="button"
          onClick={() => setCurrentMonth("Jun 2025")}
          className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-black"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Calendar Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-[340px]">
          {/* Day Names Header */}
          <div className="mb-2.5 grid grid-cols-[60px_repeat(7,1fr)] text-center text-[11px] font-semibold text-neutral-400">
            <span />
            {days.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          {/* Weeks Rows */}
          <div className="space-y-2">
            {data.weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="grid grid-cols-[60px_repeat(7,1fr)] items-center"
              >
                <span className="text-[11px] text-neutral-400">
                  {rowLabels[weekIndex]}
                </span>
                {week.map((value, dayIndex) => (
                  <div key={dayIndex} className="flex justify-center">
                    <div
                      className={`h-5 w-5 rounded-md transition-colors hover:ring-2 hover:ring-emerald-400 ${intensity[value]}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-end gap-2 text-xs text-neutral-500">
        <span>Less</span>
        {intensity.map((color, index) => (
          <div key={index} className={`h-3 w-3 rounded-xs ${color}`} />
        ))}
        <span>More</span>
      </div>
    </Card>
  );
}