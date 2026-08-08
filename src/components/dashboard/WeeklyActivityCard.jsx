import { ChevronDown } from "lucide-react";

import { Button, Card } from "@/components/ui";

import WeeklyActivityChart from "./WeeklyActivityChart";
import WeeklyActivitySummary from "./WeeklyActivitySummary";

export default function WeeklyActivityCard({
  data,
  summary,
  title = "Weekly Learning Activity",
  metric = "Hours",
  onViewInsights,
  mode = "full",
}) {
  const isPreview = mode === "preview";

  return (
    <Card className={isPreview ? "p-4" : "p-6"}>
      <header
        className={
          isPreview
            ? "mb-4 flex items-center justify-between"
            : "mb-8 flex items-center justify-between"
        }
      >
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {metric}
          </p>
        </div>

        <Button variant="secondary" size="sm">
          {metric}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </header>

      <WeeklyActivityChart
        data={data}
        mode={mode}
      />

      {!isPreview && (
  <WeeklyActivitySummary
    title={summary.title}
    description={summary.description}
    actionLabel={summary.actionLabel}
    onAction={onViewInsights}
  />
)}
    </Card>
  );
}