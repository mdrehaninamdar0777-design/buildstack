import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";

const weeks = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

export default function LearningCalendarCard() {
  return (
    <Card className="p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-neutral-900">
          Learning Calendar
        </h2>

        <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
          View all
        </button>

      </div>

      {/* Month */}
      <div className="mb-6 flex items-center justify-center gap-5">

        <button>
          <ChevronLeft className="h-5 w-5 text-neutral-500" />
        </button>

        <h3 className="text-lg font-semibold">
          May 2025
        </h3>

        <button>
          <ChevronRight className="h-5 w-5 text-neutral-500" />
        </button>

      </div>

      {/* Week Days */}
      <div className="mb-4 grid grid-cols-7 text-center text-xs font-medium text-neutral-500">

        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>

      </div>

      {/* Calendar */}
      <div className="space-y-3">

        {weeks.map((week, row) => (
          <div
            key={row}
            className="grid grid-cols-7 gap-3"
          >

            {week.map((_, col) => {

              const active =
                Math.random() > 0.55;

              return (
                <div
                  key={col}
                  className={`h-6 rounded-md ${
                    active
                      ? "bg-green-500"
                      : "bg-neutral-100"
                  }`}
                />
              );

            })}

          </div>
        ))}

      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center justify-center gap-4">

        <span className="text-xs text-neutral-500">
          Less
        </span>

        <div className="flex gap-2">

          <div className="h-3 w-6 rounded bg-green-100" />
          <div className="h-3 w-6 rounded bg-green-200" />
          <div className="h-3 w-6 rounded bg-green-300" />
          <div className="h-3 w-6 rounded bg-green-500" />

        </div>

        <span className="text-xs text-neutral-500">
          More
        </span>

      </div>

    </Card>
  );
}