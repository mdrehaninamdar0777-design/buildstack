import { ChevronDown, TrendingUp } from "lucide-react";

import { Button, Card } from "@/components/ui";

export default function WeeklyActivityCard() {
  const data = [
    { day: "Mon", value: 9.2 },
    { day: "Tue", value: 12.1 },
    { day: "Wed", value: 14.8 },
    { day: "Thu", value: 8.3 },
    { day: "Fri", value: 16.7 },
    { day: "Sat", value: 18.9 },
    { day: "Sun", value: 7.6 },
  ];

  const max = Math.max(...data.map((item) => item.value));

  return (
    <Card className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-neutral-900">
            Weekly Learning Activity
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Hours
          </p>

        </div>

        <Button
          variant="secondary"
          size="sm"
        >
          Hours

          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>

      </div>

      {/* Chart */}
      <div className="mt-10">

        <div className="flex h-72 items-end justify-between gap-5">

          {data.map((item) => (
            <div
              key={item.day}
              className="flex flex-1 flex-col items-center"
            >

              <span className="mb-2 text-sm font-semibold text-neutral-700">
                {item.value}
              </span>

              <div className="relative flex h-56 items-end">

                <div
                  className="w-8 rounded-full bg-blue-500 transition-all duration-300"
                  style={{
                    height: `${(item.value / max) * 100}%`,
                  }}
                />

              </div>

              <span className="mt-3 text-sm text-neutral-500">
                {item.day}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between rounded-2xl bg-neutral-50 p-5">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-3">

            <TrendingUp className="h-5 w-5 text-blue-600" />

          </div>

          <div>

            <p className="font-semibold text-neutral-900">
              Great job! You learned 18% more this week.
            </p>

            <p className="text-sm text-neutral-500">
              Keep up the momentum!
            </p>

          </div>

        </div>

        <Button variant="secondary">
          View Insights
        </Button>

      </div>

    </Card>
  );
}