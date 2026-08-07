import { CalendarDays } from "lucide-react";

import { Card } from "@/components/ui";

export default function LearningCalendar({
  streak = 12,
  nextSession = "Today • 7:00 PM",
}) {
  return (
    <Card className="p-5">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-neutral-100 p-3">
          <CalendarDays className="h-5 w-5 text-neutral-700" />
        </div>

        <div>
          <h3 className="font-semibold text-neutral-900">
            Learning Calendar
          </h3>

          <p className="text-sm text-neutral-500">
            {nextSession}
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-neutral-50 p-4">

        <p className="text-sm text-neutral-500">
          Current Streak
        </p>

        <h2 className="mt-1 text-3xl font-bold text-neutral-900">
          {streak} Days 🔥
        </h2>

      </div>

    </Card>
  );
}