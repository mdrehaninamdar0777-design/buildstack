import { TrendingUp } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function WeeklyActivitySummary({
  title,
  description,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center justify-between rounded-2xl bg-neutral-50 p-5",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-neutral-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            {description}
          </p>
        </div>
      </div>

      <Button
        variant="secondary"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  );
}