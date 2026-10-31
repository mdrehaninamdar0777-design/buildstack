"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultRowLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

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
  const [monthOffset, setMonthOffset] = useState(0);

  const currentMonthLabel = useMemo(() => {
    if (data?.month && monthOffset === 0) return data.month;
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [data?.month, monthOffset]);

  const rowLabels = data?.rowLabels || defaultRowLabels;
  const weeks = data?.weeks || [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

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
          onClick={() => setMonthOffset((prev) => prev - 1)}
          className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-black"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-sm font-bold text-neutral-900">{currentMonthLabel}</span>

        <button
          type="button"
          onClick={() => setMonthOffset((prev) => prev + 1)}
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
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="grid grid-cols-[60px_repeat(7,1fr)] items-center"
              >
                <span className="text-[11px] text-neutral-400">
                  {rowLabels[weekIndex] || `W${weekIndex + 1}`}
                </span>
                {week.map((value, dayIndex) => (
                  <div key={dayIndex} className="flex justify-center">
                    <div
                      className={`h-5 w-5 rounded-md transition-colors hover:ring-2 hover:ring-emerald-400 ${
                        intensity[value] || intensity[0]
                      }`}
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